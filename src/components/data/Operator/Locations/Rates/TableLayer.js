import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../../loaders/TableLoader";
import {
  SecStatus,
  operatorRatesHeader,
  rateOption,
} from "../../../../common/constants";
import { formatDate } from "../../../../../utils/helpers";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Add } from "../../../../common/images";
import TableFormat from "../../../../common/TableFormat";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const [show, setShow] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const open = (item) => {
    setShow(true);
    setCurrentLocation(item);
  };

  const openOption = (i) => {
    i === 0
      ? navigate(`/operator/locations/rates/${currentLocation?.id}`)
      : i === 1 &&
        (navigate(`/operator/locations/rates/${currentLocation?.id}`),
        sessionStorage.setItem("edit", "edit"));
  };
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={operatorRatesHeader}
            opt
            alignFirstHeader
            alignSecondHeader
            paginationValues={{
              startRow,
              endRow,
              total: data?.total,
              page: data?.page,
              pageCount: data?.pageCount,
              onNext: () =>
                data?.page !== data?.pageCount ? setPage(page + 1) : null,
              onPrevious: () => (data?.page !== 1 ? setPage(page - 1) : null),
              setLimit,
              limit,
            }}
            useDefaultPagination
          >
            {data?.data?.map((item, i) => (
              <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.name}</Td>
                <Td>{item?.durationType}</Td>
                <Td textAlign="center">{item?.durationStart}</Td>
                <Td textAlign="center">{item?.durationLimit}</Td>
                <Td textAlign="center">
                  ₦{" "}
                  {item?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[item?.status])[0]}
                      bg={Object?.values(SecStatus[item?.status])[2]}
                      py="5px"
                      px="16px"
                      justifyContent="center"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object?.values(SecStatus[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDate(item?.createdAt)}</Td>

                <Td>
                  <Flex
                    onClick={() => open(item)}
                    justifyContent="center"
                    pos="relative"
                    cursor="pointer"
                    className="box"
                    align="center"
                  >
                    <IoIosArrowDown />
                    {show && currentLocation === item && (
                      <Box
                        border="1px solid #F4F6F8"
                        p="10px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        top={i < 3 ? "20px" : "unset"}
                        bottom={i > 3 ? "0" : "unset"}
                        right="0"
                        zIndex={5555555}
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        {rateOption.map((item, i) => (
                          <Flex
                            key={i}
                            mb="8px"
                            py="6px"
                            px="8px"
                            w="full"
                            borderRadius="2px"
                            align="center"
                            onClick={() => openOption(i)}
                            _hover={{ bg: "#F4F6F8" }}
                            cursor="pointer"
                            fontSize="10px"
                            color={i !== 2 ? "#646668" : "#A11212"}
                            lineHeight="100%"
                            gap="12px"
                            fontWeight={500}
                          >
                            <Icon as={item.icon} w="16px" h="16px" />
                            {item?.name}
                          </Flex>
                        ))}
                      </Box>
                    )}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </TableFormat>
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-rate.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Rate Data
          </Text>

          <Button
            onClick={() => navigate("/operator/locations/rates/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Rate</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
