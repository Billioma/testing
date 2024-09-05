import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const LocationDistro = ({ dataa }) => {
  const data =
    dataa
      ?.filter((item) => item?.state === "Lagos" || item?.state === "FCT")
      ?.map((dat) => Number(dat?.count)) || [];

  const options = {
    maintainAspectRatio: false,
    chart: {
      type: "donut",
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
    labels:
      dataa
        ?.filter((item) => item?.state === "Lagos" || item?.state === "FCT")
        ?.map((dat) => dat?.state) || [],
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
        Clients location distribution
      </Text>

      <Box mt="40px">
        <ReactApexChart
          height={342}
          options={options}
          series={data}
          type="donut"
        />
      </Box>

      <Flex mt="50px" align="center" gap="24px" justifyContent="center">
        {dataa
          ?.filter((item) => item?.state === "Lagos" || item?.state === "FCT")
          ?.map((dat, i) => (
            <Flex align="center" gap="10px">
              <Box
                bg={i === 1 ? "#F9C8CB" : "#EE383A"}
                rounded="full"
                h="10px"
                w="10px"
              />
              <Text color="#000" fontSize="12px">
                {dat?.state} ({Number(dat?.count)?.toLocaleString()})
              </Text>
            </Flex>
          ))}
      </Flex>
    </Box>
  );
};

export default LocationDistro;
