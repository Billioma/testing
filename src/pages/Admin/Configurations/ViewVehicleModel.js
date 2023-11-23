import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import {
  useEditModel,
  useGetAdminVehicleModel,
  useGetMakes,
} from "../../../services/admin/query/configurations";
import { IoIosArrowDown } from "react-icons/io";
export default function AddVehicleMake() {
  const [values, setValues] = useState({
    name: "",
    model: "",
  });

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { data: makes } = useGetMakes({}, 1, 10000);
  const { mutate: updateMutate, isLoading: isUpdating } = useEditModel({
    onSuccess: () => {
      successToast("Model updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { id } = useParams();
  const { mutate, data, isLoading } = useGetAdminVehicleModel();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const makeOptions = makes?.data?.map((make) => ({
    label: make.name,
    value: parseInt(make.id),
  }));

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
        make: values?.make?.value,
      },
    });
  };

  useEffect(() => {
    const selectedMakeOption = makeOptions?.find(
      (option) => option.value === Number(data?.make?.id)
    );
    setValues({
      ...values,
      name: data?.name,
      make: selectedMakeOption,
    });
  }, [data, makes]);

  return (
    <Box minH="75vh">
      {" "}
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
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
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
                    Model Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter model name"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Make
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select make"
                    options={makeOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "make",
                      })
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
                    value={values?.make}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS),
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
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
