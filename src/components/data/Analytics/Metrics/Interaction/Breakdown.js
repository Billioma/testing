import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const Breakdown = ({ dataa }) => {
  const data = dataa?.map((item) => Number(item?.percentage)) || [];

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
    labels: ["Enquiry", "Feedback", "Complaint"],
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

  const colors = ["#EE383A", "#F39197", "#FDECED"];
  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text textAlign="center" color="#242628" fontSize="14px" fontWeight={700}>
        Interactions Breakdown
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
        <Flex align="center" gap="24px">
          {dataa?.length ? (
            dataa?.map((item, i) => (
              <Flex align="center" gap="10px" key={i}>
                <Box
                  bg={colors[i % colors?.length]}
                  rounded="full"
                  h="10px"
                  w="10px"
                />
                <Text color="#000" fontSize="12px">
                  {item?.type} ({Number(item?.percentage)}%)
                </Text>
              </Flex>
            ))
          ) : (
            <Text color="#000" fontSize="12px"></Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Breakdown;
