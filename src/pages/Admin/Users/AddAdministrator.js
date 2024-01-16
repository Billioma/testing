import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCreateAdministrator } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import { useGetAllRoles } from "../../../services/admin/query/roles";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import {
  initAdminValues,
  validateAdminSchema,
} from "../../../utils/validation";
import { statusType } from "../../../components/common/constants";
import { useGetAttendants } from "../../../services/admin/query/users";

export default function AddAttendants() {
  const [fileType, setFileType] = useState("");
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
    formData.append("file", selectedFile);
    uploadMutate({
      fileType: "avatar",
      entityType: "client",
      file: formData.get("file"),
    });
  };

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { data: allRoles } = useGetAllRoles();

  const { data: attendants } = useGetAttendants({}, 1, 1000);

  const attendantOptions = attendants?.data?.map((attendant) => ({
    value: parseInt(attendant?.id),
    label: attendant?.name,
  }));

  const roleOptions = allRoles?.data?.map((role) => ({
    label: role.displayName,
    value: parseInt(role.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const { mutate, isLoading } = useCreateAdministrator({
    onSuccess: () => {
      successToast("Administrator added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ADMINISTRATORS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const { status, attendant, role, ...rest } = values;
    mutate({
      ...rest,
      status: status?.value,
      attendant: attendant?.value,
      role: Number(role?.value),
      avatar: profilePicData?.path,
    });
  };

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <GoBackTab />
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="28px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Box alignSelf={"center"} mb={5}>
              <Text
                fontSize="12px"
                fontWeight={500}
                color="#444648"
                textAlign="center"
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
            </Box>

            <Formik
              onSubmit={handleSubmit}
              initialValues={initAdminValues}
              validationSchema={validateAdminSchema}
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
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      First Name{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter first name"
                      name="firstName"
                      value={values?.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.firstName &&
                        touched?.firstName &&
                        errors?.firstName
                      }
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Last Name{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter last name"
                      name="lastName"
                      value={values?.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.lastName &&
                        touched?.lastName &&
                        errors?.lastName
                      }
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Email Address{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter email address"
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.email && touched?.email && errors?.email}
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Password{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      mb
                      name="password"
                      value={values?.password}
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
                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Comfirm Password{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      mb
                      name="passwordConfirmation"
                      value={values?.passwordConfirmation}
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
                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Default Role{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={customStyles}
                      options={roleOptions}
                      placeholder="Select role"
                      name="role"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          role: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      value={values?.role}
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
                    />
                  </Box>
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      This user is a manager
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          isManager: values?.isManager ? 0 : 1,
                        })
                      }
                      value={values?.isManager}
                      isChecked={values?.isManager ? true : false}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Attendant{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select attendant"
                      options={attendantOptions}
                      name="attendant"
                      onChange={(selectedOption) => {
                        setValues({
                          ...values,
                          attendant: selectedOption,
                        });
                      }}
                      onBlur={handleBlur}
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
                    />
                  </Box>

                  <Box>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Status{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={customStyles}
                      options={statusOptions}
                      name="status"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          status: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
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
                    />
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() =>
                        navigate(PRIVATE_PATHS.ADMIN_ADMINISTRATORS)
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isDisabled={!isValid || !dirty}
                      isLoading={isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
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
    fontSize: "15px",
    backgroundColor: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "" : "",
    backgroundColor: state.isFocused ? "#f4f6f8" : "",
  }),
};
