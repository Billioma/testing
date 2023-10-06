import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Calendar } from "react-calendar";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { formatDate } from "../../../utils/helpers";
import { useGetVehicles } from "../../../services/admin/query/vehicles";
import { useGetZones } from "../../../services/admin/query/locations";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useAddReservedParking } from "../../../services/admin/query/transactions";

export default function AddReservedParking() {
  const [state, setState] = useState({
    status: 1,
  });
  const [departureDate, setDepartureDate] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddReservedParking({
    onSuccess: () => {
      successToast("Transaction added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_RESERVED_PARKING);
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
          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Arrival
            </Text>

            <Box pos="relative" w="full" className="box">
              <Flex
                fontSize="14px"
                onClick={() => setStartDate((prev) => !prev)}
                align="center"
                justifyContent="space-between"
                w="full"
                bg={state.arrival ? "#F4F6F8" : "transparent"}
                // color={start ? "#000" : ""}
                h="44px"
                cursor="pointer"
                borderRadius="4px"
                border="1px solid #D4D6D8"
                py="12px"
                px="16px"
              >
                <Text>
                  {formatDate(state.arrival, "", true) || "Select Date"}
                </Text>

                <IoIosArrowDown />
              </Flex>
              {startDate && (
                <Box pos="absolute" top="50px" zIndex="3">
                  <Calendar
                    onChange={handleDateChange}
                    value={formatDate(state.arrival)}
                    // minDate={startDateRange}
                    tileClassName={"selected-date"}
                  />
                </Box>
              )}
            </Box>
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Departure
            </Text>

            <Box pos="relative" w="full" className="box">
              <Flex
                fontSize="14px"
                onClick={() => setDepartureDate((prev) => !prev)}
                align="center"
                justifyContent="space-between"
                w="full"
                bg={state.departure ? "#F4F6F8" : "transparent"}
                // color={start ? "#000" : ""}
                h="44px"
                cursor="pointer"
                borderRadius="4px"
                border="1px solid #D4D6D8"
                py="12px"
                px="16px"
              >
                <Text>
                  {formatDate(state.departure, "", true) || "Select Date"}
                </Text>

                <IoIosArrowDown />
              </Flex>

              {departureDate && (
                <Box pos="absolute" top="50px" zIndex="3">
                  <Calendar
                    onChange={handleDepartureDateChange}
                    value={formatDate(state.departure)}
                    // minDate={state.arrival}
                    tileClassName={"selected-date"}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Zone
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "zone" })
              }
              options={zoneOptions}
              value={zoneOptions?.find((zone) => zone.value == state.zone)}
              placeholder="Select zone "
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

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Vehicle
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "vehicle" })
              }
              options={vehicleOptions}
              value={vehicleOptions?.find(
                (vehicle) => vehicle.value == state.vehicle
              )}
              placeholder="Select vehicle "
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
