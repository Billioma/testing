import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import {
  Text,
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import Select from "react-select";
import {
  useGetServiceMetricsFilter,
  useGetServicesMetrics,
} from "../../../../services/admin/query/general";
import { operatorDashboardFilter } from "../../../common/constants";
import { IoIosArrowDown } from "react-icons/io";

export default function ServicesSection() {
  const { data: servicesMetrics, isLoading } = useGetServicesMetrics();
  const {
    mutate,
    isLoading: isGetting,
    data: metricFilter,
  } = useGetServiceMetricsFilter();

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
    control: (provided) => ({
      ...provided,
      width: "100px",
      color: "#646668",
      fontWeight: 500,
      fontSize: "10px",
      cursor: "pointer",
      borderRadius: "4px",
      backgroundColor: "transparent",
      border: "1px solid #646668",
      padding: "2px 10px",
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

  const notLoading = from !== "" ? !isGetting : !isLoading;

  const [state, setState] = useState([]);

  const transformData = () => {
    if (from !== "" && metricFilter !== undefined) {
      const transformedData = [];
      const keyOrder = [
        "valetParking",
        "customerPayToPark",
        "attendantPayToPark",
        "reservations",
        "eventParkings",
        "serviceBookings",
      ];

      keyOrder.forEach((key, index) => {
        const titleMapping = {
          valetParking: "Valet Parking",
          customerPayToPark: "Pay-To-Park (Customer)",
          attendantPayToPark: "Pay-To-Park (Attendant)",
          reservations: "Reserved Parking",
          eventParkings: "Event Parking",
          serviceBookings: "Car Services",
        };

        const title =
          titleMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
        const id = index + 1;

        const card = {
          id,
          title,
          subTitle: "Total",
          inservice: metricFilter[key]?.inservice,
          pending: metricFilter[key]?.pending,
          reserved: metricFilter[key]?.reserved,
          completed: metricFilter[key]?.completed,
          value: metricFilter[key]?.total,
        };

        transformedData.push(card);
      });

      setState(transformedData);
    } else if (from === "" && to === "") {
      const transformedData = [];
      const keyOrder = [
        "valetParking",
        "customerPayToPark",
        "attendantPayToPark",
        "reservations",
        "eventParkings",
        "serviceBookings",
      ];

      keyOrder.forEach((key, index) => {
        const titleMapping = {
          valetParking: "Valet Parking",
          customerPayToPark: "Pay-To-Park (Customer)",
          attendantPayToPark: "Pay-To-Park (Attendant)",
          reservations: "Reserved Parking",
          eventParkings: "Event Parking",
          serviceBookings: "Car Services",
        };

        const title =
          titleMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
        const id = index + 1;

        const card = {
          id,
          title,
          subTitle: "Total",
          inservice: servicesMetrics[key]?.inservice,
          pending: servicesMetrics[key]?.pending,
          reserved: servicesMetrics[key]?.reserved,
          completed: servicesMetrics[key]?.completed,
          value: servicesMetrics[key]?.total,
        };

        transformedData.push(card);
      });

      setState(transformedData);
    }
  };

  useEffect(() => {
    servicesMetrics && transformData();
  }, [servicesMetrics, metricFilter, from]);

  return (
    <Box mt="26px">
      <Flex justifyContent="space-between" align="center" mb="12px">
        <Text fontSize="14px" color="#242628" fontWeight="700">
          SERVICES
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

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="24px">
        {!notLoading
          ? ["1", "2", "3", "4", "5", "6"].map((i) => (
              <Skeleton
                key={i}
                h="20vh"
                borderRadius="8px"
                isLoaded={notLoading}
              ></Skeleton>
            ))
          : state?.length &&
            state?.map((card) => (
              <StatCard
                key={card.id}
                title={card.title}
                subTitle={card.subTitle}
                value={card.value}
                completed={card.completed || 0}
                inservice={card.inservice || 0}
                pending={card.pending || 0}
                reserved={card.reserved || 0}
                large
                bg="#fff"
              />
            ))}
      </SimpleGrid>
    </Box>
  );
}
