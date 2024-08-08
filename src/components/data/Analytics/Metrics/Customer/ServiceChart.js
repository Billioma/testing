import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ServiceChart = ({ dataa }) => {
  const data = [
    Number(dataa?.eventParking),
    Number(dataa?.payToPark),
    Number(dataa?.reserveParking),
    Number(dataa?.serviceBooking),
  ];

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
    colors: ["#EE383A", "#EF6C75", "#F39197", "#F9C8CB"],
    labels: ["Event Parking", "Pay to Park", "Reserve Parking", "Car Service"],
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
        Preferred service distribution
      </Text>

      <Box mt="40px">
        <ReactApexChart
          height={320}
          options={options}
          series={data}
          type="donut"
        />
      </Box>

      <Flex mt="30px" align="center" flexWrap="wrap" gap="24px" rowGap="12px">
        <Flex align="center" gap="10px">
          <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Event Parking ({Number(dataa?.eventParking)})
          </Text>
        </Flex>

        <Flex align="center" gap="10px">
          <Box bg="#EF6C75" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Pay to Park ({Number(dataa?.payToPark)})
          </Text>
        </Flex>

        <Flex align="center" gap="10px">
          <Box bg="#F39197" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Reserve Parking ({Number(dataa?.reserveParking)})
          </Text>
        </Flex>

        <Flex align="center" gap="10px">
          <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
          <Text color="#000" fontSize="12px">
            Car Service ({Number(dataa?.serviceBooking)})
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ServiceChart;
