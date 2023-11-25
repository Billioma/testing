import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../../services/customer/query/user";
import { formatDate } from "../../../utils/helpers";
import { useGetProfile } from "../../../services/admin/query/auth";

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

  const { data: userData, isLoading: isUser } = useGetProfile();

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          border="1px solid #D4D6D8"
          py="30px"
          px="25px"
          justifyContent="center"
          align="center"
          w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
          flexDir="column"
        >
          <Text
            mb="20px"
            fontSize="20px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            User Profile
          </Text>

          <Box as="form">
            <Flex
              border="4px solid #ee383a"
              rounded="full"
              w="fit-content"
              bg="#D4D6D8"
              justifyContent="center"
              p={userData?.avatar?.includes("null") ? "" : "44px"}
              align="center"
              flexDir="column"
            >
              <Image
                w={userData?.avatar?.includes("null") ? "120px" : "32px"}
                rounded={userData?.avatar?.includes("null") ? "full" : ""}
                objectFit="cover"
                h={userData?.avatar?.includes("null") ? "120px" : "32px"}
                src={
                  userData?.avatar?.includes("null")
                    ? userData?.avatar
                    : "/assets/cam.svg"
                }
              />
            </Flex>
          </Box>

          <Button
            onClick={() => navigate("/admin/update-profile")}
            px="20px"
            mt="15px"
            mb="25px"
            py="9px"
            fontSize="10px"
            fontWeight={500}
          >
            Edit Profile
          </Button>

          <Layout
            label="Name"
            data={`${userData?.firstName} ${userData?.lastName}`}
          />
          <Layout label="Email" data={userData?.email} />
          <Layout label="Date Joined" data={formatDate(userData?.createdAt)} />
          <Layout label="Role" data={userData?.role?.displayName} />

          <Layout
            label="Status"
            data={userData?.status === 1 ? "Active" : "Inactive"}
          />

          <Button
            onClick={() => navigate("/admin/reset-password")}
            px="20px"
            isDisabled
            w="full"
            py="9px"
            bg="#000"
            fontSize="13px"
            fontWeight={500}
          >
            Change Password
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;
