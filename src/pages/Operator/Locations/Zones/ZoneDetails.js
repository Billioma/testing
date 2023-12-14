import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Spinner, Switch } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import {
  useGetAmenities,
  useGetOpLocation,
  useGetZone,
  useUpdateZone,
} from "../../../../services/operator/query/locations";
import { useGetServices } from "../../../../services/customer/query/locations";
import { statusType } from "../../../../components/common/constants";

const ZoneDetails = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    capacity: "",
    reservable: 0,
    reservableSpace: 0,
    geoLocation: "",
    minimumDuration: "",
    status: "",
    service: "",
    amenities: "",
  });
  const isEdit = sessionStorage.getItem("edit");
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetZone();
  const { data: amenities } = useGetAmenities();
  const { data: locations } = useGetOpLocation();

  useEffect(() => {
    mutate({ id: id });
  }, []);

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

  const [reservable, setReservable] = useState(false);

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const selectedServiceOption = serviceOptions?.find(
      (option) => option.label === data?.service?.name
    );
    const selectedLocationOption = locationOptions?.find(
      (option) => option.label === data?.location?.name
    );

    const selectedAmenitiesOption = data?.amenities?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));

    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );

    setValues({
      ...values,
      name: data?.name,
      description: data?.description,
      capacity: data?.capacity,
      geoLocation: data?.geoLocation,
      reservable:
        data?.reservable === 0 ? false : data?.reservable === 1 && true,
      reservableSpace: data?.reservableSpace,
      service: selectedServiceOption,
      location: selectedLocationOption,
      amenities: selectedAmenitiesOption,
      status: selectedStatusOption,
      minimumDuration: data?.minimumDuration,
    });
    setReservable(
      data?.reservable === 0 ? false : data?.reservable === 1 && true
    );
  }, [data, edit, services, locations, amenities]);

  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } = useUpdateZone({
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
  const handleUpdate = () => {
    reservable
      ? updateMutate({
          query: id,
          body: {
            name: values.name,
            description: values?.description,
            capacity: values.capacity,
            geoLocation: values.geoLocation,
            location: values.location?.value,
            minimumDuration: values.minimumDuration,
            service: values.service?.value,
            amenities: values.amenities?.map((item) => item?.value),
            status: values?.status?.value,
            reservable: 1,
            reservableSpace: values?.reservableSpace,
          },
        })
      : updateMutate({
          query: id,
          body: {
            name: values.name,
            description: values?.description,
            capacity: values.capacity,
            geoLocation: values.geoLocation,
            location: values.location?.value,
            minimumDuration: values.minimumDuration,
            service: values.service?.value,
            amenities: values.amenities?.map((item) => item?.value),
            status: values?.status?.value,
            reservable: 0,
          },
        });
  };

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  return (
    <Box minH="75vh">
      {" "}
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
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

        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
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
                      auth
                      mb
                      dis={edit ? false : true}
                      value={values.name}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          name: e.target.value,
                        })
                      }
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
                      auth
                      mb
                      dis={edit ? false : true}
                      value={values.description}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          description: e.target.value,
                        })
                      }
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
                      auth
                      mb
                      dis={edit ? false : true}
                      value={values.capacity}
                      type="number"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          capacity: e.target.value,
                        })
                      }
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
                      Geolocation
                    </Text>
                    <CustomInput
                      auth
                      mb
                      dis={edit ? false : true}
                      value={values.geoLocation}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          geoLocation: e.target.value,
                        })
                      }
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
                      isDisabled={edit ? false : true}
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
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "location",
                        })
                      }
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
                      Minimum Duration In Minutes
                    </Text>
                    <CustomInput
                      auth
                      mb
                      dis={edit ? false : true}
                      value={values.minimumDuration}
                      type="number"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          minimumDuration: e.target.value,
                        })
                      }
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
                      Service
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
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
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "service",
                        })
                      }
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
                      Amenities
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
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
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "amenities",
                        })
                      }
                    />
                  </Box>

                  <Flex align="center" justifyContent="space-between" w="full">
                    <Text fontSize="14px" color="#646668" lineHeight="100%">
                      Add Reservable Space
                    </Text>

                    <Switch
                      size="sm"
                      isChecked={reservable ? true : false}
                      value={reservable}
                      isDisabled={edit ? false : true}
                      onChange={() => setReservable((prev) => !prev)}
                    />
                  </Flex>

                  {reservable && (
                    <Box mt="16px">
                      <Text
                        color="#444648"
                        fontSize="12px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Reservable Space
                      </Text>
                      <CustomInput
                        auth
                        mb
                        dis={edit ? false : true}
                        value={values.reservableSpace}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            reservableSpace: e.target.value,
                          })
                        }
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
                      isDisabled={edit ? false : true}
                      value={values?.status}
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
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "status",
                        })
                      }
                    />
                  </Box>
                </Box>

                <Flex mt="24px" align="center" w="full" gap="24px">
                  {edit && (
                    <Button
                      bg="transparent"
                      w="70%"
                      border="1px solid #646668"
                      color="#646668"
                      fontWeight={500}
                      lineHeight="100%"
                      onClick={() => setEdit(false)}
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      _focus={{ bg: "transparent" }}
                      px="26px"
                      py="17px"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    color="#fff"
                    fontWeight={500}
                    lineHeight="100%"
                    isLoading={isUpdating}
                    w="full"
                    onClick={() => (!edit ? setEdit(true) : handleUpdate())}
                    fontSize="14px"
                    px="26px"
                    py="17px"
                  >
                    {edit ? "Save" : "Edit"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ZoneDetails;
