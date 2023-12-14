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
  Button,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteCorporateSubscription } from "../../../../services/admin/query/memberships";
import { SecStatus, clientListOption } from "../../../common/constants";
import { Add } from "../../../common/images";
import TableLoader from "../../../loaders/TableLoader";

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
    "CLIENT",
    "PLAN",
    "AMOUNT",
    "DURATION",
    "START DATE",
    "NEXT PAYMENT",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeleteCorporateSubscription({
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

  const intervalOptions = [
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Biannually",
    "Annually",
  ];

  const openOption = (i, subscription) => {
    i === 0
      ? navigate(
          `/admin/memberships/corporate-subscriptions/details/${subscription?.id}`
        )
      : i === 1
      ? (navigate(
          `/admin/memberships/corporate-subscriptions/details/${subscription?.id}`
        ),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: subscription.id });
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
            {data?.data?.map((subscription, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{subscription?.client?.name} </Td>
                <Td>{subscription?.membershipPlan?.name}</Td>
                <Td textAlign="center">
                  ₦ {subscription?.membershipPlan?.amount?.toLocaleString()}
                </Td>
                <Td textAlign="center">
                  {intervalOptions[subscription?.membershipPlan?.interval]}
                </Td>
                <Td textAlign="center">
                  {formatDateNewTime(subscription?.startDate)}
                </Td>
                <Td textAlign="center">
                  {formatDateNewTime(subscription?.nextPaymentDate)}
                </Td>

                <Td textAlign="center">
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={
                        subscription?.cancelled === 1
                          ? "#E81313"
                          : Object?.values(SecStatus[subscription?.status])[0]
                      }
                      bg={
                        subscription?.cancelled === 1
                          ? "#F9D0CD"
                          : Object?.values(SecStatus[subscription?.status])[2]
                      }
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {subscription?.cancelled === 1
                        ? "Cancelled"
                        : Object?.values(SecStatus[subscription?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">
                  {formatDateNewTime(subscription?.createdAt)}
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
                            onClick={() => openOption(i, subscription)}
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
            title="Delete Subscription"
            subTitle="Are you sure you want to delete this subscription?"
            handleSubmit={handleSubmit}
            isLoading={isDeleting}
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
          <Image src="/assets/no-log-rep.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Corporate Subscription
          </Text>

          <Button
            onClick={() =>
              navigate(PRIVATE_PATHS.ADMIN_ADD_CORPORATE_SUBSCRIPTION)
            }
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="14px"
          >
            <Text>Add a Subscription</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
