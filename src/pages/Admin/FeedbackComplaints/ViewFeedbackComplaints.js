import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useFeedbackReply,
  useGetFeedback,
} from "../../../services/admin/query/feedback";
import TextInput from "../../../components/common/TextInput";
import useCustomToast from "../../../utils/notifications";

export default function ViewFeedbackComplaints() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const { mutate, data, isLoading } = useGetFeedback();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } = useFeedbackReply({
    onSuccess: () => {
      successToast("Feedback Sent!");
      navigate(PRIVATE_PATHS.ADMIN_FEEDBACK);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    updateMutate({
      id,
      name: values?.name,
      email: values?.email,
      feedback: values?.feedback,
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      email: data?.senderEmail,
      name: data?.senderName,
    });
  }, [data]);

  return (
    <Box minH="75vh">
      <GoBackTab />
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ md: "30rem", base: "100%", "3xl": "30rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter name"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        name: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Email Address
                  </Text>
                  <CustomInput
                    auth
                    value={values?.email}
                    mb
                    holder="Enter email"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        email: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Feedback
                  </Text>
                  <TextInput
                    auth
                    value={values?.feedback}
                    mb
                    holder="Enter Feedback"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        feedback: e.target.value,
                      })
                    }
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    border="1px solid #A11212"
                    bg="unset"
                    borderRadius="4px"
                    h="48px"
                    isDisabled={isUpdating}
                    w="100%"
                    color="#A11212"
                    fontSize="14px"
                    onClick={() => navigate(PRIVATE_PATHS.ADMIN_FEEDBACK)}
                  >
                    Clear
                  </Button>
                  <Button
                    isLoading={isUpdating}
                    w="100%"
                    h="48px"
                    onClick={handleSubmit}
                  >
                    Reply & Clear
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
