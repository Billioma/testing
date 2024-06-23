import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";
import TextInput from "../../../components/common/TextInput";
import { Button, Skeleton } from "@chakra-ui/react";
import useCustomToast from "../../../utils/notifications";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetLoanBalance,
  useUpdateLoan,
  useGetLoan,
} from "../../../services/staff/query/loan";
import CustomInput from "../../../components/common/CustomInput";

const UpdateLoan = () => {
  const [values, setValues] = useState({
    amountRequested: "",
    purpose: "",
    additionalComments: "",
  });

  const handleSelectChange = (selectedOption, { name }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const getNumber = (str) => {
    const arr = str.split("");
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      if (!isNaN(arr[i])) {
        out.push(arr[i]);
      }
    }
    return Number(out?.join(""));
  };

  const updateTextView = (event) => {
    const num = getNumber(event.target.value);
    if (num === 0) {
      setValues({
        ...values,
        amountRequested: "",
      });
    } else {
      setValues({
        ...values,
        amountRequested: num.toLocaleString(),
      });
    }
  };

  const {
    data: balance,
    refetch: balanceRefetch,
    isLoading: isBalance,
  } = useGetLoanBalance({
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    balanceRefetch();
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "56px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "8px",
      border: state.hasValue ? "1px solid #086375" : "1px solid #3d3d3d",
      paddingRight: "16px",
      background: state.hasValue ? "#E8FBF7" : "unset",
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

  const purposes = [
    { label: "Medical", value: "Medical" },
    { label: "Travel", value: "Travel" },
    { label: "Personal", value: "Personal" },
    { label: "Emergency", value: "Emergency" },
    { label: "Transportation", value: "Transportation" },
    { label: "Housing", value: "Housing" },
    { label: "Others", value: "Others" },
  ];

  const purposesOptions = purposes?.map((purpose) => ({
    value: purpose?.value,
    label: purpose?.label,
  }));

  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useUpdateLoan({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate(`/staff/loans/${id}`);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { id } = useParams();
  const { data } = useGetLoan(id);

  useEffect(() => {
    if (data) {
      const selectedPurpose = purposesOptions?.find(
        (option) => option.value === data?.purpose
      );
      setValues({
        ...values,
        amountRequested: Number(data?.amountRequested)?.toLocaleString(),
        additionalComments: data?.additionalComments,
        purpose: selectedPurpose,
      });
    }
  }, [data]);

  const handleSubmit = () => {
    mutate({
      query: id,
      body: {
        amountRequested: Number(values.amountRequested.replace(/\D/g, "")),
        purpose: values?.purpose?.value,
        additionalComments: values?.additionalComments,
      },
    });
  };

  return (
    <Box>
      <Text
        fontSize={{ base: "35px", md: "48px" }}
        fontWeight={500}
        color="#090c02"
      >
        Edit Loan Request
      </Text>

      <Flex
        mt="40px"
        gap="50px"
        align="flex-start"
        flexDir={{ base: "column-reverse", md: "row" }}
      >
        <Flex flexDir="column" gap="24px" w={{ base: "100%", md: "60%" }}>
          <Flex
            border={isBalance ? "" : "1px solid #086375"}
            borderRadius="8px"
            h="73px"
            justifyContent="center"
          >
            <Skeleton borderRadius="8px" isLoaded={!isBalance} w="full">
              <Flex
                fontWeight={500}
                p="24px"
                fontSize="18px"
                justifyContent="space-between"
                w="full"
                align="center"
              >
                <Text color="#086375">Loan Balance</Text>
                <Text> ₦ {balance?.data?.loanBalance?.toLocaleString()}</Text>
              </Flex>
            </Skeleton>
          </Flex>
          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              AMOUNT
            </Text>
            <CustomInput
              opt
              naira
              value={values?.amountRequested}
              onChange={updateTextView}
              mb
            />
          </Box>

          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              PURPOSE
            </Text>
            <Select
              styles={customStyles}
              options={purposesOptions}
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
              value={values.purpose}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "purpose" })
              }
            />
          </Box>

          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              ADDITIONAL COMMENTS
            </Text>
            <TextInput
              value={values?.additionalComments}
              onChange={(e) =>
                setValues({ ...values, additionalComments: e.target.value })
              }
              h="180px"
              mb
            />
          </Box>

          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            mt="16px"
            mb={{ base: "20px", md: "unset" }}
            h="60px"
            w="full"
          >
            Submit Loan Request
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UpdateLoan;
