import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Image,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import * as nigerianStates from "nigerian-states-and-lgas";
import CustomInput from "../common/CustomInput";
import { colors } from "../common/constants";
import { useCreateVehicles } from "../../services/query/vehicles";
import useCustomToast from "../../utils/notifications";

const AddVehicleModal = ({
  isOpen,
  dataa,
  refetch,
  makes,
  models,
  onClose,
}) => {
  const allStates = nigerianStates.states();
  const stateOptions = allStates.map((state) => ({
    value: state,
    label: state,
  }));

  const colorOptions = colors.map((color) => ({
    value: color,
    label: color,
  }));
  const modelOptions = models?.map((model) => ({
    value: model?.id,
    label: model?.name,
  }));
  const makeOptions = makes?.map((make) => ({
    value: make?.id,
    label: make?.name,
  }));
  const [values, setValues] = useState({
    state: "",
    plate: "",
    color: "",
    make: "",
    model: "",
  });

  useEffect(() => {
    if (dataa) {
      setValues({
        ...values,
        color: dataa?.color,
      });
    }
  }, [dataa]);

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const isDisabled = Object.values(values).some((value) => !value);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
  console.log(values);
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useCreateVehicles({
    onSuccess: (res) => {
      refetch();
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      licensePlate: values.plate,
      make: values.make?.value,
      model: values.model?.value,
      color: values?.color?.value,
      state: values.state,
    });
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

  const ColorOption = ({ data }) => (
    <Flex
      onClick={() => {
        setValues({
          ...values,
          color: data,
        });
        setMenuIsOpen(false);
      }}
      gap="8px"
      cursor="pointer"
      mb="5px"
      align="center"
      px="15px"
    >
      <Flex
        backgroundColor={data?.value}
        width="28px"
        height="20px"
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalHeader></ModalHeader>

        <ModalBody>
          <Flex justifyContent="center" align="center" flexDir="column">
            <Image w="56px" h="40px" src="/assets/car.png" />
            <Text
              my="24px"
              color="#242628"
              fontWeight={700}
              fontSize="24px"
              lineHeight="100%"
            >
              Add Vehicle
            </Text>
          </Flex>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Vehicle State
            </Text>
            <Select
              styles={customStyles}
              options={stateOptions}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption?.value, { name: "state" })
              }
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              mb="8px"
              fontWeight={500}
            >
              License Plate Number
            </Text>
            <CustomInput
              value={values.plate}
              onBlur={(e) => console.log(e.target.value)}
              onChange={(e) =>
                setValues({
                  ...values,
                  plate: e.target.value,
                })
              }
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Vehicle Color
            </Text>
            <Select
              styles={customStyles}
              components={{
                Option: ColorOption,
                SingleValue: ColorOptio,
              }}
              options={colorOptions}
              menuIsOpen={menuIsOpen}
              onMenuOpen={() => setMenuIsOpen(true)}
              onMenuClose={() => setMenuIsOpen(false)}
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Vehicle Make
            </Text>
            <Select
              styles={customStyles}
              options={makeOptions}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "make" })
              }
            />
          </Box>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="8px"
            >
              Vehicle Model
            </Text>
            <Select
              styles={customStyles}
              options={modelOptions}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "model" })
              }
            />
          </Box>

          <Button
            fontSize="14px"
            fontWeight={500}
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={isDisabled}
            lineHeight="100%"
            w="full"
            py="17px"
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddVehicleModal;
