import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { Form, Formik } from "formik";
import {
  useAddClientInvoice,
  useGetAdminClients,
  useGetClientsInvoices,
} from "../../../services/admin/query/clients";
import { useGetServices } from "../../../services/admin/query/services";
import { Add } from "../../../components/common/images";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from "react-calendar";
import {
  initClientInvoiceValues,
  validateClientInvoiceSchema,
} from "../../../utils/validation";
import { formatNewDate } from "../../../utils/helpers";
import { BsTrash } from "react-icons/bs";
import { format, parseISO } from "date-fns";

export default function AddClientInvoice() {
  const formatSafariDates = (date, fallback = "", withTime = false) => {
    if (!date) return fallback;

    try {
      // Use parseISO from date-fns to parse the date string
      const parsedDate = parseISO(date);

      if (isNaN(parsedDate)) {
        // Handle cases where parsing failed
        return fallback;
      }

      const formattedDate = format(
        parsedDate,
        withTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"
      );

      return formattedDate;
    } catch (error) {
      console.error("Error parsing date:", error);
      return fallback;
    }
  };
  const [fields, setFields] = useState({
    invoiceItems: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [showInvoiceDate, setShowInvoiceDate] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showServiceDateArray, setShowServiceDateArray] = useState(
    new Array(fields?.invoiceItems?.length).fill(false)
  );

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetClientsInvoices();
  const { mutate, isLoading } = useAddClientInvoice({
    onSuccess: () => {
      successToast("Invoice added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
  const { data: services } = useGetServices(null, 1, 100);

  const limit = 10000;
  const page = 1;
  const { mutate: clientMutate, data: clients } = useGetAdminClients();

  useEffect(() => {
    clientMutate({ limit, page });
  }, []);

  const clientOptions = clients?.data?.map((client) => ({
    label: client.name,
    value: parseInt(client.id),
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: parseInt(service.id),
  }));

  const handleSubmit = (values = "") => {
    mutate({
      client: values?.client?.value,
      dueDate: formatNewDate(values?.dueDate),
      invoiceDate: formatNewDate(values?.invoiceDate),
      taxRate: values?.taxRate,
      invoiceItems: fields?.invoiceItems,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShowInvoiceDate(false);
        setShowDueDate(false);
        const updatedShowServiceDateArray = showServiceDateArray.map(
          () => false
        );
        setShowServiceDateArray(updatedShowServiceDateArray);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInvoiceChange = (index, value, key) => {
    const updatedItems = [...fields.invoiceItems];
    if (key === "date" && value instanceof Date) {
      updatedItems[index][key] = formatNewDate(new Date(value));
    } else {
      updatedItems[index][key] = value;
    }
    setFields({ ...fields, invoiceItems: updatedItems });
  };
  const periodOptions = ["Daily", "Weekly", "Monthly", "Yearly"].map(
    (period) => ({ label: period, value: period })
  );

  const descriptionOptions = [
    "Attendant Package (Daily)",
    "Vehicle Package (Daily)",
    "Monthly Package",
    "Guest Management Package",
    "Traffic Management Package",
    "Equipment & Set up fee ",
  ].map((description) => ({ label: description, value: description }));

  return (
    <Box minH="75vh">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initClientInvoiceValues}
        validationSchema={validateClientInvoiceSchema}
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
            <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
              <GoBackTab />
              <Flex
                justifyContent="center"
                align="center"
                w="full"
                flexDir="column"
              >
                <Flex
                  bg="#fff"
                  borderRadius="8px"
                  py="32px"
                  px="24px"
                  justifyContent="center"
                  w={{ md: "32.5rem", base: "100%" }}
                  flexDir="column"
                  border="1px solid #E4E6E8"
                >
                  <Text
                    textAlign={"center"}
                    color="#646668"
                    lineHeight="100%"
                    mb="31px"
                    fontWeight={700}
                  >
                    Client Info
                  </Text>

                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Client{" "}
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
                        formSubmitted && !values?.client
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Add client"
                      options={clientOptions}
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
                      name="client"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          client: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                    />
                    {formSubmitted && !values?.client && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Client is required
                      </Text>
                    )}
                  </Box>

                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Tax Rate (%){" "}
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
                      type="number"
                      mb
                      holder="tax rate"
                      name="taxRate"
                      value={values?.taxRate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.taxRate) && errors?.taxRate
                      }
                    />
                  </Box>

                  <Box mb="16px">
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Invoice Date{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Box pos="relative" w="full" className="box">
                      <Flex
                        onClick={() => setShowInvoiceDate((prev) => !prev)}
                        align="center"
                        justifyContent="space-between"
                        w="full"
                        bg={
                          formSubmitted && !values?.invoiceDate
                            ? "#FDE8E8"
                            : values.invoiceDate
                            ? "#F4F6F8"
                            : "transparent"
                        }
                        color={values.invoiceDate ? "#000" : ""}
                        h="44px"
                        cursor="pointer"
                        borderRadius="4px"
                        border={
                          formSubmitted && !values?.invoiceDate
                            ? "1px solid red"
                            : "1px solid #D4D6D8"
                        }
                        py="12px"
                        px="16px"
                      >
                        <Text>
                          {values.invoiceDate
                            ? formatNewDate(values.invoiceDate)
                            : "Select Date"}
                        </Text>
                        <Image src="/assets/calendar.svg" w="20px" h="20px" />{" "}
                      </Flex>
                      {showInvoiceDate && (
                        <Box pos="absolute" top="50px" w="100%" zIndex="3">
                          <Calendar
                            onChange={(date) => {
                              setValues({ ...values, invoiceDate: date });
                              setShowInvoiceDate(false);
                            }}
                            value={values.invoiceDate}
                          />
                        </Box>
                      )}
                    </Box>

                    {formSubmitted && !values?.invoiceDate && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Invoice Date is required
                      </Text>
                    )}
                  </Box>

                  <Box mb="16px">
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Due Date{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Box pos="relative" w="full" className="box">
                      <Flex
                        onClick={() => setShowDueDate((prev) => !prev)}
                        align="center"
                        justifyContent="space-between"
                        w="full"
                        bg={
                          formSubmitted && !values?.dueDate
                            ? "#FDE8E8"
                            : values.dueDate
                            ? "#F4F6F8"
                            : "transparent"
                        }
                        color={values.dueDate ? "#000" : ""}
                        h="44px"
                        cursor="pointer"
                        borderRadius="4px"
                        border={
                          formSubmitted && !values?.dueDate
                            ? "1px solid red"
                            : "1px solid #D4D6D8"
                        }
                        py="12px"
                        px="16px"
                      >
                        <Text>
                          {values.dueDate
                            ? formatNewDate(values.dueDate)
                            : "Select Date"}
                        </Text>
                        <Image src="/assets/calendar.svg" w="20px" h="20px" />{" "}
                      </Flex>
                      {showDueDate && (
                        <Box pos="absolute" top="50px" w="100%" zIndex="3">
                          <Calendar
                            onChange={(date) => {
                              setValues({ ...values, dueDate: date });
                              setShowDueDate(false);
                            }}
                            value={values.dueDate}
                          />
                        </Box>
                      )}
                    </Box>

                    {formSubmitted && !values?.dueDate && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Due Date is required
                      </Text>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              bg="#fff"
              borderRadius="8px"
              py="32px"
              px="24px"
              justifyContent="center"
              w="100%"
              flexDir="column"
              border="1px solid #E4E6E8"
              mt="24px"
            >
              <Text
                mb="26px"
                color="#646668"
                fontWeight={700}
                lineHeight="100%"
              >
                Invoice items{" "}
                <span
                  style={{
                    color: "tomato",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
              </Text>

              {fields.invoiceItems?.map((item, index) => (
                <Flex
                  flexWrap={{ base: "wrap", lg: "nowrap" }}
                  alignItems="center"
                  gap="16px"
                  mb="26px"
                >
                  <Box w={{ base: "100%", lg: "22rem" }}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Invoice Date
                    </Text>
                    <Box pos="relative" w="full" className="box">
                      <Flex
                        onClick={() => {
                          const updatedShowServiceDateArray = [
                            ...showServiceDateArray,
                          ];
                          updatedShowServiceDateArray[index] =
                            !showServiceDateArray[index];
                          setShowServiceDateArray(updatedShowServiceDateArray);
                        }}
                        align="center"
                        justifyContent="space-between"
                        w="full"
                        bg={item?.date ? "#F4F6F8" : "transparent"}
                        color={item?.date ? "#000" : ""}
                        h="44px"
                        cursor="pointer"
                        borderRadius="4px"
                        border="1px solid #D4D6D8"
                        py="12px"
                        px="16px"
                      >
                        <Text>
                          {item?.date
                            ? formatSafariDates(item.date)
                            : "Select Date"}
                        </Text>
                        <Image src="/assets/calendar.svg" w="20px" h="20px" />{" "}
                      </Flex>
                      {showServiceDateArray[index] && (
                        <Box pos="absolute" top="50px" w="150%" zIndex="3">
                          <Calendar
                            onChange={(date) => {
                              handleInvoiceChange(index, date, "date");
                              const updatedShowServiceDateArray = [
                                ...showServiceDateArray,
                              ];
                              updatedShowServiceDateArray[index] = false;
                              setShowServiceDateArray(
                                updatedShowServiceDateArray
                              );
                            }}
                            value={item.date}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box w={{ base: "100%", lg: "15rem" }}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Period Type
                    </Text>

                    <Box>
                      <Select
                        styles={customStyles}
                        options={periodOptions}
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
                        onChange={({ value }) =>
                          handleInvoiceChange(index, value, "period")
                        }
                        value={periodOptions?.find(
                          (period) => period.value === item?.period
                        )}
                      />
                    </Box>
                  </Box>

                  <Box w={{ base: "100%", lg: "19rem" }}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Service
                    </Text>
                    <Box>
                      <Select
                        styles={customStyles}
                        placeholder="Select service"
                        options={serviceOptions}
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
                        onChange={({ value }) =>
                          handleInvoiceChange(
                            index,
                            parseInt(value),
                            "serviceType"
                          )
                        }
                        value={serviceOptions?.find(
                          (service) => service.value === item?.service
                        )}
                      />
                    </Box>
                  </Box>

                  <Box minW={{ base: "100%", lg: "13rem" }}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Description
                    </Text>
                    <Box>
                      <Select
                        styles={customStyles}
                        placeholder="Select description"
                        options={descriptionOptions}
                        onChange={({ value }) =>
                          handleInvoiceChange(index, value, "description")
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
                        value={descriptionOptions?.find(
                          (desc) => desc.value === item?.description
                        )}
                      />
                    </Box>
                  </Box>

                  <Box w={{ base: "40%", md: "20%" }}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Unit
                    </Text>
                    <CustomInput
                      auth
                      type={"number"}
                      mb
                      holder="Enter unit"
                      onChange={({ target }) =>
                        handleInvoiceChange(
                          index,
                          parseInt(target.value),
                          "unit"
                        )
                      }
                      value={item?.unit}
                    />
                  </Box>

                  <Box w={{ base: "40%", md: "20%" }}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Price
                    </Text>
                    <CustomInput
                      type={"number"}
                      auth
                      mb
                      holder="Enter price"
                      value={item?.rate}
                      onChange={({ target }) =>
                        handleInvoiceChange(
                          index,
                          parseInt(target.value),
                          "rate"
                        )
                      }
                    />
                  </Box>

                  {index !== 0 && (
                    <Flex
                      alignItems={"center"}
                      mt="1rem"
                      justifyContent={"center"}
                    >
                      <Box
                        cursor={"pointer"}
                        onClick={() => {
                          const temp = [...fields.invoiceItems];
                          temp.splice(index, 1);
                          setFields({
                            ...fields,
                            invoiceItems: [...temp],
                          });
                        }}
                      >
                        <BsTrash color="red" size="22px" />
                      </Box>
                    </Flex>
                  )}
                </Flex>
              ))}

              {((formSubmitted && !fields.invoiceItems.length) ||
                !fields.invoiceItems?.every(
                  (item) =>
                    item?.date &&
                    item?.description &&
                    item?.period &&
                    item?.rate &&
                    item?.serviceType &&
                    item?.unit
                )) && (
                <Text mt="8px" fontSize="12px" color="tomato">
                  Invoice Item is required
                </Text>
              )}
            </Flex>

            <Flex gap={4} my={7} justifyContent="center" align="center">
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                border="1px solid #A11212"
                color="#A11212"
                w={{ base: "100%", lg: "250px" }}
                onClick={() => navigate(PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES)}
              >
                Cancel
              </Button>

              <Button
                w={{ base: "100%", lg: "300px" }}
                minW={"fit-content"}
                display="flex"
                gap="8px"
                align="center"
                onClick={() =>
                  setFields({
                    ...fields,
                    invoiceItems: [...fields.invoiceItems, {}],
                  })
                }
              >
                Add invoice item <Add fill="#fff" />
              </Button>

              <Button
                bg="#000"
                w={{ base: "100%", lg: "250px" }}
                isLoading={isLoading}
                type="submit"
              >
                Save{" "}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
