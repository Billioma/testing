import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useDeletePolicy,
  useEditPolicy,
  useGetLocations,
  useGetPolicies,
} from "../../../services/admin/query/locations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";

export default function ViewPolicy() {
  const [state, setState] = useState({
    status: 1,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetPolicies();
  const { mutate, isLoading } = useEditPolicy({
    onSuccess: () => {
      successToast("Policy updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_POLICIES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deletePolicy, isLoading: isDeleting } = useDeletePolicy({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_POLICIES);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const { data: locations } = useGetLocations({}, 1, 1000);

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: parseInt(location.id),
  }));

  const isFormValid = () => {
    return !state.title || !state.body || !state.location;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  useEffect(() => {
    setState({
      ...location.state,
      location: parseInt(location.state?.location?.id),
    });
    setIsEdit(location.state.isEdit);
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
              Title
            </Text>
            <CustomInput
              auth
              value={state.title}
              mb
              holder="Enter policy title"
              onChange={(e) => setState({ ...state, title: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Description
            </Text>
            <CustomInput
              opt
              auth
              value={state.body}
              mb
              holder="Enter policy description"
              onChange={(e) => setState({ ...state, body: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Location
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select location"
              options={locationOptions}
              onChange={(selectedOption) =>
                setState({ ...state, location: selectedOption.value })
              }
              value={locationOptions?.find(
                (location) => location.vale === state.location
              )}
              isDisabled={!isEdit}
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant={!isEdit ? "adminDanger" : "adminSecondary"}
              w="45%"
              onClick={() =>
                !isEdit ? setIsOpen(true) : navigate(PRIVATE_PATHS.ADMIN_ZONES)
              }
            >
              {!isEdit ? "Delete" : "Cancel"}
            </Button>
            <Button
              variant="adminPrimary"
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

      <AdminDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Policy"
        subTitle="Are you sure you want to delete this policy?"
        handleSubmit={() => deletePolicy(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
