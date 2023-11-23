import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import CustomInput from "../common/CustomInput";
import useCustomToast from "../../utils/notifications";
import { useCreateService } from "../../services/admin/query/services";
import TextInput from "../common/TextInput";
import { IoIosArrowDown } from "react-icons/io";

const AdminAddServiceModal = ({ isOpen, refetch, onClose }) => {
  const [values, setValues] = useState({
    name: "",
    serviceType: "",
    description: "",
  });

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
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };

  const selectOptions = [
    { label: "PARKING", value: "PARKING" },
    { label: "VALET", value: "VALET" },
    { label: "SERVICE", value: "SERVICE" },
    { label: "OTHERS", value: "OTHERS" },
  ];

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useCreateService({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      onClose();
      setValues({ name: "", serviceType: "", description: "" });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...values, status: 1, serviceType: values?.serviceType?.value });
  };

  const close = () => {
    onClose();
    setValues({ name: "", serviceType: "", description: "" });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="40px"
        px="24px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Flex justifyContent="center" align="center" flexDir="column">
            <Text
              mb="24px"
              color="#242628"
              fontWeight={700}
              fontSize="24px"
              lineHeight="100%"
            >
              Add Service
            </Text>
          </Flex>

          <Box mb="24px">
            <Text
              color="#444648"
              lineHeight="100%"
              fontSize="10px"
              mb="8px"
              fontWeight={500}
            >
              Name
            </Text>
            <CustomInput
              value={values.name}
              auth
              onChange={(e) =>
                setValues({
                  ...values,
                  name: e.target.value,
                })
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
              Description
            </Text>
            <TextInput
              value={values.description}
              onChange={(e) =>
                setValues({
                  ...values,
                  description: e.target.value,
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
              Service Type
            </Text>
            <Select
              styles={customStyles}
              options={selectOptions}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, {
                  name: "serviceType",
                })
              }
              value={values?.serviceType}
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
            />
          </Box>

          <Flex align="center" gap="24px">
            <Button variant="adminSecondary" onClick={close} w="100%">
              Cancel
            </Button>
            <Button
              isDisabled={isDisabled}
              isLoading={isLoading}
              onClick={handleSubmit}
              w="100%"
              variant="adminPrimary"
            >
              Save
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminAddServiceModal;
