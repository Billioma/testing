import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useDeletePayToPark } from "../../../services/admin/query/transactions";

export default function ViewPayToPark() {
  const [state, setState] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading: isDeleting } = useDeletePayToPark({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      navigate(-1);
    },

    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const { errorToast, successToast } = useCustomToast();

  const billingTypes = ["ADHOC", "COMPLEMENTARY", "SUBSCRIPTION", "EVENT"];

  const handleSubmit = (data = state) => {
    mutate(state.id);
  };

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
    });
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
              Ticket Number
            </Text>
            <CustomInput
              auth
              value={state.ticketNumber}
              mb
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Amount
            </Text>
            <CustomInput
              auth
              value={"₦" + state.amount?.toLocaleString()}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Billing Type
            </Text>
            <CustomInput
              auth
              value={billingTypes[state.billingType]}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Payment Status
            </Text>
            <CustomInput
              auth
              value={state.transaction?.status ? "Paid" : "Unpaid"}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Zone
            </Text>
            <CustomInput
              auth
              value={state.zone?.code}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Service Type
            </Text>
            <CustomInput
              auth
              value={state.service?.name}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Vehicle
            </Text>
            <CustomInput
              auth
              value={state.vehicle?.licensePlate}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Status
            </Text>

            <CustomInput
              auth
              value={state.status ? "ACTIVE" : "INACTIVE"}
              mb
              type="text"
              isDisabled={!isEdit}
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminDanger"
              w="100%"
              onClick={() => setIsOpen(true)}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <AdminDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Transaction"
        subTitle="Are you sure you want to delete this transaction?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
}
