import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Spinner } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import ConfirmDeleteModal from "../../../../components/modals/ConfirmDeleteModal";
import {
  useDeletePolicy,
  useGetPolicy,
  useUpdatePolicy,
} from "../../../../services/operator/query/locations";
import { useGetLocations } from "../../../../services/customer/query/locations";

const PolicyDetails = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  const isEdit = sessionStorage.getItem("edit");
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetPolicy();
  const { data: allLocations } = useGetLocations();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const locationOptions = allLocations?.map((state) => ({
    value: state?.id,
    label: state?.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #d4d6d8",
      paddingRight: "16px",
      background: "unset",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f4f6f8",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#d4d6d8" : "",
    }),
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const selectedLocationOption = locationOptions?.find(
      (option) => option.value === data?.location?.id
    );

    setValues({
      ...values,
      title: data?.title,
      body: data?.body,
      location: selectedLocationOption,
    });
  }, [data, edit]);

  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } = useUpdatePolicy({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/policies");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const [showDelete, setShowDelete] = useState(false);
  const { mutate: deleteMutate, isLoading: isDeleting } = useDeletePolicy({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/policies");
      setShowDelete(false);
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleDelete = () => {
    deleteMutate(id);
  };

  const handleUpdate = () => {
    updateMutate({
      query: id,
      body: {
        title: values.title,
        body: values.body,
        location: values?.location?.value,
        status: 1,
      },
    });
  };

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  return (
    <Box minH="75vh">
      <Flex align="flex-start">
        <Flex
          onClick={() => navigate(-1)}
          color="#242628"
          align="center"
          cursor="pointer"
          mb="23px"
          w="fit-content"
          pos="sticky"
          top="7rem"
          gap="8px"
        >
          <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
          <Text fontSize="14px" fontWeight={500} lineHeight="100%">
            Back
          </Text>
        </Flex>

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
                borderRadius="12px"
                border="1px solid #D4D6D8"
                px="28px"
                py="32px"
                justifyContent="center"
                align="center"
                w={{ base: "full", md: "27rem" }}
                flexDir="column"
              >
                <Box mt="24px" w="full">
                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Policy Title
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
                      value={values.title}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          title: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Box my="16px">
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Body
                    </Text>
                    <CustomInput
                      auth
                      mb
                      isDisabled={edit ? false : true}
                      value={values.body}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          body: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      fontWeight={500}
                      mb="8px"
                      lineHeight="100%"
                    >
                      Select Location
                    </Text>
                    <Select
                      styles={customStyles}
                      isDisabled={edit ? false : true}
                      value={values.location}
                      options={locationOptions}
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
                          name: "location",
                        })
                      }
                    />
                  </Box>
                </Box>

                <Flex mt="24px" align="center" w="full" gap="24px">
                  <Button
                    bg="transparent"
                    w="70%"
                    border="1px solid #646668"
                    color="#646668"
                    fontWeight={500}
                    lineHeight="100%"
                    fontSize="14px"
                    onClick={() =>
                      edit ? setEdit(false) : setShowDelete(true)
                    }
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    _focus={{ bg: "transparent" }}
                    px="26px"
                    py="17px"
                  >
                    {edit ? "Cancel" : "Delete"}
                  </Button>
                  <Button
                    color="#fff"
                    fontWeight={500}
                    lineHeight="100%"
                    isLoading={isUpdating}
                    w="full"
                    onClick={() => (!edit ? setEdit(true) : handleUpdate())}
                    fontSize="12px"
                    px="26px"
                    py="17px"
                  >
                    {edit ? "Save" : "Edit"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>

      <ConfirmDeleteModal
        title="Policy"
        action={handleDelete}
        isLoading={isDeleting}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default PolicyDetails;
