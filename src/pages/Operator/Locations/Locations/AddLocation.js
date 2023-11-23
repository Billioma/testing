import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import {
  LocationTypes,
  allStates,
  statusType,
} from "../../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useCustomerUploadPic } from "../../../../services/customer/query/user";
import useCustomToast from "../../../../utils/notifications";
import {
  useGetAmenities,
  useCreateLocation,
} from "../../../../services/operator/query/locations";
import { Form, Formik } from "formik";
import {
  initLocationValues,
  validateLocationSchema,
} from "../../../../utils/validation";

const AddLocation = () => {
  const navigate = useNavigate();
  const { data: amenities } = useGetAmenities();

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));

  const locationOptions = LocationTypes?.map((location, i) => ({
    value: i,
    label: location?.replace("_", " "),
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
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };


  const { errorToast, successToast } = useCustomToast();
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
  const { mutate: createMutate, isLoading: isCreating } = useCreateLocation({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/all");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const { locationType, status, state, amenities, ...rest } = values;
    createMutate({
      ...rest,
      amenities: amenities?.map((dat) => dat?.value),
      state: state?.value,
      locationType: locationType?.value,
      picture: profilePicData?.path,
      status: status?.value,
    });
  };

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
      entityType: "client",
      file: formData.get("file"),
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
            <Text
              fontSize="10px"
              fontWeight={500}
              lineHeight="100%"
              mb="8px"
              color="#444648"
            >
              Avatar
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

            <Box mt="24px" w="full">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initLocationValues}
                validationSchema={validateLocationSchema}
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
                        Location Name
                      </Text>
                      <CustomInput
                        name="name"
                        value={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.name && touched?.name && errors?.name}
                        holder="Enter Location Name"
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
                        Location Description
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

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Location Address
                      </Text>
                      <CustomInput
                        name="address"
                        value={values?.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          errors?.address && touched?.address && errors?.address
                        }
                        holder="Enter Address"
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
                        State
                      </Text>
                      <Select
                        styles={customStyles}
                        value={values.state}
                        options={stateOptions}
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
                        name="state"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            state: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
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
                        Location Type
                      </Text>
                      <Select
                        styles={customStyles}
                        options={locationOptions}
                        value={values.locationType}
                        defaultValue={values.locationType}
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
                        name="locationType"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            locationType: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
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
                        Amenities
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
                        isDisabled={
                          !isValid || !dirty || !values.amenities.length
                        }
                        fontSize="12px"
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

export default AddLocation;
