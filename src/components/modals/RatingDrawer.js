import React, { useState } from "react";
import {
  Button,
  Flex,
  Image,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { ratings } from "../common/constants";

const RatingsDrawer = ({
  isOpen,
  ratingsValue,
  setRatingsValue,
  action,
  onClose,
  isLoading,
}) => {
  const handleStarClick = (index) => {
    setRatingsValue({ ...ratingsValue, rating: index + 1 });
  };

  const [picked, setPicked] = useState(false);

  const close = () => {
    onClose();
    setRatingsValue({ ratingReason: "", rating: "" });
  };

  return (
    <Drawer
      placement="bottom"
      isCentered
      trapFocus={false}
      isOpen={isOpen}
      onClose={close}
    >
      <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
      <DrawerContent
        px="24px"
        py="40px"
        overflowY="auto"
        borderTopRadius="12px"
        bg="#fff"
        color="#000"
      >
        <DrawerBody px="0">
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
                  textAlign="center"
                  mt="14px"
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
              : ["Fast", "Reliable", "Good Customer Service"].map((item) => (
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
                ))}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RatingsDrawer;
