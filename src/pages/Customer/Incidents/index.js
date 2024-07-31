import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import TableFormat from "../../../components/common/TableFormat";
import { IncidentStatus, Status } from "../../../components/common/constants";
import { IoWarningOutline } from "react-icons/io5";
import ClaimDocs from "../../../components/modals/ClaimDocs";
import { useGetIncidents } from "../../../services/customer/query/user";
import { formatDat } from "../../../utils/helpers";
import TableLoader from "../../../components/loaders/TableLoader";

const index = () => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);

  const { isLoading, data, refetch } = useGetIncidents(
    {
      refetchOnWindowFocus: true,
    },
    limit,
    page
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit]);

  const [currentItem, setCurrentItem] = useState("");

  return (
    <Box>
      <ClaimDocs
        data={currentItem}
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
      />
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <TableFormat
          header={[
            "INCIDENT ID",
            "SERVICE TYPE",
            "STATUS",
            "LAST UPDATED",
            "DATE SUBMITTED",
            "ACTIONS",
          ]}
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
              fontSize="14px"
              lineHeight="100%"
            >
              <Td textAlign="center">{item?.id}</Td>
              <Td textAlign="center">{item?.serviceLog?.service?.name}</Td>
              <Td>
                <Flex justifyContent="center" align="center" w="full">
                  <Flex
                    color={
                      IncidentStatus?.find(
                        (dat) =>
                          dat.name?.toLowerCase() ===
                          item?.status?.toLowerCase()
                      )?.color || ""
                    }
                    bg={
                      IncidentStatus?.find(
                        (dat) =>
                          dat.name?.toLowerCase() ===
                          item?.status?.toLowerCase()
                      )?.bg || ""
                    }
                    border={`1px solid ${
                      IncidentStatus?.find(
                        (dat) =>
                          dat.name?.toLowerCase() ===
                          item?.status?.toLowerCase()
                      )?.border
                    }`}
                    py="5px"
                    px="16px"
                    w="fit-content"
                    justifyContent="center"
                    borderRadius="4px"
                    textTransform="capitalize"
                  >
                    {item?.status?.replace("_", " ").toLowerCase()}
                  </Flex>
                </Flex>
              </Td>
              <Td textAlign="center">{formatDat(item?.updatedAt)}</Td>
              <Td textAlign="center">{formatDat(item?.dateOfReport)}</Td>
              <Td>
                <Flex justifyContent="center" align="center">
                  {!item?.documents?.length ||
                  item?.documents?.find((item) => item?.url === null) ? (
                    <IoWarningOutline
                      cursor="pointer"
                      color="red"
                      onClick={() => {
                        onOpen();
                        setCurrentItem(item);
                      }}
                    />
                  ) : (
                    <Menu>
                      <MenuButton cursor="pointer">
                        <FiMoreVertical />
                      </MenuButton>
                      <MenuList
                        borderRadius="4px"
                        p="10px"
                        border="1px solid #F4F6F8"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        <MenuItem
                          gap="12px"
                          borderRadius="2px"
                          mb="8px"
                          py="6px"
                          px="8px"
                          _hover={{ bg: "#F4F6F8" }}
                          align="center"
                          fontWeight="500"
                          onClick={() =>
                            navigate(`/customer/claims/${item?.id}`)
                          }
                        >
                          <TbListDetails />
                          View Details
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </Td>
            </Tr>
          ))}
        </TableFormat>
      ) : (
        ""
      )}
    </Box>
  );
};

export default index;
