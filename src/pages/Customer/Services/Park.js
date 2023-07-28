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
import CustomInput from "../../../components/common/CustomInput";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import ConfirmParkModal from "../../../components/modals/ConfirmParkModal";
import { useGetStates } from "../../../services/query/locations";

const Park = () => {
  const [zone, setZone] = useState("");
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    setStep(1);
  }, []);

  const [values, setValues] = useState({
    state: "",
    plate: "",
    color: "",
    make: "",
    model: "",
  });

  const { data: states } = useGetStates();
  const stateOptions = states?.data?.map((state) => ({
    value: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
    label: state?.name?.replace(" State", "")?.replace(" (FCT)", ""),
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      height: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #D4D6D8",
      background: "unset",
    }),
  };

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
            Park Now
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

          <CustomInput
            auth
            value={zone}
            mb
            holder="Enter zone number"
            onChange={(e) => {
              setZone(e.target.value);
              setStep(1);
            }}
          />

          {(step === 2 || step === 3) && (
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
                  <Flex align="center" justifyContent="space-between" w="full">
                    <Box>
                      <Text
                        fontSize="14px"
                        color="#848688"
                        lineHeight="100%"
                        fontWeight={500}
                      >
                        Zone {zone}
                      </Text>
                      <Text
                        mt="8px"
                        fontSize="12px"
                        color="#242628"
                        lineHeight="100%"
                      >
                        LandMark Towers
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontSize="14px"
                        color="#848688"
                        lineHeight="100%"
                        fontWeight={500}
                      >
                        Capacity
                      </Text>
                      <Text
                        mt="8px"
                        textAlign="center"
                        fontSize="12px"
                        color="#242628"
                        lineHeight="100%"
                      >
                        45
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
                        None
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        cursor="pointer"
                        fontSize="10px"
                        textDecor="underline"
                        color="#242628"
                        lineHeight="100%"
                      >
                        Details
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Box my="16px">
                <Text
                  color="#444648"
                  fontSize="10px"
                  lineHeight="100%"
                  mb="8px"
                >
                  Service Type
                </Text>
                <Select
                  styles={customStyles}
                  options={stateOptions}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, { name: "make" })
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
                  Select Vehicle
                </Text>
                <Select
                  styles={customStyles}
                  options={stateOptions}
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

              <Box border="1px solid #D4D6D8" borderRadius="4px" p="16px">
                <Flex align="center" w="full" justifyContent="space-between">
                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
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
            onClick={() => (step === 3 ? onOpen() : setStep(step + 1))}
            w="full"
            bg="red"
            mt="32px"
            py="17px"
            isDisabled={step === 1 ? !zone : ""}
            fontSize="14px"
          >
            {step === 1 ? "Enter" : "Park Now"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmParkModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Park;
