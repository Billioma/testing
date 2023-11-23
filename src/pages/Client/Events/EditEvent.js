import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Switch,
  Text,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import useCustomToast from "../../../utils/notifications";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineFolderOpen } from "react-icons/ai";
import {
  formatDate,
  formatHour,
  formatNewDate,
  formatTimeMinute,
  formatTimeToHHMMSS,
} from "../../../utils/helpers";
import { Calendar } from "react-calendar";
import Select from "react-select";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import {
  useEditEvent,
  useGetEventDetails,
  useGetEvents,
} from "../../../services/client/query/events";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const EditEvent = () => {
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    desc: "",
    address: "",
    website: "",
    arrivalTime: "",
    departureTime: "",
    paymentRequired: false,
    price: "",
    img: "",
  });

  const isDisabled = Object.keys(values)
    .filter(
      (key) => key !== "price" && key !== "img" && key !== "paymentRequired"
    )
    .some((key) => !values[key]);

  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");
  const [endValue, endChange] = useState("");
  const [endDate, setEndDate] = useState(false);

  const today = new Date();
  const firstHour = formatHour(today);
  const lastMinute = formatTimeMinute(today);
  const generateTimeArrays = (date) => {
    const times = [];

    const shouldStartFromNow = formatNewDate(date) === formatNewDate(today);
    const startHour = shouldStartFromNow
      ? Number(lastMinute) === 45 || Number(lastMinute) === 0
        ? Number(firstHour) + 1
        : Number(firstHour)
      : 0;
    const startMinute = shouldStartFromNow
      ? Number(lastMinute) === 45
        ? 0
        : Number(lastMinute)
      : 0;
    for (let hour = startHour; hour < 24; hour++) {
      for (let minute = startMinute; minute < 60; minute += 15) {
        const isPM = hour >= 12;
        const hourFormatted = (hour % 12 || 12).toString().padStart(2, "0");
        const minuteFormatted = minute.toString().padStart(2, "0");
        const period = isPM ? "PM" : "AM";
        const time = `${hourFormatted}:${minuteFormatted} ${period}`;
        times.push(time);
      }
    }

    return times;
  };

  const timeArrays = generateTimeArrays(startValue);
  const timeArray = generateTimeArrays(endValue);
  const timeOptions = timeArrays?.map((time) => ({
    value: time,
    label: time,
  }));
  const secTimeOptions = timeArray?.map((time) => ({
    value: time,
    label: time,
  }));
  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const start = formatDate(startValue);
  const end = formatDate(endValue);

  const startDateRange = new Date();

  const isDateDisabled = (date) => {
    return date < startDateRange;
  };
  const handleEndDateChange = (date) => {
    if (!isDateDisabled(date)) {
      endChange(date);
    }
    setEndDate(false);
  };

  const handleDateChange = (date) => {
    if (!isDateDisabled(date)) {
      startChange(date);
    }
    setStartDate(false);
  };

  const tileClassName = ({ date }) => {
    if (date.getDate() === startDateRange.getDate()) {
      return "selected-date";
    }
    if (isDateDisabled(date)) {
      return "disabled-date";
    }
    return null;
  };

  const formattedDate = `${start.substr(6, 4)}-${start.substr(
    0,
    2
  )}-${start.substr(3, 2)} ${formatTimeToHHMMSS(values?.arrivalTime?.value)}`;
  const formattedDeparture = `${end.substr(6, 4)}-${end.substr(
    0,
    2
  )}-${end.substr(3, 2)} ${formatTimeToHHMMSS(values?.departureTime?.value)}`;

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
      entityType: "client",
      file: formData.get("file"),
    });
  };

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
  const { id } = useParams();

  const { mutate: eventMutate } = useGetEvents();
  const { mutate: detailsMutate, data: eventDetails } = useGetEventDetails();

  useEffect(() => {
    detailsMutate(id);
  }, [id]);

  const { mutate, isLoading } = useEditEvent({
    onSuccess: () => {
      successToast("Event Updated");
      eventMutate({ limit: 10, page: 1 });
      navigate("/client/events");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleCreate = () => {
    values.paymentRequired
      ? mutate({
          query: id,
          body: {
            address: values?.address,
            description: values?.desc,
            eventStartDateTime: formattedDate,
            eventEndDateTime: formattedDeparture,
            image: profilePicData?.path,
            name: values?.name,
            website: values?.website,
            paymentRequired: 1,
            price: values.price,
          },
        })
      : mutate({
          query: id,
          body: {
            address: values?.address,
            description: values?.desc,
            eventStartDateTime: formattedDate,
            eventEndDateTime: formattedDeparture,
            image: profilePicData?.path,
            name: values?.name,
            website: values?.website,
            paymentRequired: 0,
          },
        });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setStartDate(false);
        setEndDate(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const formattedTime = new Date(
    eventDetails?.eventStartDateTime
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
  const formattedEndTime = new Date(
    eventDetails?.eventEndDateTime
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  useEffect(() => {
    if (eventDetails) {
      const selectedStartTimeOption = timeOptions?.find(
        (option) => option?.label === formattedTime
      );
      const selectedEndTimeOption = secTimeOptions?.find(
        (option) => option?.label === formattedEndTime
      );
      startChange(formatDate(eventDetails?.eventStartDateTime));
      endChange(formatDate(eventDetails?.eventEndDateTime));
      setValues({
        name: eventDetails?.name,
        desc: eventDetails?.description,
        website: eventDetails?.website,
        address: eventDetails?.address,
        paymentRequired: eventDetails?.paymentRequired === 1 ? true : false,
        price: eventDetails?.price,
        arrivalTime: selectedStartTimeOption,
        img: eventDetails?.image,
        departureTime: selectedEndTimeOption,
      });
    }
  }, [eventDetails]);

  return (
    <Box minH="75vh">
      <Flex
        onClick={() => navigate(-1)}
        color="#242628"
        align="center"
        cursor="pointer"
        w="fit-content"
        gap="8px"
      >
        <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
        <Text fontSize="14px" fontWeight={500} lineHeight="100%">
          Back
        </Text>
      </Flex>
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          border="1px solid #E4E6E8"
          py="24px"
          px="28px"
          justifyContent="center"
          w={{ base: "full", md: "25rem" }}
          flexDir="column"
        >
          <Input
            id="image_upload"
            onChange={handleUpload}
            type="file"
            display="none"
            borderColor="black"
          />
          <label htmlFor="image_upload">
            <Flex
              flexDir="column"
              justifyContent="center"
              align="center"
              h="120px"
              bg="#F4F6F8"
              borderRadius="12px"
              cursor="pointer"
              border="2px solid #848688"
              w="full"
              color="#646668"
            >
              {isUploading ? (
                <Spinner />
              ) : fileType || values?.img ? (
                <Image
                  rounded="full"
                  objectFit="cover"
                  h="90px"
                  w="90px"
                  src={fileType || process.env.REACT_APP_BASE_URL + values?.img}
                />
              ) : (
                values.img === null && (
                  <Flex flexDir="column" justifyContent="center" align="center">
                    <AiOutlineFolderOpen size="32px" />
                    <Text
                      mt="8px"
                      fontSize="10px"
                      lineHeight="100%"
                      fontWeight={500}
                    >
                      Add Event Image
                    </Text>
                  </Flex>
                )
              )}
            </Flex>
          </label>

          <Box my="24px">
            <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
              Event Name
            </Text>
            <CustomInput
              auth
              mb
              holder="Enter event name"
              value={values.name}
              onChange={(e) => {
                setValues({
                  ...values,
                  name: e.target.value,
                });
              }}
            />
          </Box>

          <Box>
            <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
              Event Description
            </Text>
            <CustomInput
              auth
              mb
              holder="Enter event description"
              value={values.desc}
              onChange={(e) => {
                setValues({
                  ...values,
                  desc: e.target.value,
                });
              }}
            />
          </Box>

          <Box my="24px">
            <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
              Event Address
            </Text>
            <CustomInput
              auth
              mb
              holder="Enter event address"
              value={values.address}
              onChange={(e) => {
                setValues({
                  ...values,
                  address: e.target.value,
                });
              }}
            />
          </Box>

          <Box>
            <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
              Event Website
            </Text>
            <CustomInput
              auth
              mb
              holder="Enter event website"
              value={values.website}
              onChange={(e) => {
                setValues({
                  ...values,
                  website: e.target.value,
                });
              }}
            />
          </Box>

          <Flex align="center" gap="16px" my="24px">
            <Box w="full">
              <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
                Event Start Date
              </Text>

              <Box pos="relative" w="full" className="box">
                <Flex
                  fontSize="14px"
                  onClick={() => setStartDate((prev) => !prev)}
                  align="center"
                  justifyContent="space-between"
                  w="full"
                  bg={start ? "#F4F6F8" : "transparent"}
                  color={start ? "#000" : ""}
                  h="44px"
                  cursor="pointer"
                  borderRadius="4px"
                  border="1px solid #D4D6D8"
                  py="12px"
                  px="16px"
                >
                  <Text>{start ? start : "Select Date"}</Text>

                  <Image src="/assets/cal.svg" w="20px" h="20px" />
                </Flex>
                {startDate && (
                  <Box pos="absolute" top="50px" w="200%" zIndex="3">
                    <Calendar
                      onChange={handleDateChange}
                      value={startValue}
                      minDate={startDateRange}
                      tileClassName={tileClassName}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box w="full">
              <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
                Event Start Time
              </Text>

              <Select
                styles={customStyles}
                placeholder="Select Time"
                options={timeOptions}
                value={values.arrivalTime}
                components={{
                  IndicatorSeparator: () => (
                    <div style={{ display: "none" }}></div>
                  ),
                  DropdownIndicator: () => (
                    <Image
                      src="/assets/clock.svg"
                      mr="16px"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ),
                }}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, {
                    name: "arrivalTime",
                  })
                }
              />
            </Box>
          </Flex>

          <Flex align="center" gap="16px">
            <Box w="full">
              <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
                Event End Date
              </Text>

              <Box pos="relative" w="full" className="box">
                <Flex
                  fontSize="14px"
                  onClick={() => setEndDate((prev) => !prev)}
                  align="center"
                  justifyContent="space-between"
                  w="full"
                  h="44px"
                  cursor="pointer"
                  borderRadius="4px"
                  bg={end ? "#F4F6F8" : "transparent"}
                  color={end ? "#000" : ""}
                  border="1px solid #D4D6D8"
                  py="12px"
                  px="16px"
                >
                  <Text>{end ? end : "Select Date"}</Text>
                  <Image src="/assets/cal.svg" w="20px" h="20px" />{" "}
                </Flex>
                {endDate && (
                  <Box pos="absolute" top="70" w="200%" zIndex="3">
                    <Calendar
                      onChange={handleEndDateChange}
                      value={endValue}
                      minDate={startDateRange}
                      tileClassName={tileClassName}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box w="full">
              <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
                Event End Time
              </Text>

              <Select
                styles={customStyles}
                placeholder="Select Time"
                options={secTimeOptions}
                value={values.departureTime}
                defaultValue={values.departureTime}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, {
                    name: "departureTime",
                  })
                }
                components={{
                  IndicatorSeparator: () => (
                    <div style={{ display: "none" }}></div>
                  ),
                  DropdownIndicator: () => (
                    <Image
                      src="/assets/clock.svg"
                      mr="16px"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ),
                }}
              />
            </Box>
          </Flex>
          {start &&
            end &&
            values.arrivalTime &&
            values.departureTime &&
            formattedDeparture < formattedDate && (
              <Text mt="8px" fontSize="12px" color="red">
                Departure Date is earlier than Arrival Date
              </Text>
            )}

          <Flex align="center" gap="10px" my="24px">
            <Switch
              isChecked={values?.paymentRequired}
              onChange={() =>
                setValues({
                  ...values,
                  paymentRequired: !values.paymentRequired,
                })
              }
              size="sm"
            />
            <Text fontSize="10px" lineHeight="100%" fontWeight={500}>
              Add Event Price
            </Text>
          </Flex>

          {values.paymentRequired && (
            <Box mb="24px">
              <Text mb="8px" fontSize="10px" lineHeight="100%" fontWeight={500}>
                Event Price
              </Text>
              <CustomInput
                type="number"
                auth
                mb
                holder="Enter event price"
                value={values.price}
                onChange={(e) => {
                  setValues({
                    ...values,
                    price: e.target.value,
                  });
                }}
              />
            </Box>
          )}

          <Button
            isDisabled={
              isDisabled || !start || !end || formattedDeparture < formattedDate
            }
            w="full"
            isLoading={isLoading}
            onClick={handleCreate}
            py="17px"
            fontSize="14px"
          >
            Update Event
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EditEvent;
