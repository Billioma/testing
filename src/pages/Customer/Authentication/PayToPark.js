import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Select from "react-select";
import { colorTypes } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import SuccessfulPaymentModal from "../../../components/modals/SuccessfulPaymentModal";
import CreateAccountModal from "../../../components/modals/CreateAccountModal";
import { useParams } from "react-router-dom";
import { useGetZone } from "../../../services/customer/query/locations";
import {
  useGetPublicMakes,
  useGetPublicModels,
} from "../../../services/customer/query/auth";

const PayToPark = () => {
  const { zoneCode } = useParams();
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showCreate, setShowCreate] = useState(false);
  const [create, setCreate] = useState(false);

  const { mutate, isLoading, data } = useGetZone({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  useEffect(() => {
    if (zoneCode !== "") {
      mutate(zoneCode);
    }
  }, [zoneCode]);

  useEffect(() => {
    if (showCreate) {
      onClose();
    }
  }, [showCreate]);

  const [values, setValues] = useState({
    phone: "",
    email: "",
    plate: "",
    make: "",
    model: "",
    color: "",
  });

  const { data: models } = useGetPublicModels();
  const { data: makes } = useGetPublicMakes();

  const modelToMap = models?.filter(
    (item) => item?.make?.name === values?.make?.label
  );
  const modelOptions = modelToMap?.map((model) => ({
    value: model?.id,
    label: model?.name,
  }));
  const makeOptions = makes?.map((make) => ({
    value: make?.id,
    label: make?.name,
  }));

  const colorOptions = colorTypes.map((color) => ({
    value: color.color,
    label: color.label,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    if (name === "make") {
      setValues((prevValues) => ({
        ...prevValues,
        make: selectedOption,
        model: "",
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: selectedOption,
      }));
    }
  };

  const handleKeyPress = (e, limit) => {
    if (limit && e.target.value.length >= limit) {
      e.preventDefault();
    }
  };

  const getOptionLabel = (option) => (
    <Flex gap="8px" align="center">
      <Box
        width="28px"
        height="20px"
        backgroundColor={option.value}
        borderRadius="4px"
      />
      {option.label}
    </Flex>
  );

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const getOptionValue = (option) => option.value;

  const ColorOption = ({ data }) => (
    <Flex
      mt="-5px"
      onClick={() => {
        setValues({ ...values, color: data });
        setMenuIsOpen(false);
      }}
      px="10px"
      cursor="pointer"
      _hover={{ bg: "#fff" }}
      gap="8px"
      align="center"
      h="40px"
    >
      <Flex
        width="28px"
        height="20px"
        backgroundColor={data?.value}
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );

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
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          {isMobile ? (
            <>
              <Image my="24px" src="/assets/park-logo.jpg" w="134px" h="28px" />

              <Flex align="center" w="full">
                {step === 1 ? (
                  <Flex align="center" w="full">
                    <Image src="/assets/fill.svg" />
                    <Box h="2px" bg="transparent" w="full"></Box>
                  </Flex>
                ) : (
                  step !== 1 &&
                  values?.plate &&
                  values?.make &&
                  values?.model &&
                  values?.plate?.length === 8 &&
                  values?.color && (
                    <Flex align="center" w="full">
                      <Image src="/assets/complete.svg" />
                      <Box h="2px" bg="red" w="full"></Box>
                    </Flex>
                  )
                )}
                {step === 2 ? (
                  <Flex align="center" w="full">
                    <Image src="/assets/fill.svg" />
                    <Box h="2px" bg="transparent" w="full"></Box>
                  </Flex>
                ) : step !== 2 &&
                  step !== 1 &&
                  values?.email &&
                  values.phone ? (
                  <Flex align="center" w="full">
                    <Image src="/assets/complete.svg" />
                    <Box h="2px" bg="red" w="full"></Box>
                  </Flex>
                ) : (
                  <Flex align="center" w="full">
                    <Image src="/assets/empty.svg" />
                    <Box h="2px" bg="transparent" w="full"></Box>
                  </Flex>
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
                >
                  {step === 3 ? (
                    <Flex
                      align="center"
                      gap="32px"
                      w="full"
                      mb="25px"
                      mt="20px"
                      onClick={() => {
                        setStep(step - 1);
                      }}
                      cursor="pointer"
                    >
                      <Box>
                        <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
                      </Box>

                      <Box w="full">
                        <Text
                          lineHeight="100%"
                          color="#444648"
                          fontSize="14px"
                          fontWeight={500}
                        >
                          Make Payment
                        </Text>
                      </Box>
                    </Flex>
                  ) : step === 1 ? (
                    <Text
                      lineHeight="100%"
                      color="#444648"
                      mb="25px"
                      mt="20px"
                      textAlign="center"
                      fontSize="14px"
                      fontWeight={500}
                    >
                      Enter Vehicle Details
                    </Text>
                  ) : (
                    <Flex
                      align="center"
                      gap="32px"
                      w="full"
                      mb="25px"
                      mt="20px"
                      onClick={() => {
                        setStep(step - 1);
                      }}
                      cursor="pointer"
                    >
                      {step === 1 ? (
                        <Box w="full"></Box>
                      ) : (
                        <Box>
                          <HiOutlineArrowNarrowLeft
                            size="24px"
                            color="#242628"
                          />
                        </Box>
                      )}
                      <Box>
                        <Text
                          lineHeight="100%"
                          color="#444648"
                          fontSize="14px"
                          fontWeight={500}
                        >
                          Enter Contact Details
                        </Text>
                      </Box>
                    </Flex>
                  )}

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
                                Zone {data?.name}
                              </Text>
                              <Text
                                mt="8px"
                                fontSize="12px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                {data?.location?.name}
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
                                ₦ {data?.rates[0]?.amount?.toLocaleString()}
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
                          options={makeOptions}
                          value={values.make}
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
                            handleSelectChange(selectedOption, { name: "make" })
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
                          options={modelOptions}
                          value={values.model}
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
                          onMenuOpen={() => setMenuIsOpen(true)}
                          menuIsOpen={menuIsOpen}
                          onMenuClose={() => setMenuIsOpen(false)}
                          components={{
                            SingleValue: ColorOptio,
                            Option: ColorOption,
                            IndicatorSeparator: () => (
                              <div style={{ display: "none" }}></div>
                            ),
                            DropdownIndicator: () => (
                              <div>
                                <IoIosArrowDown size="15px" color="#646668" />
                              </div>
                            ),
                          }}
                          getOptionLabel={getOptionLabel}
                          getOptionValue={getOptionValue}
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
                          <Image
                            w="40px"
                            h="40px"
                            src="/assets/park-confirm.png"
                          />
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

                      <Flex
                        onClick={() => onOpen()}
                        mt="24px"
                        mb="30px"
                        w="100%"
                        gap="24px"
                        align="center"
                      >
                        <Button w="full" bg="red" py="17px" fontSize="14px">
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
                      mt="24px"
                      mb="30px"
                      py="17px"
                      isDisabled={
                        step === 1
                          ? !values?.plate ||
                            !values?.make ||
                            !values?.model ||
                            !values?.color ||
                            values?.plate?.length < 8
                          : step === 2
                          ? !values?.email || !values?.phone
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

          <SuccessfulPaymentModal
            setShowCreate={setShowCreate}
            isOpen={isOpen}
            onClose={onClose}
          />
          <CreateAccountModal
            values={values}
            setCreate={setCreate}
            create={create}
            isOpen={showCreate}
            onClose={() => setShowCreate(false)}
          />
        </>
      )}
    </Box>
  );
};

export default PayToPark;
