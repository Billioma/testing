import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

const AdminDeleteModal = ({
  isOpen,
  handleSubmit,
  onClose,
  title,
  subTitle,
  isLoading,
  btnColor = "",
  headerColor = "#242628",
}) => {
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
              mb="14px"
              color={headerColor}
              fontWeight={700}
              fontSize="24px"
              lineHeight="100%"
            >
              {title}
            </Text>

            <Text color="#646668">{subTitle}</Text>
          </Flex>

          <Flex gap={4} mt={10}>
            <Button
              fontWeight={500}
              onClick={onClose}
              lineHeight="100%"
              w="45%"
              py="17px"
              variant="adminSecondary"
            >
              No
            </Button>

            <Button
              fontWeight={500}
              isLoading={isLoading}
              onClick={handleSubmit}
              lineHeight="100%"
              w="55%"
              py="17px"
              variant="adminPrimary"
              bg={btnColor}
            >
              Yes
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminDeleteModal;
