import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useEditClient,
  useGetClientUsers,
} from "../../../services/admin/query/clients";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import { useGetStates } from "../../../services/customer/query/locations";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { useGetAdministrators } from "../../../services/admin/query/users";
import AdminChangePassword from "../../../components/modals/AdminChangePasswordModal";

export default function ViewCustomer() {
  const [state, setState] = useState({ managers: [], status: 1 });
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isLoading } = useEditClient({
    onSuccess: () => {
      successToast("Client updated successfully!");
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
    (type) => ({ label: type, value: type })
  );

  const { data: clientUsers, mutate: getUsers } = useGetClientUsers(
    {},
    state.id
  );

  // const stateOptions = states?.data?.map((state) => ({
  //   value: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  //   label: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  // }));

  const isFormValid = () => {
    return (
      !state.name ||
      !state.email ||
      !state.billingEmail ||
      !state.contactPerson ||
      !state.phone ||
      !state.address ||
      !state.state
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = (data = {}) => {
    mutate({ ...state, ...data });
  };

  useEffect(() => {
    setState({
      ...location.state,
      phone: location.state.phone?.substring(1),
      managers: location.state.managers?.map((manager) => manager.id),
    });
    setIsEdit(location?.state?.isEdit);

    getUsers(location.state.id);
  }, [location.state]);

  return (
    <Box minH="75vh">
      <GoBackTab />
      <Flex
        justifyContent="center"
        w="full"
        flexDir={{ md: "row", base: "column" }}
        gap={10}
      >
        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w={{ lg: "30rem", base: "100%" }}
          flexDir="column"
          border="1px solid #E4E6E8"
        >
          <Flex
            alignSelf={"center"}
            flexDir={"column"}
            alignItems={"center"}
            w="full"
            mb={5}
          >
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
              w="50%"
              h="120px"
              justifyContent="center"
              alignItems="center"
              border="4px solid #0D0718"
              borderRadius="12px"
              display="flex"
              flexDir={"column"}
              cursor="pointer"
            >
              {state.avatarImage || state.logo ? (
                <Image
                  src={
                    state.avatarImage
                      ? URL?.createObjectURL(state.avatarImage)
                      : process.env.REACT_APP_BASE_URL +
                        state.logo?.substring(1)
                  }
                  alt="Avatar"
                  boxSize="100%"
                  objectFit="cover"
                />
              ) : (
                <AiOutlineFolderOpen size={32} />
              )}
            </Box>
          </Flex>
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
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
              value={accountTypes.find(
                (type) => type.value === state.accountType
              )}
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
              value={managerOptions?.filter((option) =>
                state.managers?.find((manager) => manager == option.value)
              )}
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

          <Flex justifyContent={"center"}>
            <Button
              variant="adminSecondary"
              fontSize="12px"
              mt={4}
              h="32px"
              onClick={() => setIsOpen(true)}
            >
              Change Password
            </Button>
          </Flex>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_CLIENTS)}
            >
              Cancel
            </Button>
            <Button
              variant={"adminPrimary"}
              w="55%"
              isDisabled={isEdit && isDisabled}
              isLoading={isLoading}
              onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>

        <Flex gap={5} flexDir={"column"} w={{ md: "30rem", base: "100%" }}>
          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            justifyContent="center"
            flexDir="column"
            border="1px solid #E4E6E8"
            h="fit-content"
          >
            <Text
              alignSelf={"center"}
              color="#646668"
              fontWeight={500}
              fontSize={"14px"}
            >
              Payments
            </Text>

            <Flex gap={4} flexDir="column" mt={4}>
              <Box p="16px" border="1px solid #D4D6D8" borderRadius={"4px"}>
                <Text fontSize="12px" color="#646668">
                  Wallet
                </Text>
                <Text fontSize="14px" color="#646668" mt={1}>
                  Balance: ₦0
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

          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            justifyContent="center"
            flexDir="column"
            border="1px solid #E4E6E8"
            h="fit-content"
          >
            <Text
              alignSelf={"center"}
              color="#646668"
              fontWeight={500}
              fontSize={"14px"}
            >
              Client users
            </Text>

            <Flex gap={4} flexDir="column" mt={4}>
              <Flex
                justifyContent={"space-between"}
                p="16px"
                border="1px solid #D4D6D8"
                borderRadius={"4px"}
                alignItems={"center"}
              >
                <Box>
                  <Text fontSize="12px" color="#646668">
                    Samuel Umoru
                  </Text>
                  <Text fontSize="14px" fontWeight={500} color="#646668" mt={1}>
                    sammyfish007@gmail.com
                  </Text>
                </Box>

                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  h={10}
                  w={10}
                  bg="#E4E6E8"
                  borderRadius={4}
                  cursor={"pointer"}
                >
                  X
                </Flex>
              </Flex>
            </Flex>
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
