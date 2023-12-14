import React from "react";
import {
  Box,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FAQ = ({ label, data, i }) => {
  return (
    <AccordionItem
      border="1px solid #D4D6D8"
      borderTop={i !== 0 ? "0" : "1px solid #D4D6D8"}
      borderLeft="0"
      borderRight="0"
    >
      {({ isExpanded }) => (
        <Box color="#242628">
          <h2>
            <AccordionButton _hover={{ bg: "transparent" }}>
              <Box
                pt="24px"
                pb={isExpanded ? "" : "24px"}
                fontSize={{ base: "15px", md: "20px" }}
                fontWeight={500}
                flex="1"
                textAlign="left"
              >
                {label}
              </Box>
              {isExpanded ? (
                <AiOutlineMinus size="24px" />
              ) : (
                <AiOutlinePlus size="24px" />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Box
              whiteSpace="pre-wrap"
              lineHeight="150%"
              fontSize={{ base: "14px", md: "18px" }}
              color="#646668"
            >
              {data}
            </Box>
          </AccordionPanel>
        </Box>
      )}
    </AccordionItem>
  );
};

export default FAQ;
