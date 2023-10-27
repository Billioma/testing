import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsFilter, BsSearch } from "react-icons/bs";
import Select from "react-select";
import { MdAdd, MdClose } from "react-icons/md";
import CustomInput from "./CustomInput";
import {
  PaymentMethods,
  TransactionTypes,
  IntervalType,
  searchOption,
  accountType,
  allStates,
  DurationTypes,
  LocationTypes,
} from "./constants";

const Filter = ({
  main,
  setFiltArray,
  filtArray,
  gap,
  fieldToCompare,
  handleSearch,
  title,
}) => {
  const [values, setValues] = useState({
    title: "",
    type: "",
    dropFilter: "",
    filter: "",
  });
  const searchOptions = searchOption.map((search) => ({
    value: search?.value,
    label: search?.label,
  }));
  const durationOptions = DurationTypes.map((duration) => ({
    value: duration,
    label: duration,
  }));
  const locationOptions = LocationTypes.map((location, i) => ({
    value: i,
    label: location,
  }));
  const intervalOptions = IntervalType.map((time, i) => ({
    value: i,
    label: time,
  }));
  const stateOptions = allStates.map((state) => ({
    value: state,
    label: state,
  }));
  const accountOptions = accountType.map((account) => ({
    value: account,
    label: account,
  }));

  const payOptions = PaymentMethods.map((payment, i) => ({
    value: i,
    label: payment,
  }));

  const transactionOptions = TransactionTypes.map((transaction, i) => ({
    value: i,
    label: transaction,
  }));

  const yesNoOptions = ["No", "Yes"].map((opt, i) => ({
    value: i,
    label: opt,
  }));

  const booleanOptions = ["FALSE", "TRUE"].map((opt, i) => ({
    value: i,
    label: opt,
  }));

  const statusOptions = ["Inactive", "Active"].map((opt, i) => ({
    value: i,
    label: opt,
  }));

  const servicesOptions = ["VALET", "PARKING", "SERVICE", "OTHERS"].map(
    (opt, i) => ({ value: opt, label: opt })
  );

  const featureTypesOptions = [
    "Vehicle Limit",
    "Parking Limit",
    "Valet Limit",
    "Location Limit",
    "Car Service Limit",
    "Applicable Locations",
    "User Limit",
  ].map((opt, i) => ({ value: i, label: opt }));

  const [show, setShow] = useState(false);

  const fieldOptions = fieldToCompare?.map((field) => ({
    value: field.value,
    label: field.label,
  }));

  const getLabelForValue = (value) => {
    const option = fieldToCompare?.find((option) => option?.value === value);
    return option ? option.label : value;
  };
  const removeFilter = (indexToRemove) => {
    setFiltArray((prevFiltArray) =>
      prevFiltArray?.filter((_, index) => index !== indexToRemove)
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "12px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #D4D6D8",
      background: state.selectProps.menuIsOpen
        ? "unset"
        : state.hasValue
        ? "#F4F6F8"
        : "unset",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 500,
      lineHeight: "100%",
      fontSize: "12px",
      color: "#646668",
    }),
  };

  const customOptStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      border: "none",
      background: state.selectProps.menuIsOpen
        ? "unset"
        : state.hasValue
        ? "#F4F6F8"
        : "unset",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 500,
      lineHeight: "100%",
      fontSize: "12px",
      color: "#646668",
    }),
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption.value,
    });
  };

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const resetValues = () => {
    setValues({
      title: "",
      type: "",
      filter: "",
    });
    setSelectedTitle(null);
    setSelectedType(null);
    setSelectedFilter(null);
  };

  return (
    <Box pos="relative" zIndex="3" py={3} px={5}>
      <Flex
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: "20px", md: "unset" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        {title}
        <Flex align="center" gap={gap ? "15px" : "24px"}>
          {main}
          <Button
            border="1px solid #d4d6d8"
            display="flex"
            py="10px"
            px="16px"
            bg="transparent"
            borderRadius="8px"
            onClick={() =>
              show
                ? (setShow(false), resetValues(), setFiltArray([]))
                : setShow(true)
            }
            gap="16px"
            fontSize="12px"
          >
            <Text color="#646668">Filter</Text>
            {show ? (
              <MdClose fill="#646668" size="20px" />
            ) : (
              <BsFilter fill="#646668" size="20px" />
            )}
          </Button>
        </Flex>
      </Flex>

      {show && (
        <Flex
          mt="16px"
          flexDir={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          gap="24px"
        >
          <Box w={{ base: "100%", md: "50%" }}>
            <Text
              fontSize="12px"
              fontWeight={500}
              lineHeight="100%"
              mb="8px"
              color="#646668"
            >
              Field/Column
            </Text>
            <Select
              styles={customStyles}
              components={{
                IndicatorSeparator: () => (
                  <div style={{ display: "none" }}></div>
                ),
              }}
              options={fieldOptions}
              value={selectedTitle}
              onChange={(selectedOption) => {
                setSelectedTitle(selectedOption);
                handleSelectChange(selectedOption, { name: "title" });
                setValues({
                  ...values,
                  title: selectedOption.value,
                  dropFilter: selectedOption.label,
                });
              }}
              placeholder="Select parameter"
            />
          </Box>
          {(selectedTitle !== "" || filtArray.length) && (
            <>
              <Box w={{ base: "100%", md: "50%" }}>
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight="100%"
                  mb="8px"
                  color="#646668"
                >
                  Search Condition
                </Text>
                <Select
                  styles={customStyles}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                  options={searchOptions}
                  value={selectedType}
                  onChange={(selectedOption) => {
                    setSelectedType(selectedOption);
                    handleSelectChange(selectedOption, { name: "type" });
                  }}
                  placeholder="Contains"
                />
              </Box>

              <Box w="full">
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight="100%"
                  mb="8px"
                  color="#646668"
                >
                  Search in
                </Text>

                {values?.dropFilter?.includes("Type") ||
                values?.dropFilter === "Duration" ||
                values?.dropFilter === "Reservable" ||
                values?.dropFilter === "Corporate" ||
                values?.dropFilter === "Upgradeable" ||
                values?.dropFilter === "Status" ||
                values?.dropFilter?.includes("State") ||
                values?.dropFilter?.includes("Duration Type") ||
                values?.dropFilter?.includes("Account Type") ? (
                  <Flex
                    width="100%"
                    color="#646668"
                    cursor="pointer"
                    align="center"
                    borderRadius="4px"
                    border="1px solid #D4D6D8"
                    background={values.filter ? "#F4F6F8" : "unset"}
                  >
                    <Box w="full">
                      <Select
                        styles={customOptStyles}
                        components={{
                          IndicatorSeparator: () => (
                            <div style={{ display: "none" }}></div>
                          ),
                          DropdownIndicator: () => <div></div>,
                        }}
                        options={
                          values.dropFilter === "Payment Type"
                            ? payOptions
                            : values.dropFilter === "Transaction Type"
                            ? transactionOptions
                            : values.dropFilter === "Reservable"
                            ? yesNoOptions
                            : values.dropFilter === "Duration"
                            ? intervalOptions
                            : values.dropFilter === "Account Type"
                            ? accountOptions
                            : values.dropFilter === "State"
                            ? stateOptions
                            : values.dropFilter === "Duration Type"
                            ? durationOptions
                            : values.dropFilter === "Location Type"
                            ? locationOptions
                            : values.dropFilter === "Service Type"
                            ? servicesOptions
                            : values.dropFilter === "Feature Type"
                            ? featureTypesOptions
                            : values.dropFilter === "Corporate" ||
                              values.dropFilter === "Upgradeable"
                            ? booleanOptions
                            : values.dropFilter === "Status"
                            ? statusOptions
                            : searchOptions
                        }
                        value={selectedFilter}
                        onChange={(selectedOption) => {
                          setSelectedFilter(selectedOption);
                          handleSelectChange(selectedOption, {
                            name: "filter",
                          });
                        }}
                        placeholder="Select"
                      />
                    </Box>
                    <Flex
                      justifyContent="center"
                      align="center"
                      h="44px"
                      onClick={() => {
                        setFiltArray((prevFiltArray) => [
                          ...prevFiltArray,
                          values,
                        ]);
                        resetValues();
                      }}
                      w="15%"
                    >
                      <MdAdd />
                    </Flex>
                  </Flex>
                ) : (
                  <CustomInput
                    auth
                    add
                    onAdd={() => {
                      setFiltArray((prevFiltArray) => [
                        ...prevFiltArray,
                        values,
                      ]);
                      resetValues();
                    }}
                    mb
                    holder="Add search item"
                    value={values.filter}
                    onChange={(e) =>
                      setValues({ ...values, filter: e.target.value })
                    }
                  />
                )}
              </Box>
            </>
          )}
        </Flex>
      )}

      {filtArray?.length ? (
        <Box w="fit-content" mt="15px">
          <Text
            fontSize="12px"
            mb="8px"
            fontWeight={500}
            lineHeight="100%"
            color="#646668"
          >
            Filters
          </Text>
          <Flex
            borderRadius="4px"
            bg="#f4f6f8"
            border="1px solid #d4d6d8"
            py="8px"
            justifyContent="space-between"
            w="full"
            gap="10px"
            align="center"
            px="16px"
          >
            {filtArray?.map((dat, i) => (
              <Flex
                key={i}
                borderRadius="2px"
                align="center"
                gap="8px"
                bg="#d4d6d8"
                p="6px"
              >
                <Text
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight="100%"
                  color="#646668"
                >
                  {getLabelForValue(dat?.title)}{" "}
                  <span
                    style={{
                      color: "#EE383A",
                      textDecoration: "underline",
                    }}
                  >
                    {dat?.type === "eq" ? "Equals" : "Contains"}
                  </span>
                  :
                </Text>
                <Text fontSize="12px" lineHeight="100%" color="#646668">
                  "
                  {dat?.title === "paymentMethod"
                    ? PaymentMethods?.find((item, i) => i === dat?.filter)
                    : dat?.title === "transactionType"
                    ? TransactionTypes?.find((item, i) => i === dat?.filter)
                    : dat?.title === "reservable"
                    ? ["No", "Yes"]?.find((item, i) => i === dat?.filter)
                    : dat?.title === "locationType"
                    ? LocationTypes?.find((item, i) => i === dat?.filter)
                    : dat?.title.includes("interval")
                    ? IntervalType?.find((item, i) => i === dat?.filter)
                    : dat?.filter}
                  "
                </Text>

                <MdClose
                  cursor="pointer"
                  onClick={() => removeFilter(i)}
                  fill="#242628"
                  size="12px"
                />
              </Flex>
            ))}
            <BsSearch
              cursor="pointer"
              onClick={handleSearch}
              fill="#646668"
              size="20px"
            />
          </Flex>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Filter;
