import React, { useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { BsFilter, BsSearch } from "react-icons/bs";
import Select from "react-select";
import { MdClose } from "react-icons/md";
import { searchOption, subFieldOption, subHeader } from "./constants";
import CustomInput from "./CustomInput";

const Filter = ({
  main,
  show,
  setFiltArray,
  setShow,
  filtArray,
  handleSearch,
  title,
  values,
  setValues,
}) => {
  const getLabelForValue = (value) => {
    const option = subFieldOption.find((option) => option.value === value);
    return option ? option.label : value;
  };
  const removeFilter = (indexToRemove) => {
    setFiltArray((prevFiltArray) =>
      prevFiltArray.filter((_, index) => index !== indexToRemove)
    );
  };
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
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

  const fieldOptions = subFieldOption?.map((field) => ({
    value: field.value,
    label: field.label,
  }));

  const searchOptions = searchOption?.map((search) => ({
    value: search?.value,
    label: search?.label,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption.value,
    });
  };

  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const resetValues = () => {
    setValues({
      title: "",
      type: "", 
      filter: "",
    });
    setSelectedTitle(null);
    setSelectedType(null);
  };

  return (
    <Box pos="relative" zIndex="3">
      <Flex
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: "20px", md: "unset" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        {title}
        <Flex align="center" gap="24px">
          {main}
          {/* <Button
            border="1px solid #d4d6d8"
            display="flex"
            py="10px"
            px="16px"
            bg="transparent"
            borderRadius="8px"
            onClick={() => setShow((prev) => !prev)}
            gap="16px"
            fontSize="12px"
          >
            <Text color="#646668">Filter</Text>
            {show ? (
              <MdClose fill="#646668" size="20px" />
            ) : (
              <BsFilter fill="#646668" size="20px" />
            )}
          </Button> */}
        </Flex>
      </Flex>

      {show && (
        <Flex mt="16px" align="center" gap="24px">
          <Box w="50%">
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
              }}
              placeholder="Select parameter"
            />
          </Box>
          {(selectedTitle !== "" || filtArray.length) && (
            <>
              <Box w="50%">
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
                <CustomInput
                  auth
                  add
                  onAdd={() => {
                    setFiltArray((prevFiltArray) => [...prevFiltArray, values]);
                    resetValues();
                  }}
                  mb
                  holder="Add search item"
                  value={values.filter}
                  onChange={(e) =>
                    setValues({ ...values, filter: e.target.value })
                  }
                />
              </Box>

              <Box w="full">
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
                          {dat?.type === "cont" ? "Contains" : "Equals"}
                        </span>
                        :
                      </Text>
                      <Text fontSize="12px" lineHeight="100%" color="#646668">
                        "{dat?.filter}"
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
            </>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Filter;
