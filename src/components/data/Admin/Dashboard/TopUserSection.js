import React, { useState } from "react";
import StatCard from "./StatCard";
import {
  Text,
  Box,
  Flex,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import {
  useGetActivitiesMetrics,
  useGetAdminDashboardData,
} from "../../../../services/admin/query/general";

export default function TopUserSection() {
  const [selectedOption, setSelectedOption] = useState("Today");

  const { data } = useGetAdminDashboardData();
  const { data: temp } = useGetActivitiesMetrics();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const cardsData = [
    {
      id: 1,
      title: "Customers",
      subTitle: "Total",
      value: data?.customers?.total,
      active: data?.customers?.active,
      inactive: data?.customers?.inactive,
    },
    {
      id: 2,
      title: "Attendants",
      subTitle: "Total",
      value: data?.attendants?.total,
      active: data?.attendants?.active,
      inactive: data?.attendants?.inactive,
    },
    {
      id: 3,
      title: "Clients",
      subTitle: "Total",
      value: data?.clients?.total,
      active: data?.clients?.active,
      inactive: data?.clients?.inactive,
    },
    {
      id: 4,
      title: "Operators",
      subTitle: "Total",
      value: data?.operators?.total,
      active: data?.operators?.active,
      inactive: data?.operators?.inactive,
    },
  ];
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems={"center"} mb={3}>
        <Text fontSize="14px" fontWeight="600">
          USERS
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            fontWeight="500"
            fontSize="12px"
          >
            <Text gap="4px" display="flex" flexDir="row" alignItems={"center"}>
              {selectedOption} <HiOutlineChevronDown />
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleOptionSelect("Today")}>
              Option 1
            </MenuItem>
            <MenuItem onClick={() => handleOptionSelect("Yesterday")}>
              Option 2
            </MenuItem>
            <MenuItem onClick={() => handleOptionSelect("Overall")}>
              Option 3
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="4">
        {cardsData.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            subTitle={card.subTitle}
            value={card.value}
            active={card.active}
            inactive={card.inactive}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
