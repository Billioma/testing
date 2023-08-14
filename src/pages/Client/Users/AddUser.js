import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../components/common/CustomInput";
import {
  useAttachUser,
  useGetUsers,
  useLookupUser,
} from "../../../services/client/query/users";
import useCustomToast from "../../../utils/notifications";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const { mutate: userMutate } = useGetUsers();
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();

  useEffect(() => {
    setStep(1);
    setEmail("");
  }, []);

  const { mutate: attachMutate, isLoading: isAttaching } = useAttachUser({
    onSuccess: () => {
      successToast("User was added successfully");
      userMutate();
      setEmail("");
      setStep(1);
      navigate("/client/users");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const { mutate, isLoading, data } = useLookupUser({
    onSuccess: () => {
      setStep(step + 1);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleAttach = () => {
    attachMutate(email);
  };

  const handleSearch = () => {
    mutate(email);
  };

  return (
    <Box minH="75vh">
      <Flex
        onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
        color="#242628"
        align="center"
        cursor="pointer"
        w="fit-content"
        gap="8px"
      >
        <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
        <Text fontSize="14px" fontWeight={500} lineHeight="100%">
          Back
        </Text>
      </Flex>
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          border="1px solid #E4E6E8"
          py="40px"
          px="32px"
          justifyContent="center"
          w={{ base: "full", md: "30rem" }}
          flexDir="column"
        >
          <Text
            fontSize="20px"
            textAlign="center"
            lineHeight="100%"
            fontWeight={700}
            color="#242628"
            mb="32px"
          >
            Add User
          </Text>

          <CustomInput
            auth
            mb
            holder="Enter User Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStep(1);
            }}
          />

          {step === 2 && (
            <Box mt="32px">
              <Box bg="#FDECEC" borderRadius="8px" p="16px">
                <Text
                  color="#646668"
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  User
                </Text>

                <Flex
                  mt="16px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box>
                    <Text color="#646668" lineHeight="100%">
                      {data?.profile?.firstName} {data?.profile?.lastName}
                    </Text>
                    <Text
                      color="#646668"
                      fontSize="14px"
                      mt="16px"
                      fontWeight={700}
                      lineHeight="100%"
                    >
                      {data?.email}
                    </Text>
                  </Box>

                  <Box>
                    <Button
                      borderRadius="8px"
                      onClick={handleAttach}
                      isLoading={isAttaching}
                      display="flex"
                      gap="8px"
                      fontSize=""
                    >
                      <Text fontSize="12px">Add a User</Text>
                      <MdAdd size="20px" />
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Box>
          )}

          <Button
            isDisabled={!email}
            mt="32px"
            onClick={() => (step === 1 ? handleSearch() : setStep(1))}
            w="full"
            isLoading={isLoading}
            bg="black"
            py="17px"
            fontSize="14px"
          >
            {step === 1 ? "Search" : "Cancel"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddUser;
