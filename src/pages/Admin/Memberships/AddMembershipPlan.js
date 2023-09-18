import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import { useCreateMembershipPlan } from "../../../services/admin/query/memberships";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    description: "",
    amount: "",
    interval: 0,
    isActive: 0,
    isCorporate: 0,
    isUpgradable: 0,
    status: 1,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useCreateMembershipPlan({
    onSuccess: () => {
      successToast("Membership plan added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const intervalOptions = [
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Biannually",
    "Annually",
  ].map((interval, index) => ({ label: interval, value: index }));

  const isFormValid = () => {
    return !state.name || !state.description || !state.amount;
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
              Plan Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter plan name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Plan Description
            </Text>
            <CustomInput
              auth
              value={state.description}
              mb
              holder="What is the plan for?"
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
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
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Select Interval
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "interval" })
              }
              options={intervalOptions}
              placeholder="Select interval"
            />
          </Box>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Activate plan on creation
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  isActive: state.isActive ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Set as Corporate Plan
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  isCorporate: state.isCorporate ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Set as Upgradeable Plan
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
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS)}
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
