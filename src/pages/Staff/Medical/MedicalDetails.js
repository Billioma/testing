import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMed,
  useWithdrawMed,
} from "../../../services/staff/query/medical";
import { LoanStatus } from "../../../components/common/constants";
import { formatDate, trim } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";

const MedicalDetails = () => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetMed(id, {
    refetchOnWindowFocus: true,
  });

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isWithdrawing } = useWithdrawMed({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    mutate(id);
  };

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

  useEffect(() => {
    refetch();
  }, []);

  const navigate = useNavigate();

  return (
    <Box>
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex
            flexDir="column"
            justifyContent="center"
            display="none"
            h="168px"
            borderRadius="12px"
            bg="#075666"
            px="60px"
            pos="relative"
          >
            <Image
              src="/assets/top-left.svg"
              w="240px"
              h="240px"
              pos="absolute"
              top="-10"
              left="-5"
            />
            <Flex align="center" justifyContent="space-between" w="full">
              <Flex align="center" gap="16px" fontWeight={500}>
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="rgba(29, 211, 176, 0.4)"
                  rounded="full"
                  py="4px"
                  color="#fff"
                  px="10px"
                >
                  Active
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  color="#075666"
                  bg="#fff"
                  rounded="full"
                  py="4px"
                  px="10px"
                >
                  Housing
                </Flex>
              </Flex>

              <Flex align="center" gap="68px">
                <Box fontWeight={700}>
                  <Text color="#fff" opacity={0.4} fontSize="12px">
                    START DATE
                  </Text>
                  <Text mt="8px" color="#fff" fontSize="24px">
                    March 20, 2024
                  </Text>
                </Box>

                <Box fontWeight={700}>
                  <Text color="#fff" opacity={0.4} fontSize="12px">
                    END DATE
                  </Text>
                  <Text mt="8px" color="#fff" fontSize="24px">
                    March 20, 2024
                  </Text>
                </Box>
              </Flex>
            </Flex>

            <Image
              src="/assets/bottom-right.svg"
              w="220px"
              h="220px"
              opacity={0.8}
              pos="absolute"
              bottom="-40px"
              right="0"
            />
          </Flex>
          <Flex
            flexDir="column"
            borderRadius="12px"
            border="1px solid #BAE0D9"
            p={{ base: "20px", md: "60px" }}
            pos="relative"
          >
            <Flex
              align="center"
              gap="16px"
              fontWeight={500}
              fontSize={{ base: "14px", md: "16px" }}
            >
              <Flex
                justifyContent="center"
                align="center"
                color="#090C02"
                opacity={0.6}
              >
                Medical Assistance ID: {id}
              </Flex>
              <Flex
                justifyContent="center"
                align="center"
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
                rounded="full"
                border="1px solid"
                borderColor={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
                  )?.border || ""
                }
                py="4px"
                textTransform="capitalize"
                px="10px"
              >
                {data?.status?.toLowerCase()}
              </Flex>
            </Flex>

            <Flex
              color="#090c02"
              align="center"
              mt="40px"
              flexWrap="wrap"
              justifyContent="space-between"
              w={{ base: "100%", md: "75%" }}
              gap={{ base: "20px", md: "unset" }}
            >
              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  AMOUNT
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  ₦ {(data?.amount).toLocaleString()}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  NO. OF ATTACHMENTS
                </Text>
                <Flex align="center" justifyContent="center" gap="10px">
                  <Image
                    src="/assets/file.svg"
                    w="24px"
                    h="24px"
                    objectFit="contain"
                  />
                  <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                    {data?.documents?.length} Document
                    {data?.documents?.length < 2 ? "" : "s"}
                  </Text>
                </Flex>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  DATE REQUESTED
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.createdAt)}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Box
            mt="24px"
            border="1px solid #BAE0D9"
            borderRadius="12px"
            py="16px"
            px="30px"
          >
            {data?.additionalComments || "N/A"}
          </Box>

          <Grid
            columnGap={data?.documents?.length < 2 ? "" : "24px"}
            rowGap="0"
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
                    mt="24px"
                    border="1px solid #BAE0D9"
                    borderRadius="12px"
                    align="center"
                    py="16px"
                    px="25px"
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
                          border="1px solid #08637533"
                          borderRadius="4px"
                          cursor="pointer"
                          w="32px"
                          h="32px"
                          justifyContent="center"
                          align="center"
                        >
                          <Image
                            src="/assets/green-eye.svg"
                            w="16px"
                            h="16px"
                            objectFit="contain"
                          />
                        </Flex>
                      </a>

                      <Flex
                        border="1px solid #08637533"
                        borderRadius="4px"
                        cursor="pointer"
                        w="32px"
                        h="32px"
                        onClick={() => handleDownload(item)}
                        justifyContent="center"
                        align="center"
                      >
                        <Image
                          src="/assets/green-download.svg"
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
            gap="24px"
            display={data?.status === "PENDING" ? "flex" : "none"}
            w={{ base: "100%", md: "30%" }}
            mt="24px"
            align="center"
          >
            <Button
              onClick={() => navigate(`/staff/medical-assistance/${id}/update`)}
              bg="transparent"
              border="1px solid #086375"
              color="#086375"
              borderRadius="8px"
              h="60px"
              w="full"
            >
              Edit
            </Button>
            <Button
              color="#fff"
              bg="#A11212"
              variant="adminPrimary"
              borderRadius="8px"
              h="60px"
              onClick={handleSubmit}
              isLoading={isWithdrawing}
              w="full"
            >
              Withdraw
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default MedicalDetails;
