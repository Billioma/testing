import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Spinner, Switch } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import ConfirmDeleteModal from "../../../../components/modals/ConfirmDeleteModal";
import {
  useDeleteRate,
  useGetOpLocation,
  useGetRate,
  useUpdateRate,
} from "../../../../services/operator/query/locations";
import { useGetServices } from "../../../../services/customer/query/locations";
import {
  DurationTypes,
  RateTypes,
} from "../../../../components/common/constants";

const RateDetails = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    status: 1,
    service: "",
    durationType: "",
    durationStart: "",
    durationLimit: "",
    noLimit: "",
    rateType: "",
    amount: "",
    zones: "",
  });
  const isEdit = sessionStorage.getItem("edit");
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetRate();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { data: services } = useGetServices();
  const { data: locations } = useGetOpLocation();

  const serviceOptions = services?.map((service) => ({
    value: service?.id,
    label: service?.name,
  }));

  const durationOptions = DurationTypes?.map((duration) => ({
    value: duration,
    label: duration,
  }));

  const zoneOptions = locations?.data?.reduce((acc, location) => {
    const zones =
      location?.zones?.map((zone) => ({
        value: zone?.id,
        label: zone?.name,
      })) || [];
    return acc.concat(zones);
  }, []);

  const rateOptions = RateTypes?.map((rate, i) => ({
    value: i,
    label: rate,
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
    option: (provided, service) => ({
      ...provided,
      color: service.isFocused ? "" : "",
      backgroundColor: service.isFocused ? "#d4d6d8" : "",
    }),
  };

  const [limit, setLimit] = useState(false);

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
    const selectedDurationOption = durationOptions?.find(
      (option) => option.label === data?.durationType
    );
    const selectedRateOption = rateOptions?.find(
      (option, i) => i === data?.rateType
    );
    const selectedZoneOption = zoneOptions?.filter((option) =>
      data?.zones?.some((target) => target?.id === option.value)
    );

    setValues({
      ...values,
      name: data?.name,
      service: selectedServiceOption,
      rateType: selectedRateOption,
      amount: data?.amount,
      durationStart: data?.durationStart,
      durationType: selectedDurationOption,
      durationLimit: data?.durationLimit,
      zones: selectedZoneOption,
    });
    setLimit(data?.noLimit === 0 ? false : data?.noLimit === 1 && true);
  }, [data, edit]);

  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } = useUpdateRate({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/rates");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const [showDelete, setShowDelete] = useState(false);
  const { mutate: deleteMutate, isLoading: isDeleting } = useDeleteRate({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/rates");
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
    limit
      ? updateMutate({
          query: id,
          body: {
            name: values.name,
            zones: values?.zones?.map((item) => Number(item?.value)),
            service: Number(values?.service?.value),
            rateType: Number(values?.rateType?.value),
            amount: Number(values.amount),
            durationLimit: Number(values.durationLimit),
            durationStart: Number(values.durationStart),
            durationType: values.durationType?.value,
            status: 1,
            noLimit: 1,
          },
        })
      : updateMutate({
          query: id,
          body: {
            name: values.name,
            zones: values?.zones?.map((item) => Number(item?.value)),
            service: Number(values?.service?.value),
            rateType: Number(values?.rateType?.value),
            amount: Number(values.amount),
            status: 1,
            noLimit: 0,
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
                      Name
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
                      Select Service
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

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Select Rate Type
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
                      options={rateOptions}
                      value={values.rateType}
                      defaultValue={values.rateType}
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
                          name: "rateType",
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
                      Enter Amount
                    </Text>
                    <CustomInput
                      auth
                      mb
                      type="number"
                      isDisabled={edit ? false : true}
                      value={values.amount}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          amount: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Flex align="center" justifyContent="space-between" w="full">
                    <Text fontSize="12px" color="#646668" lineHeight="100%">
                      Add Limit
                    </Text>

                    <Switch
                      size="sm"
                      isChecked={limit ? true : false}
                      value={limit}
                      onChange={() => setLimit((prev) => !prev)}
                    />
                  </Flex>

                  {limit && (
                    <Box>
                      <Box my="16px">
                        <Text
                          color="#444648"
                          fontSize="10px"
                          fontWeight={500}
                          mb="8px"
                          lineHeight="100%"
                        >
                          Select Duration Type
                        </Text>
                        <Select
                          styles={customStyles}
                          isDisabled={edit ? false : true}
                          options={durationOptions}
                          value={values.durationType}
                          defaultValue={values.durationType}
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
                              name: "durationType",
                            })
                          }
                        />
                      </Box>
                      <Flex align="center" gap="16px">
                        <Box>
                          <Text
                            color="#444648"
                            fontSize="10px"
                            fontWeight={500}
                            mb="8px"
                            lineHeight="100%"
                          >
                            Duration Start (Minutes)
                          </Text>
                          <CustomInput
                            auth
                            mb
                            isDisabled={edit ? false : true}
                            value={values.durationStart}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                durationStart: e.target.value,
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
                            Duration Limit (Minutes)
                          </Text>
                          <CustomInput
                            auth
                            mb
                            isDisabled={edit ? false : true}
                            value={values.durationLimit}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                durationLimit: e.target.value,
                              })
                            }
                          />
                        </Box>
                      </Flex>
                    </Box>
                  )}

                  <Box mt="16px">
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Zones
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
                      isMulti
                      value={values.zones}
                      options={zoneOptions}
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
                          name: "zones",
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
        title="Rate"
        action={handleDelete}
        isLoading={isDeleting}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default RateDetails;
