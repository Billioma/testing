import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Departments from "../../../components/data/Admin/Settings/Departments";
import Jobs from "../../../components/data/Admin/Settings/Jobs";
import Roles from "../../../components/data/Admin/Settings/Roles";

const Settings = () => {
  const [tab, setTab] = useState("Departments");
  return (
    <Box>
      <Flex w="100%" mb="24px" bg="#F4F6F8">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          w={{ base: "100%", md: "100%" }}
          gap="24px"
          align={{ base: "flex-start", md: "center" }}
        >
          {["Departments", "Job TItles", "Roles & Permissions"].map(
            (item, i) => (
              <Flex
                py="11px"
                px={{ base: "20px", md: "16px" }}
                fontSize="13px"
                fontWeight={500}
                w="fit-content"
                cursor="pointer"
                _hover={{ color: "#000" }}
                transition=".3s ease-in-out"
                justifyContent={{ base: "flex-start", md: "center" }}
                color={tab === item ? "#444648" : "#949698"}
                align="center"
                key={i}
                borderBottom={tab === item ? "2px solid #000" : "none"}
                onClick={() => {
                  setTab(item);
                }}
              >
                {item}
              </Flex>
            )
          )}
        </Flex>
      </Flex>

      {tab === "Departments" && <Departments />}
      {tab === "Job Titles" && <Jobs />}
      {tab === "Roles & Permissions" && <Roles />}
    </Box>
  );
};

export default Settings;
