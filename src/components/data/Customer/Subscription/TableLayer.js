import React, { useState } from "react";
import { Box, Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import { Status, intervals, subHeader } from "../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetUserSub } from "../../../../services/customer/query/user";
import { formatDate } from "../../../../utils/helpers";
import TableLoader from "../../../loaders/TableLoader";
import { Add } from "../../../common/images";
import { useNavigate } from "react-router-dom";

const TableLayer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 25;
  const { isLoading, data: subs } = useGetUserSub(limit, page);

  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : subs?.data?.length ? (
        <TableFormat
          maxH={"50vh"}
          opt
          minH="25vh"
          header={subHeader}
          paginate={
            <Flex
              justifyContent="center"
              align="center"
              flexDir="column"
              w="full"
            >
              <Flex justifyContent="center" gap="32px" align="center">
                <Text fontSize="12px" color="#242628" lineHeight="100%">
                  Showing rows 1 to {subs?.total < limit ? subs?.total : limit}{" "}
                  of {subs?.total}
                </Text>

                <Flex gap="16px" align="center">
                  <Flex
                    opacity={subs?.page === 1 ? 0.5 : 1}
                    onClick={() => (subs?.page !== 1 ? setPage(page - 1) : "")}
                    cursor={subs?.page === 1 ? "" : "pointer"}
                    align="center"
                    gap="2px"
                    color="#A4A6A8"
                    fontSize="12px"
                  >
                    <IoIosArrowBack />
                    <Text lineHeight="100%">Previous</Text>
                  </Flex>

                  <Flex
                    align="center"
                    gap="5px"
                    color="#A4A6A8"
                    fontSize="12px"
                  >
                    <Flex
                      bg="tranparent"
                      py="6px"
                      px="8px"
                      color="#242628"
                      fontSize="12px"
                      lineHeight="100%"
                    >
                      <Text>{subs?.page}</Text>
                    </Flex>
                    <Text fontWeight={500} fontSize="12px">
                      -{" "}
                    </Text>
                    <Flex
                      bg="#242628"
                      py="6px"
                      px="8px"
                      color="#fff"
                      fontSize="12px"
                      lineHeight="100%"
                    >
                      <Text>{subs?.pageCount}</Text>
                    </Flex>
                  </Flex>

                  <Flex
                    opacity={subs?.page === subs?.pageCount ? 0.5 : 1}
                    onClick={() =>
                      subs?.page !== subs?.pageCount ? setPage(page + 1) : ""
                    }
                    cursor={subs?.page === subs?.pageCount ? "" : "pointer"}
                    align="center"
                    gap="2px"
                    color="#A4A6A8"
                    fontSize="12px"
                  >
                    <IoIosArrowForward />
                    <Text lineHeight="100%">Next</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          }
        >
          {subs?.data?.map((dat, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td textAlign="center">{dat?.membershipPlan?.name}</Td>
              <Td textAlign="center">
                ₦{" "}
                {dat?.membershipPlan?.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Td>
              <Td textAlign="center">
                {Object.values(intervals[dat?.membershipPlan?.interval])[0]}
              </Td>
              <Td textAlign="center">{formatDate(dat?.nextPaymentDate)}</Td>
              <Td>
                <Flex
                  color={Object.values(Status[dat?.status])[0]}
                  bg={Object.values(Status[dat?.status])[2]}
                  py="5px"
                  px="16px"
                  justifyContent="center"
                  borderRadius="4px"
                  align="center"
                >
                  {Object.values(Status[dat?.status])[1]}
                </Flex>
              </Td>
              <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
              <Td>
                <Flex justifyContent="center" align="center">
                  <FiMoreVertical />
                </Flex>
              </Td>
            </Tr>
          ))}
        </TableFormat>
      ) : (
        <Flex
          gap="14px"
          justifyContent="center"
          align="center"
          mt="48px"
          mb="68px"
          flexDir="column"
        >
          <Image src="/assets/sub.png" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            You are yet to make a subscription
          </Text>

          <Button
            onClick={() => navigate("/customer/add-subscriptions")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add Subscription</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
