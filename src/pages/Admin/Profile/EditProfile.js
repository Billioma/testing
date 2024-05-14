import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AdminCustomInput from "../../../components/common/AdminCustomInput";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import useCustomToast from "../../../utils/notifications";
import {
  useGetProfile,
  useUpdateAdminProfile,
} from "../../../services/admin/query/auth";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: userData, refetch } = useGetProfile();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useUpdateAdminProfile({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setTimeout(() => {
        navigate("/admin/profile");
      }, 200);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    pic: "",
  });

  const handleChange = (e, { name }) => {
    {
      setValues({
        ...values,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = () => {
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
    });
  };

  useEffect(() => {
    if (userData) {
      setValues({
        ...values,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        pic: userData?.avatar?.replace("https://staging-api.ezpark.ng/", ""),
      });
    }
  }, [userData]);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            border="1px solid #D4D6D8"
            py="30px"
            px={{ base: "24px", md: "25px" }}
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
          >
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Text
                mb="20px"
                fontSize="20px"
                fontWeight={500}
                lineHeight="100%"
                color="#242628"
              >
                Edit Profile
              </Text>

              <Flex
                border="4px solid #ee383a"
                p="44px"
                rounded="full"
                w="fit-content"
                bg="#D4D6D8"
                justifyContent="center"
                align="center"
                flexDir="column"
              >
                <Image
                  w="32px"
                  rounded="full"
                  objectFit="cover"
                  h="32px"
                  src="/assets/cam.svg"
                />
              </Flex>
            </Flex>
            <Box w="full" mt="16px">
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
                Email
              </Text>
              <AdminCustomInput
                auth
                mb
                dis
                value={userData?.email}
                holder="Email Address"
              />
            </Box>
            <Box w="full" mt="16px">
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
                First Name
              </Text>
              <AdminCustomInput
                auth
                mb
                value={values?.firstName}
                onChange={(value) =>
                  handleChange(value, {
                    name: "firstName",
                  })
                }
                holder="Enter First Name"
              />
            </Box>

            <Box w="full" mt="16px">
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
                Last Name
              </Text>
              <AdminCustomInput
                mb
                auth
                value={values?.lastName}
                onChange={(value) =>
                  handleChange(value, {
                    name: "lastName",
                  })
                }
                holder="Enter Last Name"
              />
            </Box>

            <Button
              mt="24px"
              onClick={handleSubmit}
              isDisabled={isLoading}
              isLoading={isLoading}
              w="full"
            >
              Save Changes
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EditProfile;
