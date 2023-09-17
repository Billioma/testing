import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDate } from "../../../utils/helpers";
import { useGetOperatorProfile } from "../../../services/operator/query/user";
import UpdateOperatorModal from "../../../components/modals/UpdateOperatorModal";
import UpdateOperatorPasswordModal from "../../../components/modals/UpdateOperatorPasswordModal";

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
  const { data: userData, refetch } = useGetOperatorProfile();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);

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
          w={{ base: "full", md: "27rem" }}
          flexDir="column"
        >
          <Text
            mb="32px"
            fontSize="20px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            Operator Profile
          </Text>

          <Box as="form" mb="24px">
            <Flex
              border="4px solid #ee383a"
              rounded="full"
              w="fit-content"
              bg="#D4D6D8"
              justifyContent="center"
              p={"44px"}
              align="center"
              flexDir="column"
            >
              <Image
                w={"32px"}
                objectFit="cover"
                h={"32px"}
                src={"/assets/cam.svg"}
              />
            </Flex>
          </Box>

          <Layout label="Name" data={userData?.name} />
          <Layout label="Email" data={userData?.email} />
          <Layout label="Date Joined" data={formatDate(userData?.createdAt)} />
          <Layout label="Role" data="Operator" />
          <Layout
            label="Status"
            data={userData?.status === 1 ? "Active" : "Inactive"}
          />

          <Flex mt="33px" align="center" w="full" gap="24px">
            <Button
              bg="transparent"
              w="100%"
              border="1px solid #A11212"
              color="#A11212"
              fontWeight={500}
              lineHeight="100%"
              fontSize="14px"
              onClick={() => setShow(true)}
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              _focus={{ bg: "transparent" }}
              px="26px"
              py="17px"
            >
              Change Password
            </Button>
            <Button
              color="#fff"
              fontWeight={500}
              lineHeight="100%"
              w="100%"
              fontSize="12px"
              onClick={onOpen}
              px="26px"
              py="17px"
              bg="#000"
              _hover={{ bg: "#000" }}
              _active={{ bg: "#000" }}
              _focus={{ bg: "#000" }}
            >
              Edit Profile
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <UpdateOperatorModal
        isOpen={isOpen}
        onClose={onClose}
        userData={userData}
        refetch={refetch}
      />
      <UpdateOperatorPasswordModal
        isOpen={show}
        onClose={() => setShow(false)}
      />
    </Box>
  );
};

export default Profile;
