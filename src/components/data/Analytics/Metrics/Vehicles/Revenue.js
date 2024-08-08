import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Revenue = () => {
  const series = [
    {
      name: "Revenue",
      data: [150000, 92000, 72463, 54282, 34928, 20182],
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
        colors: ["#fff"],
      },
      offsetX: 0,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: colors,
    xaxis: {
      categories: [
        "Big Boys Corp",
        "Landmark Towers",
        "Landmark Beach",
        "Gusto Abuja",
        "Eric Kayser",
        "John Doe",
      ],
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
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
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
        revenue generated from each client
      </Text>

      <Box mt="30px">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={300}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};

export default Revenue;
