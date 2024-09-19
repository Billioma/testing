import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { IoStar } from "react-icons/io5";

const ServiceChart = ({ dataa }) => {
  // Extract months and services data dynamically
  const months = dataa?.ratingsPerService.map(
    (monthData) => Object.keys(monthData)[0]
  );
  const serviceNames = [
    "payToPark",
    "eventParking",
    "reserveParking",
    "carServices",
  ];

  const getRatingsByService = (serviceName) => {
    return dataa?.ratingsPerService?.map((monthData) => {
      const monthKey = Object.keys(monthData)[0];
      const monthServices = monthData[monthKey];
      const service = monthServices?.find(
        (service) => service.serviceName === serviceName
      );
      return service ? Number(service.averageRating) : 0;
    });
  };

  const series = serviceNames.map((serviceName) => {
    const serviceLabels = {
      payToPark: "Pay To Park",
      eventParking: "Event Parking",
      reserveParking: "Reserve Parking",
      carServices: "Car Service",
    };
    return {
      name: serviceLabels[serviceName],
      data: getRatingsByService(serviceName),
    };
  });

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#EE383A", "#EF6C75", "#F39197", "#F9C8CB"],
    xaxis: {
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      gridLines: {
        show: true,
        borderColor: "#e4e4e4",
        strokeDashArray: 3,
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Box border="1px solid #e4e6e8" borderRadius="8px" p="22px">
      <Text color="#242628" fontSize="14px" fontWeight={700}>
        Average Customer Ratings
      </Text>
      <Flex
        mt="30px"
        justifyContent="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={{ base: "10px", md: "unset" }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex align="center" gap="10px">
          <IoStar color="#EE383A" size="13px" />
          <Text color="#646668" fontSize="28px" fontWeight={500}>
            {Number(dataa?.getAverageRating?.value)}
          </Text>
          <Text color="#0B841D" fontSize="12px">
            +{Number(dataa?.getAverageRating?.percentageChange)}%
          </Text>
        </Flex>

        <Flex align="center" gap="24px">
          <Flex align="center" gap="10px">
            <Box bg="#EE383A" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Pay To Park
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#EF6C75" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Event Parking
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F39197" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Reserve Parking
            </Text>
          </Flex>

          <Flex align="center" gap="10px">
            <Box bg="#F9C8CB" rounded="full" h="10px" w="10px" />
            <Text color="#000" fontSize="12px">
              Car Service
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!dataa ||
      !dataa?.ratingsPerService ||
      dataa?.ratingsPerService?.length === 0 ? (
        <></>
      ) : (
        <Box mt="40px">
          <Chart
            options={options}
            series={series}
            type="bar"
            height={270}
            width={"100%"}
          />
        </Box>
      )}
    </Box>
  );
};

export default ServiceChart;
