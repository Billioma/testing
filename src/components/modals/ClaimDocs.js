import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { MdClose } from "react-icons/md";
import { formatDat } from "../../utils/helpers";
import {
  useCustomerUploadPic,
  useUploadIncidentDocs,
} from "../../services/customer/query/user";
import useCustomToast from "../../utils/notifications";

const ClaimDocs = ({ isOpen, refetch, data, onClose }) => {
  const [fileLimit, setFileLimit] = useState({});
  const [files, setFiles] = useState([]);
  const [uploadingFileName, setUploadingFileName] = useState("");

  // Initialize files state with existing documents
  useEffect(() => {
    if (data?.documents) {
      const initialFiles = data.documents.map((doc) => ({
        name: doc.name,
        file: doc.url ? { url: doc.url } : null, // Use URL if it exists
      }));
      setFiles(initialFiles);
    }
  }, [data]);

  const { mutate: uploadMutate, isLoading: isUploading } = useCustomerUploadPic(
    {
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
        setUploadingFileName("");
      },
      onSuccess: (data, variables) => {
        const { fileType } = variables;
        const url = data?.path;
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.name === fileType ? { ...file, file: { url } } : file
          )
        );
        setUploadingFileName(""); // Reset on success
      },
    }
  );

  const handleChange = (newFile, fileType) => {
    if (!newFile) return;

    const formData = new FormData();
    formData.append("file", newFile);

    const fileSizeInBytes = newFile.size;
    const limitInMB = Math.ceil(fileSizeInBytes / 1048576);

    if (limitInMB > 2) {
      setFileLimit((prevLimits) => ({
        ...prevLimits,
        [fileType]: true,
      }));
    } else {
      setFileLimit((prevLimits) => ({
        ...prevLimits,
        [fileType]: false,
      }));
      setUploadingFileName(fileType);

      uploadMutate({
        fileType,
        entityType: "customer",
        file: formData.get("file"),
      });

      setFiles((prevFiles) => {
        const existingFile = prevFiles.find((file) => file.name === fileType);
        if (existingFile) {
          return prevFiles.map((file) =>
            file.name === fileType ? { ...file, file: newFile } : file
          );
        } else {
          return [...prevFiles, { name: fileType, file: newFile }];
        }
      });
    }
  };

  const handleRemoveFile = (fileType) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileType));
  };

  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useUploadIncidentDocs(
    {
      onSuccess: () => {
        refetch();
        successToast("Docs submitted successfully!");
        onClose();
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    }
  );

  const handleSubmit = () => {
    const compiledDocuments = {
      documents: data?.documents
        ?.map((doc) => {
          const uploadedDoc = files.find((f) => f.name === doc.name);
          return uploadedDoc && uploadedDoc.file?.url
            ? {
                id: doc?.id,
                url: uploadedDoc.file.url,
              }
            : null;
        })
        .filter((doc) => doc !== null),
    };

    updateMutate({
      query: data?.id,
      body: compiledDocuments,
    });
  };

  return (
    <Drawer
      isCentered
      trapFocus={false}
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
      <DrawerContent p="20px" overflowY="auto" bg="#fff" color="#000">
        <DrawerBody px="0">
          <Flex justifyContent="center">
            <Image
              src="/assets/claim.svg"
              w="50px"
              h="50px"
              objectFit="contain"
            />
          </Flex>

          <Text
            color="#242628"
            my="17px"
            textAlign="center"
            fontSize="22px"
            fontWeight={700}
          >
            Incident Claim Update
          </Text>

          <Text color="#444648" textAlign="center" fontSize="14px">
            Your incident claim #{data?.id}, submitted on{" "}
            {formatDat(data?.dateOfReport)}, is currently under review. To
            expedite the review process, please upload the following documents.
            Thank you for your cooperation.
          </Text>

          {data?.documents?.map((doc) => (
            <Box key={doc?.name} mt="16px">
              <Flex mb="8px" align="center" justifyContent="space-between">
                <Text fontWeight={500} color="#444648" fontSize="10px">
                  {doc?.name}
                </Text>

                <Flex
                  bg="#f6f6f6"
                  rounded="full"
                  p="4px"
                  w="fit-content"
                  cursor="pointer"
                  display={
                    files?.find(
                      (item) => item?.name === doc?.name && item.file?.url
                    )
                      ? "flex"
                      : "none"
                  }
                  justifyContent="center"
                  align="center"
                  onClick={() => handleRemoveFile(doc?.name)}
                >
                  <MdClose size="15px" />
                </Flex>
              </Flex>
              <FileUploader
                handleChange={(file) => handleChange(file, doc?.name)}
                name={doc?.name}
              >
                <Flex
                  cursor="pointer"
                  border="1px dashed #d4d6d8"
                  borderRadius="4px"
                  w="full"
                  color="#090c02"
                  h="72px"
                  gap="10px"
                  justifyContent="center"
                  align="center"
                >
                  <Image
                    w="16px"
                    display={uploadingFileName === doc?.name ? "none" : ""}
                    h="16px"
                    objectFit="contain"
                    src={
                      files?.find(
                        (item) =>
                          item?.name === doc?.name &&
                          (item.file?.url || item.file)
                      )
                        ? "/assets/green-check.svg"
                        : "/assets/uploader.svg"
                    }
                  />
                  {uploadingFileName === doc?.name ? (
                    <Flex align="center" justifyContent="center">
                      <Spinner size="sm" />
                    </Flex>
                  ) : files?.find(
                      (item) =>
                        item?.name === doc?.name &&
                        (item.file?.url || item.file)
                    ) ? (
                    <Text fontSize="14px">{doc?.name} uploaded</Text>
                  ) : (
                    <Text fontSize="14px">
                      Drag and drop your files here or{" "}
                      <span style={{ textDecoration: "underline" }}>
                        choose file
                      </span>
                    </Text>
                  )}
                </Flex>
              </FileUploader>

              <Text
                color="tomato"
                display={fileLimit[doc?.name] ? "block" : "none"}
                textAlign="center"
                mt="8px"
                fontSize="12px"
              >
                File size exceeds 2MB limit!
              </Text>
            </Box>
          ))}

          <Button
            mt="16px"
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            isDisabled={isUploading}
            isLoading={isUpdating}
            w="full"
            onClick={handleSubmit}
            py="17px"
          >
            Save
          </Button>

          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _focus={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            color="#848688"
            mt="16px"
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            onClick={onClose}
            w="full"
            py="17px"
          >
            Skip for later
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ClaimDocs;
