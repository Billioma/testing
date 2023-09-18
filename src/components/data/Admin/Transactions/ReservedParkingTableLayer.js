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
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NoData from "../../../common/NoData";
import { formatDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteReservedParking } from "../../../../services/admin/query/transactions";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  refetch,
}) => {
  const headers = [
    "RESERVATION NO.",
    "NAME",
    "AMOUNT",
    "ZONE",
    "VEHICLE",
    // "SERVICE TYPE",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeleteReservedParking({
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

  return (
    <Box>
      <TableFormat
        isLoading={isLoading}
        minH="25vh"
        maxH="65vh"
        header={headers}
        opt
        alignFirstHeader
        alignSecondHeader
        paginate={
          <Flex
            justifyContent="center"
            align="center"
            flexDir="column"
            w="full"
          >
            <Flex justifyContent="center" gap="32px" align="center">
              <Text fontSize="12px" color="#242628" lineHeight="100%">
                Showing rows {startRow} to {endRow} of {data?.total}
              </Text>

              <Flex gap="16px" align="center">
                <Flex
                  opacity={data?.page === 1 ? 0.5 : 1}
                  onClick={() => (data?.page !== 1 ? setPage(page - 1) : "")}
                  cursor={data?.page === 1 ? "" : "pointer"}
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
                  fontSize="12px"
                >
                  <IoIosArrowBack />
                  <Text lineHeight="100%">Previous</Text>
                </Flex>

                <Flex align="center" gap="5px" color="#A4A6A8" fontSize="12px">
                  <Flex
                    bg="tranparent"
                    py="6px"
                    px="8px"
                    color="#242628"
                    fontSize="12px"
                    lineHeight="100%"
                  >
                    <Text>{data?.page}</Text>
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
                    <Text>{data?.pageCount}</Text>
                  </Flex>
                </Flex>

                <Flex
                  opacity={data?.page === data?.pageCount ? 0.5 : 1}
                  onClick={() =>
                    data?.page !== data?.pageCount ? setPage(page + 1) : ""
                  }
                  cursor={data?.page === data?.pageCount ? "" : "pointer"}
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
        {data?.data?.length ? (
          data?.data?.map((transaction, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td>{transaction?.reservationId}</Td>
              <Td>
                {transaction?.customer?.profile?.firstName}{" "}
                {transaction?.customer?.profile?.lastName}
              </Td>
              <Td textAlign="center">
                ₦{transaction?.amount?.toLocaleString()}
              </Td>
              <Td textAlign="center">{transaction?.zone?.description}</Td>
              <Td textAlign="center">{transaction?.vehicle?.licensePlate}</Td>
              {/* <Td textAlign="center">{transaction?.service?.name}</Td> */}

              <Td textAlign="center">
                <Flex
                  bg={transaction?.status ? "#E5FFE5" : "#FEF1F1"}
                  color={transaction?.status ? "#0B841D" : "#EE383A"}
                  justifyContent={"center"}
                  alignItems="center"
                  padding="7px 10px"
                  borderRadius="4px"
                >
                  {transaction?.status ? "Active" : "Inactive"}
                </Flex>
              </Td>

              <Td textAlign="center">{formatDate(transaction?.createdAt)}</Td>
              <Td textAlign="center">
                <Flex justifyContent="center" align="center">
                  <Menu>
                    <MenuButton as={Text} cursor="pointer">
                      <BsChevronDown />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        onClick={() =>
                          navigate(
                            `${PRIVATE_PATHS.ADMIN_RESERVED_PARKING}/details/${transaction.id}`,
                            { state: { ...transaction, isEdit: false } }
                          )
                        }
                      >
                        <HiOutlineInformationCircle size={14} />
                        View
                      </MenuItem>

                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        onClick={() =>
                          navigate(
                            `${PRIVATE_PATHS.ADMIN_RESERVED_PARKING}/details/${transaction.id}`,
                            { state: { ...transaction, isEdit: true } }
                          )
                        }
                      >
                        <FiEdit size={14} />
                        Edit
                      </MenuItem>

                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        color="red"
                        onClick={() =>
                          setSelectedRow({ isOpen: true, id: transaction.id })
                        }
                      >
                        <FiTrash2 />
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={7} rowSpan={2}>
              <NoData
                title="No Membership Plan"
                desc="You have not added an membership plan"
              />
            </Td>
          </Tr>
        )}
      </TableFormat>

      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Plan"
        subTitle="Are you sure you want to delete this transaction?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default TableLayer;
