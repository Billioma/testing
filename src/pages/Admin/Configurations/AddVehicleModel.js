import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";

import {
  useAddModel,
  useGetMakes,
  useGetModels,
} from "../../../services/admin/query/configurations";

export default function AddVehicleMake() {
  const [state, setState] = useState({
    status: 1,
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { data: makes } = useGetMakes({}, 1, 10000);
  const { refetch } = useGetModels();
  const { mutate, isLoading } = useAddModel({
    onSuccess: () => {
      successToast("Model added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const makeOption = makes?.data?.map((make) => ({
    label: make.name,
    value: make.id,
  }));

  const isFormValid = () => {
    return !state.name;
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
              Model Name
            </Text>
            <CustomInput
              auth
              value={state.name}
              mb
              holder="Enter model name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Make
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select make"
              options={makeOption}
              onChange={(selectedOption) =>
                setState({ ...state, make: selectedOption.value })
              }
            />
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() =>
                navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS)
              }
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
