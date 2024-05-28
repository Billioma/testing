import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LeaveStatus, types } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useApproveLeave,
  useGetLeave,
  useRejectLeave,
} from "../../../services/admin/query/staff";
import { formatDat } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { PaidIcon } from "../../../components/common/images";

const LeaveMgtDetails = () => {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");

  const typesOptions = types?.map((type) => ({
    value: type?.value,
    label: type?.label,
  }));

  const open = (type) => {
    onOpen();
    setType(type);
  };

  const { data, refetch, isLoading } = useGetLeave(id);
  const { successToast, errorToast } = useCustomToast();

  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    isPaid: "",
  });

  useEffect(() => {
    if (data) {
      const selectedType = typesOptions?.find(
        (option) => option.value === data?.isPaid,
      );
      setValues({
        ...values,
        startDate: data?.startDate,
        endDate: data?.endDate,
        isPaid: selectedType,
      });
    }
  }, [data]);

  const { mutate: approveMutate, isLoading: isApprove } = useApproveLeave({
    onSuccess: () => {
      successToast("Leave request approved successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const { mutate: rejectMutate, isLoading: isReject } = useRejectLeave({
    onSuccess: () => {
      successToast("Leave request rejected successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const approve = () => {
    approveMutate({
      query: id,
      body: {
        isPaid: values?.isPaid?.value,
        startDate: values?.startDate,
        endDate: values?.endDate,
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
            fontSize="14px"
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
                {data?.numberOfDays} Day{data?.numberOfDays === 1 ? "" : "s"}
              </Text>

              <Flex
                color={
                  LeaveStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
                  )?.color || ""
                }
                bg={
                  LeaveStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
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

              <Flex
                border={data?.isPaid ? "1px solid #0B841D" : "1px solid #999"}
                borderRadius="4px"
                py="7px"
                display={data?.isPaid === null ? "none" : "flex"}
                px="16px"
                align="center"
                gap="10px"
              >
                <PaidIcon fill={data?.isPaid ? "#0B841D" : "#999999"} />
                <Text
                  color={data?.isPaid ? "#0B841D" : "#999999"}
                  fontSize="12px"
                  fontWeight={400}
                >
                  {data?.isPaid ? "Paid" : "Unpaid"}
                </Text>
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
                  {data?.rejectedBy ? "Declined by" : "Approved by"}:{" "}
                  <span style={{ fontWeight: 400, marginLeft: "3px" }}>
                    {" "}
                    {data?.rejectedBy
                      ? data?.rejectedBy?.firstName
                      : data?.approvedBy?.firstName}{" "}
                    {data?.rejectedBy
                      ? data?.rejectedBy?.lastName
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

            <Flex
              gap="24px"
              mt="24px"
              display={data?.status === "PENDING" ? "flex" : "none"}
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
            values={values}
            setValues={setValues}
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

export default LeaveMgtDetails;
