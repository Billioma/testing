import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { FiTrash2 } from "react-icons/fi";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetOperators } from "../../../services/admin/query/users";
import {
  useGetClients,
  useMakeClientPayment,
  useUpdateClientInvoice,
} from "../../../services/admin/query/clients";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import { useGetServices } from "../../../services/admin/query/services";

export default function ViewOperator() {
  const [state, setState] = useState({
    invoiceItems: [{}],
    status: 1,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetOperators();
  const location = useLocation();
  const { mutate, isLoading } = useUpdateClientInvoice({
    onSuccess: () => {
      successToast("Invoice updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: makeClientPayment, isLoading: makePaymentLoading } =
    useMakeClientPayment({
      onSuccess: () => {
        successToast("Payment made successfully!");
        refetch();
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
  const { data: clients } = useGetClients({}, 1, 10000);

  const clientOptions = clients?.data?.map((client) => ({
    label: client.name,
    value: parseInt(client.id),
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const isFormValid = () => {
    return (
      !state.client ||
      !state.invoiceItems ||
      !state.amount ||
      !state.taxRate ||
      !state.amountPaid ||
      !state.invoiceDate ||
      !state.dueDate
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  const handleInvoiceChange = (index, value, key) => {
    const updatedItems = [...state.invoiceItems];
    updatedItems[index][key] = value;
    setState({ ...state, invoiceItems: updatedItems });
  };

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
    });
  }, [location.state]);

  useEffect(() => console.log(state), [state]);

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
      amountPaid: state.amountPaid,
      paidAt: state.paidAt,
      paymentStatus: 0,
      id: state.id,
    });
  };

  useEffect(() => {
    setState({
      ...location.state,
      invoiceItems: JSON.parse(location.state.invoiceItems),
      client: parseInt(location.state.client?.id),
    });
  }, [location.state]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />

        <Flex flexDir={{ base: "column", lg: "row" }} gap={5}>
          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            justifyContent="center"
            w="30rem"
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Text textAlign={"center"} mb={3} fontWeight={500}>
              Client Info
            </Text>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Client
              </Text>
              <Select
                styles={customStyles}
                placeholder="Select client"
                options={clientOptions}
                onChange={(selectedOption) =>
                  setState({ ...state, client: selectedOption.value })
                }
                value={clientOptions?.find(
                  (client) => client.value === state.client
                )}
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Tax Rate (%)
              </Text>
              <CustomInput
                auth
                type={"number"}
                value={state.taxRate}
                mb
                holder="Enter tax rate"
                onChange={(e) =>
                  setState({ ...state, taxRate: parseFloat(e.target.value) })
                }
              />
            </Box>

            <Box mb={4}>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Invoice Date
              </Text>
              <DateTimePicker
                selectedDate={state.invoiceDate}
                onChange={(date) => setState({ ...state, invoiceDate: date })}
              />
            </Box>

            <Box mb={4}>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Due Date
              </Text>
              <DateTimePicker
                selectedDate={state.dueDate}
                onChange={(date) => setState({ ...state, dueDate: date })}
              />
            </Box>
          </Flex>

          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            w="30rem"
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Text textAlign={"center"} mb={3} fontWeight={500}>
              Client Payments
            </Text>

            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize="12px" fontWeight={500} color="#444648">
                Payment Status
              </Text>

              <Flex
                bg={state?.paymentStatus ? "#E5FFE5" : "#FEF1F1"}
                color={state?.paymentStatus ? "#0B841D" : "#EE383A"}
                justifyContent={"center"}
                alignItems="center"
                padding="5px 10px"
                borderRadius="4px"
              >
                <Text fontWeight={500} fontSize="12px">
                  {state?.paymentStatus ? "Paid" : "Unpaid"}
                </Text>
              </Flex>
            </Flex>

            <Flex justifyContent={"space-between"} mt={4}>
              <Text fontSize="12px" fontWeight={500} color="#444648">
                Amount Payable
              </Text>

              <Text fontWeight={500} fontSize="12px">
                ₦{state.amountPayable?.toLocaleString()}
              </Text>
            </Flex>

            <Box w="full" mb={4} mt={8}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Amount Paid
              </Text>
              <CustomInput
                auth
                type={"number"}
                value={state.amountPaid}
                mb
                holder="Enter tax rate"
                onChange={(e) =>
                  setState({ ...state, amountPaid: parseFloat(e.target.value) })
                }
              />
            </Box>

            <Box>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Payment Date
              </Text>
              <DateTimePicker
                selectedDate={state.paidAt}
                onChange={(date) => handleInvoiceChange(index, date, "paidAt")}
              />
            </Box>

            <Button
              variant="adminPrimary"
              w={{ base: "100%" }}
              mt={5}
              // isDisabled={isDisabled}
              isLoading={makePaymentLoading}
              onClick={handleMakePayment}
            >
              Make Payment
            </Button>
          </Flex>
        </Flex>

        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w={{ base: "100%" }}
          flexDir="column"
          border="1px solid #E4E6E8"
          mt={5}
        >
          <Text mb={4}>Invoice items</Text>

          {state.invoiceItems?.map((item, index) => (
            <Flex
              flexWrap={{ base: "wrap", lg: "nowrap" }}
              alignItems="center"
              gap={3}
              mb={6}
            >
              <Box>
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                  Invoice Date
                </Text>
                <DateTimePicker
                  selectedDate={item.date}
                  onChange={(date) => handleInvoiceChange(index, date, "date")}
                />
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Period Type
                </Text>

                <Box w={{ base: "100%", lg: "200px" }}>
                  <Select
                    styles={customStyles}
                    placeholder="Select period type"
                    options={periodOptions}
                    onChange={({ value }) =>
                      handleInvoiceChange(index, value, "period")
                    }
                    value={periodOptions?.find(
                      (period) => period.value === item?.period
                    )}
                  />
                </Box>
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Service
                </Text>
                <Box w={{ base: "100%", lg: "200px" }}>
                  <Select
                    styles={customStyles}
                    placeholder="Select service"
                    options={serviceOptions}
                    onChange={({ value }) =>
                      handleInvoiceChange(index, value, "service")
                    }
                    value={serviceOptions?.find(
                      (service) => parseInt(service.value) === item?.serviceType
                    )}
                  />
                </Box>
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Description
                </Text>
                <Box w={{ base: "100%", lg: "200px" }}>
                  <Select
                    styles={customStyles}
                    placeholder="Select description"
                    options={descriptionOptions}
                    onChange={({ value }) =>
                      handleInvoiceChange(index, value, "description")
                    }
                    value={descriptionOptions?.find(
                      (desc) => desc.value === item?.description
                    )}
                  />
                </Box>
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Unit
                </Text>
                <CustomInput
                  auth
                  type={"number"}
                  mb
                  holder="Enter rate"
                  onChange={({ value }) =>
                    handleInvoiceChange(index, value, "unit")
                  }
                  value={item?.unit}
                />
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Price
                </Text>
                <CustomInput
                  type={"number"}
                  auth
                  mb
                  holder="Enter price"
                  value={item?.price}
                  onChange={({ value }) =>
                    handleInvoiceChange(index, value, "price")
                  }
                />
              </Box>

              <Flex
                w={10}
                h={20}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {index !== 0 && (
                  <Box
                    cursor={"pointer"}
                    onClick={() => {
                      const temp = [...state.invoiceItems];
                      temp.splice(index, 1);
                      console.log(temp);
                      setState({
                        ...state,
                        invoiceItems: [...temp],
                      });
                    }}
                  >
                    <FiTrash2 color="red" size={22} />
                  </Box>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>

        <Flex gap={4} my={7}>
          <Button
            variant="adminSecondary"
            w={{ base: "100%", lg: "250px" }}
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES)}
          >
            Cancel
          </Button>

          <Button
            variant="adminAlt"
            w={{ base: "100%", lg: "300px" }}
            minW={"fit-content"}
            onClick={() =>
              setState({ ...state, invoiceItems: [...state.invoiceItems, {}] })
            }
          >
            Add invoice item +
          </Button>

          <Button
            variant="adminPrimary"
            w={{ base: "100%", lg: "250px" }}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
