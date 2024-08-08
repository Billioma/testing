import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const Breakdown = () => {
  const data = [44, 55, 41];

  const options = {
    maintainAspectRatio: false,
    chart: {
      type: "donut",
    },
    stroke: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#EE383A", "#F39197", "#FDECED"],
    labels: ["one", "twp", "three"],
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: {
                size: "60%",
              },
            },
          },
        },
      },
    ],
  };

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text textAlign="center" color="#242628" fontSize="14px" fontWeight={700}>
        Breakdown of vehicle types
      </Text>

      <Box mt="35px">
        <ReactApexChart
          height={305}
          options={options}
          series={data}
          type="donut"
        />
      </Box>

      <Flex
        mt="30px"
        align="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
      >
        <Flex align="center" gap="24px">
          <Flex align="center" gap="10px">
            <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              One (25%)
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F39197" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Two (25%)
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#FDECED" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Three (25%)
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Breakdown;
