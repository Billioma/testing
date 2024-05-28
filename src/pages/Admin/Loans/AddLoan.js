import React, { useState } from "react";
import { Box, Button, Flex, Skeleton, Spinner, Text } from "@chakra-ui/react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  initAdminLoanValues,
  validateAdminLoanSchema,
} from "../../../utils/validation";
import AdminTextInput from "../../../components/common/AdminTextInput";
import { Form, Formik } from "formik";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { IoIosArrowDown } from "react-icons/io";
import {
  useAdminCreateLoan,
  useGetStaffLoanBalance,
  useGetStaffs,
} from "../../../services/admin/query/staff";
import CustomInput from "../../../components/common/AdminCustomInput";

const AddLoan = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { errorToast, successToast } = useCustomToast();

  const { data: allStaff, isLoading: isStaff } = useGetStaffs({}, 1, 1000);

  const staffOptions = allStaff?.data?.map((staff) => ({
    label: staff?.fullName,
    value: Number(staff?.id),
  }));

  const navigate = useNavigate();
  const {
    mutate: balanceMutate,
    isLoading: isBalance,
    data: balance,
  } = useGetStaffLoanBalance();

  const { mutate, isLoading } = useAdminCreateLoan({
    onSuccess: () => {
      successToast("Loan created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_LOAN);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const purposes = [
    { label: "Medical", value: "Medical" },
    { label: "Travel", value: "Travel" },
    { label: "Personal", value: "Personal" },
    { label: "Emergency", value: "Emergency" },
    { label: "Transportation", value: "Transportation" },
    { label: "Housing", value: "Housing" },
    { label: "Others", value: "Others" },
  ];

  const purposesOptions = purposes?.map((purpose) => ({
    value: purpose?.value,
    label: purpose?.label,
  }));

  const handleSubmit = (values = "") => {
    const { staff, isPaid, purpose, ...rest } = values;
    mutate({
      purpose: purpose.value,
      staffId: staff.value,
      isPaid: isPaid?.value,
      ...rest,
    });
  };

  return (
    <Box minH="75vh">
      <GoBackTab />
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="28px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Text
              fontSize="18px"
              fontWeight={500}
              pb="10px"
              borderBottom="1px solid #E4E6E8"
            >
              Add Absense
            </Text>

            <Skeleton
              isLoaded={!isBalance}
              h={isBalance ? "60px" : ""}
              borderRadius="8px"
              mt="10px"
            >
              <Flex
                display={balance ? "flex" : "none"}
                pb="25px"
                borderBottom="1px solid #E4E6E8"
                color="#444648"
                fontSize="13px"
                mt="24px"
                align="center"
                justifyContent="space-between"
              >
                <Text fontWeight={500}>Loan Balance</Text>
                <Text fontWeight={700}>
                  ₦ {balance?.data?.loanBalance?.toLocaleString()}
                </Text>
              </Flex>
            </Skeleton>

            <Formik
              onSubmit={handleSubmit}
              initialValues={initAdminLoanValues}
              validationSchema={validateAdminLoanSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
              }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    handleSubmit(e);
                  }}
                >
                  <Flex flexDir="column" gap="24px" mt="24px">
                    <Box w="full" pb="25px" borderBottom="1px solid #E4E6E8">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Staff{" "}
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
                          formSubmitted && !values?.staff
                            ? errorCustomStyles
                            : customStyles
                        }
                        isDisabled={isStaff}
                        placeholder={
                          !isStaff ? "Select Staff" : <Spinner size="sm" />
                        }
                        options={staffOptions}
                        name="staff"
                        onChange={(selectedOption) => {
                          setValues({
                            ...values,
                            staff: selectedOption,
                          });
                          balanceMutate(selectedOption?.value);
                        }}
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

                      {formSubmitted && !values?.staff && (
                        <Text mt="8px" fontSize="13px" color="tomato">
                          Staff is required
                        </Text>
                      )}
                    </Box>

                    <Box w="full">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Amount{" "}
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
                        auth
                        mb
                        naira
                        holder="Enter Amount"
                        type="number"
                        name="amountRequested"
                        value={values?.amountRequested}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          (formSubmitted || touched?.amountRequested) &&
                          errors?.amountRequested
                        }
                      />
                    </Box>

                    <Box>
                      <Text fontWeight={700} mb="9px" fontSize="10px">
                        PURPOSE
                      </Text>
                      <Select
                        styles={
                          formSubmitted && !values?.purpose
                            ? errorCustomStyles
                            : customStyles
                        }
                        options={purposesOptions}
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
                        value={values?.purpose}
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            purpose: selectedOption,
                          })
                        }
                      />
                    </Box>

                    <Box w="full">
                      <Text
                        mb="8px"
                        fontSize="12px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Additional Comments
                      </Text>
                      <AdminTextInput
                        h="100px"
                        auth
                        mb
                        holder="Enter Additional Comments"
                        name="additionalComments"
                        value={values?.additionalComments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          (formSubmitted || touched?.additionalComments) &&
                          errors?.additionalComments
                        }
                      />
                    </Box>
                  </Flex>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="45%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_LOAN)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="55%"
                      isLoading={isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddLoan;
