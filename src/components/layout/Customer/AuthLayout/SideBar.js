import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { general } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Image, VStack, Spinner, Collapse } from "@chakra-ui/react";
import { FiChevronsLeft } from "react-icons/fi";

const SideBar = ({ show, setShow }) => {
  const logout = useLogOut();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [openSubItems, setOpenSubItems] = useState({});
  const { pathname } = useLocation();

  const handleToggleSubItem = (name) => {
    setOpenSubItems((prevState) => {
      const newOpenSubItems = {};

      Object.keys(prevState).forEach((item) => {
        newOpenSubItems[item] = false;
      });

      const activeParentItem = general.find((item) =>
        pathname.includes(item.path)
      )?.name;

      newOpenSubItems[activeParentItem] = true;

      if (name) newOpenSubItems[name] = !prevState[name];

      return newOpenSubItems;
    });
  };

  useEffect(() => {
    handleToggleSubItem(null);
  }, [pathname]);

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
      h="calc(100% - 100px)"
      px={show ? "24px" : "4px"}
      w={show ? "275px" : "fit-content"}
      borderRadius="16px"
      bg="#fff"
    >
      <Box flex="1">
        <Box display={show ? "block" : "none"}>
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

        <Flex
          display={show ? "flex" : "none"}
          pr="16px"
          pb="30px"
          pt="10px"
          justifyContent="flex-end"
          w="full"
        >
          <FiChevronsLeft cursor="pointer" onClick={() => setShow(false)} />
        </Flex>

        <Flex
          pb="20px"
          display={!show ? "flex" : "none"}
          justifyContent="center"
          w="full"
        >
          <Image w="50px" h="50px" src="/assets/small-logo.jpg" />
        </Flex>

        <Box>
          {general?.map((item, i) => {
            return (
              <VStack
                key={i}
                align="stretch"
                my={
                  show
                    ? i !== 0 && pathname.includes(item?.path)
                      ? "5px"
                      : "unset"
                    : "12px"
                }
                className={!pathname.includes(item?.path) && "parent_nav"}
              >
                <Flex
                  align="center"
                  p={show ? 2 : "unset"}
                  w={show ? "unset" : "fit-content"}
                  py={show ? "10px" : "5px"}
                  pl={show ? "16px" : "16px"}
                  pr={show ? "2px" : "16px"}
                  mb="12px"
                  fontSize="15px"
                  lineHeight="100%"
                  cursor="pointer"
                  onClick={() =>
                    item.subItems
                      ? (navigate(item.subItems[0].path), setShow(true))
                      : navigate(item.path)
                  }
                  bg={
                    openSubItems[item.name] || pathname.includes(item.path)
                      ? "#FDE8E8"
                      : "transparent"
                  }
                  color={
                    pathname.includes(item.path) || openSubItems[item.name]
                      ? "#EE383A"
                      : "#646668"
                  }
                  fontWeight={500}
                  _hover={{
                    bg: pathname.includes(item.path) ? "" : "transparent",
                    color: pathname.includes(item.path) ? "" : "#EE383A",
                  }}
                  borderRadius={4}
                  position="relative"
                >
                  <Box className="hovered_image">{item.sec}</Box>

                  <Box className="initial_image" w="16px" h="16px">
                    {pathname.includes(item.path)
                      ? item.sec
                      : openSubItems[item.name]
                      ? item.sec
                      : item.icon}
                  </Box>
                  <Box display={show ? "box" : "none"}>
                    <Text ml="8px">{item.name}</Text>
                  </Box>

                  {pathname.includes(item.path) ? (
                    <Box
                      position="absolute"
                      top="50%"
                      right={2}
                      display={show ? "box" : "none"}
                      transform="translateY(-50%)"
                      w="3px"
                      h="28px"
                      bg="#EE383A"
                      borderRadius={4}
                    />
                  ) : (
                    item.subItems && (
                      <Box
                        flex="1"
                        textAlign="right"
                        display={show ? "box" : "none"}
                        pb={1}
                        color={openSubItems[item.name] ? "#fff" : "black"}
                      ></Box>
                    )
                  )}
                </Flex>

                {item.subItems && show && (
                  <Collapse in={openSubItems[item.name]}>
                    <VStack align="stretch">
                      {item.subItems.map((subItems, i) => (
                        <Flex
                          align="center"
                          key={i}
                          style={{
                            textDecoration: "none",
                            fontWeight: pathname.includes(subItems.path)
                              ? "700"
                              : "400",
                            color: pathname.includes(subItems.path)
                              ? "#444648"
                              : "#848688",
                          }}
                        >
                          <Box fontSize="13px" pb="12px" ml="20px">
                            <Link key={subItems.name} to={subItems.path}>
                              {subItems.name}
                            </Link>
                          </Box>
                        </Flex>
                      ))}
                    </VStack>
                  </Collapse>
                )}
              </VStack>
            );
          })}

          <Flex
            fontSize="15px"
            cursor="pointer"
            onClick={action}
            align="center"
            gap="8px"
            lineHeight="100%"
            mb="39px"
            fontWeight={500}
            p={show ? 2 : "unset"}
            w={show ? "unset" : "fit-content"}
            pt={show ? 3 : "5px"}
            px={show ? "16px" : "16px"}
            pb={show ? 2 : "5px"}
          >
            {isLoading ? (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap="5px"
                color="red"
                align="center"
                fontWeight={500}
              >
                <Spinner size="sm" />{" "}
                <Text display={show ? "box" : "none"}>Logging Out</Text>
              </Flex>
            ) : (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap="5px"
                align="center"
                color="#646668"
              >
                <LogoutIcon fill="#646668" />{" "}
                <Text display={show ? "box" : "none"}>Log Out</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </Box>

      {show ? (
        ""
      ) : (
        <Flex flexDir="column" justifyContent="center" align="center" mb="40px">
          <Image
            onClick={() => setShow(true)}
            cursor="pointer"
            src="/assets/expand-arrow.svg"
            w="24px"
            h="24px"
          />
        </Flex>
      )}

      <Flex
        mt="auto"
        mb="39px"
        flexDir="column"
        display={show ? "flex" : "none"}
        justifyContent="center"
        align="center"
      >
        <Text fontSize="14px" color="#000" lineHeight="100%" mb="8px">
          Powered by
        </Text>
        <Image src="/assets/ezlogo.svg" objectFit="cover" />
      </Flex>
    </Flex>
  );
};

export default SideBar;
