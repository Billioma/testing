import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import ReactApexChart from "react-apexcharts";

const PaidUnpaid = () => {
  const data = [65, 35];

  const options = {
    maintainAspectRatio: false,
    chart: {
      type: "donut",
    },
    stroke: {
      show: true,
      width: 13,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "0%",
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#EE383A", "#F9C8CB"],
    labels: ["Paid", "Unpaid"],
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
      <Text
        textTransform="capitalize"
        textAlign="center"
        color="#242628"
        fontSize="14px"
        fontWeight={700}
      >
        Paid vs Unpaid invoices
      </Text>

      <Box mt="30px">
        <ReactApexChart
          height={352}
          options={options}
          series={data}
          type="donut"
        />
      </Box>

      <Flex mt="30px" align="center" gap="24px" justifyContent="center">
        <Flex align="center" gap="10px">
          <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Paid (25%)
          </Text>
        </Flex>

        <Flex align="center" gap="10px">
          <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Unpaid (25%)
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PaidUnpaid;
