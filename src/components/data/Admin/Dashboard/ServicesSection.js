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

export default function ServicesSection() {
  const [selectedOption, setSelectedOption] = useState("Today");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const cardsData = [
    {
      id: 1,
      title: "Valet Parking",
      description: "This is Card 1 description.",
      buttonText: "Button 1",
      subTitle: "Total",
      value: 4678,
      completed: 0,
      inService: 0,
    },
    {
      id: 2,
      title: "Park-To-Park (Customer)",
      description: "This is Card 2 description.",
      buttonText: "Button 2",
      subTitle: "Total",
      value: 4678,
      completed: 0,
      inService: 0,
    },
    {
      id: 3,
      title: "Park-To-Park (Attendant)",
      description: "This is Card 3 description.",
      buttonText: "Button 3",
      subTitle: "Total",
      value: 4678,
      completed: 0,
      inService: 0,
    },

    {
      id: 4,
      title: "Reserved Parking",
      description: "This is Card 1 description.",
      buttonText: "Button 1",
      subTitle: "Total",
      value: 4678,
      completed: 0,
      reserved: 0,
    },
    {
      id: 5,
      title: "Event Parking",
      description: "This is Card 2 description.",
      buttonText: "Button 2",
      subTitle: "Total",
      value: 4678,
      completed: 0,
      reserved: 0,
    },
    {
      id: 6,
      title: "Car Services",
      description: "This is Card 3 description.",
      buttonText: "Button 3",
      subTitle: "Total",
      value: 4678,
      completed: 0,
      pending: 0,
    },
  ];
  return (
    <Box mt={"24px"}>
      <Flex justifyContent="space-between" alignItems={"center"} mb={3}>
        <Text fontSize="14px" fontWeight="600">
          SERVICES
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
            pending={card.pending}
            reserved={card.reserved}
            large
            bg="#fff"
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
