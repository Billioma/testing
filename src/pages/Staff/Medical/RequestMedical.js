import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useRequestMed } from "../../../services/staff/query/medical";
import CustomInput from "../../../components/common/CustomInput";
import { FileUploader } from "react-drag-drop-files";
import { MdClose } from "react-icons/md";
import TextInput from "../../../components/common/TextInput";
import { IoIosArrowDown } from "react-icons/io";
import { useUploadPic } from "../../../services/staff/query/user";

const RequestMedical = () => {
  const [values, setValues] = useState({
    startDate: "",
    endDate: "",
    amount: "",
    additionalComments: "",
  });

  const [fileLimit, setFileLimit] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [isUploaderEnabled, setIsUploaderEnabled] = useState(true);
  const [handleRemoveFileCalled, setHandleRemoveFileCalled] = useState(false);

  const {
    mutate: uploadMutate,
    isLoading: isUploading,
    data: profilePicData,
  } = useUploadPic({
    onSuccess: () => {
      setIsUploaderEnabled(true);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });
  const [currentImage, setCurrentImage] = useState("");

  const handleChange = (newFiles) => {
    const selected = newFiles[0];
    if (!selected) {
      return;
    }
    setCurrentImage(newFiles[0].name);
    const formData = new FormData();
    formData.append("file", selected);

    const filesArray = Array.isArray(newFiles)
      ? newFiles
      : Array.from(newFiles);

    if (filesArray.length === 0) {
      return;
    }

    const selectedFile = filesArray[0];
    const fileSizeInBytes = selectedFile.size;
    const limitInMB = Math.ceil(fileSizeInBytes / 1048576);

    if (limitInMB > 2) {
      setFileLimit(true);
    } else {
      setFileLimit(false);

      const isFileUnique = (file, fileList) => {
        return !fileList.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size,
        );
      };

      const newUniqueFiles = filesArray.filter((newFile) =>
        isFileUnique(newFile, files),
      );

      if (newUniqueFiles.length === 0) {
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newUniqueFiles]);

      if (isFileUnique(selectedFile, files)) {
        setIsUploaderEnabled(false);
        setHandleRemoveFileCalled(false);
        uploadMutate({
          fileType: "pdf",
          entityType: "staff",
          file: formData.get("file"),
        });
      }
    }
  };
  const [cleanedFileURLs, setCleanedFileURLs] = useState([]);

  useEffect(() => {
    if (profilePicData && !isUploading && !handleRemoveFileCalled) {
      setFileURLs((prevFileURLs) => {
        const newFileURLs = files.map((file) => ({
          name: file.name,
          url: profilePicData?.path,
        }));
        return [...prevFileURLs, ...newFileURLs];
      });
    }
  }, [profilePicData, isUploading, handleRemoveFileCalled]);

  useEffect(() => {
    const removeDuplicates = (arr, prop) => {
      return arr.filter(
        (obj, index, self) =>
          index === self.findIndex((el) => el[prop] === obj[prop]),
      );
    };
    const cleanedFiles = removeDuplicates(fileURLs, "name");

    setCleanedFileURLs(cleanedFiles);
  }, [fileURLs]);

  const handleRemoveFile = (indexToRemove) => {
    setHandleRemoveFileCalled(true);
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => _?.name !== indexToRemove),
    );
    setFileURLs((prevFiles) =>
      prevFiles.filter((_, index) => _?.name !== indexToRemove),
    );
    setCleanedFileURLs((prevFiles) =>
      prevFiles.filter((_, index) => _?.name !== indexToRemove),
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "56px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "8px",
      border: state.hasValue ? "1px solid #086375" : "1px solid #999999",
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
  const { mutate, isLoading } = useRequestMed({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/staff/medical-assistance");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      amount: Number(values?.amount),
      purpose: values?.purpose?.value,
      additionalComments: values?.additionalComments,
      documents: cleanedFileURLs,
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
              naira
              type="number"
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
              h="180px"
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
                setValues({ ...values, purpose: selectedOption })
              }
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
                            : item?.size / 1048576,
                        )}{" "}
                        {item?.size < 1048576 ? "KB" : "MB"}
                      </Text>
                    </Box>

                    <Flex align="center" gap="12px">
                      {isUploading && currentImage === item?.name ? (
                        <Spinner size="md" color="#086375" />
                      ) : (
                        <Flex
                          border="1px solid #08637533"
                          borderRadius="4px"
                          cursor="pointer"
                          w="32px"
                          onClick={() => handleRemoveFile(item?.name)}
                          h="32px"
                          justifyContent="center"
                          align="center"
                        >
                          <MdClose />
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                ))
              : ""}

            {isUploaderEnabled && (
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
            )}

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
            Submit Request
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequestMedical;
