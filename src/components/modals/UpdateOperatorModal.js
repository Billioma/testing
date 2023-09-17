import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import { useUpdateOpProfile } from "../../services/operator/query/user";
import useCustomToast from "../../utils/notifications";

const UpdateOperatorModal = ({ isOpen, refetch, userData, onClose }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const isDisabled = Object.values(values).some((value) => !value);

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useUpdateOpProfile({
    onSuccess: (res) => {
      refetch();
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  useEffect(() => {
    setValues({
      ...values,
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
    });
  }, [userData]);

  const handleSubmit = () => {
    mutate({
      name: values.name,
      phone: values.phone,
      email: values.email,
    });
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Text
            color="#242628"
            fontWeight={500}
            textAlign="center"
            fontSize="20px"
            lineHeight="100%"
          >
            Edit Profile
          </Text>
          <Flex my="32px" justifyContent="center" align="center">
            <Flex
              border="4px solid #ee383a"
              rounded="full"
              w="fit-content"
              bg="#D4D6D8"
              justifyContent="center"
              p={"44px"}
              align="center"
              flexDir="column"
            >
              <Image
                w={"32px"}
                objectFit="cover"
                h={"32px"}
                src={"/assets/cam.svg"}
              />
            </Flex>
          </Flex>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              mb="8px"
              fontWeight={500}
            >
              Full Name
            </Text>
            <CustomInput
              value={values.name}
              auth
              mb
              onChange={(e) =>
                setValues({
                  ...values,
                  name: e.target.value,
                })
              }
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              mb="8px"
              fontWeight={500}
            >
              Email Address
            </Text>
            <CustomInput
              value={values.email}
              auth
              onChange={(e) =>
                setValues({
                  ...values,
                  email: e.target.value,
                })
              }
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              mb="8px"
              fontWeight={500}
            >
              Phone
            </Text>
            <CustomInput
              value={values.phone}
              auth
              onChange={(e) =>
                setValues({
                  ...values,
                  phone: e.target.value,
                })
              }
            />
          </Box>

          <Flex align="center" gap="15px">
            <Button
              bg="transparent"
              color="#0D0718"
              fontSize="14px"
              onClick={onClose}
              w="full"
              border="1px solid #0D0718"
              py="17px"
            >
              Cancel
            </Button>

            <Button
              fontSize="14px"
              fontWeight={500}
              onClick={handleSubmit}
              isLoading={isLoading}
              isDisabled={isDisabled}
              lineHeight="100%"
              w="full"
              py="17px"
            >
              Save
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOperatorModal;
