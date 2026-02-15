import { useState } from "react";
import CustomInput from "../../../components/common/CustomInput";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  useAddVehicle,
  useGetAttMakes,
  useGetAttModels,
  useGetUserVehicles,
} from "../../../services/attendant/query/logs";
import { colorTypes, attStyles } from "../../../components/common/constants";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";

const index = () => {
  const attLoc = JSON.parse(localStorage.getItem("attLoc"));
  const guestVeh = localStorage.getItem("guestVeh");
  const attZone = JSON.parse(localStorage.getItem("attZone"));
  const [values, setValues] = useState({
    customerName: `Guest${Math.random()}`,
    licensePlate: guestVeh,
    make: "",
    model: "",
    color: "",
    state: attLoc?.state,
    status: 1,
    selectedZoneId: attZone?.id,
    customerPhoneNumber: "",
  });

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

  const { data: makes, isLoading: isMakes } = useGetAttMakes();
  const { data: models, isLoading: isModels } = useGetAttModels();

  const colorOptions = colorTypes.map((color) => ({
    value: color.color,
    label: color.label,
  }));
  const modelToMap = models?.filter(
    (item) => item?.make?.name === values?.make?.label,
  );
  const modelOptions = modelToMap?.map((model) => ({
    value: model?.id,
    label: model?.name,
  }));
  const makeOptions = makes?.map((make) => ({
    value: make?.id,
    label: make?.name,
  }));

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
      _hover={{ bg: "#f4f6f8" }}
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

  const { errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate: vehMutate, isLoading } = useGetUserVehicles({
    onSuccess: (res) => {
      sessionStorage.setItem("vehData", JSON.stringify(res));
      navigate("/attendant/valet");
    },
  });
  const { mutate, isLoading: isAdd } = useAddVehicle({
    onSuccess: () => {
      vehMutate({ license: values.licensePlate, zone: attZone?.id });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    const { make, model, color, ...rest } = values;
    mutate({
      make: make.value,
      model: model.value,
      color: color.label,
      ...rest,
    });
  };

  return (
    <Box>
      <Flex flexDir="column" gap="24px">
        <Box>
          <Text color="#444648" fontSize="12px" fontWeight={500} mb="8px">
            License Plate Number <span style={{ color: "tomato" }}>*</span>
          </Text>
          <CustomInput
            mb
            white
            holder="License Plate"
            isDisabled
            value={values.licensePlate}
          />
        </Box>

        <Box>
          <Text color="#444648" fontSize="12px" fontWeight={500} mb="8px">
            Customer Phone Number <span style={{ color: "tomato" }}>*</span>
          </Text>
          <CustomInput
            mb
            white
            holder="Phone Number"
            value={values.customerPhoneNumber}
            onChange={(e) => {
              const inputPhone = e.target.value.replace(/\D/g, "").slice(0, 11);
              setValues({
                ...values,
                customerPhoneNumber: inputPhone,
              });
            }}
          />
        </Box>

        <Box>
          <Text color="#444648" fontSize="12px" fontWeight={500} mb="8px">
            Vehicle Make <span style={{ color: "tomato" }}>*</span>
          </Text>
          <Select
            styles={attStyles}
            value={values.make}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () =>
                isMakes ? (
                  <Spinner />
                ) : (
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

        <Box>
          <Text color="#444648" fontSize="12px" fontWeight={500} mb="8px">
            Vehicle Model <span style={{ color: "tomato" }}>*</span>
          </Text>
          <Select
            menuPlacement="top"
            styles={attStyles}
            value={values.model}
            options={modelOptions}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () =>
                isModels ? (
                  <Spinner />
                ) : (
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

        <Box>
          <Text color="#444648" fontSize="12px" fontWeight={500} mb="8px">
            Color <span style={{ color: "tomato" }}>*</span>
          </Text>
          <Select
            menuPlacement="top"
            styles={attStyles}
            onMenuOpen={() => setMenuIsOpen(true)}
            menuIsOpen={menuIsOpen}
            onMenuClose={() => setMenuIsOpen(false)}
            components={{
              SingleValue: ColorOptio,
              Option: ColorOption,
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
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
      </Flex>

      <Button
        isDisabled={
          !values.color || !values.make || !values.model || !values.licensePlate
        }
        isLoading={isLoading || isAdd}
        onClick={handleSubmit}
        bg="#EE383A"
        h="50px"
        w="full"
        mt="32px"
      >
        Proceed
      </Button>
    </Box>
  );
};

export default index;
