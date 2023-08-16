import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCamera,
} from "react-icons/ai";
import Select from "react-select";
import { useGetAllOperators } from "../../../services/admin/query/operators";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCreateAttendant } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

export default function AddAttendants() {
  const [state, setState] = useState({
    name: "",
    password: "",
    passwordConfirmation: "",
    operator: "",
    accountType: "",
    userId: "",
    status: 1,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetAllOperators();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useCreateAttendant({
    onSuccess: () => {
      successToast("Attendant added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occured"
      );
    },
  });

  const isFormValid = () => {
    return (
      !state.name ||
      !state.userId ||
      !state.password ||
      !state.passwordConfirmation ||
      !state.accountType ||
      !state.operator
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      height: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #D4D6D8",
      background: "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
    }),
  };

  const selectOptions = [
    { label: "PARKING", value: "PARKING" },
    { label: "VALET", value: "VALET" },
    { label: "SERVICE", value: "SERVICE" },
    { label: "OTHERS", value: "OTHERS" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(state);
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
          <Box alignSelf={"center"} mb={5}>
            <Text
              fontSize="10px"
              fontWeight={500}
              color="#444648"
              textAlign="center"
            >
              Avatar
            </Text>
            <Box
              w="120px"
              h="120px"
              justifyContent="center"
              alignItems="center"
              border="4px solid #0D0718"
              borderRadius="12px"
              display="flex"
              cursor="pointer"
            >
              <AiOutlineCamera size={32} />
            </Box>
          </Box>
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Full Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter full name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              User ID
            </Text>
            <CustomInput
              auth
              value={state.userId}
              mb
              type="number"
              holder="Enter user ID"
              onChange={(e) => setState({ ...state, userId: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4} position="relative">
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Password
            </Text>
            <CustomInput
              auth
              value={state.password}
              mb
              holder="Set password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
              type={showPassword ? "text" : "password"}
            />
            <Box
              w="fit-content"
              position="absolute"
              zIndex={2}
              right={"10px"}
              top="35px"
              cursor="pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </Box>
          </Box>

          <Box position="relative" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Comfirm Password
            </Text>
            <CustomInput
              auth
              value={state.passwordConfirmation}
              mb
              holder="Re-enter password"
              onChange={(e) =>
                setState({ ...state, passwordConfirmation: e.target.value })
              }
              type={showConfirmPassword ? "text" : "password"}
            />

            <Box
              w="fit-content"
              position="absolute"
              zIndex={2}
              right={"10px"}
              top="35px"
              cursor="pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </Box>
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Select Account Type
            </Text>
            <Select
              styles={customStyles}
              options={selectOptions}
              placeholder="Select account type"
              onChange={(selectedOption) =>
                setState({
                  ...state,
                  accountType: selectedOption.value,
                })
              }
            />
          </Box>

          <Box>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Assign Operator
            </Text>
            <Select
              styles={customStyles}
              options={data?.data?.map((operator) => ({
                label: operator.name,
                value: operator.id,
              }))}
              placeholder="Select an operator"
              onChange={(selectedOption) =>
                setState({
                  ...state,
                  operator: parseInt(selectedOption.value),
                })
              }
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS)}
            >
              Cancel
            </Button>
            <Button
              variant="adminAlt"
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
