import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useAddClient } from "../../../services/admin/query/clients";
import { Form, Formik } from "formik";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetManagers } from "../../../services/admin/query/users";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import {
  initPermisisonValues,
  validatePermissionSchema,
} from "../../../utils/validation";
import { IoIosArrowDown } from "react-icons/io";
import { allStates, statusType } from "../../../components/common/constants";
import { useAddPermission } from "../../../services/admin/query/configurations";

export default function AddPermissions() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [show, setShow] = useState(false);

  const { mutate, isLoading } = useAddPermission({
    onSuccess: () => {
      successToast("Permission added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_PERMISSIONS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
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

  const { data: managers } = useGetManagers();

  const managerOptions = managers?.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: manager.id,
  }));

  const accountTypes = ["BUSINESS", "EVENT_PLANNER", "CORPORATE", "OTHERS"].map(
    (type, index) => ({ label: type, value: index })
  );

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));
  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleSubmit = (values = "") => {
    const { accountType, state, status, phone, managers, ...rest } = values;
    mutate({
      ...rest,
      accountType: accountType?.value,
      status: status?.value,
      phone: `+234${Number(phone)}`,
      state: state?.value,
      managers: managers?.map((dat) => dat?.value),
      logo: profilePicData?.path,
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
            w={{ md: "30rem", base: "100%" }}
            flexDir="column"
            border="1px solid #D4D6D8"
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initPermisisonValues}
              validationSchema={validatePermissionSchema}
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
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Name
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Permission Name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.name && touched?.name && errors?.name}
                    />
                  </Box>
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Display Name
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Display name"
                      name="displayName"
                      value={values?.displayName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.displayName &&
                        touched?.displayName &&
                        errors?.displayName
                      }
                    />
                  </Box>
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Group Name
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Group Name"
                      name="tableName"
                      value={values?.tableName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.tableName &&
                        touched?.tableName &&
                        errors?.tableName
                      }
                    />
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_CONFIG_PERMISSIONS)}
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
