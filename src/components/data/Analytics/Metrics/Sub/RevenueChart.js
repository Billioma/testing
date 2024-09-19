import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const RevenueChart = ({ dataa }) => {
  const series = [
    {
      name: "Revenue",
      data: dataa?.monthlyRevenue?.map((item) => Number(item?.revenue)),
    },
  ];

  const data = series[0]?.data;
  const maxValue = data?.length > 0 ? Math.max(...data) : 0;
  const colors = data?.map((value) =>
    value === maxValue ? "#EE383A" : "#F9C8CB"
  );

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

        formatter: (value) => `₦${value.toLocaleString()}`,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `₦${val?.toLocaleString()}`;
        },
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
        Total revenue generated
      </Text>

      <Flex my="30px" align="flex-end" gap="10px">
        <Text color="#646668" fontSize="28px" fontWeight={500}>
          ₦{Number(dataa?.totalRevenue)?.toLocaleString()}
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
          height={270}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};

export default RevenueChart;
