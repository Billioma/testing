import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const NoData = ({ title, nil, desc }) => {
  return (
    <Flex
      textAlign="center"
      my={!nil && 10}
      justifyContent="center"
      align="center"
      flexDir="column"
    >
      <Heading my={3} color="#000" fontSize="24px" fontWeight={700}>
        {title}
      </Heading>
      <Text fontSize="16px" w="50%">
        {desc}
      </Text>
    </Flex>
  );
};

export default NoData;
