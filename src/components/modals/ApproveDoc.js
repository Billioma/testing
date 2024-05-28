import React from "react";
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

const ApproveDoc = ({ isOpen, action, id, isLoading, onClose }) => {
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        px="32px"
        py="24px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex align="center" justifyContent="space-between" w="full">
            <Flex align="center" gap="8px">
              <Image src={"/assets/warn.jpg"} w="24px" h="24px" />

              <Text
                textTransform="capitalize"
                fontWeight={500}
                color={"#09020c"}
              >
                Verify Document
              </Text>
            </Flex>

            <Flex
              border="1px solid #090C02"
              rounded="full"
              p="3px"
              cursor={isLoading ? "" : "pointer"}
              onClick={() => (isLoading ? "" : onClose())}
              justifyContent="center"
              align="center"
            >
              <MdClose size="12px" />
            </Flex>
          </Flex>

          <Text my="24px" color="#000">
            You are about to Verify{" "}
            <span style={{ fontWeight: 500 }}>{id}.</span> This action cannot be
            undone.
          </Text>

          <Flex gap="24px" mt="12px" justifyContent="flex-end" align="center">
            <Button
              border="1px solid #999999"
              color="#999999"
              onClick={onClose}
              bg="transparent"
              variant="adminPrimary"
              h="48px"
            >
              Cancel
            </Button>
            <Button
              onClick={action}
              isLoading={isLoading}
              variant="adminPrimary"
              h="48px"
            >
              Proceed
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApproveDoc;
