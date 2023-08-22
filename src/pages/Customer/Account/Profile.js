import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../../services/customer/query/user";
import { formatDate } from "../../../utils/helpers";

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
  const navigate = useNavigate();

  const { data: userData } = useGetUser();

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px="32px"
          justifyContent="center"
          align="center"
          w={{ base: "full", md: "30rem" }}
          flexDir="column"
        >
          <Text
            mb="32px"
            fontSize="20px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          ></Text>

          <Box as="form">
            <Flex
              border="4px solid #ee383a"
              rounded="full"
              w="fit-content"
              bg="#D4D6D8"
              justifyContent="center"
              p={!userData?.profile?.avatarUrl?.includes("null") ? "" : "44px"}
              align="center"
              flexDir="column"
            >
              <Image
                w={
                  !userData?.profile?.avatarUrl?.includes("null")
                    ? "120px"
                    : "32px"
                }
                rounded={
                  !userData?.profile?.avatarUrl?.includes("null") ? "full" : ""
                }
                objectFit="cover"
                h={
                  !userData?.profile?.avatarUrl?.includes("null")
                    ? "120px"
                    : "32px"
                }
                src={
                  !userData?.profile?.avatarUrl?.includes("null")
                    ? userData?.profile?.avatarUrl
                    : "/assets/cam.svg"
                }
              />
            </Flex>
          </Box>

          <Text my="16px" fontWeight={500} lineHeight="100%" color="#646668">
            Bilal Omari
          </Text>

          <Button
            onClick={() => navigate("/customer/account/update-profile")}
            px="20px"
            mb="33px"
            py="9px"
            fontSize="10px"
            fontWeight={500}
          >
            Edit Profile
          </Button>

          <Layout
            label="Name"
            data={`${userData?.profile?.firstName} ${userData?.profile?.lastName}`}
          />
          <Layout label="Email" data={userData?.email} />
          <Layout
            label="Date Joined"
            data={formatDate(userData?.profile?.createdAt)}
          />
          <Layout label="Phone" data={userData?.profile?.phone} />
          <Layout
            label="Company Name"
            data={userData?.profile?.companyName || "N/A"}
          />
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
