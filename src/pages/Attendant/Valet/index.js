import { Box, Button, Flex, Spinner, Switch, Text } from "@chakra-ui/react";
import { IoCarOutline } from "react-icons/io5";
import Select from "react-select";
import {
  attStyles,
  PaymentMethods,
} from "../../../components/common/constants";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  useGetUserRates,
  useNewTicket,
} from "../../../services/attendant/query/logs";
import { formatDat } from "../../../utils/helpers";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";

const Layout = ({ label, value }) => {
  return (
    <Flex align="center" justifyContent="space-between">
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

const index = () => {
  const navigate = useNavigate();
  const vehData = JSON.parse(sessionStorage.getItem("vehData"));
  const attZone = JSON.parse(localStorage.getItem("attZone"));
  const attLoc = JSON.parse(localStorage.getItem("attLoc"));
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    rate: "",
    isPaid: "",
    payment: "",
  });

  const { data, isLoading } = useGetUserRates(attZone?.id);

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isTicket } = useNewTicket({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/attendant/history");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const serviceOptions = data?.map((service) => ({
    value: service,
    label: service?.name,
  }));

  const payOptions = PaymentMethods?.slice(0, 4)?.map((method, index) => ({
    value: index,
    label: method,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    mutate({
      vehicle: Number(vehData?.id),
      zone: Number(attZone?.id),
      service: Number(attZone?.service?.id),
      ticketNumber: null,
      timeIn: new Date(),
      initialRate: values?.rate?.value?.id,
      billingType: 0,
      subscription: null,
      isCorporateSubscription: null,
      event: null,
      status: 0,
      payment: values.isPaid
        ? {
            amount: values?.rate?.value?.amount,
            amountPaid: values?.rate?.value?.amount,
            comment: "",
            paymentMethod: Number(values.payment.value),
          }
        : null,
      serviceName: values.rate.label,
      amount: values?.rate?.value?.amount,
      paymentStatus: null,
    });
  };

  return (
    <Flex flexDir="column" minH="65vh">
      <Flex
        flexDir="column"
        align="center"
        justifyContent="center"
        bg="#fff"
        p="24px"
        border="1px solid #E4E6E8"
        borderRadius="12px"
      >
        <Text fontFamily="Recoleta" fontSize="24px" color="#242628">
          {vehData?.licensePlate}
        </Text>
        <Flex color="#444648" mt="8px" align="center" gap="5px">
          <IoCarOutline />
          <Text fontSize="14px">
            {vehData?.make?.name} {vehData?.model?.name}
          </Text>
        </Flex>
      </Flex>

      <Box mt="24px" display={step === 1 ? "block" : "none"}>
        <Text color="#242628" fontSize="14px" mb="8px">
          Service<span style={{ color: "tomato" }}>*</span>
        </Text>

        <Select
          styles={attStyles}
          options={serviceOptions}
          placeholder="Service Type"
          isDisabled={isLoading}
          value={values.rate}
          defaultValue={values.rate}
          components={{
            IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
            DropdownIndicator: () =>
              isLoading ? (
                <Spinner size="sm" />
              ) : (
                <IoIosArrowDown size="15px" color="#646668" />
              ),
          }}
          onChange={(selectedOption) => {
            handleSelectChange(selectedOption, {
              name: "rate",
            });
          }}
        />
      </Box>

      <Box
        mt="24px"
        display={step === 1 ? "none" : "block"}
        fontSize="14px"
        color="#242628"
      >
        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Customer Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            {/* <Layout label="Ticket ID" value="" /> */}
            <Layout
              label="Name"
              value={
                vehData?.customer?.profile?.firstName
                  ? `${vehData?.customer?.profile?.firstName} ${vehData?.customer?.profile?.lastName}`
                  : vehData?.customerName || "N/A"
              }
            />
            <Layout
              label="Phone Number"
              value={
                vehData?.customer?.profile?.phone
                  ? vehData?.customer?.profile?.phone
                  : vehData?.customerPhoneNumber || "N/A"
              }
            />
          </Flex>
        </Box>

        <Box
          my="24px"
          bg="#fff"
          p="24px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
        >
          <Text fontWeight={700}>Customer Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Vehicle"
              value={`${vehData?.make?.name} ${vehData?.model?.name}`}
            />
            <Layout label="License Plate" value={vehData?.licensePlate} />
            <Layout label="Color" value={vehData?.color} />
          </Flex>
        </Box>

        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Service Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout label="Location" value={attLoc?.name} />
            <Layout label="Zone" value={attZone?.name} />
            <Layout label="Date" value={formatDat(new Date())} />
            <Layout label="Service Type" value={values.rate?.label} />
          </Flex>
        </Box>

        <Box
          my="24px"
          bg="#fff"
          p="24px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
        >
          <Text fontWeight={700} mb="24px">
            Payment Status
          </Text>

          <Flex
            border="1px solid #E4E6E8"
            borderRadius="8px"
            p="14px 18px"
            align="center"
            justifyContent="space-between"
          >
            <Text>Has payment been received</Text>

            <Switch
              size="sm"
              isChecked={values.isPaid}
              onChange={() =>
                setValues({ ...values, isPaid: !values.isPaid, payment: "" })
              }
            />
          </Flex>
        </Box>

        <Box mt="24px" display={values.isPaid ? "" : "none"}>
          <Text color="#242628" fontSize="14px" mb="8px">
            Payment Method<span style={{ color: "tomato" }}>*</span>
          </Text>

          <Select
            menuPlacement="top"
            styles={attStyles}
            options={payOptions}
            placeholder="Payment Method"
            isDisabled={isLoading}
            value={values.payment}
            defaultValue={values.payment}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () => (
                <IoIosArrowDown size="15px" color="#646668" />
              ),
            }}
            onChange={(selectedOption) => {
              handleSelectChange(selectedOption, {
                name: "payment",
              });
            }}
          />
        </Box>
      </Box>

      <Button
        onClick={() => (step === 1 ? setStep(2) : handleSubmit())}
        h="50px"
        mt="50px"
        isLoading={isTicket}
        isDisabled={
          step === 1
            ? !values.rate
            : step === 2
            ? values.isPaid
              ? !values.payment
                ? true
                : false
              : false
            : ""
        }
        w="full"
      >
        {step === 1 ? "Continue" : "Proceed"}
      </Button>
    </Flex>
  );
};

export default index;
