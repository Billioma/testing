import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useAddClient } from "../../../services/admin/query/clients";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import { useGetStates } from "../../../services/customer/query/locations";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetAdministrators } from "../../../services/admin/query/users";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineFolderOpen,
} from "react-icons/ai";

export default function ViewCustomer() {
  const [state, setState] = useState({ managers: [], status: 1 });
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { data: states } = useGetStates();
  const { errorToast, successToast } = useCustomToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isLoading } = useAddClient({
    onSuccess: () => {
      successToast("Client added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CLIENTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: managers } = useGetAdministrators({}, 1, 1000);

  const managerOptions = managers?.data?.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: manager.id,
  }));

  const accountTypes = ["BUSINESS", "EVENT PLANNER", "CORPORATE", "OTHERS"].map(
    (type, index) => ({ label: type, value: index })
  );

  const stateOptions = states?.data?.map((state) => ({
    value: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
    label: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  }));

  const isFormValid = () => {
    return (
      !state.name ||
      !state.email ||
      !state.billingEmail ||
      !state.contactPerson ||
      !state.phone ||
      !state.address ||
      !state.password ||
      !state.passwordConfirmation ||
      !state.state
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  return (
    <Box minH="75vh">
      <GoBackTab />
      <Flex
        justifyContent="center"
        w="full"
        flexDir={{ md: "row", base: "column" }}
        gap={5}
      >
        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w={{ md: "30rem", base: "100%" }}
          flexDir="column"
          border="1px solid #E4E6E8"
        >
          <Box alignSelf={"center"} w="full" mb={5}>
            <Text
              fontSize="10px"
              fontWeight={500}
              color="#444648"
              textAlign="center"
              mb={2}
            >
              Logo
            </Text>
            <Box
              w="100%"
              h="120px"
              justifyContent="center"
              alignItems="center"
              border="4px solid #0D0718"
              borderRadius="12px"
              display="flex"
              flexDir={"column"}
              cursor="pointer"
            >
              <AiOutlineFolderOpen size={32} />
              <Text fontSize={13}>Add Logo</Text>
            </Box>
          </Box>
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter client name"
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
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Billing Email(s)
            </Text>
            <CustomInput
              auth
              value={state.billingEmail}
              mb
              holder="Enter billing email address"
              onChange={(e) =>
                setState({ ...state, billingEmail: e.target.value })
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
          <Box mb={4}>
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Phone Number
            </Text>
            <CustomInput
              mb
              ngn
              name="phone"
              value={`${state?.phone || ""}`}
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
              holder="Enter address"
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </Box>
          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              State
            </Text>
            <CustomInput
              auth
              value={state.state}
              mb
              holder="Enter state"
              onChange={(e) => setState({ ...state, state: e.target.value })}
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

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Account Type
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select account type"
              options={accountTypes}
              onChange={(selectedOption) =>
                setState({ ...state, accountType: selectedOption.label })
              }
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Managers
            </Text>
            <Select
              isMulti
              styles={customStyles}
              placeholder="Select managers"
              options={managerOptions}
              onChange={(selectedOptions) =>
                setState({
                  ...state,
                  managers: selectedOptions.map((option) => option.value),
                })
              }
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_CLIENTS)}
            >
              Cancel
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              // isDisabled={isDisabled}
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

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    minHeight: "44px",
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
