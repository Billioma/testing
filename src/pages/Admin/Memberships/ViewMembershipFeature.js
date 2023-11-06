import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useEditMembershipFeature,
  useGetMembershipPlans,
} from "../../../services/admin/query/memberships";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    value: "",
    featureType: null,
    membershipPlan: "",
    status: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useEditMembershipFeature({
    onSuccess: () => {
      successToast("Membership feature updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
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

  const isFormValid = () => {
    return (
      !state.name ||
      !state.value ||
      !state.membershipPlan ||
      state.featureType === null
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

  const handleSubmit = () => {
    mutate({ ...state });
  };

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
      membershipPlan: parseInt(location.state.membershipPlan.id),
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
              Select Membership Plan
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "membershipPlan" })
              }
              options={membershipPlanOptions}
              placeholder="Select membership plan"
              value={membershipPlanOptions?.find(
                (feature) => feature.value === state.membershipPlan
              )}
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Feature Type
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "featureType" })
              }
              options={featureTypes}
              placeholder="Select feature type"
              value={featureTypes.find(
                (feature) => feature.value === state.featureType
              )}
              isDisabled={!isEdit}
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
              onChange={(e) =>
                setState({ ...state, value: e.target.value.toString() })
              }
              value={state.value}
              isDisabled={!isEdit}
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES)}
            >
              Cancel
            </Button>
            <Button
              variant={isEdit ? "adminPrimary" : "adminPrimary"}
              w="55%"
              isDisabled={isEdit && isDisabled}
              isLoading={isLoading}
              onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
