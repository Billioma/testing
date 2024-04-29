import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomInput from "../../../common/CustomInput";
import { formatNewDate } from "../../../../utils/helpers";
import {
  useEditStaff,
  useGetStaffs,
} from "../../../../services/admin/query/staff";
import useCustomToast from "../../../../utils/notifications";
import { useGetRoles } from "../../../../services/admin/query/configurations";
import Select from "react-select";
import { customStyles } from "../../../common/constants";

export const Layout = ({
  label,
  data,
  type,
  form,
  email,
  holder,
  dis,
  options,
  onChange,
  select,
}) => {
  const handleKeyPress = (e, limit) => {
    if (limit && e.target.value.length >= limit) {
      e.preventDefault();
    }
  };
  return !form ? (
    <Flex
      align="center"
      mb="20px"
      justifyContent="space-between"
      w={{ base: "100%", md: "50%" }}
    >
      <Text fontSize="12px" w="full" fontWeight={700} color="#999999">
        {label}
      </Text>
      <Text
        textAlign={{ base: "end", md: "start" }}
        textTransform={email ? "lowercase" : "capitalize"}
        fontSize="14px"
        w="full"
        fontWeight={500}
        color="#090c02"
      >
        {data?.label || data}
      </Text>
    </Flex>
  ) : (
    <Flex flexDir="column" gap="20px" mb="20px">
      <Box>
        <Text
          mb="8px"
          fontSize="12px"
          textTransform={"capitalize"}
          fontWeight={500}
          color="#444648"
        >
          {label.toLowerCase()}
        </Text>
        {select ? (
          <Select
            styles={customStyles}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
            }}
            options={options}
            value={data}
            onChange={onChange}
            placeholder={holder}
          />
        ) : (
          <CustomInput
            ngn={type === "number"}
            dis={dis}
            // holder={!data ? "N/A" : ""}
            auth
            type={type}
            handleKeyPress={(e) =>
              type === "number" ? handleKeyPress(e, 11) : ""
            }
            mb
            value={data}
            onChange={onChange}
          />
        )}
      </Box>
    </Flex>
  );
};

const GeneralInfo = ({ data, refetch, id }) => {
  const [form, setForm] = useState(false);
  const [ids, setIds] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    staffId: "",
    role: "",
    dateOfBirth: new Date(),
    nextOfKin: "",
    guarantor1: "",
    guarantor2: "",
    nextOfKinAddress: "",
    residentialAddress: "",
    nextOfKinPhone: "",
    secondaryPhoneNumber: "",
    lineManager: "",
    secondaryResidentialAddress: "",
  });

  const { data: roles } = useGetRoles({}, 1, 1000);

  const { data: staffs } = useGetStaffs({}, 1, 1000);

  const roleOptions = roles?.data?.map((role) => ({
    label: role?.displayName,
    value: Number(role?.id),
  }));

  const staffsToMap = staffs?.data?.filter((item) => item?.id !== id);
  const staffOptions = staffsToMap?.map((staff) => ({
    label: staff?.fullName,
    value: Number(staff?.id),
  }));

  useEffect(() => {
    const selectedRoleOption = roleOptions?.find(
      (option) => option.value === Number(data?.role?.id)
    );
    const selectedStaffOption = staffOptions?.find(
      (option) => option.value === Number(data?.lineManager?.id)
    );
    setValues({
      ...values,
      fullName: data?.fullName,
      phoneNumber: data?.phoneNumber?.replace("+234", ""),
      secondaryPhoneNumber: data?.secondaryPhoneNumber?.replace("+234", ""),
      residentialAddress: data?.residentialAddress,
      secondaryResidentialAddress: data?.secondaryResidentialAddress,
      email: data?.email,
      guarantor1: data?.guarantor1,
      guarantor2: data?.guarantor2,
      dateOfBirth: data?.dateOfBirth,
      lineManager: selectedStaffOption,
      nextOfKin: data?.nextOfKin,
      nextOfKinAddress: data?.nextOfKinAddress,
      nextOfKinPhone: data?.nextOfKinPhone?.replace("+234", ""),
      staffId: data?.staffId,
      role: selectedRoleOption,
    });
  }, [data, roles, staffs]);

  const { successToast, errorToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } = useEditStaff({
    onSuccess: () => {
      successToast("Staff updated successfully!");
      refetch();
      setForm(false);
      setIds("");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    const {
      role,
      lineManager,
      phoneNumber,
      nextOfKinPhone,
      secondaryPhoneNumber,
      ...rest
    } = values;
    updateMutate({
      query: id,
      body: {
        ...rest,
        role: role?.value,
        phoneNumber: !phoneNumber ? "" : `+234${phoneNumber}`,
        secondaryPhoneNumber: !secondaryPhoneNumber
          ? ""
          : `+234${secondaryPhoneNumber}`,
        nextOfKinPhone: !nextOfKinPhone ? "" : `+234${nextOfKinPhone}`,
        lineManager: lineManager?.value,
      },
    });
  };

  const handleChange = (key, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <>
      <Flex
        bg="#fff"
        borderRadius="8px"
        py="30px"
        px={{ base: "15px", md: "34px" }}
        mt="24px"
        justifyContent="center"
        w="full"
        flexDir="column"
        border="1px solid #D9DBF1"
      >
        <Flex
          fontSize="18px"
          color="#090c02"
          justifyContent="space-between"
          w="full"
          borderBottom="1px solid #D9DBF1"
          pb="12px"
        >
          <Text fontWeight={700}>Personal Information</Text>

          <Flex
            align="center"
            gap="8px"
            onClick={() => {
              !ids && !form
                ? (setForm(true), setIds("personal"))
                : ids !== "personal" && form
                ? setIds("personal")
                : setForm((prev) => !prev);
            }}
            display={form && ids === "personal" ? "none" : "flex"}
            cursor="pointer"
          >
            <Image src="/assets/edit.jpg" w="24px" h="24px" />
            <Text fontWeight={500}>Edit</Text>
          </Flex>
        </Flex>

        <Box mt="20px">
          <Layout
            label="FULL NAME"
            data={values?.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            form={form && ids === "personal"}
          />
          <Layout
            form={form && ids === "personal"}
            label="PHONE NUMBER 1 (PRIMARY)"
            type="number"
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            data={form ? values?.phoneNumber : data?.phoneNumber}
          />
          <Layout
            form={form && ids === "personal"}
            label="PHONE NUMBER 2 (SECONDARY)"
            type="number"
            onChange={(e) =>
              handleChange("secondaryPhoneNumber", e.target.value)
            }
            data={
              form ? values?.secondaryPhoneNumber : data?.secondaryPhoneNumber
            }
          />
          <Layout
            form={form && ids === "personal"}
            label="RESIDENTIAL ADDRESS 1 (PRIMARY)"
            data={values?.residentialAddress}
            onChange={(e) => handleChange("residentialAddress", e.target.value)}
          />
          <Layout
            form={form && ids === "personal"}
            label="RESIDENTIAL ADDRESS 2 (SECONDARY)"
            data={values?.secondaryResidentialAddress || ""}
            onChange={(e) =>
              handleChange("secondaryResidentialAddress", e.target.value)
            }
          />
          <Layout
            form={form && ids === "personal"}
            label="EMAIL ADDRESS"
            email
            data={values?.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Layout
            form={form && ids === "personal"}
            dis
            label="GUARANTOR 1"
            data={values?.guarantor1}
            onChange={(e) => handleChange("guarantor1", e.target.value)}
          />
          <Layout
            form={form && ids === "personal"}
            dis
            label="GUARANTOR 2"
            data={values?.guarantor2}
            onChange={(e) => handleChange("guarantor2", e.target.value)}
          />
          <Layout
            dis
            form={form && ids === "personal"}
            label="DATE OF BIRTH"
            data={formatNewDate(values?.dateOfBirth)}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
          {form && (
            <Layout
              form={form && ids === "personal"}
              label="LINE MANAGER"
              select
              options={staffOptions}
              holder="Select line manager"
              data={values?.lineManager}
              onChange={(selectedOption) =>
                handleChange("lineManager", selectedOption)
              }
            />
          )}

          <Flex justifyContent="flex-end" w="full">
            <Flex
              gap="24px"
              mt="24px"
              display={form && ids === "personal" ? "flex" : "none"}
              w="25%"
              justifyContent="flex-end"
            >
              <Button
                variant="adminSecondary"
                isDisabled={isUpdating}
                w="40%"
                h="48px"
                border="1px solid #A11212"
                color="#A11212"
                onClick={() => setForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                isLoading={isUpdating}
                variant="adminPrimary"
                h="48px"
                w="60%"
              >
                Save
              </Button>
            </Flex>
          </Flex>

          <Flex
            display={form && ids === "personal" ? "none" : "flex"}
            mt="4px"
            align="center"
            gap="12px"
          >
            <Text fontWeight={500} color="#090c02">
              Line Manager:{" "}
            </Text>

            <Flex
              border="1px solid #D4D6D8"
              align="center"
              gap="8px"
              borderRadius="100px"
              p="4px"
            >
              <Flex rounded="full" bg="#D9D9D9" w="16px" h="16px"></Flex>
              <Text fontSize="14px" color="#090c02">
                {values?.lineManager?.label || ""}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Flex
        bg="#fff"
        borderRadius="8px"
        pt="30px"
        pb="10px"
        px="34px"
        mt="24px"
        justifyContent="center"
        w="full"
        flexDir="column"
        border="1px solid #D9DBF1"
      >
        <Flex
          fontSize="18px"
          color="#090c02"
          justifyContent="space-between"
          w="full"
          borderBottom="1px solid #D9DBF1"
          pb="12px"
        >
          <Text fontWeight={700}>Next of Kin</Text>

          <Flex
            align="center"
            gap="8px"
            onClick={() => {
              !ids && !form
                ? (setForm(true), setIds("kin"))
                : ids !== "kin" && form
                ? setIds("kin")
                : setForm((prev) => !prev);
            }}
            display={form && ids === "kin" ? "none" : "flex"}
            cursor="pointer"
          >
            <Image src="/assets/edit.jpg" w="24px" h="24px" />
            <Text fontWeight={500}>Edit</Text>
          </Flex>
        </Flex>
        <Box mt="20px">
          <Layout
            label="FULL NAME"
            data={values?.nextOfKin}
            form={form && ids === "kin"}
            onChange={(e) => handleChange("nextOfKin", e.target.value)}
          />
          <Layout
            form={form && ids === "kin"}
            label="PHONE NUMBER"
            data={form ? values?.nextOfKinPhone : data?.nextOfKinPhone}
            type="number"
            onChange={(e) => handleChange("nextOfKinPhone", e.target.value)}
          />
          <Layout
            form={form && ids === "kin"}
            label="RESIDENTIAL ADDRESS"
            data={values?.nextOfKinAddress}
            onChange={(e) => handleChange("nextOfKinAddress", e.target.value)}
          />

          <Flex justifyContent="flex-end" w="full">
            <Flex
              gap="24px"
              mt="24px"
              display={form && ids === "kin" ? "flex" : "none"}
              w="25%"
              justifyContent="flex-end"
            >
              <Button
                variant="adminSecondary"
                isDisabled={isUpdating}
                w="40%"
                h="48px"
                border="1px solid #A11212"
                color="#A11212"
                onClick={() => setForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                isLoading={isUpdating}
                variant="adminPrimary"
                h="48px"
                w="60%"
              >
                Save
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Flex
        bg="#fff"
        borderRadius="8px"
        pt="30px"
        pb="10px"
        px="34px"
        mt="24px"
        justifyContent="center"
        w="full"
        flexDir="column"
        border="1px solid #D9DBF1"
      >
        <Flex
          fontSize="18px"
          color="#090c02"
          justifyContent="space-between"
          w="full"
          borderBottom="1px solid #D9DBF1"
          pb="12px"
        >
          <Text fontWeight={700}>Company Information</Text>
          <Flex
            align="center"
            gap="8px"
            onClick={() => {
              !ids && !form
                ? (setForm(true), setIds("company"))
                : ids !== "company" && form
                ? setIds("company")
                : setForm((prev) => !prev);
            }}
            display={form && ids === "company" ? "none" : "flex"}
            cursor="pointer"
          >
            <Image src="/assets/edit.jpg" w="24px" h="24px" />
            <Text fontWeight={500}>Edit</Text>
          </Flex>
        </Flex>

        <Box mt="20px">
          <Layout
            label="STAFF ID"
            data={values?.staffId}
            form={form && ids === "company"}
            onChange={(e) => handleChange("staffId", e.target.value)}
          />
          <Layout
            form={form && ids === "company"}
            label="ROLE"
            select
            options={roleOptions}
            holder="Select role"
            data={form ? values?.role : values?.role?.label}
            onChange={(selectedOption) => handleChange("role", selectedOption)}
          />

          <Flex justifyContent="flex-end" w="full">
            <Flex
              gap="24px"
              mt="24px"
              display={form && ids === "company" ? "flex" : "none"}
              w="25%"
              justifyContent="flex-end"
            >
              <Button
                variant="adminSecondary"
                isDisabled={isUpdating}
                w="40%"
                h="48px"
                border="1px solid #A11212"
                color="#A11212"
                onClick={() => setForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                isLoading={isUpdating}
                variant="adminPrimary"
                h="48px"
                w="60%"
              >
                Save
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default GeneralInfo;
