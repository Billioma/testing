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
import { useGetZone } from "../../../services/query/locations";
import useCustomToast from "../../../utils/notifications";
import { useGetVehicles } from "../../../services/query/vehicles";
import { useGetUser } from "../../../services/query/user";
import { useCreatePayToPark } from "../../../services/query/services";
import { useNavigate } from "react-router-dom";

const Park = () => {
  const [zone, setZone] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { errorToast, successToast } = useCustomToast();
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    vehicle: "",
    serviceType: "",
    paymentMethod: "",
  });
  const { mutate, isLoading, data } = useGetZone({
    onSuccess: () => {
      setError(false);
      setStep(step + 1);
    },
    onError: (err) => {
      if (err?.response?.data?.message) {
        setError(true);
      } else {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occured"
        );
      }
    },
  });

  const { mutate: parkMutate, isLoading: isCreating } = useCreatePayToPark({
    onSuccess: (res) => {
      onClose();
      navigate("/customer/services");
      setValues({ vehicle: "", serviceType: "", paymentMethod: "" });
      setZone("");
      setStep(1);
      successToast(res?.message);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSearchZone = () => {
    mutate(zone);
  };

  const handlePark = () => {
    parkMutate({
      amount: values?.serviceType?.amount,
      paymentMethod: Number(values?.paymentMethod),
      rate: Number(values?.serviceType?.rate),
      service: data?.service?.id,
      vehicle: Number(values?.vehicle?.id),
      zone: data?.id,
    });
  };

  useEffect(() => {
    setStep(1);
    setValues({ vehicle: "", serviceType: "", paymentMethod: "" });
    setZone("");
  }, []);

  const { data: userData } = useGetUser();
  const { data: vehicles } = useGetVehicles();
  const serviceOptions = data?.rates?.map((service) => ({
    value: service?.name,
    label: service?.name,
    amount: service?.amount,
    rate: service?.id,
  }));
  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    make: `${car?.model?.make?.name} - ${car?.model?.name}`,
    id: car?.id,
  }));

  const ServiceType = ({ data }) => (
    <Flex
      mt="-30px"
      h="40px"
      align="center"
      justifyContent="space-between"
      w="full"
      backgroundColor={data?.value}
      borderRadius="4px"
    >
      <Text>{data?.label}</Text>
      <Text>
        Price: ₦{" "}
        {data?.amount?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </Text>
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
              setError(false);
            }}
          />

          {error && (
            <Text color="red" fontSize="13px" mt="8px">
              Zone '{zone}' was not found! Try search another zone.
            </Text>
          )}

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
                        Capacity
                      </Text>
                      <Text
                        mt="8px"
                        textAlign="center"
                        fontSize="12px"
                        color="#242628"
                        lineHeight="100%"
                      >
                        {data?.capacity}
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
                        {data?.amenities[0]?.name}
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
                  components={{
                    SingleValue: ServiceType,
                  }}
                  options={serviceOptions}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, { name: "serviceType" })
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
                  <RadioGroup
                    value={values.paymentMethod}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        paymentMethod: e,
                      })
                    }
                    align="center"
                    display="flex"
                    gap="24px"
                  >
                    <Radio value={"1"}>
                      <Text fontSize="14px"> Pay via Wallet</Text>
                    </Radio>
                    <Radio value={"0"}>
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
                      <span style={{ fontWeight: 500 }}> Balance: </span> ₦{" "}
                      {userData?.wallet?.balance?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
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
            onClick={() =>
              step === 3
                ? onOpen()
                : step === 1
                ? handleSearchZone()
                : setStep(step + 1)
            }
            w="full"
            bg="red"
            isLoading={isLoading}
            mt="32px"
            py="17px"
            isDisabled={step === 1 ? !zone : ""}
            fontSize="14px"
          >
            {step === 1 ? "Enter" : "Park Now"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmParkModal
        isLoading={isCreating}
        dataa={data}
        action={handlePark}
        values={values}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default Park;
