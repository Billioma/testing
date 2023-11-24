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
  Image,
  Button,
  Icon,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../../routes/constants";
import { BsChevronDown } from "react-icons/bs";
import { useDeleteVehicle } from "../../../../services/admin/query/vehicles";
import { clientListOption, colorTypes } from "../../../common/constants";
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
    "CUSTOMER NAME",
    "LICENSE PLATE",
    "COLOR",
    "MAKE",
    "MODEL",
    "CREATED BY",
    "DATE",
    "ACTIONS",
  ];
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { mutate, isLoading: isDeleting } = useDeleteVehicle({
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

  const openOption = (i, vehicle) => {
    i === 0
      ? navigate(`/admin/vehicles/details/${vehicle?.id}`)
      : i === 1
      ? (navigate(`/admin/vehicles/details/${vehicle?.id}`),
        sessionStorage.setItem("edit", "edit"))
      : i === 2 && setSelectedRow({ isOpen: true, id: vehicle.id });
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
            {data?.data?.map((vehicle, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td>
                  {vehicle?.customer === null
                    ? vehicle?.customerName
                    : `${vehicle?.customer?.profile?.firstName} ${vehicle?.customer?.profile?.lastName}`}
                </Td>
                <Td>{vehicle?.licensePlate}</Td>
                <Td textAlign="center">
                  {vehicle?.color?.includes("#")
                    ? colorTypes.find(
                        (item) =>
                          item?.color?.toLocaleLowerCase() === vehicle?.color
                      )?.label
                    : vehicle?.color}
                </Td>
                <Td textAlign="center">{vehicle?.make?.name}</Td>
                <Td textAlign="center">{vehicle?.model?.name}</Td>
                <Td textAlign="center">{vehicle?.createdBy}</Td>
                <Td textAlign="center">{formatDate(vehicle?.createdAt)}</Td>
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
                            onClick={() => openOption(i, vehicle)}
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
            title="Delete Vehicle"
            subTitle="Are you sure you want to delete this vehicle?"
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
          <Image src="/assets/no-sub.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Vehicle Data
          </Text>

          <Button
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_VEHICLE)}
            display="flex"
            bg="#000"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Vehicle</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
