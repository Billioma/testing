import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useDeleteMake,
  useEditMake,
  useGetMakes,
} from "../../../services/admin/query/configurations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";

export default function AddVehicleMake() {
  const [state, setState] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetMakes();
  const { mutate, isLoading } = useEditMake({
    onSuccess: () => {
      successToast("Make updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteMake, isLoading: isDeleting } = useDeleteMake({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const isFormValid = () => {
    return !state.name;
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
              Vehicle Make
            </Text>
            <CustomInput
              auth
              value={state.name}
              isDisabled={!isEdit}
              mb
              holder="Enter vehicle make"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant={!isEdit ? "adminDanger" : "adminSecondary"}
              w="45%"
              onClick={() =>
                !isEdit
                  ? setIsOpen(true)
                  : navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES)
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
        title="Delete Make"
        subTitle="Are you sure you want to delete this make?"
        handleSubmit={() => deleteMake(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
