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
import { useCreateScheduleByStaff } from "../../../services/admin/query/schedule";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useNavigate } from "react-router-dom";

const getCurrentWeekDates = () => {
  const now = dayjs();
  const startOfWeek = now.startOf("week").add(1, "day");
  const dates = Array.from({ length: 7 }).map((_, i) =>
    startOfWeek.add(i, "day").format("dddd, DD MMM")
  );
  return dates;
};

const AddScheduleStaff = ({ none, staff }) => {
  const { data: locationsData, isLoading: isLocation } = useGetAllLocations();
  const { data: staffs, isLoading: isStaff } = useGetStaffs({}, 1, 1000);

  const [values, setValues] = useState({
    staff: "",
    schedules: [
      {
        daysOfWeek: [],
        locationIds: [],
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

  useEffect(() => {
    if (staff) {
      const selectedStaffOption = staffOptions?.find(
        (option) => Number(option.value) === Number(staff)
      );
      setValues({ ...values, staff: selectedStaffOption });
    }
  }, [staff, staffs]);

  const daysOfWeekOptions = DayOfWeekEnum?.map((day) => ({
    label: day?.name,
    value: day?.value,
  }));

  const handleScheduleChange = (index, key, selectedOptions) => {
    const updatedSchedules = values?.schedules?.map((schedule, i) =>
      i === index
        ? {
            ...schedule,
            [key]: selectedOptions,
          }
        : schedule
    );

    setValues((prevValues) => ({
      ...prevValues,
      schedules: updatedSchedules,
    }));
  };

  const addSchedule = () => {
    setValues((prevValues) => {
      const newSchedules = [
        ...prevValues?.schedules,
        {
          daysOfWeek: [],
          locationIds: [],
        },
      ];
      setOpenSchedules((prevOpenSchedules) => [
        ...prevOpenSchedules,
        newSchedules?.length - 1,
      ]);
      return {
        ...prevValues,
        schedules: newSchedules,
      };
    });
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

  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateScheduleByStaff({
    onSuccess: () => {
      successToast("Schedule created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_STAFF_SCHEDULE);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    const { staff, ...rest } = values;

    // If `none` is true, add `isOffDaySchedule: true` to each schedule object
    if (none) {
      rest.schedules = rest.schedules.map((schedule) => ({
        ...schedule,
        isOffDaySchedule: true,
      }));
    }

    mutate({
      staff: Number(staff?.value),
      ...rest,
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <Box minH="75vh">
      <Box display={none ? "none" : "block"}>
        <GoBackTab />
      </Box>
      <Flex
        mt={none ? "28px" : "unset"}
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
              Add Schedule by Staff
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
                <Text fontSize="14px">Staff</Text>
              </Flex>

              <IoIosArrowDown size="15px" />
            </Flex>

            <Box pb="24px" borderBottom="1px solid #E2E5DC">
              <Box mt="24px">
                <Select
                  styles={customStyles}
                  options={staffOptions}
                  isDisabled={none}
                  placeholder="Select Staff"
                  value={values?.staff}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                    DropdownIndicator: () => (
                      <div>
                        {isStaff ? (
                          <Spinner size="sm" />
                        ) : (
                          <IoIosArrowDown size="15px" color="#646668" />
                        )}
                      </div>
                    ),
                  }}
                  onChange={(selectedOption) => {
                    setValues({
                      ...values,
                      staff: selectedOption,
                    });
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
                  <Text fontSize="14px">
                    {none ? "Off Day" : ""} Schedule {index + 1}
                  </Text>
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
                      isMulti
                      placeholder="Select Days"
                      value={daysOfWeekOptions?.filter((option) =>
                        schedule?.daysOfWeek?.includes(option?.value)
                      )}
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
                      onChange={(selectedOptions) =>
                        handleScheduleChange(
                          index,
                          "daysOfWeek",
                          selectedOptions?.map((option) => option?.value)
                        )
                      }
                    />
                  </Box>

                  <Box mt="24px" pb="24px" borderBottom="1px solid #E2E5DC">
                    <Text fontSize="11px" color="#444648" mb="8px">
                      Location
                    </Text>
                    <Select
                      styles={customStyles}
                      options={locationOptions}
                      placeholder="Select Location"
                      value={locationOptions?.find((option) =>
                        schedule?.locationIds?.includes(option?.value)
                      )}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () => (
                          <div>
                            {isLocation ? (
                              <Spinner size="sm" />
                            ) : (
                              <IoIosArrowDown size="15px" color="#646668" />
                            )}
                          </div>
                        ),
                      }}
                      onChange={(selectedOption) => {
                        const updatedLocationIds = selectedOption
                          ? [selectedOption.value]
                          : [];
                        handleScheduleChange(
                          index,
                          "locationIds",
                          updatedLocationIds
                        );
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          ))}

          <Flex justifyContent="flex-end" mt="24px">
            <Text
              fontSize="14px"
              fontWeight={500}
              cursor="pointer"
              onClick={addSchedule}
            >
              + Add Schedule
            </Text>
          </Flex>
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
              STAFF
            </Text>
            <Text fontSize="14px" mt="8px">
              {values?.staff?.label}
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
                  {none ? "OFF DAY" : ""} SCHEDULE
                </Text>
                <Text opacity={0.6} fontSize="12px" fontWeight={700}>
                  {values?.schedules?.length === 1 ? "" : i + 1}
                </Text>
              </Flex>

              {schedule?.locationIds?.map((locationId) => {
                const location = locationOptions?.find(
                  (option) => option.value === locationId
                );

                return (
                  <Flex
                    key={locationId}
                    mt="8px"
                    mb="12px"
                    align="center"
                    gap="8px"
                  >
                    <Image
                      src="/assets/locate.svg"
                      w="16px"
                      h="16px"
                      objectFit="contain"
                    />
                    <Text fontSize="14px">{location?.label}</Text>
                  </Flex>
                );
              })}

              {schedule?.daysOfWeek?.map((dayValue) => {
                const dayIndex = DayOfWeekEnum?.findIndex(
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
                setValues({
                  staff: "",
                  schedules: [
                    {
                      daysOfWeek: [],
                      locationIds: [],
                    },
                  ],
                })
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
                !values?.staff ||
                !values?.schedules[0]?.daysOfWeek?.length ||
                !values?.schedules[0]?.locationIds?.length
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

export default AddScheduleStaff;
