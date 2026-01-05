import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  useGetLocations,
  useGetZones,
} from "../../../../services/admin/query/locations";
import { IoIosArrowDown } from "react-icons/io";
import { customStyles } from "../../../../components/common/constants";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { useGetSalesReports } from "../../../../services/admin/query/audit";
import SingleLocationTable from "../../../../components/data/Admin/Audit/Locations/SingleLocationTable";
import { BsFilter } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { formatFilterDate } from "../../../../utils/helpers";
import { useGetAdministrators } from "../../../../services/admin/query/users";
import { useParams } from "react-router-dom";
import GoBackTab from "../../../../components/data/Admin/GoBackTab";

const SingleLocation = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [values, setValues] = useState({
    location: "",
    zone: "",
    gte: "",
    lte: "",
    status: "",
  });

  const { id } = useParams();
  const today = new Date();

  useEffect(() => {
    const audit = JSON.parse(sessionStorage.getItem("audit"));
    setValues((prev) => ({
      ...prev,
      gte:
        audit?.gte ||
        new Date(today.getFullYear(), 0, 1).toLocaleDateString("en-CA"),
      lte: audit?.lte || today.toLocaleDateString("en-CA"),
      status: audit?.status || "",
    }));

    setSearchFilters({
      ...values,
      gte:
        audit?.gte ||
        new Date(today.getFullYear(), 0, 1).toLocaleDateString("en-CA"),
      lte: audit?.lte || today.toLocaleDateString("en-CA"),
      location: id,
      status: audit?.status || "",
    });
  }, []);

  const [show, setShow] = useState(true);

  const resetAllValues = () => {
    setValues({
      location: id,
      gte: new Date(today.getFullYear(), 0, 1).toLocaleDateString("en-CA"),
      lte: today.toLocaleDateString("en-CA"),
      status: "",
      zone: "",
    });
  };

  useEffect(() => {
    sessionStorage.removeItem("loc_start");
    sessionStorage.removeItem("loc_end");
  }, []);

  const { data: zones } = useGetZones({}, 1, 1000);

  const zoneOptions = zones?.data?.map((location) => ({
    label: location.name,
    value: parseInt(location.id),
  }));

  const showOptions = ["All", "Pending", "Pass", "Fail"]?.map((options) => ({
    label: options,
    value: options.toUpperCase(),
  }));

  const [searchFilters, setSearchFilters] = useState(null);
  const query = searchFilters
    ? [
        `filter=location.id||$eq||${id}`,
        searchFilters.zone &&
          `filter=zone.name||$cont||${searchFilters.zone.label.split(" ")[0]}`,
        searchFilters.gte &&
          `filter=date||$gte||${formatFilterDate(searchFilters.gte)}T00:00:00`,
        searchFilters.lte &&
          `filter=date||$lte||${formatFilterDate(searchFilters.lte)}T23:59:59`,
        searchFilters.status &&
          searchFilters.status.value !== "ALL" &&
          `filter=audit||$cont||${searchFilters.status.value}`,
      ]
        .filter(Boolean)
        .join("&")
    : "";

  const { data, isLoading, refetch } = useGetSalesReports(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit,
    query
  );

  const handleSearch = () => {
    setSearchFilters(values);
    sessionStorage.setItem("audit", JSON.stringify(values));
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit]);

  sessionStorage.removeItem("audit_status");

  return (
    <Box>
      <Box w="fit-content">
        <GoBackTab />
      </Box>

      <Box
        bg="#F4F6F8"
        mt="8px"
        borderRadius="4px"
        color="#949698"
        p="6px"
        textAlign="center"
        mb="20px"
        w="fit-content"
        fontWeight={500}
        fontSize="12px"
      >
        Location:{" "}
        <span style={{ color: "#3D3D3D" }}>
          {data?.data[0]?.location?.name}
        </span>
      </Box>

      <Box
        display={show ? "block" : "none"}
        border="1px solid #d4d6d8"
        borderRadius="8px"
        p="16px 23px 24px"
      >
        <Flex justifyContent="space-between" w="full">
          <Box
            w={{ base: "100%", md: "20rem" }}
            mb="32px"
            pos="relative"
            zIndex={33}
          >
            <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
              Zones
            </Text>
            <Select
              styles={customStyles}
              placeholder="Select zone"
              options={zoneOptions}
              name="zone"
              value={values.zone}
              onChange={(selectedOption) => {
                setValues({
                  ...values,
                  zone: selectedOption,
                });
              }}
              components={{
                IndicatorSeparator: () => (
                  <div style={{ display: "none" }}></div>
                ),
                DropdownIndicator: () => (
                  <IoIosArrowDown size="15px" color="#646668" />
                ),
              }}
            />
          </Box>
          <MdClose
            size="20px"
            cursor="pointer"
            onClick={() => (
              // setShow(false),
              resetAllValues(),
              sessionStorage.removeItem("audit"),
              setSearchFilters({
                gte: new Date(today.getFullYear(), 0, 1).toLocaleDateString(
                  "en-CA"
                ),
                lte: today.toLocaleDateString("en-CA"),
                location: id,
                status: "",
              })
            )}
          />
        </Flex>

        <Flex
          flexDir={{ base: "column", lg: "row" }}
          align="flex-end"
          justifyContent="space-between"
          gap="32px"
        >
          <Flex
            align="center"
            gap="25px"
            w="full"
            flexWrap={{ base: "wrap", lg: "nowrap" }}
          >
            <Box w={{ base: "100%", md: "15rem" }}>
              <Text
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
                mb="8px"
                color="#646668"
              >
                Start Date
              </Text>
              <Flex
                align="center"
                w="full"
                border="1px solid #d4d6d8"
                borderLeft="0"
                borderRadius="4px"
                h="44px"
              >
                <Box className="new_class" w="full">
                  <DatePicker
                    placeholder="Select Date"
                    value={values?.gte}
                    onChange={(date) => setValues({ ...values, gte: date })}
                  />
                </Box>
              </Flex>
            </Box>

            <Box w={{ base: "100%", md: "15rem" }}>
              <Text
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
                mb="8px"
                color="#646668"
              >
                End Date
              </Text>
              <Flex
                align="center"
                w="full"
                border="1px solid #d4d6d8"
                borderLeft="0"
                borderRadius="4px"
                h="44px"
              >
                <Box className="new_class" w="full">
                  <DatePicker
                    placeholder="Select Date"
                    value={values?.lte}
                    onChange={(date) => setValues({ ...values, lte: date })}
                  />
                </Box>
              </Flex>
            </Box>

            <Box w={{ base: "full", md: "15rem" }} pos="relative" zIndex={33}>
              <Text
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
                mb="8px"
                color="#646668"
              >
                Audit Status
              </Text>
              <Select
                styles={customStyles}
                placeholder="Select status"
                options={showOptions}
                name="status"
                value={values.status}
                onChange={(selectedOption) => {
                  setValues({
                    ...values,
                    status: selectedOption,
                  });
                }}
                components={{
                  IndicatorSeparator: () => (
                    <div style={{ display: "none" }}></div>
                  ),
                  DropdownIndicator: () => (
                    <IoIosArrowDown size="15px" color="#646668" />
                  ),
                }}
              />
            </Box>
          </Flex>

          <Flex justifyContent="flex-end" w={{ base: "50%", md: "20%" }}>
            <Button
              isLoading={isLoading}
              variant="adminPrimary"
              onClick={handleSearch}
              h="45px"
              w="100%"
              type="submit"
            >
              Search
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box
        mt="24px"
        border="1px solid #d4d6d8"
        borderRadius="8px"
        p="16px 23px 24px"
      >
        <Flex
          justifyContent="flex-end"
          mb="16px"
          display={show ? "none" : "flex"}
        >
          <Button
            border="1px solid #d4d6d8"
            display="flex"
            py="10px"
            px={{ base: "7px", md: "16px" }}
            bg="transparent"
            borderRadius="8px"
            onClick={() => setShow(true)}
            gap={{ base: "7px", md: "16px" }}
            fontSize="14px"
          >
            <Text color="#646668">Filter</Text>

            <BsFilter fill="#646668" size="20px" />
          </Button>
        </Flex>

        <SingleLocationTable
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          startRow={startRow}
          endRow={endRow}
          refetch={refetch}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export default SingleLocation;
