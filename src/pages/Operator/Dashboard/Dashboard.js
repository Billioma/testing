import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import {
  operatorDahboard,
  operatorDashCards,
  operatorDashboardFilter,
} from "../../../components/common/constants";
import {
  useGetMetrics,
  useGetMetricsFilter,
} from "../../../services/operator/query/dashboard";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";

const Dashboard = () => {
  const { data: metricData, isLoading } = useGetMetrics();
  const filterOptions = operatorDashboardFilter?.map((time) => ({
    value: time,
    label: time,
  }));
  const [values, setValues] = useState({
    filter: "",
  });

  const {
    mutate,
    isLoading: isGetting,
    data: metricFilter,
  } = useGetMetricsFilter();
  const today = new Date();
  const currentDay = today.getDay();

  let from;
  let to;

  if (values.filter?.value === "Year") {
    from = `${today.getFullYear()}-01-01`;
    to = `${today.getFullYear()}-12-31`;
  } else if (values.filter?.value === "Month") {
    const currentMonth = today.getMonth() + 1;
    const year = today.getFullYear();
    from = `${year}-${currentMonth < 10 ? "0" : ""}${currentMonth}-01`;
    to = `${year}-${currentMonth < 10 ? "0" : ""}${currentMonth}-${new Date(
      year,
      currentMonth,
      0
    ).getDate()}`;
  } else if (values.filter?.value === "Week") {
    const daysUntilMonday = (currentDay === 0 ? 7 : currentDay) - 1;
    const daysUntilSunday = 6 - daysUntilMonday;

    const fromStartDate = new Date(today);
    fromStartDate.setDate(today.getDate() - daysUntilMonday);
    const toEndDate = new Date(today);
    toEndDate.setDate(today.getDate() + daysUntilSunday);

    from = `${fromStartDate.getFullYear()}-${String(
      fromStartDate.getMonth() + 1
    ).padStart(2, "0")}-${String(fromStartDate.getDate()).padStart(2, "0")}`;
    to = `${toEndDate.getFullYear()}-${String(
      toEndDate.getMonth() + 1
    ).padStart(2, "0")}-${String(toEndDate.getDate()).padStart(2, "0")}`;
  } else {
    from = "";
    to = "";
  }

  const notLoading = from !== "" ? !isGetting : !isLoading;

  const mainData =
    from !== "" && metricFilter !== undefined ? metricFilter : metricData;

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  useEffect(() => {
    if (from && to) {
      mutate({
        query: { from, to },
      });
    }
  }, [from, to]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      color: "#646668",
      fontWeight: 500,
      fontSize: "10px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #646668",
      padding: "2px 10px",
      background: "unset",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f4f6f8",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#d4d6d8" : "",
    }),
  };

  return (
    <Box minH="75vh">
      <Flex align="center" mb="16px" justifyContent="space-between" w="full">
        <Text fontWeight={700} color="#242628" lineHeight="100%">
          Metrics
        </Text>

        <Box>
          <Select
            styles={customStyles}
            options={filterOptions}
            placeholder="All Time"
            value={values.filter}
            defaultValue={values.filter}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () => (
                <div>
                  <IoIosArrowDown size="15px" color="#646668" />
                </div>
              ),
            }}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, {
                name: "filter",
              })
            }
          />
        </Box>
      </Flex>

      <Grid
        gap="24px"
        mb="37px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(4,1fr)",
        ]}
      >
        {operatorDashCards?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton isLoaded={notLoading} h="12rem">
              <Box
                borderRadius="8px"
                border="1px solid #e4e6e8"
                py="16px"
                px="24px"
              >
                <Image src={dat?.img} w="24px" h="24px" />

                <Flex
                  align="center"
                  justifyContent="space-between"
                  w="full"
                  mt="16px"
                >
                  <Text
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="100%"
                    color="#444648"
                  >
                    {dat?.title}
                  </Text>
                  <Text
                    fontSize="14px"
                    fontWeight={700}
                    lineHeight="100%"
                    color="#444648"
                  >
                    {i === 0
                      ? mainData?.data?.locations
                      : i === 1
                      ? mainData?.data?.zones
                      : i === 2
                      ? mainData?.data?.attendants
                      : i === 3 && mainData?.data?.transactions}
                  </Text>
                </Flex>
              </Box>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Grid
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {operatorDahboard?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton isLoaded={notLoading} h="12rem">
              <Box
                borderRadius="8px"
                bg="#F4F6F8"
                p="5px"
                border="1px solid #E4E6E8"
              >
                <Box h="6px" w="full" bg={dat?.color} borderRadius="full"></Box>
                <Box p="15px" pb="24px">
                  <Image src={dat?.img} w="40px" h="40px" />
                  <Text
                    mt="16px"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={700}
                    color="#242628"
                  >
                    {dat?.title}
                  </Text>

                  <Flex
                    mt="24px"
                    align="flex-end"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Box w="full">
                      <Text
                        fontSize="12px"
                        lineHeight="100%"
                        color="#848688"
                        fontWeight={500}
                      >
                        Paid
                      </Text>
                      <Text
                        mt="8px"
                        fontSize="24px"
                        lineHeight="100%"
                        color="#444648"
                        fontWeight={500}
                      >
                        ₦{" "}
                        {(i === 0
                          ? mainData?.data?.valet?.totalAmount
                          : i === 1
                          ? mainData?.data?.parked?.totalAmount
                          : i === 2 && mainData?.data?.carWash?.totalAmount
                        )?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </Box>

                    <Flex
                      justifyContent="flex-end"
                      w="full"
                      align="center"
                      gap="15px"
                    >
                      <Box>
                        <Text
                          fontSize="12px"
                          lineHeight="100%"
                          color="#848688"
                          fontWeight={500}
                        >
                          Total
                        </Text>
                        <Text
                          mt="8px"
                          fontSize="24px"
                          lineHeight="100%"
                          color="#444648"
                          fontWeight={500}
                        >
                          {i === 0
                            ? mainData?.data?.valet?.total
                            : i === 1
                            ? mainData?.data?.parked?.total
                            : i === 2 && mainData?.data?.carWash?.total}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
