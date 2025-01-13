import React from "react";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { benefits } from "../../common/constants";
import { motion } from "framer-motion";

const Solution = () => {
  return (
    <Box mt={{ base: "", md: "150px" }}>
      <Box
        fontSize={{ base: "16px", md: "48px" }}
        lineHeight={{ base: "19px", md: "58px" }}
        fontFamily="Recoleta"
        textTransform="capitalize"
        fontWeight={500}
        mb={{ base: "40px", md: "80px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ x: [-50, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our solution delivers the following essential benefits and competitive
          advantages to enhance your experience.
        </motion.div>
      </Box>

      <Grid
        fontFamily="Satoshi"
        templateColumns={{ base: "", md: "repeat(3, 1fr)" }}
        alignContent="center"
        columnGap={{ base: "", md: "90px" }}
        rowGap={{ base: "24px", md: "110px" }}
      >
        {benefits.map((item, i) => (
          <GridItem key={i}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={item.img}
                w={{ base: "50px", md: "70px" }}
                h={{ base: "50px", md: "70px" }}
              />
            </motion.div>
            <Box
              mt="35px"
              mb="8px"
              color="#090C02"
              fontWeight={500}
              fontSize={{ base: "16px", md: "28px" }}
              lineHeight={{ base: "22px", md: "40px" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [-50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item.name}
              </motion.div>
            </Box>
            <Box
              color="#3D3D3D"
              fontSize={{ base: "14px", md: "16px" }}
              lineHeight={{ base: "19px", md: "25px" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item.body}
              </motion.div>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Solution;
