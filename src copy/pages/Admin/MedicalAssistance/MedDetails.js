import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Spinner,
  Image,
  Grid,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LoanStatus } from "../../../components/common/constants";
import ApproveDeny from "../../../components/modals/ApproveDeny";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useApproveMed,
  useGetMed,
  useRejectMed,
} from "../../../services/admin/query/staff";
import { formatDat, trim } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";

const MedDetails = () => {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");

  const open = (type) => {
    onOpen();
    setType(type);
  };

  const { data, refetch, isLoading } = useGetMed(id);
  const { successToast, errorToast } = useCustomToast();

  async function handleDownload(item) {
    const urlToDownload = `${process.env.REACT_APP_BASE_URL}${item?.url?.replace("/", "")}`;
    const fileName = item?.name;

    try {
      const response = await fetch(urlToDownload);
      const blob = await response.blob();

      const link = document.createElement("a");
      document.body.appendChild(link);

      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }

  const { mutate: approveMutate, isLoading: isApprove } = useApproveMed({
    onSuccess: () => {
      successToast("Medical request approved successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const { mutate: rejectMutate, isLoading: isReject } = useRejectMed({
    onSuccess: () => {
      successToast("Medical request rejected successfully!");
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
    approveMutate(id);
  };

  useEffect(() => {
    refetch();
  }, []);

  const reject = () => {
    rejectMutate(id);
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
            <Text color="#999" fontSize="13px" fontWeight={700}>
              Staff ID: {data?.staff?.staffId}
            </Text>

            <Flex
              mt="32px"
              gap="24px"
              flexDir={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              fontSize={{ base: "18px", md: "22px" }}
              fontWeight={700}
            >
              <Text fontSize="32px">₦ {data?.amount.toLocaleString()}</Text>

              <Flex
                color={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
                  )?.color || ""
                }
                bg={
                  LoanStatus.find(
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
                md:
                  data?.status === "PENDING" ||
                  data?.status === "CANCELLED" ||
                  data?.status === "WITHDRAWN"
                    ? "50%"
                    : "65%",
              }}
              gap="20px"
            >
              <Box
                fontSize="13px"
                display={
                  data?.status === "PENDING" ||
                  data?.status === "CANCELLED" ||
                  data?.status === "WITHDRAWN"
                    ? "none"
                    : "block"
                }
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
              fontSize="13px"
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

            <Text
              mt="24px"
              mb="6px"
              fontWeight={700}
              textTransform="uppercase"
              display={data?.documents?.length ? "block" : "none"}
              color="#999"
              fontSize="13px"
            >
              Supporting Documents
            </Text>

            <Grid
              columnGap={data?.documents?.length < 2 ? "" : "24px"}
              rowGap="24px"
              templateColumns={{
                base: "repeat(1,1fr)",
                md:
                  data?.documents?.length === 1
                    ? "repeat(1,1fr)"
                    : data?.documents?.length === 2
                      ? "repeat(2,1fr)"
                      : "repeat(3,1fr)",
              }}
            >
              {data?.documents?.length
                ? data?.documents?.map((item, i) => (
                    <Flex
                      key={i}
                      border="1px solid #D4D6D8"
                      borderRadius="8px"
                      py="18px"
                      px={{ base: "17px", md: "24px" }}
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box>
                        <Text fontWeight={500} mb="4px">
                          {trim(item?.name)}
                        </Text>
                      </Box>

                      <Flex align="center" gap="12px">
                        <a
                          href={`${process.env.REACT_APP_BASE_URL}${item?.url?.replace("/", "")}`}
                          target="_blank"
                          rel="noreferrer"
                        >
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
                        </a>

                        <Flex
                          border="1px solid #D4D6D8"
                          borderRadius="4px"
                          cursor="pointer"
                          w="32px"
                          h="32px"
                          justifyContent="center"
                          onClick={() => handleDownload(item)}
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
                  ))
                : ""}
            </Grid>

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

          <ApproveDeny
            approve={approve}
            reject={reject}
            med
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
