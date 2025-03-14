import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useGetLocations } from "../../../../services/admin/query/locations";
import { IoIosArrowDown } from "react-icons/io";
import { customStyles } from "../../../../components/common/constants";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import { useGetSalesReports } from "../../../../services/admin/query/audit";
import LocationTable from "../../../../components/data/Admin/Audit/Locations/LocationTable";
import { BsFilter } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { formatFilterDate } from "../../../../utils/helpers";
import { useGetAdministrators } from "../../../../services/admin/query/users";

const Locations = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [values, setValues] = useState({
    location: "",
    gte: "",
    manager: "",
    lte: "",
    status: "",
  });

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    setValues((prev) => ({
      ...prev,
      gte: yesterday.toISOString().split("T")[0],
      lte: today.toISOString().split("T")[0],
    }));
    setSearchFilters({
      ...values,
      gte: yesterday.toISOString().split("T")[0],
      lte: today.toISOString().split("T")[0],
    });
  }, []);

  const [show, setShow] = useState(true);

  const resetAllValues = () => {
    setValues({
      location: "",
      gte: "",
      lte: "",
      manager: "",
      status: "",
    });
  };
  const { data: locations } = useGetLocations({}, 1, 1000);
  const { data: managers } = useGetAdministrators({}, 1, 1000);

  const managerOptions = managers?.data
    ?.filter((item) => item?.isManager)
    ?.map((staff) => ({
      label: `${staff?.firstName} ${staff?.lastName}`,
      value: Number(staff?.id),
    }));

  const locationOptions = locations?.data?.map((location) => ({
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
        searchFilters.location &&
          `filter=location.name||$cont||${searchFilters.location.label}`,
        searchFilters.manager &&
          `filter=manager.firstName||$cont||${
            searchFilters.manager.label.split(" ")[0]
          }`,
        searchFilters.gte &&
          `filter=createdAt||$gte||${formatFilterDate(
            searchFilters.gte
          )}T00:00:00`,
        searchFilters.lte &&
          `filter=createdAt||$lte||${formatFilterDate(
            searchFilters.lte
          )}T23:59:59`,
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
      <Box
        display={show ? "block" : "none"}
        border="1px solid #d4d6d8"
        borderRadius="8px"
        p="16px 23px 24px"
      >
        <Flex
          align={{ base: "flex-end", md: "flex-start" }}
          flexDir={{ base: "column-reverse", md: "row" }}
          justifyContent="space-between"
        >
          <Flex align="center" gap="24px">
            <Box
              w={{ base: "100%", md: "20rem" }}
              mb="32px"
              pos="relative"
              zIndex={33}
            >
              <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                Locations
              </Text>
              <Select
                styles={customStyles}
                placeholder="Select location"
                options={locationOptions}
                name="location"
                value={values.location}
                onChange={(selectedOption) => {
                  setValues({
                    ...values,
                    location: selectedOption,
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
            <Box
              w={{ base: "100%", md: "20rem" }}
              mb="32px"
              pos="relative"
              zIndex={43}
            >
              <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                Manager
              </Text>
              <Select
                styles={customStyles}
                placeholder="Select manager"
                options={managerOptions}
                name="manager"
                value={values.manager}
                onChange={(selectedOption) => {
                  setValues({
                    ...values,
                    manager: selectedOption,
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
          <MdClose
            size="20px"
            cursor="pointer"
            onClick={() => (
              setShow(false), resetAllValues(), setSearchFilters(null)
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
                    onChange={(date) => {
                      setValues({ ...values, gte: date });
                    }}
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
                    onChange={(date) => {
                      setValues({ ...values, lte: date });
                    }}
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

        <LocationTable
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

export default Locations;
