import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useGetLocations,
  useGetRates,
  useGetZones,
} from "../../../services/admin/query/locations";
import Select from "react-select";
import {
  customStyles,
  BillingTypes,
  PaymentMethods,
} from "../../../components/common/constants";
import { useGetServices } from "../../../services/admin/query/services";
import {
  useGetAttendants,
  useGetOperators,
} from "../../../services/admin/query/users";
import {
  useEditServiceLogs,
  useGetAdminServiceLog,
  useMakePaymentServiceLog,
} from "../../../services/admin/query/logs";
import { formatNewDate } from "../../../utils/helpers";
import { IoIosArrowDown } from "react-icons/io";

export const Layout = ({ label, data }) => {
  return (
    <Flex justifyContent={"space-between"} align="center" color="#646668">
      <Text fontSize="12px" lineHeight="100%">
        {label}
      </Text>
      <Text fontWeight={500} fontSize="14px" lineHeight="100%">
        {data}
      </Text>
    </Flex>
  );
};
export default function ViewValetedVehicle() {
  const [values, setValues] = useState({
    ticketNumber: "",
    comment: "",
    amountPaid: "",
    amount: "",
    finalAmount: "",
    paymentMethod: "",
    extended: "",
    isReserved: "",
    delivered: "",
    billingType: "",
    paymentStatus: "",
    vehicle: "",
    service: "",
    operator: "",
    attendant: "",
    location: "",
    zone: "",
    initialRate: "",
  });
  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const { id } = useParams();
  const { mutate, data, isLoading } = useGetAdminServiceLog();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditServiceLogs({
    onSuccess: () => {
      successToast("Log updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_VALETED_VEHICLES);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
  const {
    mutate: payMutate,
    data: payment,
    isLoading: isPaying,
  } = useMakePaymentServiceLog({
    onSuccess: () => {
      successToast("Payment made successfully!");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: locations } = useGetLocations({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);
  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: attendants } = useGetAttendants({}, 1, 10000);
  const { data: rates } = useGetRates({}, 1, 1000);
  const { data: zones } = useGetZones({}, 1, 10000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: Number(zone?.id),
  }));

  const booleanOptions = [
    { label: "FALSE", value: 0 },
    { label: "TRUE", value: 1 },
  ];
  const paymentStatus = [
    { label: "PAID", value: 1 },
    { label: "UNPAID", value: 0 },
  ];

  const paymentMethod = PaymentMethods?.map((payment, i) => ({
    label: payment,
    value: i,
  }));

  const attendantOptions = attendants?.data?.map((service) => ({
    label: service?.name,
    value: Number(service?.id),
  }));

  const rateOptions = rates?.data?.map((rate) => ({
    label: rate?.name,
    value: Number(rate?.id),
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service?.name,
    value: Number(service?.id),
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location?.name,
    value: parseInt(location?.id),
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    value: parseInt(operator?.id),
    label: operator?.name,
  }));

  const billingTypeOptions = BillingTypes.map((type, i) => ({
    label: type,
    value: i,
  }));

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        ticketNumber: values?.ticketNumber,
        amount: Number(values?.amount),
        comment: values?.comment,
        finalAmount: Number(values?.finalAmount),
        extended: Number(values?.extended?.value),
        isReserved: Number(values?.isReserved?.value),
        delivered: Number(values?.delivered?.value),
        billingType: Number(values?.billingType?.value),
        paymentStatus: Number(values?.paymentStatus?.value),
        vehicle: values?.vehicle,
        service: Number(values?.service?.value),
        operator: Number(values?.operator?.value),
        attendant: Number(values?.attendant?.value),
        location: Number(values?.location?.value),
        zone: Number(values?.zone?.value),
        initialRate: Number(values?.initialRate?.value),
      },
    });
  };

  const handlePay = () => {
    console.log({
      query: id,
      body: {
        amount: Number(values?.amount),
        amountPaid: Number(values?.amount),
        comment: values?.comment,
        paymentMethod: Number(values?.paymentMethod?.value),
      },
    });
  };

  useEffect(() => {
    const selectedStatusOption = paymentStatus?.find(
      (option) => option?.value === data?.paymentStatus
    );
    const selectedAttendantOption = attendantOptions?.find(
      (option) => option?.value === Number(data?.attendant?.id)
    );
    const selectedOperatorOption = operatorOptions?.find(
      (option) => option?.value === Number(data?.operator?.id)
    );
    const selectedLocationOption = locationOptions?.find(
      (option) => option?.value === Number(data?.location?.id)
    );
    const selectedServiceOption = locationOptions?.find(
      (option) => option?.value === Number(data?.service?.id)
    );
    const selectedRateOption = rateOptions?.find(
      (option) => option?.value === Number(data?.initialRate?.id)
    );
    const selectedExtendedOption = booleanOptions?.find(
      (option) => option?.value === Number(data?.extended)
    );
    const selectedReservedOption = booleanOptions?.find(
      (option) => option?.value === Number(data?.isReserved)
    );
    const selectedDeliveredOption = booleanOptions?.find(
      (option) => option?.value === Number(data?.delivered)
    );
    const selectedZonesOption = zoneOptions?.find(
      (option) => option?.value === Number(data?.zone?.id)
    );
    const selectedBillingTypeOption = billingTypeOptions?.find(
      (option) => option?.value === Number(data?.billingType)
    );
    setValues({
      ...values,
      ticketNumber: data?.ticketNumber,
      amount: data?.amount,
      comment: data?.comment,
      finalAmount: data?.finalAmount,
      extended: selectedExtendedOption,
      isReserved: selectedReservedOption,
      delivered: selectedDeliveredOption,
      billingType: selectedBillingTypeOption,
      paymentStatus: selectedStatusOption,
      vehicle: data?.vehicle?.licensePlate,
      service: selectedServiceOption,
      operator: selectedOperatorOption,
      attendant: selectedAttendantOption,
      location: selectedLocationOption,
      zone: selectedZonesOption,
      initialRate: selectedRateOption,
    });
  }, [data, zones, operators, rates, services, payment, locations, attendants]);

  return (
    <Box minH="75vh">
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
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              {!edit ? (
                <Flex
                  borderRadius="8px"
                  py="32px"
                  px="24px"
                  justifyContent="center"
                  w={{ base: "100%", md: "30rem" }}
                  flexDir="column"
                  border="1px solid #E4E6E8"
                  gap="24px"
                >
                  <Layout label="Ticket Number" data={data?.ticketNumber} />
                  <Layout label="Vehicle" data={data?.vehicle?.licensePlate} />
                  <Layout label="Location" data={data?.location?.name} />
                  <Layout label="Zone" data={data?.zone?.name} />
                  <Layout label="Service" data={data?.service?.name} />
                  <Layout
                    label="Amount"
                    data={`₦ ${data?.amount?.toLocaleString()}`}
                  />
                  <Layout
                    label="Extended"
                    data={data?.extended ? "True" : "False"}
                  />
                  <Layout
                    label="Is Reserved"
                    data={data?.isReserved ? "True" : "False"}
                  />
                  <Layout
                    label="Delivered"
                    data={data?.delivered ? "True" : "False"}
                  />
                  <Layout
                    label="Final Amount"
                    data={`₦ ${data?.finalAmount?.toLocaleString()}`}
                  />
                  <Layout
                    label="Billing Type"
                    data={BillingTypes?.find(
                      (item, i) => i === data?.billingType
                    )
                      ?.replace("_", " ")
                      ?.replace("_", " ")}
                  />
                  <Layout
                    label="Operator"
                    data={data?.operator?.name || "N/A"}
                  />
                  <Layout
                    label="Attendant"
                    data={data?.attendant?.name || "N/A"}
                  />
                  <Layout label="Attendant" data={data?.comment || "N/A"} />
                  <Layout
                    label="Initial Rate"
                    data={data?.initialRate?.name || "N/A"}
                  />
                  <Layout
                    label="Payment Status"
                    data={
                      data?.paymentStatus === 0
                        ? "UNPAID"
                        : data?.paymentStatus === 1
                        ? "PAID"
                        : ""
                    }
                  />
                  <Layout label="Date" data={formatNewDate(data?.createdAt)} />

                  {/* <Flex gap="24px" mt="24px">
                    <Button
                      variant={"adminDanger"}
                      onClick={() =>
                        edit
                          ? setEdit(false)
                          : (navigate(PRIVATE_PATHS.ADMIN_VALETED_VEHICLES),
                            sessionStorage.removeItem("edit"))
                      }
                      w="45%"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="55%"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                  </Flex> */}
                </Flex>
              ) : (
                <Flex
                  justifyContent="center"
                  w="100%"
                  flexDir={{ md: "row", base: "column" }}
                  gap="30px"
                >
                  <Flex
                    bg="#fff"
                    borderRadius="8px"
                    py="32px"
                    px="24px"
                    justifyContent="center"
                    w={{
                      base: "100%",
                      md: "100%",
                    }}
                    flexDir="column"
                    border="1px solid #E4E6E8"
                  >
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Ticket Number
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        auth
                        value={values?.ticketNumber}
                        mb
                        holder="Enter ticket number"
                        onChange={(e) =>
                          setValues({ ...values, ticketNumber: e.target.value })
                        }
                      />
                    </Box>
                    {/* <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Comment
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        auth
                        value={values?.comment}
                        mb
                        holder="Enter comment"
                        onChange={(e) =>
                          setValues({ ...values, comment: e.target.value })
                        }
                      />
                    </Box> */}
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Amount
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        auth
                        value={values?.amount}
                        mb
                        holder="Enter amount"
                        onChange={(e) =>
                          setValues({ ...values, amount: e.target.value })
                        }
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Final Amount
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        auth
                        value={values?.finalAmount}
                        mb
                        holder="Enter comment"
                        onChange={(e) =>
                          setValues({ ...values, finalAmount: e.target.value })
                        }
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Extended
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select extended status"
                        options={booleanOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "extended",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.extended}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Is Reserved
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select reserve status"
                        options={booleanOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "isReserved",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.isReserved}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Delivered
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select delivered status"
                        options={booleanOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "delivered",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.extended}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Billing Type
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select billing type"
                        options={billingTypeOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "billingType",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.billingType}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Payment Status
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select delivered status"
                        options={paymentStatus}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "paymentStatus",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.paymentStatus}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Vehicle
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        auth
                        value={values?.vehicle}
                        mb
                        holder="Enter license Plate number"
                        onChange={(e) =>
                          setValues({ ...values, vehicle: e.target.value })
                        }
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Service
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select service"
                        options={serviceOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "service",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.service}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Operator
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select operator"
                        options={operatorOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "operator",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.operator}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Attendant
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select attendant"
                        options={attendantOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "attendant",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.attendant}
                      />
                    </Box>

                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Location
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select location"
                        options={locationOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "location",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.location}
                      />
                    </Box>

                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Zone
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select zone"
                        options={zoneOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "zone",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.zone}
                      />
                    </Box>

                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Rate
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select rate"
                        options={rateOptions}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "initialRate",
                          })
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
                        isDisabled={edit ? false : true}
                        value={values?.initialRate}
                      />
                    </Box>

                    <Flex gap={4} mt={4}>
                      <Button
                        variant={"adminSecondary"}
                        w="45%"
                        onClick={() =>
                          edit
                            ? setEdit(false)
                            : (navigate(PRIVATE_PATHS.ADMIN_VALETED_VEHICLES),
                              sessionStorage.removeItem("edit"))
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="adminPrimary"
                        w="55%"
                        isLoading={isUpdating}
                        onClick={() => handleSubmit()}
                      >
                        Save
                      </Button>
                    </Flex>
                  </Flex>

                  <Flex
                    bg="#fff"
                    borderRadius="8px"
                    py="40px"
                    px="28px"
                    justifyContent="center"
                    flexDir="column"
                    w="100%"
                    border="1px solid #E4E6E8"
                    h="fit-content"
                  >
                    <Text
                      mb="20px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Make payment
                    </Text>

                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Pay Amount
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        auth
                        value={values?.amountPaid}
                        mb
                        holder="Enter amount"
                        onChange={(e) =>
                          setValues({ ...values, amountPaid: e.target.value })
                        }
                      />
                    </Box>

                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Comment
                      </Text>
                      <CustomInput
                        dis={edit ? false : true}
                        opt
                        auth
                        value={values?.comment}
                        mb
                        holder="Enter comment "
                        onChange={(e) =>
                          setValues({ ...values, comment: e.target.value })
                        }
                      />
                    </Box>

                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Payment method
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select payment method"
                        options={paymentMethod}
                        onChange={(selectedOption) =>
                          handleSelectChange(selectedOption, {
                            name: "paymentMethod",
                          })
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
                        value={values?.paymentMethod}
                      />
                    </Box>

                    <Flex gap="24px" mt="24px">
                      <Button
                        variant="adminPrimary"
                        w="full"
                        isLoading={isPaying}
                        onClick={() => handlePay()}
                      >
                        Pay
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
