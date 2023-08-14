import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import {
  SecStatus,
  clientEventHeader,
  eventOptions,
} from "../../../common/constants";
import NoData from "../../../common/NoData";
import { formatDate, formatDateTimes, trim } from "../../../../utils/helpers";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { useDelEvent } from "../../../../services/client/query/events";

const TableLayer = ({ isLoading, data, eventMutate }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");

  const open = (item) => {
    setShow(true);
    setCurrentEvent(item);
  };

  const endIndex = startIndex + itemsPerPage;
  const totalItems = data?.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = data?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showDelete) {
      setShow(false);
    }
  }, [showDelete]);

  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();

  const openOption = (i) => {
    i === 0
      ? navigate(`/client/edit-event/${currentEvent?.id}`)
      : i === 1
      ? setShowDelete(true)
      : "";
  };

  const { mutate: deleteMutate, isLoading: isDelete } = useDelEvent({
    onSuccess: () => {
      successToast("Event has been removed");
      eventMutate();
      setShowDelete(false);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleDelete = () => {
    deleteMutate(currentEvent?.id);
  };

  return (
    <Box mt="16px">
      <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
        {isLoading ? (
          <TableLoader />
        ) : (
          <Table>
            <Thead bg="#F4F6F8">
              <Tr>
                {clientEventHeader?.map((data, i) => (
                  <Th
                    textAlign="center"
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
              {data?.length ? (
                paginatedData?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td textAlign="center">{item?.name}</Td>

                    <Td textAlign="center">
                      <a href={item?.website} target="_blank" rel="noreferrer">
                        {trim(item?.website)}
                      </a>
                    </Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.eventStartDateTime)}
                    </Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.eventEndDateTime)}
                    </Td>
                    <Td>
                      <Flex
                        color={Object.values(SecStatus[item?.status])[0]}
                        bg={Object.values(SecStatus[item?.status])[2]}
                        py="5px"
                        px="16px"
                        justifyContent="center"
                        borderRadius="4px"
                        align="center"
                      >
                        {Object.values(SecStatus[item?.status])[1]}
                      </Flex>
                    </Td>
                    <Td textAlign="center">{formatDate(item?.createdAt)}</Td>
                    <Td>
                      <Flex
                        onClick={() => open(item)}
                        justifyContent="center"
                        pos="relative"
                        cursor="pointer"
                        className="box"
                        align="center"
                      >
                        <FiMoreVertical />
                        {show && currentEvent === item && (
                          <Box
                            border="1px solid #F4F6F8"
                            px="4px"
                            py="8px"
                            bg="#fff"
                            borderRadius="4px"
                            pos="absolute"
                            top={i < 3 ? "20px" : "unset"}
                            bottom={i > 3 ? "0" : "unset"}
                            right="0"
                            zIndex={5555555}
                            boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                          >
                            {eventOptions.map((item, i) => (
                              <Flex
                                key={i}
                                mb="8px"
                                py="6px"
                                px="8px"
                                borderRadius="2px"
                                justifyContent="center"
                                align="center"
                                onClick={() => openOption(i)}
                                _hover={{ bg: "#F4F6F8" }}
                                cursor="pointer"
                                fontSize="10px"
                                color={i !== 2 ? "#646668" : "#A11212"}
                                lineHeight="100%"
                                fontWeight={500}
                              >
                                {item}
                              </Flex>
                            ))}
                          </Box>
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} rowSpan={2}>
                    <NoData
                      title="No Event"
                      desc="No event has been added to your account"
                    />
                  </Td>
                </Tr>
              )}
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
            Showing rows 1 to {itemsPerPage} of {data?.length}
          </Text>

          <Flex gap="16px" align="center">
            <Flex
              opacity={currentPage === 1 ? 0.5 : 1}
              onClick={() =>
                currentPage === 1 ? "" : handlePageChange(currentPage - 1)
              }
              cursor={currentPage === 1 ? "" : "pointer"}
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
                <Text>{currentPage}</Text>
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
                <Text>{totalPages}</Text>
              </Flex>
            </Flex>

            <Flex
              opacity={endIndex >= data?.length ? 0.5 : 1}
              onClick={() =>
                endIndex >= data?.length
                  ? ""
                  : handlePageChange(currentPage + 1)
              }
              cursor={endIndex >= data?.length ? "" : "pointer"}
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

      <ConfirmDeleteModal
        title="Event"
        action={handleDelete}
        isLoading={isDelete}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default TableLayer;
