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
  Button,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { useDeleteAttendant } from "../../../../services/admin/query/users";
import { BsChevronDown } from "react-icons/bs";
import TableLoader from "../../../loaders/TableLoader";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { Add } from "../../../common/images";
import { SecStatus, clientListOption } from "../../../common/constants";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  refetch,
  setLimit,
  limit,
}) => {
  const headers = [
    "NAME",
    "USER ID",
    "ACCOUNT TYPE",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeleteAttendant({
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

  const openOption = (i, attendant) => {
    i === 0
      ? navigate(`/admin/users/attendants/details/${attendant?.id}`)
      : i === 1
      ? (navigate(`/admin/users/attendants/details/${attendant?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: attendant.id });
  };

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            opt
            header={headers}
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
            {data?.data?.map((attendant, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{attendant?.name}</Td>
                <Td textAlign="center">{attendant?.userId}</Td>
                <Td textAlign="center">{attendant?.accountType}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[attendant?.status])[0]}
                      bg={Object?.values(SecStatus[attendant?.status])[2]}
                      justifyContent={"center"}
                      alignItems="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {attendant?.status ? "Active" : "Inactive"}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  {formatDateNewTime(attendant?.createdAt)}
                </Td>
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
                            onClick={() => openOption(i, attendant)}
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
            title="Delete Attendant"
            subTitle="Are you sure you want to delete this attendant?"
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
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Attendant Data
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_ATTENDANT)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="14px"
          >
            <Text>Add an Attendant</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
