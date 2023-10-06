import React, { useEffect, useState } from "react";
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
import { useGetActivitiesMetrics } from "../../../../services/admin/query/general";

export default function ActivitySection() {
  const [selectedOption, setSelectedOption] = useState("Today");
  const { data: activityMetrics } = useGetActivitiesMetrics();
  const [state, setState] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const transformData = () => {
    const transformedData = [];
    const dataKeys = Object.keys(activityMetrics);

    dataKeys.forEach((key, index) => {
      const title = key.charAt(0).toUpperCase() + key.slice(1);
      const id = index + 1;

      const card = {
        id,
        title,
        subTitle: "Total",
        value: activityMetrics[key].total,
        active: activityMetrics[key].active,
        inactive: activityMetrics[key].inactive,
      };

      transformedData.push(card);
    });

    setState(transformedData);
  };

  useEffect(() => {
    activityMetrics && transformData();
  }, [activityMetrics]);

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
        {state.map((card) => (
          <StatCard
            key={card.id}
            title={card.title}
            subTitle={card.subTitle}
            value={card.value}
            completed={card.completed}
            inService={card.inService}
            active={card.active?.toLocaleString() || 0}
            expired={card.expired}
            inactive={card.inactive || 0}
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
