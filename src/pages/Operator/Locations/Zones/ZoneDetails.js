import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Spinner, Switch } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import {
  LocationTypes,
  allStates,
} from "../../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import ConfirmDeleteModal from "../../../../components/modals/ConfirmDeleteModal";
import {
  useDeleteLocation,
  useGetAmenities,
  useGetZone,
  useUpdateLocation,
} from "../../../../services/operator/query/locations";

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
    status: 1,
    service: "",
    amenities: "",
  });
  const isEdit = sessionStorage.getItem("edit");
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetZone();
  const { data: amenities } = useGetAmenities();

  useEffect(() => {
    mutate({ id: id });
  }, []);

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

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const selectedStateOption = stateOptions?.find(
      (option) => option.label === data?.state
    );
    const selectedLocationOption = locationOptions?.find(
      (option) => option.value === data?.locationType
    );

    const selectedAmenitiesOption = data?.amenities?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));

    setValues({
      ...values,
      name: data?.name,
      desc: data?.description,
      geo: data?.geoLocation,
      address: data?.address,
      state: selectedStateOption,
      img: data?.picture,
      locationType: selectedLocationOption,
      amenities: selectedAmenitiesOption,
    });
  }, [data, edit]);

  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } = useUpdateLocation({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/all");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const [showDelete, setShowDelete] = useState(false);
  const { mutate: deleteMutate, isLoading: isDeleting } = useDeleteLocation({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/all");
      setShowDelete(false);
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleDelete = () => {
    deleteMutate(id);
  };

  const handleUpdate = () => {
    updateMutate({
      query: id,
      body: {
        address: values.address,
        amenities: values.amenities?.map((item) => item?.value),
        description: values?.desc,
        geoLocation: values.geo,
        locationType: values.locationType?.value,
        state: values.state?.value,
        status: 1,
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
      <Flex align="flex-start">
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
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Zone Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
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
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Zone Description
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
                      value={values.desc}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          desc: e.target.value,
                        })
                      }
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
                      Zone Capacity
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
                      value={values.geo}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          geo: e.target.value,
                        })
                      }
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
                      Select Location
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
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
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "state",
                        })
                      }
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
                      Minimum Duration In Minutes
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
                      value={values.address}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          address: e.target.value,
                        })
                      }
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
                      Service
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
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
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "locationType",
                        })
                      }
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

                  <Flex
                    my="16px"
                    align="center"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Text fontSize="12px" color="#646668" lineHeight="100%">
                      Add Reservable Space
                    </Text>

                    <Switch size="sm" />
                  </Flex>

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Reservable Space
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
                      value={values.geo}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          geo: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Flex
                    my="16px"
                    align="center"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Text fontSize="12px" color="#646668" lineHeight="100%">
                      Biling Type
                    </Text>

                    <Switch size="sm" />
                  </Flex>

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Billing Type
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
                    onClick={() =>
                      edit ? setEdit(false) : setShowDelete(true)
                    }
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    _focus={{ bg: "transparent" }}
                    px="26px"
                    py="17px"
                  >
                    {edit ? "Cancel" : "Delete"}
                  </Button>
                  <Button
                    color="#fff"
                    fontWeight={500}
                    lineHeight="100%"
                    isLoading={isUpdating}
                    w="full"
                    onClick={() => (!edit ? setEdit(true) : handleUpdate())}
                    fontSize="12px"
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

      <ConfirmDeleteModal
        title="Location"
        action={handleDelete}
        isLoading={isDeleting}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default ZoneDetails;
