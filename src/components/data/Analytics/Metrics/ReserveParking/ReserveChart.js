import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const ReserveChart = ({ dataa }) => {
  const series = [
    {
      name: "Reservations",
      data: dataa?.map((item) => Number(item?.count)),
    },
  ];
  const data = series[0]?.data;
  const maxValue = data?.length ? Math.max(...data) : 0;
  const colors = data?.map((value) =>
    value === maxValue ? "#EE383A" : "#F9C8CB"
  );

  const categories = [
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
  };

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text
        textTransform="capitalize"
        color="#242628"
        fontSize="14px"
        fontWeight={700}
      >
        Reservation made
      </Text>

      <Box mt="30px">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={313}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};

export default ReserveChart;
