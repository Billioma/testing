import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { NavLink, useLocation } from "react-router-dom";
import { clientStyle, clientSidebar } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Spinner } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";

const SideBar = () => {
  const logout = useLogOut();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      position={"fixed"}
      zIndex="5"
      pt="32px"
      h="full"
      px="16px"
      w="275px"
      bg="#fff"
      boxShadow="4px 0px 24px 0px rgba(0, 0, 0, 0.10)"
    >
      <Box flex="1">
        <Box pb="48px">
          <Text
            fontSize="28px"
            lineHeight="120%"
            textAlign="center"
            fontWeight={900}
            fontFamily="Cooper"
            className="font-bold font-[Cooper]"
          >
            <span style={{ color: "red" }}>Parkin</span>
            Space
          </Text>
          <Text textAlign="center" fontSize="12px" mt="16px" color="#646668">
            Business
          </Text>
        </Box>

        <Box mx="20px">
          {clientSidebar?.map((item, i) => {
            const isActivePath = location.pathname.includes(item.path);

            return (
              <Box
                key={i}
                className={location.pathname !== item.path && "parent_nav"}
              >
                <NavLink
                  to={item.path}
                  style={({ isActive }) =>
                    isActive
                      ? { ...clientStyle }
                      : {
                          ...clientStyle,
                          background: "transparent",
                          fontWeight: 400,
                          color: "#242628",
                        }
                  }
                >
                  <Flex align="center" justifyContent="space-between" w="full">
                    <Flex
                      transition=".3s ease-in-out"
                      align="center"
                      w="full"
                      className="child_nav"
                      gap="8px"
                    >
                      <Box w="16px" h="16px" className="hovered_image">
                        {item.hover}
                      </Box>

                      <Box w="16px" h="16px" className="initial_image">
                        {location.pathname === item.path ? item.sec : item.icon}
                      </Box>

                      {item.name}
                    </Flex>
                    {i === 3 && (
                      <Box className="child_nav">
                        <IoIosArrowForward />
                      </Box>
                    )}
                    {isActivePath ? (
                      <Box w="3px" h="28px" bg="#fff" rounded="full"></Box>
                    ) : (
                      ""
                    )}
                  </Flex>
                </NavLink>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Flex
        fontSize="14px"
        fontWeight={400}
        cursor="pointer"
        onClick={action}
        align="center"
        gap="8px"
        mb="39px"
      >
        {isLoading ? (
          <Flex gap="8px" color="red" align="center">
            <Spinner size="sm" /> Logging Out
          </Flex>
        ) : (
          <Flex gap="8px" align="center" color="#242628">
            <LogoutIcon fill="#242628" /> Log Out
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SideBar;
