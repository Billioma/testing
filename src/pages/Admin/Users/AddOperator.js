import React, { useState } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import {
  allStates,
  customStyles,
  statusType,
} from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCreateOperator } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoIosArrowDown } from "react-icons/io";
import { Form, Formik } from "formik";
import {
  initOperatorValues,
  validateOperatorSchema,
} from "../../../utils/validation";

export default function AddOperator() {
  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useCreateOperator({
    onSuccess: () => {
      successToast("Operator added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_OPERATORS);
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

  const handleSubmit = (values = "") => {
    const { status, state, phone, ...rest } = values;
    mutate({
      ...rest,
      status: status?.value,
      state: state?.value,
      phone: `+234${Number(phone)}`,
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
            w={{ md: "30rem", base: "100%" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initOperatorValues}
              validationSchema={validateOperatorSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
                isValid,
                dirty,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter operator name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.name && touched?.name && errors?.name}
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Email Address
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter email address"
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.email && touched?.email && errors?.email}
                    />
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="10px"
                    >
                      Phone Number
                    </Text>
                    <CustomInput
                      mb
                      ngn
                      name="phone"
                      value={`${values?.phone}`}
                      onChange={(e) => {
                        const inputPhone = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        handleChange({
                          target: {
                            name: "phone",
                            value: `${inputPhone}`,
                          },
                        });
                      }}
                      onBlur={handleBlur}
                      error={errors?.phone && touched?.phone && errors?.phone}
                      holder="Enter Phone Number"
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Address
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter operator address"
                      name="address"
                      value={values?.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.address && touched?.address && errors?.address
                      }
                    />
                  </Box>
                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      State
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select State"
                      options={stateOptions}
                      name="state"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          state: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      value={values.state}
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
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Contact Person
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter contact person"
                      name="contactPerson"
                      value={values?.contactPerson}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.contactPerson &&
                        touched?.contactPerson &&
                        errors?.contactPerson
                      }
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Password
                    </Text>
                    <CustomInput
                      mb
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.password &&
                        touched?.password &&
                        errors?.password
                      }
                      holder="Enter Password"
                      onClick={() => setShow((prev) => !prev)}
                      password={show ? false : true}
                      show
                      type={show ? "text" : "password"}
                    />
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Confirm Password
                    </Text>
                    <CustomInput
                      mb
                      name="passwordConfirmation"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.passwordConfirmation &&
                        touched?.passwordConfirmation &&
                        errors?.passwordConfirmation
                      }
                      holder="Confirm Password"
                      onClick={() => setShow((prev) => !prev)}
                      password={show ? false : true}
                      show
                      type={show ? "text" : "password"}
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
                      Enable Tips
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          enableTips: values.enableTips ? 0 : 1,
                        })
                      }
                      value={values.enableTips}
                      isChecked={values.enableTips ? true : false}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>

                  <Box>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Status
                    </Text>
                    <Select
                      styles={customStyles}
                      options={statusOptions}
                      name="status"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          status: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
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
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_OPERATORS)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isDisabled={!isValid || !dirty}
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
