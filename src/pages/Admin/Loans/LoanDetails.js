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
  Image,
} from "@chakra-ui/react";
import AdminCustomInput from "../../../components/common/AdminCustomInput";
import { useParams } from "react-router-dom";
import { LoanStatus, loanSubmit } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useApproveLoan,
  useDisburseLoan,
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
  const [amount, setAmount] = useState("");
  const [repayment, setRepayment] = useState("");
  const [showRepayment, setShowRepayment] = useState(false);

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
      successToast("Loan request approved successfully!");
      refetch();
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

  const { mutate: disburseMutate, isLoading: isDisburse } = useDisburseLoan({
    onSuccess: () => {
      refetch();
      successToast("Loan disbursed successfully!");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: rejectMutate, isLoading: isReject } = useRejectLoan({
    onSuccess: () => {
      successToast("Loan request rejected successfully!");
      refetch();
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
      query: id,
      body: {
        amountLoaned: amount,
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
            <Text color="#999" fontSize="13px" fontWeight={700}>
              Staff ID: {data?.staff?.staffId}
            </Text>

            <Flex
              mt="32px"
              gap="24px"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              fontSize="22px"
              fontWeight={700}
            >
              <Text fontSize="32px">
                ₦{" "}
                {data?.amountLoaned
                  ? data?.amountLoaned.toLocaleString()
                  : data?.amountRequested.toLocaleString()}
              </Text>

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

            <Flex
              mt="20px"
              color="#090c02"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              justifyContent="space-between"
              w={{
                base: "100%",
                md: data?.status === "PENDING" ? "50%" : "65%",
              }}
              gap="20px"
            >
              <Box
                fontSize="13px"
                display={data?.status === "PENDING" ? "none" : "block"}
              >
                <Image
                  src="/assets/approve.svg"
                  w="15px"
                  h="15px"
                  objectFit="contain"
                />
                <Text mt="8px" fontWeight={500}>
                  {data?.declinedBy ? "Declined by" : "Approved by"}:{" "}
                  <span style={{ fontWeight: 400, marginLeft: "3px" }}>
                    {" "}
                    {data?.declinedBy
                      ? data?.declinedBy?.firstName
                      : data?.approvedBy?.firstName}{" "}
                    {data?.declinedBy
                      ? data?.declinedBy?.lastName
                      : data?.approvedBy?.lastName}
                  </span>
                </Text>
              </Box>

              <Box fontSize="13px">
                <Image
                  src="/assets/user.svg"
                  w="15px"
                  h="15px"
                  objectFit="contain"
                />
                <Text mt="8px" fontWeight={500}>
                  Full Name:{" "}
                  <span style={{ fontWeight: 400, marginLeft: "3px" }}>
                    {" "}
                    {data?.staff?.fullName}
                  </span>
                </Text>
              </Box>

              <Box fontSize="13px">
                <Image
                  src="/assets/date.svg"
                  w="15px"
                  h="15px"
                  objectFit="contain"
                />
                <Text mt="8px" fontWeight={500}>
                  Date Submitted:{" "}
                  <span style={{ fontWeight: 400, marginLeft: "3px" }}>
                    {" "}
                    {formatDat(data?.createdAt)}
                  </span>
                </Text>
              </Box>
            </Flex>

            <Text
              fontWeight={700}
              textTransform="uppercase"
              color="#999"
              mt="32px"
              display={data?.additionalComments ? "block" : "none"}
              fontSize="14px"
            >
              Additional Comments
            </Text>

            <Box
              bg="#F4F6F8"
              borderRadius="4px"
              p="16px"
              mt="6px"
              display={data?.additionalComments ? "block" : "none"}
              fontSize="15px"
              color="#000"
            >
              <Text color="#444648">{data?.additionalComments} </Text>
            </Box>

            <Box
              mt="24px"
              display={
                data?.status === "APPROVED" ||
                data?.status === "REPAYMENT_IN_PROGRESS" ||
                data?.status === "PAID" ||
                data?.status === "ACTIVE"
                  ? "block"
                  : "none"
              }
            >
              <Box
                border="1px solid #E2E5DC"
                borderRadius="8px"
                mt="24px"
                py="16px"
                px="20px"
              >
                <Text fontSize="18px" fontWeight={700}>
                  Repayment Plan
                </Text>

                <Box mt="14px">
                  <TableContainer pb="75px">
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
                                    isDisabled={data?.status === "APPROVED"}
                                    placeholder="Pending"
                                    components={{
                                      IndicatorSeparator: () => (
                                        <div style={{ display: "none" }}></div>
                                      ),
                                      DropdownIndicator: () => (
                                        <div>
                                          {isPaying &&
                                          paidIndex === item?.id ? (
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

              <Button
                borderRadius="4px"
                mt="24px"
                display={data?.status === "APPROVED" ? "flex" : "none"}
                isLoading={isDisburse}
                onClick={() => disburseMutate(id)}
                bg="#000"
                alignContent="center"
                gap="10px"
              >
                <Image
                  src="/assets/check.svg"
                  w="16px"
                  h="9px"
                  objectFit="contain"
                />

                <Text>Mark as Active</Text>
              </Button>
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

              <Box mt="16px">
                <Text fontSize="12px" mb="8px" color="#444648">
                  Amount
                </Text>
                <AdminCustomInput
                  naira
                  holder="Enter Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>

              <Box mt="16px">
                <Text fontSize="12px" mb="8px" color="#444648">
                  Tenor
                </Text>
                <Box pos="relative" cursor="pointer" className="box">
                  <Flex
                    mt="16px"
                    border="1px solid #D4D6D8"
                    borderRadius="4px"
                    bg={repayment ? "#F4F6F8" : "transparent"}
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
