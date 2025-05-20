import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSalesReport,
  useGetSalesReportsLocationTrans,
} from "../../../../services/admin/query/audit";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import GoBackTab from "../../../../components/data/Admin/GoBackTab";
import Table from "../../../../components/data/Admin/Audit/Locations/Table";
import { AuditStatus } from "../../../../components/common/constants";
import { formatFilterDate } from "../../../../utils/helpers";
import { PiGridNine, PiPencilSimpleLine, PiTableLight } from "react-icons/pi";
import ManagerReport from "../../../../components/data/Admin/Audit/Locations/ManagerReport";
import EditSales from "../../../../components/modals/EditSales";

const ViewLocation = () => {
  const [page, setPage] = useState(1);
  const edit = useDisclosure();
  const [tab, setTab] = useState("Manager Report");
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const { id, locationId, managerId } = useParams();

  const start = sessionStorage.getItem("loc_start");
  const end = `${formatFilterDate(start)}T23:59:59`;

  const { data: trans, isLoading: isTrans } = useGetSalesReportsLocationTrans(
    locationId,
    {
      refetchOnWindowFocus: true,
    },
    managerId,
    page,
    limit,
    start,
    end
  );

  const {
    data: sales,
    isLoading: isSales,
    refetch,
  } = useGetSalesReport(
    {
      refetchOnWindowFocus: true,
    },
    id
  );

  useEffect(() => {
    if (!trans?.data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = trans?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [page, limit, trans]);

  const audit_status = sessionStorage.getItem("audit_status");

  return (
    <Box>
      <Box w="fit-content">
        <GoBackTab />
      </Box>

      <Flex align="flex-end" gap="24px">
        <Box>
          <Text color="#3D3D3D" fontSize="20px" fontWeight={700}>
            {trans?.metrics?.location?.name}
          </Text>
          <Flex align="center" gap="16px">
            <Box
              bg="#F4F6F8"
              mt="8px"
              borderRadius="4px"
              color="#949698"
              p="6px"
              textAlign="center"
              w="fit-content"
              fontWeight={500}
              fontSize="12px"
            >
              Manager:{" "}
              <span style={{ color: "#3D3D3D" }}>
                {trans?.metrics?.manager?.firstName}{" "}
                {trans?.metrics?.manager?.lastName}
              </span>
            </Box>

            <Box
              bg="#F4F6F8"
              mt="8px"
              borderRadius="4px"
              color="#949698"
              p="6px"
              textAlign="center"
              w="fit-content"
              fontWeight={500}
              fontSize="12px"
            >
              Zone:{" "}
              <span style={{ color: "#3D3D3D" }}>{sales?.zone?.name}</span>
            </Box>
          </Flex>
        </Box>

        <Flex
          fontSize="14px"
          color={
            AuditStatus.find(
              (dat) => dat.name?.toLowerCase() === audit_status?.toLowerCase()
            )?.color || ""
          }
          bg={
            AuditStatus.find(
              (dat) => dat.name?.toLowerCase() === audit_status?.toLowerCase()
            )?.bg || ""
          }
          justifyContent="center"
          align="center"
          fontWeight={500}
          py="5px"
          textTransform="capitalize"
          px="16px"
          borderRadius="4px"
        >
          {audit_status?.toLowerCase()}
        </Flex>
      </Flex>

      <Box mt="24px">
        <Grid
          mb="24px"
          gap="24px"
          templateColumns={[
            "repeat(1,1fr)",
            "repeat(1,1fr)",
            "repeat(2,1fr)",
            "repeat(4,1fr)",
          ]}
        >
          {[
            "Revenue (Manager)",
            "Revenue (System)",
            "Transactions (Manager)",
            "Transactions (System)",
          ]?.map((dat, i) => (
            <GridItem key={i}>
              <Skeleton borderRadius="8px" isLoaded={!isTrans} minH="10rem">
                <Box
                  borderRadius="8px"
                  bg="#F4F6F8"
                  pt="5px"
                  px="5px"
                  border="1px solid #E4E6E8"
                >
                  <Box h="6px" w="full" bg="#000" borderRadius="full"></Box>
                  <Box px="15px" pt="0px" pb="20px">
                    <Text
                      mt="24px"
                      lineHeight="100%"
                      fontWeight={700}
                      color="#242628"
                    >
                      {dat}
                    </Text>

                    <Box mt="24px" w="full">
                      <Box w="full">
                        <Text
                          mt="24px"
                          fontSize="28px"
                          lineHeight="100%"
                          color="#646668"
                          fontWeight={500}
                        >
                          {i < 2 && "₦"}{" "}
                          {i === 0
                            ? Number(
                                trans?.metrics?.totalRevenueReported
                              )?.toLocaleString()
                            : i === 1
                            ? Number(
                                trans?.metrics?.totalRevenueRecordedBySystem
                              )?.toLocaleString()
                            : i === 2
                            ? Number(
                                trans?.metrics?.totalCarsParked
                              )?.toLocaleString()
                            : Number(
                                trans?.metrics?.totalTransactions
                              )?.toLocaleString()}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Skeleton>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Flex mb="24px" bg="#F4F6F8" align="center" gap="28px">
        {["Manager Report", "Transaction History"].map((item, i) => (
          <Flex
            align="center"
            p="10px 16px"
            gap="8px"
            cursor="pointer"
            _hover={{ color: "#444648" }}
            transition=".3s ease-in-out"
            onClick={() => {
              setTab(item);
              setLimit(25);
              setEndRow(0);
              setStartRow(1);
              setPage(1);
            }}
            borderBottom={tab === item ? "2px solid #444648" : "none"}
            color={tab === item ? "#444648" : "#949698"}
          >
            {i === 0 ? <PiTableLight /> : <PiGridNine />}
            <Text fontSize="12px" fontWeight={500}>
              {item}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Box border="1px solid #d4d6d8" borderRadius="8px" p="30px 23px 24px">
        <Text fontWeight={500} mb="15px" lineHeight="100%" color="#242628">
          {tab}
        </Text>

        {tab.includes("Rep") ? (
          <ManagerReport data={sales} isLoading={isSales} />
        ) : (
          <Table
            data={trans}
            isLoading={isTrans}
            page={page}
            limit={limit}
            setPage={setPage}
            startRow={startRow}
            endRow={endRow}
            setLimit={setLimit}
          />
        )}
      </Box>

      <Flex
        border="1px solid #999999"
        align="center"
        gap="10px"
        justifyContent="center"
        borderRadius="4px"
        mt="50px"
        display={tab.includes("Rep") ? "flex" : "none"}
        h="54px"
        color="#3D3D3D"
        onClick={edit.onOpen}
        w="180px"
        fontSize="14px"
        cursor="pointer"
        fontWeight={500}
      >
        <Text>Edit</Text>
        <PiPencilSimpleLine size="20px" />
      </Flex>

      <EditSales
        data={sales}
        isOpen={edit.isOpen}
        onClose={edit.onClose}
        refetch={refetch}
      />
    </Box>
  );
};

export default ViewLocation;
