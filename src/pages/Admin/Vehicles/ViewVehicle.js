import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { colors } from "../../../components/common/constants";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetStates } from "../../../services/customer/query/locations";
import {
  useEditVehicle,
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
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const [isEdit, setIsEdit] = useState(false);
  const { data: states } = useGetStates();
  const { mutate, isLoading } = useEditVehicle({
    onSuccess: () => {
      successToast("Vehicle updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_VEHICLES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const stateOptions = states?.data?.map((state) => ({
    value: state,
    label: state,
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

  const handleSubmit = () => {
    mutate(state);
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

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
      model: location.state?.model?.id,
      make: location.state?.make?.id,
      customer: location.state?.customer?.id,
    });

    setIsEdit(location?.state?.isEdit);
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
              value={customerOptions?.find(
                (option) => option.value == state.customer
              )}
              onChange={(selectedOption) =>
                setState({ ...state, customer: selectedOption.value })
              }
              isDisabled={!isEdit}
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
              value={colorOptions?.find((color) => color.value == state.color)}
              isDisabled={!isEdit}
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
                (option) => option.value == state.state
              )}
              onChange={(selectedOption) =>
                setState({ ...state, state: selectedOption.value })
              }
              isDisabled={!isEdit}
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
              value={makeOptions?.find((make) => make.value == state.make)}
              isDisabled={!isEdit}
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
              value={modelOptions?.find((model) => model.value == state.model)}
              isDisabled={!isEdit}
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
              variant={isEdit ? "adminPrimary" : "adminPrimary"}
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
