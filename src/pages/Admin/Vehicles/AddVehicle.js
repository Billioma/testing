import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { colors } from "../../../components/common/constants";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetStates } from "../../../services/customer/query/locations";
import {
  useCreateVehicle,
  useGetMake,
  useGetModel,
} from "../../../services/admin/query/vehicles";
import { useGetAllCustomers } from "../../../services/admin/query/customers";

export default function AddOperator() {
  const [state, setState] = useState({
    customer: 0,
    licensePlate: "",
    make: 0,
    model: 0,
    color: "",
    state: "",
    status: 1,
  });
  const { data: models } = useGetModel();
  const { data: makes } = useGetMake();
  const { data: customers } = useGetAllCustomers();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { data: states } = useGetStates();
  const { mutate, isLoading } = useCreateVehicle({
    onSuccess: () => {
      successToast("Vehicle added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_VEHICLES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occured"
      );
    },
  });

  const stateOptions = states?.data?.map((state) => ({
    value: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
    label: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  }));

  const colorOptions = colors.map((color) => ({
    value: color,
    label: color,
  }));

  const modelOptions = models?.data?.map((model) => ({
    value: parseInt(model?.id),
    label: model?.name,
  }));
  const makeOptions = makes?.data?.map((make) => ({
    value: parseInt(make?.id),
    label: make?.name,
  }));

  const customerOptions = customers?.data?.map((customer) => ({
    value: parseInt(customer?.id),
    label: `${customer?.profile.firstName} ${customer?.profile.lastName}`,
  }));

  const isFormValid = () => {
    return (
      !state.customer ||
      !state.licensePlate ||
      !state.make ||
      !state.model ||
      !state.state ||
      !state.color
    );
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const ColorOptio = ({ data }) => (
    <Flex mt="-30px" gap="8px" align="center" h="40px">
      <Flex
        width="28px"
        height="20px"
        backgroundColor={data?.value}
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...state, phone: `0${state.phone}` });
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
              License Plate
            </Text>
            <CustomInput
              auth
              value={state.licensePlate}
              mb
              holder="Enter license plate"
              onChange={(e) =>
                setState({ ...state, licensePlate: e.target.value })
              }
            />
          </Box>
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Assign Customer
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select customer"
              options={customerOptions}
              value={stateOptions?.find(
                (option) => option.value === state.customer
              )}
              onChange={(selectedOption) =>
                setState({ ...state, customer: selectedOption.value })
              }
            />
          </Box>
          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Vehicle Color
            </Text>
            <Select
              styles={customStyles}
              components={{
                SingleValue: ColorOptio,
              }}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "color" })
              }
              options={colorOptions}
              placeholder="Select vehicle color"
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Vehicle State
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select vehicle state"
              options={stateOptions}
              value={stateOptions?.find(
                (option) => option.value === state.customer
              )}
              onChange={(selectedOption) =>
                setState({ ...state, state: selectedOption.value })
              }
            />
          </Box>
          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Vehicle Make
            </Text>
            <Select
              styles={customStyles}
              options={makeOptions}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "make" })
              }
              placeholder="Select vehicle make"
            />
          </Box>
          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Select Vehicle Model
            </Text>
            <Select
              styles={customStyles}
              options={modelOptions}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "model" })
              }
              placeholder="Select vehicle model"
            />
          </Box>
          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_VEHICLES)}
            >
              Cancel
            </Button>
            <Button
              variant="adminAlt"
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
