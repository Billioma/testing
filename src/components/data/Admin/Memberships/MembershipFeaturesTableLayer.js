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
  Image,
  Icon,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteMembershipFeature } from "../../../../services/admin/query/memberships";
import TableLoader from "../../../loaders/TableLoader";
import { clientListOption } from "../../../common/constants";
import { Add } from "../../../common/images";

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
  const headers = ["NAME", "PLAN", "FEATURE TYPE", "DATE", "ACTIONS"];
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeleteMembershipFeature({
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

  const featureTypes = [
    "Vehicle Limit",
    "Parking Limit",
    "Valet Limit",
    "Location Limit",
    "Car Service Limit",
    "Applicable Locations",
    "User Limit",
  ].map((feature, index) => ({ label: feature, value: index }));

  const openOption = (i, feature) => {
    i === 0
      ? navigate(`/admin/memberships/features/details/${feature?.id}`)
      : i === 1
      ? (navigate(`/admin/memberships/features/details/${feature?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: feature.id });
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
            {data?.data?.map((plan, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{plan?.name}</Td>
                <Td>{plan?.membershipPlan?.name || "N/A"}</Td>

                <Td textAlign={"center"}>
                  {plan?.featureType === null ? (
                    <Box p={3} w="200px">
                      N/A
                    </Box>
                  ) : (
                    <Flex align="center" w="full" justifyContent="center">
                      <Flex
                        bg="#F4F6F8"
                        justifyContent="center"
                        align="center"
                        py="5px"
                        px="16px"
                        borderRadius="4px"
                      >
                        {
                          featureTypes?.find(
                            (feature) => feature?.value == plan?.featureType
                          )?.label
                        }
                      </Flex>
                    </Flex>
                  )}
                </Td>

                <Td textAlign="center">{formatDateNewTime(plan?.createdAt)}</Td>
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
            title="Delete Feature"
            subTitle="Are you sure you want to delete this feature?"
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
            No Membership Feature
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_MEMBERSHIP_FEATURE)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="14px"
          >
            <Text>Add a Feature</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
