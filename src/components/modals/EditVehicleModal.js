import React, { useEffect, useState } from "react";
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
import {
  useClaimVehicles,
  useUpdateVehicles,
} from "../../services/customer/query/vehicles";
import useCustomToast from "../../utils/notifications";
import { IoIosArrowDown } from "react-icons/io";
import ConfirmVehicleModal from "./ConfirmVehicleModal";

const EditVehicleModal = ({
  isOpen,
  refetch,
  dataa,
  makes,
  models,
  onClose,
}) => {
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
  const modelOptions = models?.map((model) => ({
    value: model?.id,
    label: model?.name,
  }));
  const makeOptions = makes?.map((make) => ({
    value: make?.id,
    label: make?.name,
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
  const isDisabled = Object.values(values).some((value) => !value);

  useEffect(() => {
    const selectedStateOption = stateOptions?.find(
      (option) =>
        option?.label?.toLocaleLowerCase() === dataa?.state?.toLocaleLowerCase()
    );
    const selectedColorOption = dataa?.color?.includes("#")
      ? colorOptions?.find(
          (option) =>
            option?.value?.toLocaleLowerCase() ===
            dataa?.color?.toLocaleLowerCase()
        )
      : colorOptions?.find(
          (option) =>
            option?.label?.toLocaleLowerCase() ===
            dataa?.color?.toLocaleLowerCase()
        );
    const selectedMakeOption = makeOptions?.find(
      (option) =>
        option?.label?.toLocaleLowerCase() ===
        dataa?.model?.make?.name?.toLocaleLowerCase()
    );
    const selectedModelOption = modelOptions?.find(
      (option) =>
        option?.label?.toLocaleLowerCase() ===
        dataa?.model?.name?.toLocaleLowerCase()
    );

    setValues({
      ...values,
      state: selectedStateOption,
      plate: dataa?.licensePlate,
      color: selectedColorOption,
      make: selectedMakeOption,
      model: selectedModelOption,
    });
  }, [dataa, makes, models]);

  const handleKeyPress = (e) => {
    if (values?.plate?.length >= 8) {
      e.preventDefault();
    }
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
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useUpdateVehicles({
    onSuccess: (res) => {
      refetch();
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const { mutate: claimMutate, isLoading: isClaim } = useClaimVehicles({
    onSuccess: (res) => {
      refetch();
      successToast(res?.message);
      setShow(false);
      localStorage.removeItem("login");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleClaim = () => {
    claimMutate(values.plate);
  };

  const handleSubmit = () => {
    mutate({
      query: dataa?.id,
      body: {
        licensePlate: values.plate,
        make: values.make?.value,
        model: values.model?.value,
        color: values?.color?.label,
        state: values.state?.value,
      },
    });
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const getOptionValue = (option) => option.value;
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

  const ColorOption = ({ data }) => (
    <Flex
      mt="-5px"
      onClick={() => {
        setValues({ ...values, color: data });
        setMenuIsOpen(false);
      }}
      px="10px"
      cursor="pointer"
      gap="8px"
      _hover={{ backgroundColor: "#f4f6f8" }}
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
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
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
              my="24px"
              color="#242628"
              fontWeight={700}
              fontSize="24px"
              lineHeight="100%"
            >
              Update Vehicle Details
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
              value={values.state}
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
                handleSelectChange(selectedOption, { name: "state" })
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
              handleKeyPress={handleKeyPress}
              auth
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
              value={values?.color}
              options={colorOptions}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
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
              options={makeOptions}
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
              value={values.model}
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
              onClick={onClose}
              w="full"
              border="1px solid #0D0718"
              py="17px"
            >
              Cancel
            </Button>
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
          </Flex>
        </ModalBody>
      </ModalContent>
      <ConfirmVehicleModal
        action={handleClaim}
        isLoading={isClaim}
        values={values}
        isOpen={show}
        onClose={() => setShow(false)}
      />
    </Modal>
  );
};

export default EditVehicleModal;
