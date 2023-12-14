import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import {
  OnlinePaymentMethods,
  Status,
  operatorRpHeader,
} from "../../../common/constants";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import TableFormat from "../../../common/TableFormat";
import { TbListDetails } from "react-icons/tb";
import { FcCancel } from "react-icons/fc";
import { FiMoreVertical } from "react-icons/fi";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import { useCancelOpRp } from "../../../../services/operator/query/transactions";
import useCustomToast from "../../../../utils/notifications";

const RpTableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  refetch,
  endRow,
  limit,
  setLimit,
}) => {
  const [showCancel, setShowCancel] = useState(false);
  const navigate = useNavigate();
  const [currentTransaction, setCurrentTransaction] = useState("");
  const [show, setShow] = useState(false);

  const open = (item) => {
    setShow(true);
    setCurrentTransaction(item);
  };

  const openOption = (item, i) => {
    i === 1
      ? setShowCancel(true)
      : navigate(`/operator/transactions/reservations/${item?.id} `);
  };

  useEffect(() => {
    if (showCancel) {
      setShow(false);
    }
  }, [showCancel]);

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isCancel } = useCancelOpRp({
    onSuccess: () => {
      setShowCancel(false);
      successToast("Reservation Cancelled");
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    mutate(currentTransaction?.id);
  };

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
            header={operatorRpHeader}
            opt
            alignFirstHeader
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
              <Tr fontSize="14px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.reservationId}</Td>
                <Td textAlign="center">{item?.zone?.location?.name}</Td>
                <Td textAlign="center">{item?.zone?.name}</Td>
                <Td textAlign="center">
                  {" "}
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      bg="#F4F6F8"
                      w="fit-content"
                      align="center"
                      justifyContent="center"
                      py="7px"
                      px="15px"
                      borderRadius="4px"
                    >
                      {OnlinePaymentMethods?.find(
                        (dat, i) => i === item?.paymentMethod
                      ) || "N/A"}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(Status[item?.status])[0]}
                      bg={Object?.values(Status[item?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(Status[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td>
                  <Flex
                    pos="relative"
                    cursor="pointer"
                    onClick={() => open(item)}
                    justifyContent="center"
                    className="box"
                    align="center"
                  >
                    <FiMoreVertical />

                    {show && currentTransaction === item && (
                      <Box
                        border="1px solid #F4F6F8"
                        px="4px"
                        py="8px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        right="0"
                        zIndex={5555555}
                        top="20px"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        {(item?.status !== 0
                          ? ["View Details"]
                          : ["View Details", "Cancel Reservation"]
                        ).map((dat, i) => (
                          <Flex
                            key={i}
                            mb="8px"
                            py="6px"
                            px="8px"
                            borderRadius="2px"
                            align="center"
                            onClick={() => openOption(item, i)}
                            _hover={{ bg: "#F4F6F8" }}
                            cursor="pointer"
                            fontSize="12px"
                            gap="12px"
                            w="full"
                            color={i === 0 ? "#646668" : "#A11212"}
                            lineHeight="100%"
                            fontWeight={500}
                          >
                            {i === 1 ? <FcCancel /> : <TbListDetails />}
                            {dat}
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
          <Image src="/assets/no-log.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Reserve Parking Transactions
          </Text>
        </Flex>
      )}

      <ConfirmDeleteModal
        cancel
        title="Reservation"
        action={handleSubmit}
        isLoading={isCancel}
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
      />
    </Box>
  );
};

export default RpTableLayer;
