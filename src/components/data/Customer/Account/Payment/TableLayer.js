import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  custPayFieldOption,
  custTipFieldOption,
} from "../../../../common/constants";
import {
  useGetPaymentHistory,
  useGetPaymentTips,
} from "../../../../../services/customer/query/payment";
import Filter from "../../../../common/Filter";
import PaymentTable from "./PaymentTable";
import TipsTable from "./TipsTable";
import { formatNewDate } from "../../../../../utils/helpers";

const TableLayer = () => {
  const [filtArray, setFiltArray] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||$gte||"${formatNewDate(
          filterObj?.gte
        )}T00:00:00"`
      : filterObj?.lte
      ? `filter=${filterObj?.title}||$lte||"${formatNewDate(
          filterObj?.lte
        )}T23:59:59"`
      : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
          filterObj?.filter
        }"`;
  });
  const query = convertedFilters?.join("&");
  const {
    mutate: payMutate,
    data: paymentHistory,
    isLoading,
  } = useGetPaymentHistory();

  const {
    mutate: tipsMutate,
    data: paymentTips,
    isLoading: isTips,
  } = useGetPaymentTips();

  const [tab, setTab] = useState("Payments");

  useEffect(() => {
    tab === "Payments"
      ? payMutate({ filterString: query, limit: limit, page: page })
      : tipsMutate({ filterString: query, limit: limit, page: page });
  }, [query, page, tab]);

  return (
    <Box bg="#fff" w="full" px="23px" py="24px" borderRadius="8px" mt="32px">
      <Filter
        setFiltArray={setFiltArray}
        fieldToCompare={
          tab === "Tips" ? custTipFieldOption : custPayFieldOption
        }
        filtArray={filtArray}
        title={
          <Flex
            align="center"
            justifyContent="space-between"
            flexDir={{ base: "column", md: "row" }}
            gap={{ base: "15px", md: "" }}
            w="full"
          >
            <Box w="full">
              <Text
                color="#242628"
                fontSize="14px"
                textAlign={{ base: "center", md: "start" }}
                lineHeight="100%"
                fontWeight={500}
              >
                Payment History
              </Text>
            </Box>

            <Flex w="full">
              {["Payments", "Tips"].map((dat, i) => (
                <Text
                  key={i}
                  textAlign="center"
                  pb="16px"
                  fontSize="14px"
                  cursor="pointer"
                  _hover={{ color: "#EE383A" }}
                  transition=".3s ease-in-out"
                  onClick={() => {
                    setTab(dat);
                    setPage(1);
                    setFiltArray([]);
                  }}
                  w="full"
                  fontWeight={tab === dat ? 500 : 400}
                  color={tab === dat ? "#EE383A" : "#646668"}
                  borderBottom={tab === dat ? "3px solid #EE383A" : ""}
                >
                  {dat}
                </Text>
              ))}
            </Flex>

            <Box w="full"></Box>
          </Flex>
        }
      />

      {tab === "Payments" && (
        <PaymentTable
          isLoading={isLoading}
          paymentHistory={paymentHistory}
          page={page}
          limit={limit}
          setPage={setPage}
        />
      )}
      {tab === "Tips" && (
        <TipsTable
          isTips={isTips}
          paymentTips={paymentTips}
          page={page}
          setPage={setPage}
          limit={limit}
        />
      )}
    </Box>
  );
};

export default TableLayer;
