import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Switch,
  Spinner,
  Input,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useEditAdmin, useGetAdmin } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import { useGetAllRoles } from "../../../services/admin/query/roles";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { customStyles, statusType } from "../../../components/common/constants";
import UpdateOperatorPasswordModal from "../../../components/modals/UpdateOperatorPasswordModal";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { IoIosArrowDown } from "react-icons/io";

export default function AddAttendants() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    isManager: "",
    avatar: "",
    status: "",
  });

  const { id } = useParams();
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, data, isLoading } = useGetAdmin();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { mutate: updateMutate, isLoading: isUpdating } = useEditAdmin({
    onSuccess: () => {
      successToast("Administrator updated successfully!");

      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_ADMINISTRATORS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: allRoles } = useGetAllRoles();

  const roleOptions = allRoles?.data?.map((role) => ({
    label: role.displayName,
    value: parseInt(role.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

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
      fileType: "avatar",
      entityType: "admin",
      file: formData.get("file"),
    });
  };

  useEffect(() => {
    const selectedRoleOption = roleOptions?.find(
      (option) => option.value === Number(data?.role?.id)
    );
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    setValues({
      ...values,
      avatar: data?.avatar?.replace("https://staging-api.ezpark.ng/", ""),
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      isManager: data?.isManager,
      role: selectedRoleOption,
      status: selectedStatusOption,
    });
  }, [data]);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        avatar: profilePicData?.path || values?.avatar,
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        isManager: values?.isManager,
        status: values?.status?.value,
        role: values?.role?.value,
      },
    });
  };

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ base: "100%", md: "30rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box
                  alignSelf={"center"}
                  justifyContent={"center"}
                  mb={5}
                  display="flex"
                  flexDir="column"
                >
                  <Text
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                    textAlign="center"
                  >
                    Avatar
                  </Text>
                  <Input
                    id="image_upload"
                    isDisabled={edit ? false : true}
                    onChange={handleUpload}
                    type="file"
                    display="none"
                  />
                  <label htmlFor="image_upload">
                    <Flex
                      flexDir="column"
                      justifyContent="center"
                      align="center"
                      cursor={edit ? "pointer" : ""}
                      w="full"
                    >
                      {isUploading ? (
                        <Flex
                          w="120px"
                          border="4px solid #0D0718"
                          justifyContent="center"
                          align="center"
                          h="120px"
                          borderRadius="12px"
                        >
                          <Spinner />
                        </Flex>
                      ) : (
                        <Image
                          objectFit="cover"
                          w="120px"
                          border={
                            data?.avatar === null ? "none" : "4px solid #0D0718"
                          }
                          h="120px"
                          borderRadius="12px"
                          src={
                            fileType
                              ? fileType
                              : data?.avatar === null
                              ? "/assets/prof-avatar.jpg"
                              : process.env.REACT_APP_BASE_URL + data?.avatar
                          }
                        />
                      )}
                    </Flex>
                  </label>
                </Box>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    First Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.firstName}
                    mb
                    holder="Enter first name"
                    onChange={(e) =>
                      setValues({ ...values, firstName: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Last Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.lastName}
                    mb
                    holder="Enter last name"
                    onChange={(e) =>
                      setValues({ ...values, lastName: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Email Address
                  </Text>
                  <CustomInput
                    auth
                    value={values?.email}
                    mb
                    holder="Enter email address"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Default Role
                  </Text>
                  <Select
                    styles={customStyles}
                    options={roleOptions}
                    placeholder="Select role"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "role",
                      })
                    }
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
                    value={values?.role}
                    isDisabled={edit ? false : true}
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
                    size="sm"
                    variant="adminPrimary"
                    isChecked={values?.isManager ? true : false}
                    value={values?.isManager}
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>
                  <Select
                    styles={customStyles}
                    options={statusOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
                      })
                    }
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
                    value={values?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Button
                  variant="adminSecondary"
                  fontSize="12px"
                  mt={4}
                  isDisabled={edit ? false : true}
                  h="32px"
                  onClick={() => setIsOpen(true)}
                  alignSelf="center"
                >
                  Change Password
                </Button>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate("/admin/users/administrators"),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="adminPrimary"
                    w="100%"
                    isLoading={isUpdating}
                    onClick={() => (!edit ? setEdit(true) : handleSubmit())}
                  >
                    {!edit ? "Edit" : "Save"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <UpdateOperatorPasswordModal
              isOpen={isOpen}
              id={id}
              adminUser
              onClose={() => setIsOpen(false)}
            />
          </>
        )}
      </Flex>
    </Box>
  );
}
