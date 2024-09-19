import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const RatingsService = ({ dataa }) => {
  const months = dataa?.map((monthData) => Object.keys(monthData)[0]);
  const serviceNames = [
    "Wash my car",
    "Fuel my car",
    "Gauge my tyres",
    "Tow my car",
  ];

  const getRatingsByService = (serviceName) => {
    return dataa?.map((monthData) => {
      const monthKey = Object.keys(monthData)[0];
      const monthServices = monthData[monthKey];
      const service = monthServices?.find(
        (service) => service.serviceName === serviceName
      );
      return service ? Number(service.averageRating) : 0;
    });
  };

  const series = serviceNames?.map((serviceName) => {
    const serviceLabels = {
      ["Wash my car"]: "Washing",
      ["Fuel my car"]: "Fueling",
      ["Gauge my tyres"]: "Gauging",
      ["Tow my car"]: "Towing",
    };
    return {
      name: serviceLabels[serviceName],
      data: getRatingsByService(serviceName),
    };
  });

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#EE383A", "#EF6C75", "#F39197", "#F9C8CB"],
    xaxis: {
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      gridLines: {
        show: true,
        borderColor: "#e4e4e4",
        strokeDashArray: 3, // Make gridlines dotted
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text
          textTransform="capitalize"
          color="#242628"
          fontSize="14px"
          fontWeight={700}
        >
          Ratings per service
        </Text>
        <Flex
          align="center"
          gap="24px"
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          <Flex align="center" gap="10px">
            <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Washing
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#EF6C75" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Fueling
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F39197" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Gauging
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Towing
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {!dataa || dataa?.length === 0 ? (
        <></>
      ) : (
        <Box mt="40px">
          <Chart
            options={options}
            series={series}
            type="bar"
            height={270}
            width={"100%"}
          />
        </Box>
      )}
    </Box>
  );
};

export default RatingsService;
