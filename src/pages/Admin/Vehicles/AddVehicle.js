import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  allStates,
  colorTypes,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useCreateVehicle,
  useGetMake,
  useGetModel,
} from "../../../services/admin/query/vehicles";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import {
  initVehicleValues,
  validateVehicleSchema,
} from "../../../utils/validation";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";

export default function AddOperator() {
  const { data: models } = useGetModel();
  const { data: makes } = useGetMake();
  const { data: customers } = useGetAllCustomers();
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useCreateVehicle({
    onSuccess: () => {
      successToast("Vehicle added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_VEHICLES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));

  const colorOptions = colorTypes?.map((color) => ({
    value: color.color,
    label: color.label,
  }));
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [make, setMake] = useState("");
  const modelToMap = models?.data?.filter(
    (item) => Number(item?.make?.id) === make?.value
  );
  const model = make?.value ? modelToMap : models?.data;
  const modelOptions = model?.map((model) => ({
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

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const getOptionValue = (option) => option.value;
  const getOptionLabel = (option) => (
    <Flex gap="8px" align="center">
      <Box
        width="28px"
        height="20px"
        backgroundColor={option.value}
        borderRadius="4px"
      />
      {option.label}
    </Flex>
  );

  const ColorOption = ({ data, setValues, values }) => (
    <Flex
      mt="-5px"
      onClick={() => {
        setValues({ ...values, color: data });
        setMenuIsOpen(false);
      }}
      px="10px"
      cursor="pointer"
      _hover={{ bg: "#f4f6f8" }}
      gap="8px"
      align="center"
      h="40px"
    >
      <Flex
        width="28px"
        height="20px"
        backgroundColor={data?.value}
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );

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

  const handleSubmit = (values = "") => {
    const { make, model, customer, color, state, ...rest } = values;
    mutate({
      ...rest,
      make: Number(make?.value),
      model: Number(model?.value),
      customer: Number(customer?.value),
      color: color?.label,
      state: state?.value,
    });
  };

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <GoBackTab />
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="28px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initVehicleValues}
              validationSchema={validateVehicleSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
              }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    handleSubmit(e);
                  }}
                >
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      License Plate{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter license plate"
                      name="licensePlate"
                      value={values?.licensePlate}
                      onChange={(e) => {
                        const licensePlate = e.target.value.slice(0, 8);
                        handleChange({
                          target: {
                            name: "licensePlate",
                            value: `${licensePlate}`,
                          },
                        });
                      }}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.licensePlate) &&
                        errors?.licensePlate
                      }
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Assign Customer{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.customer
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select customer"
                      options={customerOptions}
                      name="customer"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          customer: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      value={values?.customer}
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
                    />
                    {formSubmitted && !values?.customer && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Customer is required
                      </Text>
                    )}
                  </Box>
                  <Box mb={4}>
                    <Text
                      color="#444648"
                      lineHeight="100%"
                      fontSize="12px"
                      fontWeight={500}
                      mb="8px"
                    >
                      Vehicle Color{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.color
                          ? errorCustomStyles
                          : customStyles
                      }
                      name="color"
                      onMenuOpen={() => setMenuIsOpen(true)}
                      menuIsOpen={menuIsOpen}
                      onMenuClose={() => setMenuIsOpen(false)}
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          color: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      value={values?.color}
                      components={{
                        SingleValue: ColorOptio,
                        Option: (props) => (
                          <ColorOption
                            {...props}
                            setValues={setValues}
                            values={values}
                          />
                        ),
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () => (
                          <div>
                            <IoIosArrowDown size="15px" color="#646668" />
                          </div>
                        ),
                      }}
                      getOptionLabel={getOptionLabel}
                      getOptionValue={getOptionValue}
                      options={colorOptions}
                      placeholder="Select vehicle color"
                    />
                    {formSubmitted && !values?.color && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Color is required
                      </Text>
                    )}
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Vehicle State{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.state
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select vehicle state"
                      options={stateOptions}
                      name="state"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          state: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      value={values?.state}
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
                    />
                    {formSubmitted && !values?.state && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        State is required
                      </Text>
                    )}
                  </Box>
                  <Box mb={4}>
                    <Text
                      color="#444648"
                      lineHeight="100%"
                      fontSize="12px"
                      fontWeight={500}
                      mb="8px"
                    >
                      Vehicle Make{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
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
                      options={makeOptions}
                      name="make"
                      onChange={(selectedOption) => {
                        setValues({
                          ...values,
                          make: selectedOption,
                          model: "",
                        });
                        setMake(selectedOption);
                      }}
                      onBlur={handleBlur}
                      value={values?.make}
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
                      placeholder="Select vehicle make"
                    />
                    {formSubmitted && !values?.make && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Make is required
                      </Text>
                    )}
                  </Box>
                  <Box mb={4}>
                    <Text
                      color="#444648"
                      lineHeight="100%"
                      fontSize="12px"
                      fontWeight={500}
                      mb="8px"
                    >
                      Vehicle Model{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.model
                          ? errorCustomStyles
                          : customStyles
                      }
                      options={modelOptions}
                      name="model"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          model: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      value={values?.model}
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
                      placeholder="Select vehicle model"
                    />

                    {formSubmitted && !values?.model && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Model is required
                      </Text>
                    )}
                  </Box>
                  <Flex gap={4} mt={4}>
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_VEHICLES)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isLoading={isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
