import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles, RateTypes } from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetOperators } from "../../../services/admin/query/users";
import {
  useAddRate,
  useGetZones,
} from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";

export default function AddZone() {
  const [state, setState] = useState({
    status: 1,
    addLimit: false,
    flatRate: 0,
    showCarServiceType: false,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetZones();
  const { mutate, isLoading } = useAddRate({
    onSuccess: () => {
      successToast("Rate added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_RATES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);

  const rateOptions = RateTypes?.map((rate, i) => ({
    value: i,
    label: rate,
  }));
  const operatorOptions = operators?.data?.map((operator) => ({
    label: operator.name,
    value: parseInt(operator.id),
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: parseInt(service.id),
  }));

  const selectOptions = [
    { label: "PARKING", value: "PARKING" },
    { label: "VALET", value: "VALET" },
    { label: "SERVICE", value: "SERVICE" },
    { label: "OTHERS", value: "OTHERS" },
  ];

  const isFormValid = () => {
    return (
      !state.name ||
      !state.amount ||
      !state.operator ||
      state.rateType === undefined ||
      !state.service
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
              Rate Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter rate name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
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
              Service Type
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select service type"
              options={selectOptions}
              onChange={(selectedOption) =>
                setState({ ...state, serviceType: selectedOption.value })
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
              Rate Type
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select rate type"
              options={rateOptions}
              onChange={(selectedOption) =>
                setState({ ...state, rateType: selectedOption.value })
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
              holder="Enter amount"
              onChange={(e) => setState({ ...state, amount: e.target.value })}
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
              Add Limit
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  addLimit: !state.addLimit,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          {state.addLimit ? (
            <Flex flexDir={"row"} gap={4}>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Duration Start (Minutes)
                </Text>
                <CustomInput
                  auth
                  value={state.durationStart}
                  mb
                  holder="Enter duration start"
                  onChange={(e) =>
                    setState({ ...state, durationStart: e.target.value })
                  }
                />
              </Box>
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Duration Limit (Minutes)
                </Text>
                <CustomInput
                  auth
                  value={state.durationLimit}
                  mb
                  holder="Enter duration limit"
                  onChange={(e) =>
                    setState({ ...state, durationLimit: e.target.value })
                  }
                />
              </Box>
            </Flex>
          ) : null}

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Flat Rate
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  flatRate: state.flatRate === 1 ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Select Car Service Type
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  showCarServiceType: !state.showCarServiceType,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          {state.showCarServiceType ? (
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Add Billing Type
              </Text>
              <Select
                styles={customStyles}
                placeholder="Select car service type"
                options={[
                  { label: "PREMIUM", value: "PREMIUM" },
                  { label: "BASIC", value: "BASIC" },
                ]}
                onChange={(selectedOption) =>
                  setState({ ...state, carServiceType: selectedOption.label })
                }
              />
            </Box>
          ) : null}

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_RATES)}
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
