import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const CancelledChart = ({ dataa }) => {
  const data = dataa ? [dataa?.cancelled, dataa?.noShow] : [];

  const options = {
    maintainAspectRatio: false,
    chart: {
      type: "donut",
    },
    stroke: {
      show: true,
      width: 2,
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
    colors: ["#EE383A", "#FDECED"],
    labels: ["Cancelled", "No Show"],
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
        Cancelled VS No Show reservations
      </Text>

      <Box my="30px">
        <ReactApexChart
          height={322}
          options={options}
          series={data}
          type="donut"
        />
      </Box>

      <Flex align="center" gap="24px" justifyContent="center">
        <Flex align="center" gap="10px">
          <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Cancelled ({dataa?.cancelled})
          </Text>
        </Flex>

        <Flex align="center" gap="10px">
          <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            No Show ({dataa?.noShow})
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CancelledChart;
