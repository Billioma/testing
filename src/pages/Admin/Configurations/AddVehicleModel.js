import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import {
  useAddModel,
  useGetMakes,
} from "../../../services/admin/query/configurations";
import { IoIosArrowDown } from "react-icons/io";

export default function AddVehicleMake() {
  const [values, setValues] = useState({
    name: "",
    model: "",
  });
  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const { data: makes } = useGetMakes({}, 1, 10000);
  const { mutate: updateMutate, isLoading: isUpdating } = useAddModel({
    onSuccess: () => {
      successToast("Model created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const makeOptions = makes?.data?.map((make) => ({
    label: make?.name,
    value: parseInt(make?.id),
  }));

  const handleSubmit = () => {
    updateMutate({
      name: values?.name,
      make: values?.make?.value,
    });
  };

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="8px"
            py="32px"
            px="24px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <form
              onSubmit={(e) => {
                !values?.name || !values?.make
                  ? setFormSubmitted(true)
                  : (setFormSubmitted(true), handleSubmit(e));
                e.preventDefault();
              }}
            >
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Model Name{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "13px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <CustomInput
                  auth
                  value={values?.name}
                  mb
                  holder="Enter model name"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  error={formSubmitted && !values?.name ? true : false}
                />
                {formSubmitted && !values?.name && (
                  <Text mt="-3px" fontSize="10px" color="tomato">
                    Name is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Make{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "13px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <Select
                  styles={
                    formSubmitted && !values?.make
                      ? errorCustomStyles
                      : customStyles
                  }
                  placeholder="Select make"
                  options={makeOptions}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "make",
                    })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        <IoIosArrowDown size="15px" color="#646668" />
                      </div>
                    ),
                  }}
                  value={values?.make}
                />
                {formSubmitted && !values?.make && (
                  <Text mt="3px" fontSize="10px" color="tomato">
                    Make is required
                  </Text>
                )}
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  variant="adminSecondary"
                  w="100%"
                  onClick={() =>
                    navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS)
                  }
                >
                  Cancel
                </Button>
                <Button
                  variant="adminPrimary"
                  w="100%"
                  isLoading={isUpdating}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
