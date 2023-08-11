import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, VStack } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "../../common/constants";
import AdminHeader from "./AdminHeader";
import { useLocation } from "react-router-dom";

export const AuthLayout = ({ children }) => {
  const [openSubItems, setOpenSubItems] = useState({});
  const { pathname } = useLocation();

  const handleToggleSubItem = (title) => {
    setOpenSubItems((prevState) => {
      // Create a new object to track the open state of sub-items
      const newOpenSubItems = {};

      // Close other sub-items
      Object.keys(prevState).forEach((item) => {
        newOpenSubItems[item] = false;
      });

      // newOpenSubItems[activeParentItem] = true;

      // Open the selected sub-item
      if (title) newOpenSubItems[title] = !prevState[title];

      return newOpenSubItems;
    });
  };

  useEffect(() => {
    handleToggleSubItem(null);
  }, [pathname]);

  return (
    <Box fontFamily="Sailec">
      <Flex minHeight="100vh">
        {/* Sidebar */}
        <Box
          as="aside"
          w="280px"
          bg="#1C0203"
          p={4}
          pt={8}
          h="100vh"
          position="fixed"
          boxShadow="4px 0px 24px 0px rgba(0, 0, 0, 0.25)"
          display={{ base: "none", lg: "block" }}
        >
          <Image src="/assets/ParkinSpace.svg" m="0 auto 3px" />
          <Text color="#fff" textAlign="center" fontSize="12px">
            Admin
          </Text>

          <VStack align="stretch" spacing={2} p={2} mt="30px">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                subItems={item.subItems}
                hoverIcon={item.hover}
                path={item.path}
                isOpen={openSubItems[item.title]}
                onToggleSubItem={handleToggleSubItem}
              />
            ))}
          </VStack>
        </Box>

        {/* Content Section */}
        <Box
          flex="1"
          p={5}
          ml={{ base: "0", lg: "280px" }}
          overflow="auto"
          w="100vw"
        >
          {/* Topbar */}
          <AdminHeader />

          {/* Page Content */}

          <Box mt={"20px"} minH="90vh" w="100%" borderRadius={8}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  return (
    <Box pos="relative" h="100vh">
      <Flex
        justifyContent="center"
        flexDirection={"column"}
        align="center"
        w="full"
        pb={5}
      >
        <Box w={{ base: "full", lg: "1295px" }} minH="90vh" px="20px">
          {children}
        </Box>
        <div className="text-center">
          <span className="text-black text-xs font-normal leading-3">
            Powered by
          </span>
          <Image src="/assets/ezlogo.png" />
        </div>
      </Flex>
    </Box>
  );
};
