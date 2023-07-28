import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import ConfirmEventModal from "../../../components/modals/ConfirmEventModal";
import {
  useGetEvents,
  useGetServices,
} from "../../../services/query/locations";
import { Calendar } from "react-calendar";
import { formatDate } from "../../../utils/helpers";
import { IoIosArrowDown } from "react-icons/io";
import { useGetVehicles } from "../../../services/query/vehicles";

const EventParking = () => {
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

  //   useEffect(() => {
  //     setStep(1);
  //   }, []);

  const [values, setValues] = useState({
    event: "",
    service: "",
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

  const start = formatDate(startValue);

  const { data: events } = useGetEvents();
  const { data: services } = useGetServices();
  const { data: vehicles } = useGetVehicles();

  const eventOptions = events?.map((event) => ({
    value: event?.name,
    label: event?.name,
  }));

  const servicesOptions = services?.map((event) => ({
    value: event?.name,
    label: event?.name,
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
            Event Parking
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
              <Select
                styles={customStyles}
                placeholder="Select event"
                options={eventOptions}
                value={values.event}
                defaultValue={values.event}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, { name: "event" })
                }
              />
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
                <Flex align="center" gap="16px">
                  <Image src="/assets/event.png" w="24px" h="24px" />

                  <Box>
                    <Text lineHeight="100%" color="#fff" fontSize="10px">
                      Event Name
                    </Text>
                    <Text
                      mt="8px"
                      color="#D4D6D8"
                      fontWeight={500}
                      lineHeight="100%"
                      fontSize="12px"
                    >
                      Tec Nation
                    </Text>
                  </Box>
                </Flex>

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
                      LandMark Beach
                    </Text>
                  </Box>

                  <Flex flexDir="column" justifyContent="center" w="full">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      Duration
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      480 Minutes
                    </Text>
                  </Flex>

                  <Flex flexDir="column" justifyContent="flex-end" w="40%">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      Amount Due
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      ₦ 2,500
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Date
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
                    <Box pos="absolute" top="50px" w="full" zIndex="3">
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

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Service
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Service"
                  options={servicesOptions}
                  value={values.service}
                  defaultValue={values.service}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "service",
                    })
                  }
                />
              </Box>

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
            isDisabled={step === 1 ? !values?.event : ""}
            fontSize="14px"
          >
            {step === 1 ? "Enter" : "Reserve and Park Later"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmEventModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default EventParking;
