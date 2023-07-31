import React, { useState } from "react";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../../services/query/user";
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
  const [fileType, setFileType] = useState("");
  const navigate = useNavigate();

  const { data: userData } = useGetUser();

  const handleUpload = (e) => {
    setFileType(URL.createObjectURL(e.target.files[0]));
  };

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
          w="30rem"
          flexDir="column"
        >
          <Text
            mb="32px"
            fontSize="20px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            Edit Profile
          </Text>

          <Box as="form">
            <Input
              id="image_upload"
              onChange={handleUpload}
              type="file"
              display="none"
              borderColor="black"
            />
            <label htmlFor="image_upload">
              <Flex
                cursor="pointer"
                border="4px solid #ee383a"
                p={fileType ? "" : "44px"}
                rounded="full"
                w="fit-content"
                bg="#D4D6D8"
                justifyContent="center"
                align="center"
                flexDir="column"
              >
                <Image
                  w={fileType ? "120px" : "32px"}
                  rounded={fileType ? "full" : ""}
                  objectFit="cover"
                  h={fileType ? "120px" : "32px"}
                  src={fileType ? fileType : "/assets/cam.svg"}
                />
              </Flex>
            </label>
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
            label="Company Data"
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
