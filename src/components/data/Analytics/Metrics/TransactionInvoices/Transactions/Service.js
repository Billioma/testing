import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const Service = ({ dataa }) => {
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
    colors: ["#380506", "#830b0d", "#Ed3134", "#F2696b", "#F7a1a3", "#Fcd9da"],
    labels: dataa?.map((item) => item?.type) || [],
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

  const colors = [
    "#380506",
    "#830b0d",
    "#Ed3134",
    "#F2696b",
    "#F7a1a3",
    "#Fcd9da",
  ];

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text textAlign="center" color="#242628" fontSize="14px" fontWeight={700}>
        Revenue by Service type
      </Text>

      <Box mt="35px">
        {data?.length > 0 ? (
          <ReactApexChart
            height={300}
            options={options}
            series={data}
            type="donut"
          />
        ) : (
          <Text color="#000" fontSize="12px" textAlign="center"></Text>
        )}
      </Box>

      <Flex
        mt="30px"
        align="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
      >
        {dataa?.length ? (
          dataa?.map((item, i) => (
            <Flex key={i} align="center" gap="10px">
              <Box
                bg={colors[i % colors?.length]}
                rounded="full"
                h="10px"
                w="10px"
              />
              <Text color="#000" fontSize="12px">
                {item?.type} ({Number(item?.percentage)})%
              </Text>
            </Flex>
          ))
        ) : (
          <Text color="#000" fontSize="12px"></Text>
        )}
      </Flex>
    </Box>
  );
};

export default Service;
