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
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { HiOutlineInformationCircle } from "react-icons/hi";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteMembershipPlan } from "../../../../services/admin/query/memberships";
import NoData from "../../../common/NoData";

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

  return (
    <Box>
      <TableFormat
        isLoading={isLoading}
        minH="25vh"
        maxH="65vh"
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
        {data?.data?.length ? (
          data?.data?.map((plan, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td>{plan?.name}</Td>
              <Td>₦{plan?.amount?.toLocaleString()}</Td>
              <Td textAlign="center">
                {
                  intervalOptions.find(
                    (interval, index) => index === plan?.interval
                  )?.label
                }
              </Td>
              <Td textAlign="center">{plan?.isCorporate ? "TRUE" : "FALSE"}</Td>
              <Td textAlign="center">
                {plan?.isUpgradeable ? "TRUE" : "FALSE"}
              </Td>

              <Td textAlign="center">
                <Flex
                  bg={plan?.status ? "#E5FFE5" : "#FEF1F1"}
                  color={plan?.status ? "#0B841D" : "#EE383A"}
                  justifyContent={"center"}
                  alignItems="center"
                  padding="7px 10px"
                  borderRadius="4px"
                >
                  {plan?.status ? "Active" : "Inactive"}
                </Flex>
              </Td>
              <Td textAlign="center">
                <Flex
                  gap={2.5}
                  flexDir="column"
                  width="100px"
                  overflow="hidden"
                >
                  {!plan?.features?.length
                    ? "N/A"
                    : plan?.features?.map((feature) => (
                        <Box
                          key={feature.id}
                          style={{ textWrap: "wrap" }}
                          bg="#F4F6F8"
                          borderRadius={"4px"}
                          p={1}
                        >
                          {feature.name}
                        </Box>
                      ))}
                </Flex>
              </Td>

              <Td textAlign="center">{formatDate(plan?.createdAt)}</Td>
              <Td textAlign="center">
                <Flex justifyContent="center" align="center">
                  <Menu>
                    <MenuButton as={Text} cursor="pointer">
                      <BsChevronDown />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        onClick={() =>
                          navigate(
                            `${PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS}/details/${plan.id}`,
                            { state: { ...plan, isEdit: false } }
                          )
                        }
                      >
                        <HiOutlineInformationCircle size={14} />
                        View
                      </MenuItem>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        onClick={() =>
                          navigate(
                            `${PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS}/details/${plan.id}`,
                            { state: { ...plan, isEdit: true } }
                          )
                        }
                      >
                        <FiEdit />
                        Edit
                      </MenuItem>
                      <MenuItem
                        gap="12px"
                        alignItems="center"
                        fontWeight="500"
                        color="red"
                        onClick={() =>
                          setSelectedRow({ isOpen: true, id: plan.id })
                        }
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
                title="No Membership Plan"
                desc="You have not added an membership plan"
              />
            </Td>
          </Tr>
        )}
      </TableFormat>

      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Plan"
        subTitle="Are you sure you want to delete this plan?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default TableLayer;
