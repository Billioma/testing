import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Image, Input, Spinner, Text } from "@chakra-ui/react";
import { trim } from "../../../../utils/helpers";
import { useCustomerUploadPic } from "../../../../services/customer/query/user";
import {
  useAddStaffDoc,
  useDelEmployeeDoc,
  useEditEmployeeDoc,
} from "../../../../services/admin/query/staff";
import useCustomToast from "../../../../utils/notifications";

const EmployeeDocuments = ({ refetch, id, data }) => {
  //   const [file, setFile] = useState("");
  const [mainFiles, setMainFiles] = useState({
    id: "",
    employmentLetter: "",
    guarantorForm: "",
    guarantorForm2: "",
    confidentialityAgreement: "",
    nonSolicitationAgreement: "",
    exclusivity: "",
    identificationDocument: "",
  });
  const [ids, setIds] = useState("");

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

  const { successToast, errorToast } = useCustomToast();

  const { mutate, isLoading } = useAddStaffDoc({
    onSuccess: () => {
      successToast("Employee Document added successfully!");
      refetch();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: updateMutate, isLoading: isUpdating } = useEditEmployeeDoc({
    onSuccess: () => {
      successToast("Employee Document updated successfully!");
      refetch();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const idToDelete = useRef(null);

  const { mutate: delMutate, isLoading: isDeleting } = useDelEmployeeDoc({
    onSuccess: () => {
      successToast("Employee Document deleted successfully!");
      refetch();
      const id = idToDelete.current;
      setMainFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        Object.keys(updatedFiles).forEach((key) => {
          if (updatedFiles[key]?.id === id) {
            updatedFiles[key] = "";
          }
        });
        return updatedFiles;
      });
      idToDelete.current = null;
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleDelete = (id) => {
    idToDelete.current = id;
    delMutate(id);
  };

  useEffect(() => {
    if (profilePicData?.path) {
      mutate({
        url: profilePicData?.path,
        name: ids,
        staff: id,
      });
    }
  }, [profilePicData]);

  const loading = isUploading || isLoading;

  const documents = data?.documents;
  useEffect(() => {
    const updatedFiles = { ...mainFiles }; // Create a copy of the current state

    documents.forEach((document) => {
      switch (document.name) {
        case "EMPLOYMENT LETTER":
          updatedFiles.employmentLetter = document;
          break;
        case "GUARANTOR FORM":
          updatedFiles.guarantorForm = document;
          break;
        case "GUARANTOR FORM 2":
          updatedFiles.guarantorForm2 = document;
          break;
        case "CONFIDENTIALITY AGREEMENT":
          updatedFiles.confidentialityAgreement = document;
          break;
        case "NON-SOLICITATION & NON COMPETITION AGREEMENT":
          updatedFiles.nonSolicitationAgreement = document;
          break;
        case "EXCLUSIVITY AND NON-CONFLICT OF INTEREST AGREEMENT":
          updatedFiles.exclusivity = document;
          break;
        case "IDENTIFICATION DOCUMENT":
          updatedFiles.identificationDocument = document;
          break;
        default:
          break;
      }
    });

    setMainFiles(updatedFiles);
  }, [documents]);

  return (
    <Box mt="24px">
      <Box>
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          Employee Letter
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.employmentLetter ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(mainFiles?.employmentLetter?.name) ||
                        "Employment Letter"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.employmentLetter?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(mainFiles?.employmentLetter?.id),
                          setIds("employmentLetter"))
                    }
                  >
                    {isDeleting && ids == "employmentLetter" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading && ids === "EMPLOYMENT LETTER" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="image_upload"
                        onChange={(e) => {
                          setIds("EMPLOYMENT LETTER");
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="image_upload">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          Guarantor 1 Form
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.guarantorForm ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(
                        mainFiles?.guarantorForm?.name?.replace("_", " ")
                      ) || "Guarantor 1 Form"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.guarantorForm?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(mainFiles?.guarantorForm?.id),
                          setIds("guarantorForm"))
                    }
                  >
                    {isDeleting && ids === "guarantorForm" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading && ids === "GUARANTOR FORM" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="guarantorForm"
                        onChange={(e) => {
                          setIds("GUARANTOR FORM");
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="guarantorForm">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          Guarantor 2 Form
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.guarantorForm2 ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(
                        mainFiles?.guarantorForm2?.name?.replace("_", " ")
                      ) || "Guarantor 2 Form"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.guarantorForm2?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(mainFiles?.guarantorForm2?.id),
                          setIds("guarantorForm2"))
                    }
                  >
                    {isDeleting && ids === "guarantorForm2" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading && ids === "GUARANTOR FORM 2" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="guarantorForm2"
                        onChange={(e) => {
                          setIds("GUARANTOR FORM 2");
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="guarantorForm2">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          Confidentiality Agreement
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.confidentialityAgreement ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(
                        mainFiles?.confidentialityAgreement?.name?.replace(
                          "_",
                          " "
                        )
                      ) || "Confidentiality Agreement"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.confidentialityAgreement?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(
                            mainFiles?.confidentialityAgreement?.id
                          ),
                          setIds("confidentialityAgreement"))
                    }
                  >
                    {isDeleting && ids === "confidentialityAgreement" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading && ids === "CONFIDENTIALITY AGREEMENT" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="confidentialityAgreement"
                        onChange={(e) => {
                          setIds("CONFIDENTIALITY AGREEMENT");
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="confidentialityAgreement">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          Non-Solicitation & Non-Competition Agreement
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.nonSolicitationAgreement ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(
                        mainFiles?.nonSolicitationAgreement?.name?.replace(
                          "_",
                          " "
                        )
                      ) || "Non-Solicitation & Non-Competition Agreement"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.nonSolicitationAgreement?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(
                            mainFiles?.nonSolicitationAgreement?.id
                          ),
                          setIds("nonSolicitationAgreement"))
                    }
                  >
                    {isDeleting && ids === "nonSolicitationAgreement" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading &&
                  ids === "NON-SOLICITATION & NON COMPETITION AGREEMENT" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="nonSolicitationAgreement"
                        onChange={(e) => {
                          setIds(
                            "NON-SOLICITATION & NON COMPETITION AGREEMENT"
                          );
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="nonSolicitationAgreement">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          Exclusivity & Non-Conflict of Interest Agreement
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.exclusivity ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(mainFiles?.exclusivity?.name?.replace("_", " ")) ||
                        "Exclusivity & Non-Conflict of Interest Agreement"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.exclusivity?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(mainFiles?.exclusivity?.id),
                          setIds("exclusivity"))
                    }
                  >
                    {isDeleting && ids === "exclusivity" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading &&
                  ids ===
                    "EXCLUSIVITY AND NON-CONFLICT OF INTEREST AGREEMENT" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="exclusivity"
                        onChange={(e) => {
                          setIds(
                            "EXCLUSIVITY AND NON-CONFLICT OF INTEREST AGREEMENT"
                          );
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="exclusivity">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Text mb="8px" fontSize="10px" color="#444648" fontWeight={500}>
          International Passport
        </Text>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="12px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            {mainFiles?.identificationDocument ? (
              <Flex
                align={{ base: "flex-start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "" }}
                w="full"
                justifyContent="space-between"
              >
                <Flex
                  align="center"
                  gap="10px"
                  cursor={loading ? "" : "pointer"}
                >
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668">
                      {trim(
                        mainFiles?.identificationDocument?.name?.replace(
                          "_",
                          " "
                        )
                      ) || "International Passport"}
                    </Text>
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      {mainFiles?.identificationDocument?.type || "MetaData"}
                    </Text>
                  </Box>
                </Flex>

                <Flex align="center" gap="12px">
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    cursor={isDeleting ? "" : "pointer"}
                    px="16px"
                    onClick={() =>
                      isDeleting
                        ? ""
                        : (handleDelete(mainFiles?.identificationDocument?.id),
                          setIds("identificationDocument"))
                    }
                  >
                    {isDeleting && ids === "identificationDocument" ? (
                      <Spinner color="red" size="md" />
                    ) : (
                      "Delete"
                    )}
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#090C02"
                    px="16px"
                  >
                    Download
                  </Flex>
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    fontSize="12px"
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text color="#661819" fontWeight={500}>
                    Nothing found!
                  </Text>
                  {loading && ids === "IDENTIFICATION DOCUMENT" ? (
                    <Spinner color="red" size="md" />
                  ) : (
                    <>
                      <Input
                        isDisabled={loading}
                        id="identificationDocument"
                        onChange={(e) => {
                          setIds("IDENTIFICATION DOCUMENT");
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          if (e.target.files[0]) {
                            {
                              uploadMutate({
                                fileType: "image",
                                entityType: "staff",
                                file: formData.get("file"),
                              });
                            }
                          }
                        }}
                        type="file"
                        display="none"
                      />
                      <label htmlFor="identificationDocument">
                        <Flex
                          border="1px solid #cccccc"
                          borderRadius="4px"
                          py="8px"
                          px="16px"
                          fontSize="12px"
                          cursor={loading ? "" : "pointer"}
                          fontWeight={500}
                          bg="#090C02"
                          color="#fff"
                        >
                          Upload
                        </Flex>
                      </label>
                    </>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDocuments;
