import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Textarea,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
import CustomInput from "../common/CustomInput";
import useCustomToast from "../../utils/notifications";
import { useEditService } from "../../services/admin/query/services";

const AdminEditServiceModal = ({ isOpen, refetch, onClose, service }) => {
  const [values, setValues] = useState({
    name: "",
    serviceType: "",
    description: "",
  });

  useEffect(() => {
    if (values.serviceType) return;
    setValues({
      name: service?.name,
      serviceType: service?.serviceType,
      description: service?.description,
    });
  }, [service]);

  const isDisabled = Object.values(values).some((value) => !value);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      height: "44px",
      color: "#646668",
      fontSize: "13px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #D4D6D8",
      background: "unset",
    }),
  };

  const selectOptions = [
    { label: "PARKING", value: "PARKING" },
    { label: "VALET", value: "VALET" },
    { label: "SERVICE", value: "SERVICE" },
    { label: "OTHERS", value: "OTHERS" },
  ];

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading } = useEditService({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      onClose();
      setValues({ name: "", serviceType: "", description: "" });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...values, status: 0, id: service.id });
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="0"
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
              Edit Service
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
              bg="#F4F6F8"
              border="0px"
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
            <Textarea
              value={values.description}
              borderRadius={"4px"}
              fontSize={"12px"}
              bg="#F4F6F8"
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
              value={selectOptions.find(
                (option) => option.value == values.serviceType
              )}
              onChange={(selectedOption) =>
                setValues({
                  ...values,
                  serviceType: selectedOption.value,
                })
              }
            />
          </Box>

          <Button
            fontSize="14px"
            fontWeight={500}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={handleSubmit}
            lineHeight="100%"
            w="full"
            py="17px"
            variant="adminPrimary"
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminEditServiceModal;
