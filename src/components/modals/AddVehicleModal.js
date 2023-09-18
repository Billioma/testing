import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import CustomInput from "../common/CustomInput";
import { allStates, colorTypes } from "../common/constants";
import { useCreateVehicles } from "../../services/customer/query/vehicles";
import useCustomToast from "../../utils/notifications";
import ConfirmVehicleModal from "./ConfirmVehicleModal";

const AddVehicleModal = ({ isOpen, refetch, makes, models, onClose }) => {
  const [values, setValues] = useState({
    state: "",
    plate: "",
    color: "",
    make: "",
    model: "",
  });
  const [show, setShow] = useState(false);
  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));
  const colorOptions = colorTypes.map((color) => ({
    value: color.color,
    label: color.label,
  }));
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

  const handleKeyPress = (e) => {
    if (values?.plate?.length >= 8) {
      e.preventDefault();
    }
  };

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

  const isDisabled = Object.values(values).some((value) => !value);

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
  const { errorToast, successToast } = useCustomToast();

  const close = () => {
    onClose();
    setValues({ state: "", plate: "", color: "", make: "", model: "" });
  };
  const { mutate, isLoading } = useCreateVehicles({
    onSuccess: (res) => {
      refetch();
      successToast(res?.message);
      close();
      setShow(false);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
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

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
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
              components={{
                IndicatorSeparator: () => (
                  <div style={{ display: "none" }}></div>
                ),
              }}
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
              auth
              handleKeyPress={handleKeyPress}
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
              value={values.make}
              components={{
                IndicatorSeparator: () => (
                  <div style={{ display: "none" }}></div>
                ),
              }}
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
              value={values.model}
              options={modelOptions}
              components={{
                IndicatorSeparator: () => (
                  <div style={{ display: "none" }}></div>
                ),
              }}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "model" })
              }
            />
          </Box>

          <Flex align="center" gap="15px">
            <Button
              bg="transparent"
              color="#0D0718"
              fontSize="14px"
              onClick={close}
              w="full"
              border="1px solid #0D0718"
              py="17px"
            >
              Cancel
            </Button>

            <Button
              fontSize="14px"
              fontWeight={500}
              onClick={() => setShow(true)}
              isDisabled={isDisabled}
              lineHeight="100%"
              w="full"
              py="17px"
            >
              Save
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>

      <ConfirmVehicleModal
        action={handleSubmit}
        isLoading={isLoading}
        values={values}
        isOpen={show}
        onClose={() => setShow(false)}
      />
    </Modal>
  );
};

export default AddVehicleModal;
