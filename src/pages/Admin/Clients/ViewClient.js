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
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useAttachAdminClientUser,
  useDetachAdminClientUser,
  useEditClient,
  useGetAdminClient,
  useGetAdminClientUsers,
} from "../../../services/admin/query/clients";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetManagers } from "../../../services/admin/query/users";
import {
  allStates,
  cardImg,
  statusType,
} from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { MdClose } from "react-icons/md";
import UpdateOperatorPasswordModal from "../../../components/modals/UpdateOperatorPasswordModal";
import { Add } from "../../../components/common/images";
import AdminClientAddUserModal from "../../../components/modals/AdminClientAddUserModal";

export default function ViewCustomer() {
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateMutate, isLoading: isUpdating } = useEditClient({
    onSuccess: () => {
      successToast("Client updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_CLIENTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
  const { id } = useParams();

  const { mutate, data, isLoading } = useGetAdminClient();
  const [currentuser, setCurrentuser] = useState("");
  const {
    mutate: usersMutate,
    data: clientUsers,
    isLoading: isUser,
  } = useGetAdminClientUsers();
  const { mutate: detachUser, isLoading: isDetaching } =
    useDetachAdminClientUser({
      onSuccess: () => {
        usersMutate({ id: id });
        setCurrentuser("");
      },
    });
  const { mutate: attachUser, isLoading: isAttaching } =
    useAttachAdminClientUser({
      onSuccess: () => {
        usersMutate({ id: id });
        setCurrentuser("");
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
  const handleDetach = (user) => {
    setCurrentuser(user.id);
    detachUser({
      id: id,
      email: user.email,
    });
  };
  const handleAttach = (user) => {
    setCurrentuser(user.id);
    attachUser({
      id: id,
      email: user.email,
    });
  };
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
      fileType: "logo",
      entityType: "admin",
      file: formData.get("file"),
    });
  };

  useEffect(() => {
    mutate({ id: id });
    usersMutate({ id: id });
  }, []);

  const [values, setValues] = useState({
    logo: "",
    name: "",
    email: "",
    billingEmail: "",
    contactPerson: "",
    phone: "",
    address: "",
    state: "",
    accountType: "",
    managers: "",
    status: "",
  });
  const { data: managers } = useGetManagers();

  const managerOptions = managers?.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: manager.id,
  }));

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const accountTypes = ["BUSINESS", "EVENT_PLANNER", "CORPORATE", "OTHERS"].map(
    (type) => ({ label: type, value: type })
  );

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
        email: values?.email,
        billingEmail: values?.billingEmail,
        contactPerson: values?.contactPerson,
        phone: values?.phone,
        address: values?.address,
        managers: values?.managers?.map((item) => item?.value),
        state: values?.state?.value,
        accountType: values?.accountType?.value,
        status: values?.status?.value,
        logo: profilePicData?.path || values?.pic,
      },
    });
  };

  const [showAddUser, setShowAddUser] = useState(false);

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  useEffect(() => {
    const selectedStateOption = stateOptions?.find(
      (option) => option.label === data?.state
    );
    const selectedAccountOption = accountTypes?.find(
      (option) => option.label === data?.accountType
    );
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    const selectedManagersOption = data?.managers?.map((item) => ({
      value: item?.id,
      label: `${item?.firstName} ${item?.lastName}`,
    }));
    setValues({
      ...values,
      logo: data?.logo?.replace("https://staging-api.ezpark.ng/", ""),
      name: data?.name,
      email: data?.email,
      billingEmail: data?.billingEmail,
      contactPerson: data?.contactPerson,
      phone: data?.phone,
      address: data?.address,
      state: selectedStateOption,
      accountType: selectedAccountOption,
      status: selectedStatusOption,
      managers: selectedManagersOption,
    });
  }, [data]);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              w="100%"
              flexDir={{ md: "row", base: "column" }}
              gap="30px"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{
                  base: "100%",
                  md: "80%",
                }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Flex
                  alignSelf={"center"}
                  flexDir={"column"}
                  align={"center"}
                  w="full"
                  mb={5}
                >
                  <Text
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                    textAlign="center"
                    mb={2}
                  >
                    Logo
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
                            data?.logo === null ? "none" : "4px solid #0D0718"
                          }
                          h="120px"
                          borderRadius="12px"
                          src={
                            fileType
                              ? fileType
                              : data?.logo === null
                              ? "/assets/prof-avatar.jpg"
                              : process.env.REACT_APP_BASE_URL + data?.logo
                          }
                        />
                      )}
                    </Flex>
                  </label>
                </Flex>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Name
                  </Text>
                  <CustomInput
                    auth
                    mb
                    holder="Enter client name"
                    value={values.name}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        name: e.target.value,
                      })
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
                    mb
                    holder="Email Address"
                    value={values.email}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        email: e.target.value,
                      })
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
                    Billing Email(s)
                  </Text>
                  <CustomInput
                    auth
                    mb
                    holder="Billing Email Address"
                    value={values.billingEmail}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        billingEmail: e.target.value,
                      })
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
                    Contact Person
                  </Text>
                  <CustomInput
                    auth
                    mb
                    holder="Contact Person"
                    value={values.contactPerson}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        contactPerson: e.target.value,
                      })
                    }
                    dis={edit ? false : true}
                  />
                </Box>
                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontWeight={500}
                    color="#444648"
                    fontSize="10px"
                  >
                    Phone Number
                  </Text>
                  <CustomInput
                    mb
                    ngn
                    name="phone"
                    value={`${values?.phone || ""}`}
                    onChange={(e) => {
                      const inputPhone = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setValues({
                        ...values,
                        phone: inputPhone,
                      });
                    }}
                    holder="Phone Number"
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
                    Address
                  </Text>
                  <CustomInput
                    auth
                    mb
                    holder="Enter address"
                    value={values.address}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        address: e.target.value,
                      })
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
                    State
                  </Text>
                  <Select
                    styles={customStyles}
                    options={stateOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "state",
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
                    name="state"
                    isDisabled={edit ? false : true}
                    value={values.state}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Account Type
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select account type"
                    options={accountTypes}
                    value={values?.accountType}
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
                    Managers
                  </Text>
                  <Select
                    isMulti
                    styles={customStyles}
                    placeholder="Select managers"
                    options={managerOptions}
                    value={values.managers}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "managers",
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
                    value={values.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex justifyContent={"center"}>
                  <Button
                    variant="adminSecondary"
                    fontSize="12px"
                    mt={4}
                    isDisabled={edit ? false : true}
                    h="32px"
                    onClick={() => setIsOpen(true)}
                  >
                    Change Password
                  </Button>
                </Flex>

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_CLIENTS),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"adminPrimary"}
                    w="100%"
                    isLoading={isUpdating}
                    onClick={() => (!edit ? setEdit(true) : handleSubmit())}
                  >
                    {edit ? "Save" : "Edit"}
                  </Button>
                </Flex>
              </Flex>

              <Flex gap={5} flexDir={"column"} w="100%">
                <Flex
                  bg="#fff"
                  borderRadius="8px"
                  py="24px"
                  px="28px"
                  justifyContent="center"
                  flexDir="column"
                  border="1px solid #E4E6E8"
                  h="fit-content"
                >
                  <Text
                    alignSelf={"center"}
                    color="#646668"
                    fontWeight={500}
                    fontSize={"14px"}
                  >
                    Payments
                  </Text>

                  <Flex gap="24px" flexDir="column" mt="24px">
                    <Box
                      color="#646668"
                      p="16px"
                      border="1px solid #D4D6D8"
                      borderRadius={"4px"}
                    >
                      <Text fontSize="12px">Wallet</Text>
                      <Text fontWeight={500} fontSize="14px" mt="8px">
                        Balance:
                        <span>
                          {" "}
                          ₦{" "}
                          {data?.wallet?.balance?.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          }) || "0.00"}
                        </span>
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
                            const matchedCardImg = cardImg.find(
                              (type) =>
                                type?.name?.toLowerCase() ===
                                item?.cardType?.trim().toLowerCase()
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
                          <Text fontSize="14px" color="#646668" mt={1}>
                            No Card Added yet
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  bg="#fff"
                  borderRadius="16px"
                  py="24px"
                  px="28px"
                  justifyContent="center"
                  display={data?.accountType === "CORPORATE" ? "flex" : "none"}
                  flexDir="column"
                  border="1px solid #E4E6E8"
                  h="fit-content"
                >
                  <Flex align="center" justifyContent="space-between" w="full">
                    <Text color="#646668" fontWeight={500} fontSize={"14px"}>
                      Client users
                    </Text>

                    <Button
                      borderRadius="8px"
                      bg="#000"
                      display="flex"
                      align="center"
                      onClick={() => setShowAddUser(true)}
                      fontSize="10px"
                      isDisabled={edit ? false : true}
                      gap="8px"
                    >
                      Add Users
                      <Add fill="#fff" />
                    </Button>
                  </Flex>
                  <Flex gap={4} flexDir="column" mt={4}>
                    <Box
                      p="16px"
                      border="1px solid #D4D6D8"
                      maxH="20rem"
                      overflowY="scroll"
                      borderRadius={"4px"}
                    >
                      {isUser ? (
                        <Flex justifyContent="center" align="center">
                          <Spinner />
                        </Flex>
                      ) : clientUsers?.length ? (
                        clientUsers?.map((user, i) => (
                          <Flex
                            justifyContent={"space-between"}
                            align={"center"}
                            key={i}
                            mb="24px"
                          >
                            <Box>
                              <Text fontSize="13px" color="#646668">
                                {user?.profile?.firstName}{" "}
                                {user?.profile?.lastName}
                              </Text>
                              <Text
                                fontSize="14px"
                                fontWeight={500}
                                color="#444648"
                                mt="8px"
                              >
                                {user?.email}
                              </Text>
                            </Box>

                            <Flex
                              align={"center"}
                              justifyContent={"center"}
                              h="32px"
                              w="32px"
                              opacity={edit ? 1 : 0.6}
                              onClick={() => (!edit ? "" : handleDetach(user))}
                              border="1px solid #e4e6e8"
                              bg="#E4E6E8"
                              borderRadius="8px"
                              cursor={!edit ? "" : "pointer"}
                            >
                              {isDetaching && currentuser === user.id ? (
                                <Spinner size="xs" />
                              ) : (
                                <MdClose />
                              )}
                            </Flex>
                          </Flex>
                        ))
                      ) : (
                        <Text
                          fontSize="14px"
                          color="#646668"
                          textAlign="center"
                        >
                          No user has been assigned to this client
                        </Text>
                      )}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <AdminClientAddUserModal
              isOpen={showAddUser}
              handleAttach={handleAttach}
              handleDetach={handleDetach}
              clientUsers={clientUsers}
              isUser={isUser}
              isAttaching={isAttaching}
              isDetaching={isDetaching}
              onClose={() => setShowAddUser(false)}
            />

            <UpdateOperatorPasswordModal
              isOpen={isOpen}
              id={id}
              clientValues={values}
              admin
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
