import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CustomInput from "../common/CustomInput";

const AdminAttendantChangePassword = ({
  isOpen,
  onClose,
  isLoading,
  handleSubmit,
}) => {
  const [state, setState] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="0"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Flex justifyContent="center" align="center" flexDir="column">
            <Text
              mb="20px"
              color="#242628"
              fontWeight={700}
              fontSize="24px"
              lineHeight="100%"
            >
              Change Password
            </Text>
          </Flex>

          <Box>
            <Box w="full" mb={4} position="relative">
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Password
              </Text>
              <CustomInput
                auth
                value={state.password}
                mb
                holder="Set password"
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
              />
              <Box
                w="fit-content"
                position="absolute"
                zIndex={2}
                right={"10px"}
                top="35px"
                cursor="pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </Box>
            </Box>

            <Box position="relative" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Comfirm Password
              </Text>
              <CustomInput
                auth
                value={state.passwordConfirmation}
                mb
                holder="Re-enter password"
                onChange={(e) =>
                  setState({ ...state, passwordConfirmation: e.target.value })
                }
                type={showConfirmPassword ? "text" : "password"}
              />

              <Box
                w="fit-content"
                position="absolute"
                zIndex={2}
                right={"10px"}
                top="35px"
                cursor="pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </Box>
            </Box>
          </Box>

          <Flex gap={4} mt={10}>
            <Button
              fontSize="14px"
              fontWeight={500}
              onClick={onClose}
              lineHeight="100%"
              w="45%"
              py="17px"
              variant="adminSecondary"
            >
              Cancel
            </Button>

            <Button
              fontSize="14px"
              fontWeight={500}
              isLoading={isLoading}
              onClick={() => handleSubmit(state)}
              lineHeight="100%"
              w="55%"
              py="17px"
              variant="adminAlt"
            >
              Save
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminAttendantChangePassword;
