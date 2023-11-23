import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  Image,
  Input,
  Spinner,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  allStates,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useGetAdministrators,
  useGetOperators,
} from "../../../services/admin/query/users";
import { useGetAmenities } from "../../../services/admin/query/amenities";
import { useAddLocation } from "../../../services/admin/query/locations";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import {
  initAdminLocationValues,
  validateAdminLocationSchema,
} from "../../../utils/validation";

export default function AddLocation() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddLocation({
    onSuccess: () => {
      successToast("Location added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_LOCATIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: managers } = useGetAdministrators({}, 1, 1000);
  const { data: amenities } = useGetAmenities({}, 1, 1000);

  const managerOptions = managers?.data?.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: parseInt(manager.id),
  }));

  const amenitiesOptions = amenities?.data?.map((amenity) => ({
    label: amenity.name,
    value: parseInt(amenity.id),
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    value: parseInt(operator.id),
    label: operator.name,
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const stateOptions = allStates.map((state) => ({
    label: state,
    value: state,
  }));

  const [fileType, setFileType] = useState("");
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

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadMutate({
      fileType: "picture",
      entityType: "client",
      file: formData.get("file"),
    });
  };

  const handleSubmit = (values = "") => {
    const {
      status,
      state,
      operator,
      locationType,
      amenities,
      managers,
      ...rest
    } = values;
    mutate({
      ...rest,
      status: status?.value,
      operator: operator?.value,
      state: state?.value,
      picture: profilePicData?.path,
      locationType: locationType?.value,
      amenities: amenities?.map((item) => item?.value),
      managers: managers?.map((item) => Number(item?.value)),
    });
  };

  const locationTypeOptions = [
    "RESTAURANT CAFE",
    "BAR LOUNGE NIGHTCLUB",
    "OFFICE BUILDING",
    "EVENT CENTER",
    "SPORTING CENTER",
    "HOTEL CONFERENCE CENTER",
    "HALL SHIPPING CENTER",
    "GARAGE PARKING LOT",
  ].map((type, index) => ({ label: type, value: index }));

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
            <Box alignSelf={"center"} w="full" mb={5}>
              <Text
                fontSize="10px"
                fontWeight={500}
                color="#444648"
                textAlign="center"
              >
                Location Image
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
              initialValues={initAdminLocationValues}
              validationSchema={validateAdminLocationSchema}
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
                      Location Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter Location name"
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
                      Location Description
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter location description"
                      name="description"
                      value={values?.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.description &&
                        touched?.description &&
                        errors?.description
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
                      GeoLocation
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter geolocation"
                      name="geoLocation"
                      value={values?.geoLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.geoLocation &&
                        touched?.geoLocation &&
                        errors?.geoLocation
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
                      Location Address
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter Location address"
                      name="address"
                      value={values?.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.address && touched?.address && errors?.address
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
                      State
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select state"
                      options={stateOptions}
                      name="state"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          state: selectedOption,
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
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Operator
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select operator"
                      options={operatorOptions}
                      name="operator"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          operator: selectedOption,
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
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Location Type
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select location type"
                      options={locationTypeOptions}
                      name="locationType"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          locationType: selectedOption,
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
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Assign Amenities
                    </Text>
                    <Select
                      isMulti
                      styles={customStyles}
                      placeholder="Select amenities"
                      options={amenitiesOptions}
                      name="amenities"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          amenities: selectedOption,
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
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Assign Manager
                    </Text>
                    <Select
                      isMulti
                      styles={customStyles}
                      options={managerOptions}
                      name="managers"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          managers: selectedOption,
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
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={4}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Enable Tips
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          enableTips: values?.enableTips ? 0 : 1,
                        })
                      }
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_LOCATIONS)}
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
                  </Flex>{" "}
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
