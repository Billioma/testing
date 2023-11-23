import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
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
import { IoIosArrowDown } from "react-icons/io";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    value: "",
    featureType: null,
    membershipPlan: "",
    status: 1,
  });

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } =
    useCreateMembershipFeature({
      onSuccess: () => {
        successToast("Membership feature created successfully!");
        navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const { data: membershipPlans } = useGetMembershipPlans({}, 1, 100000);

  const membershipPlanOptions = membershipPlans?.data?.map((plan) => ({
    label: plan.name,
    value: parseInt(plan.id),
  }));

  const featureTypes = [
    "Vehicle Limit",
    "Parking Limit",
    "Valet Limit",
    "Location Limit",
    "Car Service Limit",
    "Applicable Locations",
    "User Limit",
  ].map((feature, index) => ({ label: feature, value: index }));

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    updateMutate({
      featureType: state?.featureType?.value,
      membershipPlan: state?.membershipPlan?.value,
      name: state?.name,
      value: state?.value,
      status: 1,
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
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select Membership Plan
              </Text>
              <Select
                styles={customStyles}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, {
                    name: "membershipPlan",
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
                options={membershipPlanOptions}
                placeholder="Select membership plan"
                value={state?.membershipPlan}
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Name
              </Text>
              <CustomInput
                auth
                value={state.name}
                mb
                holder="Enter name of feature"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Feature Type
              </Text>
              <Select
                styles={customStyles}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, {
                    name: "featureType",
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
                options={featureTypes}
                placeholder="Select feature type"
                value={state?.featureType}
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Value Limit
              </Text>
              <CustomInput
                auth
                mb
                type="number"
                holder="Enter limit"
                onChange={(e) => setState({ ...state, value: e.target.value })}
                value={state.value}
              />
            </Box>

            <Flex gap={4} mt={4}>
              <Button
                variant="adminSecondary"
                w="100%"
                onClick={() =>
                  navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES)
                }
              >
                Cancel
              </Button>
              <Button
                variant="adminPrimary"
                w="100%"
                isDisabled={
                  !state.name ||
                  !state.value ||
                  !state.featureType ||
                  !state.membershipPlan
                }
                isLoading={isUpdating}
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
