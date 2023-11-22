import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";

const CreateAccountModal = ({ isOpen, onClose, values }) => {
  const [field, setField] = useState({ name: "", password: "" });
  const [show, setShow] = useState(false);

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="40px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Box>
            <Text
              fontFamily="Cooper"
              color="#444648"
              fontWeight={900}
              lineHeight="120%"
              textAlign="center"
              fontSize="24px"
              mb="32px"
            >
              Create an Account
            </Text>

            <Box
              border="1px solid #e4e6e8"
              p="12px"
              mb="16px"
              borderRadius="8px"
            >
              <Flex mb="16px" justifyContent="space-between" align="center">
                <Text
                  color="#848688"
                  fontWeight={500}
                  lineHeight="100%"
                  fontSize="12px"
                >
                  Email
                </Text>
                <Text
                  color="#242628"
                  fontWeight={500}
                  lineHeight="100%"
                  fontSize="12px"
                >
                  {values?.email}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" align="center">
                <Text
                  color="#848688"
                  fontWeight={500}
                  lineHeight="100%"
                  fontSize="12px"
                >
                  Phone Number
                </Text>
                <Text
                  color="#242628"
                  fontWeight={500}
                  lineHeight="100%"
                  fontSize="12px"
                >
                  {values?.phone}
                </Text>
              </Flex>
            </Box>

            <Box mb="16px">
              <Text
                color="#444648"
                fontWeight={500}
                mb="8px"
                lineHeight="100%"
                fontSize="10px"
              >
                Name
              </Text>

              <CustomInput
                auth
                holder="Enter Name"
                value={field?.name}
                mb
                onChange={(e) => setField({ ...field, name: e.target.value })}
              />
            </Box>

            <Box>
              <Text
                color="#444648"
                fontWeight={500}
                mb="8px"
                lineHeight="100%"
                fontSize="10px"
              >
                Password
              </Text>

              <CustomInput
                mb
                holder="Enter Password"
                value={field?.password}
                onChange={(e) =>
                  setField({ ...field, password: e.target.value })
                }
                name="password"
                onClick={() => setShow((prev) => !prev)}
                password={show ? false : true}
                show
                type={show ? "text" : "password"}
              />
            </Box>

            <Flex mt="32px" w="full">
              <Button
                w="full"
                fontSize="13px"
                borderRadius="4px"
                py="17px"
              >
                Create Account
              </Button>
            </Flex>

            <Flex mt="32px" w="full" justifyContent="center" align="center">
              <Text
                fontSize="12px"
                fontWeight={500}
                onClick={onClose}
                textAlign="center"
                lineHeight="100%"
                color="#848688"
              >
                Skip
              </Text>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateAccountModal;
