import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Calendar } from "react-multi-date-picker";
import { Button, Input, Skeleton } from "@chakra-ui/react";
import { convertDate } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import {
  useGetLeaveBalance,
  useRequestLeave,
} from "../../../services/staff/query/leave";
import CustomInput from "../../../components/common/CustomInput";
import { FileUploader } from "react-drag-drop-files";
import { MdClose } from "react-icons/md";

const RequestMedical = () => {
  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    amount: "",
  });

  const [dates, setDates] = useState([]);

  const [fileLimit, setFileLimit] = useState(false);
  const [files, setFiles] = useState([]);

  const handleChange = (newFiles) => {
    const selectedFile = newFiles[0];
    if (!selectedFile) {
      return;
    }

    const fileSizeInBytes = selectedFile.size;

    const limitInMB = Math.ceil(fileSizeInBytes / 1048576);
    if (limitInMB > 2) {
      setFileLimit(true);
    } else {
      setFileLimit(false);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
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

  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useRequestLeave({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/leave");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      startDate: convertDate(new Date(dates[0])),
      endDate: convertDate(new Date(dates[1])),
      purpose: values?.purpose?.value,
      amount: values?.amount,
    });
  };

  return (
    <Box>
      <Text
        fontSize={{ base: "35px", md: "48px" }}
        fontWeight={500}
        color="#090c02"
      >
        Request Medical Assistance
      </Text>

      <Box mt="40px" align="flex-start">
        <Flex flexDir="column" gap="24px" w={{ base: "100%", md: "60%" }}>
          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              AMOUNT
            </Text>
            <CustomInput
              opt
              value={values?.amount}
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
              h="180px"
              mb
            />
          </Box>

          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              PURPOSE
            </Text>
            <CustomInput
              opt
              value={values?.purpose}
              onChange={(e) =>
                setValues({ ...values, purpose: e.target.value })
              }
              h="180px"
              mb
            />
          </Box>

          <Box>
            <Text fontWeight={700} mb="9px" fontSize="10px">
              SUPPORTING DOCUMENTS
            </Text>

            {files?.length
              ? files?.map((item, i) => (
                  <Flex
                    key={i}
                    mt="24px"
                    border="1px solid #BAE0D9"
                    borderRadius="12px"
                    py="16px"
                    mb="14px"
                    px="30px"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Box>
                      <Text fontWeight={500} mb="4px">
                        {item?.name}
                      </Text>
                      <Text fontSize="13px">
                        {Math.floor(
                          item?.size < 1048576
                            ? item?.size / 1024
                            : item?.size / 1048576
                        )}{" "}
                        {item?.size < 1048576 ? "KB" : "MB"}
                      </Text>
                    </Box>

                    <Flex align="center" gap="12px">
                      <Flex
                        border="1px solid #08637533"
                        borderRadius="4px"
                        cursor="pointer"
                        w="32px"
                        onClick={() => handleRemoveFile(i)}
                        h="32px"
                        justifyContent="center"
                        align="center"
                      >
                        <MdClose />
                      </Flex>
                    </Flex>
                  </Flex>
                ))
              : ""}

            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
            >
              <Flex
                cursor="pointer"
                border="1px dashed #E2E5DC"
                borderRadius="4px"
                w="full"
                justifyContent="center"
                h="72px"
                gap="10px"
                align="center"
              >
                <Image
                  w="16px"
                  h="16px"
                  objectFit="contain"
                  src="/assets/uploader.svg"
                />
                <Text fontSize="14px">
                  Drag and drop your files here or{" "}
                  <span style={{ textDecoration: "underline" }}>
                    choose file
                  </span>
                </Text>
              </Flex>
            </FileUploader>
            <Text
              color="tomato"
              display={fileLimit ? "block" : "none"}
              textAlign="center"
              mt="8px"
              fontSize="14px"
            >
              File size exceeds 2MB limit!
            </Text>
          </Box>

          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            mt="16px"
            mb={{ base: "20px", md: "unset" }}
            h="60px"
            w="full"
          >
            Submit Request
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequestMedical;
