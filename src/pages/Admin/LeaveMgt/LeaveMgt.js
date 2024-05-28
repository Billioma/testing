import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import TableLayer from "../../../components/data/Admin/LeaveMgt/TableLayer";
import { useGetLeaveRequest } from "../../../services/admin/query/staff";
import { leaveOptions } from "../../../components/common/constants";
import { formatFilterDate } from "../../../utils/helpers";
import Filter from "../../../components/common/Filter";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const LeaveMgt = () => {
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [filtArray, setFiltArray] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||$gte||"${formatFilterDate(
          filterObj?.gte,
        )}T00:00:00"`
      : filterObj?.lte
        ? `filter=${filterObj?.title}||$lte||"${formatFilterDate(
            filterObj?.lte,
          )}T23:59:59"`
        : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
            filterObj?.filter
          }"`;
  });

  const query =
    filtArray?.length === 0
      ? `filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length > 0 &&
          filtArray?.filter((item) => item?.lte)?.length === 0
        ? `${convertedFilters?.join(
            "&",
          )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
        : filtArray?.filter((item) => item?.gte)?.length === 0 &&
            filtArray?.filter((item) => item?.lte)?.length === 0
          ? `${convertedFilters?.join(
              "&",
            )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
          : filtArray?.filter((item) => item?.gte)?.length === 0 &&
              filtArray?.filter((item) => item?.lte)?.length > 0
            ? `${convertedFilters?.join("&")}`
            : filtArray?.filter((item) => item?.gte)?.length &&
                filtArray?.filter((item) => item?.lte)?.length
              ? `${convertedFilters?.join("&")}`
              : convertedFilters?.join("&");

  const [isRefetch, setIsRefetch] = useState(false);

  const { data, isLoading, refetch } = useGetLeaveRequest(
    {
      refetchOnWindowFocus: true,
      onSuccess: () => {
        setIsRefetch(false);
      },
      onError: () => {
        setIsRefetch(false);
      },
      onSettled: () => {
        setIsRefetch(false);
      },
    },
    type,
    page,
    limit,
    query,
  );

  useEffect(() => {
    refetch();
  }, []);

  const handleRefreshClick = async () => {
    setIsRefetch(true);
    await refetch();
  };

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

  const typeToMap = [
    { name: "All", value: "" },
    { name: "Pending", value: "PENDING" },
    { name: "Approved", value: "APPROVED" },
    { name: "Declined", value: "REJECTED" },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <Flex w="100%" mb="24px" bg="#F4F6F8" gap="24px" align="flex-end">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          w={{ base: "100%", md: "70%" }}
          align={{ base: "flex-start", md: "center" }}
        >
          {typeToMap.map((item, i) => (
            <Flex
              py="11px"
              px={{ base: "20px", md: "unset" }}
              fontSize="13px"
              fontWeight={500}
              w={{ base: "fit-content", md: "15%" }}
              cursor="pointer"
              _hover={{ color: "#000" }}
              transition=".3s ease-in-out"
              justifyContent={{ base: "flex-start", md: "center" }}
              color={type === item?.value ? "#444648" : "#949698"}
              align="center"
              key={i}
              borderBottom={type === item?.value ? "2px solid #000" : "none"}
              onClick={() => {
                setType(item?.value);
                setPage(1);
                setLimit(25);
              }}
            >
              {item?.name}
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={leaveOptions}
          gap
          title={
            <Text fontWeight={500} lineHeight="100%" color="#242628">
              All Leave Request
            </Text>
          }
          main={
            <>
              <Button
                display="flex"
                bg="#000"
                gap="8px"
                onClick={() => navigate("/admin/leave-mgt/create")}
              >
                <Text fontSize="14px">Add Absence</Text>
                <MdAdd size="20px" />
              </Button>
              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={handleRefreshClick}
                borderRadius="8px"
                border="1px solid #848688"
                p="10px"
              >
                <Image
                  src="/assets/refresh.svg"
                  className={isRefetch && "mirrored-icon"}
                  w="20px"
                  h="20px"
                />
              </Flex>
            </>
          }
        />

        <TableLayer
          type={type}
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          startRow={startRow}
          endRow={endRow}
          refetch={refetch}
          setLimit={setLimit}
        />
      </Box>
    </div>
  );
};

export default LeaveMgt;
