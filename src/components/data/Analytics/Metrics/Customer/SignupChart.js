import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const SignupChart = ({ data }) => {
  const series = [
    {
      name: "Customers",
      data: data?.map((item) => item?.count),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },

    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      borderColor: "#e0e0e0",
    },
    colors: ["#EE383A"],
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
    },
  };

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text color="#242628" fontSize="14px" fontWeight={700}>
        Customer Sign Ups{" "}
      </Text>

      <Box mt="30px">
        <Chart options={options} series={series} type="line" height={350} />
      </Box>
    </Box>
  );
};

export default SignupChart;
