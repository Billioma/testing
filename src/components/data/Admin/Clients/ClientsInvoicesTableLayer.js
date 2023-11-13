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
  Button,
  Icon,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteClientInvoice } from "../../../../services/admin/query/clients";
import TableLoader from "../../../loaders/TableLoader";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { Add } from "../../../common/images";
import { clientListOption } from "../../../common/constants";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  refetch,
  startRow,
  endRow,
  setLimit,
  limit,
}) => {
  const headers = [
    "CLIENT",
    "AMOUNT PAYABLE",
    "CREATED BY",
    "PAID AT",
    "PAYMENT STATUS",
    "DATE",
    "ACTIONS",
  ];
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteClientInvoice({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setSelectedRow({ isOpen: false, id: null });
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

  const openOption = (i, invoice) => {
    i === 0
      ? window.open(
          `https://pisapi.ezpark.ng/public/client-invoices/${invoice.id}/view`,
          "_blank"
        )
      : i === 1
      ? (navigate(`/admin/clients/invoices/details/${invoice?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: invoice.id });
  };

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
            alignSecondHeader
            alignThirdHeader
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
            {data?.data?.map((invoice, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td>{invoice?.client?.name}</Td>
                <Td>₦ {invoice?.amountPayable?.toLocaleString()}</Td>
                <Td>{invoice?.createdBy}</Td>
                <Td textAlign="center">
                  {formatDate(invoice?.paidAt) || "N/A"}
                </Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      bg={invoice?.paymentStatus ? "#E5FFE5" : "#FEF1F1"}
                      color={invoice?.paymentStatus ? "#0B841D" : "#EE383A"}
                      justifyContent={"center"}
                      alignItems="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {invoice?.paymentStatus ? "Paid" : "Unpaid"}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign={"center"}>{formatDate(invoice?.createdAt)}</Td>
                <Td>
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
                        {clientListOption.map((dat, i) => (
                          <MenuItem
                            gap="12px"
                            borderRadius="2px"
                            mb="8px"
                            py="6px"
                            px="8px"
                            _hover={{ bg: "#F4F6F8" }}
                            align="center"
                            fontWeight="500"
                            onClick={() => openOption(i, invoice)}
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
            title="Delete Invoice"
            subTitle="Are you sure you want to delete this invoice?"
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
          <Image src="/assets/no-log-rep.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Client Invoice
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_CLIENT_INVOICE)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Client Invoice</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
