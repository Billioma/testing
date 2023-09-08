import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/common/CustomInput";
import TextInput from "../../../components/common/TextInput";
import { useGetUser, useSendMail } from "../../../services/customer/query/user";
import useCustomToast from "../../../utils/notifications";

export const Layout = ({ label, holder, value, ngn, onChange, area }) => {
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
          auth
          value={value}
          onChange={onChange}
          holder={holder}
          h="96px"
        />
      ) : (
        <CustomInput
          auth
          value={value}
          holder={holder}
          ngn={ngn}
          onChange={onChange}
        />
      )}
    </Box>
  );
};

const ContactUs = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { errorToast, successToast } = useCustomToast();
  const { data: userData } = useGetUser();
  const { mutate, isLoading } = useSendMail({
    onSuccess: (res) => {
      successToast(res?.message);
      setValues({ message: "" });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const isDisabled = Object.values(values).some((value) => !value);

  const phoneNumber = `+234${values.phone}`;
  const handleSubmit = () => {
    mutate({
      name: values.name,
      email: values.email,
      phone: phoneNumber,
      message: values.message,
    });
  };

  useEffect(() => {
    setValues({
      name: `${
        userData?.profile?.firstName
      } ${userData?.profile?.lastName?.replace(".", "")}`,
      email: userData?.email,
      phone: userData?.profile?.phone?.replace("+234", ""),
      message: "",
    });
  }, [userData]);

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
              Send us a Message
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
              <Layout
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                label="Name"
                holder="Enter your name"
              />
              <Layout
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                label="Email"
                holder="Enter your email address"
              />
              <Layout
                label="Phone Number"
                holder="Enter your phone number"
                ngn
                value={`${values?.phone}`}
                onChange={(e) => {
                  const inputPhone = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setValues({ ...values, phone: inputPhone });
                }}
              />
              <Layout
                label="Message"
                holder="Enter your message"
                area
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
              />

              <Button
                isLoading={isLoading}
                isDisabled={isDisabled}
                w="full"
                onClick={handleSubmit}
                type="submit"
                fontSize="14px"
                py="15px"
                mt="32px"
              >
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
