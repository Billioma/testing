import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Generated = ({ dataa }) => {
  const series = [
    {
      name: "Revenue",
      data: dataa?.map((item) => Number(item?.invoiceCount)) || [],
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
      formatter: (val) => `${val.toLocaleString()}`,
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
      categories: dataa?.data?.map((item) => item?.client) || [],
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
        formatter: (value) => `${value.toLocaleString()}`,
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
        Top clients invoices
      </Text>

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
