import React from "react";
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
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PointsModal = ({
  isOpen,
  refund,
  setShowRatings,
  noRating,
  setShowMobileRatings,
  onClose,
  amount,
  currentItem,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
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
        pt="70px"
        pb="40px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Box>
            <Flex justifyContent="center" align="center">
              <Image src="/assets/success.svg" />
            </Flex>

            <Text
              fontFamily="Cooper"
              color="#444648"
              fontWeight={900}
              lineHeight="120%"
              textAlign="center"
              fontSize="24px"
              mt="24px"
            >
              {refund ? "Refund Complete" : "Payment Successful"}
            </Text>

            <Text
              color="#444648"
              fontWeight={900}
              textAlign="center"
              fontSize="16px"
              mt="24px"
            >
              {refund ? "You've been refunded" : "You've earned"}{" "}
              {currentItem
                ? ((currentItem?.amount * 2) / 1000).toFixed(0)
                : ((amount * 2) / 1000).toFixed(0)}{" "}
              {((amount * 2) / 1000).toFixed(0) === "1" ? "point" : "points"}
            </Text>

            <Flex mt="32px" w="full">
              <Button
                w="full"
                onClick={() =>
                  noRating
                    ? navigate("/customer/subscriptions")
                    : isMobile
                    ? setShowMobileRatings(true)
                    : setShowRatings(true)
                }
                fontSize="13px"
                borderRadius="4px"
                py="17px"
              >
                Done
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PointsModal;
