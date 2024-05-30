import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGetLeaveBalance } from "../../../services/staff/query/leave";
import { useGetUser } from "../../../services/staff/query/user";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: userData, refetch } = useGetUser({
    refetchOnWindowFocus: true,
  });
  const { data: balance, refetch: balanceRefetch } = useGetLeaveBalance({
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    balanceRefetch();
    refetch();
  }, []);
  return (
    <Box bg="#FCFFF7" py="40px" px="35px" borderRadius="24px">
      <Flex align="center" justifyContent="space-between" w="full">
        <Box>
          <Flex align="center" gap="10px">
            <Avatar w="30px" h="30px" rounded="full" />

            <Box>
              <Text fontSize="12px">Hello, {userData?.fullName}</Text>
              <Text fontFamily="Cooper" fontSize="18px">
                Welcome Back
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box>
          <Image
            src="/assets/green-bell.svg"
            w="24px"
            h="24px"
            objectFit="contain"
          />
        </Box>
      </Flex>

      <Box mt="40px">
        <Grid
          gap="40px"
          alignContent="center"
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
        >
          <GridItem
            bg="#fff"
            border="1px solid #086375"
            borderRadius="12px"
            h="120px"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="24px"
          >
            <Flex align="center" justifyContent="space-between" w="full">
              <Box>
                <Text color="#086375" fontSize="12px" fontWeight={500} mb="4px">
                  Performace Rating
                </Text>
                <Flex align="center" gap="2px">
                  <Text color="#086375" fontSize="28px" fontWeight={700}>
                    4.89
                  </Text>
                  <Image
                    src="/assets/star.svg"
                    w="24px"
                    h="24px"
                    objectFit="contain"
                  />
                </Flex>
              </Box>

              <Flex
                border="1px solid #00765F33"
                rounded="full"
                py="8px"
                px="10px"
                bg="#1DD3B066"
                fontSize="10px"
                fontWeight={700}
                align="flex-start"
                justifyContent="center"
                gap="4px"
              >
                <Text>71.8%</Text>
                <Image
                  w="10px"
                  h="10px"
                  src="/assets/up-arrow.svg"
                  objectFit="contain"
                />
              </Flex>
            </Flex>
          </GridItem>

          <GridItem
            bg="#086375"
            borderRadius="12px"
            h="120px"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="24px"
          >
            <Flex align="center" justifyContent="space-between" w="full">
              <Box>
                <Text color="#fff" fontSize="12px" mb="4px">
                  Today's Schedule
                </Text>
                <Text color="#fff" fontSize="18px" fontWeight={700}>
                  Ziya Delicacy Boutique
                </Text>
              </Box>

              <Image
                src="/assets/loc.svg"
                w="20px"
                h="20px"
                objectFit="contain"
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>

      <Box mt="40px">
        <Grid
          gap="40px"
          alignContent="center"
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
        >
          <GridItem
            bg="#fff"
            border="1px solid #086375"
            borderRadius="12px"
            h="146px"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="24px"
          >
            <Box>
              <Text fontSize="12px" mb="4px">
                Leave Balance
              </Text>
              <Text fontSize="32px" fontWeight={700}>
                {balance?.data?.leaveBalance < 0 ||
                balance?.data?.leaveBalance === 0
                  ? "0"
                  : balance?.data?.leaveBalance}{" "}
                Day
                {balance?.data?.leaveBalance > 0 ? "s" : ""}
              </Text>

              <Flex
                color="#086375"
                mt="24px"
                w="fit-content"
                cursor="pointer"
                onClick={() => navigate("/staff/leave/request")}
                align="center"
                gap="4px"
              >
                <Text fontSize="12px" fontWeight={700}>
                  Request Leave
                </Text>
                <IoIosArrowForward />
              </Flex>
            </Box>
          </GridItem>

          <GridItem
            bg="#fff"
            border="1px solid #086375"
            borderRadius="12px"
            h="146px"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="24px"
          >
            <Box>
              <Text fontSize="12px" mb="4px">
                Outstanding Loan
              </Text>
              <Text fontSize="32px" fontWeight={700}>
                ₦ {userData?.outStandingLoan.toLocaleString()}
              </Text>

              <Flex
                color="#086375"
                mt="24px"
                w="fit-content"
                cursor="pointer"
                onClick={() => navigate("/staff/loans/request")}
                align="center"
                gap="4px"
              >
                <Text fontSize="12px" fontWeight={700}>
                  Request Loan
                </Text>
                <IoIosArrowForward />
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <Box
        bg="#fff"
        mt="40px"
        border="1px solid #F3CE0E"
        borderRadius="12px"
        p="24px"
      >
        <Text fontSize="12px" fontWeight={700}>
          RECENT ACHIEVEMENTS
        </Text>

        <Flex align="center" mt="30px" flexDir="column" justifyContent="center">
          <Image
            w="100px"
            h="100px"
            objectFit="contain"
            src="/assets/no-achieve.jpg"
          />
          <Text fontSize="18px" fontWeight={500} opacity={0.2} mt="35px">
            No Recent Achievements
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
