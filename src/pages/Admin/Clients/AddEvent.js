import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  Spinner,
  Input,
  Image,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  errorCustomStyles,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useAddClientEvent,
  useGetClients,
} from "../../../services/admin/query/clients";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import {
  initEventValues,
  validateEventSchema,
} from "../../../utils/validation";
import { useGetZones } from "../../../services/admin/query/locations";

export default function AddEvent() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddClientEvent({
    onSuccess: () => {
      successToast("Event added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_EVENTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: zones } = useGetZones({}, 1, 1000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: parseInt(zone?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const {
    mutate: uploadMutate,
    isLoading: isUploading,
    data: profilePicData,
  } = useCustomerUploadPic({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const [fileType, setFileType] = useState("");

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadMutate({
      fileType: "image",
      entityType: "admin",
      file: formData.get("file"),
    });
  };

  const { data: clients } = useGetClients({}, 1, 10000);

  const clientOptions = clients?.data?.map((client) => ({
    label: client?.name,
    value: parseInt(client.id),
  }));

  const handleSubmit = (values = "") => {
    const { status, price, client, zones, ...rest } = values;
    values?.paymentRequired
      ? mutate({
          ...rest,
          status: status?.value,
          price: Number(price),
          client: Number(client?.value),
          image: profilePicData?.path,
          zones: zones?.map((item) => Number(item?.value)),
        })
      : mutate({
          ...rest,
          status: status?.value,
          client: Number(client?.value),
          image: profilePicData?.path,
          zones: zones?.map((item) => Number(item?.value)),
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
            <Box alignSelf={"center"} mb={5}>
              <Text
                fontSize="12px"
                fontWeight={500}
                color="#444648"
                textAlign="center"
              >
                Event Image
              </Text>
              <Input
                id="image_upload"
                onChange={handleUpload}
                type="file"
                display="none"
              />
              <label htmlFor="image_upload">
                <Flex
                  flexDir="column"
                  cursor="pointer"
                  justifyContent="center"
                  align="center"
                  w="full"
                >
                  {isUploading ? (
                    <Spinner />
                  ) : (
                    <Image
                      rounded="full"
                      objectFit="cover"
                      w="120px"
                      border={fileType ? "4px solid #0D0718" : ""}
                      h="120px"
                      borderRadius="12px"
                      src={fileType || "/assets/prof-avatar.jpg"}
                    />
                  )}
                </Flex>
              </label>
            </Box>

            <Formik
              onSubmit={handleSubmit}
              initialValues={initEventValues}
              validationSchema={validateEventSchema}
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
                      Event Name{" "}
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
                      holder="Enter event name"
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
                      Event Description{" "}
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
                      holder="Describe event"
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
                      Event Address{" "}
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
                      holder="Enter event address"
                      name="address"
                      value={values?.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.address) && errors?.address
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
                      Event Website
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter event website"
                      name="website"
                      value={values?.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.website) && errors?.website
                      }
                    />
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Event Start Date & Time{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <DateTimePicker
                      selectedDate={values?.eventStartDateTime}
                      onChange={(date) => {
                        setValues({ ...values, eventStartDateTime: date });
                      }}
                      hasTime
                    />

                    {formSubmitted && !values?.eventStartDateTime && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Start Date is required
                      </Text>
                    )}
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Event End Date & Time{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <DateTimePicker
                      selectedDate={values?.eventEndDateTime}
                      onChange={(date) => {
                        setValues({ ...values, eventEndDateTime: date });
                      }}
                      hasTime
                    />

                    {formSubmitted && !values?.eventEndDateTime && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        End Date is required
                      </Text>
                    )}
                  </Box>

                  {values?.eventEndDateTime < values?.eventStartDateTime && (
                    <Text
                      mt={-3}
                      fontSize="15px"
                      mb={4}
                      color="tomato"
                      fontWeight={500}
                    >
                      Event's end date is before its start date
                    </Text>
                  )}
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Client{" "}
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
                        formSubmitted && !values?.client
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select client"
                      options={clientOptions}
                      name="client"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          client: selectedOption,
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

                    {formSubmitted && !values?.client && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Client is required
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
                      Assign Zones{" "}
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
                        formSubmitted && !values?.zones?.length
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select zone"
                      options={zoneOptions}
                      name="zones"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          zones: selectedOption,
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

                    {formSubmitted && !values?.zones?.length && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Select at least one zone
                      </Text>
                    )}
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Event Status{" "}
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

                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Add Event Price
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          paymentRequired: values?.paymentRequired ? 0 : 1,
                        })
                      }
                      value={values?.paymentRequired}
                      isChecked={values?.paymentRequired ? true : false}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>

                  {values?.paymentRequired ? (
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Event Price
                      </Text>
                      <CustomInput
                        auth
                        mb
                        holder="Enter event price"
                        name="price"
                        value={values?.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          (formSubmitted || touched?.paymentRequired) &&
                          errors?.paymentRequired
                        }
                      />
                    </Box>
                  ) : null}

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
