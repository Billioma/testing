import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Spinner,
  Input,
  Switch,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useEditCustomer,
  useFundCustomer,
  useGetAdminCustomer,
} from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  FundMethods,
  cardImg,
  errorCustomStyles,
  statusType,
} from "../../../components/common/constants";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { IoIosArrowDown } from "react-icons/io";
import UpdateOperatorPasswordModal from "../../../components/modals/UpdateOperatorPasswordModal";

export default function ViewCustomer() {
  const isEdit = sessionStorage.getItem("edit");

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [edit, setEdit] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate, data, isLoading } = useGetAdminCustomer();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditCustomer({
    onSuccess: () => {
      successToast("Customer updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
  const { mutate: fundMutate, isLoading: isFund } = useFundCustomer({
    onSuccess: () => {
      successToast("Customer wallet funded successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const [values, setValues] = useState({
    profilePicture: "",
    firstName: "",
    showFund: false,
    paymentMethod: "",
    customerAmount: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    status: "",
  });

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

  const payOptions = FundMethods?.map((method) => ({
    value: method?.id,
    label: method?.name,
  }));

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    setValues({
      ...values,
      profilePicture: data?.profile?.profilePicture?.replace(
        "https://staging-api.ezpark.ng/",
        ""
      ),
      firstName: data?.profile?.firstName,
      lastName: data?.profile?.lastName,
      email: data?.email,
      phone: data?.profile?.phone?.replace("+234", ""),
      companyName: data?.profile?.companyName || "N/A",
      status: selectedStatusOption,
    });
  }, [data]);

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

  const [fileLimit, setFileLimit] = useState(false);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    const fileSizeInBytes = selectedFile.size;
    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("file", selectedFile);

    const limitInMB = Math.ceil(fileSizeInBytes / 1048576);
    if (limitInMB > 2) {
      setFileLimit(true);
    } else {
      setFileLimit(false);
      uploadMutate({
        fileType: "profilePicture",
        entityType: "admin",
        file: formData.get("file"),
      });
    }
  };

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        companyName: values?.companyName,
        email: values?.email,
        firstName: values?.firstName,
        lastName: values?.lastName,
        phone: `+234${Number(values?.phone)}` || "",
        status: values?.status.value,
        profilePicture: profilePicData?.path || values?.pic,
      },
    });
  };

  const handleFund = () => {
    fundMutate({
      query: id,
      body: {
        amount: Number(values?.customerAmount),
        paymentMethod: Number(values?.paymentMethod?.value),
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
              w={{ base: "100%", md: edit ? "100%" : "85%" }}
              flexDir={{ md: "row", base: "column" }}
              gap={{ base: "", md: "40px" }}
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{
                  base: "100%",
                  md: edit ? "30rem" : "100%",
                  "3xl": edit ? "35rem" : "100%",
                }}
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
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                    textAlign="center"
                  >
                    Profile Picture
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
                            data?.profile?.profilePicture === null
                              ? "none"
                              : "4px solid #0D0718"
                          }
                          h="120px"
                          borderRadius="12px"
                          src={
                            fileType
                              ? fileType
                              : data?.profile?.profilePicture === null
                              ? "/assets/prof-avatar.jpg"
                              : process.env.REACT_APP_BASE_URL +
                                data?.profile?.profilePicture
                          }
                        />
                      )}
                    </Flex>

                    <Text
                      color="tomato"
                      display={fileLimit ? "block" : "none"}
                      textAlign="center"
                      mt="8px"
                      fontSize="14px"
                    >
                      File size exceeds 2MB limit!
                    </Text>
                  </label>
                </Box>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
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
                    fontSize="12px"
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
                    fontSize="12px"
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
                    fontWeight={500}
                    color="#444648"
                    fontSize="12px"
                  >
                    Phone Number
                  </Text>
                  <CustomInput
                    mb
                    ngn
                    name="phone"
                    value={`${values?.phone}`}
                    onChange={(e) => {
                      const inputPhone = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);
                      setValues({
                        ...values,
                        phone: inputPhone,
                      });
                    }}
                    holder="Enter Phone Number"
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Company Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.companyName}
                    mb
                    holder="Enter your company name"
                    onChange={(e) =>
                      setValues({ ...values, companyName: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>
                  <Select
                    styles={customStyles}
                    options={statusOptions}
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
                    placeholder="Select Status"
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
                      })
                    }
                    value={values?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <form
                  onSubmit={(e) => {
                    !values?.customerAmount || !values?.paymentMethod
                      ? setFormSubmitted(true)
                      : (setFormSubmitted(true), handleFund(e));
                    e.preventDefault();
                  }}
                >
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Fund Wallet
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          showFund: values?.showFund ? 0 : 1,
                        })
                      }
                      value={values?.showFund}
                      isChecked={values?.showFund ? true : false}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>

                  {values?.showFund ? (
                    <>
                      {" "}
                      <Box w="full" mb={4}>
                        <Text
                          mb="8px"
                          fontSize="12px"
                          fontWeight={500}
                          color="#444648"
                        >
                          Amount{" "}
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
                          value={values.customerAmount}
                          auth
                          type="number"
                          error={
                            formSubmitted && !values?.customerAmount
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            setValues({
                              ...values,
                              customerAmount: e.target.value,
                            })
                          }
                        />

                        {formSubmitted && !values?.customerAmount && (
                          <Text mt="-22px" fontSize="12px" color="tomato">
                            Amount is required
                          </Text>
                        )}
                      </Box>
                      <Box mb={4}>
                        <Text
                          color="#444648"
                          lineHeight="100%"
                          fontSize="12px"
                          fontWeight={500}
                          mb="8px"
                        >
                          Payment Method{" "}
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
                          styles={
                            formSubmitted && !values?.paymentMethod
                              ? errorCustomStyles
                              : customStyles
                          }
                          options={payOptions}
                          onChange={(selectedOption) =>
                            handleSelectChange(selectedOption, {
                              name: "paymentMethod",
                            })
                          }
                          value={values?.paymentMethod}
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
                        {formSubmitted && !values?.paymentMethod && (
                          <Text mt="8px" fontSize="12px" color="tomato">
                            Payment Method is required
                          </Text>
                        )}
                      </Box>
                      <Button
                        type="submit"
                        isLoading={isFund}
                        variant="adminPrimary"
                        size="sm"
                      >
                        Fund Wallet
                      </Button>
                    </>
                  ) : null}
                </form>

                <Button
                  variant="adminSecondary"
                  fontSize="12px"
                  mt={4}
                  h="32px"
                  onClick={() => (edit ? setIsOpen(true) : "")}
                  isDisabled={edit ? false : true}
                  alignSelf={"center"}
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
                        : (navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS),
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

              <Flex
                gap={5}
                flexDir={"column"}
                w={{ base: "100%", md: edit ? "0" : "100%" }}
              >
                <Flex
                  bg="#fff"
                  borderRadius="8px"
                  py="24px"
                  px="28px"
                  justifyContent="center"
                  flexDir="column"
                  border="1px solid #E4E6E8"
                  h="fit-content"
                  display={edit ? "none" : "flex"}
                >
                  <Text alignSelf={"center"} color="#646668" fontWeight={500}>
                    Customer Payments
                  </Text>

                  <Flex gap="24px" flexDir="column" mt="24px">
                    <Box
                      p="16px"
                      border="1px solid #D4D6D8"
                      borderRadius={"4px"}
                      color="#646668"
                    >
                      <Text fontSize="12px">Wallet</Text>
                      <Text fontWeight={500} mt="8px">
                        Balance: ₦{" "}
                        {data?.wallet?.balance?.toLocaleString() || "0.00"}
                      </Text>
                    </Box>

                    <Flex
                      w="full"
                      flexDir="column"
                      p="16px"
                      border="1px solid #D4D6D8"
                      borderRadius={"4px"}
                    >
                      <Text fontSize="12px" color="#646668">
                        Card Details
                      </Text>
                      <Flex mt="10px">
                        {data?.cards?.length ? (
                          data?.cards?.map((item, i) => {
                            const matchedCardImg = cardImg.find((type) =>
                              item.cardType
                                .trim()
                                .toLowerCase()
                                .includes(type.name.toLowerCase())
                            );

                            return (
                              <Flex
                                justifyContent="center"
                                key={i}
                                flexDir="column"
                                w="full"
                                align="center"
                              >
                                <Text fontWeight={500} color="#242628" mb="8px">
                                  {item?.last4}
                                </Text>
                                <Image
                                  objectFit="contain"
                                  src={matchedCardImg?.img}
                                  w="30px"
                                  h="23px"
                                />
                              </Flex>
                            );
                          })
                        ) : (
                          <Text color="#646668" mt={1}>
                            No Card Added yet
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <UpdateOperatorPasswordModal
              isOpen={isOpen}
              id={id}
              customer
              onClose={() => setIsOpen(false)}
            />
          </>
        )}
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
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: state.hasValue ? "none" : "1px solid #D4D6D8",
    paddingRight: "16px",
    background: state.hasValue ? "#f4f6f8" : "unset",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      boxShadow: "none",
    },
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
