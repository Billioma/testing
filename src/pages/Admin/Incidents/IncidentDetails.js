import React, { useEffect, useState } from "react";

import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdCheck } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAdminIncident,
  useUploadIncidentDocs,
} from "../../../services/admin/query/reports";
import { formatDateTime } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { PRIVATE_PATHS } from "../../../routes/constants";
import ViewDoc from "../../../components/modals/ViewDoc";
import { useIncidentStatus } from "../../../services/customer/query/user";

export const Layout = ({ label, data }) => {
  return (
    <Flex
      mb="24px"
      align={{
        base: label === "Location" ? "flex-start" : "center",
        md: "center",
      }}
      lineHeight="100%"
      gap={{
        base: label === "Location" ? "10px" : "unset",
        md: "unset",
      }}
      flexDir={{ base: label === "Location" ? "column" : "row", md: "row" }}
      justifyContent="space-between"
      w="full"
      color="#646668"
    >
      <Box w="full">
        <Text fontSize="14px">{label}</Text>
      </Box>
      <Flex
        justifyContent={{
          base: label === "Location" ? "flex-start" : "flex-end",
          md: "flex-end",
        }}
        w={{
          base: label === "Selected Vehicle" ? "fit-content" : "full",
          md: "full",
        }}
      >
        <Text fontWeight={500}>{data}</Text>
      </Flex>
    </Flex>
  );
};

const IncidentDetails = () => {
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [values, setValues] = useState({
    governmentId: false,
    proofOfOwnership: false,
    proofOfInsurance: false,
    thirdPartyStatement: false,
    estimateOfRepair: false,
    others: false,
  });

  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [otherDocument, setOtherDocument] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShowStatus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { mutate, data, isLoading } = useGetAdminIncident();

  useEffect(() => {
    if (data?.documents?.length) {
      setShow(true);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setStatus(data?.status?.toLowerCase());
    }
  }, [data]);

  useEffect(() => {
    mutate(id);
  }, []);

  const documentTypes = [
    { label: "Government ID", name: "governmentId" },
    { label: "Proof of Ownership", name: "proofOfOwnership" },
    { label: "Proof of Insurance", name: "proofOfInsurance" },
    { label: "3rd Party Statement", name: "thirdPartyStatement" },
    { label: "Estimate of Repair", name: "estimateOfRepair" },
    { label: "Others", name: "others" },
  ];
  const navigate = useNavigate();

  const { errorToast, successToast, infoToast } = useCustomToast();
  const { mutate: uploadMutate, isLoading: isUploading } =
    useUploadIncidentDocs({
      onSuccess: () => {
        successToast("Docs updated successfully!");
        navigate(PRIVATE_PATHS.ADMIN_INCIDENTS);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });
  const { mutate: statusMutate, isLoading: isStatus } = useIncidentStatus({
    onSuccess: () => {
      successToast("Status updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_INCIDENTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    uploadMutate({
      query: id,
      body: {
        documents: selectedDocuments,
      },
    });
  };

  const handleStatus = () => {
    statusMutate({
      query: id,
      body: {
        status: status?.replace(" ", "_")?.toUpperCase(),
      },
    });
  };

  const excludedKeys = ["others"];
  const filteredValues = Object.keys(values)
    .filter((key) => !excludedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});

  const allTrue = Object.values(filteredValues).every(
    (value) => value === true
  );

  const handleCheckboxChange = (name, label) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: !prevValues[name] };

      if (name === "others") {
        if (!newValues[name] && otherDocument) {
          setSelectedDocuments((prev) =>
            prev.filter((doc) => doc.name !== otherDocument)
          );
        } else if (newValues[name] && otherDocument) {
          setSelectedDocuments((prev) => {
            const updatedDocs = prev.filter(
              (doc) => doc.name !== otherDocument
            );
            return [...updatedDocs, { name: otherDocument, isRequired: true }];
          });
        }
      } else {
        if (newValues[name]) {
          setSelectedDocuments((prev) => {
            const isAlreadySelected = prev.some((doc) => doc.name === label);
            if (!isAlreadySelected) {
              return [...prev, { name: label, isRequired: true }];
            }
            return prev;
          });
        } else {
          setSelectedDocuments((prev) =>
            prev.filter((doc) => doc.name !== label)
          );
        }
      }

      return newValues;
    });
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    setOtherDocument(value);
    setSelectedDocuments((prev) => {
      const updatedDocs = prev.filter((doc) => doc.name !== otherDocument);

      if (value) {
        return [...updatedDocs, { name: value, isRequired: true }];
      }
      return updatedDocs;
    });
  };

  return (
    <Box minH="75vh">
      <ViewDoc
        mutate={mutate}
        id={id}
        isOpen={isOpen}
        data={currentImage}
        onClose={onClose}
      />
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent={show ? "flex-start" : "center"}
              gap={show ? "30px" : "unset"}
              align={show ? "flex-start" : "center"}
              w="full"
              flexDir={{ base: "column", md: show ? "row" : "column" }}
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{
                  md: show ? "" : "30rem",
                  base: "100%",
                  "3xl": show ? "" : "35rem",
                }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Text
                  mb="24px"
                  color="#646668"
                  fontWeight={500}
                  fontSize="14px"
                >
                  Customer Information
                </Text>

                <Layout
                  label="Full Name"
                  data={`${data?.serviceLog?.customer?.profile?.firstName} ${data?.serviceLog?.customer?.profile?.lastName}`}
                />
                <Layout
                  label="Phone Number"
                  data={data?.serviceLog?.customer?.profile?.phone}
                />

                <Text
                  mb="24px"
                  color="#646668"
                  fontWeight={500}
                  fontSize="14px"
                >
                  Vehicle Information
                </Text>

                <Layout
                  label="Make"
                  data={data?.serviceLog?.vehicle?.make?.name}
                />
                <Layout
                  label="Model"
                  data={data?.serviceLog?.vehicle?.model?.name}
                />
                <Layout
                  label="Colour"
                  data={data?.serviceLog?.vehicle?.color}
                />
                <Layout
                  label="License Plate No."
                  data={data?.serviceLog?.vehicle?.licensePlate}
                />
                <Layout label="State" data={data?.serviceLog?.vehicle?.state} />

                <Text
                  mb="24px"
                  color="#646668"
                  fontWeight={500}
                  fontSize="14px"
                >
                  Service Information
                </Text>

                <Layout
                  label="Service Type"
                  data={data?.serviceLog?.service?.name}
                />

                <Text
                  mb="24px"
                  color="#646668"
                  fontWeight={500}
                  fontSize="14px"
                >
                  Incident Summary
                </Text>

                <Layout
                  label="Date of Incident"
                  data={formatDateTime(data?.dateOfIncident)}
                />
                <Layout
                  label="Location"
                  data={data?.serviceLog?.location?.name || "N/A"}
                />
                <Layout label="Staff Involved" data="John Doe" />
                {/* <Layout label="Supervisor on Duty" data="Jane Doe" /> */}
                <Layout
                  label="Manager on Duty"
                  data={`${data?.locationManager?.firstName} ${data?.locationManager?.lastName}`}
                />
                <Layout
                  label="Manager Reporting"
                  data={`${data?.manager?.firstName} ${data?.manager?.lastName}`}
                />
                <Layout
                  label="Date"
                  data={formatDateTime(data?.dateOfReport)}
                />

                <Button
                  fontSize="14px"
                  variant="adminPrimary"
                  display={show ? "none" : "flex"}
                  fontWeight={500}
                  onClick={() => setShow(true)}
                  lineHeight="100%"
                  w="full"
                  py="17px"
                >
                  Select Documents
                </Button>
              </Flex>

              <Flex
                bg="#fff"
                display={show ? "flex" : "none"}
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{
                  md: show ? "" : "30rem",
                  base: "100%",
                  "3xl": show ? "" : "35rem",
                }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Text
                  mb="24px"
                  color="#646668"
                  fontWeight={500}
                  fontSize="14px"
                >
                  Summary Notes
                </Text>
                <Box
                  bg="#f4f6f8"
                  color="#646668"
                  borderRadius="4px"
                  p="15px"
                  fontSize="14px"
                >
                  By utilizing the parking and valet management services
                  provided by EZPark Limited, you agree to be bound by these
                  terms and conditions. Please read them carefully before using
                  our services.
                </Box>

                <Flex align="center" my="24px" justifyContent="space-between">
                  <Text color="#646668" fontWeight={500} fontSize="14px">
                    {data?.documents?.length ? "Uploaded" : "Request"} Documents
                  </Text>

                  <Flex align="center" gap="20px">
                    <Flex
                      bg="#EE383A"
                      w="16px"
                      borderRadius="4px"
                      display={data?.documents?.length ? "none" : "flex"}
                      h="16px"
                      justifyContent="center"
                      align="center"
                      color="#fff"
                    >
                      {allTrue ? <MdCheck /> : "-"}
                    </Flex>

                    <Flex
                      onClick={() => setShowAll((prev) => !prev)}
                      cursor="pointer"
                    >
                      {showAll ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Flex>
                  </Flex>
                </Flex>

                <Box
                  px="30px"
                  display={
                    data?.documents?.length && showAll ? "block" : "none"
                  }
                >
                  {data?.documents?.map((item, i) => (
                    <Flex
                      key={i}
                      onClick={() =>
                        item?.url
                          ? (onOpen(), setCurrentImage(item))
                          : infoToast("Customer has not uploaded this document")
                      }
                      mb="14px"
                      align="center"
                      cursor="pointer"
                      gap="12px"
                      w="fit-content"
                    >
                      <Image
                        src="/assets/folders.svg"
                        w="16px"
                        h="16px"
                        objectFit="contain"
                      />
                      <Text
                        textDecor="underline"
                        color="#646668"
                        fontSize="14px"
                      >
                        {item?.name}
                      </Text>
                    </Flex>
                    // </a>
                  ))}
                </Box>

                <Text
                  color="#646668"
                  fontWeight={500}
                  mt="25px"
                  fontSize="14px"
                  display={
                    data?.documents?.length && showAll ? "block" : "none"
                  }
                >
                  Status
                </Text>

                <Box pos="relative" className="box">
                  <Flex
                    align="center"
                    display={
                      data?.documents?.length && showAll ? "flex" : "none"
                    }
                    my="20px"
                    w="fit-content"
                    cursor="pointer"
                    onClick={() => setShowStatus((prev) => !prev)}
                    gap="5px"
                  >
                    <Flex
                      bg="#F4F6F8"
                      borderRadius="4px"
                      h="30px"
                      justifyContent="center"
                      align="center"
                      px="16px"
                      color="#646668"
                      fontSize="12px"
                      textTransform="capitalize"
                    >
                      {status?.replace("_", " ").toLowerCase()}
                    </Flex>

                    <Flex
                      bg="#F4F6F8"
                      borderRadius="4px"
                      w="30px"
                      justifyContent="center"
                      align="center"
                      h="30px"
                    >
                      <IoIosArrowDown />
                    </Flex>
                  </Flex>

                  <Box
                    bg="#F4F6F8"
                    display={showStatus ? "" : "none"}
                    borderRadius="4px"
                    justifyContent="center"
                    align="center"
                    cursor="pointer"
                    color="#646668"
                    pos="absolute"
                    left="0"
                    w="24%"
                    top="60px"
                    py="5px"
                    zIndex={22}
                    border="1px solid #d4d6d8"
                    fontSize="12px"
                  >
                    {[
                      "Pending",
                      "In Progress",
                      "Completed",
                      "Under Review",
                    ].map((item, i) => (
                      <Text
                        px="16px"
                        py="8px"
                        _hover={{ bg: "#d4d6d8" }}
                        cursor="pointer"
                        onClick={() => {
                          setStatus(item);
                          setShowStatus(false);
                        }}
                        transition=".3s ease-in-out"
                      >
                        {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
                <Box
                  px="30px"
                  display={
                    data?.documents?.length
                      ? "none"
                      : showAll
                      ? "block"
                      : "none"
                  }
                >
                  {documentTypes.map((item, i) => (
                    <Flex
                      key={i}
                      mb="14px"
                      align="center"
                      cursor="pointer"
                      w="fit-content"
                    >
                      <Checkbox
                        size="sm"
                        isChecked={values[item.name]}
                        onChange={() =>
                          handleCheckboxChange(item.name, item.label)
                        }
                      />
                      <Text
                        onClick={() =>
                          handleCheckboxChange(item.name, item.label)
                        }
                        ml="12px"
                        color="#646668"
                        fontSize="14px"
                      >
                        {item?.label}
                      </Text>
                    </Flex>
                  ))}

                  <Input
                    display={values?.others ? "" : "none"}
                    value={otherDocument}
                    onChange={handleOtherInputChange}
                    placeholder="Highlight what document is required"
                    h="32px"
                    borderRadius="4px"
                    p="10px"
                    fontSize="13px"
                    _placeholder={{ color: "#949698" }}
                    color="#000"
                    border="1px solid #E4E6E8"
                  />
                </Box>
                <Button
                  mt={values?.others ? "24px" : "0"}
                  fontSize="14px"
                  variant="adminPrimary"
                  fontWeight={500}
                  isLoading={isUploading || isStatus}
                  onClick={() =>
                    data?.documents?.length ? handleStatus() : handleSubmit()
                  }
                  lineHeight="100%"
                  w="full"
                  py="17px"
                >
                  {data?.documents?.length ? "Update" : "Submit Request"}
                </Button>
              </Flex>
            </Flex>{" "}
          </>
        )}
      </Flex>
    </Box>
  );
};

export default IncidentDetails;
