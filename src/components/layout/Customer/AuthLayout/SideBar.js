import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { NavLink, useLocation } from "react-router-dom";
import { activeStyle, general } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Spinner } from "@chakra-ui/react";

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
      pt="40px"
      h="89vh"
      px="24px"
      w="275px"
      borderRadius="40px"
      bg="#fff"
    >
      <Box flex="1">
        <Flex pb="58px" justifyContent="space-between" align="center">
          <Box>
            <Text
              fontSize="24px"
              lineHeight="120%"
              fontWeight={900}
              fontFamily="Cooper"
              className="font-bold font-[Cooper]"
            >
              <span style={{ color: "red" }}>Parkin</span>
              Space Plus
            </Text>
          </Box>
        </Flex>

        <Box mx="20px">
          {general?.map((item, i) => (
            <Box
              key={i}
              className={location.pathname !== item.path && "parent_nav"}
            >
              <NavLink
                to={item.path}
                style={({ isActive }) =>
                  isActive
                    ? { ...activeStyle }
                    : {
                        ...activeStyle,
                        background: "transparent",
                        fontWeight: 400,
                        borderRight: "",
                        color: "#242628",
                      }
                }
              >
                <Flex align="center" justifyContent="space-between" w="full">
                  <Flex
                    transition=".3s ease-in-out"
                    align="center"
                    className="child_nav"
                    gap="8px"
                  >
                    <Box w="16px" h="16px" className="hovered_image">
                      {item.sec}
                    </Box>

                    <Box w="16px" h="16px" className="initial_image">
                      {location.pathname === item.path ? item.sec : item.icon}
                    </Box>

                    {item.name}
                  </Flex>
                  {location.pathname === item?.path ? (
                    <Box w="3px" h="28px" bg="#EE383A" rounded="full"></Box>
                  ) : (
                    ""
                  )}
                </Flex>
              </NavLink>
            </Box>
          ))}
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
