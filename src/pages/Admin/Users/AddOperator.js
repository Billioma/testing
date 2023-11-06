import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useCreateOperator,
  useGetOperators,
} from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetStates } from "../../../services/customer/query/locations";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    passwordConfirmation: "",
    phone: "",
    address: "",
    contactPerson: "",
    state: "",
    status: 1,
    enableTips: 0,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { data: states } = useGetStates();
  const { refetch } = useGetOperators();
  const { mutate, isLoading } = useCreateOperator({
    onSuccess: () => {
      successToast("Operator added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_OPERATORS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const stateOptions = states?.data?.map((state) => ({
    value: state,
    label: state,
  }));

  const isFormValid = () => {
    return (
      !state.name ||
      !state.email ||
      !state.password ||
      !state.passwordConfirmation ||
      !state.state ||
      !state.phone ||
      !state.contactPerson ||
      !state.address
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...state, phone: `0${state.phone}` });
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
              Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter operator name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Email Address
            </Text>
            <CustomInput
              auth
              value={state.email}
              mb
              holder="Enter email address"
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Phone Number
            </Text>
            <CustomInput
              mb
              ngn
              name="phone"
              value={`${state?.phone}`}
              onChange={(e) => {
                const inputPhone = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
                setState({
                  ...state,
                  phone: inputPhone,
                });
              }}
              holder="Enter Phone Number"
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Address
            </Text>
            <CustomInput
              auth
              value={state.address}
              mb
              holder="Enter operator address"
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </Box>
          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              State
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select State"
              options={stateOptions}
              value={stateOptions?.find(
                (option) => option.value === state.state
              )}
              onChange={(selectedOption) =>
                setState({ ...state, state: selectedOption.value })
              }
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Contact Person
            </Text>
            <CustomInput
              auth
              value={state.contactPerson}
              mb
              holder="Enter contact person"
              onChange={(e) =>
                setState({ ...state, contactPerson: e.target.value })
              }
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
              zIndex={0.5}
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
              Confirm Password
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
              zIndex={0.5}
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

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Enable Tips
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  enableTips: state.enableTips ? 0 : 1,
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
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_OPERATORS)}
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
