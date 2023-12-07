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
  Button,
  Image,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteMembershipPlan } from "../../../../services/admin/query/memberships";
import { formatDateTime } from "../../../../utils/helpers";
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
    "NAME",
    "AMOUNT",
    "INTERVAL",
    "CORPORATE",
    "UPGRADEABLE",
    "STATUS",
    "FEATURES",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();

  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeleteMembershipPlan({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setSelectedRow({ isOen: false, id: null });
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
  ].map((interval, index) => ({ label: interval, value: index }));

  const openOption = (i, plan) => {
    i === 0
      ? navigate(`/admin/memberships/plans/details/${plan?.id}`)
      : i === 1
      ? (navigate(`/admin/memberships/plans/details/${plan?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: plan.id });
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
            {data?.data?.map((plan, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td whiteSpace="pre-wrap">{plan?.name}</Td>
                <Td textAlign="center">₦ {plan?.amount?.toLocaleString()}</Td>
                <Td textAlign="center">
                  {
                    intervalOptions.find(
                      (interval, index) => index === plan?.interval
                    )?.label
                  }
                </Td>
                <Td textAlign="center">
                  {plan?.isCorporate ? "TRUE" : "FALSE"}
                </Td>
                <Td textAlign="center">
                  {plan?.isUpgradeable ? "TRUE" : "FALSE"}
                </Td>

                <Td textAlign="center">
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[plan?.isActive])[0]}
                      bg={Object?.values(SecStatus[plan?.isActive])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(SecStatus[plan?.isActive])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  {!plan?.features?.length
                    ? "N/A"
                    : plan?.features?.map((feature) => (
                        <React.Fragment key={i}>
                          {feature.name}{" "}
                          {i < plan?.features?.length - 1 && ", "}
                          <br />
                        </React.Fragment>
                      ))}
                </Td>

                <Td textAlign="center">{formatDateTime(plan?.createdAt)}</Td>
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
                            onClick={() => openOption(i, plan)}
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
            title="Delete Plan"
            subTitle="Are you sure you want to delete this plan?"
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
            No Membership Plan Data
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_MEMBERSHIP_PLAN)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="14px"
          >
            <Text>Add a Plan</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
