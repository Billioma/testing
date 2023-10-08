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
import { useDeletePolicy } from "../../../../services/admin/query/locations";

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
  const headers = ["TITLE", "LOCATION", "DATE", "ACTIONS"];
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeletePolicy({
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
        {data?.data?.length ? (
          data?.data?.map((policy, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td>{policy?.title}</Td>
              <Td>{policy?.location?.name || "N/A"}</Td>

              <Td textAlign="center">{formatDate(policy?.createdAt)}</Td>
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
                          navigate(
                            "/admin/locations/policies/details/" + policy.id,
                            {
                              state: { ...policy, isEdit: false },
                            }
                          )
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
                          navigate(
                            "/admin/locations/policies/details/" + policy.id,
                            {
                              state: { ...policy, isEdit: true },
                            }
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
                          setSelectedRow({ isOpen: true, id: policy.id })
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
              <NoData title="No Policy" desc="You have not added a policy" />
            </Td>
          </Tr>
        )}
      </TableFormat>

      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Policy"
        subTitle="Are you sure you want to delete this policy?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default TableLayer;
