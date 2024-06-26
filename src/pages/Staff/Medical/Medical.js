import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import TableLayer from "../../../components/data/Staff/Medical/TableLayer";
import { Button, Spinner } from "@chakra-ui/react";
import { useGetMedRequest } from "../../../services/staff/query/medical";
import { useGetUser } from "../../../services/staff/query/user";

const Medical = () => {
  const navigate = useNavigate();
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const { data: userData } = useGetUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data, isLoading, refetch } = useGetMedRequest(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit,
  );

  useEffect(() => {
    refetch();
  }, []);

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
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : !userData?.isMedicalAssistanceEligible ? (
        <Flex
          h="55vh"
          gap="49px"
          justifyContent="center"
          align="center"
          flexDir="column"
        >
          <Image
            src="/assets/no-leave.jpg"
            w="180px"
            h="180px"
            objectFit="contain"
          />
          <Text
            textTransform="capitalize"
            textAlign="center"
            w={{ base: "100%", md: "30rem" }}
            fontSize="28px"
            fontWeight={700}
          >
            You are <span style={{ color: "#086375" }}>not eligible</span> to
            Request for Medical Assistance at the moment
          </Text>
        </Flex>
      ) : !data?.data?.length ? (
        <Flex
          h="55vh"
          gap="49px"
          justifyContent="center"
          align="center"
          flexDir="column"
        >
          <Image
            src="/assets/no-leave.jpg"
            w="180px"
            h="180px"
            objectFit="contain"
          />
          <Flex
            mt="24px"
            justifyContent="center"
            align="center"
            textAlign="center"
          >
            <Box>
              <Text fontSize="28px" fontWeight={700}>
                No Medical Assistance History found
              </Text>
              <Text>Please request assistance to get started</Text>

              <Button
                mt="24px"
                onClick={() => navigate("/staff/medical-assistance/request")}
                h="60px"
                w={{ base: "100%", md: "70%" }}
              >
                Request Assistance
              </Button>
            </Box>
            <Text
              textTransform="capitalize"
              w={{ base: "100%", md: "60%" }}
              fontSize="28px"
              display="none"
              fontWeight={700}
            >
              You are <span style={{ color: "#086375" }}>not eligible</span> to
              Request for Leave at the moment
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Box>
          <Box display={data?.data?.length ? "block" : "none"}>
            <Text
              fontSize={{ base: "35px", md: "48px" }}
              fontWeight={500}
              color="#090c02"
            >
              Medical Assistance History
            </Text>
            <Text
              fontSize={{ base: "", md: "18px" }}
              opacity={0.5}
              color="#090c02"
            >
              The table displays your history of medical assistance requests.
              For extra information or assistance, please contact administrator.
            </Text>

            <Box mt="24px">
              <Flex
                align="center"
                border="1px solid #086375"
                borderRadius="20px"
                p={{ base: "25px", md: "40px" }}
                justifyContent="flex-end"
                w="full"
              >
                <Box>
                  <Flex
                    align="center"
                    gap="10px"
                    bg="#086375"
                    borderRadius="8px"
                    py={{ base: "13px", md: "16px" }}
                    cursor="pointer"
                    onClick={() =>
                      navigate("/staff/medical-assistance/request")
                    }
                    _hover={{ opacity: 0.8 }}
                    transition=".3s ease-in-out"
                    px={{ base: "13px", md: "24px" }}
                  >
                    <Image src="/assets/copy.svg" />
                    <Text
                      color="#fff"
                      fontWeight={500}
                      fontSize={{ base: "13px", md: "16px" }}
                    >
                      Request Assistance
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>

          <TableLayer
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            data={data}
            startRow={startRow}
            endRow={endRow}
            limit={limit}
            isLoading={isLoading}
          />
        </Box>
      )}
    </Box>
  );
};

export default Medical;
