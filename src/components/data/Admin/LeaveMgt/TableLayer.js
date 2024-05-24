import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { LeaveStatus, viewDeleteOption } from "../../../common/constants";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../../loader/TableLoader";
import { formatDate } from "../../../../utils/helpers";
import { BsChevronDown } from "react-icons/bs";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import { useDeleteLeave } from "../../../../services/admin/query/staff";
import useCustomToast from "../../../../utils/notifications";

const TableLayer = ({
  type,
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
  const headers = [
    "STAFF ID",
    "STAFF NAME",
    "START DATE",
    "END DATE",
    "REQUEST DATE",
    "STATUS",
    "ACTIONS",
  ];

  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteLeave({
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

  const openOption = (i, leave) => {
    i === 0
      ? navigate(`/admin/leave-mgt/${leave?.id}`)
      : i === 1 && setSelectedRow({ isOpen: true, id: leave.id });
  };

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={
              type !== ""
                ? headers?.slice(0, 5)?.concat(headers?.slice(6, 7))
                : headers
            }
            opt
            alignFirstHeader
            alignSecondHeader
            alignThirdHeader
            alignForthHeader
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
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{item?.staff?.staffId}</Td>
                <Td>{item?.staff?.fullName}</Td>
                <Td>{formatDate(item?.startDate)}</Td>
                <Td>{formatDate(item?.endDate)}</Td>
                <Td textAlign="center">{formatDate(item?.createdAt)}</Td>
                <Td display={type === "" ? "" : "none"}>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={
                        LeaveStatus.find(
                          (dat) =>
                            dat.name?.toLowerCase() ===
                            item?.status?.toLowerCase()
                        )?.color || ""
                      }
                      bg={
                        LeaveStatus.find(
                          (dat) =>
                            dat.name?.toLowerCase() ===
                            item?.status?.toLowerCase()
                        )?.bg || ""
                      }
                      justifyContent={"center"}
                      alignItems="center"
                      py="5px"
                      px="16px"
                      textTransform="capitalize"
                      borderRadius="4px"
                    >
                      {item?.status === "REJECTED"
                        ? "Declined"
                        : item?.status?.toLowerCase()}
                    </Flex>
                  </Flex>
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
                            onClick={() => openOption(i, item)}
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
          </TableFormat>{" "}
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Leave Request Data
          </Text>
        </Flex>
      )}
      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Leave Request"
        subTitle="Are you sure you want to delete this request?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default TableLayer;
