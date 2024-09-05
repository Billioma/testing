import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { IoStar } from "react-icons/io5";

const ServiceChart = () => {
  const series = [
    {
      name: "Service 1",
      data: [100, 20, 100, 90, 100, 150, 70, 150, 20, 160, 150, 100],
    },
    {
      name: "Service 2",
      data: [80, 40, 70, 20, 50, 30, 70, 30, 20, 100, 150, 90],
    },
    {
      name: "Service 3",
      data: [80, 40, 70, 20, 50, 30, 70, 30, 20, 100, 150, 50],
    },
  ];

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
    colors: ["#EE383A", "#F39197", "#F9C8CB"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      gridLines: {
        show: true,
        borderColor: "#e4e4e4",
        strokeDashArray: 3,
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
      <Text color="#242628" fontSize="14px" fontWeight={700}>
        Average Customer Ratings
      </Text>

      <Flex
        mt="30px"
        justifyContent="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: "10px", md: "unset" }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex align="center" gap="10px">
          <IoStar color="#EE383A" size="13px" />
          <Text color="#646668" fontSize="28px" fontWeight={500}>
            4.1
          </Text>
          <Text color="#0B841D" fontSize="12px">
            +30.6%
          </Text>
        </Flex>

        <Flex align="center" gap="24px">
          <Flex align="center" gap="10px">
            <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Service 1
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F39197" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Service 2
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Service 2
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Box mt="40px">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={270}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};

export default ServiceChart;
