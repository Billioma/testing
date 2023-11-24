import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import TableLayer from "../../../components/data/Client/Events/TableLayer";
import { useGetEvents } from "../../../services/client/query/events";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/common/Filter";
import { clientEventFieldOption } from "../../../components/common/constants";

const Events = () => {
  const { mutate, data, isLoading } = useGetEvents();

  const [page, setPage] = useState(1);
  const limit = 10;

  const [filtArray, setFiltArray] = useState([]);
  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");

  const navigate = useNavigate();

  useEffect(() => {
    mutate({ filterString: query, limit, page: page });
  }, [page, query]);

  return (
    <Box minH="75vh">
      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Filter
          setFiltArray={setFiltArray}
          fieldToCompare={clientEventFieldOption}
          filtArray={filtArray}
          gap
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Events
            </Text>
          }
          main={
            <>
              {" "}
              <Button
                onClick={() => navigate("/client/events/create")}
                display="flex"
                gap="8px"
                fontSize=""
              >
                <Text fontSize="12px">Add an Event</Text>
                <MdAdd size="20px" />
              </Button>
              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={() =>
                  mutate({ filterString: query, limit, page: page })
                }
                borderRadius="8px"
                border="1px solid #848688"
                p="10px"
              >
                <Image
                  src="/assets/refresh.svg"
                  className={isLoading && "mirrored-icon"}
                  w="20px"
                  h="20px"
                />
              </Flex>
            </>
          }
        />

        <TableLayer
          eventMutate={mutate}
          page={page}
          setPage={setPage}
          data={data}
          limit={limit}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Events;
