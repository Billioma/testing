import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Added = ({ dataa }) => {
  const series = [
    {
      name: "Clients",
      data: dataa?.recentlyAddedClients?.map((item) => Number(item?.count)),
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
        columnWidth: "45%",
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
        "Sep",
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
        Recently added Clients
      </Text>

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

export default Added;
