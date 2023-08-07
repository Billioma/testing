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

const TableLayer = ({ data, isLoading, page, setPage, limit, handleEdit }) => {
  const headers = [
    "NAME",
    "DESCRIPTION",
    "SERVICE TYPE",
    "DATE CREATED",
    "ACTIONS",
  ];

  return (
    <Box>
      <TableFormat
        isLoading={isLoading}
        minH="25vh"
        header={headers}
        bg="#fff"
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
                Showing rows 1 to {limit > data?.total ? data?.total : limit} of{" "}
                {data?.total}
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
          data?.data?.map((service, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td flex={1}>{service?.name}</Td>
              <Td flex={2} maxWidth={"350px"} noOfLines={1}>
                {service?.description}
              </Td>
              <Td flex={0.5}>{service?.serviceType}</Td>
              <Td flex={0.5}>{formatDate(service?.createdAt)}</Td>
              <Td flex={1}>
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
                        onClick={() => handleEdit(service)}
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
              <NoData title="No Service" desc="You have not added a service" />
            </Td>
          </Tr>
        )}
      </TableFormat>
    </Box>
  );
};

export default TableLayer;
