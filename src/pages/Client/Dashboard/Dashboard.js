import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { clientDahboard } from "../../../components/common/constants";
import { useGetUserCount } from "../../../services/client/query/dashboard";

const Dashboard = () => {
  const { data: usersCount, isLoading: isUser } = useGetUserCount();

  return (
    <Box minH="75vh">
      <Grid
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {clientDahboard?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton isLoaded={!isUser} h="12rem">
              <Box
                borderRadius="8px"
                bg="#F4F6F8"
                p="5px"
                border="1px solid #E4E6E8"
              >
                <Box h="6px" w="full" bg={dat?.color} borderRadius="full"></Box>
                <Box p="15px" pb="24px">
                  <Image src={dat?.img} w="40px" h="40px" />
                  <Text
                    mt="16px"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={700}
                    color="#242628"
                  >
                    {dat?.title}
                  </Text>

                  <Flex
                    mt="24px"
                    align="flex-end"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Box w="fit-content">
                      <Text
                        fontSize="12px"
                        lineHeight="100%"
                        color="#242628"
                        fontWeight={500}
                      >
                        Total
                      </Text>
                      <Text
                        mt="8px"
                        fontSize="28px"
                        lineHeight="100%"
                        color="#646668"
                        fontWeight={500}
                      >
                        {i === 1 ? usersCount?.total : 4678}
                      </Text>
                    </Box>

                    <Flex
                      justifyContent="flex-end"
                      w="full"
                      align="center"
                      gap="15px"
                    >
                      <Flex align="center" gap="8px">
                        <Text
                          color="#0B841D"
                          fontSize="12px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {dat?.opt}
                        </Text>
                        <Text
                          color="#242628"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {i === 1 ? usersCount?.inactive : 0}
                        </Text>
                      </Flex>

                      <Flex align="center" gap="8px">
                        <Text
                          color="#646668"
                          fontSize="12px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {dat?.secOpt}
                        </Text>
                        <Text
                          color="#242628"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {i === 1 ? usersCount?.active : 0}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
