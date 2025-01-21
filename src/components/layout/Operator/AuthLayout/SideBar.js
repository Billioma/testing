import React, { useState } from "react";
import { Box, Flex, Text, VStack, Collapse, Image } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { operatorSidebar } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Spinner } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FiChevronsLeft } from "react-icons/fi";

const SideBar = ({ show, setShow }) => {
  const logout = useLogOut();
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      position={"fixed"}
      zIndex="5"
      pt="32px"
      h="full"
      px={show ? "16px" : "4px"}
      w={show ? "275px" : "fit-content"}
      bg="#fff"
      boxShadow="4px 0px 24px 0px rgba(0, 0, 0, 0.10)"
    >
      <Box flex="1">
        <Box>
          <Text
            fontSize="28px"
            lineHeight="120%"
            textAlign="center"
            display={show ? "block" : "none"}
            fontWeight={900}
            fontFamily="Cooper"
          >
            <span style={{ color: "red" }}>Parkin</span>
            Space
          </Text>
          <Text
            textAlign="center"
            fontSize="14px"
            display={show ? "block" : "none"}
            fontWeight={700}
            mt="16px"
            color="#646668"
          >
            Operator
          </Text>

          <Flex
            display={show ? "flex" : "none"}
            pr="16px"
            pb="30px"
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
          {operatorSidebar?.map((item, i) => {
            return (
              <VStack
                key={i}
                align="stretch"
                my={
                  show
                    ? showMenu
                      ? showMenu && currentIndex === item.id
                        ? "5px"
                        : "unset"
                      : i !== 0 && pathname.includes(item?.path)
                      ? "5px"
                      : "unset"
                    : "12px"
                }
                className={
                  showMenu
                    ? showMenu && currentIndex !== i && "parent_nav"
                    : !pathname.includes(item?.path) && "parent_nav"
                }
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
                    item.sub
                      ? (showMenu && currentIndex === item.id
                          ? setShowMenu(false)
                          : !showMenu && setShowMenu(true),
                        setCurrentIndex(item.id),
                        setShow(true))
                      : (navigate(item.path),
                        setShowMenu(false),
                        setCurrentIndex(""))
                  }
                  bg={
                    showMenu
                      ? showMenu && currentIndex === item.id
                        ? "#EE383A"
                        : "transparent"
                      : pathname.includes(item.path)
                      ? "#EE383A"
                      : "transparent"
                  }
                  color={
                    showMenu
                      ? showMenu && currentIndex === item.id
                        ? "#fff"
                        : "#646668"
                      : pathname.includes(item.path)
                      ? "#fff"
                      : "#646668"
                  }
                  fontWeight={500}
                  _hover={{
                    bg: showMenu
                      ? showMenu && currentIndex === item.id
                        ? ""
                        : "transparent"
                      : pathname.includes(item.path)
                      ? ""
                      : "transparent",
                    color: showMenu
                      ? showMenu && currentIndex === item.id
                        ? ""
                        : "#EE383A"
                      : pathname.includes(item.path)
                      ? ""
                      : "#EE383A",
                  }}
                  transition=".3s ease-in-out"
                  borderRadius={4}
                  position="relative"
                >
                  <Box className="hovered_image">{item.hover}</Box>

                  <Box className="initial_image">
                    {showMenu
                      ? showMenu && currentIndex === item.id
                        ? item.sec
                        : item.icon
                      : pathname.includes(item.path)
                      ? item.sec
                      : item.icon}
                  </Box>
                  <Box display={show ? "box" : "none"}>
                    <Text fontSize="15px" ml={4} mb={0}>
                      {item.name}
                    </Text>
                  </Box>

                  {showMenu ? (
                    showMenu && currentIndex === item.id ? (
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
                      item.sub && (
                        <Box
                          flex="1"
                          textAlign="right"
                          display={show ? "box" : "none"}
                          pb={1}
                          color={
                            showMenu && currentIndex === item.id
                              ? "#fff"
                              : "black"
                          }
                        >
                          {showMenu && currentIndex === item.id ? (
                            <ChevronDownIcon />
                          ) : (
                            <ChevronRightIcon />
                          )}
                        </Box>
                      )
                    )
                  ) : pathname.includes(item.path) ? (
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
                    item.sub && (
                      <Box
                        flex="1"
                        textAlign="right"
                        display={show ? "box" : "none"}
                        pb={1}
                        color={showMenu ? "#fff" : "black"}
                      >
                        {showMenu ? <ChevronDownIcon /> : <ChevronRightIcon />}
                      </Box>
                    )
                  )}
                </Flex>

                {item.sub && show && (
                  <Collapse in={showMenu && currentIndex === item.id}>
                    <VStack
                      pl={3}
                      align="stretch"
                      borderBottomRadius={4}
                      pb="2"
                      gap={0}
                    >
                      {item.sub.map((subItem, index) => (
                        <Flex
                          key={index}
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
                          <Box fontSize="13px" ml="29px">
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

          <Flex
            fontSize="15px"
            cursor="pointer"
            onClick={action}
            align="center"
            gap="8px"
            lineHeight="100%"
            mb="39px"
            p={show ? 2 : "unset"}
            w={show ? "unset" : "fit-content"}
            pt={show ? 3 : "5px"}
            px={show ? 2 : "16px"}
            pb={show ? 2 : "5px"}
            fontWeight={500}
          >
            {isLoading ? (
              <Flex
                _hover={{ color: "#ee383a" }}
                gap={3}
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
                gap={3}
                align="center"
                color="#646668"
              >
                <LogoutIcon fill="#646668" />
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
        pos="sticky"
        bg="#fff"
        left="0"
        right="0"
        display={show ? "flex" : "none"}
        justifyContent="center"
        zIndex={55555}
        h="7rem"
        pt="10px"
        pb="20px"
        w="full"
      >
        <Flex flexDir="column" justifyContent="center" align="center">
          <Text color="#000" lineHeight="100%" mb="8px">
            Powered by
          </Text>
          <Image src="/assets/ezlogo.svg" objectFit="cover" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
