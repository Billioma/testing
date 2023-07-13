import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useLogOut } from "../../utils/helpers";

const Dashboard = () => {
  const logout = useLogOut();
  return (
    <div>
      Dashboard
      <Flex justifyContent="flex-end">
        <Button onClick={logout}>Log Out</Button>
      </Flex>
    </div>
  );
};

export default Dashboard;
