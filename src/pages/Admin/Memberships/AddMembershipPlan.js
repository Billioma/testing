import React, { useState } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import { useCreateMembershipPlan } from "../../../services/admin/query/memberships";
import { IoIosArrowDown } from "react-icons/io";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    description: "",
    amount: "",
    interval: 0,
    isActive: 0,
    isCorporate: 0,
    isUpgradable: 0,
    isGlobal: 0,
    status: 1,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const isDisabled =
    !state.name || !state.description || !state.amount || !state.interval;
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } =
    useCreateMembershipPlan({
      onSuccess: () => {
        successToast("Membership plan created successfully!");
        navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
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

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    updateMutate({
      name: state?.name,
      description: state?.description,
      amount: Number(state?.amount),
      interval: state?.interval?.value,
      isActive: state?.isActive,
      isCorporate: state?.isCorporate,
      isGlobal: state?.isGlobal,
      isUpgradable: state?.isUpgradable,
    });
  };

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
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
            <form
              onSubmit={(e) => {
                isDisabled
                  ? setFormSubmitted(true)
                  : (setFormSubmitted(true), handleSubmit(e));
                e.preventDefault();
              }}
            >
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Plan Name{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "15px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <CustomInput
                  auth
                  value={state.name}
                  mb
                  error={formSubmitted && !state?.name ? true : false}
                  holder="Enter plan name"
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
                {formSubmitted && !state?.name && (
                  <Text mt="-3px" fontSize="12px" color="tomato">
                    Name is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Plan Description{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "15px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <CustomInput
                  auth
                  value={state.description}
                  mb
                  error={formSubmitted && !state?.description ? true : false}
                  holder="What is the plan for?"
                  onChange={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                />
                {formSubmitted && !state?.description && (
                  <Text mt="-3px" fontSize="12px" color="tomato">
                    Description is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Amount{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "15px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <CustomInput
                  auth
                  value={state.amount}
                  type="number"
                  mb
                  error={formSubmitted && !state?.amount ? true : false}
                  holder="Enter amount"
                  onChange={(e) =>
                    setState({ ...state, amount: e.target.value })
                  }
                />
                {formSubmitted && !state?.amount && (
                  <Text mt="-3px" fontSize="12px" color="tomato">
                    Amount is required
                  </Text>
                )}
              </Box>

              <Box mb="24px">
                <Text
                  color="#444648"
                  lineHeight="100%"
                  fontSize="12px"
                  fontWeight={500}
                  mb="8px"
                >
                  Select Interval{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "15px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <Select
                  styles={
                    formSubmitted && !state?.interval
                      ? errorCustomStyles
                      : customStyles
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "interval",
                    })
                  }
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
                  options={intervalOptions}
                  value={state?.interval}
                  placeholder="Select interval"
                />

                {formSubmitted && !state?.interval && (
                  <Text mt="5px" fontSize="12px" color="tomato">
                    Interval is required
                  </Text>
                )}
              </Box>

              <Flex
                align="center"
                justifyContent={"space-between"}
                gap="15px"
                mb="16px"
              >
                <Text fontSize="12px" fontWeight={500} color="#444648">
                  Activate plan
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
                  isChecked={state.isActive}
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
                  isChecked={state.isCorporate}
                />
              </Flex>

              <Flex
                align="center"
                justifyContent={"space-between"}
                gap="15px"
                mb="16px"
              >
                <Text fontSize="12px" fontWeight={500} color="#444648">
                  Set as Global Plan
                </Text>
                <Switch
                  onChange={() =>
                    setState({
                      ...state,
                      isGlobal: state.isGlobal ? 0 : 1,
                    })
                  }
                  size="sm"
                  variant="adminPrimary"
                  isChecked={state.isGlobal}
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
                  isChecked={state.isUpgradable}
                />
              </Flex>

              <Flex gap={4} mt={4}>
                <Button
                  variant="adminSecondary"
                  w="100%"
                  onClick={() => navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS)}
                >
                  Cancel
                </Button>
                <Button
                  variant="adminPrimary"
                  w="100%"
                  type="submit"
                  isLoading={isUpdating}
                >
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
