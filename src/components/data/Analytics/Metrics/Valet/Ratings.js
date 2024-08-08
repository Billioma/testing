import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";
import { IoStar } from "react-icons/io5";

const Ratings = () => {
  const data = [44, 55, 41, 50, 30];

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
    colors: ["#EE383A", "#EF6C75", "#F39197", "#F9C8CB", "#FDECED"],
    labels: ["1", "2", "3", "4", "5"],
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
        Valet Parking Ratings
      </Text>

      <Box mt="35px">
        <ReactApexChart
          height={325}
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
        {["#EE383A", "#EF6C75", "#F39197", "#F9C8CB", "#FDECED"].map(
          (item, i) => (
            <Flex key={i} align="center" gap="10px">
              <IoStar color={item} size="13px" />
              <Text color="#000" fontSize="12px">
                {i + 1} (25%)
              </Text>
            </Flex>
          )
        )}
      </Flex>
    </Box>
  );
};

export default Ratings;
