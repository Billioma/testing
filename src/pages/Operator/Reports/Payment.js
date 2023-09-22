import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import PaymentTableLayer from "../../../components/data/Operator/Reports/PaymentTableLayer";
import PayExport from "../../../components/data/Operator/Reports/PayExport";
import { useGetRepPayment } from "../../../services/operator/query/reports";
import { operatorPayGrid } from "../../../components/common/constants";

const Payment = () => {
  const { mutate, data, isLoading } = useGetRepPayment();

  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    mutate({ limit, page: page + 1 });
  }, [page]);

  return (
    <Box minH="75vh">
      <Grid
        mb="24px"
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {operatorPayGrid?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton borderRadius="8px" isLoaded={!isLoading} h="10rem">
              <Box
                borderRadius="8px"
                bg="#F4F6F8"
                p="5px"
                border="1px solid #E4E6E8"
              >
                <Box
                  h="6px"
                  w="full"
                  bg={
                    i === 0
                      ? "#EE383A"
                      : i === 1
                      ? "#0B841D"
                      : i === 2 && "#242628"
                  }
                  borderRadius="full"
                ></Box>
                <Box p="15px" pt="0px" pb="20px">
                  <Text
                    mt="24px"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={700}
                    color="#242628"
                  >
                    {dat}
                  </Text>

                  <Flex
                    mt="24px"
                    align="flex-end"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Box w="full">
                      <Text
                        mt="24px"
                        fontSize="28px"
                        lineHeight="100%"
                        color="#646668"
                        fontWeight={500}
                      >
                        {" "}
                        {i !== 2 && "₦"}{" "}
                        {i === 0
                          ? data?.aggregate?.totalAmountDue?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            )
                          : i === 1
                          ? data?.aggregate?.totalAmountPaid?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            )
                          : i === 2 &&
                            data?.count?.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Flex align="center" justifyContent="space-between" w="full">
          <Text
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            All Payment
          </Text>

          <Flex align="center" gap="24px">
            <PayExport data={data?.data} />
            <Flex
              justifyContent="center"
              align="center"
              cursor="pointer"
              transition=".3s ease-in-out"
              _hover={{ bg: "#F4F6F8" }}
              onClick={() => mutate({ limit, page: page + 1 })}
              borderRadius="8px"
              border="1px solid #848688"
              p="10px"
            >
              <Image
                src="/assets/refresh.svg"
                className={isLoading && "mirrored-icon"}
                w="20px"
                h="20px"
              />
            </Flex>
          </Flex>
        </Flex>

        <PaymentTableLayer
          page={page}
          setPage={setPage}
          data={data}
          limit={limit}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Payment;
