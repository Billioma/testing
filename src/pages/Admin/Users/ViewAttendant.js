import React, { useState, useEffect } from "react";
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
import Select from "react-select";
import { useGetAllOperators } from "../../../services/admin/query/operators";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useEditAttendant,
  useGetAdminAttendant,
} from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import UpdateOperatorPasswordModal from "../../../components/modals/UpdateOperatorPasswordModal";
import { accountType, statusType } from "../../../components/common/constants";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { IoIosArrowDown } from "react-icons/io";

export default function AddAttendants() {
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [values, setValues] = useState({
    avatar: "",
    name: "",
    userId: "",
    operator: "",
    accountType: "",
    locations: "",
    status: "",
  });

  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: operators } = useGetAllOperators();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, data, isLoading } = useGetAdminAttendant();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { mutate: updateMutate, isLoading: isUpdating } = useEditAttendant({
    onSuccess: () => {
      successToast("Attendant updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: locationsData } = useGetAllLocations();

  const locationOptions = locationsData?.data?.map((location) => ({
    label: location?.name,
    value: location?.id,
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    label: operator?.name,
    value: operator?.id,
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
      backgroundColor: "#f4f6f8",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#d4d6d8" : "",
    }),
  };

  const accountOptions = accountType?.map((account) => ({
    value: account,
    label: account,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

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
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    const selectedAccountOption = accountOptions?.find(
      (option) => option.value === data?.accountType
    );
    const selectedOperatorOption = operatorOptions?.find(
      (option) => option.label === data?.operator?.name
    );
    const selectedLocationsOption = data?.locations?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));

    setValues({
      ...values,
      avatar: data?.avatar?.replace("https://staging-api.ezpark.ng/", ""),
      name: data?.name,
      userId: data?.userId,
      status: selectedStatusOption,
      accountType: selectedAccountOption,
      operator: selectedOperatorOption,
      locations: selectedLocationsOption,
    });
  }, [data]);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        avatar: profilePicData?.path || values?.avatar,
        name: values?.name,
        userId: values?.userId,
        status: values?.status?.value,
        accountType: values?.accountType?.value,
        operator: Number(values?.operator?.value) || "",
        locations: values?.locations?.map((item) => Number(item?.value)),
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
                    Full Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter full name"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
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
                    User ID
                  </Text>
                  <CustomInput
                    auth
                    value={values?.userId}
                    mb
                    type="number"
                    holder="Enter user ID"
                    onChange={(e) =>
                      setValues({ ...values, userId: e.target.value })
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
                    Select Account Type
                  </Text>
                  <Select
                    styles={customStyles}
                    options={accountOptions}
                    placeholder="Select account type"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "accountType",
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
                    value={values?.accountType}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Assign Operator
                  </Text>
                  <Select
                    styles={customStyles}
                    options={operatorOptions}
                    placeholder="Select an operator"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "operator",
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
                    value={values?.operator}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Locations
                  </Text>
                  <Select
                    styles={customStyles}
                    options={locationOptions}
                    placeholder="Select locations"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "locations",
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
                    value={values?.locations}
                    isDisabled={edit ? false : true}
                    isMulti
                  />
                </Box>

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
                  h="32px"
                  onClick={() => (edit ? setIsOpen(true) : "")}
                  alignSelf={"center"}
                  isDisabled={edit ? false : true}
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
                        : (navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS),
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
              attendant
              onClose={() => setIsOpen(false)}
            />
          </>
        )}
      </Flex>
    </Box>
  );
}
