import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useGetTickets } from "../../../services/attendant/query/logs";
import Calendar from "react-calendar";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [tab, setTab] = useState("");
  const navigate = useNavigate();
  const [dates, setDates] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [values, setValues] = useState({
    from: "",
    to: "",
    term: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState(values.term);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(values.term);
    }, 500);

    return () => clearTimeout(handler);
  }, [values.term]);

  const mapping = [
    { title: "Total", value: "" },
    { title: "Retrieved", value: 1 },
    { title: "Parked", value: 0 },
  ];

  const attZone = JSON.parse(localStorage.getItem("attZone"));

  const { data, isLoading, refetch } = useGetTickets(
    attZone?.id,
    values.from,
    values.to,
    debouncedSearch,
    { refetchOnWindowFocus: true },
  );

  const dataToMap =
    tab === "" ? data : data?.filter((item) => item?.delivered === tab);
  const handleChange = (selectedDates) => {
    setDates(selectedDates);

    if (Array.isArray(selectedDates)) {
      const from = selectedDates[0].toISOString().split("T")[0];
      const to = selectedDates[1].toISOString().split("T")[0];
      setValues({ ...values, from, to });
      setShowCalendar(false);
    } else if (selectedDates) {
      const date = selectedDates.toISOString().split("T")[0];
      setValues({ ...values, from: date, to: date });
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.removeItem("history");
    refetch();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return n + "th";
      switch (n % 10) {
        case 1:
          return n + "st";
        case 2:
          return n + "nd";
        case 3:
          return n + "rd";
        default:
          return n + "th";
      }
    };

    return `${getOrdinal(day)} ${month}. ${year}`;
  };

  return (
    <Box>
      <Flex align="center" gap="12px">
        <Box w="85%">
          <CustomInput
            mb
            holder="Search by customer name or vehicle type"
            value={values.term}
            onChange={(e) => setValues({ ...values, term: e.target.value })}
          />
        </Box>

        <Box w="15%" className="wide-calendar" pos="relative">
          <Flex
            border="1px solid #D4D6D8"
            borderRadius="8px"
            onClick={(e) => {
              e.stopPropagation();
              setShowCalendar((prev) => !prev);
            }}
            w="48px"
            className="box"
            h="48px"
            cursor="pointer"
            justifyContent="center"
            align="center"
          >
            <FaRegCalendarAlt size={18} />
          </Flex>

          {showCalendar && (
            <Box
              onClick={(e) => e.stopPropagation()}
              position="absolute"
              right="0"
              w="300px"
              zIndex={10}
              mt={2}
            >
              <Calendar selectRange onChange={handleChange} value={dates} />
            </Box>
          )}
        </Box>
      </Flex>

      <Flex
        mt="24px"
        align="center"
        gap="16px"
        w="fit-content"
        display={values.from && values.to ? "flex" : "none"}
        p="9px 4px"
        bg="#fff"
        fontSize="10px"
        borderRadius="4px"
        color="#444648"
      >
        <Text>
          {formatDate(values.from)} - {formatDate(values.to)}
        </Text>

        <MdClose onClick={() => setValues({ ...values, from: "", to: "" })} />
      </Flex>

      <Flex align="center" my="24px" gap="12px" justifyContent="space-between">
        {mapping.map((item, i) => (
          <Flex
            key={i}
            align="center"
            gap="10px"
            bg={tab === item?.value ? "#EE383A" : "#fff"}
            cursor="pointer"
            onClick={() => setTab(item?.value)}
            color={tab === item?.value ? "#fff" : "#646668"}
            fontSize="14px"
            border={tab === item?.value ? "" : "1px solid #E4E6E8"}
            w="full"
            borderRadius="8px"
            p="8px 10px"
          >
            <Text>{item?.title}</Text>
            <Flex
              fontSize="10px"
              w="20px"
              h="20px"
              justifyContent="center"
              align="center"
              borderRadius="4px"
              bg={tab === item?.value ? "#fff" : "#E4E6E8"}
              color={tab === item?.value ? "#EE383A" : "#848688"}
            >
              {
                [
                  data?.length,
                  data?.filter((item) => item?.delivered)?.length,
                  data?.filter((item) => !item?.delivered)?.length,
                ][i]
              }
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex flexDir="column" gap="16px">
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <Skeleton key={i} h="120px" w="100%" borderRadius="8px" />
            ))
          : dataToMap?.length
          ? dataToMap?.map((item, i) => (
              <Box
                key={i}
                bg="#fff"
                border="1px solid #E4E6E8"
                borderRadius="8px"
                onClick={() => {
                  navigate(`/attendant/history/${item?.id}`);
                  localStorage.setItem("history", JSON.stringify(item));
                }}
                p="24px"
                fontSize="14px"
                color="#242628"
              >
                <Flex align="center" justifyContent="space-between">
                  <Text fontWeight={700}>
                    {item?.vehicle?.make?.name} {item?.vehicle?.model?.name} (
                    {item?.vehicle?.color})
                  </Text>

                  <Text
                    bg={item?.delivered ? "#E3FDE7" : "#FFEDD2"}
                    color={item?.delivered ? "#008A16" : "#F79E1B"}
                    fontSize="14px"
                    borderRadius="4px"
                    p="4px 6px"
                  >
                    {item?.delivered ? "Retrieved" : "Parked"}
                  </Text>
                </Flex>

                <Flex
                  mt="24px"
                  mb="16px"
                  align="center"
                  justifyContent="space-between"
                >
                  <Text>Date</Text>
                  <Text>{formatDate(item?.timeIn)}</Text>
                </Flex>

                <Flex align="center" justifyContent="space-between">
                  <Text>Vehicle</Text>
                  <Text>
                    {" "}
                    {item?.vehicle?.make?.name} {item?.vehicle?.model?.name} -
                    {item?.vehicle?.licensePlate}
                  </Text>
                </Flex>
              </Box>
            ))
          : ""}
      </Flex>
    </Box>
  );
};

export default index;
