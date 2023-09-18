import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Image,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableLoader from "../../../../loaders/TableLoader";
import { operatorLocationsHeader } from "../../../../common/constants";
import { formatDateTimes } from "../../../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ConfirmDeleteModal from "../../../../modals/ConfirmDeleteModal";
import useCustomToast from "../../../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDeleteLocation } from "../../../../../services/operator/query/locations";
import { Add } from "../../../../common/images";

const TableLayer = ({
  isLoading,
  limit,
  data,
  setPage,
  page,
  locationMutate,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const open = (item) => {
    setShowDelete(true);
    setCurrentLocation(item);
  };

  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();

  const { mutate: deleteMutate, isLoading: isDeleting } = useDeleteLocation({
    onSuccess: (res) => {
      locationMutate({ limit: 10, page: 1 });
      successToast(res?.message);
      navigate("/operator/locations/all");
      setShowDelete(false);
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleDelete = () => {
    deleteMutate(currentLocation?.id);
  };

  return (
    <Box mt="16px">
      {data?.data?.length ? (
        <>
          <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
            {isLoading ? (
              <TableLoader />
            ) : (
              <Table>
                <Thead bg="#F4F6F8">
                  <Tr>
                    {operatorLocationsHeader?.map((data, i) => (
                      <Th
                        textAlign={i !== 4 ? "start" : "center"}
                        key={i}
                        pos="sticky"
                        top="0"
                        bg="#F4F6F8"
                        fontFamily="Sailec"
                        zIndex="2"
                        color="#949698"
                        lineHeight="100%"
                        fontWeight={500}
                      >
                        {data}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((item, i) => (
                    <Tr
                      fontSize="12px"
                      fontWeight={500}
                      color="#646668"
                      key={i}
                    >
                      <Td>{item?.name}</Td>
                      <Td>{item?.operator?.name}</Td>
                      <Td>{item?.state}</Td>
                      <Td>{formatDateTimes(item?.createdAt)}</Td>

                      <Td>
                        <Flex gap="20px" align="center" justifyContent="center">
                          <Text
                            textDecor="underline"
                            color="#646668"
                            fontWeight={500}
                            lineHeight="100%"
                            fontSize="12px"
                            onClick={() =>
                              navigate(`/operator/locations/all/${item?.id}`)
                            }
                            cursor="pointer"
                          >
                            View
                          </Text>
                          <Button
                            bg="transparent"
                            border="1px solid #848688"
                            color="#848688"
                            fontWeight={500}
                            lineHeight="100%"
                            fontSize="12px"
                            _hover={{ bg: "transparent" }}
                            _active={{ bg: "transparent" }}
                            _focus={{ bg: "transparent" }}
                            display="flex"
                            onClick={() => (
                              navigate(`/operator/locations/all/${item?.id}`),
                              sessionStorage.setItem("edit", "edit")
                            )}
                            px="16px"
                            py="8px"
                            align="center"
                            gap="8px"
                          >
                            <AiOutlineEdit size="16px" color="#848688" />
                            Edit
                          </Button>
                          <Button
                            bg="#A11212"
                            _hover={{ bg: "#A11212" }}
                            _active={{ bg: "#A11212" }}
                            _focus={{ bg: "#A11212" }}
                            color="#fff"
                            fontWeight={500}
                            onClick={() => open(item)}
                            lineHeight="100%"
                            px="16px"
                            py="8px"
                            fontSize="12px"
                            display="flex"
                            align="center"
                            gap="8px"
                          >
                            <BsTrash size="16px" color="#fff" />
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TableContainer>

          <Flex
            mt="20px"
            justifyContent="center"
            align="center"
            flexDir="column"
            w="full"
          >
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="center"
              gap={{ base: "10px", md: "32px" }}
              align="center"
            >
              <Text fontSize="12px" color="#242628" lineHeight="100%">
                Showing rows 1 to {limit} of {data?.total}
              </Text>

              <Flex gap="16px" align="center">
                <Flex
                  opacity={data?.page === 1 ? 0.5 : 1}
                  onClick={() => (data?.page === 1 ? "" : setPage(page - 1))}
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
                    data?.page === data?.pageCount ? "" : setPage(page + 1)
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
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Location Data
          </Text>

          <Button
            onClick={() => navigate("/operator/locations/all/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Location</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
      <ConfirmDeleteModal
        title="Location"
        action={handleDelete}
        isLoading={isDeleting}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default TableLayer;
