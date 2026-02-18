import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../../services/attendant/query/user";
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
      <Text lineHeight="100%" fontSize="14px">
        {label}
      </Text>
      <Text
        lineHeight="100%"
        color={data === "Active" ? "#008000" : data === "Inactive" ? "red" : ""}
        fontWeight={500}
      >
        {data}
      </Text>
    </Flex>
  );
};

const index = () => {
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
          w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
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
              p={userData?.avatar ? "" : "44px"}
              align="center"
              flexDir="column"
            >
              <Image
                w={userData?.avatar ? "120px" : "32px"}
                rounded={userData?.avatar ? "full" : ""}
                objectFit="cover"
                h={userData?.avatar ? "120px" : "32px"}
                src={
                  userData?.avatar
                    ? process.env.REACT_APP_BASE_URL + userData?.avatar
                    : "/assets/cam.svg"
                }
              />
            </Flex>
          </Box>

          <Text my="16px" fontWeight={500} lineHeight="100%" color="#646668">
            {userData?.name}
          </Text>

          <Button
            onClick={() => navigate("/attendant/profile/update")}
            px="20px"
            mb="33px"
            py="9px"
            fontSize="12px"
            fontWeight={500}
          >
            Edit Profile
          </Button>

          <Layout label="Name" data={userData?.name} />
          <Layout label="Account Type" data={userData?.accountType} />
          <Layout label="Date Joined" data={formatDate(userData?.createdAt)} />
          <Layout
            label="Status"
            data={userData?.status ? "Active" : "Inactive"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default index;
