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
import { FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from "../../../common/NoData";
import { formatDate } from "../../../../utils/helpers";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteClient } from "../../../../services/admin/query/clients";

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
    "NAME",
    "CONTACT PERSON",
    "PHONE",
    "STATE",
    "ACCOUNT TYPE",
    "STATUS",
    // "MANAGERS",
    "DATE",
    "ACTIONS",
  ];
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteClient({
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

  return (
    <Box>
      <TableFormat
        isLoading={isLoading}
        minH="25vh"
        maxH="65vh"
        header={headers}
        opt
        act
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
        {data?.data?.length ? (
          data?.data?.map((client, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td>{client?.name}</Td>
              <Td>{client?.contactPerson}</Td>
              <Td>0{client?.phone}</Td>
              <Td>{client?.state}</Td>
              <Td>
                <Box
                  bg="#F4F6F8"
                  textAlign="center"
                  p={3}
                  h="100%"
                  borderRadius="8px"
                >
                  {client?.accountType}
                </Box>
              </Td>
              <Td>
                <Flex
                  bg={client?.status ? "#E5FFE5" : "#FEF1F1"}
                  color={client?.status ? "#0B841D" : "#EE383A"}
                  justifyContent={"center"}
                  alignItems="center"
                  padding="7px 10px"
                  borderRadius="4px"
                >
                  {client?.status ? "Active" : "Inactive"}
                </Flex>
              </Td>
              {/* <Td>
                {client?.managers[0]?.firstName} {client?.managers[0]?.lastName}{" "}
                {!client?.managers[0]?.lastName &&
                !client?.managers[0]?.lastName
                  ? "N/A"
                  : ""}
              </Td> */}
              <Td>{formatDate(client?.createdAt)}</Td>
              <Td>
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
                          navigate("/admin/clients/list/details/" + client.id, {
                            state: { ...client, isEdit: false },
                          })
                        }
                      >
                        <HiOutlineInformationCircle />
                        View
                      </MenuItem>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        onClick={() =>
                          navigate("/admin/clients/list/details/" + client.id, {
                            state: { ...client, isEdit: true },
                          })
                        }
                      >
                        <FiEdit />
                        Edit
                      </MenuItem>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        color="red"
                        onClick={() =>
                          setSelectedRow({ isOpen: true, id: client.id })
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
              <NoData title="No Client" desc="You have not added a client" />
            </Td>
          </Tr>
        )}
      </TableFormat>

      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Client"
        subTitle="Are you sure you want to delete this client?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default TableLayer;
