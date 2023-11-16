import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useAddAmenity } from "../../../services/admin/query/amenities";
import { customStyles, statusType } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";
import { Formik, Form } from "formik";
import {
  initAdminAmenitiesValues,
  validateAdminAmenitiesSchema,
} from "../../../utils/validation";

export default function AddAmenity() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddAmenity({
    onSuccess: () => {
      successToast("Amenity added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_AMENITIES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleSubmit = (values = "") => {
    const { status, ...rest } = values;
    mutate({
      ...rest,
      status: status?.value,
    });
  };

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <GoBackTab />
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="28px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initAdminAmenitiesValues}
              validationSchema={validateAdminAmenitiesSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
                isValid,
                dirty,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter amenity name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.name && touched?.name && errors?.name}
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Description
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter amenity description"
                      name="description"
                      value={values?.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.description &&
                        touched?.description &&
                        errors?.description
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
                      Select Status
                    </Text>
                    <Select
                      styles={customStyles}
                      options={statusOptions}
                      name="status"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          status: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
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
                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_AMENITIES)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isDisabled={!isValid || !dirty}
                      isLoading={isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>{" "}
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
