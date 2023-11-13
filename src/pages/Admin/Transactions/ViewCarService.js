import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  RadioGroup,
  Radio,
  Spinner,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetZones } from "../../../services/admin/query/locations";
import Select from "react-select";
import {
  BillingTypes,
  Status,
  customStyles,
} from "../../../components/common/constants";
import {
  useEditCarService,
  useGetAdminCarServicesDetails,
} from "../../../services/admin/query/transactions";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import CustomInput from "../../../components/common/CustomInput";
import { QRCodeCanvas } from "qrcode.react";
import { IoIosArrowDown } from "react-icons/io";
import { formatDateToISOString } from "../../../utils/helpers";

export default function AddCarService() {
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
    billingType: "",
    bookingType: "",
    serviceType: "",
    appointmentSlot: "",
    appointmentDate: "",
    status: "",
  });

  const { mutate, data, isLoading } = useGetAdminCarServicesDetails();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditCarService({
    onSuccess: () => {
      successToast("Transaction edited successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CAR_SERVICES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: zones } = useGetZones({}, 1, 10000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: zone?.id,
  }));

  const billingTypeOptions = BillingTypes.map((type, i) => ({
    label: type,
    value: i,
  }));

  const bookingTypeOptions = ["ONETIME", "REOCCURRING"].map((type, i) => ({
    label: type,
    value: i,
  }));

  const bookingSlotOptions = [
    "7:00 - 8:30",
    "8:30 - 10:00",
    "10:00 - 11:30",
    "11:30 - 13:00",
    "13:00 - 14:30",
    "14:30 - 16:00",
    "16:00 - 17:30",
    "17:30 - 19:00",
  ].map((slot, i) => ({ label: slot, value: i }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        serviceType: values?.serviceType,
        appointmentSlot: values?.appointmentSlot?.value,
        appointmentDate: formatDateToISOString(values?.appointmentDate),
        status: values?.status?.value,
      },
    });
  };

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    const selectedZoneOption = zoneOptions?.find(
      (option) => option.value === data?.zone?.id
    );
    const selectedBillingTypeOption = billingTypeOptions?.find(
      (option) => option.value === data?.billingType
    );
    const selectedBookingTypeOption = bookingTypeOptions?.find(
      (option) => option.label === data?.bookingType
    );
    const selectedBookingSlotOption = bookingSlotOptions?.find(
      (option) => option.value === data?.appointmentSlot
    );
    setValues({
      ...values,
      zone: selectedZoneOption,
      billingType: selectedBillingTypeOption,
      bookingType: selectedBookingTypeOption,
      serviceType: data?.serviceType,
      appointmentSlot: selectedBookingSlotOption,
      appointmentDate: data?.appointmentDate,
      status: selectedStatusOption,
    });
  }, [data]);

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
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Booking Id
                  </Text>
                  <CustomInput auth value={data?.bookingId} mb isDisabled />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Customer
                  </Text>
                  <CustomInput
                    auth
                    value={`${data?.customer?.profile?.firstName} ${data?.customer?.profile?.lastName}`}
                    mb
                    isDisabled
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Amount
                  </Text>
                  <CustomInput auth value={data?.amount} mb isDisabled />
                </Box>

                <Box mb={4}>
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
                    options={billingTypeOptions}
                    value={values?.billingType}
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
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Booking Type
                  </Text>
                  <Select
                    styles={customStyles}
                    options={bookingTypeOptions}
                    value={values?.bookingType}
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
                    placeholder="Select booking type"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Service Type
                  </Text>
                  <Flex my="16px" align="center">
                    <RadioGroup
                      value={values?.serviceType}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          serviceType: e,
                        })
                      }
                      align="center"
                      display="flex"
                      gap="32px"
                      isDisabled={edit ? false : true}
                    >
                      <Radio variant={"admin"} size="sm" value={"BASIC"}>
                        <Text
                          color={
                            values?.serviceType === "BASIC"
                              ? "#0D0718"
                              : "#646668"
                          }
                          fontWeight={
                            values?.serviceType === "BASIC" ? 500 : 400
                          }
                          fontSize="14px"
                        >
                          Basic
                        </Text>
                      </Radio>
                      <Radio variant={"admin"} size="sm" value={"PREMIUM"}>
                        <Text
                          color={
                            values?.serviceType === "PREMIUM"
                              ? "#0D0718"
                              : "#646668"
                          }
                          fontWeight={
                            values?.serviceType === "PREMIUM" ? 500 : 400
                          }
                          fontSize="14px"
                        >
                          Premium
                        </Text>
                      </Radio>
                    </RadioGroup>
                  </Flex>
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Appointment Slot
                  </Text>
                  <Select
                    styles={customStyles}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "appointmentSlot",
                      })
                    }
                    options={bookingSlotOptions}
                    value={values?.appointmentSlot}
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
                    placeholder="Select slot"
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Appointment Date
                  </Text>

                  <Box pos="relative" w="full" className="box">
                    <DateTimePicker
                      selectedDate={values?.appointmentDate || new Date()}
                      onChange={(date) =>
                        setValues({ ...values, appointmentDate: date })
                      }
                      isDisabled={edit ? false : true}
                    />
                  </Box>
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Address
                  </Text>
                  <CustomInput auth value={data?.address} mb isDisabled />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>

                  <Select
                    styles={customStyles}
                    options={statusOptions}
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
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
                      })
                    }
                    value={values?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminDanger"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(ADMIN_CAR_SERVICES),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="adminPrimary"
                    w="100%"
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
