import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import {
  useCreatePolicy,
  useGetOpLocation,
} from "../../../../services/operator/query/locations";
import { Form, Formik } from "formik";
import {
  initPolicyValues,
  validatePolicychema,
} from "../../../../utils/validation";
import { statusType } from "../../../../components/common/constants";

const AddPolicy = () => {
  const navigate = useNavigate();

  const { data: allLocations } = useGetOpLocation();

  const locationOptions = allLocations?.data?.map((state) => ({
    value: state?.id,
    label: state?.name,
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #d4d6d8",
      paddingRight: "16px",
      background: "unset",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f4f6f8",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#d4d6d8" : "",
    }),
  };

  const { errorToast, successToast } = useCustomToast();

  const { mutate: createMutate, isLoading: isCreating } = useCreatePolicy({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/policies");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const { location, status, ...rest } = values;
    createMutate({
      ...rest,
      location: Number(location?.value),
      status: status?.value,
    });
  };

  return (
    <Box minH="75vh">
      <Flex align="flex-start">
        <Box w="full">
          <Flex
            onClick={() => navigate(-1)}
            color="#242628"
            align="center"
            cursor="pointer"
            mb="23px"
            w="fit-content"
            pos="sticky"
            top="7rem"
            gap="8px"
          >
            <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
            <Text fontSize="14px" fontWeight={500} lineHeight="100%">
              Back
            </Text>
          </Flex>
        </Box>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            border="1px solid #D4D6D8"
            px="28px"
            py="32px"
            justifyContent="center"
            align="center"
            w={{ base: "full", md: "27rem" }}
            flexDir="column"
          >
            <Box mt="24px" w="full">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initPolicyValues}
                validationSchema={validatePolicychema}
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
                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Policy Title
                      </Text>
                      <CustomInput
                        name="title"
                        value={values?.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.title && touched?.title && errors?.title}
                        holder="Enter Title"
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Body
                      </Text>
                      <CustomInput
                        name="body"
                        value={values?.body}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.body && touched?.body && errors?.body}
                        holder="Enter Description"
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Select Location
                      </Text>
                      <Select
                        styles={customStyles}
                        value={values.location}
                        options={locationOptions}
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
                        name="location"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            location: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box mt="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Status
                      </Text>
                      <Select
                        styles={customStyles}
                        value={values.status}
                        options={statusOptions}
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
                        name="status"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            status: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Flex mt="24px" align="center" w="full" gap="24px">
                      <Button
                        bg="transparent"
                        w="70%"
                        border="1px solid #646668"
                        color="#646668"
                        fontWeight={500}
                        lineHeight="100%"
                        fontSize="14px"
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        _focus={{ bg: "transparent" }}
                        px="26px"
                        py="17px"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="#fff"
                        fontWeight={500}
                        lineHeight="100%"
                        isLoading={isCreating}
                        w="full"
                        isDisabled={!isValid || !dirty}
                        type="submit"
                        fontSize="12px"
                        px="26px"
                        py="17px"
                      >
                        Save
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Flex>
        <Box w="full"></Box>
      </Flex>
    </Box>
  );
};

export default AddPolicy;
