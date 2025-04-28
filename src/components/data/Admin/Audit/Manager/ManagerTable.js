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
import TableFormat from "../../../../common/TableFormat";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import { viewDeleteOption } from "../../../../common/constants";
import TableLoader from "../../../../loaders/TableLoader";
import { useDeleteSalesReport } from "../../../../../services/admin/query/audit";
import { formatDateNewTime } from "../../../../../utils/helpers";

const ManagerTable = ({
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
    "MANAGER NAME",
    "total revenue recorded",
    "locations",
    "performance",
    "date",
    "ACTIONS",
  ];

  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteSalesReport({
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

  const openOption = (i, audit) => {
    i === 0
      ? (navigate(`/admin/audit/managers/${audit?.managerId}`),
        sessionStorage.setItem("managerName", audit?.managerName))
      : i === 1 && setSelectedRow({ isOpen: true, id: audit.id });
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
            alignIndices={[0]}
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
            {data?.data?.map((audit, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{audit?.managerName}</Td>
                <Td textAlign="center">
                  ₦ {Number(audit?.totalRevenueRecorded)?.toLocaleString()}
                </Td>
                <Td textAlign="center">{audit?.locations}</Td>

                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={
                        Number(audit?.performance) < 40
                          ? "#E81313"
                          : Number(audit?.performance < 70)
                          ? "#F9A11E"
                          : "#008000"
                      }
                      bg={
                        Number(audit?.performance) < 40
                          ? "#F9D0CD"
                          : Number(audit?.performance < 70)
                          ? "#FDF6E7"
                          : "#E5FFE5"
                      }
                      justifyContent="center"
                      align="center"
                      py="5px"
                      textTransform="capitalize"
                      px="16px"
                      borderRadius="4px"
                    >
                      {audit?.performance}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(audit?.date)}</Td>
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
                        {viewDeleteOption.map((dat, i) => (
                          <MenuItem
                            key={i}
                            gap="12px"
                            borderRadius="2px"
                            mb="8px"
                            py="6px"
                            px="8px"
                            _hover={{ bg: "#F4F6F8" }}
                            align="center"
                            fontWeight="500"
                            onClick={() => openOption(i, audit)}
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
            title="Delete Report"
            subTitle="Are you sure you want to delete this report?"
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
          <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Sales Report
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ManagerTable;
