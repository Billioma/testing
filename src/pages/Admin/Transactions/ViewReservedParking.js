import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useDeleteReservedParking,
  useEditReservedParking,
} from "../../../services/admin/query/transactions";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import { Calendar } from "react-calendar";
import { IoIosArrowDown } from "react-icons/io";
import { formatDate } from "../../../utils/helpers";
import { useGetVehicles } from "../../../services/admin/query/vehicles";
import { useGetZones } from "../../../services/admin/query/locations";

export default function ViewPayToPark() {
  const [state, setState] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [departureDate, setDepartureDate] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [isDisabled] = useState(false);

  const tileClassName = () => {
    return "selected-date";
  };
  const handleDepartureDateChange = (date) => {
    setState({ ...state, departure: date });
    setDepartureDate(false);
  };

  const handleDateChange = (date) => {
    setState({ ...state, arrival: formatDate(date, "", true) });
    setStartDate(false);
  };

  const paymentMethodOptions = [
    "CASH",
    "TRANSFER",
    "WALLET",
    "POS",
    "UNPAID",
    "SUBSCRIPTION",
    "CARD",
  ].map((method, index) => ({ label: method, value: index }));

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
    label: zone.name,
    value: zone.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const { mutate, isLoading } = useEditReservedParking({
    onSuccess: () => {
      successToast("Transaction updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_RESERVED_PARKING);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteReserveParking, isLoading: isDeleting } =
    useDeleteReservedParking({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsOpen(false);
        navigate(-1);
      },

      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { errorToast, successToast } = useCustomToast();

  const handleDelete = () => {
    deleteReserveParking(state.id);
  };

  const handleSubmit = () => {
    mutate({ ...state });
  };

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
      customer: location.state.customer.id,
      vehicle: location.state.vehicle.id,
      zone: location.state.zone.id,
    });

    setIsEdit(location.state.isEdit);
  }, [location.state]);

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
              Reservation Id
            </Text>
            <CustomInput
              auth
              value={state.reservationId}
              mb
              isDisabled={!isEdit}
              onChange={({ target }) =>
                setState({ ...state, revervationId: target.value })
              }
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Amount
            </Text>
            <CustomInput
              auth
              value={
                !isEdit ? "₦" + state.amount?.toLocaleString() : state.amount
              }
              mb
              type="text"
              onChange={(e) => setState({ ...state, amount: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Payment Method
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "paymentMethod" })
              }
              options={paymentMethodOptions}
              value={paymentMethodOptions?.find(
                (method) => method.value == state.paymentMethod
              )}
              placeholder="Select payment method "
              isDisabled={!isEdit}
            />
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
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
            />
          </Box>

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
              {startDate && isEdit && (
                <Box pos="absolute" top="50px" zIndex="3">
                  <Calendar
                    onChange={handleDateChange}
                    value={formatDate(state.arrival)}
                    // minDate={startDateRange}
                    tileClassName={tileClassName}
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

              {departureDate && isEdit && (
                <Box pos="absolute" top="50px" zIndex="3">
                  <Calendar
                    onChange={handleDepartureDateChange}
                    value={formatDate(state.departure)}
                    // minDate={state.arrival}
                    tileClassName={tileClassName}
                  />
                </Box>
              )}
            </Box>
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Status
            </Text>

            <Select
              styles={customStyles}
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
              placeholder="Select status"
              onChange={(selectedOption) =>
                setState({
                  ...state,
                  status: selectedOption.value,
                })
              }
              value={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ].find((status) => status.value === state.status)}
              isDisabled={!isEdit}
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminDanger"
              w="40%"
              onClick={() => setIsOpen(true)}
            >
              Delete
            </Button>

            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isEdit && isDisabled}
              isLoading={!isOpen && isLoading}
              onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <AdminDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Transaction"
        subTitle="Are you sure you want to delete this transaction?"
        handleSubmit={handleDelete}
        isLoading={isDeleting}
      />
    </Box>
  );
}
