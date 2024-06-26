import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";
import TextInput from "../../../components/common/TextInput";
import { Calendar } from "react-multi-date-picker";
import { Button, Skeleton, useDisclosure } from "@chakra-ui/react";
import { formatDate, convertDate } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import {
  useGetLeaveBalance,
  useRequestLeave,
} from "../../../services/staff/query/leave";
import Submitted from "../../../components/modals/Submitted";

const RequestLeave = () => {
  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    additionalComments: "",
    purpose: "",
  });

  const [dates, setDates] = useState([]);

  const handleSelectChange = (selectedOption, { name }) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const {
    data: balance,
    refetch: balanceRefetch,
    isLoading: isBalance,
  } = useGetLeaveBalance({
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

  const startDateRange = new Date();
  const { isOpen, onOpen } = useDisclosure();
  const { errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useRequestLeave({
    onSuccess: () => {
      onOpen();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      startDate: convertDate(new Date(dates[0])),
      endDate: convertDate(new Date(dates[1])),
      purpose: values?.purpose?.value,
      additionalComments: values?.additionalComments,
    });
  };

  return (
    <Box>
      <Submitted
        leave
        isOpen={isOpen}
        onClose={() => navigate("/staff/leave")}
        onClick={() => navigate("/staff/leave")}
      />
      <Text
        fontSize={{ base: "35px", md: "48px" }}
        fontWeight={500}
        color="#090c02"
      >
        Request Leave
      </Text>

      <Flex
        mt="40px"
        gap="50px"
        align="flex-start"
        flexDir={{ base: "column-reverse", md: "row" }}
      >
        <Flex flexDir="column" gap="24px" w={{ base: "100%", md: "60%" }}>
          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              PROPOSED START DATE
            </Text>
            <Flex
              border={dates[0] ? "1px solid #086375" : "1px solid #3d3d3d"}
              borderRadius="8px"
              align="center"
              h="56px"
              bg={dates[0] ? "#E8FBF7" : "transparent"}
              gap="10px"
              p="10px"
            >
              <Image
                src="/assets/calendar.svg"
                w="24px"
                h="24px"
                objectFit={"contain"}
              />
              <Text color={dates[0] ? "#090c02" : "#afafaf"}>
                {dates[0] ? formatDate(new Date(dates[0])) : "Start Date"}
              </Text>
            </Flex>
          </Box>

          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              PROPOSED END DATE
            </Text>
            <Flex
              border={dates[1] ? "1px solid #086375" : "1px solid #3d3d3d"}
              borderRadius="8px"
              align="center"
              h="56px"
              bg={dates[1] ? "#E8FBF7" : "transparent"}
              gap="10px"
              p="10px"
            >
              <Image
                src="/assets/calendar.svg"
                w="24px"
                h="24px"
                objectFit={"contain"}
              />
              <Text color={dates[1] ? "#090c02" : "#afafaf"}>
                {dates[1] ? formatDate(new Date(dates[1])) : "End Date"}
              </Text>
            </Flex>
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
            Submit Leave Request
          </Button>
        </Flex>

        <Box
          w={{ base: "100%", md: "40%" }}
          border="1px solid #086375"
          borderRadius="8px"
          px="14px"
          pb="20px"
        >
          <Calendar
            value={dates}
            className="alt-rmdp"
            onChange={setDates}
            minDate={startDateRange}
            range
            rangeHover
          />

          <Skeleton borderRadius="8px" isLoaded={!isBalance} w="full" h="full">
            <Flex
              flexDir="column"
              align="center"
              justifyContent="center"
              mt="24px"
              border="1px solid #086375"
              borderRadius="8px"
              color="#086375"
              gap="4px"
              h="93px"
              fontWeight={700}
            >
              <Text opacity="0.4" fontSize="13px">
                LEAVE BALANCE
              </Text>
              <Text fontSize="18px">{balance?.data?.leaveBalance} Days</Text>
            </Flex>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default RequestLeave;
