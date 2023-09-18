import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles, allStates } from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useGetAdministrators,
  useGetOperators,
} from "../../../services/admin/query/users";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { useGetAmenities } from "../../../services/admin/query/amenities";
import {
  useAddLocation,
  useGetLocations,
} from "../../../services/admin/query/locations";

export default function AddLocation() {
  const [state, setState] = useState({
    status: 1,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetLocations();
  const { mutate, isLoading } = useAddLocation({
    onSuccess: () => {
      successToast("Location added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_LOCATIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: managers } = useGetAdministrators({}, 1, 1000);
  const { data: amenities } = useGetAmenities({}, 1, 1000);

  const managerOptions = managers?.data?.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: parseInt(manager.id),
  }));

  const amenitiesOptions = amenities?.data?.map((amenity) => ({
    label: amenity.name,
    value: parseInt(amenity.id),
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    value: parseInt(operator.id),
    label: operator.name,
  }));

  const isFormValid = () => {
    return (
      !state.name ||
      !state.address ||
      !state.operator ||
      !state.description ||
      !state.managers?.length ||
      !state.amenities?.length ||
      !state.state ||
      !state.locationType
    );
  };

  const stateOptions = allStates.map((state) => ({
    label: state,
    value: state,
  }));

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  const locationTypeOptions = [
    "RESTUARANT CAFE",
    "BAR LOUNGE NIGHTCLUB",
    "OFFICE BUILDING",
    "EVENT CENTER",
    "SPORTING CENTER",
    "HOTEL CONFERENCE CENTER",
    "HALL SHIPPING CENTER",
    "GARAGE PARKING LOT",
  ].map((type, index) => ({ label: type, value: index }));

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
          <Box alignSelf={"center"} w="full" mb={5}>
            <Flex
              w="100%"
              h="120px"
              justifyContent="center"
              alignItems="center"
              border="4px solid #0D0718"
              borderRadius="12px"
              display="flex"
              cursor="pointer"
              flexDir={"column"}
            >
              <AiOutlineFolderOpen size={32} />
              <Text
                fontSize="10px"
                fontWeight={500}
                color="#444648"
                textAlign="center"
              >
                Add location image
              </Text>
            </Flex>
          </Box>
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Location Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter event name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Location Description
            </Text>
            <CustomInput
              opt
              auth
              value={state.description}
              mb
              holder="Enter location description"
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              GeoLocation
            </Text>
            <CustomInput
              auth
              value={state.geoLocation}
              mb
              holder="Enter geolocation"
              onChange={(e) =>
                setState({ ...state, geoLocation: e.target.value })
              }
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Location Address
            </Text>
            <CustomInput
              auth
              value={state.address}
              mb
              holder="Enter event address"
              onChange={(e) => setState({ ...state, address: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              State
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select state"
              options={stateOptions}
              onChange={(selectedOption) =>
                setState({ ...state, state: selectedOption.value })
              }
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
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Location Type
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select location type"
              options={locationTypeOptions}
              onChange={(selectedOption) =>
                setState({ ...state, locationType: selectedOption.value })
              }
              value={locationTypeOptions.find(
                (type) => type.value === state.locationType
              )}
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

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Assign Manager
            </Text>
            <Select
              isMulti
              styles={customStyles}
              placeholder="Select manager(s)"
              options={managerOptions}
              onChange={(selectedOptions) =>
                setState({
                  ...state,
                  managers: selectedOptions.map((option) => option.value),
                })
              }
              value={managerOptions?.filter((option) =>
                state.managers?.find((manager) => manager == option.value)
              )}
            />
          </Box>

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
