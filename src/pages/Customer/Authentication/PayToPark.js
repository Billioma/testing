import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Select from "react-select";
import { colorTypes } from "../../../components/common/constants";

const PayToPark = () => {
  const [step, setStep] = useState(1);

  const [values, setValues] = useState({
    phone: "",
    name: "",
    email: "",
    plate: "",
    make: "",
    model: "",
    color: "",
  });

  const isDisabled = Object.keys(values)
    .filter((key) => key !== "phone")
    .some((key) => !values[key]);

  const colorOptions = colorTypes.map((color) => ({
    value: color.color,
    label: color.label,
  }));

  const handleKeyPress = (e, limit) => {
    if (limit && e.target.value.length >= limit) {
      e.preventDefault();
    }
  };

  const ColorOptio = ({ data }) => (
    <Flex mt="-30px" gap="8px" align="center" h="40px">
      <Flex
        width="28px"
        height="20px"
        backgroundColor={data?.value}
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "44px",
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

  const [isMobile] = useMediaQuery("(max-width: 820px)");

  return (
    <Box w="full">
      {isMobile ? (
        <>
          <Image my="24px" src="/assets/park-logo.jpg" w="134px" h="28px" />

          <Flex align="center" justifyContent="space-between" w="full">
            {step === 1 ? (
              <Image src="/assets/fill.svg" />
            ) : (
              step !== 1 &&
              values.phone?.length === 10 && (
                <Image src="/assets/complete.svg" />
              )
            )}
            {step === 2 ? (
              <Image src="/assets/fill.svg" />
            ) : step !== 2 && !isDisabled && values.plate?.length === 8 ? (
              <Image src="/assets/complete.svg" />
            ) : (
              <Image src="/assets/empty.svg" />
            )}
            {step === 3 ? (
              <Image src="/assets/fill.svg" />
            ) : (
              <Image src="/assets/empty.svg" />
            )}
          </Flex>
          <Flex
            justifyContent="center"
            align={{ base: "flex-start", md: "center" }}
            w="full"
            flexDir="column"
          >
            <Flex
              bg="#fff"
              borderRadius="12px"
              justifyContent="center"
              w={{ base: "full", md: "30rem" }}
              flexDir="column"
              minH="80vh"
            >
              <Flex
                align="center"
                justifyContent="space-between"
                w="full"
                mb="32px"
                onClick={() => {
                  setStep(step - 1);
                }}
                cursor="pointer"
              >
                {step !== 1 && (
                  <Box w="full">
                    <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
                  </Box>
                )}
                <Box w="full">
                  <Text
                    lineHeight="100%"
                    color="#444648"
                    fontSize="14px"
                    fontWeight={500}
                  >
                    {step === 2 ? "Provide Information" : "Make Payment"}
                  </Text>
                </Box>
                <Box w="full"></Box>
              </Flex>

              {step !== 3 && (
                <Box
                  mt="16px"
                  w="full"
                  border="1px solid #D4D6D8"
                  borderRadius="8px"
                  p="12px"
                >
                  <Flex align="center" gap="12px">
                    <Image src="/assets/zone_pic.png" w="96px" h="96px" />
                    <Box w="full">
                      <Flex
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Box>
                          <Text
                            fontSize="14px"
                            color="#848688"
                            lineHeight="100%"
                            fontWeight={500}
                          >
                            Zone T10003
                          </Text>
                          <Text
                            mt="8px"
                            fontSize="12px"
                            color="#242628"
                            lineHeight="100%"
                          >
                            Landmark Beach
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            fontSize="14px"
                            color="#848688"
                            lineHeight="100%"
                            fontWeight={500}
                          >
                            Price
                          </Text>
                          <Text
                            mt="8px"
                            textAlign="center"
                            fontSize="12px"
                            color="#242628"
                            lineHeight="100%"
                          >
                            ₦ 20,000
                          </Text>
                        </Box>
                      </Flex>

                      <Flex
                        align="flex-end"
                        mt="30px"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Box>
                          <Text
                            fontSize="14px"
                            color="#848688"
                            lineHeight="100%"
                            fontWeight={500}
                          >
                            Amenities{" "}
                          </Text>
                          <Text
                            mt="8px"
                            fontSize="12px"
                            color="#242628"
                            lineHeight="100%"
                          >
                            View
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            fontSize="14px"
                            color="#848688"
                            lineHeight="100%"
                            fontWeight={500}
                          >
                            Service Type
                          </Text>
                          <Text
                            mt="8px"
                            fontSize="12px"
                            color="#242628"
                            lineHeight="100%"
                          >
                            Pay-To-Park
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              )}

              {step === 1 && (
                <Box>
                  <Box my="16px">
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Enter your Vehicle Licence Number
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter Licence Number"
                      handleKeyPress={(e) => handleKeyPress(e, 8)}
                      value={values.plate}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          plate: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Select Vehicle Make
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select Make"
                      options={colorOptions}
                      value={values.make}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                      }}
                      defaultValue={values.vehicle}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "make",
                        })
                      }
                    />
                  </Box>

                  <Box my="16px">
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Select Vehicle Model
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select Model"
                      options={colorOptions}
                      value={values.model}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                      }}
                      defaultValue={values.vehicle}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "model",
                        })
                      }
                    />
                  </Box>

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Select Vehicle Color
                    </Text>
                    <Select
                      styles={customStyles}
                      value={values.color}
                      components={{
                        SingleValue: ColorOptio,
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                      }}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, { name: "color" })
                      }
                      options={colorOptions}
                    />
                  </Box>
                </Box>
              )}

              {step === 2 && (
                <Flex flexDir="column" mb="30px">
                  <Box my="16px">
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Enter Your Phone Number
                    </Text>
                    <CustomInput
                      auth
                      ngn
                      mb
                      handleKeyPress={(e) => handleKeyPress(e, 10)}
                      value={values.phone}
                      type="number"
                      onChange={(e) =>
                        setValues({
                          ...values,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Enter Your Email
                    </Text>
                    <CustomInput
                      auth
                      mb
                      type="email"
                      holder="Email address"
                      value={values.email}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          email: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Flex>
              )}

              {step === 3 && (
                <Flex flexDir="column" minH="70vh">
                  <Flex
                    border="1px solid #D4D6D8"
                    borderRadius="8px"
                    p="24px"
                    flexDir="column"
                  >
                    <Flex
                      flexDir="column"
                      justifyContent="center"
                      align="center"
                    >
                      <Image w="40px" h="40px" src="/assets/park-confirm.png" />
                      <Text
                        mt="16px"
                        mb="24px"
                        color="#242628"
                        fontWeight={500}
                        lineHeight="100%"
                      >
                        Summary
                      </Text>
                    </Flex>

                    <Box>
                      <Flex
                        mb="24px"
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Name
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Bilal Omari
                        </Text>
                      </Flex>

                      <Flex
                        mb="24px"
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Email
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          balablu@gmail.com
                        </Text>
                      </Flex>

                      <Flex
                        mb="24px"
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Phone Number
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          +2349028944933
                        </Text>
                      </Flex>

                      <Flex
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Service
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Pay-To-Park
                        </Text>
                      </Flex>

                      <Flex
                        my="24px"
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Price
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          ₦ 20,000
                        </Text>
                      </Flex>

                      <Flex
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Location
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Landmark Towers
                        </Text>
                      </Flex>

                      <Flex
                        align="center"
                        my="24px"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Zone
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          T10003
                        </Text>
                      </Flex>

                      <Flex
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          License Number
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          BT02383J
                        </Text>
                      </Flex>

                      <Flex
                        mt="24px"
                        align="center"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Text
                          color="#848688"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Vehicle
                        </Text>
                        <Text
                          color="#242628"
                          textAlign="end"
                          w="full"
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          Toyota Corrola
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>

                  <Flex mt="auto" w="100%" gap="24px" align="center">
                    <Button
                      w="full"
                      bg="red"
                      mt="auto"
                      py="17px"
                      fontSize="14px"
                    >
                      Make Payment
                    </Button>
                  </Flex>
                </Flex>
              )}

              {step !== 3 && (
                <Button
                  onClick={() => setStep(step + 1)}
                  w="full"
                  bg="red"
                  mt="auto"
                  py="17px"
                  isDisabled={
                    step === 1
                      ? values.phone?.length < 10
                      : step === 2
                      ? isDisabled || values?.plate?.length < 8
                      : false
                  }
                  fontSize="14px"
                >
                  {step !== 3 ? "Proceed" : "Park Now"}
                </Button>
              )}
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex justifyContent="center" align="center" h="75vh">
          <Heading>Please Open this URL on your mobile device</Heading>
        </Flex>
      )}
    </Box>
  );
};

export default PayToPark;
