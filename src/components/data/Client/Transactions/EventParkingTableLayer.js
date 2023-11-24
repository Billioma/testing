import React, { useEffect, useState } from "react";
import { Box, Flex, Td, Text, Tr, Image } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDate, formatFullDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../../../utils/notifications";
import TableLoader from "../../../loaders/TableLoader";
import { Status } from "../../../common/constants";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { FiMoreVertical } from "react-icons/fi";
import { useCancelClientSub } from "../../../../services/client/query/events";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  refetch,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const headers = [
    "TICKET NUMBER",
    "AMOUNT",
    "EVENT NAME",
    "ZONE",
    "LOCATION",
    "EVENT START",
    "EVENT END",
    "STATUS",
    "DATE CREATED",
    "ACTIONS",
  ];

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

  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState("");

  const open = (transaction) => {
    setShow(true);
    setCurrentTransaction(transaction);
  };

  const { mutate, isLoading: isCancel } = useCancelClientSub({
    onSuccess: () => {
      setShowCancel(false);
      successToast("Reservation cancelled");
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const openOption = (index, transaction) => {
    index === 0
      ? navigate(`/client/transactions/details/${transaction?.id}`)
      : index === 1 &&
        (setShowCancel(true), setCurrentTransaction(transaction));
  };

  const handleSubmit = () => {
    mutate(currentTransaction?.id);
  };

  useEffect(() => {
    if (showCancel) {
      setShow(false);
    }
  }, [showCancel]);

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={headers}
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
            {data?.data?.map((transaction, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td>{transaction?.ticketNumber}</Td>
                <Td textAlign="center">
                  ₦{transaction?.amount?.toLocaleString()}
                </Td>
                <Td textAlign="center">{transaction?.event?.name}</Td>
                <Td textAlign="center">{transaction?.zone?.name}</Td>
                <Td textAlign="center">
                  {transaction?.zone?.location?.name || "N/A"}
                </Td>
                <Td textAlign="center">
                  {formatFullDate(transaction?.event?.eventStartDateTime)}
                </Td>
                <Td textAlign="center">
                  {formatFullDate(transaction?.event?.eventEndDateTime)}
                </Td>

                <Td textAlign="center">
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      color={Object.values(Status[transaction?.status])[0]}
                      bg={Object.values(Status[transaction?.status])[2]}
                      py="5px"
                      px="16px"
                      w="fit-content"
                      justifyContent="center"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object.values(Status[transaction?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">{formatDate(transaction?.createdAt)}</Td>
                <Td textAlign="center">
                  <Flex
                    onClick={() => open(transaction)}
                    justifyContent="center"
                    pos="relative"
                    cursor="pointer"
                    className="box"
                    align="center"
                  >
                    <FiMoreVertical />
                    {show && currentTransaction === transaction && (
                      <Box
                        border="1px solid #F4F6F8"
                        px="4px"
                        py="8px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        top={i === data?.data?.length - 1 ? "" : "20px"}
                        bottom={i === data?.data?.length - 1 ? "0" : ""}
                        right="0"
                        zIndex={5555555}
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        {(transaction?.status !== 0
                          ? ["View Details"]
                          : ["View Details", "Cancel Reservation"]
                        ).map((dat, index) => (
                          <Flex
                            py="6px"
                            px="8px"
                            mb="8px"
                            borderRadius="2px"
                            align="center"
                            onClick={() => openOption(index, transaction)}
                            _hover={{ bg: "#F4F6F8" }}
                            cursor="pointer"
                            fontSize="10px"
                            color={index === 0 ? "#646668" : "red"}
                            w="full"
                            lindexneHeight="100%"
                            fontWeight={500}
                            gap="12px"
                          >
                            {index === 0 ? (
                              <HiOutlineInformationCircle size="15px" />
                            ) : (
                              <FcCancel size="15px" />
                            )}
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
          <Image src="/assets/no-sub.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Event Parking Transactions
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

export default TableLayer;
