import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Switch,
  Spinner,
  Image,
  Input,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { customStyles, statusType } from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useGetClients,
  useUpdateClientEvent,
} from "../../../services/admin/query/clients";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import { IoIosArrowDown } from "react-icons/io";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { useGetAdminEvent } from "../../../services/admin/query/users";
import { formatDateToISOString } from "../../../utils/helpers";
import { useGetZones } from "../../../services/admin/query/locations";

export default function ViewEvent() {
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [values, setValues] = useState({
    image: "",
    name: "",
    description: "",
    address: "",
    website: "",
    eventStartDateTime: "",
    eventEndDateTime: "",
    client: "",
    status: "",
    zones: "",
    price: "",
    paymentRequired: "",
  });

  const { id } = useParams();

  const { mutate, data, isLoading } = useGetAdminEvent();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const { data: zones } = useGetZones({}, 1, 1000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: parseInt(zone?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

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
      fileType: "image",
      entityType: "admin",
      file: formData.get("file"),
    });
  };

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useUpdateClientEvent({
    onSuccess: () => {
      successToast("Event updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_EVENTS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: clients } = useGetClients({}, 1, 10000);

  const clientOptions = clients?.data?.map((client) => ({
    label: client?.name,
    value: parseInt(client?.id),
  }));

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );
    const selectedClientOption = clientOptions?.find(
      (option) => option?.value === Number(data?.client?.id)
    );
    const selectedZonesOption = data?.zones?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));
    setValues({
      ...values,
      image: data?.image?.replace("https://staging-api.ezpark.ng/", ""),
      name: data?.name,
      description: data?.description,
      address: data?.address,
      website: data?.website,
      price: data?.price,
      paymentRequired: data?.paymentRequired,
      eventStartDateTime: data?.eventStartDateTime,
      eventEndDateTime: data?.eventEndDateTime,
      status: selectedStatusOption,
      client: selectedClientOption,
      zones: selectedZonesOption,
    });
  }, [data, zones, clients]);

  const handleSubmit = () => {
    values?.paymentRequired
      ? updateMutate({
          query: id,
          body: {
            image: profilePicData?.path || values?.image,
            name: values?.name,
            description: values?.description,
            address: values?.address,
            website: values?.website,
            price: values?.price,
            paymentRequired: 1,
            eventStartDateTime: formatDateToISOString(
              values?.eventStartDateTime
            ),
            zones: values?.zones?.map((item) => item?.value),

            eventEndDateTime: formatDateToISOString(values?.eventEndDateTime),
            status: values?.status?.value,
            client: values?.client?.value,
          },
        })
      : updateMutate({
          query: id,
          body: {
            image: profilePicData?.path || values?.image,
            name: values?.name,
            description: values?.description,
            address: values?.address,
            website: values?.website,
            zones: values?.zones?.map((item) => item?.value),

            paymentRequired: 0,
            eventStartDateTime: formatDateToISOString(
              values?.eventStartDateTime
            ),
            eventEndDateTime: formatDateToISOString(values?.eventEndDateTime),
            status: values?.status?.value,
            client: values?.client?.value,
          },
        });
  };

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
                w={{ base: "100%", md: "30rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box
                  alignSelf={"center"}
                  justifyContent={"center"}
                  mb={5}
                  display="flex"
                  flexDir="column"
                >
                  <Text
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                    textAlign="center"
                  >
                    Event image
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
                            data?.image === null ? "none" : "4px solid #0D0718"
                          }
                          h="120px"
                          borderRadius="12px"
                          src={
                            fileType
                              ? fileType
                              : data?.image === null
                              ? "/assets/prof-avatar.jpg"
                              : process.env.REACT_APP_BASE_URL + data?.image
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
                    Event Name
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
                    Event Description
                  </Text>
                  <CustomInput
                    auth
                    value={values?.description}
                    mb
                    holder="Describe event"
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
                    Event Address
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
                    Event Website
                  </Text>
                  <CustomInput
                    auth
                    value={values?.website}
                    mb
                    holder="Enter event website"
                    onChange={(e) =>
                      setValues({ ...values, website: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontWeight={500}
                    color="#444648"
                    fontSize="10px"
                  >
                    Event Start Date & Timee
                  </Text>
                  <DateTimePicker
                    selectedDate={values?.eventStartDateTime || new Date()}
                    onChange={(date) =>
                      setValues({
                        ...values,
                        eventStartDateTime: new Date(date),
                      })
                    }
                    hasTime
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontWeight={500}
                    color="#444648"
                    fontSize="10px"
                  >
                    Event End Date & Timee
                  </Text>
                  <DateTimePicker
                    selectedDate={values?.eventEndDateTime || new Date()}
                    onChange={(date) =>
                      setValues({ ...values, eventEndDateTime: new Date(date) })
                    }
                    hasTime
                    isDisabled={edit ? false : true}
                  />
                </Box>

                {values?.eventEndDateTime < values?.eventStartDateTime && (
                  <Text
                    mt={-3}
                    fontSize="13px"
                    mb={4}
                    color="tomato"
                    fontWeight={500}
                  >
                    Event's end date is before its start date
                  </Text>
                )}

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Client
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select client"
                    options={clientOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "client",
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
                    value={values.client}
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
                    Assign Zones
                  </Text>
                  <Select
                    isMulti
                    styles={customStyles}
                    placeholder="Select zones"
                    options={zoneOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "zones",
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
                    value={values?.zones}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Event Status
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
                  mt={2}
                >
                  <Text fontSize="12px" fontWeight={500} color="#444648">
                    Add Event Price
                  </Text>
                  <Switch
                    onChange={() =>
                      setValues({
                        ...values,
                        paymentRequired: values?.paymentRequired ? 0 : 1,
                      })
                    }
                    isChecked={values?.paymentRequired ? true : false}
                    value={values?.paymentRequired}
                    size="sm"
                    variant="adminPrimary"
                    isDisabled={edit ? false : true}
                  />
                  {console.log(values?.paymentRequired)}
                </Flex>

                {values?.paymentRequired ? (
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Event Price
                    </Text>
                    <CustomInput
                      auth
                      value={values?.price}
                      mb
                      holder="Enter event price"
                      onChange={(e) =>
                        setValues({ ...values, price: e.target.value })
                      }
                      dis={edit ? false : true}
                    />
                  </Box>
                ) : null}

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_EVENTS),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="adminPrimary"
                    w="100%"
                    isDisabled={
                      values?.eventEndDateTime < values?.eventStartDateTime
                    }
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
