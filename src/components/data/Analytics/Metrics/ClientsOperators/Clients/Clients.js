import React from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import Types from "./Types";
import Satisfaction from "./Satisfaction";
import Recently from "./Recently";
import LocationDistro from "./LocationDistro";
import Generated from "./Generated";

const Clients = ({ clients, isClients }) => {
  return (
    <Box>
      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "100%" }}>
          <Skeleton isLoaded={!isClients} borderRadius="8px">
            <Types dataa={clients?.data?.typeOfBusinessDistribution} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "100%" }}>
          <Skeleton isLoaded={!isClients} borderRadius="8px">
            <Satisfaction dataa={clients?.data?.clientSatisfactionRatings} />
          </Skeleton>
        </Box>
      </Flex>

      <Flex align="center" gap="24px" flexDir={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isClients} borderRadius="8px">
            <Recently dataa={clients?.data?.recentlyAddedClients} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isClients} borderRadius="8px">
            <LocationDistro
              dataa={clients?.data?.clientsLocationDistribution}
            />
          </Skeleton>
        </Box>
      </Flex>

      <Box mt="24px">
        <Skeleton isLoaded={!isClients} borderRadius="8px">
          <Generated dataa={clients?.data?.revenueGeneratedFromEachClient} />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default Clients;
