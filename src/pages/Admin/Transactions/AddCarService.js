import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, RadioGroup, Radio } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { formatDate } from "../../../utils/helpers";
import { useGetVehicles } from "../../../services/admin/query/vehicles";
import {
  useGetLocations,
  useGetZones,
} from "../../../services/admin/query/locations";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import Select from "react-select";
import {
  BillingTypes,
  customStyles,
} from "../../../components/common/constants";
import { useAddReservedParking } from "../../../services/admin/query/transactions";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import CustomInput from "../../../components/common/CustomInput";

export default function AddCarService() {
  const [state, setState] = useState({
    service: "3",
  });
  const [departureDate, setDepartureDate] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddReservedParking({
    onSuccess: () => {
      successToast("Transaction added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CAR_SERVICES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: customers } = useGetAllCustomers();
  const customerOptions = customers?.data?.map((customer) => ({
    label: `${customer.profile.firstName} ${customer.profile.lastName}`,
    value: customer.id,
  }));

  const { data: vehicles } = useGetVehicles({}, 1, 100000);

  const vehicleOptions = vehicles?.data
    ?.filter((vehicle) => vehicle.customer?.id == state.customer)
    ?.map((vehicle) => ({
      label: `${vehicle.color} - ${vehicle.make.name} - ${vehicle.model.name}`,
      value: vehicle.id,
    }));

  const { data: zones } = useGetZones({}, 1, 10000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: `${zone.name} - ${zone?.location?.name}`,
    value: zone.id,
  }));

  const { data: locations } = useGetLocations({}, 1, 100000);

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  const billingTypeOptions = BillingTypes.map((type, i) => ({
    label: type,
    value: i,
  }));

  const bookingTypeOptions = ["ONE-TYPE", "RE-OCCURRING"].map((type, i) => ({
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
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const handleDepartureDateChange = (date) => {
    setState({ ...state, departure: date });
    setDepartureDate(false);
  };

  const handleDateChange = (date) => {
    setState({ ...state, arrival: formatDate(date, "", true) });
    setStartDate(false);
  };

  const isFormValid = () => {
    return (
      !state.customer ||
      !state.zone ||
      !state.vehicle ||
      !state.arrival ||
      !state.departure
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />
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
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Booking Id
            </Text>
            <CustomInput
              auth
              value={state.bookingId}
              mb
              holder="Enter booking ID"
              onChange={(e) =>
                setState({ ...state, bookingId: e.target.value })
              }
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Customer
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "customer" })
              }
              options={customerOptions}
              value={customerOptions?.find(
                (method) => method.value == state.customer
              )}
              placeholder="Select payment method "
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Amount
            </Text>
            <CustomInput
              auth
              value={state.amount}
              mb
              type={"number"}
              holder="Enter amount"
              onChange={(e) => setState({ ...state, amount: e.target.value })}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Billing Type
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "billingType" })
              }
              options={billingTypeOptions}
              value={billingTypeOptions?.find(
                (type) => type.value == state.billingType
              )}
              placeholder="Select billing type"
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Booking Type
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "bookingType" })
              }
              options={bookingTypeOptions}
              value={bookingTypeOptions?.find(
                (type) => type.value == state.bookingType
              )}
              placeholder="Select booking type"
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Service Type
            </Text>
            <Flex my="16px" align="center">
              <RadioGroup
                value={state.serviceType}
                onChange={(e) =>
                  setState({
                    ...state,
                    serviceType: e,
                  })
                }
                align="center"
                display="flex"
                gap="32px"
              >
                <Radio variant={"admin"} size="sm" value={"BASIC"}>
                  <Text
                    color={
                      state.serviceType === "BASIC" ? "#0D0718" : "#646668"
                    }
                    fontWeight={state.serviceType === "BASIC" ? 500 : 400}
                    fontSize="14px"
                  >
                    Basic
                  </Text>
                </Radio>
                <Radio variant={"admin"} size="sm" value={"PREMIUM"}>
                  <Text
                    color={
                      state.serviceType === "PREMIUM" ? "#0D0718" : "#646668"
                    }
                    fontWeight={state.serviceType === "PREMIUM" ? 500 : 400}
                    fontSize="14px"
                  >
                    Premium
                  </Text>
                </Radio>
              </RadioGroup>
            </Flex>
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Appointment Slot
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "appointmentSlot" })
              }
              options={bookingSlotOptions}
              value={bookingSlotOptions?.find(
                (slot) => slot.value == state.appointmentSlot
              )}
              placeholder="Select slot "
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Appointment Date
            </Text>

            <Box pos="relative" w="full" className="box">
              <DateTimePicker
                selectedDate={state.arrival}
                onChange={(date) =>
                  setState({ ...state, appointmentDate: date })
                }
              />
            </Box>
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Address
            </Text>
            <CustomInput
              auth
              value={state.address}
              mb
              holder="Enter address"
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS)}
            >
              Cancel
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isDisabled}
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
