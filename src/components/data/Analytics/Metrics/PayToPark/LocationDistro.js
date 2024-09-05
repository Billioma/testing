import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import ReactApexChart from "react-apexcharts";

const LocationDistro = ({ dataa }) => {
  const data = dataa?.map((item) => Number(item?.count));

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
    labels: dataa?.map((item) => item?.state),
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
        Pay to park location distribution
      </Text>

      <Box mt="30px">
        {data?.length > 0 ? (
          <ReactApexChart
            height={332}
            options={options}
            series={data}
            type="donut"
          />
        ) : (
          <Text color="#000" fontSize="12px" textAlign="center">
       
          </Text>
        )}
      </Box>

      <Flex mt="30px" align="center" gap="24px" justifyContent="center">
        {dataa?.map((item, i) => (
          <Flex align="center" gap="10px">
            <Box
              bg={item?.state === "Lagos" ? "#F9C8CB" : "#EE383A"}
              rounded="full"
              h="10px"
              w="10px"
            />
            <Text color="#000" fontSize="12px">
              {item?.state} ({Number(item?.count)?.toLocaleString()})
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default LocationDistro;
