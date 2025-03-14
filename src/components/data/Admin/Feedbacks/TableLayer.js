import React, { useState } from "react";
import {
  Box,
  Flex,
  Td,
  Text,
  Tr,
  Image,
  MenuList,
  MenuButton,
  Menu,
  MenuItem,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import TableLoader from "../../../loaders/TableLoader";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../../../utils/notifications";
import { useMarkAsRead } from "../../../../services/admin/query/feedback";
import { BsChevronDown } from "react-icons/bs";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";

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
    "CUSTOMER EMAIL",
    "TYPE",
    "STATUS",
    "DATE CREATED",
    "ACTIONS",
  ];

  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isMark } = useMarkAsRead({
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

  const openOption = (i, item) => {
    i === 0
      ? navigate(`/admin/support/feedback/${item?.id}`)
      : setSelectedRow({ isOpen: true, id: item.id });
  };

  return (
    <Box>
      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Mark As Read"
        subTitle="Are you sure you want to mark this feedback as read?"
        handleSubmit={handleSubmit}
        isLoading={isMark}
      />
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={headers}
            opt
            alignIndices={[0, 1]}
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
                <Td>{item?.senderName}</Td>
                <Td>{item?.senderEmail}</Td>

                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Flex
                      justifyContent="center"
                      align="center"
                      py="6px"
                      px="15px"
                      w="fit-content"
                      bg={
                        item?.type === "FEEDBACK"
                          ? "#E5FFE5"
                          : item?.type === "COMPLAINT"
                          ? "#FEF1F1"
                          : "#FDF6E7"
                      }
                      color={
                        item?.type === "FEEDBACK"
                          ? "#0B841D"
                          : item?.type === "COMPLAINT"
                          ? "#EE383A"
                          : "#F79E1B"
                      }
                      borderRadius="6px"
                      textTransform="capitalize"
                    >
                      {item?.type.toLowerCase()}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Flex
                      justifyContent="center"
                      align="center"
                      py="6px"
                      px="15px"
                      w="fit-content"
                      borderRadius="6px"
                      bg={item?.isReplied ? "#E5FFE5" : "#FEF1F1"}
                      color={item?.isReplied ? "#0B841D" : "#EE383A"}
                      textTransform="capitalize"
                    >
                      {item?.isReplied ? "Replied" : "Unreplied"}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
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
                        {(item?.isReplied
                          ? ["View"]
                          : ["View", "Mark As Replied"]
                        ).map((dat, i) => (
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
                            onClick={() => openOption(i, item)}
                          >
                            {dat}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </TableFormat>
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-feedback.svg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Feedback Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
