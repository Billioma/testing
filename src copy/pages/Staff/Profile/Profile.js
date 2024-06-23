import React from "react";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { useGetUser } from "../../../services/staff/query/user";
import { formatDate } from "../../../utils/helpers";

export const Layout = ({ label, data, email }) => {
  return (
    <Flex
      align="center"
      mb="20px"
      justifyContent="space-between"
      w={{ base: "100%", md: "50%" }}
    >
      <Text fontSize="12px" w="full" fontWeight={700} color="#999999">
        {label}
      </Text>
      <Text
        textAlign={{ base: "end", md: "start" }}
        textTransform={email ? "lowercase" : "capitalize"}
        fontSize="14px"
        w="full"
        fontWeight={500}
        color="#090c02"
      >
        {data?.label || data}
      </Text>
    </Flex>
  );
};

const Profile = () => {
  const { data: userData } = useGetUser();

  return (
    <Box>
      <Flex align="center" gap="18px">
        <Avatar w="60px" h="60px" />

        <Flex flexDir="column" gap="8px">
          <Text fontWeight={700}>{userData?.fullName}</Text>

          <Flex align="center" gap="4px">
            <Image
              src="/assets/bag.svg"
              w="16px"
              h="16px"
              objectFit="contain"
            />
            <Text fontSize="12px" fontWeight={500}>
              {userData?.jobTitle?.name || "N/A"}
            </Text>
          </Flex>

          <Flex
            bg="#08637533"
            w="fit-content"
            borderRadius="2px"
            py="4px"
            px="8px"
          >
            <Text
              color="#086375"
              opacity={0.6}
              fontSize="12px"
              fontWeight={500}
            >
              ID: {userData?.staffId}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        borderRadius="8px"
        py="30px"
        px={{ base: "15px", md: "34px" }}
        mt="24px"
        justifyContent="center"
        w="full"
        flexDir="column"
        border="1px solid #E2E5DC"
      >
        <Box
          fontSize="18px"
          w="full"
          borderBottom="1px solid #E2E5DC"
          pb="12px"
        >
          <Text fontWeight={700}>Personal Information</Text>
        </Box>

        <Box mt="20px">
          <Layout label="FULL NAME" data={userData?.fullName} />
          <Layout
            label="PHONE NUMBER 1 (PRIMARY)"
            data={userData?.phoneNumber}
          />
          <Layout
            label="PHONE NUMBER 2 (SECONDARY)"
            data={userData?.secondaryPhoneNumber || "N/A"}
          />
          <Layout
            label="RESIDENTIAL ADDRESS 1 (PRIMARY)"
            data={userData?.residentialAddress}
          />
          <Layout
            label="RESIDENTIAL ADDRESS 2 (SECONDARY)"
            data={userData?.secondaryResidentialAddress || "N/A"}
          />
          <Layout label="EMAIL" email data={userData?.email} />
          <Layout label="GUARANTOR 1" data={userData?.guarantor1} />
          <Layout label="GUARANTOR 2" data={userData?.guarantor2} />
          <Layout
            label="DATE OF BIRTH"
            data={formatDate(userData?.dateOfBirth)}
          />

          <Flex mt="4px" align="center" gap="12px">
            <Text fontWeight={500} color="#090c02">
              Line Manager:
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
                {userData?.department?.lineManager?.fullName}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Flex
        borderRadius="8px"
        py="30px"
        px={{ base: "15px", md: "34px" }}
        mt="24px"
        justifyContent="center"
        w="full"
        flexDir="column"
        border="1px solid #E2E5DC"
      >
        <Box
          fontSize="18px"
          w="full"
          borderBottom="1px solid #E2E5DC"
          pb="12px"
        >
          <Text fontWeight={700}>Next of Kin</Text>
        </Box>

        <Box mt="20px">
          <Layout label="FULL NAME" data={userData?.nextOfKin} />
          <Layout label="PHONE NUMBER" data={userData?.nextOfKinPhone} />
          <Layout
            label="RESIDENTIAL ADDRESS"
            data={userData?.nextOfKinAddress}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
