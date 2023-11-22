import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { NavLink, useLocation } from "react-router-dom";
import {
  clientStyle,
  corpSidebar,
  eventSidebar,
  businessSidebar,
  clientSubStyle,
} from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Image, Spinner } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { useGetClientDetails } from "../../../../services/client/query/user";

const SideBar = () => {
  const logout = useLogOut();
  const location = useLocation();
  const { data: userData } = useGetClientDetails();
  const [isLoading, setIsLoading] = useState(false);

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  const sideBarMap =
    userData?.accountType === "CORPORATE"
      ? corpSidebar
      : userData?.accountType === "EVENT_PLANNER"
      ? eventSidebar
      : userData?.accountType === "BUSINESS"
      ? businessSidebar
      : corpSidebar;

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
          <Text textAlign="center" fontSize="12px" mt="10px" color="#646668">
            {userData?.accountType === "CORPORATE"
              ? "Corporate"
              : userData?.accountType === "EVENT_PLANNER"
              ? "Event"
              : userData?.accountType === "BUSINESS" && "Business"}{" "}
            Client
          </Text>
        </Box>

        <Box mx="20px">
          {sideBarMap?.map((item, i) => {
            const isLogsPath = location.pathname.includes("client/logs");
            const isActivePath =
              location.pathname.includes(item.path) || (isLogsPath && item.sub);
            return (
              <Box
                key={i}
                className={
                  item.path.includes("client/logs")
                    ? ""
                    : !location.pathname.includes(item.path) && "parent_nav"
                }
              >
                <NavLink
                  to={
                    item.path === "/client/logs"
                      ? "/client/logs/pay-to-park"
                      : item?.path
                  }
                  style={({ isActive }) =>
                    isActive || isActivePath
                      ? { ...clientStyle }
                      : {
                          ...clientStyle,
                          background: "transparent",
                          fontWeight: 500,
                          color: "#646668",
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
                        {location.pathname === item.path || isActivePath
                          ? item.sec
                          : item.icon}
                      </Box>

                      {item.name}
                    </Flex>
                    {i === 1 &&
                      !isLogsPath &&
                      userData?.accountType === "BUSINESS" && (
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

                {location.pathname.includes("client/logs") &&
                  item?.sub?.map((data) => (
                    <Box mt="-10px">
                      <NavLink
                        to={data.path}
                        style={({ isActive }) =>
                          isActive
                            ? { ...clientSubStyle }
                            : {
                                ...clientSubStyle,
                                fontWeight: 500,
                                color: "#646668",
                              }
                        }
                      >
                        <Flex
                          align="center"
                          justifyContent="space-between"
                          w="full"
                        >
                          <Flex
                            transition=".3s ease-in-out"
                            align="center"
                            w="full"
                            pl={1.5}
                            style={{
                              textDecoration: "none",
                              color: "#444648",
                              fontWeight: location.pathname.includes(data.path)
                                ? "700"
                                : "400",
                            }}
                          >
                            <Text fontSize="11px" ml="18px" mb={0}>
                              {data.name}
                            </Text>
                          </Flex>{" "}
                          {isActivePath ? (
                            <Box
                              w="3px"
                              h="24px"
                              bg="#fff"
                              rounded="full"
                            ></Box>
                          ) : (
                            ""
                          )}
                        </Flex>
                      </NavLink>
                    </Box>
                  ))}
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
            fontWeight={500}
          >
            {isLoading ? (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap="5px"
                color="red"
                align="center"
              >
                <Spinner size="sm" /> Logging Out
              </Flex>
            ) : (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap="5px"
                align="center"
                color="#646668"
              >
                <LogoutIcon fill="#646668" /> Log Out
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>

      <Flex
        pos="sticky"
        bg="#fff"
        left="0"
        right="0"
        justifyContent="center"
        zIndex={55555}
        h="7rem"
        pt="10px"
        pb="20px"
        w="full"
      >
        <Flex flexDir="column" justifyContent="center" align="center">
          <Text fontSize="12px" color="#000" lineHeight="100%" mb="8px">
            Powered by
          </Text>
          <Image src="/assets/ezlogo.svg" objectFit="cover" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
