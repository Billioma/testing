import React, { useState } from "react";
import { useLogOut } from "../../../utils/helpers";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";

const Dashboard = () => {
  const logout = useLogOut();
  const [isLoading, setIsLoading] = useState(false);

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box>
      Dashboard
      <Box m="50px">
        <Button isLoading={isLoading} onClick={action}>
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
