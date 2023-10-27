import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetServices } from "../../../services/admin/query/services";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import {
  useDeleteBankDetail,
  useEditBankDetail,
  useGetBankDetails,
} from "../../../services/admin/query/configurations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";

export default function AddBankDetail() {
  const [state, setState] = useState({
    status: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetBankDetails();
  const { mutate, isLoading } = useEditBankDetail({
    onSuccess: () => {
      successToast("Bank detail updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteBankDetail, isLoading: isDeleting } =
    useDeleteBankDetail({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsOpen(false);
        refetch();
        navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { data: services } = useGetServices(null, 1, 100);

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: parseInt(service.id),
  }));

  const isFormValid = () => {
    return (
      !state.bankName ||
      !state.accountName ||
      !state.accountNumber ||
      !state.service
    );
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
      service: parseInt(location.state?.service?.id),
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
              Bank Name
            </Text>
            <CustomInput
              auth
              value={state.bankName}
              mb
              holder="Enter bank name"
              onChange={(e) => setState({ ...state, bankName: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Account Number
            </Text>
            <CustomInput
              auth
              value={state.accountNumber}
              mb
              holder="Enter account number"
              onChange={(e) =>
                setState({ ...state, accountNumber: e.target.value })
              }
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Account Name
            </Text>
            <CustomInput
              auth
              value={state.accountName}
              mb
              holder="Enter account name"
              onChange={(e) =>
                setState({ ...state, accountName: e.target.value })
              }
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Sort Code
            </Text>
            <CustomInput
              auth
              value={state.sortCode}
              mb
              holder="Enter sort code"
              onChange={(e) => setState({ ...state, sortCode: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Service
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select service"
              options={serviceOptions}
              onChange={({ value }) => setState({ ...state, service: value })}
              value={serviceOptions?.find(
                (service) => service.value === state?.service
              )}
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
                  : navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS)
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
        title="Delete Bank Detail"
        subTitle="Are you sure you want to delete this bank detail?"
        handleSubmit={() => deleteBankDetail(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
