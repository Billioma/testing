import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LeaveStatus, NewStatus } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useApproveLeave,
  useGetLeave,
  useRejectLeave,
} from "../../../services/admin/query/staff";
import { formatDat } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { IoIosArrowDown } from "react-icons/io";

const LoanDetails = () => {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");

  const open = (type) => {
    onOpen();
    setType(type);
  };

  const { data, refetch, isLoading } = useGetLeave(id);
  const { successToast, errorToast } = useCustomToast();
  const [repayment, setRepayment] = useState("");
  const [showRepayment, setShowRepayment] = useState(false);
  const navigate = useNavigate();

  const { mutate: approveMutate, isLoading: isApprove } = useApproveLeave({
    onSuccess: () => {
      successToast("Leave request approved successfully!");
      refetch();
      onClose();
      navigate("/admin/leave-mgt");
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
      refetch();
      onClose();
      navigate("/admin/leave-mgt");
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
        isPaid: data?.isPaid,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  const reject = () => {
    rejectMutate({
      query: id,
      body: {
        isPaid: data?.isPaid,
      },
    });
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
            <Flex mb="24px" mt="4px" align="center" gap="12px">
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
                  Adenike Ajibola
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
                <Text>Staff ID: {id}</Text>
                <Text>|</Text>
                <Text textTransform="capitalize">{data?.staff?.fullName}</Text>
              </Flex>

              <Flex
                color={
                  LeaveStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase()
                  )?.color || ""
                }
                bg={
                  LeaveStatus.find(
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
                  : data?.status?.toLowerCase()}
              </Flex>
            </Flex>

            <Box
              bg="#F4F6F8"
              borderRadius="4px"
              p="16px"
              mt="20px"
              fontSize="15px"
              color="#000"
            >
              <Text fontWeight={500}>Additional Comments:</Text>
              <Text color="#646668">
                Lörem ipsum tregirade religa memäv prengen utan lanat.{" "}
              </Text>
            </Box>

            <Flex
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
                <Text>₦ {(10000).toLocaleString()}</Text>
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
                <Text>{formatDat(data?.endDate)}</Text>
              </Flex>
            </Flex>

            <Box mt="24px">
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
                          setRepayment(`${item} Month${i > 0 ? "s" : ""}`);
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
                onClick={() => open("approve")}
                variant="adminPrimary"
                h="48px"
                w="60%"
              >
                Approve
              </Button>
            </Flex>
          </Flex>

          <ApproveDeny
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
