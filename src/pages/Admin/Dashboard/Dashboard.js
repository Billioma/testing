import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Flex,
  GridItem,
  Text,
  Image,
  Avatar,
  Button,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import {
  useApproveLeave,
  useGetLeaveRequest,
  useGetStaffs,
  useRejectLeave,
} from "../../../services/admin/query/staff";
import StaffProfileTableLayer from "../../../components/data/Admin/StaffProfile/StaffProfileTableLayer";
import Filter from "../../../components/common/Filter";
import { IoIosArrowUp } from "react-icons/io";
import { formatDate, formatDates } from "../../../utils/helpers";
import { types } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import useCustomToast from "../../../utils/notifications";
import { useGetMetrics } from "../../../services/admin/query/settings";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);

  const today = new Date();
  const year = today.getFullYear();

  const query = `filter=status||$eq||INACTIVE&filter=createdAt||$lte||${year}-12-31T23:59:59`;

  const [isRefetch, setIsRefetch] = useState(false);
  const {
    data: metrics,
    isLoading: isMetrics,
    refetch: refetchMetrics,
  } = useGetMetrics({
    refetchOnWindowFocus: true,
  });

  const { data, isLoading, refetch } = useGetStaffs(
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
    page,
    limit,
    query
  );

  const {
    data: leaveRequestt,
    isLoading: isLeave,
    refetch: refetchLeave,
  } = useGetLeaveRequest(
    {
      refetchOnWindowFocus: true,
    },
    "PENDING",
    1,
    10,
    `&filter=createdAt||$gte||${formatDates(today)}T00:00:00&filter=createdAt||$lte||2024-12-31T23:59:59`
  );

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");
  const [currentLeave, setCurrentLeave] = useState("");

  const [values, setValues] = useState({
    startDate: null,
    endDate: null,
    isPaid: "",
  });

  const typesOptions = types?.map((type) => ({
    value: type?.value,
    label: type?.label,
  }));

  const open = (type, dat) => {
    onOpen();
    setCurrentLeave(dat);
    setType(type);
  };

  useEffect(() => {
    if (currentLeave) {
      const selectedType = typesOptions?.find(
        (option) => option.value === currentLeave?.isPaid
      );
      setValues({
        ...values,
        startDate: currentLeave?.startDate,
        endDate: currentLeave?.endDate,
        isPaid: selectedType,
      });
    }
  }, [currentLeave]);

  const { successToast, errorToast } = useCustomToast();
  const { mutate: approveMutate, isLoading: isApprove } = useApproveLeave({
    onSuccess: () => {
      successToast("Leave request approved successfully!");
      refetchLeave();
      onClose();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: rejectMutate, isLoading: isReject } = useRejectLeave({
    onSuccess: () => {
      successToast("Leave request rejected successfully!");
      refetchLeave();
      onClose();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const approve = () => {
    approveMutate({
      query: currentLeave?.id,
      body: {
        isPaid: values?.isPaid?.value,
        startDate: values?.startDate,
        endDate: values?.endDate,
      },
    });
  };

  const reject = () => {
    rejectMutate({
      query: currentLeave?.id,
      body: {
        isPaid: data?.isPaid,
      },
    });
  };

  useEffect(() => {
    refetch();
    refetchMetrics();
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

  return (
    <Box>
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
        {["Leave", "Loan", "Medical Assistance", "Total Staff on Duty"]?.map(
          (dat, i) => (
            <Skeleton isLoaded={!isMetrics} borderRadius="8px">
              <GridItem key={i}>
                <Box
                  borderRadius="8px"
                  bg="#F4F6F8"
                  pt="5px"
                  px="5px"
                  border="1px solid #E4E6E8"
                >
                  <Box h="6px" w="full" bg="#242628" borderRadius="full" />
                  <Box px="15px" pt="0px" pb="20px">
                    <Text
                      mt="24px"
                      lineHeight="100%"
                      fontWeight={700}
                      color="#242628"
                    >
                      {i < 3 ? "Pending" : ""} {dat} {i < 2 ? "Requests" : ""}
                    </Text>

                    <Flex
                      mt="24px"
                      align="flex-end"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box w="full">
                        <Text
                          mt="24px"
                          fontSize="28px"
                          lineHeight="100%"
                          color="#646668"
                          fontWeight={500}
                        >
                          {i === 0
                            ? metrics?.pendingLeaveRequests
                            : i === 1
                              ? metrics?.pendingLoanRequests
                              : i === 2
                                ? metrics?.pendingMedicalAssistance
                                : i === 3 && metrics?.totalStaffOnDuty}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </GridItem>
            </Skeleton>
          )
        )}
      </Grid>

      <Flex align="center" flexDir={{ base: "column", md: "row" }} gap="34px">
        <Box w={{ base: "100%", md: "60%" }}>
          <Box
            minH={{ base: "unset", md: "33rem" }}
            maxH={{ base: "unset", md: "33rem" }}
            overflowY="scroll"
            border="1px solid #d4d6d8"
            borderRadius="8px"
            className="no_scroller"
            p="16px 23px 24px"
          >
            <Filter
              alt
              title={
                <Text fontWeight={500} lineHeight="100%" color="#242628">
                  Employee Status
                </Text>
              }
              main={
                <>
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

            <StaffProfileTableLayer
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
        </Box>

        <Box w={{ base: "100%", md: "40%" }}>
          <Box
            minH={{ base: "unset", md: "33rem" }}
            overflowY="scroll"
            maxH={{ base: "unset", md: "33rem" }}
            className="no_scroller"
            border="1px solid #d4d6d8"
            borderRadius="8px"
            color="#242628"
            p="16px 23px 24px"
          >
            <Flex
              pb="14px"
              borderBottom="1px solid #d4d6d8"
              align="center"
              gap="12px"
            >
              <Text fontSize="14px" fontWeight={500}>
                Leave Management
              </Text>
              <Flex
                bg="#242628"
                rounded="full"
                py="2px"
                px="10px"
                fontSize="10px"
                color="#fff"
                fontWeight={500}
              >
                +{leaveRequestt?.total}
              </Flex>
            </Flex>

            {isLeave ? (
              <>
                <Skeleton isLoaded={!isLeave} h="10rem" mb="10px" />
                <Skeleton isLoaded={!isLeave} h="10rem" mb="10px" />
              </>
            ) : leaveRequestt?.data?.length ? (
              leaveRequestt?.data?.map((item, i) => (
                <Box
                  key={i}
                  py="28px"
                  borderBottom="1px solid #D4D6D8"
                  _last={{ borderBottom: "none" }}
                >
                  <Flex align="center" justifyContent="space-between">
                    <Flex align="center" gap="8px">
                      <Avatar w="24px" h="24px" rounded="full" />

                      <Box>
                        <Text fontSize="12px">{item?.staff?.fullName}</Text>
                        <Text fontWeight={500} fontSize="12px">
                          ID: {item?.staff?.staffId}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex
                      border="0.75px solid #090C02"
                      borderRadius="2px"
                      w="22px"
                      h="18px"
                      cursor="pointer"
                      justifyContent="center"
                      align="center"
                    >
                      <IoIosArrowUp />
                    </Flex>
                  </Flex>

                  <Box mt="12px">
                    <Flex
                      border="1px solid #D4D6D8"
                      bg="#f4f6f8"
                      borderRadius="2px"
                      py="4px"
                      align="center"
                      justifyContent="space-between"
                      px="10px"
                      fontSize="11px"
                    >
                      <Text color="#999999" fontWeight={700}>
                        START DATE
                      </Text>
                      <Text color="#090c02" fontWeight={500}>
                        {formatDate(item?.startDate)}
                      </Text>
                    </Flex>

                    <Flex
                      mt="6px"
                      border="1px solid #D4D6D8"
                      bg="#f4f6f8"
                      align="center"
                      justifyContent="space-between"
                      borderRadius="2px"
                      py="4px"
                      fontSize="11px"
                      px="10px"
                    >
                      <Text color="#999999" fontWeight={700}>
                        END DATE
                      </Text>
                      <Text color="#090c02" fontWeight={500}>
                        {formatDate(item?.endDate)}
                      </Text>
                    </Flex>
                  </Box>

                  <Flex gap="12px" mt="12px" align="center">
                    <Button
                      onClick={() => open("approve", item)}
                      variant="adminPrimary"
                      h="28px"
                    >
                      Approve
                    </Button>
                    <Button
                      border="1px solid #999999"
                      onClick={() => open("decline", item)}
                      color="#999999"
                      bg="transparent"
                      variant="adminPrimary"
                      h="28px"
                    >
                      Decline
                    </Button>
                  </Flex>
                </Box>
              ))
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Flex>

      <ApproveDeny
        approve={approve}
        reject={reject}
        isOpen={isOpen}
        values={values}
        setValues={setValues}
        type={type}
        isReject={isReject}
        isApprove={isApprove}
        onClose={onClose}
      />
    </Box>
  );
};

export default Dashboard;
