import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useEditCustomer } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import AdminChangePassword from "../../../components/modals/AdminChangePasswordModal";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

export default function ViewCustomer() {
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useEditCustomer({
    onSuccess: () => {
      successToast("Customer updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const isFormValid = () => {
    return !state.firstName || !state.lastName || !state.phone || !state.email;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = (data = state) => {
    mutate({ ...data, id: state.id });
  };

  useEffect(() => {
    const { firstName, lastName, companyName, phone } = location.state.profile;
    const { email, status, id } = location.state;
    setState({
      firstName,
      lastName,
      email,
      phone,
      companyName,
      status,
      id,
    });
    setIsEdit(location?.state?.isEdit);
  }, [location.state]);

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
              First Name
            </Text>
            <CustomInput
              auth
              value={state.firstName}
              mb
              holder="Enter first name"
              onChange={(e) =>
                setState({ ...state, firstName: e.target.value })
              }
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Last Name
            </Text>
            <CustomInput
              auth
              value={state.lastName}
              mb
              holder="Enter last name"
              onChange={(e) => setState({ ...state, lastName: e.target.value })}
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Company Name
            </Text>
            <CustomInput
              auth
              value={state.companyName}
              mb
              holder="Enter your company name"
              onChange={(e) =>
                setState({ ...state, companyName: e.target.value })
              }
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Status
            </Text>
            <Select
              styles={customStyles}
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
              placeholder="Select an operator"
              onChange={(selectedOption) =>
                setState({
                  ...state,
                  status: selectedOption.value,
                })
              }
              value={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ].find((status) => status.value === state.status)}
              isDisabled={!isEdit}
            />
          </Box>
          <Button
            variant="adminSecondary"
            fontSize="12px"
            mt={4}
            h="32px"
            onClick={() => setIsOpen(true)}
            alignSelf={"center"}
          >
            Change Password
          </Button>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS)}
            >
              Cancel
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isEdit && isDisabled}
              isLoading={!isOpen && isLoading}
              onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>

        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w={{ md: "30rem", base: "100%" }}
          flexDir="column"
          border="1px solid #E4E6E8"
          h="fit-content"
          display={isEdit ? "none" : "flex"}
        >
          <Text
            alignSelf={"center"}
            color="#646668"
            fontWeight={500}
            fontSize={"14px"}
          >
            Customer Payments
          </Text>

          <Flex gap={4} flexDir="column" mt={4}>
            <Box p="16px" border="1px solid #D4D6D8" borderRadius={"4px"}>
              <Text fontSize="12px" color="#646668">
                Wallet
              </Text>
              <Text fontSize="14px" color="#646668" mt={1}>
                Balance: ₦{location.state?.wallet?.balance?.toLocaleString()}
              </Text>
            </Box>

            <Box p="16px" border="1px solid #D4D6D8" borderRadius={"4px"}>
              <Text fontSize="12px" color="#646668">
                Card Details
              </Text>
              <Text fontSize="14px" color="#646668" mt={1}>
                No Card Added yet
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <AdminChangePassword
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
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
