import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/common/CustomInput";
import TextInput from "../../../components/common/TextInput";

export const Layout = ({ label, holder, area }) => {
  return (
    <Box mb="24px">
      <Text
        fontSize="10px"
        fontWeight={500}
        lineHeight="100%"
        color="#757575"
        mb="8px"
      >
        {label}
      </Text>
      {area ? (
        <TextInput
          onChange={(e) => console.log(e)}
          h="96px"
          auth
          holder={holder}
        />
      ) : (
        <CustomInput auth holder={holder} onChange={(e) => console.log(e)} />
      )}
    </Box>
  );
};

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <Box minH="75vh">
      <Flex align="flex-start">
        <Flex
          onClick={() => navigate(-1)}
          color="#242628"
          align="center"
          cursor="pointer"
          mb="23px"
          w="fit-content"
          pos="sticky"
          top="6rem"
          gap="8px"
        >
          <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
          <Text fontSize="14px" fontWeight={500} lineHeight="100%">
            Back
          </Text>
        </Flex>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="24px"
            justifyContent="center"
            w={{ base: "full", md: "30rem" }}
            flexDir="column"
          >
            <Text
              textAlign="center"
              color="#242628"
              fontWeight={700}
              fontSize="24px"
              lineHeight="100%"
            >
              Send us a Mail
            </Text>
            <Text
              textAlign="center"
              color="#646668"
              mt="24px"
              fontSize="14px"
              lineHeight="150%"
            >
              Send us a message below and we’ll get back to you in 6 hours or
              less.
            </Text>

            <Box mt="32px">
              <Layout label="Name" holder="Enter your name" />
              <Layout label="Email" holder="Enter your email address" />
              <Layout label="Phone Number" holder="Enter your phone number" />
              <Layout label="Message" holder="Enter your message" area />

              <Button w="full" fontSize="14px" py="15px" mt="32px">
                Send
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ContactUs;
