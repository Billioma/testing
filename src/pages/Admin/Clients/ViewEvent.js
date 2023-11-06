import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { AiOutlineFolderOpen } from "react-icons/ai";
import {
  useGetClients,
  useGetClientsEvents,
  useUpdateClientEvent,
} from "../../../services/admin/query/clients";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";

export default function ViewEvent() {
  const [state, setState] = useState({
    paymentRequired: 0,
  });

  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetClientsEvents();
  const { mutate, isLoading } = useUpdateClientEvent({
    onSuccess: () => {
      successToast("Event updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_EVENTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: clients } = useGetClients({}, 1, 10000);

  const clientOptions = clients?.data?.map((client) => ({
    label: client.name,
    value: parseInt(client.id),
  }));

  const isFormValid = () => {
    return !state.name || !state.address || !state.client || !state.description;
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
      client: parseInt(location.state.client.id),
      zones: location.state.zones?.map((zone) => parseInt(zone.id)),
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
                Add event image
              </Text>
            </Flex>
          </Box>
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Event Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter event name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Event Description
            </Text>
            <CustomInput
              auth
              value={state.description}
              mb
              holder="Describe event"
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Event Address
            </Text>
            <CustomInput
              auth
              value={state.address}
              mb
              holder="Enter event address"
              onChange={(e) => setState({ ...state, address: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Event Website
            </Text>
            <CustomInput
              auth
              value={state.website}
              mb
              holder="Enter event website"
              onChange={(e) => setState({ ...state, website: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Event Start Date & Timee
            </Text>
            <DateTimePicker
              selectedDate={state.eventStartDateTime || new Date()}
              onChange={(date) =>
                setState({ ...state, eventStartDateTime: new Date(date) })
              }
              hasTime
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
              Event End Date & Timee
            </Text>
            <DateTimePicker
              selectedDate={state.eventEndDateTime || new Date()}
              onChange={(date) =>
                setState({ ...state, eventEndDateTime: new Date(date) })
              }
              hasTime
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Client
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select client"
              options={clientOptions}
              onChange={(selectedOption) =>
                setState({ ...state, client: selectedOption.value })
              }
              value={clientOptions?.find(
                (client) => client.value === state.client
              )}
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Event Status
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

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Add Event Price
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  setPrice: state.setPrice ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
              isDisabled={!isEdit}
            />
          </Flex>

          {state.setPrice ? (
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Event Price
              </Text>
              <CustomInput
                auth
                value={state.price}
                mb
                holder="Enter event price"
                onChange={(e) => setState({ ...state, price: e.target.value })}
                isDisabled={!isEdit}
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
              isDisabled={isEdit && isDisabled}
              isLoading={isLoading}
              onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
