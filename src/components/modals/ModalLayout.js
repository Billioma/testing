import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";

const ModalLayout = ({ children, isOpen, onClose }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <Drawer
      trapFocus={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
    >
      <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
      <DrawerContent borderTopRadius="12px" bg="#fff" color="#000">
        <DrawerBody p="30px 20px" overflowY="auto">
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : (
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
        <ModalBody px="0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
