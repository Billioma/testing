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
import { FiEdit, FiTrash2 } from "react-icons/fi";
import NoData from "../../../common/NoData";
import { formatDate } from "../../../../utils/helpers";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteClient } from "../../../../services/admin/query/clients";
import TableLoader from "../../../loaders/TableLoader";
import { Add } from "../../../common/images";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { SecStatus, clientListOption } from "../../../common/constants";

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

  const openOption = (i, client) => {
    i === 0
      ? navigate(`/admin/clients/all/details/${client?.id}`)
      : i === 1
      ? (navigate(`/admin/clients/all/details/${client?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: client.id });
  };

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            minH="25vh"
            maxH="65vh"
            header={headers}
            opt
            alignFirstHeader
            alignSecondHeader
            filter
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
                  <Td textTransform="capitalize">{client?.contactPerson}</Td>
                  <Td textAlign="center">{client?.phone}</Td>
                  <Td textAlign="center">{client?.state}</Td>
                  <Td>
                    <Flex align="center" w="full" justifyContent="center">
                      <Flex
                        bg="#F4F6F8"
                        py="5px"
                        justifyContent="center"
                        px="16px"
                        borderRadius="4px"
                      >
                        {client?.accountType?.replace("_", " ")}
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" w="full" justifyContent="center">
                      <Flex
                        color={Object?.values(SecStatus[client?.status])[0]}
                        bg={Object?.values(SecStatus[client?.status])[2]}
                        justifyContent="center"
                        align="center"
                        py="5px"
                        px="16px"
                        borderRadius="4px"
                      >
                        {Object?.values(SecStatus[client?.status])[1]}
                      </Flex>
                    </Flex>
                  </Td>
                  <Td textAlign="center">{formatDate(client?.createdAt)}</Td>
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
                              onClick={() => openOption(i, client)}
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
              ))
            ) : (
              <Tr>
                <Td colSpan={7} rowSpan={2}>
                  <NoData
                    title="No Client"
                    desc="You have not added a client"
                  />
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
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-user.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Client Data
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_CLIENT)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Client</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
