import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetServices } from "../../../services/admin/query/services";
import { customStyles, statusType } from "../../../components/common/constants";
import Select from "react-select";
import {
  useEditBankDetail,
  useGetAdminBank,
} from "../../../services/admin/query/configurations";
import { IoIosArrowDown } from "react-icons/io";

export default function AddBankDetail() {
  const [values, setValues] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    sortCode: "",
    service: "",
    status: "",
  });

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditBankDetail({
    onSuccess: () => {
      successToast("Bank detail updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetAdminBank();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { data: services } = useGetServices(null, 1, 100);

  const serviceOptions = services?.data?.map((service) => ({
    label: service?.name,
    value: parseInt(service?.id),
  }));
  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        bankName: values?.bankName,
        accountName: values?.accountName,
        accountNumber: values?.accountNumber,
        sortCode: values?.sortCode,
        service: values?.service?.value,
        status: values?.status?.value,
      },
    });
  };

  const handleKeyPress = (e) => {
    if (values?.accountNumber?.length >= 10) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    const selectedServicesOption = serviceOptions?.find(
      (option) => option.value === Number(data?.service?.id)
    );
    setValues({
      ...values,
      accountName: data?.accountName,
      accountNumber: data?.accountNumber,
      bankName: data?.bankName,
      sortCode: data?.sortCode,
      service: selectedServicesOption,
      status: selectedStatusOption,
    });
  }, [data, services]);

  return (
    <Box minH="75vh">
      {" "}
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
                    Bank Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.bankName}
                    mb
                    holder="Enter bank name"
                    onChange={(e) =>
                      setValues({ ...values, bankName: e.target.value })
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
                    Account Number
                  </Text>
                  <CustomInput
                    auth
                    value={values?.accountNumber}
                    mb
                    handleKeyPress={handleKeyPress}
                    holder="Enter account number"
                    onChange={(e) =>
                      setValues({ ...values, accountNumber: e.target.value })
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
                    Account Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.accountName}
                    mb
                    holder="Enter account name"
                    onChange={(e) =>
                      setValues({ ...values, accountName: e.target.value })
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
                    Sort Code
                  </Text>
                  <CustomInput
                    auth
                    value={values?.sortCode}
                    mb
                    holder="Enter sort code"
                    onChange={(e) =>
                      setValues({ ...values, sortCode: e.target.value })
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
                    Service
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select service"
                    options={serviceOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "service",
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
                    value={values?.service}
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
                    Status
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select service"
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

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS),
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
          </>
        )}
      </Flex>
    </Box>
  );
}
