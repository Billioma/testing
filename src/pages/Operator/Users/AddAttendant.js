import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../components/common/CustomInput";
import { accountType } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useCreateAttendant } from "../../../services/operator/query/attendants";
import { useGetOperatorLocation } from "../../../services/operator/query/user";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import useCustomToast from "../../../utils/notifications";
import {
  initAttendantValues,
  validateAttendantSchema,
} from "../../../utils/validation";

const AddAttendant = () => {
  const navigate = useNavigate();

  const { data: location } = useGetOperatorLocation();

  const accountOptions = accountType?.map((type) => ({
    value: type,
    label: type,
  }));

  const locationOptions = location?.data?.map((location) => ({
    value: location?.id,
    label: location?.name,
  }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };

  const { errorToast, successToast } = useCustomToast();
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

  const { mutate: createMutate, isLoading: isCreating } = useCreateAttendant({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/users/attendants");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const [fileType, setFileType] = useState("");

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadMutate({
      fileType: "image",
      entityType: "client",
      file: formData.get("file"),
    });
  };

  const [show, setShow] = useState(false);

  const handleSubmit = (values = "") => {
    const { accountType, location, ...rest } = values;
    createMutate({
      ...rest,
      accountType: accountType?.value,
      locations: location?.map((dat) => dat?.value),
      avatar: profilePicData?.path,
    });
  };

  return (
    <Box minH="75vh">
      {" "}
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <Flex
          onClick={() => navigate(-1)}
          color="#242628"
          align="center"
          cursor="pointer"
          mb="23px"
          w="fit-content"
          pos="sticky"
          top="7rem"
          gap="8px"
        >
          <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
          <Text fontSize="14px" fontWeight={500} lineHeight="100%">
            Back
          </Text>
        </Flex>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            border="1px solid #D4D6D8"
            px="28px"
            py="32px"
            justifyContent="center"
            align="center"
            w={{ base: "full", md: "27rem" }}
            flexDir="column"
          >
            <Text
              fontSize="10px"
              fontWeight={500}
              lineHeight="100%"
              mb="8px"
              color="#444648"
            >
              Avatar
            </Text>

            <Input
              id="image_upload"
              onChange={handleUpload}
              type="file"
              display="none"
            />
            <label htmlFor="image_upload">
              <Flex
                flexDir="column"
                cursor="pointer"
                justifyContent="center"
                align="center"
                w="full"
              >
                {isUploading ? (
                  <Spinner />
                ) : (
                  <Image
                    rounded="full"
                    objectFit="cover"
                    w="120px"
                    border={fileType ? "4px solid #0D0718" : ""}
                    h="120px"
                    borderRadius="12px"
                    src={fileType || "/assets/prof-avatar.jpg"}
                  />
                )}
              </Flex>
            </label>

            <Box mt="24px" w="full">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initAttendantValues}
                validationSchema={validateAttendantSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setValues,
                  isValid,
                  dirty,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Full Name
                      </Text>
                      <CustomInput
                        name="name"
                        value={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.name && touched?.name && errors?.name}
                        holder="Enter Full Name"
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Password
                      </Text>
                      <CustomInput
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.password &&
                          touched?.password &&
                          errors?.password
                        }
                        holder="Enter Password"
                        onClick={() => setShow((prev) => !prev)}
                        password={show ? false : true}
                        show
                        type={show ? "text" : "password"}
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Confirm Password
                      </Text>
                      <CustomInput
                        name="passwordConfirmation"
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.passwordConfirmation &&
                          touched?.passwordConfirmation &&
                          errors?.passwordConfirmation
                        }
                        holder="Confirm Password"
                        onClick={() => setShow((prev) => !prev)}
                        password={show ? false : true}
                        show
                        type={show ? "text" : "password"}
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        User ID
                      </Text>
                      <CustomInput
                        name="userId"
                        value={values.userId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.userId && touched?.userId && errors?.userId
                        }
                        holder="Enter User ID"
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Select Account Type
                      </Text>
                      <Select
                        styles={customStyles}
                        value={values.accountType}
                        options={accountOptions}
                        components={{
                          IndicatorSeparator: () => (
                            <div style={{ display: "none" }}></div>
                          ),
                          DropdownIndicator: () => (
                            <div>
                              <IoIosArrowDown size="15px" color="#646668" />
                            </div>
                          ),
                        }}
                        name="accountType"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            accountType: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Assigned Locations
                      </Text>
                      <Select
                        styles={customStyles}
                        options={locationOptions}
                        isMulti
                        value={values.location}
                        defaultValue={values.location}
                        components={{
                          IndicatorSeparator: () => (
                            <div style={{ display: "none" }}></div>
                          ),
                          DropdownIndicator: () => (
                            <div>
                              <IoIosArrowDown size="15px" color="#646668" />
                            </div>
                          ),
                        }}
                        name="location"
                        onChange={(selectedOption) =>
                          setValues({ ...values, location: selectedOption })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Flex mt="24px" align="center" w="full" gap="24px">
                      <Button
                        bg="transparent"
                        w="70%"
                        border="1px solid #646668"
                        color="#646668"
                        fontWeight={500}
                        lineHeight="100%"
                        fontSize="14px"
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        _focus={{ bg: "transparent" }}
                        px="26px"
                        py="17px"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="#fff"
                        fontWeight={500}
                        lineHeight="100%"
                        isLoading={isCreating}
                        w="full"
                        type="submit"
                        fontSize="12px"
                        isDisabled={
                          !isValid || !dirty || !values.location.length
                        }
                        px="26px"
                        py="17px"
                      >
                        Save
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddAttendant;
