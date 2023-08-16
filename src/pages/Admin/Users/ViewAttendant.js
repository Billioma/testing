import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { AiOutlineCamera } from "react-icons/ai";
import Select from "react-select";
import { useGetAllOperators } from "../../../services/admin/query/operators";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useEditAttendant } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import AdminChangePassword from "../../../components/modals/AdminChangePasswordModal";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

export default function AddAttendants() {
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
  const [operatorOptions, setOperatorOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useGetAllOperators();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useEditAttendant({
    onSuccess: () => {
      successToast("Attendant updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occured"
      );
    },
  });

  const { data: locationsData } = useGetAllLocations();
  const [locationOptions, setLocationOptions] = useState([]);

  const isFormValid = () => {
    return (
      !state.name ||
      !state.userId ||
      !state.accountType ||
      !state.operator ||
      !state.locations?.length
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

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

  const selectOptions = [
    { label: "PARKING", value: "PARKING" },
    { label: "VALET", value: "VALET" },
    { label: "SERVICE", value: "SERVICE" },
    { label: "OTHERS", value: "OTHERS" },
  ];

  const handleSubmit = (data = state) => {
    mutate({ ...data, id: state.id, locations: state.locations });
  };

  useEffect(() => {
    if (!data?.data) return;
    const temp = data?.data?.map((operator) => ({
      label: operator.name,
      value: operator.id,
    }));
    setOperatorOptions(temp);
  }, [data?.data]);

  useEffect(() => {
    const temp = locationsData?.data?.map((location) => ({
      label: location.name,
      value: location.id,
    }));
    setLocationOptions(temp);
  }, [locationsData]);

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
      operator: parseInt(location.state?.operator?.id),
      locations: locationOptions
        ?.filter((option) =>
          location.state.locations?.find(
            (location) => location.id === option.value
          )
        )
        ?.map((option) => parseInt(option.value)),
    });

    setIsEdit(location?.state?.isEdit);
  }, [location.state, locationOptions]);

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
          <Box
            alignSelf={"center"}
            justifyContent={"center"}
            mb={5}
            display="flex"
            flexDir="column"
          >
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
              alignSelf={"center"}
            >
              <AiOutlineCamera size={32} />
            </Box>

            <Button
              variant="adminSecondary"
              fontSize="12px"
              mt={4}
              h="32px"
              onClick={() => setIsOpen(true)}
            >
              Change Password
            </Button>
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
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
            />
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
              value={selectOptions?.find(
                (option) => option.value === state.accountType
              )}
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Assign Operator
            </Text>
            <Select
              styles={customStyles}
              options={operatorOptions}
              placeholder="Select an operator"
              onChange={(selectedOption) =>
                setState({
                  ...state,
                  operator: parseInt(selectedOption.value),
                })
              }
              value={operatorOptions?.find(
                (operator) => operator.value == state.operator
              )}
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Locations
            </Text>
            <Select
              styles={customStyles}
              options={locationOptions}
              placeholder="Select locations"
              onChange={(selectedOptions) =>
                setState({
                  ...state,
                  locations: selectedOptions.map((option) => option.value),
                })
              }
              value={locationOptions?.filter((option) =>
                state.locations?.find((location) => location == option.value)
              )}
              isDisabled={!isEdit}
              isMulti
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
