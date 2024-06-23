import React from "react";
import { Box, HStack, Skeleton } from "@chakra-ui/react";

const TableLoader = () => {
  return (
    <Box>
      {["0", "1", "2", "3"]?.map((i) => (
        <HStack gap="5rem" key={i} my={4} mx="30px">
          <Skeleton height="30px" width="20%" />
          <Skeleton height="30px" width="20%" />
          <Skeleton height="30px" width="20%" />
          <Skeleton height="30px" width="20%" />
          <Skeleton height="30px" width="20%" />
        </HStack>
      ))}
    </Box>
  );
};
export default TableLoader;
