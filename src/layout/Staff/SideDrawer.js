import React from "react";
import {
  Box,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useLogOut } from "../../../../utils/helpers";
import { useState } from "react";
import { LogoutIcon } from "../../../common/images";
import { sideAccountDrop, general } from "../../../common/constants";
import { AiOutlineClose } from "react-icons/ai";

const SideDrawer = ({ isOpen, onClose }) => {
  const logout = useLogOut();
  const [isLoading, setIsLoading] = useState(false);

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [currentIndex, setCurrentIndex] = useState("");

  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="right"
      size={["full", "full", "full", "full"]}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent bgColor="#fff" color="#000">
        <DrawerBody p={0} overflowY="scroll">
          <Flex h="100vh" pt="40px" px="24px" flexDir="column">
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
                  Space
                </Text>
              </Box>
              <Box
                border="1px solid #E0E0E0"
                cursor="pointer"
                _hover={{ boxShadow: "lg" }}
                bg="#f2f2f2"
                onClick={onClose}
                rounded="full"
                p="2"
              >
                <AiOutlineClose />
              </Box>
            </Flex>

            <Box>
              {general?.map((item, i) => {
                return (
                  <VStack
                    key={i}
                    align="stretch"
                    className={
                      showMenu
                        ? showMenu && currentIndex !== i && "parent_nav"
                        : !pathname.includes(item?.path) && "parent_nav"
                    }
                  >
                    <Flex
                      align="center"
                      p={2}
                      py="10px"
                      pl="16px"
                      pr="2px"
                      mb="12px"
                      fontSize="13px"
                      lineHeight="100%"
                      cursor="pointer"
                      onClick={() =>
                        item.subItems
                          ? (showMenu && currentIndex === item.id
                              ? setShowMenu(false)
                              : !showMenu && setShowMenu(true),
                            setCurrentIndex(item.id))
                          : (navigate(item.path),
                            setShowMenu(false),
                            setCurrentIndex(""),
                            onClose())
                      }
                      bg={
                        showMenu
                          ? showMenu && currentIndex === item.id
                            ? "#FDE8E8"
                            : "transparent"
                          : pathname.includes(item.path)
                            ? "#FDE8E8"
                            : "transparent"
                      }
                      color={
                        showMenu
                          ? showMenu && currentIndex === item.id
                            ? "#EE383A"
                            : "#646668"
                          : pathname.includes(item.path)
                            ? "#EE383A"
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
                      borderRadius={4}
                      position="relative"
                    >
                      <Box className="hovered_image">{item.sec}</Box>

                      <Box className="initial_image" w="16px" h="16px">
                        {showMenu
                          ? showMenu && currentIndex === item.id
                            ? item.sec
                            : item.icon
                          : pathname.includes(item.path)
                            ? item.sec
                            : item.icon}
                      </Box>
                      <Box>
                        <Text ml="8px">{item.name}</Text>
                      </Box>

                      {showMenu ? (
                        showMenu && currentIndex === item.id ? (
                          <Box
                            position="absolute"
                            top="50%"
                            right={2}
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
                              pb={1}
                              color={
                                showMenu && currentIndex === item.id
                                  ? "#fff"
                                  : "black"
                              }
                            ></Box>
                          )
                        )
                      ) : pathname.includes(item.path) ? (
                        <Box
                          position="absolute"
                          top="50%"
                          right={2}
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
                            pb={1}
                            color={showMenu ? "#fff" : "black"}
                          ></Box>
                        )
                      )}
                    </Flex>

                    {item.subItems && (
                      <Collapse in={showMenu && currentIndex === item.id}>
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
                              <Box
                                fontSize="11px"
                                onClick={onClose}
                                pb="12px"
                                ml="20px"
                              >
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
            </Box>

            <Box mt="30px">
              <Text
                color="#444648"
                lineHeight="100%"
                ml="19px"
                fontSize="12px"
                fontWeight={700}
                pb="15px"
              >
                ACCOUNT
              </Text>
              {sideAccountDrop?.map((item, i) => {
                return (
                  <VStack
                    key={i}
                    onClick={onClose}
                    align="stretch"
                    className={
                      showMenu
                        ? showMenu && currentIndex !== i && "parent_nav"
                        : !pathname.includes(item?.path) && "parent_nav"
                    }
                  >
                    <Flex
                      align="center"
                      p={2}
                      py="10px"
                      pl="16px"
                      pr="2px"
                      mb="12px"
                      fontSize="13px"
                      lineHeight="100%"
                      cursor="pointer"
                      onClick={() =>
                        item.subItems
                          ? (showMenu && currentIndex === item.id
                              ? setShowMenu(false)
                              : !showMenu && setShowMenu(true),
                            setCurrentIndex(item.id))
                          : (navigate(item.path),
                            setShowMenu(false),
                            setCurrentIndex(""),
                            onClose())
                      }
                      bg={
                        showMenu
                          ? showMenu && currentIndex === item.id
                            ? "#FDE8E8"
                            : "transparent"
                          : pathname.includes(item.path)
                            ? "#FDE8E8"
                            : "transparent"
                      }
                      color={
                        showMenu
                          ? showMenu && currentIndex === item.id
                            ? "#EE383A"
                            : "#646668"
                          : pathname.includes(item.path)
                            ? "#EE383A"
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
                      borderRadius={4}
                      position="relative"
                    >
                      <Box className="hovered_image">{item.sec}</Box>

                      <Box className="initial_image" w="16px" h="16px">
                        {showMenu
                          ? showMenu && currentIndex === item.id
                            ? item.sec
                            : item.icon
                          : pathname.includes(item.path)
                            ? item.sec
                            : item.icon}
                      </Box>
                      <Box>
                        <Text ml="8px">{item.name}</Text>
                      </Box>

                      {showMenu ? (
                        showMenu && currentIndex === item.id ? (
                          <Box
                            position="absolute"
                            top="50%"
                            right={2}
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
                              pb={1}
                              color={
                                showMenu && currentIndex === item.id
                                  ? "#fff"
                                  : "black"
                              }
                            ></Box>
                          )
                        )
                      ) : pathname.includes(item.path) ? (
                        <Box
                          position="absolute"
                          top="50%"
                          right={2}
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
                            pb={1}
                            color={showMenu ? "#fff" : "black"}
                          ></Box>
                        )
                      )}
                    </Flex>
                  </VStack>
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
                fontWeight={500}
                p={2}
                pt={3}
                px={"16px"}
                pb={2}
              >
                {isLoading ? (
                  <Flex
                    _hover={{ color: "#ee383a" }}
                    gap="5px"
                    color="red"
                    align="center"
                    fontWeight={500}
                  >
                    <Spinner size="sm" /> <Text>Logging Out</Text>
                  </Flex>
                ) : (
                  <Flex
                    _hover={{ color: "#ee383a" }}
                    gap="5px"
                    align="center"
                    color="#646668"
                  >
                    <LogoutIcon /> <Text>Log Out</Text>
                  </Flex>
                )}
              </Flex>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
