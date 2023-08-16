import React from "react";
import { Accordion, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import FAQ from "../../../components/data/Customer/Help/FAQ";
import { useGetFaq } from "../../../services/customer/query/user";

const Faq = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFaq();

  return (
    <Box minH="75vh">
      <Flex
        onClick={() => navigate(-1)}
        color="#242628"
        align="center"
        cursor="pointer"
        mb="23px"
        w="fit-content"
        pos="sticky"
        top="6rem"
        gap="8px"
      >
        <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
        <Text fontSize="14px" fontWeight={500} lineHeight="100%">
          Back
        </Text>
      </Flex>
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="32px"
          px="24px"
          justifyContent="center"
          w={{ base: "full", md: "40rem" }}
          flexDir="column"
        >
          <Text
            textAlign="center"
            color="#242628"
            fontWeight={700}
            fontSize="32px"
            lineHeight="100%"
          >
            Frequently Asked Questions
          </Text>

          {isLoading ? (
            <Flex my="60px" justifyContent="center" align="center">
              <Spinner size="xl" thickness="4px" color="red" />
            </Flex>
          ) : (
            <Box mt="40px">
              <Accordion allowToggle>
                {data?.length ? (
                  data?.map((data, i) => (
                    <Box key={i} whiteSpace="pre-line">
                      <FAQ
                        i={i}
                        dat={data}
                        label={data?.title}
                        data={data?.body}
                      />
                    </Box>
                  ))
                ) : (
                  <></>
                )}
              </Accordion>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Faq;
