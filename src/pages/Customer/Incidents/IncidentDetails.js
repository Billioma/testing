import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Status } from "../../../components/common/constants";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { PiWarningCircleFill } from "react-icons/pi";
import ClaimDocs from "../../../components/modals/ClaimDocs";
import { useGetIncident } from "../../../services/customer/query/user";
import { useParams } from "react-router-dom";
import { formatDat } from "../../../utils/helpers";

export const Layout = ({ label, data }) => {
  return (
    <Flex
      mb="24px"
      align={{
        base: label === "Location" ? "flex-start" : "center",
        md: "center",
      }}
      lineHeight="100%"
      gap={{
        base: label === "Location" ? "10px" : "unset",
        md: "unset",
      }}
      fontSize="15px"
      flexDir={{ base: label === "Location" ? "column" : "row", md: "row" }}
      fontWeight={500}
      justifyContent="space-between"
      w="full"
    >
      <Box w="full">
        <Text color="#848688">{label}</Text>
      </Box>
      <Flex
        justifyContent={{
          base: label === "Location" ? "flex-start" : "flex-end",
          md: "flex-end",
        }}
        w={{
          base: label === "Selected Vehicle" ? "fit-content" : "full",
          md: "full",
        }}
      >
        <Text
          color={
            data === "Completed"
              ? "#075F14"
              : data === "Pending"
              ? "#F9A11E"
              : data === "Cancelled"
              ? "#E81313"
              : "#242628"
          }
        >
          {data}
        </Text>
      </Flex>
    </Flex>
  );
};

const IncidentDetails = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { id } = useParams();

  const { mutate, data, isLoading } = useGetIncident();

  useEffect(() => {
    mutate(id);
  }, []);

  return (
    <Box minH="75vh">
      <ClaimDocs isOpen={isOpen} onClose={onClose} />
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Flex
                bg="#fff"
                borderRadius="12px"
                py="40px"
                px="32px"
                justifyContent="center"
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
                flexDir="column"
              >
                <Flex
                  bg="#FFEED5"
                  borderRadius="8px"
                  justifyContent="center"
                  display="none"
                  mb="25px"
                  align="center"
                  onClick={onOpen}
                  h="44px"
                  gap="12px"
                  cursor="pointer"
                  color="#F79E1B"
                >
                  <PiWarningCircleFill />
                  <Text fontSize="14px" fontWeight={500}>
                    Upload Required Documents
                  </Text>
                </Flex>

                <Flex
                  flexDir="column"
                  p="24px"
                  align="center"
                  pb="0"
                  w="full"
                  border="1px solid #d4d6d8"
                  borderRadius="8px"
                >
                  <Image
                    src="/assets/claim.svg"
                    w="40px"
                    h="40px"
                    objectFit="cover"
                  />
                  <Text
                    mt="16px"
                    fontWeight={500}
                    lineHeight="100%"
                    color="#242628"
                  >
                    # {data?.id}
                  </Text>

                  <Flex
                    mt="14px"
                    justifyContent="center"
                    align="center"
                    w="full"
                  >
                    <Flex
                      color={
                        Status.find(
                          (dat) =>
                            dat.name?.toLowerCase() ===
                            data?.status?.toLowerCase()
                        )?.color || ""
                      }
                      bg={
                        Status.find(
                          (dat) =>
                            dat.name?.toLowerCase() ===
                            data?.status?.toLowerCase()
                        )?.bg || ""
                      }
                      py="5px"
                      px="16px"
                      fontWeight={500}
                      fontSize="12px"
                      w="fit-content"
                      justifyContent="center"
                      borderRadius="4px"
                      textTransform="capitalize"
                      align="center"
                    >
                      {data?.status?.toLowerCase()}
                    </Flex>
                  </Flex>

                  <Box mt="28px" w="full">
                    {/* <Layout label="Transaction ID" data="23BND81" /> */}
                    <Layout
                      label="Service Type"
                      data={data?.serviceLog?.service?.name}
                    />
                    <Layout
                      label="Vehicle"
                      data={`${data?.serviceLog?.vehicle?.make?.name} ${data?.serviceLog?.vehicle?.model?.name}`}
                    />
                    <Layout
                      label="Location"
                      data={data?.serviceLog?.location?.name || "N/A"}
                    />
                    <Layout
                      label="Last Updated"
                      data={formatDat(data?.updatedAt)}
                    />
                    <Layout
                      label="Date of Incident"
                      data={formatDat(data?.createdAt)}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default IncidentDetails;
