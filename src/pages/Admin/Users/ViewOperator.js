import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  allStates,
  customStyles,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useEditAdminOperator,
  useGetOperator,
} from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoIosArrowDown } from "react-icons/io";
import UpdateOperatorPasswordModal from "../../../components/modals/UpdateOperatorPasswordModal";

export default function ViewOperator() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    contactPerson: "",
    status: "",
    enableTips: "",
  });

  const { id } = useParams();
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const { mutate, data, isLoading } = useGetOperator();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditAdminOperator({
    onSuccess: () => {
      successToast("Operator updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_OPERATORS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
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

  useEffect(() => {
    const selectedStateOption = stateOptions?.find(
      (option) => option.value === data?.state
    );
    console.log(selectedStateOption);
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    setValues({
      ...values,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      address: data?.address,
      contactPerson: data?.contactPerson,
      state: selectedStateOption,
      status: selectedStatusOption,
      enableTips: data?.enableTips,
    });
  }, [data]);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
        email: values?.email,
        phone: `+234${Number(values?.phone)}`,
        enableTips: values?.enableTips,
        address: values?.address,
        state: values?.state?.value,
        contactPerson: values?.contactPerson,
        status: values?.status?.value,
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
                    value={values?.name}
                    mb
                    holder="Enter operator name"
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
                    fontSize="10px"
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
                        .slice(0, 10);
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
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Address
                  </Text>
                  <CustomInput
                    auth
                    value={values?.address}
                    mb
                    holder="Enter operator address"
                    onChange={(e) =>
                      setValues({ ...values, address: e.target.value })
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
                    placeholder="Select State"
                    options={stateOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "state",
                      })
                    }
                    value={values?.state}
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
                    value={values?.contactPerson}
                    mb
                    holder="Enter contact person"
                    onChange={(e) =>
                      setValues({ ...values, contactPerson: e.target.value })
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

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                  mt={2}
                >
                  <Text fontSize="12px" fontWeight={500} color="#444648">
                    Enable Tips
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        enableTips: values?.enableTips ? 0 : 1,
                      })
                    }
                    isChecked={values?.enableTips ? true : false}
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Button
                  variant="adminSecondary"
                  fontSize="12px"
                  mt={4}
                  isDisabled={edit ? false : true}
                  h="32px"
                  onClick={() => setIsOpen(true)}
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
                        : (navigate("/admin/users/operators"),
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
              operator
              onClose={() => setIsOpen(false)}
            />
          </>
        )}
      </Flex>
    </Box>
  );
}
