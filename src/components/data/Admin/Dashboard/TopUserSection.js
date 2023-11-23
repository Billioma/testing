import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import Select from "react-select";
import { Text, Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";
import {
  useGetUsersMetrics,
  useGetUsersMetricsFilter,
} from "../../../../services/admin/query/general";
import { operatorDashboardFilter } from "../../../common/constants";
import { IoIosArrowDown } from "react-icons/io";

export default function TopUserSection() {
  const { data: usersMetrics, isLoading } = useGetUsersMetrics();
  const {
    mutate,
    isLoading: isGetting,
    data: metricFilter,
  } = useGetUsersMetricsFilter();

  const filterOptions = operatorDashboardFilter?.map((time) => ({
    value: time,
    label: time,
  }));
  const [values, setValues] = useState({
    filter: "",
  });

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const today = new Date();
  const currentDay = today.getDay();

  let from;
  let to;

  if (values.filter?.value === "Year") {
    from = `${today.getFullYear()}-01-01`;
    to = `${today.getFullYear()}-12-31`;
  } else if (values.filter?.value === "Month") {
    const currentMonth = today.getMonth() + 1;
    const year = today.getFullYear();
    from = `${year}-${currentMonth < 10 ? "0" : ""}${currentMonth}-01`;
    to = `${year}-${currentMonth < 10 ? "0" : ""}${currentMonth}-${new Date(
      year,
      currentMonth,
      0
    ).getDate()}`;
  } else if (values.filter?.value === "Week") {
    const daysUntilMonday = (currentDay === 0 ? 7 : currentDay) - 1;
    const daysUntilSunday = 6 - daysUntilMonday;

    const fromStartDate = new Date(today);
    fromStartDate.setDate(today.getDate() - daysUntilMonday);
    const toEndDate = new Date(today);
    toEndDate.setDate(today.getDate() + daysUntilSunday);

    from = `${fromStartDate.getFullYear()}-${String(
      fromStartDate.getMonth() + 1
    ).padStart(2, "0")}-${String(fromStartDate.getDate()).padStart(2, "0")}`;
    to = `${toEndDate.getFullYear()}-${String(
      toEndDate.getMonth() + 1
    ).padStart(2, "0")}-${String(toEndDate.getDate()).padStart(2, "0")}`;
  } else {
    from = "";
    to = "";
  }

  useEffect(() => {
    if (from && to) {
      mutate({
        query: { from, to },
      });
    }
  }, [from, to]);

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


  const notLoading = from !== "" ? !isGetting : !isLoading;

  const [state, setState] = useState([]);
  const transformData = () => {
    if (from !== "" && metricFilter !== undefined) {
      const transformedData = [];
      const keyOrder = ["customers", "attendants", "clients", "operators"];

      keyOrder.forEach((key, index) => {
        const titleMapping = {
          valetParking: "Valet Parking",
          customerPayToPark: "Pay-To-Park (Customer)",
          attendantPayToPark: "Pay-To-Park (Attendant)",
          reservations: "Reserved Parking",
          eventParkings: "Event Parking",
          serviceBookings: "Service Bookings",
        };

        const title =
          titleMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
        const id = index + 1;

        const card = {
          id,
          title,
          subTitle: "Total",
          value: metricFilter[key]?.total,
          active: metricFilter[key]?.active,
          inactive: metricFilter[key]?.inactive,
        };

        transformedData.push(card);
      });

      setState(transformedData);
    } else if (from === "" && to === "") {
      const transformedData = [];
      const keyOrder = ["customers", "attendants", "clients", "operators"];

      keyOrder.forEach((key, index) => {
        const titleMapping = {
          valetParking: "Valet Parking",
          customerPayToPark: "Pay-To-Park (Customer)",
          attendantPayToPark: "Pay-To-Park (Attendant)",
          reservations: "Reserved Parking",
          eventParkings: "Event Parking",
          serviceBookings: "Service Bookings",
        };

        const title =
          titleMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
        const id = index + 1;

        const card = {
          id,
          title,
          subTitle: "Total",
          value: usersMetrics[key]?.total,
          active: usersMetrics[key]?.active,
          inactive: usersMetrics[key]?.inactive,
        };

        transformedData.push(card);
      });

      setState(transformedData);
    }
  };

  useEffect(() => {
    usersMetrics && transformData();
  }, [usersMetrics, metricFilter, from]);

  return (
    <Box>
      <Flex justifyContent="space-between" align="center" mb="12px">
        <Text fontSize="14px" color="#242628" fontWeight={700}>
          USERS
        </Text>
        <Select
          styles={customStyles}
          options={filterOptions}
          placeholder="All Time"
          value={values.filter}
          defaultValue={values.filter}
          components={{
            IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
            DropdownIndicator: () => (
              <div>
                <IoIosArrowDown size="15px" color="#646668" />
              </div>
            ),
          }}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, {
              name: "filter",
            })
          }
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="24px">
        {!notLoading
          ? ["1", "2", "3", "4"].map((i) => (
              <Skeleton
                key={i}
                h="20vh"
                borderRadius="8px"
                isLoaded={notLoading}
              ></Skeleton>
            ))
          : state?.length
          ? state?.map((card) => (
              <StatCard
                key={card.id}
                title={card.title}
                subTitle={card.subTitle}
                value={card.value}
                active={card.active}
                inactive={card.inactive}
              />
            ))
          : ""}
      </SimpleGrid>
    </Box>
  );
}
