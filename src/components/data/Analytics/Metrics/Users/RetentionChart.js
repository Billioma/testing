import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const RetentionChart = ({ data }) => {
  const series = [
    {
      name: "Active",
      data: data?.monthlyRetentionRates?.map((entry) => entry?.active),
    },
    {
      name: "Inactive",
      data: data?.monthlyRetentionRates?.map((entry) => entry?.inactive),
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
    colors: ["#EE383A", "#F9C8CB"],
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
      <Text color="#242628" fontSize="14px" fontWeight={700}>
        Customer Retention Rate
      </Text>

      <Flex
        mt="30px"
        justifyContent="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: "10px", md: "unset" }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex align="flex-end" gap="10px">
          <Text color="#646668" fontSize="28px" fontWeight={500}>
            {data?.totalRetentionRate}%
          </Text>
          <Text color="#0B841D" fontSize="12px">
            {Number(data?.percentageChange)?.toFixed(1)}%
          </Text>
        </Flex>

        <Flex align="center" gap="24px">
          <Flex align="center" gap="10px">
            <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Active
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Inactive
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

export default RetentionChart;
