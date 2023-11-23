import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { allStates, colorTypes } from "../../../components/common/constants";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useEditVehicle,
  useGetAdminVehicle,
  useGetMake,
  useGetModel,
} from "../../../services/admin/query/vehicles";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import { IoIosArrowDown } from "react-icons/io";

export default function AddOperator() {
  const { data: models } = useGetModel();
  const { data: makes } = useGetMake();
  const { data: customers } = useGetAllCustomers();
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const isEdit = sessionStorage.getItem("edit");

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const { id } = useParams();
  const [values, setValues] = useState({
    licensePlate: "",
    customer: "",
    color: "",
    state: "",
    make: "",
    model: "",
  });

  const [edit, setEdit] = useState(false);

  const { mutate, data, isLoading } = useGetAdminVehicle();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { mutate: updateMutate, isLoading: isUpdating } = useEditVehicle({
    onSuccess: () => {
      successToast("Vehicle updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_VEHICLES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));

  const colorOptions = colorTypes.map((color) => ({
    value: color.color,
    label: color.label,
  }));
  const modelToMap = models?.data?.filter(
    (item) => Number(item?.make?.id) === values?.make?.value
  );
  const model = values?.make ? modelToMap : models?.data;
  const modelOptions = model?.map((model) => ({
    value: parseInt(model?.id),
    label: model?.name,
  }));

  const makeOptions = makes?.data?.map((make) => ({
    value: parseInt(make?.id),
    label: make?.name,
  }));

  const customerOptions = customers?.data?.map((customer) => ({
    value: parseInt(customer?.id),
    label: `${customer?.profile.firstName} ${customer?.profile.lastName}`,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        licensePlate: values?.licensePlate,
        customer: values?.customer?.value,
        color: values?.color?.label,
        state: values?.state?.value,
        make: values?.make?.value,
        model: values?.model?.value,
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

  useEffect(() => {
    const selectedCustomerOption = customerOptions?.find(
      (option) => option.value === Number(data?.customer?.id)
    );
    const selectedColorOption = data?.color?.includes("#")
      ? colorOptions?.find(
          (option) =>
            option?.value?.toLocaleLowerCase() ===
            data?.color?.toLocaleLowerCase()
        )
      : colorOptions?.find(
          (option) =>
            option?.label?.toLocaleLowerCase() ===
            data?.color?.toLocaleLowerCase()
        );
    const selectedStateOption = stateOptions?.find(
      (option) => option.value === data?.state
    );
    const selectedMakeOption = makeOptions?.find(
      (option) => option.value === Number(data?.make?.id)
    );
    const selectedModelOption = modelOptions?.find(
      (option) => option.value === Number(data?.model?.id)
    );

    setValues({
      ...values,
      licensePlate: data?.licensePlate,
      customer: selectedCustomerOption,
      color: selectedColorOption,
      state: selectedStateOption,
      make: selectedMakeOption,
      model: selectedModelOption,
    });
  }, [data, customers, makes, models]);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ base: "100%", md: "30rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    License Plate
                  </Text>
                  <CustomInput
                    auth
                    value={values?.licensePlate}
                    mb
                    holder="Enter license plate"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        licensePlate: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Assign Customer
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select customer"
                    options={customerOptions}
                    value={values?.customer}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "customer",
                      })
                    }
                    isDisabled={edit ? false : true}
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

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Vehicle State
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select vehicle state"
                    options={stateOptions}
                    value={values?.state}
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
                      handleSelectChange(selectedOption, {
                        name: "state",
                      })
                    }
                    isDisabled={edit ? false : true}
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
                    placeholder="Select vehicle make"
                    value={values?.make}
                    isDisabled={edit ? false : true}
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
                <Box mb="24px">
                  <Text
                    color="#444648"
                    lineHeight="100%"
                    fontSize="10px"
                    fontWeight={500}
                    mb="8px"
                  >
                    Select Vehicle Model
                  </Text>
                  <Select
                    styles={customStyles}
                    options={modelOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, { name: "model" })
                    }
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
                    placeholder="Select vehicle model"
                    value={values?.model}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_VEHICLES),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="adminPrimary"
                    w="100%"
                    isLoading={isUpdating}
                    onClick={() => (!edit ? setEdit(true) : handleSubmit())}
                  >
                    {!edit ? "Edit" : "Save"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>{" "}
          </>
        )}
      </Flex>
    </Box>
  );
}
