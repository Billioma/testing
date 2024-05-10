import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  paginate,
  paginationValues,
  useDefaultPagination = false,
}) => {
  return (
    <Box mt="20px">
      {useDefaultPagination ? (
        <DefaultPagination
          total={paginationValues.total}
          startRow={paginationValues.startRow}
          endRow={paginationValues.endRow}
          page={paginationValues.page}
          pageCount={paginationValues.pageCount}
          setLimit={paginationValues.setLimit}
          limit={paginationValues.limit}
          onNext={paginationValues.onNext}
          onPrevious={paginationValues.onPrevious}
        />
      ) : (
        paginate
      )}
    </Box>
  );
};

export default Pagination;

const DefaultPagination = ({
  total,
  startRow,
  endRow,
  page,
  pageCount,
  limit,
  setLimit,
  onNext,
  onPrevious,
}) => {
  return (
    <Flex justifyContent="center" align="center" flexDir="column" w="full">
      <Flex justifyContent="center" gap="32px" align="center" pb={5}>
        <Text fontSize="14px" color="#242628" lineHeight="100%">
          Showing rows {startRow} to {endRow} of {total}
        </Text>

        <Flex gap="16px" align="center">
          <Flex
            opacity={page === 1 ? 0.5 : 1}
            onClick={onPrevious}
            cursor={page === 1 ? "" : "pointer"}
            align="center"
            gap="2px"
            color="#A4A6A8"
            fontSize="14px"
          >
            <IoIosArrowBack />
            <Text lineHeight="100%">Previous</Text>
          </Flex>

          <Flex align="center" gap="5px" color="#A4A6A8" fontSize="14px">
            <Flex
              bg="transparent"
              py="6px"
              px="8px"
              color="#242628"
              fontSize="14px"
              lineHeight="100%"
            >
              <Text>{page}</Text>
            </Flex>
          </Flex>

          <Flex
            opacity={page === pageCount ? 0.5 : 1}
            onClick={onNext}
            cursor={page === pageCount ? "" : "pointer"}
            align="center"
            gap="2px"
            color="#A4A6A8"
            fontSize="14px"
          >
            <IoIosArrowForward />
            <Text lineHeight="100%">Next</Text>
          </Flex>
        </Flex>

        <Select
          defaultValue={limit}
          w="fit-content"
          size="sm"
          bg="transparent"
          fontSize="14px"
          borderRadius={8}
          borderWidth={1}
          onChange={(e) => setLimit(e.target.value)}
        >
          {["25", "50", "100", "200"].map((dat, i) => (
            <option key={i} value={dat}>
              {dat}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};
