import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  allStates,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useGetAdministrators,
  useGetOperators,
} from "../../../services/admin/query/users";
import { useGetAmenities } from "../../../services/admin/query/amenities";
import {
  useEditLocation,
  useGetAdminLocation,
} from "../../../services/admin/query/locations";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { IoIosArrowDown } from "react-icons/io";

export default function ViewLocation() {
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditLocation({
    onSuccess: () => {
      successToast("Location updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_LOCATIONS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { id } = useParams();

  const {
    mutate: uploadMutate,
    isLoading: isUploading,
    data: profilePicData,
  } = useCustomerUploadPic({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const [fileType, setFileType] = useState("");

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadMutate({
      fileType: "picture",
      entityType: "admin",
      file: formData.get("file"),
    });
  };
  const { mutate, data, isLoading } = useGetAdminLocation();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: managers } = useGetAdministrators({}, 1, 1000);
  const { data: amenities } = useGetAmenities({}, 1, 1000);

  const [values, setValues] = useState({
    picture: "",
    name: "",
    description: "",
    geoLocation: "",
    address: "",
    state: "",
    operator: "",
    locationType: "",
    amenities: "",
    managers: "",
    status: "",
    enableTips: 0,
  });

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const managerOptions = managers?.data?.map((manager) => ({
    label: `${manager?.firstName} ${manager?.lastName}`,
    value: parseInt(manager?.id),
  }));

  const amenitiesOptions = amenities?.data?.map((amenity) => ({
    label: amenity?.name,
    value: parseInt(amenity?.id),
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    value: parseInt(operator?.id),
    label: operator?.name,
  }));

  const stateOptions = allStates?.map((state) => ({
    label: state,
    value: state,
  }));

  const locationTypeOptions = [
    "RESTAURANT CAFE",
    "BAR LOUNGE NIGHTCLUB",
    "OFFICE BUILDING",
    "EVENT CENTER",
    "SPORTING CENTER",
    "HOTEL CONFERENCE CENTER",
    "HALL SHIPPING CENTER",
    "GARAGE PARKING LOT",
  ].map((type, index) => ({ label: type, value: index }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  useEffect(() => {
    const selectedStateOption = stateOptions?.find(
      (option) => option?.label === data?.state
    );
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );
    const selectedOperatorOption = operatorOptions?.find(
      (option) => option?.value === Number(data?.operator?.id)
    );
    const selectedLocationOption = locationTypeOptions?.find(
      (option) => option?.value === data?.locationType
    );
    const selectedManagersOption = data?.managers?.map((item) => ({
      value: item?.id,
      label: `${item?.firstName} ${item?.lastName}`,
    }));
    const selectedAmenitiesOption = data?.amenities?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));
    setValues({
      ...values,
      picture: data?.picture?.replace("https://staging-api.ezpark.ng/", ""),
      name: data?.name,
      description: data?.description,
      geoLocation: data?.geoLocation,
      address: data?.address,
      locationType: selectedLocationOption,
      amenities: selectedAmenitiesOption,
      state: selectedStateOption,
      operator: selectedOperatorOption,
      status: selectedStatusOption,
      enableTips: data?.enableTips,
      managers: selectedManagersOption,
    });
  }, [data, operators, amenities, managers]);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        picture: profilePicData?.path,
        name: values?.name,
        description: values?.description,
        geoLocation: values?.geoLocation,
        address: values?.address,
        operator: values?.operator?.value,
        locationType: values?.locationType?.value,
        amenities: values?.amenities?.map((item) => item?.value),
        state: values?.state?.value,
        status: values?.status?.value,
        enableTips: values?.enableTips,
        managers: values?.managers?.map((item) => item?.value),
      },
    });
  };

  return (
    <Box minH="75vh">
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
                <Box alignSelf={"center"} w="full" mb={5}>
                  <Text
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                    textAlign="center"
                  >
                    Location Image
                  </Text>
                  <Input
                    id="image_upload"
                    isDisabled={edit ? false : true}
                    onChange={handleUpload}
                    type="file"
                    display="none"
                  />
                  <label htmlFor="image_upload">
                    <Flex
                      flexDir="column"
                      justifyContent="center"
                      align="center"
                      cursor={edit ? "pointer" : ""}
                      w="full"
                    >
                      {isUploading ? (
                        <Flex
                          w="120px"
                          border="4px solid #0D0718"
                          justifyContent="center"
                          align="center"
                          h="120px"
                          borderRadius="12px"
                        >
                          <Spinner />
                        </Flex>
                      ) : (
                        <Image
                          objectFit="cover"
                          w="120px"
                          border={
                            data?.picture === null
                              ? "none"
                              : "4px solid #0D0718"
                          }
                          h="120px"
                          borderRadius="12px"
                          src={
                            fileType
                              ? fileType
                              : data?.picture === null
                              ? "/assets/prof-avatar.jpg"
                              : process.env.REACT_APP_BASE_URL + data?.picture
                          }
                        />
                      )}
                    </Flex>
                  </label>
                </Box>
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Location Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter event name"
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
                    Location Description
                  </Text>
                  <CustomInput
                    opt
                    auth
                    value={values?.description}
                    mb
                    holder="Enter location description"
                    onChange={(e) =>
                      setValues({ ...values, description: e.target.value })
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
                    GeoLocation
                  </Text>
                  <CustomInput
                    auth
                    value={values?.geoLocation}
                    mb
                    holder="Enter geolocation"
                    onChange={(e) =>
                      setValues({ ...values, geoLocation: e.target.value })
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
                    Location Address
                  </Text>
                  <CustomInput
                    auth
                    value={values?.address}
                    mb
                    holder="Enter event address"
                    onChange={(e) =>
                      setValues({ ...values, address: e.target.value })
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
                    State
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select state"
                    options={stateOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "state",
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
                    value={values?.state}
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
                    Operator
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select operator"
                    options={operatorOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "operator",
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
                    value={values?.operator}
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
                    Location Type
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select location type"
                    options={locationTypeOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "locationType",
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
                    value={values?.locationType}
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
                    Assign Amenities
                  </Text>
                  <Select
                    isMulti
                    styles={customStyles}
                    placeholder="Select amenities"
                    options={amenitiesOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "amenities",
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
                    value={values?.amenities}
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
                    Assign Manager
                  </Text>
                  <Select
                    isMulti
                    styles={customStyles}
                    placeholder="Select manager(s)"
                    options={managerOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "managers",
                      })
                    }
                    value={values?.managers}
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

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                  mt={4}
                >
                  <Text fontSize="12px" fontWeight={500} color="#444648">
                    Enable Tips
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        enableTips: values?.enableTips ? 0 : 1,
                      })
                    }
                    isChecked={values?.enableTips}
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_LOCATIONS),
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
