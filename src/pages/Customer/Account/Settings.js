import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Notifications from "../../../components/data/Customer/Account/Settings/Notifications";
import ChangePassword from "../../../components/data/Customer/Account/Settings/ChangePassword";

const Settings = () => {
  const [tab, setTab] = useState("Notifications");
  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px={{ base: "24px", md: "32px" }}
          w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
          flexDir="column"
        >
          <Flex w="full" flexDir="column">
            <Text
              mb="32px"
              fontSize="20px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              Settings
            </Text>
          </Flex>

          <Flex align="center" justifyContent="space-between" w="full">
            {["Notifications", "Change Password"]?.map((dat, i) => (
              <Text
                textAlign="center"
                w="full"
                color={tab === dat ? "red" : "#646668"}
                pb="16px"
                cursor="pointer"
                _hover={{ color: "red" }}
                transition=".3s ease-in-out"
                borderBottom={tab === dat ? "1px solid red" : ""}
                onClick={() => setTab(dat)}
                fontWeight={tab === dat ? 500 : 400}
                lineHeight="100%"
                key={i}
              >
                {dat}
              </Text>
            ))}
          </Flex>

          <Box mt="46px">
            {tab === "Notifications" && <Notifications />}
            {tab === "Change Password" && <ChangePassword />}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Settings;
