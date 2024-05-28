import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import {
  useApproveLicense,
  useEditEmployeeDoc,
} from "../../../../services/admin/query/staff";
import useCustomToast from "../../../../utils/notifications";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";
import { submits } from "../../../common/constants";
import ApproveDoc from "../../../modals/ApproveDoc";

const EmployeeDocuments = ({ refetch, data }) => {
  const [showApprove, setShowApprove] = useState(false);
  const [currentFile, setCurrentFile] = useState("");

  const open = (main) => {
    setShowApprove(true);
    setCurrentFile(main);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "35px",
      fontWeight: 500,
      color: "#646668",
      fontSize: "13px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
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

  const [newValues, setNewValues] = useState({
    employmentLetter: "",
    guarantorForm: "",
    guarantorForm2: "",
    confidentialityAgreement: "",
    nonSolicitationAgreement: "",
    exclusivity: "",
    identificationDocument: "",
  });

  const submitOptions = submits?.map((item) => ({
    value: item?.value,
    label: item?.name,
  }));
  const [ids, setIds] = useState("");
  const { successToast, errorToast } = useCustomToast();

  const handleSubmit = (dat, id) => {
    updateMutate({
      query: id?.id,
      body: {
        isSubmitted: dat,
      },
    });
  };

  const { mutate: updateMutate, isLoading: isUpdating } = useEditEmployeeDoc({
    onSuccess: () => {
      successToast("Employee Document updated successfully!");
      refetch();
      setShowApprove(false);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const { mutate: approveMutate, isLoading: isApprove } = useApproveLicense({
    onSuccess: () => {
      successToast("Driver license approved!");
      setShowApprove(false);
      refetch();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const handleApprove = (id) => {
    updateMutate({
      query: id?.id,
      body: {
        status: "VERIFIED",
      },
    });
  };

  const handleApproveLicense = () => {
    approveMutate(data?.id);
  };

  const documents = data?.documents;

  useEffect(() => {
    const updatedFiles = { ...mainFiles };

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
      <ApproveDoc
        isOpen={showApprove}
        isLoading={isApprove || isUpdating}
        id={ids}
        action={() =>
          ids === "Driver's License"
            ? handleApproveLicense()
            : handleApprove(currentFile)
        }
        onClose={() => setShowApprove(false)}
      />
      <Box>
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="20px" h="20px" />
                  <Box>
                    <Text fontSize="14px" color="#646668">
                      Employment Letter
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.employmentLetter?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.employmentLetter?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.employmentLetter?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              {mainFiles?.employmentLetter?.isSubmitted ? (
                <Flex
                  border="1px solid #cccccc"
                  borderRadius="4px"
                  py="8px"
                  px="16px"
                  fontSize="12px"
                  cursor={isUpdating ? "" : "pointer"}
                  display={
                    mainFiles?.employmentLetter?.status === "VERIFIED"
                      ? "none"
                      : "flex"
                  }
                  onClick={() =>
                    isUpdating
                      ? ""
                      : (open(mainFiles?.employmentLetter),
                        setIds("Employment Letter"))
                  }
                  fontWeight={500}
                  bg="#090C02"
                  color="#fff"
                >
                  Approve
                </Flex>
              ) : (
                <Select
                  styles={customStyles}
                  options={submitOptions}
                  placeholder="Unsubmitted"
                  value={newValues?.employmentLetter}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isUpdating && ids === "Employment Letter" ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setNewValues({
                      ...newValues,
                      employmentLetter: selectedOption,
                    });
                    setIds("Employment Letter");
                    handleSubmit(
                      selectedOption?.value,
                      mainFiles?.employmentLetter,
                    );
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="20px" h="20px" />
                  <Box>
                    <Text color="#646668" fontSize="14px">
                      Guarantor 1 Form
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.guarantorForm?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.guarantorForm?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.guarantorForm?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              <Flex align="center" gap="12px">
                {mainFiles?.guarantorForm?.isSubmitted ? (
                  <Flex
                    border="1px solid #cccccc"
                    borderRadius="4px"
                    py="8px"
                    px="16px"
                    display={
                      mainFiles?.guarantorForm?.status === "VERIFIED"
                        ? "none"
                        : "flex"
                    }
                    fontSize="12px"
                    cursor={isUpdating ? "" : "pointer"}
                    onClick={() =>
                      isUpdating
                        ? ""
                        : (open(mainFiles?.guarantorForm),
                          setIds("Guarantor Form"))
                    }
                    fontWeight={500}
                    bg="#090C02"
                    color="#fff"
                  >
                    Approve
                  </Flex>
                ) : (
                  <Select
                    styles={customStyles}
                    options={submitOptions}
                    placeholder="Unsubmitted"
                    value={newValues?.guarantorForm}
                    components={{
                      IndicatorSeparator: () => (
                        <div style={{ display: "none" }}></div>
                      ),
                      DropdownIndicator: () => (
                        <div>
                          {isUpdating && ids === "Guarantor Form" ? (
                            <Spinner size="sm" />
                          ) : (
                            <IoIosArrowDown size="15px" color="#646668" />
                          )}
                        </div>
                      ),
                    }}
                    onChange={(selectedOption) => {
                      setNewValues({
                        ...newValues,
                        guarantorForm: selectedOption,
                      });
                      setIds("Guarantor Form");
                      handleSubmit(
                        selectedOption?.value,
                        mainFiles?.guarantorForm,
                      );
                    }}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text fontSize="14px" color="#646668">
                      Guarantor 2 Form
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.guarantorForm2?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.guarantorForm2?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.guarantorForm2?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              {mainFiles?.guarantorForm2?.isSubmitted ? (
                <Flex
                  border="1px solid #cccccc"
                  borderRadius="4px"
                  py="8px"
                  px="16px"
                  fontSize="12px"
                  cursor={isUpdating ? "" : "pointer"}
                  display={
                    mainFiles?.guarantorForm2?.status === "VERIFIED"
                      ? "none"
                      : "flex"
                  }
                  onClick={() =>
                    isUpdating
                      ? ""
                      : (open(mainFiles?.guarantorForm2),
                        setIds("Guarantor Form 2"))
                  }
                  fontWeight={500}
                  bg="#090C02"
                  color="#fff"
                >
                  Approve
                </Flex>
              ) : (
                <Select
                  styles={customStyles}
                  options={submitOptions}
                  placeholder="Unsubmitted"
                  value={newValues?.guarantorForm2}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isUpdating && ids === "Guarantor Form 2" ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setNewValues({
                      ...newValues,
                      guarantorForm2: selectedOption,
                    });
                    setIds("Guarantor Form 2");
                    handleSubmit(
                      selectedOption?.value,
                      mainFiles?.guarantorForm2,
                    );
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668" fontSize="14px">
                      Confidentiality Agreement
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.confidentialityAgreement?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.confidentialityAgreement?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.confidentialityAgreement?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              {mainFiles?.confidentialityAgreement?.isSubmitted ? (
                <Flex
                  border="1px solid #cccccc"
                  borderRadius="4px"
                  py="8px"
                  px="16px"
                  fontSize="12px"
                  cursor={isUpdating ? "" : "pointer"}
                  display={
                    mainFiles?.confidentialityAgreement?.status === "VERIFIED"
                      ? "none"
                      : "flex"
                  }
                  onClick={() =>
                    isUpdating
                      ? ""
                      : (open(mainFiles?.confidentialityAgreement),
                        setIds("Confidentiality Agreement"))
                  }
                  fontWeight={500}
                  bg="#090C02"
                  color="#fff"
                >
                  Approve
                </Flex>
              ) : (
                <Select
                  styles={customStyles}
                  options={submitOptions}
                  placeholder="Unsubmitted"
                  value={newValues?.confidentialityAgreement}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isUpdating && ids === "Confidentiality Agreement" ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setNewValues({
                      ...newValues,
                      confidentialityAgreement: selectedOption,
                    });
                    setIds("Confidentiality Agreement");
                    handleSubmit(
                      selectedOption?.value,
                      mainFiles?.confidentialityAgreement,
                    );
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668" fontSize="14px">
                      Non-Solicitation & Non-Competition Agreement
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.nonSolicitationAgreement?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.nonSolicitationAgreement?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.nonSolicitationAgreement?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              {mainFiles?.nonSolicitationAgreement?.isSubmitted ? (
                <Flex
                  border="1px solid #cccccc"
                  borderRadius="4px"
                  py="8px"
                  px="16px"
                  fontSize="12px"
                  cursor={isUpdating ? "" : "pointer"}
                  display={
                    mainFiles?.nonSolicitationAgreement?.status === "VERIFIED"
                      ? "none"
                      : "flex"
                  }
                  onClick={() =>
                    isUpdating
                      ? ""
                      : (open(mainFiles?.nonSolicitationAgreement),
                        setIds("Non-Solicitation & Non-Competition Agreement"))
                  }
                  fontWeight={500}
                  bg="#090C02"
                  color="#fff"
                >
                  Approve
                </Flex>
              ) : (
                <Select
                  styles={customStyles}
                  options={submitOptions}
                  placeholder="Unsubmitted"
                  value={newValues?.nonSolicitationAgreement}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isUpdating &&
                        ids ===
                          "Non-Solicitation & Non-Competition Agreement" ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setNewValues({
                      ...newValues,
                      nonSolicitationAgreement: selectedOption,
                    });
                    setIds("Non-Solicitation & Non-Competition Agreement");
                    handleSubmit(
                      selectedOption?.value,
                      mainFiles?.nonSolicitationAgreement,
                    );
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668" fontSize="14px">
                      Exclusivity & Non-Conflict of Interest Agreement
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.exclusivity?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.exclusivity?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.exclusivity?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              {mainFiles?.exclusivity?.isSubmitted ? (
                <Flex
                  border="1px solid #cccccc"
                  borderRadius="4px"
                  py="8px"
                  px="16px"
                  fontSize="12px"
                  cursor={isUpdating ? "" : "pointer"}
                  display={
                    mainFiles?.exclusivity?.status === "VERIFIED"
                      ? "none"
                      : "flex"
                  }
                  onClick={() =>
                    isUpdating
                      ? ""
                      : (open(mainFiles?.exclusivity),
                        setIds(
                          "Exclusivity & Non-Conflict of Interest Agreement",
                        ))
                  }
                  fontWeight={500}
                  bg="#090C02"
                  color="#fff"
                >
                  Approve
                </Flex>
              ) : (
                <Select
                  styles={customStyles}
                  options={submitOptions}
                  placeholder="Unsubmitted"
                  value={newValues?.exclusivity}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isUpdating &&
                        ids ===
                          "Exclusivity & Non-Conflict of Interest Agreement" ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setNewValues({
                      ...newValues,
                      exclusivity: selectedOption,
                    });
                    setIds("Exclusivity & Non-Conflict of Interest Agreement");
                    handleSubmit(selectedOption?.value, mainFiles?.exclusivity);
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668" fontSize="14px">
                      Identification Document
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    mainFiles?.identificationDocument?.status === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    mainFiles?.identificationDocument?.status === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {mainFiles?.identificationDocument?.status === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              {mainFiles?.identificationDocument?.isSubmitted ? (
                <Flex
                  border="1px solid #cccccc"
                  borderRadius="4px"
                  py="8px"
                  px="16px"
                  fontSize="12px"
                  display={
                    mainFiles?.identificationDocument?.status === "VERIFIED"
                      ? "none"
                      : "flex"
                  }
                  cursor={isUpdating ? "" : "pointer"}
                  onClick={() =>
                    isUpdating
                      ? ""
                      : (open(mainFiles?.identificationDocument),
                        setIds("Identification Document"))
                  }
                  fontWeight={500}
                  bg="#090C02"
                  color="#fff"
                >
                  Approve
                </Flex>
              ) : (
                <Select
                  styles={customStyles}
                  options={submitOptions}
                  placeholder="Unsubmitted"
                  value={newValues?.identificationDocument}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isUpdating && ids === "Identification Document" ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setNewValues({
                      ...newValues,
                      identificationDocument: selectedOption,
                    });
                    setIds("Identification Document");
                    handleSubmit(
                      selectedOption?.value,
                      mainFiles?.identificationDocument,
                    );
                  }}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box mt="24px">
        <Box w="full">
          <Flex
            border="1px solid #d4d6d8"
            borderRadius="4px"
            py="20px"
            align="center"
            px="16px"
            justifyContent="space-between"
            w="full"
          >
            <Flex
              align={{ base: "flex-start", md: "center" }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "10px", md: "" }}
              w="full"
              justifyContent="space-between"
            >
              <Flex align="flex-start" gap="30px">
                <Flex align="center" gap="10px">
                  <Image src="/assets/folder.jpg" w="24px" h="24px" />
                  <Box>
                    <Text color="#646668" fontSize="14px">
                      Driver's License
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent="center"
                  align="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                  fontWeight={500}
                  fontSize="13px"
                  bg={
                    data?.driverLicenseStatus === "VERIFIED"
                      ? "#E5FFE5"
                      : "#FDF6E7"
                  }
                  color={
                    data?.driverLicenseStatus === "VERIFIED"
                      ? "#008000"
                      : "#F9A11E"
                  }
                >
                  {data?.driverLicenseStatus === "VERIFIED"
                    ? "Verified"
                    : "Pending"}
                </Flex>
              </Flex>

              <Flex
                border="1px solid #cccccc"
                borderRadius="4px"
                py="8px"
                px="16px"
                display={
                  data?.driverLicenseStatus === "VERIFIED" ? "none" : "flex"
                }
                fontSize="12px"
                cursor={isApprove ? "" : "pointer"}
                onClick={() =>
                  isApprove
                    ? ""
                    : (open(""),
                      // handleApproveLicense(),
                      setIds("Driver's License"))
                }
                fontWeight={500}
                bg="#090C02"
                color="#fff"
              >
                Approve
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDocuments;
