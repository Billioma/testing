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
import { useNavigate } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { useDeleteOperator } from "../../../../services/admin/query/users";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";

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
    "NAME",
    "EMAIL ADDRESS",
    "CONTACT PERSON",
    "PHONE",
    "STATE",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteOperator({
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

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

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
        alignFirstHeader="start"
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
          data?.data?.map((operator, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td>{operator?.name}</Td>
              <Td>{operator?.email}</Td>
              <Td>{operator?.contactPerson}</Td>
              <Td>{operator?.phone}</Td>
              <Td>{operator?.state}</Td>
              <Td textAlign="center">
                <Flex
                  bg={operator?.status ? "#E5FFE5" : "#FEF1F1"}
                  color={operator?.status ? "#0B841D" : "#EE383A"}
                  justifyContent={"center"}
                  alignItems="center"
                  padding="7px 10px"
                  borderRadius="4px"
                >
                  {operator?.status ? "Active" : "Inactive"}
                </Flex>
              </Td>
              <Td textAlign="center">{formatDate(operator?.createdAt)}</Td>
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
                            `${PRIVATE_PATHS.ADMIN_OPERATORS}/details/${operator.id}`,
                            { state: { ...operator, isEdit: false } }
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
                            `${PRIVATE_PATHS.ADMIN_OPERATORS}/details/${operator.id}`,
                            { state: { ...operator, isEdit: true } }
                          )
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
                          setSelectedRow({ isOpen: true, id: operator.id })
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
                title="No Operator"
                desc="You have not added an operator"
              />
            </Td>
          </Tr>
        )}
      </TableFormat>

      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Operator"
        subTitle="Are you sure you want to delete this operator?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default TableLayer;
