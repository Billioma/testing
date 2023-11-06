import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Image, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useGetAdminClientInvoice,
  useGetAdminClients,
  useAdminClientMakePayment,
  useUpdateClientInvoice,
} from "../../../services/admin/query/clients";
import { useGetServices } from "../../../services/admin/query/services";
import { IoIosArrowDown } from "react-icons/io";
import Calendar from "react-calendar";
import { formatNewDate } from "../../../utils/helpers";
import { BsTrash } from "react-icons/bs";
import { Add } from "../../../components/common/images";

export default function ViewOperator() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } =
    useUpdateClientInvoice({
      onSuccess: () => {
        successToast("Invoice updated successfully!");
        sessionStorage.removeItem("edit");
        navigate(PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const { id } = useParams();

  const { mutate: clientMutate, data: clients } = useGetAdminClients(); 
  const { mutate, data, isLoading } = useGetAdminClientInvoice();
  const limit = 10000;
  const page = 1;

  useEffect(() => {
    mutate({ id: id });
    clientMutate({ limit, page });
  }, []);

  const [values, setValues] = useState({
    client: "",
    taxRate: "",
    invoiceDate: "",
    dueDate: "",
    serviceDate: "",
    paymentStatus: "",
    amountPayable: "",
    amountPaid: "",
    invoiceItems: [],
    paidAt: "",
  });
  const [showInvoiceDate, setShowInvoiceDate] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showServiceDateArray, setShowServiceDateArray] = useState(
    new Array(values?.invoiceItems?.length).fill(false)
  );

  const [showPaymentDate, setShowPaymentDate] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShowInvoiceDate(false);
        setShowDueDate(false);
        setShowPaymentDate(false);
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

  const newInvoiceDate = formatNewDate(values.invoiceDate);
  const newDueDate = formatNewDate(values.dueDate);
  const newpaymentDate = formatNewDate(values.paidAt);

  const { mutate: makeClientPayment, isLoading: makePaymentLoading } =
    useAdminClientMakePayment({
      onSuccess: () => {
        successToast("Payment made successfully!");
        navigate(PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const { data: services } = useGetServices(null, 1, 100);

  const clientOptions = clients?.data?.map((client) => ({
    label: client?.name,
    value: parseInt(client.id),
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };
  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        client: values?.client?.value,
        dueDate: values?.dueDate,
        invoiceDate: values?.invoiceDate,
        taxRate: values?.taxRate,
        invoiceItems: values?.invoiceItems,
      },
    });
  };

  const handleInvoiceChange = (index, value, key) => {
    const updatedItems = [...values.invoiceItems];
    if (key === "date" && value instanceof Date) {
      updatedItems[index][key] = formatNewDate(new Date(value));
    } else {
      updatedItems[index][key] = value;
    }
    setValues({ ...values, invoiceItems: updatedItems });
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

  const handleMakePayment = () => {
    makeClientPayment({
      query: id,
      body: {
        amountPaid: values.amountPaid,
        paidAt: values.paidAt,
        paymentStatus: 1,
      },
    });
  };

  useEffect(() => {
    const selectedClientOption = clientOptions?.find(
      (option) => option.label === data?.client?.name
    );
    setValues({
      ...values,
      client: selectedClientOption,
      taxRate: data?.taxRate,
      invoiceDate: data?.invoiceDate,
      dueDate: data?.dueDate,
      paymentStatus: data?.paymentStatus,
      amountPayable: data?.amountPayable,
      amountPaid: data?.amountPaid,
      paidAt: data?.paidAt || new Date(),
      invoiceItems: data && JSON.parse(data?.invoiceItems),
    });
  }, [data, clients]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              align="flex-start"
              w="full"
              flexDir={{ md: "row", base: "column" }}
              gap={{ base: "", md: "40px" }}
            >
              <GoBackTab />

              <Flex flexDir={{ base: "column", lg: "row" }} w="full" gap="40px">
                <Box w="full">
                  <Flex
                    bg="#fff"
                    borderRadius="16px"
                    py="32px"
                    px="24px"
                    justifyContent="center"
                    flexDir="column"
                    border="1px solid #E4E6E8"
                  >
                    <Text
                      textAlign={"center"}
                      fontSize="14px"
                      mb="26px"
                      color="#646668"
                      lineHeight="100%"
                      fontWeight={700}
                    >
                      Client Info
                    </Text>

                    <Box w="full" mb="16px">
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Client
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select client"
                        options={clientOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "client",
                          })
                        }
                        value={values.client}
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
                    </Box>

                    <Box w="full" mb="16px">
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Tax Rate (%)
                      </Text>
                      <CustomInput
                        auth
                        type={"number"}
                        value={values.taxRate}
                        mb
                        holder="Enter tax rate"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            taxRate: parseFloat(e.target.value),
                          })
                        }
                      />
                    </Box>

                    <Box mb="16px">
                      <Text
                        mb="8px"
                        fontWeight={500}
                        color="#444648"
                        fontSize="10px"
                      >
                        Invoice Date
                      </Text>
                      <Box pos="relative" w="full" className="box">
                        <Flex
                          fontSize="14px"
                          onClick={() => setShowInvoiceDate((prev) => !prev)}
                          align="center"
                          justifyContent="space-between"
                          w="full"
                          bg={newInvoiceDate ? "#F4F6F8" : "transparent"}
                          color={newInvoiceDate ? "#000" : ""}
                          h="44px"
                          cursor="pointer"
                          borderRadius="4px"
                          border="1px solid #D4D6D8"
                          py="12px"
                          px="16px"
                        >
                          <Text>
                            {newInvoiceDate ? newInvoiceDate : "Select Date"}
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
                    </Box>

                    <Box>
                      <Text
                        mb="8px"
                        fontWeight={500}
                        color="#444648"
                        fontSize="10px"
                      >
                        Due Date
                      </Text>
                      <Box pos="relative" w="full" className="box">
                        <Flex
                          fontSize="14px"
                          onClick={() => setShowDueDate((prev) => !prev)}
                          align="center"
                          justifyContent="space-between"
                          w="full"
                          bg={newDueDate ? "#F4F6F8" : "transparent"}
                          color={newDueDate ? "#000" : ""}
                          h="44px"
                          cursor="pointer"
                          borderRadius="4px"
                          border="1px solid #D4D6D8"
                          py="12px"
                          px="16px"
                        >
                          <Text>{newDueDate ? newDueDate : "Select Date"}</Text>
                          <Image
                            src="/assets/calendar.svg"
                            w="20px"
                            h="20px"
                          />{" "}
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
                    </Box>
                  </Flex>
                </Box>

                <Box w="full">
                  <Flex
                    bg="#fff"
                    borderRadius="16px"
                    py="32px"
                    px="28px"
                    flexDir="column"
                    border="1px solid #E4E6E8"
                  >
                    <Text
                      textAlign={"center"}
                      fontSize="14px"
                      mb="31px"
                      color="#646668"
                      lineHeight="100%"
                      fontWeight={700}
                    >
                      Client Payments
                    </Text>

                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text fontSize="12px" color="#646668">
                        Payment Status
                      </Text>

                      <Flex
                        bg={values?.paymentStatus ? "#E5FFE5" : "#FCE8E8"}
                        color={values?.paymentStatus ? "#0B841D" : "#A11212"}
                        justifyContent={"center"}
                        alignItems="center"
                        padding="6px 10px"
                        borderRadius="4px"
                      >
                        <Text
                          fontWeight={500}
                          lineHeight="100%"
                          fontSize="10px"
                        >
                          {values?.paymentStatus ? "Paid" : "Unpaid"}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex
                      justifyContent={"space-between"}
                      color="#646668"
                      mt="24px"
                      w="full"
                    >
                      <Text fontSize="12px" lineHeight="100%">
                        Amount Payable
                      </Text>

                      <Text fontWeight={500} fontSize="14px" lineHeight="100%">
                        ₦ {values?.amountPayable?.toLocaleString() || "0.00"}
                      </Text>
                    </Flex>

                    <Box w="full" my="24px">
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Amount Paid
                      </Text>
                      <CustomInput
                        auth
                        type={"number"}
                        value={values.amountPaid}
                        mb
                        holder="Enter amount paid"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            amountPaid: parseFloat(e.target.value),
                          })
                        }
                      />
                    </Box>

                    <Box>
                      <Text
                        mb="8px"
                        fontWeight={500}
                        color="#444648"
                        fontSize="10px"
                      >
                        Payment Date
                      </Text>
                      <Box pos="relative" w="full" className="box">
                        <Flex
                          fontSize="14px"
                          onClick={() => setShowPaymentDate((prev) => !prev)}
                          align="center"
                          justifyContent="space-between"
                          w="full"
                          bg={newpaymentDate ? "#F4F6F8" : "transparent"}
                          color={newpaymentDate ? "#000" : ""}
                          h="44px"
                          cursor="pointer"
                          borderRadius="4px"
                          border="1px solid #D4D6D8"
                          py="12px"
                          px="16px"
                        >
                          <Text>
                            {newpaymentDate ? newpaymentDate : "Select Date"}
                          </Text>
                          <Image src="/assets/calendar.svg" w="20px" h="20px" />{" "}
                        </Flex>
                        {showPaymentDate && (
                          <Box pos="absolute" top="50px" w="100%" zIndex="3">
                            <Calendar
                              onChange={(date) => {
                                setValues({ ...values, paidAt: date });
                                setShowPaymentDate(false);
                              }}
                              value={values.paidAt}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Button
                      variant="adminPrimary"
                      w={{ base: "100%" }}
                      mt="24px"
                      py="17px"
                      isLoading={makePaymentLoading}
                      onClick={handleMakePayment}
                    >
                      Make Payment
                    </Button>
                  </Flex>
                </Box>
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
                Invoice items
              </Text>

              {values?.invoiceItems?.map((item, index) => (
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
                      fontSize="10px"
                    >
                      Service Date
                    </Text>
                    <Box pos="relative" w="full" className="box">
                      <Flex
                        fontSize="14px"
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
                            ? formatNewDate(new Date(item.date))
                            : "Select Date"}
                        </Text>
                        <Image src="/assets/calendar.svg" w="20px" h="20px" />{" "}
                      </Flex>
                      {showServiceDateArray[index] && (
                        <Box pos="absolute" top="50px" w="100%" zIndex="3">
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
                      fontSize="10px"
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
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Service
                    </Text>
                    <Box>
                      <Select
                        styles={customStyles}
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
                          (service) =>
                            parseInt(service.value) === item?.serviceType
                        )}
                      />
                    </Box>
                  </Box>

                  <Box minW={{ base: "100%", lg: "13rem" }}>
                    <Text
                      mb="8px"
                      fontSize="10px"
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
                          handleInvoiceChange(index, value, "description")
                        }
                        value={descriptionOptions?.find(
                          (desc) => desc.value === item?.description
                        )}
                      />
                    </Box>
                  </Box>

                  <Box w={{ base: "40%", md: "20%" }}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Unit
                    </Text>
                    <CustomInput
                      auth
                      type={"number"}
                      mb
                      holder="Enter rate"
                      onChange={(e) =>
                        handleInvoiceChange(
                          index,
                          parseInt(e.target.value),
                          "unit"
                        )
                      }
                      value={item?.unit}
                    />
                  </Box>

                  <Box w={{ base: "40%", md: "20%" }}>
                    <Text
                      mb="8px"
                      fontSize="10px"
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
                      onChange={(e) =>
                        handleInvoiceChange(
                          index,
                          parseInt(e.target.value),
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
                          const temp = [...values.invoiceItems];
                          temp.splice(index, 1);
                          setValues({
                            ...values,
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
            </Flex>
            <Flex gap={4} my={7}>
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
                  setValues({
                    ...values,
                    invoiceItems: [...values.invoiceItems, {}],
                  })
                }
              >
                Add invoice item <Add fill="#fff" />
              </Button>

              <Button
                bg="#000"
                w={{ base: "100%", lg: "250px" }}
                isLoading={isUpdating}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Flex>{" "}
          </>
        )}
      </Flex>
    </Box>
  );
}
