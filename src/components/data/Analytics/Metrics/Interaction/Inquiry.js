import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Inquiry = () => {
  const series = [
    {
      name: "Active",
      data: [76, 85, 101, 98, 87, 105],
    },
    {
      name: "Inactive",
      data: [44, 55, 57, 56, 61, 58],
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
    colors: ["#EE383A", "#F9C8CB"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
        inquiry resolution rate
      </Text>

      <Flex align="center" justifyContent="space-between">
        <Flex mt="20px" mb="20px" align="flex-end" gap="10px">
          <Text color="#646668" fontSize="28px" fontWeight={500}>
            56.16%
          </Text>
          <Text color="#0B841D" fontSize="12px">
            +30.6%
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

export default Inquiry;
