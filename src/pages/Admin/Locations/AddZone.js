import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  BillingTypes,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetOperators } from "../../../services/admin/query/users";

import { useGetAmenities } from "../../../services/admin/query/amenities";
import {
  useAddZone,
  useGetLocations,
  useGetZones,
} from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";

export default function AddZone() {
  const [state, setState] = useState({
    status: 1,
    reservable: 0,
    showBillingType: false,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetZones();
  const { mutate, isLoading } = useAddZone({
    onSuccess: () => {
      successToast("Zone added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_ZONES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: locations } = useGetLocations({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);
  const { data: amenities } = useGetAmenities({}, 1, 1000);

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: parseInt(location.id),
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const amenitiesOptions = amenities?.data?.map((amenity) => ({
    label: amenity.name,
    value: parseInt(amenity.id),
  }));

  const isFormValid = () => {
    return (
      !state.name ||
      !state.capacity ||
      !state.description ||
      !state.location ||
      !state.amenities?.length ||
      !state.minimumDuration
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
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
              Zone Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter zone name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Zone Description
            </Text>
            <CustomInput
              opt
              auth
              value={state.description}
              mb
              holder="Enter zone description"
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Zone capacity
            </Text>
            <CustomInput
              auth
              value={state.capacity}
              mb
              holder="Enter a number"
              onChange={(e) => setState({ ...state, capacity: e.target.value })}
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
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Minimum Duration (In Minutes)
            </Text>
            <CustomInput
              auth
              value={state.minimumDuration}
              mb
              holder="Enter a number"
              onChange={(e) =>
                setState({ ...state, minimumDuration: e.target.value })
              }
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
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Assign Amenities
            </Text>
            <Select
              isMulti
              styles={customStyles}
              placeholder="Select amenities"
              options={amenitiesOptions}
              onChange={(selectedOptions) =>
                setState({
                  ...state,
                  amenities: selectedOptions.map((option) => option.value),
                })
              }
            />
          </Box>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Add Reservable Space
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  reservable: state.reservable === 1 ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          {state.reservable ? (
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Enter Reservable Space
              </Text>
              <CustomInput
                auth
                value={state.reservableSpace}
                mb
                holder="Enter reservable space"
                onChange={(e) =>
                  setState({ ...state, reservableSpace: e.target.value })
                }
              />
            </Box>
          ) : null}

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Select Billing Type
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  showBillingType: !state.showBillingType,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          {state.showBillingType ? (
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select Billing Type
              </Text>
              <Select
                isMulti
                styles={customStyles}
                placeholder="Select billing type"
                options={BillingTypes.map((type, index) => ({
                  label: type,
                  value: index,
                }))}
                onChange={(selectedOptions) =>
                  setState({
                    ...state,
                    billingType: selectedOptions.map((option) => option.value),
                  })
                }
              />
            </Box>
          ) : null}

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_EVENTS)}
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
