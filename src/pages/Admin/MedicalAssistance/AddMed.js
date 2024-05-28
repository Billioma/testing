import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  initAdminMedValues,
  validateAdminMedSchema,
} from "../../../utils/validation";
import AdminTextInput from "../../../components/common/AdminTextInput";
import { Form, Formik } from "formik";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { IoIosArrowDown } from "react-icons/io";
import {
  useAdminCreateMed,
  useGetStaffs,
} from "../../../services/admin/query/staff";
import { FileUploader } from "react-drag-drop-files";
import CustomInput from "../../../components/common/AdminCustomInput";
import { useUploadPic } from "../../../services/staff/query/user";
import { MdClose } from "react-icons/md";

const AddMed = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [fileLimit, setFileLimit] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [isUploaderEnabled, setIsUploaderEnabled] = useState(true);
  const [handleRemoveFileCalled, setHandleRemoveFileCalled] = useState(false);

  const { errorToast, successToast } = useCustomToast();

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

  const { data: allStaff, isLoading: isStaff } = useGetStaffs({}, 1, 1000);

  const staffOptions = allStaff?.data?.map((staff) => ({
    label: staff?.fullName,
    value: Number(staff?.id),
  }));

  const navigate = useNavigate();

  const handleUpload = (newFiles) => {
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

  const { mutate, isLoading } = useAdminCreateMed({
    onSuccess: () => {
      successToast("Loan created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_MEDICAL_ASSISTANCE);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

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

  const handleSubmit = (values = "") => {
    const { staffId, purpose, ...rest } = values;
    if (formSubmitted && !cleanedFileURLs?.length) {
      return null;
    } else {
      mutate({
        purpose: purpose.value,
        staffId: staffId.value,
        documents: cleanedFileURLs,
        ...rest,
      });
    }
  };

  return (
    <Box minH="75vh">
      <GoBackTab />
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="28px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Text
              fontSize="18px"
              color="#090c02"
              fontWeight={500}
              pb="10px"
              borderBottom="1px solid #E4E6E8"
            >
              Add Medical Assistance
            </Text>

            <Formik
              onSubmit={handleSubmit}
              initialValues={initAdminMedValues}
              validationSchema={validateAdminMedSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
              }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    handleSubmit(e);
                  }}
                >
                  <Flex flexDir="column" gap="24px" mt="24px">
                    <Box w="full" pb="25px" borderBottom="1px solid #E4E6E8">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#090c02"
                      >
                        Staff{" "}
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
                          formSubmitted && !values?.staffId
                            ? errorCustomStyles
                            : customStyles
                        }
                        isDisabled={isStaff}
                        placeholder={
                          !isStaff ? "Select Staff" : <Spinner size="sm" />
                        }
                        options={staffOptions}
                        name="staffId"
                        onChange={(selectedOption) => {
                          setValues({
                            ...values,
                            staffId: selectedOption,
                          });
                        }}
                        onBlur={handleBlur}
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

                      {formSubmitted && !values?.staffId && (
                        <Text mt="8px" fontSize="13px" color="tomato">
                          Staff is required
                        </Text>
                      )}
                    </Box>

                    <Box w="full">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#090c02"
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
                        auth
                        mb
                        naira
                        holder="Enter Amount"
                        type="number"
                        name="amount"
                        value={values?.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          (formSubmitted || touched?.amount) && errors?.amount
                        }
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#090c02"
                        fontWeight={700}
                        mb="9px"
                        fontSize="10px"
                      >
                        PURPOSE
                      </Text>
                      <Select
                        styles={
                          formSubmitted && !values?.purpose
                            ? errorCustomStyles
                            : customStyles
                        }
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
                        value={values?.purpose}
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            purpose: selectedOption,
                          })
                        }
                      />
                    </Box>

                    <Box>
                      <Text
                        fontWeight={700}
                        mb="9px"
                        color="#090c02"
                        fontSize="10px"
                      >
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
                          handleChange={handleUpload}
                          name="file"
                        >
                          <Flex
                            cursor="pointer"
                            border={
                              formSubmitted && !cleanedFileURLs?.length
                                ? "1px dashed red"
                                : "1px dashed #E2E5DC"
                            }
                            borderRadius="4px"
                            w="full"
                            color="#090c02"
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
                            <Text
                              fontSize="14px"
                              color={
                                formSubmitted && !cleanedFileURLs?.length
                                  ? "red"
                                  : ""
                              }
                            >
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

                    <Box w="full">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Additional Comments
                      </Text>
                      <AdminTextInput
                        h="100px"
                        auth
                        mb
                        holder="Enter Additional Comments"
                        name="additionalComments"
                        value={values?.additionalComments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          (formSubmitted || touched?.additionalComments) &&
                          errors?.additionalComments
                        }
                      />
                    </Box>
                  </Flex>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="45%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_LOAN)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="55%"
                      isLoading={isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddMed;
