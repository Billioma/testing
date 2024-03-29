import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Switch,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";

import Select from "react-select";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useCreateCorporateSubscription,
  useGetCorporatePlans,
} from "../../../services/admin/query/memberships";
import {
  useGetClientUsers,
  useGetClients,
} from "../../../services/admin/query/clients";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

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
  const { errorToast, successToast } = useCustomToast();

  const { data: clients, refetch: refetchClient } = useGetClients(
    {},
    1,
    100000
  );
  const { mutate, isLoading } = useCreateCorporateSubscription({
    onSuccess: () => {
      refetchClient();
      successToast("Corporate subscription created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const {
    data: clientUsers,
    mutate: getClientUsers,
    isLoading: isUser,
  } = useGetClientUsers();

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

  const { data: plans, isLoading: isPlanning } = useGetCorporatePlans({});

  const handlePlanSelection = (plan) => {
    const tempFeatureTypes = [];
    const temp = plan.features.map((feature) => {
      tempFeatureTypes.push(getFeatureType(feature.featureType, feature.value));
      setFeatureTypes(tempFeatureTypes[0] ? tempFeatureTypes : []);
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
    if (!state || !state.subscriptionOptions) {
      return;
    }

    const temp = [...state.subscriptionOptions];
    if (temp[0]) {
      temp[0].data = data?.map((userData) => userData?.value) || [];
    } else {
      return;
    }

    setState({ ...state, subscriptionOptions: temp });
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...state });
  };

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir="column">
        {!state?.membershipPlan ? (
          <>
            <Box w="fit-content">
              <GoBackTab />
            </Box>

            {isPlanning ? (
              <Box border="1px solid #E4E6E8" w="full" p={5} borderRadius="8px">
                <SimpleGrid templateColumns="1fr 1fr 1fr" gap={4} w="full">
                  <Skeleton h="150px" borderRadius="8px"></Skeleton>
                  <Skeleton h="150px" borderRadius="8px"></Skeleton>
                  <Skeleton h="150px" borderRadius="8px"></Skeleton>
                  <Skeleton h="150px" borderRadius="8px"></Skeleton>
                  <Skeleton h="150px" borderRadius="8px"></Skeleton>
                  <Skeleton h="150px" borderRadius="8px"></Skeleton>
                </SimpleGrid>
              </Box>
            ) : (
              ""
            )}
          </>
        ) : (
          <Box
            w="fit-content"
            py={2}
            mb={3}
            color="#242628"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Flex
              align="center"
              fontWeight="500"
              lineHeight="100%"
              cursor="pointer"
              gap="8px"
              onClick={() => {
                setState({
                  ...state,
                  client: "",
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
                setFormSubmitted(false);
                setFeatureTypes([]);
              }}
            >
              <HiOutlineArrowNarrowLeft size={20} />
              Back
            </Flex>
          </Box>
        )}
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          {state?.membershipPlan ? (
            <Flex
              bg="#fff"
              borderRadius="8px"
              py="32px"
              px="24px"
              justifyContent="center"
              w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
              flexDir="column"
              border="1px solid #E4E6E8"
            >
              <Box bg="#0D0718" borderRadius="8px" p={4} mb={4}>
                <Text color="#fff" fontWeight={500}>
                  {
                    plans?.find((plan) => plan.id === state?.membershipPlan)
                      ?.name
                  }
                </Text>

                <Flex justifyContent="space-between" mt={3}>
                  <Flex alignItems="end" gap={2} mb={1}>
                    <Text fontSize="12px" color="#fff">
                      Price{" "}
                    </Text>
                    <Text fontSize="14px" color="#848688" fontWeight={500}>
                      ₦
                      {plans
                        ?.find((plan) => plan.id === state?.membershipPlan)
                        ?.amount?.toLocaleString()}
                    </Text>
                  </Flex>
                  <Flex alignItems="end" gap={2} mb={1}>
                    <Text fontSize="12px" color="#fff">
                      Duration{" "}
                    </Text>
                    <Text fontSize="14px" color="#848688" fontWeight={500}>
                      {
                        intervalOptions[
                          plans?.find(
                            (plan) => plan.id === state?.membershipPlan
                          )?.interval
                        ]
                      }
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <form
                onSubmit={(e) => {
                  (featureTypes?.length &&
                    !state?.subscriptionOptions[0]?.data?.length) ||
                  !state?.client
                    ? setFormSubmitted(true)
                    : (setFormSubmitted(true), handleSubmit(e));
                  e.preventDefault();
                }}
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Select a Client
                  </Text>
                  <Select
                    components={{
                      IndicatorSeparator: () => (
                        <div style={{ display: "none" }}></div>
                      ),
                      DropdownIndicator: () => (
                        <div>
                          <IoIosArrowDown size="15px" color="#646668" />
                        </div>
                      ),
                    }}
                    styles={
                      formSubmitted && !state?.client
                        ? errorCustomStyles
                        : customStyles
                    }
                    onChange={({ value, wallet }) => {
                      setState({ ...state, client: value, wallet });
                      featureTypes?.length && getClientUsers(value);
                    }}
                    options={clientOptions}
                    placeholder="Select a Client"
                  />
                  {formSubmitted && !state?.client && (
                    <Text mt="5px" fontSize="12px" color="tomato">
                      Client is required
                    </Text>
                  )}
                </Box>
                {isUser ? (
                  <Flex justifyContent="center" align="center" w="full">
                    <Spinner />
                  </Flex>
                ) : clientUsers?.length && featureTypes?.length ? (
                  <>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Select up to 2 Users
                      </Text>
                      <Select
                        components={{
                          IndicatorSeparator: () => (
                            <div style={{ display: "none" }}></div>
                          ),
                          DropdownIndicator: () => (
                            <div>
                              <IoIosArrowDown size="15px" color="#646668" />
                            </div>
                          ),
                        }}
                        styles={
                          featureTypes?.length &&
                          formSubmitted &&
                          !state?.subscriptionOptions[0]?.data?.length
                            ? errorCustomStyles
                            : customStyles
                        }
                        onChange={handleUsersSelect}
                        options={userOptions}
                        isMulti
                        placeholder="Select users"
                      />

                      {featureTypes?.length
                        ? formSubmitted &&
                          !state?.subscriptionOptions[0]?.data?.length && (
                            <Text mt="5px" fontSize="12px" color="tomato">
                              Select at least one user
                            </Text>
                          )
                        : ""}
                    </Box>
                  </>
                ) : featureTypes?.length ? (
                  state.client &&
                  !clientUsers?.length && (
                    <Text
                      textAlign="center"
                      color="tomato"
                      fontWeight={500}
                      fontSize="13px"
                    >
                      This client has no users
                    </Text>
                  )
                ) : (
                  ""
                )}
                {state?.client ? (
                  <>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Corporate Payment Method
                    </Text>
                    <Flex
                      bg="#fff"
                      borderRadius="4px"
                      p="15px"
                      justifyContent="between"
                      w="100%"
                      flexDir="column"
                      border="1px solid #D4D6D8"
                      mb={5}
                    >
                      <Flex flexDir={"column"}>
                        <Text fontSize={"12px"}>Wallet</Text>
                        <Text fontWeight={"500"} fontSize={12}>
                          Balance: ₦ {state?.wallet?.toLocaleString() || 0}
                        </Text>
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  ""
                )}
                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                >
                  <Text fontSize="14px" fontWeight={500} color="#444648">
                    Renew Automatically
                  </Text>
                  <Switch
                    onChange={() =>
                      setState({
                        ...state,
                        autoRenewal: state?.autoRenewal ? 0 : 1,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                  />
                </Flex>{" "}
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
                    isLoading={isLoading}
                    type="submit"
                  >
                    Add Subscription
                  </Button>
                </Flex>
              </form>
            </Flex>
          ) : (
            <Box
              border="1px solid #E4E6E8"
              display={isPlanning ? "none" : "flex"}
              w="full"
              p={5}
              borderRadius="8px"
            >
              <SimpleGrid
                templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
                gap={4}
                w="full"
              >
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
                      <Text color="#848688" fontWeight={500} mb={2}>
                        {plan.name}
                      </Text>

                      <Flex alignItems="end" gap={2} mb={1}>
                        <Text fontSize="12px">Price </Text>
                        <Text fontSize="14px" color="#848688" fontWeight={500}>
                          ₦{plan.amount?.toLocaleString()}
                        </Text>
                      </Flex>
                      <Flex alignItems="end" gap={2}>
                        <Text fontSize="12px">Duration </Text>
                        <Text fontSize="14px" color="#848688" fontWeight={500}>
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
      </Flex>
    </Box>
  );
}
