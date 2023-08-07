import React from "react";
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
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NoData from "../../../common/NoData";
import { formatDate } from "../../../../utils/helpers";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  handleEdit,
  startRow,
  endRow,
}) => {
  const headers = [
    "NAME",
    "USER ID",
    "ACCOUNT TYPE",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];

  return (
    <Box>
      <TableFormat
        isLoading={isLoading}
        minH="25vh"
        header={headers}
        opt
        act
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
          data?.data?.map((attendant, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td>{attendant?.name}</Td>
              <Td>{attendant?.userId}</Td>
              <Td>{attendant?.accountType}</Td>
              <Td>
                <Flex
                  bg={attendant?.status ? "#E5FFE5" : "#FEF1F1"}
                  color={attendant?.status ? "#0B841D" : "#EE383A"}
                  justifyContent={"center"}
                  alignItems="center"
                  padding="7px 10px"
                  borderRadius="4px"
                >
                  {attendant?.status ? "Active" : "Inactive"}
                </Flex>
              </Td>
              <Td>{formatDate(attendant?.createdAt)}</Td>
              <Td>
                <Flex justifyContent="center" align="center">
                  <Menu>
                    <MenuButton as={Text} cursor="pointer">
                      <FiMoreVertical />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        onClick={() => handleEdit(attendant)}
                      >
                        <FiEdit />
                        Edit
                      </MenuItem>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        color="red"
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
                title="No Attendants"
                desc="You have not added an attendants"
              />
            </Td>
          </Tr>
        )}
      </TableFormat>
    </Box>
  );
};

export default TableLayer;
