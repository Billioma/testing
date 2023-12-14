import React, { useState } from "react";
import { Box, Button, Flex, Text, Switch } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import {
  useGetAmenities,
  useCreateZone,
  useGetOpLocation,
} from "../../../../services/operator/query/locations";
import { Form, Formik } from "formik";
import {
  initZoneValues,
  validateZoneSchema,
  validateZoneSpaceSchema,
} from "../../../../utils/validation";
import { useGetServices } from "../../../../services/customer/query/locations";
import { statusType } from "../../../../components/common/constants";

const AddZone = () => {
  const navigate = useNavigate();
  const { data: amenities } = useGetAmenities();
  const { data: locations } = useGetOpLocation();
  const { data: services } = useGetServices();

  const serviceOptions = services?.map((service) => ({
    value: service?.id,
    label: service?.name,
  }));

  const locationOptions = locations?.data?.map((location) => ({
    value: location?.id,
    label: location?.name,
  }));

  const amenitiesOptions = amenities?.map((amenity) => ({
    value: amenity?.id,
    label: amenity?.name,
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };

  const { errorToast, successToast } = useCustomToast();

  const { mutate: createMutate, isLoading: isCreating } = useCreateZone({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/zones");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const { location, service, status, amenities, reservableSpace, ...rest } =
      values;
    reservable
      ? createMutate({
          ...rest,
          amenities: amenities?.map((dat) => Number(dat?.value)),
          service: Number(service?.value),
          location: Number(location?.value),
          reservable: reservable ? 1 : 0,
          reservableSpace: reservableSpace,
          status: status?.value,
        })
      : createMutate({
          ...rest,
          amenities: amenities?.map((dat) => Number(dat?.value)),
          service: Number(service?.value),
          location: Number(location?.value),
          reservable: reservable ? 1 : 0,
          status: status?.value,
        });
  };

  const [reservable, setReservable] = useState(false);

  return (
    <Box minH="75vh">
      {" "}
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
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
            <Text fontWeight={500} lineHeight="100%">
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
                initialValues={initZoneValues}
                validationSchema={
                  reservable ? validateZoneSpaceSchema : validateZoneSchema
                }
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
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Zone Name
                      </Text>
                      <CustomInput
                        name="name"
                        value={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.name && touched?.name && errors?.name}
                        holder="Enter Zone Name"
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Zone Description
                      </Text>
                      <CustomInput
                        name="description"
                        value={values?.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.description &&
                          touched?.description &&
                          errors?.description
                        }
                        holder="Zone Description"
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Zone Capacity
                      </Text>
                      <CustomInput
                        name="capacity"
                        value={values?.capacity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        error={
                          errors?.capacity &&
                          touched?.capacity &&
                          errors?.capacity
                        }
                        holder="Enter a number"
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        GeoLocation
                      </Text>
                      <CustomInput
                        name="geoLocation"
                        value={values?.geoLocation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.geoLocation &&
                          touched?.geoLocation &&
                          errors?.geoLocation
                        }
                        holder="Enter Geolocation"
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="12px"
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

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Minimum Duration (In Minutes)
                      </Text>
                      <CustomInput
                        name="minimumDuration"
                        value={values?.minimumDuration}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        error={
                          errors?.minimumDuration &&
                          touched?.minimumDuration &&
                          errors?.minimumDuration
                        }
                        holder="Enter a number"
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Select Service
                      </Text>
                      <Select
                        styles={customStyles}
                        options={serviceOptions}
                        value={values.service}
                        defaultValue={values.service}
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
                        name="service"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            service: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Assign Amenities
                      </Text>
                      <Select
                        styles={customStyles}
                        isMulti
                        value={values.amenities}
                        options={amenitiesOptions}
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
                        name="amenities"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            amenities: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Flex
                      align="center"
                      w="full"
                      justifyContent="space-between"
                    >
                      <Text
                        color="#444648"
                        fontSize="14px"
                        mb="8px"
                        lineHeight="100%"
                      >
                        Add Reservable Space
                      </Text>
                      <Switch
                        size="sm"
                        value={reservable}
                        onChange={() => setReservable((prev) => !prev)}
                      />
                    </Flex>

                    {reservable && (
                      <Box my="16px" className="opt-input">
                        <Text
                          color="#444648"
                          fontSize="12px"
                          fontWeight={500}
                          mb="8px"
                          lineHeight="100%"
                        >
                          Enter Reservable Space
                        </Text>
                        <CustomInput
                          name="reservableSpace"
                          value={values?.reservableSpace}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors?.reservableSpace &&
                            touched?.reservableSpace &&
                            errors?.reservableSpace
                          }
                          holder="e.g 1-100"
                        />
                      </Box>
                    )}

                    <Box mt="16px">
                      <Text
                        color="#444648"
                        fontSize="12px"
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
                        isDisabled={
                          !isValid || !dirty || !values.amenities.length
                        }
                        fontSize="14px"
                        type="submit"
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

export default AddZone;
