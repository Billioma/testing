import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useCreateMembershipFeature,
  useGetMembershipPlans,
} from "../../../services/admin/query/memberships";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import { useGetAllLocations } from "../../../services/admin/query/locations";

export default function AddOperator() {
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

  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateMembershipFeature({
    onSuccess: () => {
      successToast("Membership feature added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: membershipPlans } = useGetMembershipPlans({}, 1, 100000);
  const { data: customers } = useGetAllCustomers();
  const { data: locations } = useGetAllLocations();

  const customerOptions = customers?.data?.map((customer) => ({
    label: `${customer.profile?.firstName} ${customer.profile?.lastName}`,
    value: customer.id,
  }));

  const membershipPlanOptions = membershipPlans?.data?.map((plan) => ({
    label: plan.name,
    value: parseInt(plan.id),
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  const isFormValid = () => {
    return (
      !state.name || !state.value || !state.membershipPlan || !state.featureType
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
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

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
      membershipPlan: parseInt(location.state.membershipPlan.id),
      customer: location.state.customer.id,
      amount: location.state.membershipPlan.amount,
    });

    setIsEdit(location?.state?.isEdit);
  }, [location.state]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />

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
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Subscription plan
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "membershipPlan" })
              }
              options={membershipPlanOptions}
              placeholder="Select plan"
              value={membershipPlanOptions?.find(
                (plan) => plan.value === state.membershipPlan
              )}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Amount
            </Text>
            <CustomInput
              auth
              value={state.amount}
              type="number"
              mb
              holder="Enter amount"
              onChange={(e) => setState({ ...state, amount: e.target.value })}
              isDisabled={!isEdit}
            />
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
              value={customerOptions?.find(
                (customer) => customer.value === state.customer
              )}
              placeholder="Select customer"
              isDisabled={!isEdit}
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
              // options={featureTypes}
              multi
              placeholder="Select vehicles"
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
      </Flex>
    </Box>
  );
}
