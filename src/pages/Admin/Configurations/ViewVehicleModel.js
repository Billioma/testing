import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import {
  useDeleteModel,
  useEditModel,
  useGetMakes,
  useGetModels,
} from "../../../services/admin/query/configurations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";

export default function AddVehicleMake() {
  const [state, setState] = useState({
    status: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { data: makes } = useGetMakes({}, 1, 10000);
  const { refetch } = useGetModels();
  const { mutate, isLoading } = useEditModel({
    onSuccess: () => {
      successToast("Model updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteModel, isLoading: isDeleting } = useDeleteModel({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const makeOptions = makes?.data?.map((make) => ({
    label: make.name,
    value: parseInt(make.id),
  }));

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
      make: parseInt(location.state?.make?.id),
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
              Model Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter model name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Make
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select make"
              options={makeOptions}
              onChange={(selectedOption) =>
                setState({ ...state, make: selectedOption.value })
              }
              value={makeOptions?.find((make) => make.value === state.make)}
              isDisabled={!isEdit}
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
        title="Delete Model"
        subTitle="Are you sure you want to delete this model?"
        handleSubmit={() => deleteModel(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
