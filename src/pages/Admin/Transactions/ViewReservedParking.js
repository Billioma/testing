import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useEditReservedParking,
  useGetAdminReservedParkingDetails,
} from "../../../services/admin/query/transactions";
import Select from "react-select";
import { Status, customStyles } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useGetZones } from "../../../services/admin/query/locations";
import { QRCodeCanvas } from "qrcode.react";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import { formatDateToISOString } from "../../../utils/helpers";

export default function ViewPayToPark() {
  const { id } = useParams();
  const isEdit = sessionStorage.getItem("edit");

  const statusOptions = Status?.map((status, i) => ({
    value: i,
    label: status.name,
  }));

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [values, setValues] = useState({
    paymentMethod: "",
    zone: "",
    arrival: "",
    departure: "",
    status: "",
  });

  const { mutate, data, isLoading } = useGetAdminReservedParkingDetails();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const navigate = useNavigate();

  const paymentMethodOptions = [
    "CASH",
    "TRANSFER",
    "WALLET",
    "POS",
    "UNPAID",
    "SUBSCRIPTION",
    "CARD",
  ].map((method, index) => ({ label: method, value: index }));

  const { data: zones } = useGetZones({}, 1, 10000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: zone?.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };
  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } =
    useEditReservedParking({
      onSuccess: () => {
        successToast("Transaction updated successfully!");
        navigate(PRIVATE_PATHS.ADMIN_RESERVED_PARKING);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        arrival: formatDateToISOString(values?.arrival),
        departure: formatDateToISOString(values?.departure),
        status: values?.status?.value,
      },
    });
  };

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    const selectedPaymentOption = paymentMethodOptions?.find(
      (option) => option.value === data?.paymentMethod
    );
    const selectedZoneOption = zoneOptions?.find(
      (option) => option.value === data?.zone?.id
    );
    setValues({
      ...values,
      paymentMethod: selectedPaymentOption,
      zone: selectedZoneOption,
      arrival: data?.arrival,
      departure: data?.departure,
      status: selectedStatusOption,
    });
  }, [data, zones]);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="flex-start"
              w={{
                base: "100%",
                md: "80%",
              }}
              flexDir={{ md: "row", base: "column" }}
              gap="30px"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w="100%"
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Reservation Id
                  </Text>
                  <CustomInput auth value={data?.reservationId} mb isDisabled />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Amount
                  </Text>
                  <CustomInput
                    auth
                    value={data?.amount}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Payment Method
                  </Text>
                  <Select
                    styles={customStyles}
                    options={paymentMethodOptions}
                    value={values?.paymentMethod}
                    isDisabled
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

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone
                  </Text>
                  <Select
                    styles={customStyles}
                    options={zoneOptions}
                    value={values?.zone}
                    placeholder="Select zone"
                    isDisabled
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

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Vehicle
                  </Text>
                  <CustomInput
                    auth
                    value={data?.vehicle?.licensePlate}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Customer
                  </Text>
                  <CustomInput
                    auth
                    value={`${data?.customer?.profile?.firstName} ${data?.customer?.profile?.lastName}`}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Arrival
                  </Text>

                  <DateTimePicker
                    selectedDate={values?.arrival || new Date()}
                    onChange={(date) =>
                      setValues({
                        ...values,
                        arrival: new Date(date),
                      })
                    }
                    hasTime
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Departure
                  </Text>

                  <DateTimePicker
                    selectedDate={values?.departure || new Date()}
                    onChange={(date) =>
                      setValues({ ...values, departure: new Date(date) })
                    }
                    hasTime
                    isDisabled={edit ? false : true}
                  />
                </Box>

                {values?.departure < values?.arrival && (
                  <Text
                    mt={-3}
                    fontSize="15px"
                    mb={4}
                    color="tomato"
                    fontWeight={500}
                  >
                    Event's end date is before its start date
                  </Text>
                )}

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>

                  <Select
                    styles={customStyles}
                    options={statusOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
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
                    value={values?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate("/admin/transactions/reserved-parking"),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="adminPrimary"
                    w="100%"
                    isDisabled={values?.departure < values?.arrival}
                    isLoading={isUpdating}
                    onClick={() => (!edit ? setEdit(true) : handleSubmit())}
                  >
                    {!edit ? "Edit" : "Save"}
                  </Button>
                </Flex>
              </Flex>

              <Flex flexDir={"column"} w="100%">
                <Flex
                  bg="#fff"
                  borderRadius="8px"
                  py="32px"
                  px="28px"
                  align="center"
                  justifyContent="center"
                  gap="30px"
                  border="1px solid #E4E6E8"
                  h="fit-content"
                >
                  <Text
                    fontSize="24px"
                    fontWeight={500}
                    lineHeight="100%"
                    color="#646668"
                  >
                    QR Code
                  </Text>

                  <QRCodeCanvas
                    size={150}
                    value={data?.zone?.name}
                    viewBox={`0 0 150 150`}
                    renderAs="canvas"
                    id="qrcode"
                  />
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
