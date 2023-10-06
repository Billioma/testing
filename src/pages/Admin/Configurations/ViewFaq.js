import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import {
  useAddFaq,
  useDeleteFaq,
  useGetFaqs,
} from "../../../services/admin/query/configurations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";

export default function AddFaq() {
  const [state, setState] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetFaqs();
  const { mutate, isLoading } = useAddFaq({
    onSuccess: () => {
      successToast("Faq updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_FAQS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteFaq, isLoading: isDeleting } = useDeleteFaq({
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
    return !state.title || !state.body;
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
              Title (The Question)
            </Text>
            <CustomInput
              auth
              value={state.title}
              mb
              holder="Enter question"
              onChange={(e) => setState({ ...state, title: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Body
            </Text>

            <Textarea
              onChange={(e) => setState({ ...state, body: e.target.value })}
              borderRadius={"4px"}
              fontSize={"12px"}
              bg="#fff"
              border="1px solid #D4D6D8"
              placeholder="Enter answer to question"
              value={state.body}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              External link
            </Text>
            <CustomInput
              auth
              value={state.externalLink}
              mb
              holder="Enter external link"
              onChange={(e) =>
                setState({ ...state, externalLink: e.target.value })
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
              placeholder="Select status"
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
              variant={!isEdit ? "adminDanger" : "adminSecondary"}
              w="45%"
              onClick={() =>
                !isEdit
                  ? setIsOpen(true)
                  : navigate(PRIVATE_PATHS.ADMIN_CONFIG_FAQS)
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
        title="Delete Question"
        subTitle="Are you sure you want to delete this question?"
        handleSubmit={() => deleteFaq(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
