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
import { errorCustomStyles } from "../common/constants";

const AdminAddServiceModal = ({ isOpen, refetch, onClose }) => {
  const [values, setValues] = useState({
    name: "",
    serviceType: "",
    description: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isDisabled = Object.values(values).some((value) => !value);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
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
      setFormSubmitted(false);
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
    setFormSubmitted(false);
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

          <form
            onSubmit={(e) => {
              isDisabled
                ? setFormSubmitted(true)
                : (setFormSubmitted(true), handleSubmit(e));
              e.preventDefault();
            }}
          >
            <Box mb="24px">
              <Text
                color="#444648"
                lineHeight="100%"
                fontSize="12px"
                mb="8px"
                fontWeight={500}
              >
                Name{" "}
                <span
                  style={{
                    color: "tomato",
                    fontSize: "15px",
                  }}
                >
                  *
                </span>
              </Text>
              <CustomInput
                value={values.name}
                auth
                error={formSubmitted && !values?.name ? true : false}
                onChange={(e) =>
                  setValues({
                    ...values,
                    name: e.target.value,
                  })
                }
              />

              {formSubmitted && !values?.name && (
                <Text mt="-22px" fontSize="12px" color="tomato">
                  Name is required
                </Text>
              )}
            </Box>

            <Box mb="24px">
              <Text
                color="#444648"
                lineHeight="100%"
                fontSize="12px"
                mb="8px"
                fontWeight={500}
              >
                Description{" "}
                <span
                  style={{
                    color: "tomato",
                    fontSize: "15px",
                  }}
                >
                  *
                </span>
              </Text>
              <TextInput
                value={values.description}
                error={formSubmitted && !values?.description ? true : false}
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
              />

              {formSubmitted && !values?.description && (
                <Text mt="-11px" fontSize="12px" color="tomato">
                  Description is required
                </Text>
              )}
            </Box>

            <Box mb="24px">
              <Text
                color="#444648"
                lineHeight="100%"
                fontSize="12px"
                fontWeight={500}
                mb="8px"
              >
                Service Type{" "}
                <span
                  style={{
                    color: "tomato",
                    fontSize: "15px",
                  }}
                >
                  *
                </span>
              </Text>
              <Select
                styles={
                  formSubmitted && !values?.serviceType
                    ? errorCustomStyles
                    : customStyles
                }
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
              {formSubmitted && !values?.serviceType && (
                <Text mt="8px" fontSize="12px" color="tomato">
                  Service Type is required
                </Text>
              )}
            </Box>

            <Flex align="center" gap="24px">
              <Button variant="adminSecondary" onClick={close} w="100%">
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                type="submit"
                w="100%"
                variant="adminPrimary"
              >
                Save
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminAddServiceModal;
