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
