import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useEditPolicy,
  useGetLocations,
  useGetRates,
  useGetZones,
} from "../../../services/admin/query/locations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";
import Select from "react-select";
import {
  customStyles,
  BillingTypes,
} from "../../../components/common/constants";
import { useGetServices } from "../../../services/admin/query/services";
import {
  useGetAttendants,
  useGetOperators,
} from "../../../services/admin/query/users";
import { useGetVehicles } from "../../../services/admin/query/vehicles";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import {
  useDeleteValetedVehicle,
  useGetValetedVehicles,
} from "../../../services/admin/query/logs";

export default function ViewParkedVehicle() {
  const [state, setState] = useState({
    status: 1,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetValetedVehicles();
  const { mutate, isLoading } = useEditPolicy({
    onSuccess: () => {
      successToast("Policy updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_POLICIES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteValetedVehicle, isLoading: isDeleting } =
    useDeleteValetedVehicle({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsOpen(false);
        refetch();
        navigate(PRIVATE_PATHS.ADMIN_VALETED_VEHICLES);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { data: locations } = useGetLocations({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);
  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: vehicles } = useGetVehicles({}, 1, 100000);
  const { data: attendants } = useGetAttendants({}, 1, 10000);
  const { data: rates } = useGetRates({}, 1, 1000);
  const { data: zones } = useGetZones({}, 1, 10000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: `${zone.name} - ${zone?.location?.name}`,
    value: zone.id,
  }));

  const vehicleOptions = vehicles?.data
    ?.filter((vehicle) => vehicle.customer?.id == state.customer)
    ?.map((vehicle) => ({
      label: `${vehicle.color} - ${vehicle.make.name} - ${vehicle.model.name}`,
      value: vehicle.id,
    }));

  const attendantOptions = attendants?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const rateOptions = rates?.data?.map((rate) => ({
    label: rate.name,
    value: rate.id,
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: parseInt(location.id),
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    value: parseInt(operator.id),
    label: operator.name,
  }));

  const billingTypeOptions = BillingTypes.map((type) => ({
    label: type,
    value: type,
  }));

  const isFormValid = () => {
    return !state.title || !state.body || !state.location;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  useEffect(() => {
    setState({
      ...location?.state,
      location: parseInt(location.state?.location?.id),
    });
    setIsEdit(location.state?.isEdit);
  }, [location.state]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />

        {!isEdit ? (
          <Flex
            borderRadius="16px"
            py="24px"
            px="28px"
            w="30rem"
            flexDir="column"
            border="1px solid #E4E6E8"
            minH={500}
            gap={4}
          >
            <Flex justify={"space-between"}>
              <Text>Ticket Number</Text>
              <Text fontWeight={500}>987673</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Vehicle</Text>
              <Text fontWeight={500}>ABJ702LZ / Guest</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Location</Text>
              <Text fontWeight={500}>The Library</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Zone</Text>
              <Text fontWeight={500}>T10983</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Service</Text>
              <Text fontWeight={500}>Valet Parking</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Amount</Text>
              <Text fontWeight={500}>0</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Extended</Text>
              <Text fontWeight={500}>False</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>isReserved</Text>
              <Text fontWeight={500}>False</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Delivered</Text>
              <Text fontWeight={500}>True</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Final Amount</Text>
              <Text fontWeight={500}>True</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Billing Type</Text>
              <Text fontWeight={500}>ADHOC</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Operator</Text>
              <Text fontWeight={500}>EZPark</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Attendant</Text>
              <Text fontWeight={500}>Adebayo Adeyemi</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Comment</Text>
              <Text fontWeight={500}>N/A</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Initial Rate</Text>
              <Text fontWeight={500}>Complimentary Valet</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Payment Status</Text>
              <Text fontWeight={500}>Unpaid</Text>
            </Flex>
            <Flex justify={"space-between"}>
              <Text>Date</Text>
              <Text fontWeight={500}>2023-06-05</Text>
            </Flex>

            <Flex gap={4} mt={4}>
              <Button
                variant={"adminDanger"}
                w="45%"
                onClick={() => setIsOpen(true)}
              >
                Delete
              </Button>
              <Button
                variant="adminPrimary"
                w="55%"
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDir={{ base: "column", lg: "row" }} gap={6}>
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
                  Ticket Number
                </Text>
                <CustomInput
                  auth
                  value={state.ticketNumber}
                  mb
                  holder="Enter ticket number"
                  onChange={(e) =>
                    setState({ ...state, title: e.target.value })
                  }
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Comment
                </Text>
                <CustomInput
                  auth
                  value={state.comment}
                  mb
                  holder="Enter comment"
                  onChange={(e) =>
                    setState({ ...state, comment: e.target.value })
                  }
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
                  holder="Enter comment"
                  onChange={(e) =>
                    setState({ ...state, amount: e.target.value })
                  }
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Final Amount
                </Text>
                <CustomInput
                  auth
                  value={state.finalAmount}
                  mb
                  holder="Enter comment"
                  onChange={(e) =>
                    setState({ ...state, finalAmount: e.target.value })
                  }
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Extended
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select extended status"
                  options={booleanOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, extended: selectedOption.value })
                  }
                  value={booleanOptions?.find(
                    (extended) => extended.value === state.extended
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Is Reserved
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select reserve status"
                  options={booleanOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, isReversed: selectedOption.value })
                  }
                  value={booleanOptions?.find(
                    (isReversed) => isReversed.value === state.isReversed
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Delivered
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select delivered status"
                  options={booleanOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, delivered: selectedOption.value })
                  }
                  value={booleanOptions?.find(
                    (delivered) => delivered.value === state.delivered
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Billing Type
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select billing type"
                  options={billingTypeOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, billingType: selectedOption.value })
                  }
                  value={billingTypeOptions?.find(
                    (type) => type.value === state.billingType
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Payment Status
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select delivered status"
                  options={[
                    { label: "PAID", value: "PAID" },
                    { label: "UNPAID", value: "PAID" },
                  ]}
                  onChange={(selectedOption) =>
                    setState({ ...state, delivered: selectedOption.value })
                  }
                  value={[
                    { label: "PAID", value: "PAID" },
                    { label: "UNPAID", value: "PAID" },
                  ]?.find((status) => status.value === state.paymentStatus)}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Vehicle
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select vehicle"
                  options={vehicleOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, vehicle: selectedOption.value })
                  }
                  value={vehicleOptions?.find(
                    (vehicle) => vehicle.value === state?.vehicle
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Service
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select service"
                  options={serviceOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, service: selectedOption.value })
                  }
                  value={serviceOptions?.find(
                    (service) => service.value === state?.service
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Operator
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select operator"
                  options={operatorOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, operator: selectedOption.value })
                  }
                  value={serviceOptions?.find(
                    (operator) => operator.value === state?.operator
                  )}
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Attendant
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select attendant"
                  options={attendantOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, operator: selectedOption.value })
                  }
                  value={attendantOptions?.find(
                    (attendants) => attendants.value === state?.attendant
                  )}
                />
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Location
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select location"
                  options={locationOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, location: selectedOption.value })
                  }
                  value={locationOptions?.find(
                    (location) => location.vale === state.location
                  )}
                />
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Zone
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select zone"
                  options={zoneOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, zone: selectedOption.value })
                  }
                  value={locationOptions?.find(
                    (zone) => zone.value === state.zone
                  )}
                />
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Rate
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select rate"
                  options={rateOptions}
                  onChange={(selectedOption) =>
                    setState({ ...state, rate: selectedOption.value })
                  }
                  value={locationOptions?.find(
                    (rate) => rate.value === state.rate
                  )}
                />
              </Box>

              <Box mb={4}>
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                  Invoice Date
                </Text>
                <DateTimePicker
                  selectedDate={state.date || new Date()}
                  onChange={(date) => setState({ ...state, date })}
                />
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  variant={"adminSecondary"}
                  w="45%"
                  onClick={() => navigate(PRIVATE_PATHS.ADMIN_VALETED_VEHICLES)}
                >
                  Cancel
                </Button>
                <Button
                  variant="adminPrimary"
                  w="55%"
                  // isDisabled={isDisabled}
                  isLoading={isLoading}
                  // onClick={() => handleSubmit()}
                >
                  Save
                </Button>
              </Flex>
            </Flex>

            <Flex
              bg="#fff"
              borderRadius="16px"
              py="24px"
              px="28px"
              justifyContent="center"
              w="30rem"
              flexDir="column"
              border="1px solid #E4E6E8"
              h="fit-content"
            >
              <Text mb="20px" fontSize="10px" fontWeight={500} color="#444648">
                Make payment
              </Text>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Pay Amount
                </Text>
                <CustomInput
                  auth
                  value={state.amount}
                  mb
                  holder="Enter amount"
                  onChange={(e) =>
                    setState({ ...state, amount: e.target.value })
                  }
                />
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Comment
                </Text>
                <CustomInput
                  opt
                  auth
                  value={state.comment}
                  mb
                  holder="Enter comment "
                  onChange={(e) =>
                    setState({ ...state, comment: e.target.value })
                  }
                />
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Payment method
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select payment method"
                  options={[
                    { label: "CARD", value: "CARD" },
                    { label: "TRANSFER", value: "TRANSFER" },
                  ]}
                  onChange={(selectedOption) =>
                    setState({ ...state, paymentMethod: selectedOption.value })
                  }
                  value={[
                    { label: "CARD", value: "CARD" },
                    { label: "TRANSFER", value: "TRANSFER" },
                  ]?.find((method) => method.value === state.paymentMethod)}
                />
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  variant="adminPrimary"
                  w="full"
                  // isDisabled={isEdit && isDisabled}
                  isLoading={isLoading}
                >
                  Pay
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>

      <AdminDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Policy"
        subTitle="Are you sure you want to delete this policy?"
        handleSubmit={() => deleteValetedVehicle(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}

const booleanOptions = [
  { label: "FALSE", value: "FALSE" },
  { label: "TRUE", value: "TRUE" },
];
