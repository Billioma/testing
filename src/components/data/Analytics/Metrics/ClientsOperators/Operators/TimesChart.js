import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const TimesChart = () => {
  const series = [
    {
      name: "Peak Time",
      data: [36, 45, 21, 105, 37, 15, 46, 55, 30, 48, 37, 9],
    },
  ];

  const data = series[0].data;
  const maxValue = Math.max(...data);
  const maxIndex = data.indexOf(maxValue);
  const colors = data.map((value) =>
    value === maxValue ? "#EE383A" : "#F9C8CB"
  );

  const categories = [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
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
        columnWidth: "75%",
        endingShape: "rounded",
        distributed: true,
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
    colors: colors,
    xaxis: {
      categories: categories,
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
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    annotations: {
      points: [
        {
          x: categories[maxIndex],
          y: maxValue,
          marker: {
            size: 0,
            fillColor: "transparent",
            strokeColor: "transparent",
          },
          label: {
            borderColor: "#FF4560",
            borderRadius: "8px",
            offsetY: -4,
            style: {
              color: "#fff",
              background: "#FF4560",
            },
            text: maxValue,
          },
        },
      ],
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
        Average Peak times
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

export default TimesChart;
