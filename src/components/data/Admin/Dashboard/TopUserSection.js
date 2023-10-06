import React, { useState, useEffect } from "react";
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
import { useGetUsersMetrics } from "../../../../services/admin/query/general";

export default function TopUserSection() {
  const [selectedOption, setSelectedOption] = useState("Today");
  const { data: usersMetrics } = useGetUsersMetrics();
  const [state, setState] = useState([]);

  const transformData = () => {
    const transformedData = [];
    const dataKeys = Object.keys(usersMetrics);

    dataKeys.forEach((key, index) => {
      const title = key.charAt(0).toUpperCase() + key.slice(1);
      const id = index + 1;

      const card = {
        id,
        title,
        subTitle: "Total",
        value: usersMetrics[key].total,
        active: usersMetrics[key].active,
        inactive: usersMetrics[key].inactive,
      };

      transformedData.push(card);
    });

    setState(transformedData);
  };

  useEffect(() => {
    usersMetrics && transformData();
  }, [usersMetrics]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

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
        {state.map((card) => (
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
