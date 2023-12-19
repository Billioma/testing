import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  RateTypes,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetOperators } from "../../../services/admin/query/users";
import {
  useEditRate,
  useGetAdminRate,
  useGetZones,
} from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";
import { IoIosArrowDown } from "react-icons/io";

export default function AddZone() {
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditRate({
    onSuccess: () => {
      successToast("Rate updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_RATES);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);

  const { data: zones } = useGetZones({}, 1, 1000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: parseInt(zone?.id),
  }));

  const rateOptions = RateTypes?.map((rate, i) => ({
    value: i,
    label: rate,
  }));
  const operatorOptions = operators?.data?.map((operator) => ({
    label: operator?.name,
    value: parseInt(operator?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const carServiceOptions = [
    { label: "PREMIUM", value: "PREMIUM" },
    { label: "BASIC", value: "BASIC" },
  ];

  const serviceOptions = services?.data?.map((service) => ({
    label: service?.name,
    value: parseInt(service?.id),
  }));

  const { id } = useParams();
  const { mutate, isLoading, data } = useGetAdminRate();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const [values, setValues] = useState({
    name: "",
    operator: "",
    service: "",
    rateType: "",
    amount: "",
    noLimit: 0,
    durationStart: "",
    durationLimit: "",
    flatRate: 0,
    showCarServiceType: 0,
    carServiceType: "",
    status: "",
    zones: "",
  });

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );
    const selectedServiceOption = serviceOptions?.find(
      (option) => option?.value === Number(data?.service?.id)
    );
    const selectedOperatorOption = operatorOptions?.find(
      (option) => option?.value === Number(data?.operator?.id)
    );
    const selectedRateTypeOption = rateOptions?.find(
      (option) => option?.value === Number(data?.rateType)
    );
    const selectedCarServiceOption = carServiceOptions?.find(
      (option) => option?.value === data?.carServiceType
    );
    const selectedZonesOption = data?.zones?.map((item) => ({
      value: Number(item?.id),
      label: item?.name,
    }));
    setValues({
      ...values,
      name: data?.name,
      operator: selectedOperatorOption,
      service: selectedServiceOption,
      rateType: selectedRateTypeOption,
      amount: data?.amount,
      noLimit: data?.noLimit,
      durationStart: data?.durationStart,
      durationLimit: data?.durationLimit,
      flatRate: data?.flatRate,
      showCarServiceType: data?.carServiceType !== null ? 1 : 0,
      carServiceType: selectedCarServiceOption,
      status: selectedStatusOption,
      zones: selectedZonesOption,
    });
  }, [data, services, operators, zones]);

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
        operator: values?.operator?.value,
        service: values?.service?.value,
        rateType: values?.rateType?.value,
        amount: values?.amount,
        noLimit: values?.noLimit,
        durationStart: values?.durationStart,
        durationLimit: values?.durationLimit,
        flatRate: values?.flatRate,
        carServiceType: values?.showCarServiceType
          ? values?.carServiceType?.value
          : null,
        status: values?.status?.value,
        zones: values?.zones?.map((item) => Number(item?.value)),
      },
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
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Rate Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter rate name"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Operator
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select operator"
                    options={operatorOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "operator",
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
                    value={values?.operator}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
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
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Rate Type
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select rate type"
                    options={rateOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "rateType",
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
                    value={values?.rateType}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Amount
                  </Text>
                  <CustomInput
                    auth
                    value={values?.amount}
                    type="number"
                    mb
                    holder="Enter amount"
                    onChange={(e) =>
                      setValues({ ...values, amount: e.target.value })
                    }
                    dis={edit ? false : true}
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
                    Add Limit
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        noLimit: !values?.noLimit,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                    isChecked={values?.noLimit}
                  />
                </Flex>

                {values?.noLimit ? (
                  <Flex flexDir={"row"} gap={4}>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Duration Start (Minutes)
                      </Text>
                      <CustomInput
                        auth
                        value={values?.durationStart}
                        type="number"
                        mb
                        holder="Enter duration start"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            durationStart: e.target.value,
                          })
                        }
                        dis={edit ? false : true}
                      />
                    </Box>
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Duration Limit (Minutes)
                      </Text>
                      <CustomInput
                        auth
                        value={values?.durationLimit}
                        mb
                        type="number"
                        holder="Enter duration limit"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            durationLimit: e.target.value,
                          })
                        }
                        dis={edit ? false : true}
                      />
                    </Box>
                  </Flex>
                ) : null}

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                  mt={4}
                >
                  <Text fontSize="12px" fontWeight={500} color="#444648">
                    Flat Rate
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        flatRate: values?.flatRate === 1 ? 0 : 1,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                    isChecked={values?.flatRate}
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                  mt={2}
                >
                  <Text fontSize="12px" fontWeight={500} color="#444648">
                    Select Car Service Type
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        showCarServiceType: !values?.showCarServiceType,
                      })
                    }
                    isChecked={values?.showCarServiceType}
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                {values?.showCarServiceType ? (
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Car Service Type
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select Car Service type"
                      options={carServiceOptions}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "carServiceType",
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
                      value={values?.carServiceType}
                      isDisabled={edit ? false : true}
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
                    Select Zones
                  </Text>
                  <Select
                    isMulti
                    styles={customStyles}
                    placeholder="Select Zones"
                    options={zoneOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "zones",
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
                    value={values?.zones}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
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
                        : (navigate(PRIVATE_PATHS.ADMIN_RATES),
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
