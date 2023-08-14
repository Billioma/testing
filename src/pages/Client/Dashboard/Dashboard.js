import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box minH="75vh">
      <Grid
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        <GridItem></GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
