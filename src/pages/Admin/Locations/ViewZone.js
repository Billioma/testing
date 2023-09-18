import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  BillingTypes,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetAmenities } from "../../../services/admin/query/amenities";
import {
  useDeleteZone,
  useEditZone,
  useGetLocations,
  useGetZones,
} from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";

export default function ViewZone() {
  const [state, setState] = useState({
    status: 1,
    reservable: 0,
    showBillingType: false,
  });

  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const [isOpen, setIsOpen] = useState(false);
  const { refetch } = useGetZones();
  const { mutate, isLoading } = useEditZone({
    onSuccess: () => {
      successToast("Zone updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_ZONES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteZone, isLoading: isDeleting } = useDeleteZone({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_ZONES);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
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

  useEffect(() => {
    setState({
      ...location.state,
      amenities: location.state.amenities.map((amenity) =>
        parseInt(amenity.id)
      ),
      location: parseInt(location.state.location.id),
      service: location.state.service.id,
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
              Zone Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter zone name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
                (location) => location.value === state.location
              )}
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
                (service) => service.value === state.service
              )}
              isDisabled={!isEdit}
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
              value={amenitiesOptions?.filter((option) =>
                state.amenities?.find((amenity) => amenity == option.value)
              )}
              isDisabled={!isEdit}
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
              isDisabled={!isEdit}
              isChecked={state.reservable}
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
                isDisabled={!isEdit}
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
              isDisabled={!isEdit}
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
                isDisabled={!isEdit}
              />
            </Box>
          ) : null}

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Status
            </Text>
            <Select
              styles={customStyles}
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
              placeholder="Select event status"
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
              variant={!isEdit ? "adminDanger" : "adminSecondary"}
              w="45%"
              onClick={() =>
                !isEdit ? setIsOpen(true) : navigate(PRIVATE_PATHS.ADMIN_ZONES)
              }
            >
              {!isEdit ? "Delete" : "Cancel"}
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isEdit && isDisabled}
              isLoading={isLoading}
              onClick={() => (!isEdit ? setIsEdit(true) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <AdminDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Zone"
        subTitle="Are you sure you want to delete this zone?"
        handleSubmit={() => deleteZone(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
