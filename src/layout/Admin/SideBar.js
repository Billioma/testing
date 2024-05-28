import React, { useState } from "react";
import { Box, Flex, Text, VStack, Collapse, Image } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { staffSidebar } from "../../components/common/constants";
import { FiChevronsLeft } from "react-icons/fi";
import { useGetProfile } from "../../services/admin/query/auth";

const SideBar = ({ show, setShow }) => {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");

  const navigate = useNavigate();

  const { data: userData, isLoading: isUser } = useGetProfile();

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      position={"fixed"}
      zIndex={66}
      pt="24px"
      h="full"
      overflowY="scroll"
      borderRightRadius="24px"
      px={show ? "16px" : "4px"}
      w={show ? "275px" : "fit-content"}
      bg="#fff"
      boxShadow="4px 0px 10px 0px #0000000D"
    >
      <Box flex="1">
        <Box
          bg="#fff"
          mt="-24px"
          pt="24px"
          mx="-16px"
          px="16px"
          pos="sticky"
          top="-24px"
          zIndex={33}
        >
          <Box bg="#fff" display={show ? "block" : "none"}>
            <Flex
              pt="18px"
              pb="14px"
              px="16px"
              w="full"
              justifyContent="space-between"
            >
              <Box>
                <Text
                  fontSize="17px"
                  lineHeight="120%"
                  textAlign="center"
                  fontWeight={900}
                  fontFamily="Cooper"
                  color="#444648"
                >
                  Managr
                </Text>
                <Text fontSize="13px" color="#444648">
                  Admin
                </Text>
              </Box>

              <Image
                w="32px"
                h="32px"
                objectFit="cover"
                rounded="full"
                src={
                  isUser
                    ? "/assets/pfp.svg"
                    : !userData?.avatar === null
                      ? userData?.avatar
                      : "/assets/pfp.svg"
                }
              />
            </Flex>
          </Box>
        </Box>

        <Flex
          display={show ? "flex" : "none"}
          pb="10px"
          mt="15px"
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
          {staffSidebar?.map((item, i) => {
            return (
              <VStack
                key={i}
                align="stretch"
                mb={
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
                    item.subItems
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
                        ? "#086375"
                        : "transparent"
                      : pathname.includes(item.path)
                        ? "#086375"
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
                        : "#086375"
                      : pathname.includes(item.path)
                        ? ""
                        : "#086375",
                  }}
                  transition=".3s ease-in-out"
                  borderRadius={4}
                  position="relative"
                >
                  <Box className="hovered_image">
                    {currentIndex === item.id ? item?.sec : item.hover}
                  </Box>

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
                      item.subItems && (
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
                  ) : (
                    item.subItems && (
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

                {item.subItems && show && (
                  <Collapse in={showMenu && currentIndex === item.id}>
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
