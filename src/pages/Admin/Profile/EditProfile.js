import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../components/common/CustomInput";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useAdminUpdateUser,
  useCustomerUploadPic,
} from "../../../services/customer/query/user";
import useCustomToast from "../../../utils/notifications";
import { useGetProfile } from "../../../services/admin/query/auth";

const EditProfile = () => {
  const [fileType, setFileType] = useState("");
  const navigate = useNavigate();
  const { data: userData, refetch } = useGetProfile();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAdminUpdateUser({
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
  const {
    mutate: uploadMutate,
    isLoading: isUploading,
    data: profilePicData,
  } = useCustomerUploadPic({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    uploadMutate({
      fileType: "avatar",
      entityType: "admin",
      file: formData.get("avatar"),
    });
  };

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
      avatar: profilePicData?.path || values.pic,
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

              <Box as="form">
                <Input
                  id="image_upload"
                  onChange={handleUpload}
                  type="file"
                  isDisabled
                  display="none"
                  borderColor="black"
                />
                <label htmlFor="image_upload">
                  <Flex
                    //   cursor="pointer"
                    border="4px solid #ee383a"
                    p={
                      isUploading
                        ? "44px"
                        : fileType || userData?.avatar !== null
                        ? ""
                        : "44px"
                    }
                    rounded="full"
                    w="fit-content"
                    bg="#D4D6D8"
                    justifyContent="center"
                    align="center"
                    flexDir="column"
                  >
                    {isUploading ? (
                      <Spinner />
                    ) : (
                      <Image
                        w={
                          fileType || userData?.avatar !== null
                            ? "120px"
                            : "32px"
                        }
                        rounded={
                          fileType || userData?.avatar !== null ? "full" : ""
                        }
                        objectFit="cover"
                        h={
                          fileType || userData?.avatar !== null
                            ? "120px"
                            : "32px"
                        }
                        src={
                          fileType
                            ? fileType
                            : userData?.avatar === null
                            ? "/assets/cam.svg"
                            : userData?.avatar
                        }
                      />
                    )}
                  </Flex>
                </label>
              </Box>
            </Flex>
            <Box w="full" mt="16px">
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Email
              </Text>
              <CustomInput
                auth
                mb
                dis
                value={userData?.email}
                holder="Email Address"
              />
            </Box>
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

            <Button
              mt="24px"
              onClick={handleSubmit}
              // isDisabled={isUploading || isLoading}
              isDisabled
              isLoading={isLoading}
              type="submit"
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
