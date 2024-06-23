import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Button, Spinner, Text } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { MdClose } from "react-icons/md";
import Select from "react-select";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetAllLocations } from "../../../services/admin/query/configurations";
import {
  DayOfWeekEnum,
  customStyles,
} from "../../../components/common/constants";
import { useGetStaffs } from "../../../services/admin/query/staff";
import dayjs from "dayjs";
import useCustomToast from "../../../utils/notifications";
import {
  useCreateScheduleByLocation,
  useGetScheduleLocation,
} from "../../../services/admin/query/schedule";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useNavigate, useParams } from "react-router-dom";

const getCurrentWeekDates = () => {
  const now = dayjs();
  const startOfWeek = now.startOf("week").add(1, "day");
  const dates = Array.from({ length: 7 }).map((_, i) =>
    startOfWeek.add(i, "day").format("dddd, DD MMM")
  );
  return dates;
};

const EditScheduleLocation = () => {
  const { data: locationsData, isLoading: isLocation } = useGetAllLocations();
  const { data: staffs, isLoading: isStaff } = useGetStaffs({}, 1, 1000);

  const [values, setValues] = useState({
    location: "",
    schedules: [
      {
        daysOfWeek: [],
        staffIds: [],
      },
    ],
  });

  const [openSchedules, setOpenSchedules] = useState([0]);

  const locationOptions = locationsData?.data?.map((location) => ({
    label: location?.name,
    value: location?.id,
  }));

  const staffOptions = staffs?.data?.map((staff) => ({
    label: staff?.fullName,
    value: staff?.id,
  }));

  const daysOfWeekOptions = DayOfWeekEnum?.map((day) => ({
    label: day?.name,
    value: day?.value,
  }));

  const handleScheduleChange = (index, key, selectedOptions) => {
    const updatedSchedules = values?.schedules?.map((schedule, i) =>
      i === index
        ? {
            ...schedule,
            [key]: selectedOptions?.map((option) => option?.value),
          }
        : schedule
    );

    setValues((prevValues) => ({
      ...prevValues,
      schedules: updatedSchedules,
    }));
  };

  const toggleSchedule = (index) => {
    setOpenSchedules((prevOpenSchedules) =>
      prevOpenSchedules?.includes(index)
        ? prevOpenSchedules?.filter((i) => i !== index)
        : [...prevOpenSchedules, index]
    );
  };

  const removeSchedule = (index) => {
    const updatedSchedules = values?.schedules?.filter((_, i) => i !== index);
    setValues((prevValues) => ({
      ...prevValues,
      schedules: updatedSchedules,
    }));
    setOpenSchedules((prevOpenSchedules) =>
      prevOpenSchedules?.filter((i) => i !== index)
    );
  };

  const { errorToast, successToast } = useCustomToast();

  const { id, week, day } = useParams();

  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateScheduleByLocation({
    onSuccess: () => {
      successToast("Schedule updated successfully!");
      navigate(-1);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    const { location, ...rest } = values;
    mutate({
      location: Number(location?.value),
      ...rest,
    });
  };
  const weekDates = getCurrentWeekDates();
  const {
    mutate: detailsMutate,
    data,
    isLoading: isGetting,
  } = useGetScheduleLocation();

  const handleFind = () => {
    detailsMutate({
      week: week,
      day: day,
      id: id,
    });
  };

  useEffect(() => {
    handleFind();
  }, []);

  const selectedLocationOption = locationOptions?.find(
    (option) => Number(option.value) === Number(id)
  );

  useEffect(() => {
    setValues(() => ({
      ...values,
      location: selectedLocationOption,
      schedules: [
        {
          daysOfWeek: [day],
          staffIds: data?.staffProfiles?.map((item) => item?.id),
        },
      ],
    }));
  }, [locationsData, data]);
  console.log(values);

  return (
    <Box minH="75vh">
      <GoBackTab />
      <Flex
        align="flex-start"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box
          w={{ base: "100%", md: "60%" }}
          border="1px solid #E2E5DC"
          py="24px"
          px="28px"
          borderRadius="16px"
        >
          <Box pb="10px" borderBottom="1px solid #E2E5DC">
            <Text fontSize="18px" fontWeight={500}>
              Add Schedule by Location
            </Text>
          </Box>

          <Box mt="24px">
            <Flex
              align="center"
              cursor="pointer"
              justifyContent="space-between"
              w="full"
              onClick={() => toggleSchedule(-1)}
            >
              <Flex align="center" fontWeight={500} gap="12px">
                <Flex
                  border="1px solid #090C02"
                  rounded="full"
                  w="20px"
                  h="20px"
                  fontSize="12px"
                  justifyContent="center"
                >
                  1
                </Flex>
                <Text fontSize="14px">Location</Text>
              </Flex>

              <IoIosArrowDown size="15px" />
            </Flex>

            <Box pb="24px" borderBottom="1px solid #E2E5DC">
              <Box mt="24px">
                <Select
                  styles={customStyles}
                  options={locationOptions}
                  isDisabled
                  value={values?.location}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>{isLocation ? <Spinner size="sm" /> : ""}</div>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>

          {values?.schedules?.map((schedule, index) => (
            <Box key={index} mt="24px">
              <Flex
                align="center"
                cursor="pointer"
                justifyContent="space-between"
                w="full"
                onClick={() => toggleSchedule(index)}
              >
                <Flex align="center" fontWeight={500} gap="12px">
                  <Flex
                    border="1px solid #090C02"
                    rounded="full"
                    w="20px"
                    h="20px"
                    fontSize="12px"
                    justifyContent="center"
                  >
                    {index + 2}
                  </Flex>
                  <Text fontSize="14px">Schedule {index + 1}</Text>
                </Flex>

                {openSchedules?.includes(index) ? (
                  <MdClose size="15px" onClick={() => removeSchedule(index)} />
                ) : (
                  <IoIosArrowDown size="15px" />
                )}
              </Flex>

              {openSchedules?.includes(index) && (
                <Box>
                  <Box mt="24px">
                    <Text fontSize="11px" mb="8px" color="#444648">
                      Day
                    </Text>
                    <Select
                      styles={customStyles}
                      options={daysOfWeekOptions}
                      isDisabled
                      placeholder="Select Days"
                      value={daysOfWeekOptions?.filter((option) =>
                        schedule?.daysOfWeek?.includes(option?.value)
                      )}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () => "",
                      }}
                    />
                  </Box>

                  <Box mt="24px">
                    <Text fontSize="11px" color="#444648" mb="8px">
                      Select up to 5 staff
                    </Text>
                    <Select
                      styles={customStyles}
                      options={staffOptions}
                      isMulti
                      placeholder="Select Staffs"
                      value={staffOptions?.filter((option) =>
                        schedule?.staffIds?.includes(option?.value)
                      )}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () => (
                          <div>
                            {isStaff || isGetting ? (
                              <Spinner size="sm" />
                            ) : (
                              <IoIosArrowDown size="15px" color="#646668" />
                            )}
                          </div>
                        ),
                      }}
                      isDisabled={isStaff || isGetting}
                      onChange={(selectedOptions) =>
                        handleScheduleChange(index, "staffIds", selectedOptions)
                      }
                    />
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Box
          w={{ base: "100%", md: "40%" }}
          border="1px solid #E2E5DC"
          py="24px"
          px="28px"
          borderRadius="16px"
        >
          <Box pb="10px" borderBottom="1px solid #E2E5DC">
            <Text fontSize="18px" fontWeight={500}>
              Summary
            </Text>
          </Box>

          <Box mt="32px" py="12px" px="10px" borderBottom="1px solid #E2E5DC">
            <Text opacity={0.6} fontSize="12px" fontWeight={700}>
              LOCATION
            </Text>
            <Text fontSize="14px" mt="8px">
              {values?.location?.label}
            </Text>
          </Box>

          {values?.schedules?.map((schedule, i) => (
            <Box
              key={i}
              mt="32px"
              py="16px"
              px="10px"
              borderBottom="1px solid #E2E5DC"
            >
              <Flex align="center" gap="8px">
                <Text opacity={0.6} fontSize="12px" fontWeight={700}>
                  SCHEDULE
                </Text>
                <Text opacity={0.6} fontSize="12px" fontWeight={700}>
                  {values?.schedules?.length === 1 ? "" : i + 1}
                </Text>
              </Flex>

              {schedule?.staffIds?.map((staffId) => {
                const staff = staffOptions?.find(
                  (option) => option.value === staffId
                );

                return (
                  <Flex
                    key={staffId}
                    mt="8px"
                    mb="12px"
                    align="center"
                    gap="8px"
                  >
                    <Image
                      src="/assets/staff.svg"
                      w="16px"
                      h="16px"
                      objectFit="contain"
                    />
                    <Text fontSize="14px">{staff?.label}</Text>
                  </Flex>
                );
              })}

              {schedule?.daysOfWeek?.map((dayValue) => {
                const dayIndex = DayOfWeekEnum.findIndex(
                  (day) => day.value === dayValue
                );

                return (
                  <Flex
                    key={dayValue}
                    mt="8px"
                    mb="12px"
                    align="center"
                    gap="8px"
                  >
                    <Image
                      src="/assets/schedule.svg"
                      w="16px"
                      h="16px"
                      objectFit="contain"
                    />
                    <Text fontSize="14px">{`${weekDates[dayIndex]}`}</Text>
                  </Flex>
                );
              })}
            </Box>
          ))}

          <Flex gap="24px" mt="32px">
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() =>
                setValues(() => ({
                  ...values,
                  location: selectedLocationOption,
                  schedules: [
                    {
                      daysOfWeek: [day],
                      staffIds: data?.staffProfiles?.map((item) => item?.id),
                    },
                  ],
                }))
              }
            >
              Cancel
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isLoading={isLoading}
              onClick={handleSubmit}
              isDisabled={
                !values?.location ||
                !values?.schedules[0]?.daysOfWeek?.length ||
                !values?.schedules[0]?.staffIds?.length
              }
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditScheduleLocation;
