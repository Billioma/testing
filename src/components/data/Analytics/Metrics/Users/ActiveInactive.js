import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const ActiveInactive = ({ dataa }) => {
  const data = dataa?.map((item) => Number(item?.percentage));

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
    colors: ["#EE383A", "#EF6C75"],
    labels: dataa?.map((item) => item?.type),
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

  const colors = ["#EE383A", "#EF6C75"];
  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text
        textTransform="capitalize"
        textAlign="center"
        color="#242628"
        fontSize="14px"
        fontWeight={700}
      >
        active VS inactive Operators
      </Text>

      <Box mt="40px">
        {data?.length > 0 ? (
          <ReactApexChart
            height={342}
            options={options}
            series={data}
            type="donut"
          />
        ) : (
          <Text color="#000" fontSize="12px" textAlign="center"></Text>
        )}
      </Box>

      <Flex
        mt="50px"
        align="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
      >
        {dataa?.map((item, i) => (
          <Flex align="center" gap="10px">
            <Box
              bg={colors[i % colors?.length]}
              rounded="full"
              h="10px"
              w="10px"
            />
            <Text color="#000" textTransform="capitalize" fontSize="12px">
              {item?.type?.toLowerCase()} (
              {Number(item?.percentage)?.toLocaleString()})%
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default ActiveInactive;
