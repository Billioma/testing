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
import { useNavigate, useParams } from "react-router-dom";
import { LeaveStatus } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useApproveLeave,
  useGetLeave,
  useRejectLeave,
} from "../../../services/admin/query/staff";
import { formatDat } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";

const MedDetails = () => {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");

  const open = (type) => {
    onOpen();
    setType(type);
  };

  const { data, refetch, isLoading } = useGetLeave(id);
  const { successToast, errorToast } = useCustomToast();
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
              fontSize={{ base: "18px", md: "22px" }}
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
                  Amount Given:
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

            <Flex
              display={data?.status === "PENDING" ? "flex" : "none"}
              gap="24px"
              mt="24px"
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

          <Flex
            bg="#fff"
            borderRadius="8px"
            py={{ base: "15px", md: "30px" }}
            px={{ base: "20px", md: "34px" }}
            justifyContent="center"
            w="full"
            color="#000"
            flexDir="column"
            mt="20px"
            border="1px solid #E4E6E8"
          >
            <Text mb="12px" fontWeight={500} fontSize="14px">
              Supporting Documents
            </Text>

            <Flex
              border="1px solid #D4D6D8"
              borderRadius="8px"
              py="18px"
              px={{ base: "17px", md: "24px" }}
              justifyContent="space-between"
              w="full"
            >
              <Box>
                <Text fontWeight={500} mb="4px">
                  Doctor's Letter
                </Text>
                <Text fontSize="13px">220KB</Text>
              </Box>

              <Flex align="center" gap="12px">
                <Flex
                  border="1px solid #D4D6D8"
                  borderRadius="4px"
                  cursor="pointer"
                  w="32px"
                  h="32px"
                  justifyContent="center"
                  align="center"
                >
                  <Image
                    src="/assets/eye.svg"
                    w="16px"
                    h="16px"
                    objectFit="contain"
                  />
                </Flex>

                <Flex
                  border="1px solid #D4D6D8"
                  borderRadius="4px"
                  cursor="pointer"
                  w="32px"
                  h="32px"
                  justifyContent="center"
                  align="center"
                >
                  <Image
                    src="/assets/download.svg"
                    w="16px"
                    h="16px"
                    objectFit="contain"
                  />
                </Flex>
              </Flex>
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

export default MedDetails;
