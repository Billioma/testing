import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Spinner,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LoanStatus, loanSubmit } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useApproveLoan,
  useGetLoan,
  useLoanPaid,
  useRejectLoan,
} from "../../../services/admin/query/staff";
import { formatDat, formatDates } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";

const LoanDetails = () => {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");

  const open = (type) => {
    onOpen();
    setType(type);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "7rem",
      minHeight: "35px",
      fontWeight: 500,
      color: "#646668",
      fontSize: "13px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };

  const submitOptions = loanSubmit?.map((item) => ({
    value: item?.value,
    label: item?.name,
  }));

  const [paidIndex, setPaidIndex] = useState("");
  const { data, refetch, isLoading } = useGetLoan(id, {
    refetchOnWindowFocus: true,
  });
  const { successToast, errorToast } = useCustomToast();
  const [repayment, setRepayment] = useState("");
  const [showRepayment, setShowRepayment] = useState(false);
  const navigate = useNavigate();

  const initialPlans =
    data?.repaymentPlans?.map((plan) => ({
      ...plan,
      localStatus: plan.status,
    })) || [];
  const [repaymentPlans, setRepaymentPlans] = useState(initialPlans);

  const handleChange = (item, selectedOption) => {
    setRepaymentPlans(
      repaymentPlans?.map((plan) =>
        plan.id === item.id
          ? { ...plan, localStatus: selectedOption.label }
          : plan
      )
    );
  };

  const { mutate: approveMutate, isLoading: isApprove } = useApproveLoan({
    onSuccess: () => {
      successToast("Leave request approved successfully!");
      refetch();
      // navigate("/admin/loans");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: payMutate, isLoading: isPaying } = useLoanPaid({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: rejectMutate, isLoading: isReject } = useRejectLoan({
    onSuccess: () => {
      successToast("Leave request rejected successfully!");
      refetch();
      onClose();
      // navigate("/admin/loans");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const approve = () => {
    approveMutate({
      query: id,
      body: {
        amountLoaned: data?.amountRequested,
        repaymentTerms: repayment,
      },
    });
  };

  const setPaid = (dat) => {
    payMutate({
      query: id,
      body: {
        repaymentPlanId: dat,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  const reject = () => {
    rejectMutate(id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShowRepayment(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <GoBackTab />{" "}
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex
            bg="#fff"
            borderRadius="8px"
            py={{ base: "15px", md: "30px" }}
            px={{ base: "20px", md: "34px" }}
            justifyContent="center"
            w="full"
            color="#000"
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Flex
              display={
                data?.status === "APPROVED" ||
                data?.status === "REPAYMENT_IN_PROGRESS" ||
                data?.status === "PAID" ||
                data?.status === "ACTIVE"
                  ? "flex"
                  : "none"
              }
              mb="24px"
              mt="4px"
              align="center"
              gap="12px"
            >
              <Text fontWeight={500} color="#090c02">
                Approved by:{" "}
              </Text>

              <Flex
                border="1px solid #D4D6D8"
                align="center"
                gap="8px"
                borderRadius="100px"
                p="4px"
              >
                <Flex rounded="full" bg="#D9D9D9" w="16px" h="16px"></Flex>
                <Text fontSize="14px" color="#090c02">
                  {data?.approvedBy?.firstName} {data?.approvedBy?.lastName}
                </Text>
              </Flex>
            </Flex>

            <Flex
              gap="8px"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              fontSize="22px"
              fontWeight={700}
            >
              <Flex gap="8px">
                <Text>Staff ID: {data?.staff?.staffId}</Text>
                <Text>|</Text>
                <Text textTransform="capitalize">{data?.staff?.fullName}</Text>
              </Flex>

              <Flex
                color={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase()
                  )?.color || ""
                }
                bg={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase()
                  )?.bg || ""
                }
                justifyContent={"center"}
                alignItems="center"
                py="5px"
                fontSize="12px"
                fontWeight={500}
                textTransform="capitalize"
                px="16px"
                borderRadius="4px"
              >
                {data?.status === "REJECTED"
                  ? "Declined"
                  : data?.status === "REPAYMENT_IN_PROGRESS"
                    ? "Repayment In Progress"
                    : data?.status?.toLowerCase()}
              </Flex>
            </Flex>

            <Box
              bg="#F4F6F8"
              borderRadius="4px"
              p="16px"
              mt="20px"
              display={data?.additionalComments ? "block" : "none"}
              fontSize="15px"
              color="#000"
            >
              <Text fontWeight={500}>Additional Comments:</Text>
              <Text color="#646668" mt="10px">
                {data?.additionalComments}{" "}
              </Text>
            </Box>

            <Flex
              display={
                data?.status === "PENDING" || data?.status === "CANCELLED"
                  ? "flex"
                  : "none"
              }
              mt="20px"
              color="#090c02"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              gap="20px"
              fontWeight={500}
            >
              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Amount Requested:
                </Text>
                <Text>₦ {(data?.amountRequested).toLocaleString()}</Text>
              </Flex>

              <Box
                display={{ base: "none", md: "block" }}
                h="24px"
                bg="#000000"
                border="1px solid"
                opacity={0.4}
              />

              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Date Submited:
                </Text>
                <Text>{formatDat(data?.createdAt)}</Text>
              </Flex>
            </Flex>

            <Flex
              display={
                data?.status === "APPROVED" ||
                data?.status === "REPAYMENT_IN_PROGRESS" ||
                data?.status === "PAID" ||
                data?.status === "ACTIVE"
                  ? "flex"
                  : "none"
              }
              mt="20px"
              color="#090c02"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              gap="20px"
              fontWeight={500}
            >
              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Amount Loaned:
                </Text>
                <Text>₦ {(data?.amountRequested).toLocaleString()}</Text>
              </Flex>

              <Box
                display={{ base: "none", md: "block" }}
                h="24px"
                bg="#000000"
                border="1px solid"
                opacity={0.4}
              />

              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Date Submited:
                </Text>
                <Text>{formatDat(data?.createdAt)}</Text>
              </Flex>

              <Box
                display={{ base: "none", md: "block" }}
                h="24px"
                bg="#000000"
                border="1px solid"
                opacity={0.4}
              />

              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Date Approved:
                </Text>
                <Text>{formatDat(data?.approvedAt)}</Text>
              </Flex>
            </Flex>

            <Box
              border="1px solid #E2E5DC"
              borderRadius="8px"
              mt="24px"
              display={
                data?.status === "APPROVED" ||
                data?.status === "REPAYMENT_IN_PROGRESS" ||
                data?.status === "PAID" ||
                data?.status === "ACTIVE"
                  ? "block"
                  : "none"
              }
              py="16px"
              px="20px"
            >
              <Text fontSize="18px" fontWeight={700}>
                Repayment Terms
              </Text>

              <Box mt="14px">
                <TableContainer pb="100px">
                  <Table>
                    <Thead>
                      <Tr>
                        {["PERIOD", "DATE", "AMOUNT", "STATUS"].map(
                          (item, i) => (
                            <Th
                              fontFamily="Satoshi"
                              _last={{ textAlign: "center" }}
                              key={i}
                              fontSize="13px"
                              fontWeight={700}
                            >
                              {item}
                            </Th>
                          )
                        )}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.repaymentPlans?.map((item, i) => (
                        <Tr key={i} fontSize="14px">
                          <Td>{i + 1}</Td>
                          <Td>{formatDates(item?.dueDate)}</Td>
                          <Td>₦ {(item?.amount).toLocaleString()}</Td>
                          <Td>
                            {item?.status === "PENDING" ? (
                              <Flex
                                justifyContent="center"
                                align="center"
                                w="full"
                              >
                                <Select
                                  styles={customStyles}
                                  options={submitOptions}
                                  placeholder="Pending"
                                  components={{
                                    IndicatorSeparator: () => (
                                      <div style={{ display: "none" }}></div>
                                    ),
                                    DropdownIndicator: () => (
                                      <div>
                                        {isPaying && paidIndex === item?.id ? (
                                          <Spinner size="sm" />
                                        ) : (
                                          <IoIosArrowDown
                                            size="15px"
                                            color="#646668"
                                          />
                                        )}
                                      </div>
                                    ),
                                  }}
                                  onChange={(selectedOption) => {
                                    handleChange(item, selectedOption);
                                    setPaidIndex(item?.id);
                                    if (selectedOption?.label == "Paid") {
                                      setPaid(item?.id);
                                    }
                                  }}
                                />
                              </Flex>
                            ) : (
                              <Flex
                                justifyContent="center"
                                align="center"
                                w="full"
                              >
                                <Flex
                                  justifyContent="center"
                                  align="center"
                                  w="fit-content"
                                  textTransform="capitalize"
                                  fontWeight={500}
                                  fontSize="12px"
                                  borderRadius="4px"
                                  py="7px"
                                  px="12px"
                                  border={
                                    item?.status === "PAID"
                                      ? "1px solid #E5FFE5"
                                      : "1px solid #F8E16C"
                                  }
                                  color={
                                    item?.status === "PAID"
                                      ? "#0B841D"
                                      : "#F79E1B"
                                  }
                                >
                                  {item?.status?.toLowerCase()}
                                </Flex>
                              </Flex>
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>

            <Box
              display={data?.status === "PENDING" ? "block" : "none"}
              mt="24px"
            >
              <Text fontSize="18px" fontWeight={700}>
                Repayment Terms
              </Text>
              <Text mt="8px" fontSize="14px">
                Please set the loan duration before approving loan request
              </Text>

              <Box pos="relative" cursor="pointer" className="box">
                <Flex
                  mt="16px"
                  border="1px solid #D4D6D8"
                  borderRadius="4px"
                  onClick={() => setShowRepayment((prev) => !prev)}
                  py="12px"
                  justifyContent="space-between"
                  w="full"
                  align="center"
                  px="16px"
                >
                  <Text color={repayment ? "" : "#ACB0BD"} fontSize="14px">
                    {repayment || "Duration (in Months)"}
                  </Text>
                  <IoIosArrowDown />
                </Flex>
                {showRepayment && (
                  <Box
                    top="60px"
                    bg="#fff"
                    zIndex={1}
                    pos="absolute"
                    w="full"
                    border="1px solid #F4F6F8"
                    borderRadius="4px"
                  >
                    {[1, 2, 3].map((item, i) => (
                      <Flex
                        _hover={{ bg: "#F4F6F8" }}
                        p="10px"
                        cursor="pointer"
                        onClick={() => {
                          setRepayment(item);
                          setShowRepayment(false);
                        }}
                        key={i}
                      >
                        {item} Month{i > 0 ? "s" : ""}
                      </Flex>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>

            <Flex
              gap="24px"
              display={data?.status === "PENDING" ? "flex" : "none"}
              mt={showRepayment ? "170px" : "24px"}
              w={{ base: "100%", md: "25%" }}
            >
              <Button
                variant="adminSecondary"
                w="40%"
                onClick={() => open("decline")}
                h="48px"
                border="1px solid #A11212"
                color="#A11212"
              >
                Decline
              </Button>
              <Button
                onClick={approve}
                isLoading={isApprove}
                variant="adminPrimary"
                isDisabled={!repayment}
                h="48px"
                w="60%"
              >
                Approve
              </Button>
            </Flex>
          </Flex>

          <ApproveDeny
            loan
            approve={approve}
            reject={reject}
            isOpen={isOpen}
            type={type}
            isReject={isReject}
            isApprove={isApprove}
            onClose={onClose}
          />
        </>
      )}
    </div>
  );
};

export default LoanDetails;
