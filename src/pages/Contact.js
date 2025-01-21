import React, { useState } from "react";
import { useSendMail } from "../services/query/mail";
import useCustomToast from "../utils/notifications";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import MobileApp from "../components/data/Home/MobileApp";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

export const Layout = ({ label, placeholder, value, type, onChange }) => {
  return (
    <Box className="mb-[20px] w-full" fontFamily="Satoshi">
      <Text color="#444648" fontWeight={500} fontSize="15px" mb="8px">
        {label}
      </Text>
      {label === "Message" ? (
        <Textarea
          value={value}
          onChange={onChange}
          border="1px solid #ACB0BD"
          borderRadius="8px"
          p="14px 20px"
          fontSize="20px"
          _placeholder={{ color: "#848688" }}
          color="#000"
          h="150px"
          bg="transparent"
          placeholder="Leave us a message"
        />
      ) : (
        <InputGroup>
          {label.includes("Mobile") ? (
            <InputLeftElement pl="10px" w="8rem" h="45px">
              <Flex>
                <Flex align="center" gap="8px">
                  <Image src="/assets/flag.svg" w="30px" h="30px" />
                  <IoIosArrowDown size="14px" />

                  <Flex
                    fontFamily="Satoshi"
                    opacity="0.6"
                    align="center"
                    gap="5px"
                  >
                    <Text color="#181716">234</Text>
                    <Text>|</Text>
                  </Flex>
                </Flex>
              </Flex>
            </InputLeftElement>
          ) : (
            ""
          )}
          <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            border="1px solid #ACB0BD"
            borderRadius="8px"
            bg="transparent"
            h="45px"
            p="14px 16px"
            pl={label.includes("Mobile") ? "8rem" : "16px"}
            fontSize="17px"
            _placeholder={{ color: "#848688" }}
            color="#000"
          />
        </InputGroup>
      )}
    </Box>
  );
};

const Contact = () => {
  const { successToast, errorToast } = useCustomToast();
  const [checked, setChecked] = useState(false);
  const { mutate, isLoading } = useSendMail({
    onSuccess: () => {
      successToast("Mail Sent Successfully");
      setValues({ name: "", email: "", phone: "", message: "" });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send mail. Try again."
      );
    },
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Box p={{ base: "", md: "60px 30px" }}>
      <Box w={{ base: "100%", md: "58rem" }}>
        <Box
          color="#EE383A"
          fontSize={{ base: "28px", xl: "43px" }}
          lineHeight={{ base: "35px", xl: "52px" }}
          fontWeight={500}
          fontFamily="Recoleta"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Contact us
          </motion.div>
        </Box>
        <Box
          color="#444648"
          mt="24px"
          fontSize={{ base: "16px", xl: "20px" }}
          lineHeight={{ base: "25px", xl: "32px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Have a question or need assistance? Send us a message below, and
            we'll respond within 6 hours.
          </motion.div>
        </Box>

        <Flex flexDir="column" gap="24px" mt="40px" mb="180px">
          <motion.div
            initial={{ opacity: 0 }}
            style={{ width: "100%" }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Layout
              label="Full Name"
              value={values?.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            style={{ width: "100%" }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Layout
              label="Email"
              value={values?.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            style={{ width: "100%" }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Layout
              label="Mobile Number"
              type="number"
              value={values?.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            style={{ width: "100%" }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Layout
              label="Message"
              value={values?.message}
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            style={{ width: "100%" }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Flex align="center">
              <Checkbox
                isChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <Text
                pl="12px"
                onClick={() => setChecked(!checked)}
                color="#444648"
                fontSize="15px"
                cursor="pointer"
              >
                You agree to our{" "}
                <a
                  href="/terms-condition"
                  style={{ textDecoration: "underline" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms and Conditions.
                </a>
              </Text>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            style={{ width: "100%" }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Button
              mt="30px"
              isDisabled={!checked}
              isLoading={isLoading}
              onClick={handleSubmit}
              bg="#131618"
              borderRadius="12px"
              h="60px"
              w="full"
            >
              Send Message
            </Button>
          </motion.div>
        </Flex>
      </Box>

      <MobileApp />
    </Box>
  );
};

export default Contact;
