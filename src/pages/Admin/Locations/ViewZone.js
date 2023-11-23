import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  BillingTypes,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetAmenities } from "../../../services/admin/query/amenities";
import {
  useEditZone,
  useGetAdminZone,
  useGetLocations,
} from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";
import { IoIosArrowDown } from "react-icons/io";

export default function ViewZone() {
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditZone({
    onSuccess: () => {
      successToast("Zone updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ZONES);
      sessionStorage.removeItem("edit");
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
    label: location?.name,
    value: parseInt(location?.id),
  }));

  const serviceOptions = services?.data?.map((service) => ({
    label: service?.name,
    value: Number(service?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const billingOptions = BillingTypes?.map((type, index) => ({
    label: type,
    value: index,
  }));

  const amenitiesOptions = amenities?.data?.map((amenity) => ({
    label: amenity?.name,
    value: parseInt(amenity?.id),
  }));

  const { id } = useParams();
  const { mutate, data, isLoading } = useGetAdminZone();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const [values, setValues] = useState({
    name: "",
    description: "",
    capacity: "",
    location: "",
    minimumDuration: "",
    service: "",
    amenities: "",
    reservable: 0,
    reservableSpace: "",
    showBillingType: 0,
    billingType: "",
    status: "",
  });

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );
    const selectedLocationOption = locationOptions?.find(
      (option) => option?.value === Number(data?.location?.id)
    );
    const selectedServiceOption = serviceOptions?.find(
      (option) => option?.value === Number(data?.service?.id)
    );
    const selectedBillingOption = billingOptions?.find(
      (option) => option?.value === Number(data?.billingType)
    );

    const selectedAmenitiesOption = data?.amenities?.map((item) => ({
      value: Number(item?.id),
      label: item?.name,
    }));

    setValues({
      ...values,
      name: data?.name,
      description: data?.description,
      capacity: data?.capacity,
      location: selectedLocationOption,
      minimumDuration: data?.minimumDuration,
      service: selectedServiceOption,
      showBillingType: data?.billingType !== null ? 1 : 0,
      amenities: selectedAmenitiesOption,
      reservable: data?.reservable,
      reservableSpace: data?.reservableSpace,
      billingType: selectedBillingOption,
      status: selectedStatusOption,
    });
  }, [data, locations, services, amenities]);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
        description: values?.description,
        capacity: values?.capacity,
        location: values?.location?.value,
        minimumDuration: values?.minimumDuration,
        service: values?.service?.value,
        amenities: values?.amenities?.map((item) => Number(item?.value)),
        reservable: values?.reservable,
        reservableSpace: Number(values?.reservableSpace),
        billingType: values?.showBillingType
          ? values?.billingType?.value
          : null,
        status: values?.status?.value,
      },
    });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
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
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter zone name"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone Description
                  </Text>
                  <CustomInput
                    opt
                    auth
                    value={values?.description}
                    mb
                    holder="Enter zone description"
                    onChange={(e) =>
                      setValues({ ...values, description: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone Capacity
                  </Text>
                  <CustomInput
                    auth
                    value={values?.capacity}
                    mb
                    holder="Enter a number"
                    onChange={(e) =>
                      setValues({ ...values, capacity: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Location
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select location"
                    options={locationOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "location",
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
                    value={values?.location}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Minimum Duration (In Minutes)
                  </Text>
                  <CustomInput
                    auth
                    value={values?.minimumDuration}
                    mb
                    holder="Enter a number"
                    onChange={(e) =>
                      setValues({ ...values, minimumDuration: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Service
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select service"
                    options={serviceOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "service",
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
                    value={values?.service}
                    isDisabled={edit ? false : true}
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
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "amenities",
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
                    value={values?.amenities}
                    isDisabled={edit ? false : true}
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
                    Add Reservable Space
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        reservable: values?.reservable === 1 ? 0 : 1,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                    isChecked={values?.reservable}
                  />
                </Flex>

                {values?.reservable ? (
                  <Box w="full" mb={4} className="opt-input">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Enter Reservable Space
                    </Text>
                    <CustomInput
                      auth
                      value={values?.reservableSpace}
                      mb
                      holder="e.g 1-100"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          reservableSpace: e.target.value,
                        })
                      }
                      isDisabled={edit ? false : true}
                    />
                  </Box>
                ) : null}

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                  mt={4}
                >
                  <Text fontSize="12px" fontWeight={500} color="#444648">
                    Select Billing Type
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        showBillingType: values?.showBillingType ? 0 : 1,
                      })
                    }
                    isChecked={values?.showBillingType}
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                {values?.showBillingType ? (
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Billing Type
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select billing type"
                      options={billingOptions}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "billingType",
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
                      value={values?.billingType}
                      isDisabled={edit ? false : true}
                    />
                  </Box>
                ) : null}

                <Box w="full" mb={4}>
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
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
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
                    value={values?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_ZONES),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="adminPrimary"
                    w="100%"
                    isLoading={isUpdating}
                    onClick={() => (!edit ? setEdit(true) : handleSubmit())}
                  >
                    {!edit ? "Edit" : "Save"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
