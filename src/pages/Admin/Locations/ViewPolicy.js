import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useEditPolicy,
  useGetAdminPolicy,
  useGetLocations,
} from "../../../services/admin/query/locations";
import Select from "react-select";
import { customStyles, statusType } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";

export default function ViewPolicy() {
  const [values, setValues] = useState({
    title: "",
    body: "",
    status: "",
    location: "",
  });

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditPolicy({
    onSuccess: () => {
      successToast("Policy updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_POLICIES);
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

  const { id } = useParams();
  const { mutate, isLoading, data } = useGetAdminPolicy();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { data: locations } = useGetLocations({}, 1, 1000);

  const locationOptions = locations?.data?.map((location) => ({
    label: location?.name,
    value: parseInt(location?.id),
  }));

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );
    const selectedLocationOption = locationOptions?.find(
      (option) => option?.value === Number(data?.location?.id)
    );

    setValues({
      ...values,
      title: data?.title,
      body: data?.body,
      location: selectedLocationOption,
      status: selectedStatusOption,
    });
  }, [data, locations]);

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
        title: values?.title,
        body: values?.body,
        status: values?.status?.value,
        location: Number(values?.location?.value),
      },
    });
  };

  return (
    <Box minH="75vh">
      {" "}
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
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
                    Title
                  </Text>
                  <CustomInput
                    auth
                    value={values?.title}
                    mb
                    holder="Enter policy title"
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
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
                    Description
                  </Text>
                  <CustomInput
                    auth
                    value={values?.body}
                    mb
                    holder="Enter policy description"
                    onChange={(e) =>
                      setValues({ ...values, body: e.target.value })
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
                    Location
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select location"
                    options={locationOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "location",
                      })
                    }
                    value={values?.location}
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
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>
                  <Select
                    styles={customStyles}
                    options={statusOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
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
                    value={values?.status}
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
                        : (navigate(PRIVATE_PATHS.ADMIN_POLICIES),
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
