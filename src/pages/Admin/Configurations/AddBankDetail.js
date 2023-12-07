import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetServices } from "../../../services/admin/query/services";
import {
  customStyles,
  errorCustomStyles,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useAddBankDetail } from "../../../services/admin/query/configurations";
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

  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isDisabled = Object.values(values).some((value) => !value);

  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useAddBankDetail({
    onSuccess: () => {
      successToast("Bank detail created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: services } = useGetServices(null, 1, 100);

  const serviceOptions = services?.data?.map((service) => ({
    label: service?.name,
    value: parseInt(service?.id),
  }));
  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleKeyPress = (e) => {
    if (values?.accountNumber?.length >= 10) {
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    updateMutate({
      bankName: values?.bankName,
      accountName: values?.accountName,
      accountNumber: Number(values?.accountNumber),
      sortCode: values?.sortCode,
      service: Number(values?.service?.value),
      status: Number(values?.status?.value),
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

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="8px"
            py="32px"
            px="24px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <form
              onSubmit={(e) => {
                isDisabled
                  ? setFormSubmitted(true)
                  : (setFormSubmitted(true), handleSubmit(e));
                e.preventDefault();
              }}
            >
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Bank Name{" "}
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
                  value={values?.bankName}
                  mb
                  holder="Enter bank name"
                  onChange={(e) =>
                    setValues({ ...values, bankName: e.target.value })
                  }
                  error={formSubmitted && !values?.bankName ? true : false}
                />
                {formSubmitted && !values?.bankName && (
                  <Text mt="-5px" fontSize="12px" color="tomato">
                    Bank Name is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Account Number{" "}
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
                  value={values?.accountNumber}
                  mb
                  handleKeyPress={handleKeyPress}
                  type="number"
                  holder="Enter account number"
                  onChange={(e) =>
                    setValues({ ...values, accountNumber: e.target.value })
                  }
                  error={formSubmitted && !values?.accountNumber ? true : false}
                />

                {formSubmitted && !values?.accountNumber && (
                  <Text mt="-5px" fontSize="12px" color="tomato">
                    Account Number is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Account Name{" "}
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
                  value={values?.accountName}
                  mb
                  holder="Enter account name"
                  onChange={(e) =>
                    setValues({ ...values, accountName: e.target.value })
                  }
                  error={formSubmitted && !values?.accountName ? true : false}
                />
                {formSubmitted && !values?.accountName && (
                  <Text mt="-5px" fontSize="12px" color="tomato">
                    Account Name is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Sort Code{" "}
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
                  value={values?.sortCode}
                  mb
                  holder="Enter sort code"
                  onChange={(e) =>
                    setValues({ ...values, sortCode: e.target.value })
                  }
                  error={formSubmitted && !values?.sortCode ? true : false}
                />

                {formSubmitted && !values?.sortCode && (
                  <Text mt="-5px" fontSize="12px" color="tomato">
                    Sort Code is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Service{" "}
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
                    formSubmitted && !values?.service
                      ? errorCustomStyles
                      : customStyles
                  }
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
                />
                {formSubmitted && !values?.service && (
                  <Text mt="8px" fontSize="12px" color="tomato">
                    Service is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
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
                  styles={
                    formSubmitted && !values?.status
                      ? errorCustomStyles
                      : customStyles
                  }
                  placeholder="Select"
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
                />
                {formSubmitted && !values?.status && (
                  <Text mt="8px" fontSize="12px" color="tomato">
                    Status is required
                  </Text>
                )}
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  variant="adminSecondary"
                  w="100%"
                  onClick={() =>
                    navigate(PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS)
                  }
                >
                  Cancel
                </Button>
                <Button
                  variant="adminPrimary"
                  w="100%"
                  isLoading={isUpdating}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
