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
  Button,
  Icon,
  Image,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteRate } from "../../../../services/admin/query/locations";
import { SecStatus, clientListOption } from "../../../common/constants";
import { Add } from "../../../common/images";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import TableLoader from "../../../loaders/TableLoader";

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
    "NAME",
    "TYPE",
    "START",
    "LIMIT",
    "AMOUNT",
    "ZONES",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeleteRate({
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

  const openOption = (i, rate) => {
    i === 0
      ? navigate(`/admin/locations/rates/details/${rate?.id}`)
      : i === 1
      ? (navigate(`/admin/locations/rates/details/${rate?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: rate?.id });
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
            {data?.data?.map((rate, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{rate?.name}</Td>
                <Td>{rate?.durationType}</Td>
                <Td textAlign={"center"}>{rate?.durationStart}</Td>
                <Td textAlign={"center"}>{rate?.durationLimit}</Td>
                <Td>₦{rate?.amount?.toLocaleString()}</Td>
                <Td textAlign={"center"} whiteSpace="pre-wrap">
                  {rate?.zones?.length
                    ? rate?.zones?.map((item, i) => (
                        <React.Fragment key={i}>
                          {item.name}
                          {i < rate?.zones?.length - 1 && ", "}
                          <br />
                        </React.Fragment>
                      ))
                    : "N/A"}
                </Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[rate?.status])[0]}
                      bg={Object?.values(SecStatus[rate?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(SecStatus[rate?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">{formatDateNewTime(rate?.createdAt)}</Td>
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
                            onClick={() => openOption(i, rate)}
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
            title="Delete Rate"
            subTitle="Are you sure you want to delete this rate?"
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
          <Image src="/assets/no-rate.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Rate Data
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_RATE)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="14px"
          >
            <Text>Add a Rate</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
