import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, SimpleGrid, Switch } from "@chakra-ui/react";

import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useCreateMembershipFeature,
  useGetMembershipPlans,
} from "../../../services/admin/query/memberships";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import { useGetVehicles } from "../../../services/admin/query/vehicles";

export default function AddCustomerSubscription() {
  const [state, setState] = useState({
    customer: 0,
    membershipPlan: "",
    subscriptionOptions: [
      {
        planFeature: 0,
        data: "string",
      },
    ],
    startDate: "2023-08-17T22:23:13.028Z",
    nextPaymentDate: "2023-08-17T22:23:13.028Z",
    autoRenewal: 0,
    status: 1,
    paymentMethod: "0",
    cardId: 0,
    notifyCustomer: 0,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { data: vehicles } = useGetVehicles({}, 1, 100000);

  const { mutate, isLoading } = useCreateMembershipFeature({
    onSuccess: () => {
      successToast("Customer subscription added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: customers } = useGetAllCustomers();
  const { data: locations } = useGetAllLocations();

  const customerOptions = customers?.data?.map((customer) => ({
    label: `${customer.profile?.firstName} ${customer.profile?.lastName}`,
    value: customer.id,
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: location.id,
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

  // const isFormValid = () => {
  //   return (
  //     !state.name || !state.value || !state.membershipPlan || !state.featureType
  //   );
  // };

  const { data: plans } = useGetMembershipPlans({}, 1, 100000);

  useEffect(() => {
    setIsDisabled(false);
  }, [state]);

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...state });
  };

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
                {
                  plans?.data?.find((plan) => plan.id === state.membershipPlan)
                    ?.name
                }
              </Text>

              <Flex justifyContent="space-between" mt={3}>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="10px" color="#fff">
                    Price{" "}
                  </Text>
                  <Text fontSize="12px" color="#848688" fontWeight={500}>
                    ₦
                    {plans?.data
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
                        plans?.data?.find(
                          (plan) => plan.id === state.membershipPlan
                        )?.interval
                      ]
                    }
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select a customer
              </Text>
              <Select
                styles={customStyles}
                onChange={({ value }) =>
                  handleSelectChange(value, { name: "customer" })
                }
                options={customerOptions}
                placeholder="Select customer "
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select up to 2 vehicles
              </Text>
              <Select
                styles={customStyles}
                onChange={({ value }) =>
                  handleSelectChange(value, { name: "vehicles" })
                }
                isMulti
                options={vehicles?.data
                  ?.filter((vehicle) => vehicle.customer?.id == state.customer)
                  ?.map((vehicle) => ({
                    label: `${vehicle.color} - ${vehicle.make.name} - ${vehicle.model.name}`,
                    value: vehicle.id,
                  }))}
                multi
                placeholder="Select vehicles"
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select a location
              </Text>
              <Select
                styles={customStyles}
                onChange={({ value }) =>
                  handleSelectChange(value, { name: "location" })
                }
                options={locationOptions}
                placeholder="Select location"
              />
            </Box>

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
                    isUpgradable: state.isUpgradable ? 0 : 1,
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
                  navigate(PRIVATE_PATHS.ADMIN_CUSTOMER_SUBSCRIPTIONS)
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
                Save
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Box border="1px solid #E4E6E8" w="full" p={5} borderRadius="8px">
            <SimpleGrid templateColumns="1fr 1fr 1fr" gap={4} w="full">
              {plans?.data?.map((plan) => (
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
                    onClick={() =>
                      setState({ ...state, membershipPlan: plan.id })
                    }
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
