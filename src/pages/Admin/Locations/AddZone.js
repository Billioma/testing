import React, { useState } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  BillingTypes,
  statusType,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetAmenities } from "../../../services/admin/query/amenities";
import {
  useAddZone,
  useGetLocations,
} from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import {
  initAdminZoneValues,
  validateAdminZoneSchema,
} from "../../../utils/validation";

export default function AddZone() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddZone({
    onSuccess: () => {
      successToast("Zone added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ZONES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: locations } = useGetLocations({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);
  const { data: amenities } = useGetAmenities({}, 1, 1000);

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: parseInt(location.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  const amenitiesOptions = amenities?.data?.map((amenity) => ({
    label: amenity.name,
    value: parseInt(amenity.id),
  }));

  const billingOptions = BillingTypes.map((type, index) => ({
    label: type,
    value: index,
  }));

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (values = "") => {
    const { location, service, amenities, billingType, status, ...rest } =
      values;
    mutate({
      ...rest,
      location: location?.value,
      service: service?.value,
      billingType: billingType?.value,
      status: status?.value,
      amenities: amenities?.map((item) => item?.value),
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
              initialValues={initAdminZoneValues}
              validationSchema={validateAdminZoneSchema}
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
                      Zone Name{" "}
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
                      holder="Enter zone name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(formSubmitted || touched?.name) && errors?.name}
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Zone Description{" "}
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
                      holder="Enter zone description"
                      name="description"
                      value={values?.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.description) &&
                        errors?.description
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
                      Zone Capacity{" "}
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
                      type="number"
                      mb
                      holder="Enter a number"
                      name="capacity"
                      value={values?.capacity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.capacity) && errors?.capacity
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
                      Location{" "}
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
                        formSubmitted && !values?.location
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select location"
                      options={locationOptions}
                      name="location"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          location: selectedOption,
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
                    {formSubmitted && !values?.location && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Location is required
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
                      Minimum Duration (In Minutes){" "}
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
                      type="number"
                      mb
                      holder="Enter a number"
                      name="minimumDuration"
                      value={values?.minimumDuration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.minimumDuration) &&
                        errors?.minimumDuration
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
                      Service{" "}
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
                        formSubmitted && !values?.service
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select service"
                      options={serviceOptions}
                      name="service"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          service: selectedOption,
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
                    {formSubmitted && !values?.service && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Service is required
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
                      Assign Amenities{" "}
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
                      isMulti
                      styles={
                        formSubmitted && !values?.amenities?.length
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select amenities"
                      options={amenitiesOptions}
                      name="amenities"
                      onChange={(selectedOptions) =>
                        setValues({
                          ...values,
                          amenities: selectedOptions,
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
                    />

                    {formSubmitted && !values?.amenities?.length && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Select at least one amenity
                      </Text>
                    )}
                  </Box>
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Add Reservable Space
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          reservable: values?.reservable === 1 ? 0 : 1,
                        })
                      }
                      isChecked={values?.reservable}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                  {values?.reservable ? (
                    <Box w="full" mb={4} className="opt-input">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Enter Reservable Space
                      </Text>
                      <CustomInput
                        auth
                        type="number"
                        mb
                        holder="e.g 1-100"
                        name="reservableSpace"
                        value={values?.reservableSpace}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.reservableSpace &&
                          touched?.reservableSpace &&
                          errors?.reservableSpace
                        }
                      />
                    </Box>
                  ) : null}
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Billing Type
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          showBillingType: !values?.showBillingType,
                        })
                      }
                      isChecked={values?.showBillingType}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                  {values?.showBillingType ? (
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Select Billing Type
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select billing type"
                        options={billingOptions}
                        name="billingType"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            billingType: selectedOption,
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
                  ) : null}
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Select Status{" "}
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
                        formSubmitted && !values?.status
                          ? errorCustomStyles
                          : customStyles
                      }
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
                    {formSubmitted && !values?.status && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Status is required
                      </Text>
                    )}
                  </Box>
                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_EVENTS)}
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
