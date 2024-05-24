import React, { useEffect } from "react";
import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetLeave,
  useWithdrawLeave,
} from "../../../services/staff/query/leave";
import { LeaveStatus } from "../../../components/common/constants";
import { formatDate } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetLeave(id, {
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    refetch();
  }, []);

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isWithdrawing } = useWithdrawLeave({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    mutate(id);
  };

  return (
    <Box>
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex
            flexDir="column"
            justifyContent="center"
            display={data?.status === "ACTIVE" ? "flex" : "none"}
            h="168px"
            borderRadius="12px"
            bg="#075666"
            px="60px"
            pos="relative"
          >
            <Image
              src="/assets/top-left.svg"
              w="240px"
              h="240px"
              pos="absolute"
              top="-10"
              left="-5"
            />
            <Flex align="center" justifyContent="space-between" w="full">
              <Flex align="center" gap="16px" fontWeight={500}>
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="rgba(29, 211, 176, 0.4)"
                  rounded="full"
                  py="4px"
                  color="#fff"
                  px="10px"
                >
                  Active
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  color="#075666"
                  bg="#fff"
                  rounded="full"
                  py="4px"
                  px="10px"
                >
                  {data?.purpose}
                </Flex>
              </Flex>

              <Flex align="center" gap="68px">
                <Box fontWeight={700}>
                  <Text color="#fff" opacity={0.4} fontSize="12px">
                    START DATE
                  </Text>
                  <Text mt="8px" color="#fff" fontSize="24px">
                    {formatDate(data?.startDate)}
                  </Text>
                </Box>

                <Box fontWeight={700}>
                  <Text color="#fff" opacity={0.4} fontSize="12px">
                    END DATE
                  </Text>
                  <Text mt="8px" color="#fff" fontSize="24px">
                    {formatDate(data?.endDate)}
                  </Text>
                </Box>
              </Flex>
            </Flex>

            <Image
              src="/assets/bottom-right.svg"
              w="220px"
              h="220px"
              opacity={0.8}
              pos="absolute"
              bottom="-40px"
              right="0"
            />
          </Flex>

          <Flex
            flexDir="column"
            borderRadius="12px"
            border="1px solid #BAE0D9"
            p={{ base: "20px", md: "60px" }}
            pos="relative"
            display={data?.status === "ACTIVE" ? "none" : "flex"}
          >
            <Flex
              align="center"
              justifyContent="space-between"
              fontWeight={500}
              w="full"
              fontSize={{ base: "14px", md: "16px" }}
            >
              <Flex align="center" gap="16px">
                <Flex
                  justifyContent="center"
                  align="center"
                  border="1px solid #BAE0D9"
                  rounded="full"
                  py="4px"
                  color="#090C02"
                  px="10px"
                  opacity={0.6}
                >
                  Leave ID: {id}
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  color="#075666"
                  border="1px solid #BAE0D9"
                  rounded="full"
                  py="4px"
                  px="10px"
                >
                  {data?.purpose}
                </Flex>
              </Flex>

              <Flex
                justifyContent="center"
                align="center"
                color={
                  LeaveStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase()
                  )?.color || ""
                }
                bg={
                  LeaveStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase()
                  )?.bg || ""
                }
                rounded="full"
                border="1px solid"
                borderColor={
                  LeaveStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase()
                  )?.border || ""
                }
                py="4px"
                textTransform="capitalize"
                px="10px"
              >
                {data?.status === "REJECTED"
                  ? "Declined"
                  : data?.status?.toLowerCase()}
              </Flex>
            </Flex>

            <Flex
              color="#090c02"
              align="center"
              mt="40px"
              flexWrap="wrap"
              justifyContent="space-between"
              w={{ base: "100%", md: "75%" }}
              gap={{ base: "20px", md: "unset" }}
            >
              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  {data?.status === "PENDING" || data?.status === "REJECTED"
                    ? "PROPOSED"
                    : ""}{" "}
                  START DATE
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.startDate)}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  {data?.status === "PENDING" || data?.status === "REJECTED"
                    ? "PROPOSED"
                    : ""}{" "}
                  END DATE
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.endDate)}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  DATE{" "}
                  {data?.status === "PENDING" || data?.status === "REJECTED"
                    ? "SUBMITTED"
                    : "APPROVED"}
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.createdAt)}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Box
            mt="24px"
            border="1px solid #BAE0D9"
            borderRadius="12px"
            display={data?.additionalComments ? "block" : "none"}
            py="16px"
            px="30px"
          >
            {data?.additionalComments}
          </Box>

          <Flex
            gap="24px"
            display={data?.status === "PENDING" ? "flex" : "none"}
            w={{ base: "100%", md: "30%" }}
            mt="24px"
            align="center"
          >
            <Button
              onClick={() => navigate(`/staff/leave-request/${id}/update`)}
              bg="transparent"
              border="1px solid #086375"
              color="#086375"
              borderRadius="8px"
              h="60px"
              w="full"
            >
              Edit
            </Button>
            <Button
              color="#fff"
              bg="#A11212"
              variant="adminPrimary"
              borderRadius="8px"
              onClick={handleSubmit}
              isLoading={isWithdrawing}
              h="60px"
              w="full"
            >
              Cancel
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default LeaveDetails;
