import React, { useState } from "react";
import {
  Box,
  Flex,
  Td,
  Text,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Icon,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import { useDeletePayToPark } from "../../../../services/admin/query/transactions";
import TableLoader from "../../../loaders/TableLoader";
import { Status, viewDeleteOption } from "../../../common/constants";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  refetch,
  limit,
  setLimit,
}) => {
  const headers = [
    "TICKET NUMBER",
    "NAME",
    "AMOUNT",
    "ZONE",
    "VEHICLE",
    "SERVICE TYPE",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeletePayToPark({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setSelectedRow({ isOen: false, id: null });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(selectedRow.id);
  };

  const openOption = (i, transaction) => {
    i === 0
      ? navigate(`/admin/transactions/pay-to-park/${transaction?.id}`)
      : i === 1 && setSelectedRow({ isOpen: true, id: transaction.id });
  };

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={headers}
            alignFirstHeader
            alignSecondHeader
            alignThirdHeader
            opt
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
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{transaction?.ticketNumber}</Td>
                <Td>
                  {transaction?.customer?.profile?.firstName}{" "}
                  {transaction?.customer?.profile?.lastName}
                </Td>
                <Td>₦{transaction?.amount?.toLocaleString()}</Td>
                <Td textAlign="center">{transaction?.zone?.name || "N/A"}</Td>
                <Td textAlign="center">{transaction?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">{transaction?.service?.name}</Td>

                <Td textAlign="center">
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      color={Object.values(Status[transaction?.status])[0]}
                      bg={Object.values(Status[transaction?.status])[2]}
                      py="5px"
                      px="16px"
                      justifyContent="center"
                      w="fit-content"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object.values(Status[transaction?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">
                  {formatDateNewTime(transaction?.createdAt)}
                </Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Menu>
                      <MenuButton as={Text} cursor="pointer">
                        <BsChevronDown />
                      </MenuButton>
                      <MenuList
                        borderRadius="4px"
                        p="10px"
                        border="1px solid #F4F6F8"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        {viewDeleteOption.map((dat, i) => (
                          <MenuItem
                            gap="12px"
                            borderRadius="2px"
                            mb="8px"
                            py="6px"
                            px="8px"
                            _hover={{ bg: "#F4F6F8" }}
                            align="center"
                            fontWeight="500"
                            onClick={() => openOption(i, transaction)}
                          >
                            <Icon as={dat.icon} />
                            {dat?.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </TableFormat>

          <AdminDeleteModal
            isOpen={selectedRow.isOpen}
            onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
            title="Delete Transaction"
            subTitle="Are you sure you want to delete this transaction?"
            handleSubmit={handleSubmit}
            isLoading={isDeleting}
          />
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
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Pay To Park Transactions
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
