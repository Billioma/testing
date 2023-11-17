import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { NavLink, useLocation } from "react-router-dom";
import { activeStyle, general } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Image, Spinner } from "@chakra-ui/react";

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
      h="90vh"
      px="24px"
      w="275px"
      borderRadius="40px"
      bg="#fff"
    >
      <Box flex="1">
        <Box pb="58px">
          <Text
            fontSize="24px"
            lineHeight="120%"
            textAlign="center"
            fontWeight={900}
            fontFamily="Cooper"
            className="font-bold font-[Cooper]"
          >
            <span style={{ color: "red" }}>Parkin</span>
            Space
          </Text>
        </Box>

        <Box mx="20px">
          {general?.map((item, i) => {
            const isActivePath = location.pathname.includes(item.path);

            return (
              <Box
                key={i}
                className={
                  !location.pathname.includes(item?.path) && "parent_nav"
                }
              >
                <NavLink
                  to={item.path}
                  style={({ isActive }) =>
                    isActive || isActivePath
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
                        {location.pathname === item.path || isActivePath
                          ? item.sec
                          : item.icon}
                      </Box>

                      {item.name}
                    </Flex>
                    {isActivePath ? (
                      <Box w="3px" h="28px" bg="#EE383A" rounded="full"></Box>
                    ) : (
                      ""
                    )}
                  </Flex>
                </NavLink>
              </Box>
            );
          })}

          <Flex
            fontSize="13px"
            cursor="pointer"
            onClick={action}
            align="center"
            gap="8px"
            lineHeight="100%"
            mb="39px"
            margin="0 -20px 12px"
            padding="5px 2px 5px 16px"
          >
            {isLoading ? (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap="5px"
                color="red"
                align="center"
                fontWeight={500}
              >
                <Spinner size="sm" /> Logging Out
              </Flex>
            ) : (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap="5px"
                align="center"
                color="#242628"
              >
                <LogoutIcon fill="#242628" /> Log Out
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>

      <Flex
        mt="auto"
        mb="39px"
        flexDir="column"
        justifyContent="center"
        align="center"
      >
        <Text fontSize="12px" color="#000" lineHeight="100%" mb="8px">
          Powered by
        </Text>
        <Image src="/assets/ezlogo.svg" objectFit="cover" />
      </Flex>
    </Flex>
  );
};

export default SideBar;
