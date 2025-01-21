import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Generated = ({ dataa }) => {
  const series = [
    {
      name: "Revenue",
      data: dataa?.data?.map((item) => Number(item?.revenue)) || [],
    },
  ];

  const colors = ["#EE383A"];

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
        horizontal: true,
        columnWidth: "65%",
        endingShape: "rounded",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) =>
        `₦${val.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      style: {
        fontSize: "12px",
        colors: ["#000"],
      },
      offsetX: 30,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: colors,
    xaxis: {
      categories: dataa?.data?.map((item) => item?.operatorName) || [],
      axisBorder: {
        show: false,
      },
      labels: {
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
    tooltip: {
      y: {
        formatter: (value) => `₦${value.toLocaleString()}`,
      },
    },
  };

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text
        textTransform="capitalize"
        color="#242628"
        fontSize="14px"
        fontWeight={700}
      >
        Revenue by Operator
      </Text>

      <Flex my="30px" align="flex-end" gap="10px">
        <Text color="#646668" fontSize="28px" fontWeight={500}>
          ₦{Number(dataa?.total)?.toLocaleString()}
        </Text>
        <Text color="#0B841D" fontSize="12px">
          {Number(dataa?.percentageChange)?.toFixed(1)}%
        </Text>
      </Flex>

      <Box>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={200}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};

export default Generated;
