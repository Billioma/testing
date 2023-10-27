import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, SimpleGrid, Switch } from "@chakra-ui/react";

import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useCreateCorporateSubscription,
  useCreateMembershipFeature,
  useGetCorporatePlans,
  useGetCorporateSubscriptions,
  useGetMembershipPlans,
} from "../../../services/admin/query/memberships";
import {
  useGetClientUsers,
  useGetClients,
} from "../../../services/admin/query/clients";

export default function AddCorporateSubscription() {
  const [featureTypes, setFeatureTypes] = useState([]);
  const [state, setState] = useState({
    membershipPlan: "",
    subscriptionOptions: [
      {
        planFeature: 0,
        data: "",
      },
    ],
    autoRenewal: 0,
    paymentMethod: 2,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetCorporateSubscriptions();

  const { mutate, isLoading } = useCreateCorporateSubscription({
    onSuccess: () => {
      refetch();
      successToast("Corporate subscription created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: clients } = useGetClients({}, 1, 100000);

  const { data: clientUsers, mutate: getClientUsers } = useGetClientUsers();

  const userOptions = clientUsers?.map((user) => ({
    label: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
    value: user.id,
  }));

  const clientOptions = clients?.data?.map((client) => ({
    label: client.name,
    value: client.id,
    wallet: client?.wallet?.balance || 0,
  }));

  const intervalOptions = [
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Biannually",
    "Annually",
  ];

  const isFormValid = () => {
    return !state.client || !state.subscriptionOptions[0]?.data?.length;
  };

  const { data: plans } = useGetCorporatePlans({});

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handlePlanSelection = (plan) => {
    const tempFeatureTypes = [];
    const temp = plan.features.map((feature) => {
      tempFeatureTypes.push(getFeatureType(feature.featureType, feature.value));
      setFeatureTypes(tempFeatureTypes);
      return {
        planFeature: feature.id,
        data: [],
        limit: feature.value,
        type:
          feature.featureType === 0
            ? "vehicle"
            : feature.featureType === 3
            ? "location"
            : null,
      };
    });

    setState({
      ...state,
      membershipPlan: plan.id,
      subscriptionOptions: temp,
    });
  };

  const getFeatureType = (type, limit) => {
    switch (type) {
      case 0:
        return { vehicle: parseInt(limit) };

      case 3:
        return { location: parseInt(limit) };

      case 6:
        return { users: parseInt(limit) };

      default:
        break;
    }
  };

  const handleUsersSelect = (data) => {
    const temp = state.subscriptionOptions;

    temp[0].data = data.map((data) => data.value);

    setState({ ...state, subscriptionOptions: temp });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...state });
  };

  console.log(state);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />

        {state.membershipPlan ? (
          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            justifyContent="center"
            w="30rem"
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Box bg="#0D0718" borderRadius="8px" p={4} mb={4}>
              <Text color="#fff" fontSize="14px" fontWeight={500}>
                {plans?.find((plan) => plan.id === state.membershipPlan)?.name}
              </Text>

              <Flex justifyContent="space-between" mt={3}>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="10px" color="#fff">
                    Price{" "}
                  </Text>
                  <Text fontSize="12px" color="#848688" fontWeight={500}>
                    ₦
                    {plans
                      ?.find((plan) => plan.id === state.membershipPlan)
                      ?.amount?.toLocaleString()}
                  </Text>
                </Flex>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="10px" color="#fff">
                    Duration{" "}
                  </Text>
                  <Text fontSize="12px" color="#848688" fontWeight={500}>
                    {
                      intervalOptions[
                        plans?.find((plan) => plan.id === state.membershipPlan)
                          ?.interval
                      ]
                    }
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select a Client
              </Text>
              <Select
                styles={customStyles}
                onChange={({ value, wallet }) => {
                  setState({ ...state, client: value, wallet });
                  getClientUsers(value);
                }}
                options={clientOptions}
                placeholder="Select a Client"
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select up to 2 Users
              </Text>
              <Select
                styles={customStyles}
                onChange={handleUsersSelect}
                options={userOptions}
                isMulti={state.subscriptionOptions[0]?.limit > 1}
                placeholder="Select users"
              />
            </Box>

            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Corporate Payment Method
            </Text>

            <Flex
              bg="#fff"
              borderRadius="16px"
              py="15px"
              px="15px"
              justifyContent="between"
              w="100%"
              flexDir="column"
              border="1px solid #E4E6E8"
              mb={5}
            >
              <Flex flexDir={"column"}>
                <Text fontSize={"12px"}>Wallet</Text>
                <Text fontWeight={"500"} fontSize={12}>
                  Balance: ₦{state.wallet?.toLocaleString() || 0}
                </Text>
              </Flex>
            </Flex>

            <Flex
              align="center"
              justifyContent={"space-between"}
              gap="15px"
              mb="16px"
            >
              <Text fontSize="12px" fontWeight={500} color="#444648">
                Renew Automatically
              </Text>
              <Switch
                onChange={() =>
                  setState({
                    ...state,
                    autoRenewal: state.autoRenewal ? 0 : 1,
                  })
                }
                size="sm"
                variant="adminPrimary"
              />
            </Flex>

            <Flex gap={4} mt={4}>
              <Button
                variant="adminSecondary"
                w="45%"
                onClick={() =>
                  navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS)
                }
              >
                Cancel
              </Button>
              <Button
                variant="adminPrimary"
                w="55%"
                isDisabled={isDisabled}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Add Subscription
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Box border="1px solid #E4E6E8" w="full" p={5} borderRadius="8px">
            <SimpleGrid templateColumns="1fr 1fr 1fr" gap={4} w="full">
              {plans?.map((plan) => (
                <Flex
                  key={plan.id}
                  border="1px solid #E4E6E8"
                  borderRadius="8px"
                  justifyContent="space-between"
                  p={3}
                  alignItems="center"
                >
                  <Box>
                    <Text
                      color="#848688"
                      fontWeight={500}
                      mb={2}
                      fontSize="14px"
                    >
                      {plan.name}
                    </Text>

                    <Flex alignItems="end" gap={2} mb={1}>
                      <Text fontSize="10px">Price </Text>
                      <Text fontSize="12px" color="#848688" fontWeight={500}>
                        ₦{plan.amount?.toLocaleString()}
                      </Text>
                    </Flex>
                    <Flex alignItems="end" gap={2}>
                      <Text fontSize="10px">Duration </Text>
                      <Text fontSize="12px" color="#848688" fontWeight={500}>
                        {intervalOptions[plan.interval]}
                      </Text>
                    </Flex>
                  </Box>
                  <Button
                    variant="adminPrimary"
                    onClick={() => handlePlanSelection(plan)}
                  >
                    Select
                  </Button>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
