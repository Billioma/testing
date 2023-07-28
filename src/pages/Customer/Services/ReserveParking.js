import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import ConfirmReserveModal from "../../../components/modals/ConfirmReserveModal";
import {
  useGetCities,
  useGetLocations,
  useGetStates,
} from "../../../services/query/locations";
import { CiLocationOn } from "react-icons/ci";
import { Calendar } from "react-calendar";
import { formatDate, timeArray } from "../../../utils/helpers";
import { IoIosArrowDown } from "react-icons/io";
import { useGetVehicles } from "../../../services/query/vehicles";

const ReserveParking = () => {
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    setStep(1);
  }, []);

  const [values, setValues] = useState({
    state: "",
    city: "",
    locations: "",
    arrivalTime: "",
    departureTime: "",
    vehicle: "",
    color: "",
    make: "",
    model: "",
  });

  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");
  const [endValue, endChange] = useState("");
  const [endDate, setEndDate] = useState(false);

  const start = formatDate(startValue);
  const end = formatDate(endValue);

  const { data: states } = useGetStates();
  const { data: locations } = useGetLocations();
  const { data: vehicles } = useGetVehicles();
  const currentStateLocation = locations?.filter((dat) =>
    dat?.address?.includes(values?.city?.value)
  );
  console.log(vehicles);
  const { mutate, data: cities } = useGetCities();
  const stateOptions = states?.data?.map((state) => ({
    value: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
    label: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  }));
  const cityOptions = cities?.data?.map((city) => ({
    value: city?.name,
    label: city?.name,
  }));
  const locationOptions = currentStateLocation?.map((city) => ({
    value: city?.name,
    label: city?.name,
  }));
  const timeOptions = timeArray?.map((time) => ({
    value: time,
    label: time,
  }));
  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
    if (name === "state") {
      mutate(selectedOption?.value?.toLowerCase()?.replace(" ", "_"));
    }
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
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setStartDate(false);
        setEndDate(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px="32px"
          justifyContent="center"
          w="30rem"
          flexDir="column"
        >
          <Text
            fontSize="20px"
            color="#242628"
            lineHeight="100%"
            fontWeight={500}
            mb="32px"
          >
            Reserve Parking
          </Text>

          {step !== 1 && (
            <Box mb="32px">
              <HiOutlineArrowNarrowLeft
                cursor="pointer"
                onClick={() => setStep(step - 1)}
                size="24px"
                color="#242628"
              />
            </Box>
          )}

          {step === 1 && (
            <>
              <Flex align="center" gap="32px" w="full">
                <Box w="full">
                  <Select
                    styles={customStyles}
                    placeholder="Select State"
                    options={stateOptions}
                    value={values.state}
                    defaultValue={values.state}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, { name: "state" })
                    }
                  />
                </Box>
                <Box w="full">
                  <Select
                    styles={customStyles}
                    placeholder="Select City"
                    options={cityOptions}
                    value={values.city}
                    defaultValue={values.city}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, { name: "city" })
                    }
                  />
                </Box>
              </Flex>
              <Box w="full" mt="24px">
                <Select
                  styles={customStyles}
                  placeholder="Select Location"
                  options={locationOptions}
                  value={values.locations}
                  defaultValue={values.locations}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, { name: "locations" })
                  }
                />
              </Box>
            </>
          )}

          {step === 2 && (
            <Box>
              <Box
                bg="#141618"
                border="1px solid #D4D6D8"
                borderRadius="8px"
                py="12px"
                px="16px"
              >
                <CiLocationOn color="red" size="16px" />

                <Flex
                  mt="16px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box w="full">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      Location
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {values?.locations?.value}
                    </Text>
                  </Box>

                  <Flex flexDir="column" justifyContent="center" w="full">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      State
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {values?.state?.value}
                    </Text>
                  </Flex>

                  <Flex flexDir="column" justifyContent="flex-end">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      City
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {values?.city?.value}
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              <Flex align="center" gap="16px" my="16px">
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Arrival Date
                  </Text>

                  <Box pos="relative" w="full" className="box">
                    <Flex
                      fontSize="14px"
                      onClick={() => setStartDate((prev) => !prev)}
                      align="center"
                      justifyContent="space-between"
                      w="full"
                      bg={start ? "#F4F6F8" : "tranparent"}
                      color={start ? "#000" : ""}
                      h="44px"
                      cursor="pointer"
                      borderRadius="4px"
                      border="1px solid #D4D6D8"
                      py="12px"
                      px="16px"
                    >
                      <Text>{start ? start : "Select Date"}</Text>

                      <IoIosArrowDown />
                    </Flex>
                    {startDate && (
                      <Box pos="absolute" top="50px" w="200%" zIndex="3">
                        <Calendar
                          onChange={(e) => {
                            startChange(e);
                            setStartDate(false);
                          }}
                          value={startValue}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Arrival Time
                  </Text>

                  <Select
                    styles={customStyles}
                    placeholder="Select Time"
                    options={timeOptions}
                    value={values.arrivalTime}
                    defaultValue={values.arrivalTime}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "arrivalTime",
                      })
                    }
                  />
                </Box>
              </Flex>

              <Flex align="center" gap="16px">
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Departure Date
                  </Text>

                  <Box pos="relative" w="full" className="box">
                    <Flex
                      fontSize="14px"
                      onClick={() => setEndDate((prev) => !prev)}
                      align="center"
                      justifyContent="space-between"
                      w="full"
                      h="44px"
                      cursor="pointer"
                      borderRadius="4px"
                      bg={end ? "#F4F6F8" : "tranparent"}
                      color={end ? "#000" : ""}
                      border="1px solid #D4D6D8"
                      py="12px"
                      px="16px"
                    >
                      <Text>{end ? end : "Select Date"}</Text>

                      <IoIosArrowDown />
                    </Flex>
                    {endDate && (
                      <Box pos="absolute" top="70" w="200%" zIndex="3">
                        <Calendar
                          onChange={(e) => {
                            endChange(e);
                            setEndDate(false);
                          }}
                          value={startValue}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Departure Date
                  </Text>

                  <Select
                    styles={customStyles}
                    placeholder="Select Time"
                    options={timeOptions}
                    value={values.departureTime}
                    defaultValue={values.departureTime}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "departureTime",
                      })
                    }
                  />
                </Box>
              </Flex>

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Vehicle
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Vehicle"
                  options={vehicleOptions}
                  value={values.vehicle}
                  defaultValue={values.vehicle}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "vehicle",
                    })
                  }
                />
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Payment Method
                </Text>
                <Flex mt="17px" align="center">
                  <RadioGroup align="center" display="flex" gap="24px">
                    <Radio>
                      <Text fontSize="14px"> Pay via Wallet</Text>
                    </Radio>
                    <Radio>
                      <Text fontSize="14px">Pay via card</Text>
                    </Radio>
                  </RadioGroup>
                </Flex>
              </Box>

              <Box
                mt="16px"
                border="1px solid #D4D6D8"
                borderRadius="4px"
                p="16px"
              >
                <Flex align="center" w="full" justifyContent="space-between">
                  <Box>
                    <Text
                      color="#444648"
                      fontSize="12px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Wallet
                    </Text>
                    <Text fontSize="14px" color="#646668" lineHeight="100%">
                      <span style={{ fontWeight: 500 }}> Balance: </span>₦
                      20,000
                    </Text>
                  </Box>

                  <Box>
                    <BsCheckCircle color="#0B841D" />
                  </Box>
                </Flex>
              </Box>

              <Flex
                mt="8px"
                color="red"
                fontSize="12px"
                fontWeight={500}
                lineHeight="100%"
                justifyContent="flex-end"
                w="full"
              >
                <Text textDecor="underline">Top Up Wallet</Text>
              </Flex>
            </Box>
          )}

          <Button
            onClick={() => (step === 2 ? onOpen() : setStep(step + 1))}
            w="full"
            bg="red"
            mt="32px"
            py="17px"
            isDisabled={
              step === 1
                ? !values?.state || !values?.city || !values?.locations
                : ""
            }
            fontSize="14px"
          >
            {step === 1 ? "Select" : "Reserve and Park Later"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmReserveModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ReserveParking;
