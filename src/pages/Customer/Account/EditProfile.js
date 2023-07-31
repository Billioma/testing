import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/common/CustomInput";
import {
  useCustomerUpdateUser,
  useCustomerUploadPic,
  useGetUser,
} from "../../../services/query/user";
import useCustomToast from "../../../utils/notifications";

const EditProfile = () => {
  const [fileType, setFileType] = useState("");
  const navigate = useNavigate();
  const { data: userData, refetch } = useGetUser();

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useCustomerUpdateUser({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setTimeout(() => {
        navigate("/customer/account/profile");
      }, 200);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const { mutate: uploadMutate, isLoading: isUploading } = useCustomerUploadPic(
    {
      onSuccess: (res) => {
        successToast(res?.message);
        refetch();
        setTimeout(() => {
          navigate("/customer/account/profile");
        }, 200);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occured"
        );
      },
    }
  );
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      // No file was selected, handle this case accordingly (optional)
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // uploadMutate(formData);
  };

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
  });

  const handleChange = (e, { name }) => {
    if (name === "phone") {
      const inputPhone = e.target.value.replace(/\D/g, "").slice(0, 10);
      setValues({
        ...values,
        [name]: inputPhone,
      });
    } else {
      setValues({
        ...values,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = () => {
    const phoneNumber = `+234${values.phone}`;
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: phoneNumber,
      companyName: values.companyName === "N/A" ? "" : values.companyName,
    });
  };

  useEffect(() => {
    if (userData) {
      setValues({
        ...values,
        firstName: userData?.profile?.firstName,
        lastName: userData?.profile?.lastName,
        phone: userData?.profile?.phone?.replace("+234", ""),
        companyName: userData?.profile?.companyName,
      });
    }
  }, [userData]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px="62px"
          w="30rem"
          flexDir="column"
        >
          <Flex
            justifyContent="center"
            align="center"
            w="full"
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
          </Flex>
          <Box w="full" mt="16px">
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              First Name
            </Text>
            <CustomInput
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
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Last Name
            </Text>
            <CustomInput
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

          <Box mt="10px">
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Phone Number
            </Text>
            <CustomInput
              mb
              auth
              ngn
              value={`${values?.phone}`}
              onChange={(value) =>
                handleChange(value, {
                  name: "phone",
                })
              }
              holder="Enter Phone Number"
            />
          </Box>

          <Box mt="16px">
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Company Name
            </Text>
            <CustomInput
              mb
              auth
              value={values?.companyName}
              onChange={(value) =>
                handleChange(value, {
                  name: "companyName",
                })
              }
              holder={values?.companyName ? "Enter Company Name" : "N/A"}
            />
          </Box>

          <Box mt="16px">
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Address
            </Text>
            <CustomInput
              mb
              auth
              onChange={(value) => console.log(value)}
              value={values?.address}
              holder="Enter Address"
            />
          </Box>

          <Flex
            mt="12px"
            color="red"
            fontSize="12px"
            fontWeight={500}
            lineHeight="100%"
            justifyContent="flex-end"
            w="full"
          >
            <Text textDecor="underline">Add Another Address</Text>
          </Flex>

          <Button
            mt="24px"
            onClick={handleSubmit}
            isLoading={isLoading}
            type="submit"
            w="full"
          >
            Save Changes
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EditProfile;
