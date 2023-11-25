import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatDate } from "../../../utils/helpers";
import { useGetClientDetails } from "../../../services/client/query/user";

export const Layout = ({ label, data }) => {
  return (
    <Flex
      mb="24px"
      color="#646668"
      justifyContent="space-between"
      w="full"
      align="center"
    >
      <Text lineHeight="100%" fontSize="12px">
        {label}
      </Text>
      <Text
        lineHeight="100%"
        color={data === "Active" ? "#008000" : data === "Inactive" ? "red" : ""}
        fontSize="14px"
        fontWeight={500}
      >
        {data}
      </Text>
    </Flex>
  );
};

const Profile = () => {
  const { data: userData } = useGetClientDetails();

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          border="1px solid #D4D6D8"
          py="40px"
          px="32px"
          justifyContent="center"
          align="center"
          w={{ md: "27rem", base: "100%", "3xl": "30rem" }}
          flexDir="column"
        >
          <Text
            mb="32px"
            fontSize="20px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            Client Profile
          </Text>

          <Box as="form" mb="24px">
            <Flex
              border="4px solid #ee383a"
              rounded="full"
              w="fit-content"
              bg="#D4D6D8"
              justifyContent="center"
              p={userData?.logo === null ? "44px" : ""}
              align="center"
              flexDir="column"
            >
              <Image
                w={userData?.logo === null ? "32px" : "120px"}
                rounded={userData?.logo === null ? "" : "full"}
                objectFit="cover"
                h={userData?.logo === null ? "32px" : "120px"}
                src={
                  userData?.logo === null
                    ? "/assets/cam.svg"
                    : process.env.REACT_APP_BASE_URL + userData?.logo
                }
              />
            </Flex>
          </Box>

          <Layout label="Name" data={userData?.name} />
          <Layout label="Contact Person" data={userData?.contactPerson} />
          <Layout label="Date Joined" data={formatDate(userData?.createdAt)} />
          <Layout label="Phone" data={userData?.phone} />
          <Layout label="Email" data={userData?.email} />
          <Layout label="Billing Email" data={userData?.billingEmail} />
          <Layout label="Address" data={userData?.address} />
          <Layout label="State" data={userData?.state} />
          <Layout
            label="Status"
            data={userData?.status === 1 ? "Active" : "Inactive"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;
