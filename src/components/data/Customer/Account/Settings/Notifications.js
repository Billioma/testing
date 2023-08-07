import React from "react";
import { Box, Button, Flex, Switch, Text } from "@chakra-ui/react";

const Notifications = () => {
  return (
    <Box>
      <Flex mb="16px" align="center" justifyContent="space-between" w="full">
        <Text color="#646668" fontSize="12px" lineHeight="100%">
          Alert Notifications
        </Text>

        <Switch size="sm" colorScheme="green" />
      </Flex>

      {/* <Box>
        <Flex mb="16px" align="center" justifyContent="space-between" w="full">
          <Text
            fontSize="12px"
            color="#444648"
            w="full"
            lineHeight="100%"
            fontWeight={500}
          >
            Alert me when session ends
          </Text>

          <Select
            w="50%"
            border="1px solid #d4d6d8"
            borderRadius="4px"
            bg="transparent"
          >
            {["Yes", "No"].map((data, i) => (
              <option key={i} value={data}>
                {data}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex mb="16px" align="center" justifyContent="space-between" w="full">
          <Text
            fontSize="12px"
            color="#444648"
            w="full"
            lineHeight="100%"
            fontWeight={500}
          >
            Alert me before reservation ends
          </Text>

          <Select
            w="50%"
            border="1px solid #d4d6d8"
            borderRadius="4px"
            bg="transparent"
          >
            {["Yes", "No"].map((data, i) => (
              <option key={i} value={data}>
                {data}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex mb="16px" align="center" justifyContent="space-between" w="full">
          <Text
            fontSize="12px"
            color="#444648"
            w="full"
            lineHeight="100%"
            fontWeight={500}
          >
            Alert me before service appointment starts
          </Text>

          <Select
            w="50%"
            border="1px solid #d4d6d8"
            borderRadius="4px"
            bg="transparent"
          >
            {["Yes", "No"].map((data, i) => (
              <option key={i} value={data}>
                {data}
              </option>
            ))}
          </Select>
        </Flex>
      </Box> */}

      <Flex mb="16px" align="center" justifyContent="space-between" w="full">
        <Text color="#646668" fontSize="12px" lineHeight="100%">
          E-mail Notifications
        </Text>

        <Switch size="sm" colorScheme="green" />
      </Flex>

      <Flex mb="16px" align="center" justifyContent="space-between" w="full">
        <Text color="#646668" fontSize="12px" lineHeight="100%">
          SMS Notifications
        </Text>

        <Switch size="sm" colorScheme="green" />
      </Flex>

      <Button
        mt="40px"
        py="17px"
        w="full"
        color="#fff"
        fontSize="14px"
        lineHeight="100%"
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default Notifications;
