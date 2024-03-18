import React, { useState } from "react";
import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { ratings } from "../common/constants";
import { useNavigate } from "react-router-dom";

const RatingsModal = ({
  isOpen,
  ratingsValue,
  setRatingsValue,
  action,
  onClose,
  isLoading,
}) => {
  const handleStarClick = (index) => {
    if (step !== 2) {
      setStep(step + 1);
    }
    setRatingsValue({ ...ratingsValue, rating: index + 1 });
  };
  const [step, setStep] = useState(1);

  const [picked, setPicked] = useState(false);
  const navigate = useNavigate();
  const close = () => {
    onClose();
    setRatingsValue({ ratingReason: "", rating: "" });
    setStep(1);
    navigate("/customer/history/user");
  };
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        px="24px"
        py="40px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex justifyContent="flex-end">
            <Flex
              border="1px solid #EE383A"
              rounded="full"
              w="16px"
              cursor="pointer"
              h="16px"
              onClick={close}
              p="2px"
              justifyContent="center"
              align="center"
              bg="transparent"
            >
              <MdClose />
            </Flex>
          </Flex>

          {step === 1 ? (
            <>
              <Text
                textAlign="center"
                color="#242628"
                fontWeight={700}
                fontSize="24px"
                mt="24px"
              >
                Rate our service
              </Text>
              <Text
                textAlign="center"
                color="#242627"
                fontWeight={500}
                fontSize="12px"
                mt="4px"
              >
                Tell us how easy it was to park
              </Text>{" "}
              <Flex mt="24px" align="center" gap="6px" justifyContent="center">
                {Array(5)
                  .fill(null)
                  .map((item, i) => (
                    <Image
                      key={i}
                      objectFit="contain"
                      src={
                        i < ratingsValue?.rating
                          ? "/assets/filled.jpg"
                          : "/assets/non-filled.jpg"
                      }
                      w={ratingsValue?.rating === i + 1 ? "30px" : "24px"}
                      h={ratingsValue?.rating === i + 1 ? "30px" : "24px"}
                      cursor="pointer"
                      onClick={() => handleStarClick(i)}
                    />
                  ))}
              </Flex>
              <Text
                _hover={{ textDecor: "underline" }}
                color="#646668"
                mt="70px"
                fontWeight={500}
                textAlign="end"
                fontSize="12px"
                cursor="pointer"
                onClick={close}
              >
                Skip
              </Text>
            </>
          ) : (
            <>
              <Flex mt="14px" justifyContent="center">
                {ratingsValue?.rating > 0 && (
                  <Flex flexDir="column" justifyContent="center" align="center">
                    <Image
                      w="64px"
                      h="64px"
                      objectFit="contain"
                      src={ratings[ratingsValue?.rating - 1]?.img}
                    />
                    <Text
                      mt="14px"
                      textAlign="center"
                      fontWeight={700}
                      fontSize="24px"
                    >
                      {ratings[ratingsValue?.rating - 1]?.label}
                    </Text>
                  </Flex>
                )}
              </Flex>
              <Flex mt="14px" align="center" gap="6px" justifyContent="center">
                {Array(5)
                  .fill(null)
                  .map((item, i) => (
                    <Image
                      key={i}
                      objectFit="contain"
                      src={
                        i < ratingsValue?.rating
                          ? "/assets/filled.jpg"
                          : "/assets/non-filled.jpg"
                      }
                      w={ratingsValue?.rating === i + 1 ? "30px" : "24px"}
                      h={ratingsValue?.rating === i + 1 ? "30px" : "24px"}
                      cursor="pointer"
                      onClick={() => handleStarClick(i)}
                    />
                  ))}
              </Flex>

              <Flex mt="14px" align="center" gap="12px" justifyContent="center">
                {ratingsValue?.rating === 1
                  ? ["Slow", "Terrible", "Bad Customer Service"].map((item) => (
                      <Flex
                        border="1px solid #D4D6D8"
                        bg={
                          picked && ratingsValue?.ratingReason === item
                            ? "#EE383A"
                            : "transparent"
                        }
                        color={
                          picked && ratingsValue?.ratingReason === item
                            ? "#fff"
                            : "#242628"
                        }
                        rounded="full"
                        py="8px"
                        px="16px"
                        cursor="pointer"
                        onClick={() => {
                          setPicked(true);
                          setRatingsValue({
                            ...ratingsValue,
                            ratingReason: item,
                          });
                        }}
                        fontSize="12px"
                      >
                        {item}
                      </Flex>
                    ))
                  : !ratingsValue?.rating
                  ? ""
                  : ["Fast", "Reliable", "Good Customer Service"].map(
                      (item) => (
                        <Flex
                          border="1px solid #D4D6D8"
                          bg={
                            picked && ratingsValue?.ratingReason === item
                              ? "#EE383A"
                              : "transparent"
                          }
                          color={
                            picked && ratingsValue?.ratingReason === item
                              ? "#fff"
                              : "#242628"
                          }
                          rounded="full"
                          py="8px"
                          cursor="pointer"
                          onClick={() => {
                            setPicked(true);
                            setRatingsValue({
                              ...ratingsValue,
                              ratingReason: item,
                            });
                          }}
                          px="16px"
                          fontSize="12px"
                        >
                          {item}
                        </Flex>
                      )
                    )}
              </Flex>

              <Flex mt="14px">
                <Textarea
                  borderRadius="12px"
                  value={picked ? "" : ratingsValue?.ratingReason}
                  onChange={(e) => {
                    setRatingsValue({
                      ...ratingsValue,
                      ratingReason: e.target.value,
                    });
                    setPicked(false);
                  }}
                  bg="transparent"
                  border="1px solid #D4D6D8"
                  h="135px"
                />
              </Flex>

              <Flex
                mt="14px"
                w="100%"
                justifyContent="flex-end"
                gap="24px"
                align="center"
              >
                <Button
                  w="40%"
                  fontSize="12px"
                  onClick={action}
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RatingsModal;
