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
  Icon,
  Image,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import {
  useDeleteServicedVehicle,
  useRetrieveTickets,
} from "../../../../services/admin/query/logs";
import TableLoader from "../../../loaders/TableLoader";
import { LogStatus, viewClaimOption } from "../../../common/constants";
import AdminRetrieveTicketModal from "../../../modals/AdminRetrieveTicketModal";

const TableLayer = ({
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
    "TICKET NUMBER",
    "LICENSE",
    "CUSTOMER",
    "AMOUNT",
    "LOCATION",
    "ZONE",
    "ATTENDANT",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const [selectedClaim, setSelectedClaim] = useState({
    isOpen: false,
    id: null,
  });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteServicedVehicle({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setSelectedRow({ isOpen: false, id: null });
      setSelectedClaim({ isOpen: false, id: null });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate: retrieveMutate, isLoading: isRetrieve } = useRetrieveTickets({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setSelectedClaim({ isOpen: false, id: null });
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

  const handleClaim = (e) => {
    e.preventDefault();
    retrieveMutate(selectedClaim.id);
  };

  const openOption = (i, item) => {
    i === 0
      ? navigate(`/admin/logs/serviced-vehicles/details/${item?.id}`)
      : i === 1
      ? setSelectedRow({ isOpen: true, id: item.id })
      : i === 2 && setSelectedClaim({ isOpen: true, id: item.id });
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
            alignFirstHeader
            alignSecondHeader
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
                fontSize="12px"
                lineHeight="100%"
              >
                <Td>{item?.ticketNumber}</Td>
                <Td>{item?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">
                  {item?.customer ? item?.customer?.name : "Guest"}
                </Td>
                <Td textAlign="center">₦ {item?.amount?.toLocaleString()}</Td>
                <Td textAlign="center">{item?.location?.name}</Td>
                <Td textAlign="center">{item?.zone?.name}</Td>
                <Td textAlign="center">{item?.attendant?.name}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(LogStatus[item?.status])[0]}
                      bg={Object?.values(LogStatus[item?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(LogStatus[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">{formatDate(item?.createdAt)}</Td>
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
                        {(item?.status
                          ? viewClaimOption?.slice(0, 2)
                          : viewClaimOption
                        ).map((dat, i) => (
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
          </TableFormat>
          <AdminDeleteModal
            isOpen={selectedRow.isOpen}
            onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
            title="Delete log"
            subTitle="Are you sure you want to delete this log?"
            handleSubmit={handleSubmit}
            isLoading={isDeleting}
          />{" "}
          <AdminRetrieveTicketModal
            isOpen={selectedClaim.isOpen}
            onClose={() =>
              setSelectedClaim({ ...selectedClaim, isOpen: false })
            }
            title="Claim ticket"
            subTitle="Are you sure you want to claim this ticket?"
            handleSubmit={handleClaim}
            isLoading={isRetrieve}
          />{" "}
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-sub.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Serviced Vehicle Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
