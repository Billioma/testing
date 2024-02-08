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
import {
  busClientDashboard,
  clientDahboard,
  eventClientDahboard,
} from "../../../components/common/constants";
import {
  useGetUserCount,
  useGetSubCount,
  useGetEventCount,
  useGetLogsCount,
  useGetTransactionCount,
} from "../../../services/client/query/dashboard";
import { useGetClientDetails } from "../../../services/client/query/user";

const Dashboard = () => {
  const { data: usersCount, isLoading: isUser } = useGetUserCount();
  const { data: logsCount, isLoading: isLog } = useGetLogsCount();
  const { data: transactionCount, isLoading: isTransaction } =
    useGetTransactionCount();
  const { data: userData } = useGetClientDetails();
  const { data: subCount, isLoading: isSub } = useGetSubCount();
  const { data: eventCount, isLoading: isEvent } = useGetEventCount();

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
        {(userData?.accountType === "BUSINESS"
          ? busClientDashboard
          : userData?.accountType === "EVENT_PLANNER"
          ? eventClientDahboard
          : clientDahboard.slice(0, 2)
        )?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton
              isLoaded={
                userData?.accountType === "BUSINESS"
                  ? !isLog
                  : userData?.accountType === "EVENT_PLANNER"
                  ? i === 0
                    ? !isTransaction
                    : i === 1
                    ? !isUser
                    : i === 2 && !isEvent
                  : i === 0
                  ? !isSub
                  : i === 1 && !isUser
              }
              h="12rem"
            >
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
                        fontSize="14px"
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
                        {userData?.accountType === "EVENT_PLANNER"
                          ? i === 0
                            ? transactionCount?.total?.toLocaleString()
                            : i === 1 && eventCount?.total?.toLocaleString()
                          : userData?.accountType === "BUSINESS"
                          ? i === 0 && logsCount?.total?.toLocaleString()
                          : i === 0
                          ? subCount?.total?.toLocaleString()
                          : i === 1
                          ? usersCount?.total?.toLocaleString()
                          : i === 2 && eventCount?.total?.toLocaleString()}
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
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {userData?.accountType === "BUSINESS" ||
                          (userData?.accountType === "EVENT_PLANNER" && i === 0)
                            ? "Pending"
                            : dat?.opt}
                        </Text>
                        <Text
                          color="#242628"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {userData?.accountType === "EVENT_PLANNER"
                            ? i === 0
                              ? transactionCount?.pending?.toLocaleString()
                              : i === 1 &&
                                eventCount?.inactive?.toLocaleString()
                            : userData?.accountType === "BUSINESS"
                            ? logsCount?.pending?.toLocaleString()
                            : i === 0
                            ? subCount?.inactive?.toLocaleString()
                            : i === 1
                            ? usersCount?.inactive?.toLocaleString()
                            : i === 2 && eventCount?.inactive?.toLocaleString()}
                        </Text>
                      </Flex>

                      <Flex align="center" gap="8px">
                        <Text
                          color="#646668"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {userData?.accountType === "BUSINESS" ||
                          (userData?.accountType === "EVENT_PLANNER" && i === 0)
                            ? "Completed"
                            : dat?.secOpt}
                        </Text>
                        <Text
                          color="#242628"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {userData?.accountType === "EVENT_PLANNER"
                            ? i === 0
                              ? transactionCount?.completed?.toLocaleString()
                              : i === 1 && eventCount?.active?.toLocaleString()
                            : userData?.accountType === "BUSINESS"
                            ? logsCount?.completed?.toLocaleString()
                            : i === 0
                            ? subCount?.active?.toLocaleString()
                            : i === 1
                            ? usersCount?.active?.toLocaleString()
                            : i === 2 && eventCount?.inactive?.toLocaleString()}
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
