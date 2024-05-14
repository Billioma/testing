import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    isPaid: "",
  });

  useEffect(() => {
    if (data) {
      const selectedType = typesOptions?.find(
        (option) => option.value === data?.isPaid
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
          >
            <Flex
              gap="8px"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              fontSize="22px"
              fontWeight={700}
            >
              <Flex gap="8px">
                <Text>Leave ID: {id}</Text>
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

            <Flex
              mt="20px"
              color="#090c02"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              gap="20px"
              fontWeight={500}
              display={
                data?.status === "PENDING" || data?.status === "REJECTED"
                  ? "flex"
                  : "none"
              }
            >
              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Proposed Start Date:
                </Text>
                <Text>{formatDat(data?.startDate)}</Text>
              </Flex>

              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Proposed End Date:
                </Text>
                <Text>{formatDat(data?.endDate)}</Text>
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
              <Text color="#646668">{data?.additionalComments}</Text>
            </Box>

            <Flex
              align="center"
              mt="20px"
              gap="8px"
              display={
                data?.status === "PENDING" || data?.status === "REJECTED"
                  ? "flex"
                  : "none"
              }
            >
              <Text opacity={0.4} fontSize="14px">
                Date Submitted:
              </Text>
              <Text>{formatDat(data?.createdAt)}</Text>
            </Flex>

            <Flex
              mt="20px"
              color="#090c02"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              gap="24px"
              fontWeight={500}
              display={
                data?.status === "APPROVED" || data?.status === "COMPLETED"
                  ? "flex"
                  : "none"
              }
            >
              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Date Submitted:
                </Text>
                <Text>{formatDat(data?.createdAt)}</Text>
              </Flex>

              <Box
                border="1px solid #000"
                h="20px"
                opacity={0.4}
                display={{ base: "none", md: "block" }}
              />

              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Date Approved:
                </Text>
                <Text>{formatDat(data?.approvedAt)}</Text>
              </Flex>

              <Box
                border="1px solid #000"
                h="20px"
                opacity={0.4}
                display={{ base: "none", md: "block" }}
              />

              <Flex align="center" gap="8px">
                <Text opacity={0.4} fontSize="14px">
                  Leave Period:
                </Text>
                <Text>
                  {formatDat(data?.startDate)} - {formatDat(data?.endDate)}
                </Text>
              </Flex>
            </Flex>

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
