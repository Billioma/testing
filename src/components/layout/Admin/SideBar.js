import React, { useEffect, useState } from "react";
import { Box, Flex, Text, VStack, Collapse, Image } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { sidebarItems } from "../../common/constants";
import { FiChevronsLeft } from "react-icons/fi";

const SideBar = ({ show, setShow }) => {
  const [openSubItems, setOpenSubItems] = useState({});
  const { pathname } = useLocation();

  const handleToggleSubItem = (name) => {
    setOpenSubItems((prevState) => {
      const newOpenSubItems = {};

      Object.keys(prevState).forEach((item) => {
        newOpenSubItems[item] = false;
      });

      const activeParentItem = sidebarItems.find((item) =>
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

  const navigate = useNavigate();

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      position={"fixed"}
      zIndex={66}
      pt="32px"
      h="full"
      overflowY="scroll"
      px={show ? "16px" : "4px"}
      w={show ? "275px" : "fit-content"}
      bg="#fff"
      boxShadow="4px 0px 24px 0px rgba(0, 0, 0, 0.25)"
    >
      <Box flex="1">
        <Box
          mx="-16px"
          mt="-32px"
          pt="32px"
          bg="#fff"
          zIndex={33}
          pos="sticky"
          display={show ? "block" : "none"}
          top="-32px"
        >
          <Text
            fontSize="28px"
            lineHeight="120%"
            textAlign="center"
            fontWeight={900}
            fontFamily="Cooper"
          >
            <span style={{ color: "red" }}>Parkin</span>
            Space
          </Text>
          <Text textAlign="center" fontSize="15px" mt="12px" color="#444648">
            Admin
          </Text>

          <Flex
            display={show ? "flex" : "none"}
            pr="16px"
            pb="10px"
            justifyContent="flex-end"
            w="full"
          >
            <FiChevronsLeft cursor="pointer" onClick={() => setShow(false)} />
          </Flex>
        </Box>

        <Flex
          pb="20px"
          display={!show ? "flex" : "none"}
          justifyContent="center"
          w="full"
        >
          <Image w="50px" h="50px" src="/assets/small-logo.jpg" />
        </Flex>

        <Box>
          {sidebarItems?.slice(0, 9)?.map((item, i) => {
            return (
              <VStack
                key={i}
                align="stretch"
                mb={show ? "unset" : "12px"}
                className={!pathname.includes(item?.path) && "parent_nav"}
                gap={0}
              >
                <Flex
                  align="center"
                  p={show ? 2 : "unset"}
                  w={show ? "unset" : "fit-content"}
                  pt={show ? 3 : "5px"}
                  px={show ? 2 : "16px"}
                  pb={show ? 2 : "5px"}
                  cursor="pointer"
                  onClick={() =>
                    item.subItems
                      ? (navigate(item.subItems[0].path), setShow(true))
                      : navigate(item.path)
                  }
                  bg={
                    openSubItems[item.name] || pathname.includes(item.path)
                      ? "#EE383A"
                      : "transparent"
                  }
                  color={
                    pathname.includes(item.path) || openSubItems[item.name]
                      ? "#fff"
                      : "#646668"
                  }
                  fontWeight={500}
                  _hover={{
                    bg: pathname.includes(item.path) ? "" : "transparent",
                    color: pathname.includes(item.path) ? "" : "#EE383A",
                  }}
                  transition=".3s ease-in-out"
                  borderRadius={4}
                  position="relative"
                >
                  <Box className="hovered_image">{item.hover}</Box>

                  <Box className="initial_image">
                    {pathname.includes(item.path)
                      ? item.sec
                      : openSubItems[item.name]
                      ? item.hover
                      : item.icon}
                  </Box>
                  <Box display={show ? "box" : "none"}>
                    <Text fontSize="15px" ml={4} mb={0}>
                      {item.name}
                    </Text>
                  </Box>

                  {pathname.includes(item.path) ? (
                    <Box
                      position="absolute"
                      top="50%"
                      display={show ? "box" : "none"}
                      right={2}
                      transform="translateY(-50%)"
                      w="3px"
                      h="25px"
                      bg="#fff"
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
                      >
                        {openSubItems[item.name] ? (
                          <ChevronDownIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </Box>
                    )
                  )}
                </Flex>

                {item.subItems && show && (
                  <Collapse in={openSubItems[item.name]}>
                    <VStack
                      pl={3}
                      align="stretch"
                      borderBottomRadius={4}
                      pb="2"
                      gap={0}
                    >
                      {item.subItems.map((subItem) => (
                        <Flex
                          align="center"
                          mt="15px"
                          style={{
                            textDecoration: "none",
                            color: "#444648",
                            fontWeight: pathname.includes(subItem.path)
                              ? "700"
                              : "400",
                          }}
                        >
                          <Box fontSize="13px" ml="26px" mb={0}>
                            <Link key={subItem.name} to={subItem.path}>
                              {subItem.name}
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
        </Box>

        <Box my="24px">
          <Text
            color="#444648"
            lineHeight="100%"
            fontSize="14px"
            fontWeight={700}
            display={show ? "box" : "none"}
            px={2}
            pb={location.pathname.includes("/admin/logs") ? "15px" : "3px"}
          >
            ADMINSTRATOR
          </Text>
          {sidebarItems?.slice(9, 12)?.map((item, i) => {
            return (
              <VStack
                key={i}
                mb={show ? "unset" : "12px"}
                align="stretch"
                className={!pathname.includes(item?.path) && "parent_nav"}
                gap={0}
              >
                <Flex
                  align="center"
                  p={show ? 2 : "unset"}
                  w={show ? "unset" : "fit-content"}
                  pt={show ? 3 : "5px"}
                  px={show ? 2 : "16px"}
                  pb={show ? 2 : "5px"}
                  cursor="pointer"
                  onClick={() =>
                    item.subItems
                      ? (navigate(item.subItems[0].path), setShow(true))
                      : navigate(item.path)
                  }
                  bg={
                    openSubItems[item.name] || pathname.includes(item.path)
                      ? "#EE383A"
                      : "transparent"
                  }
                  color={
                    pathname.includes(item.path) || openSubItems[item.name]
                      ? "#fff"
                      : "#646668"
                  }
                  fontWeight={500}
                  _hover={{
                    bg: pathname.includes(item.path) ? "" : "transparent",
                    color: pathname.includes(item.path) ? "" : "#EE383A",
                  }}
                  transition=".3s ease-in-out"
                  borderRadius={4}
                  position="relative"
                >
                  <Box className="hovered_image">{item.hover}</Box>

                  <Box className="initial_image">
                    {pathname.includes(item.path)
                      ? item.sec
                      : openSubItems[item.name]
                      ? item.hover
                      : item.icon}
                  </Box>
                  <Box display={show ? "box" : "none"}>
                    <Text fontSize="15px" ml={4} mb={0}>
                      {item.name}
                    </Text>
                  </Box>

                  {pathname.includes(item.path) ? (
                    <Box
                      position="absolute"
                      top="50%"
                      right={2}
                      display={show ? "box" : "none"}
                      transform="translateY(-50%)"
                      w="3px"
                      h="25px"
                      bg="#fff"
                      borderRadius={4}
                    />
                  ) : (
                    item.subItems && (
                      <Box
                        flex="1"
                        display={show ? "box" : "none"}
                        textAlign="right"
                        pb={1}
                        color={openSubItems[item.name] ? "#fff" : "black"}
                      >
                        {openSubItems[item.name] ? (
                          <ChevronDownIcon />
                        ) : (
                          <ChevronRightIcon />
                        )}
                      </Box>
                    )
                  )}
                </Flex>

                {item.subItems && show && (
                  <Collapse in={openSubItems[item.name]}>
                    <VStack
                      pl={3}
                      align="stretch"
                      borderBottomRadius={4}
                      pb="2"
                      gap={0}
                    >
                      {item.subItems.map((subItem) => (
                        <Flex
                          align="center"
                          mt="15px"
                          style={{
                            textDecoration: "none",
                            color: "#444648",
                            fontWeight: pathname.includes(subItem.path)
                              ? "700"
                              : "400",
                          }}
                        >
                          <Box fontSize="13px" ml="26px">
                            <Link key={subItem.name} to={subItem.path}>
                              {subItem.name}
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
    </Flex>
  );
};

export default SideBar;
