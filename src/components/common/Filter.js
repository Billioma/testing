import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsFilter, BsSearch } from "react-icons/bs";
import Select from "react-select";
import { MdClose } from "react-icons/md";
import AdminCustomInput from "./AdminCustomInput";
import DatePicker from "react-multi-date-picker";
import { searchOption, newStatusType, leaveStatusType } from "./constants";
import { formatDate } from "../../utils/helpers";

const Filter = ({
  main,
  setFiltArray,
  alt,
  filtArray,
  gap,
  fieldToCompare,
  title,
}) => {
  const [values, setValues] = useState({
    title: "",
    type: "",
    dropFilter: "",
    gte: "",
    gteType: "",
    lteType: "",
    lte: "",
    filter: "",
  });

  const searchOptions = searchOption.map((search) => ({
    value: search?.value,
    label: search?.label,
  }));

  const resetValues = () => {
    setValues({ ...values, type: "", filter: "", gte: "", lte: "" });
    setSelectedType(null);
    setSelectedFilter(null);
  };
  const resetAllValues = () => {
    setValues({
      title: "",
      type: "",
      dropFilter: "",
      gte: "",
      gteType: "",
      lteType: "",
      lte: "",
      filter: "",
    });
    setSelectedTitle(null);
    setSelectedType(null);
    setSelectedFilter(null);
  };

  const handleClick = () => {
    const existingGteIndex = filtArray.findIndex(
      (filter) =>
        filter.gteType === "gte" && filter.dropFilter === values?.dropFilter,
    );
    const existingLteIndex = filtArray.findIndex(
      (filter) =>
        filter.lteType === "lte" && filter.dropFilter === values?.dropFilter,
    );

    if (values.gte !== "") {
      if (existingGteIndex !== -1) {
        setFiltArray((prevFiltArray) => [
          ...prevFiltArray.slice(0, existingGteIndex),
          {
            dropFilter: values?.dropFilter,
            title: values?.title,
            gteType: "gte",
            gte: values.gte,
          },
          ...prevFiltArray.slice(existingGteIndex + 1),
        ]);
      } else {
        setFiltArray((prevFiltArray) => [
          ...prevFiltArray,
          {
            dropFilter: values?.dropFilter,
            title: values?.title,
            gteType: "gte",
            gte: values.gte,
          },
        ]);
      }
    }

    if (values.lte !== "") {
      if (existingLteIndex !== -1) {
        setFiltArray((prevFiltArray) => [
          ...prevFiltArray.slice(0, existingLteIndex),
          {
            dropFilter: "Created At",
            title: "createdAt",
            lteType: "lte",
            lte: values.lte,
          },
          ...prevFiltArray.slice(existingLteIndex + 1),
        ]);
      } else {
        setFiltArray((prevFiltArray) => [
          ...prevFiltArray,
          {
            dropFilter: "Created At",
            title: "createdAt",
            lteType: "lte",
            lte: values.lte,
          },
        ]);
      }
    }

    resetValues();
  };

  const leaveStatusOptions = leaveStatusType?.map((status) => ({
    value: status?.value,
    label: status?.name,
  }));

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
      prevFiltArray?.filter((_, index) => index !== indexToRemove),
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };

  const customOptStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "none",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
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

  return (
    <Box pos="relative" zIndex="3" py={3} px={{ base: 0, md: 5 }}>
      <Flex
        align={{ base: "flex-start", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "20px", md: "unset" }}
        justifyContent="space-between"
        w="full"
      >
        {title}
        <Flex flexWrap="wrap" gap={gap ? "15px" : "24px"}>
          {main}
          <Button
            border="1px solid #d4d6d8"
            py="10px"
            display={alt ? "none" : "flex"}
            px="16px"
            bg="transparent"
            borderRadius="8px"
            onClick={() =>
              show
                ? (setShow(false), resetAllValues(), setFiltArray([]))
                : setShow(true)
            }
            gap="16px"
            fontSize="14px"
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
              fontSize="14px"
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
              {values?.title === "createdAt" ||
              values?.title?.includes("Date") ? (
                ""
              ) : (
                <Box w={{ base: "100%", md: "50%" }}>
                  <Text
                    fontSize="14px"
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
              )}

              {values?.title === "createdAt" ||
              values?.title?.includes("Date") ? (
                <>
                  <Box w={{ base: "100%", md: "50%" }}>
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      lineHeight="100%"
                      mb="8px"
                      color="#646668"
                    >
                      From: yyyy/mm/dd
                    </Text>
                    <Flex
                      align="center"
                      w="full"
                      border="1px solid #d4d6d8"
                      borderLeft="0"
                      borderRadius="4px"
                      h="44px"
                    >
                      <Box className="new_class" w="full">
                        <DatePicker
                          placeholder="Select Date"
                          value={values?.gte}
                          onChange={(date) => {
                            setValues({ ...values, gte: date, gteType: "gte" });
                          }}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  <Box w={{ base: "100%", md: "50%" }}>
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      lineHeight="100%"
                      mb="8px"
                      color="#646668"
                    >
                      To: yyyy/mm/dd
                    </Text>
                    <Flex
                      align="center"
                      w="full"
                      border="1px solid #d4d6d8"
                      borderLeft="0"
                      borderRadius="4px"
                      h="44px"
                    >
                      <Box className="new_class" w="full">
                        <DatePicker
                          placeholder="Select Date"
                          value={values?.lte}
                          onChange={(date) => {
                            setValues({ ...values, lte: date, lteType: "lte" });
                          }}
                        />
                      </Box>
                      <Flex
                        justifyContent="center"
                        align="center"
                        h="44px"
                        cursor="pointer"
                        onClick={() => handleClick()}
                        w="10%"
                      >
                        <BsSearch fill="#646668" size="15px" />
                      </Flex>
                    </Flex>
                  </Box>{" "}
                </>
              ) : (
                ""
              )}

              {values?.title === "createdAt" ||
              values?.title?.includes("Date") ? (
                ""
              ) : (
                <>
                  <Box w="full">
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      lineHeight="100%"
                      mb="8px"
                      color="#646668"
                    >
                      Search In
                    </Text>

                    {values?.dropFilter?.includes("Type") ||
                    values?.dropFilter === "Status" ||
                    values?.dropFilter === "Request Status" ||
                    values?.dropFilter === "Leave Status" ? (
                      <Flex
                        width="100%"
                        color="#646668"
                        cursor={
                          values?.filter === "" || values?.dropFilter === ""
                            ? ""
                            : "pointer"
                        }
                        align="center"
                        borderRadius="4px"
                        border={values?.filter ? "none" : "1px solid #D4D6D8"}
                        background={values?.filter ? "#F4F6F8" : "unset"}
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
                              values?.dropFilter === "Leave Status" ||
                              values?.dropFilter === "Request Status"
                                ? leaveStatusOptions
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
                            if (
                              values.filter !== "" &&
                              values.dropFilter !== ""
                            ) {
                              const existingIndex = filtArray.findIndex(
                                (filter) =>
                                  filter.title === values.title &&
                                  filter.dropFilter === values.dropFilter,
                              );

                              if (existingIndex !== -1) {
                                setFiltArray((prevFiltArray) => [
                                  ...prevFiltArray.slice(0, existingIndex),
                                  values,
                                  ...prevFiltArray.slice(existingIndex + 1),
                                ]);
                              } else {
                                setFiltArray((prevFiltArray) => [
                                  ...prevFiltArray,
                                  values,
                                ]);
                              }

                              resetValues();
                            }
                          }}
                          w="10%"
                        >
                          <BsSearch fill="#646668" size="15px" />
                        </Flex>
                      </Flex>
                    ) : (
                      <AdminCustomInput
                        auth
                        add
                        onAdd={() => {
                          const existingIndex = filtArray.findIndex(
                            (filter) =>
                              filter.title === values.title &&
                              filter.dropFilter === values.dropFilter,
                          );

                          if (existingIndex !== -1) {
                            setFiltArray((prevFiltArray) => [
                              ...prevFiltArray.slice(0, existingIndex),
                              values,
                              ...prevFiltArray.slice(existingIndex + 1),
                            ]);
                          } else {
                            setFiltArray((prevFiltArray) => [
                              ...prevFiltArray,
                              values,
                            ]);
                          }

                          resetValues();
                        }}
                        mb
                        values={values}
                        holder="Add search item"
                        value={values?.filter}
                        onChange={(e) =>
                          setValues({ ...values, filter: e.target.value })
                        }
                      />
                    )}
                  </Box>
                </>
              )}
            </>
          )}
        </Flex>
      )}

      {filtArray?.length ? (
        <Box w="fit-content" mt="15px">
          <Text
            fontSize="14px"
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
            flexWrap="wrap"
            w="full"
            gap="8px"
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
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="100%"
                  color="#646668"
                >
                  {getLabelForValue(dat?.title)}{" "}
                  <span
                    style={{
                      color: "#086375",
                      textDecoration: "underline",
                    }}
                  >
                    {dat?.gte
                      ? "From"
                      : dat?.lte
                        ? "To"
                        : dat?.type === "eq"
                          ? "Equals"
                          : "Contains"}
                  </span>
                  :
                </Text>
                <Text fontSize="14px" lineHeight="100%" color="#646668">
                  "
                  {dat?.gteType
                    ? formatDate(dat?.gte)
                    : dat?.lteType
                      ? formatDate(dat?.lte)
                      : dat?.dropFilter === "Leave Status" ||
                          dat?.dropFilter === "Request Status"
                        ? leaveStatusType?.find(
                            (item) => item.value === dat?.filter,
                          ).name
                        : dat?.title === "status"
                          ? newStatusType?.find((item, i) => i === dat?.filter)
                          : dat?.filter && !dat?.gte && !dat?.lte
                            ? dat?.filter
                            : dat?.filter && dat?.filter}
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
          </Flex>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Filter;
