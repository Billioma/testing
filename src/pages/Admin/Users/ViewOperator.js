import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useEditOperator } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import { useGetStates } from "../../../services/customer/query/locations";
import AdminChangePassword from "../../../components/modals/AdminChangePasswordModal";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetOperators } from "../../../services/admin/query/users";

export default function ViewOperator() {
  const [state, setState] = useState({
    name: "",
    operator: "",
    accountType: "",
    userId: "",
    locations: [],
    status: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const { data: states } = useGetStates();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetOperators();
  const { mutate, isLoading } = useEditOperator({
    onSuccess: () => {
      successToast("Operator updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_OPERATORS);
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
      !state.email ||
      !state.state ||
      !state.phone ||
      !state.contactPerson ||
      !state.address
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const stateOptions = states?.data?.map((state) => ({
    value: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
    label: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  }));

  const handleSubmit = (data = state) => {
    mutate({ ...data, id: state.id });
  };

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
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
              Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter operator name"
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
              Address
            </Text>
            <CustomInput
              auth
              value={state.address}
              mb
              holder="Enter operator address"
              onChange={(e) => setState({ ...state, address: e.target.value })}
              isDisabled={!isEdit}
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
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS)}
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
