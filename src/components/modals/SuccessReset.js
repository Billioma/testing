import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { IoMdClose } from "react-icons/io";

const SuccessReset = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      trapFocus={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        pb="40px"
        fontFamily="Satoshi"
        overflowY="auto"
        borderRadius="40px"
        bg="#fff"
        color="#000"
      >
        <ModalHeader>
          <Flex
            justifyContent="center"
            alignContent="center"
            w="fit-content"
            border="1px solid #086375"
            color="#086375"
            rounded="full"
            cursor="pointer"
            onClick={() => navigate("/login")}
            p="2px"
          >
            <IoMdClose size="13px" />
          </Flex>
        </ModalHeader>
        <ModalBody px="24px" pt="30px">
          <Box>
            <Flex justifyContent="center" align="center">
              <Image
                src="/assets/success.jpg"
                w="150px"
                h="157px"
                objectFit="contain"
              />
            </Flex>

            <Text
              color="#086375"
              fontWeight={700}
              textAlign="center"
              fontSize="28px"
              mt="20px"
            >
              Success!
            </Text>

            <Text color="#086375" textAlign="center" fontSize="18px" mt="8px">
              Password Changed Successfully.
            </Text>

            <Flex mt="32px" justifyContent="center" align="center" w="full">
              <Flex justifyContent="center" align="center" w="40%">
                <Button
                  w="full"
                  fontSize="18px"
                  h="60px"
                  onClick={() => navigate("/login")}
                  borderRadius="8px"
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessReset;
