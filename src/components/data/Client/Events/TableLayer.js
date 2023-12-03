import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
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
  eventOption,
} from "../../../common/constants";
import { formatDate, formatDateTimes, trim } from "../../../../utils/helpers";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { useDelEvent } from "../../../../services/client/query/events";
import { Add } from "../../../common/images";

const TableLayer = ({ isLoading, limit, data, setPage, page, refetch }) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");

  const open = (item) => {
    setShow(true);
    setCurrentEvent(item);
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
      ? navigate(`/client/events/${currentEvent?.id}`)
      : i === 1
      ? setShowDelete(true)
      : "";
  };

  const { mutate: deleteMutate, isLoading: isDelete } = useDelEvent({
    onSuccess: () => {
      successToast("Event has been removed");
      refetch();
      setShowDelete(false);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleDelete = () => {
    deleteMutate(currentEvent?.id);
  };

  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
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
                {data?.data?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td textAlign="center">{item?.name}</Td>

                    <Td textAlign="center">
                      <a href={item?.website} target="_blank" rel="noreferrer">
                        {trim(item?.website) || "N/A"}
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
                            top={i === data?.data?.length - 1 ? "" : "20px"}
                            bottom={i === data?.data?.length - 1 ? "0" : ""}
                            right="0"
                            zIndex={5555555}
                            boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                          >
                            {eventOption.map((item, i) => (
                              <Flex
                                key={i}
                                mb="8px"
                                py="6px"
                                px="8px"
                                w="full"
                                borderRadius="2px"
                                align="center"
                                onClick={() => openOption(i)}
                                _hover={{ bg: "#F4F6F8" }}
                                cursor="pointer"
                                fontSize="10px"
                                color={i !== 2 ? "#646668" : "#A11212"}
                                lineHeight="100%"
                                gap="12px"
                                fontWeight={500}
                              >
                                <Icon as={item.icon} w="16px" h="16px" />
                                {item?.name}
                              </Flex>
                            ))}
                          </Box>
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
                Showing rows {page === 1 ? 1 : (page - 1) * limit + 1} to{" "}
                {data?.pageCount === page
                  ? page * limit > data?.total
                    ? data?.total
                    : page * limit
                  : page * limit}{" "}
                of {data?.total}
              </Text>

              <Flex gap="16px" align="center" fontSize="12px">
                <Flex
                  opacity={data?.page === 1 ? 0.5 : 1}
                  onClick={() => (data?.page === 1 ? "" : setPage(page - 1))}
                  cursor={data?.page === 1 ? "" : "pointer"}
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
                >
                  <IoIosArrowBack />
                  <Text lineHeight="100%">Previous</Text>
                </Flex>

                <Flex color="#242628" lineHeight="100%">
                  <Text>{data?.page}</Text>
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
          <Image src="/assets/no-event.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Event Data
          </Text>

          <Button
            onClick={() => navigate("/client/events/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add an Event</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
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
