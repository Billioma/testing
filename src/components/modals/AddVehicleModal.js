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
import { IoIosArrowDown } from "react-icons/io";

const AddVehicleModal = ({
  isOpen,
  refetch,
  makes,
  models,
  onClose,
  noVehicle,
}) => {
  const [values, setValues] = useState({
    state: "",
    plate: "",
    color: "",
    make: "",
    model: "",
  });
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

  const { errorToast, successToast } = useCustomToast();

  const close = () => {
    localStorage.removeItem("login");
    onClose();
    setValues({ state: "", plate: "", color: "", make: "", model: "" });
  };
  const { mutate, isLoading } = useCreateVehicles({
    onSuccess: (res) => {
      refetch();
      successToast(res?.message);
      close();
      localStorage.removeItem("login");
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
      color: values?.color?.label,
      state: values.state,
    });
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

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex justifyContent="center" align="center" flexDir="column">
            <Image w="56px" h="40px" src="/assets/car.png" />
            <Text
              my="18px"
              color="#242628"
              fontWeight={700}
              fontSize="22px"
              lineHeight="100%"
            >
              Add Vehicle
            </Text>
            {noVehicle && (
              <Text
                mb="18px"
                color="#444648"
                fontWeight={500}
                fontSize="13px"
                lineHeight="100%"
              >
                Kindly add a vehicle to your account
              </Text>
            )}
          </Flex>

          <Box mb="18px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="5px"
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
                DropdownIndicator: () => (
                  <div>
                    <IoIosArrowDown size="15px" color="#646668" />
                  </div>
                ),
              }}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption?.value, { name: "state" })
              }
            />
          </Box>

          <Box mb="18px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              mb="5px"
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

          <Box mb="18px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="5px"
            >
              Vehicle Color
            </Text>
            <Select
              styles={customStyles}
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
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "color" })
              }
              value={values?.color}
              options={colorOptions}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
            />
          </Box>
          <Box mb="18px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="5px"
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
                DropdownIndicator: () => (
                  <div>
                    <IoIosArrowDown size="15px" color="#646668" />
                  </div>
                ),
              }}
              options={makeOptions}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "make" })
              }
            />
          </Box>

          <Box mb="18px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              fontWeight={500}
              mb="5px"
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
                DropdownIndicator: () => (
                  <div>
                    <IoIosArrowDown size="15px" color="#646668" />
                  </div>
                ),
              }}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, { name: "model" })
              }
            />
          </Box>

          <Flex align="center" mb="18px" gap="15px">
            {!noVehicle && (
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
            )}

            <Button
              fontSize="14px"
              fontWeight={500}
              onClick={handleSubmit}
              isDisabled={isDisabled}
              isLoading={isLoading}
              lineHeight="100%"
              w="full"
              py="17px"
            >
              Save
            </Button>
          </Flex>

          {noVehicle && (
            <Text
              onClick={close}
              cursor="pointer"
              color="#848688"
              fontWeight={500}
              textAlign="center"
              lineHeight="100%"
              fontSize="14px"
            >
              Skip for later
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddVehicleModal;
