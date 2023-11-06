import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useAddFaq,
  useGetFaqs,
} from "../../../services/admin/query/configurations";

export default function AddFaq() {
  const [state, setState] = useState({
    status: 1,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetFaqs();
  const { mutate, isLoading } = useAddFaq({
    onSuccess: () => {
      successToast("Faq added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_FAQS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
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
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_CONFIG_FAQS)}
            >
              Cancel
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isDisabled}
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
