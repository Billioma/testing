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
import { useGetAdminDashboardData } from "../../../../services/admin/query/general";

export default function ActivitySection() {
  const [selectedOption, setSelectedOption] = useState("Today");
  const { data } = useGetAdminDashboardData();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const cardsData = [
    {
      id: 1,
      title: "Vehicles",
      subTitle: "Total",
      value: data?.vehicles?.total,
    },
    {
      id: 2,
      title: "Events",
      subTitle: "Total",
      value: 4678,
      upcoming: 0,
      past: 0,
    },
    {
      id: 3,
      title: "Locations",
      subTitle: "Total",
      value: 4678,
      active: 0,
      inactive: 0,
    },

    {
      id: 4,
      title: "Invoices",
      subTitle: "Total",
      value: 4678,
      paid: 0,
      pastDue: 0,
    },
    {
      id: 5,
      title: "Corporate Subscriptions",

      subTitle: "Total",
      value: 4678,
      active: 0,
      expired: 0,
    },
    {
      id: 6,
      title: "Customer Subscriptions",
      subTitle: "Total",
      value: 4678,
      active: 0,
      expired: 0,
    },
  ];
  return (
    <Box mt={"24px"}>
      <Flex justifyContent="space-between" alignItems={"center"} mb={3}>
        <Text fontSize="14px" fontWeight="600">
          ACTIVITY
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

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
        {cardsData.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            subTitle={card.subTitle}
            value={card.value}
            completed={card.completed}
            inService={card.inService}
            active={card.active}
            expired={card.expired}
            inactive={card.inactive}
            upcoming={card.upcoming}
            past={card.past}
            paid={card.paid}
            pastDue={card.pastDue}
            large
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
