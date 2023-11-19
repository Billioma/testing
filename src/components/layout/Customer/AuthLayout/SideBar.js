import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { general } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";
import { LogoutIcon } from "../../../common/images";
import { Image, VStack, Spinner, Collapse } from "@chakra-ui/react";

const SideBar = () => {
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
      px="24px"
      w="275px"
      borderRadius="16px"
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
            return (
              <VStack
                key={i}
                align="stretch"
                className={!pathname.includes(item?.path) && "parent_nav"}
              >
                <Flex
                  align="center"
                  pr="2px"
                  pl="16px"
                  py="10px"
                  mx="-20px"
                  fontSize="13px"
                  mt="0px"
                  mb={"12px"}
                  lineHeight="100%"
                  cursor="pointer"
                  onClick={() =>
                    item.subItems
                      ? navigate(item.subItems[0].path)
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
                  <Box>
                    <Text ml="8px">{item.name}</Text>
                  </Box>

                  {pathname.includes(item.path) ? (
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
                        color={openSubItems[item.name] ? "#fff" : "black"}
                      ></Box>
                    )
                  )}
                </Flex>

                {item.subItems && (
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
                          <Box fontSize="11px" pb="12px" ml="20px">
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
            fontSize="13px"
            cursor="pointer"
            onClick={action}
            align="center"
            gap="8px"
            lineHeight="100%"
            mb="39px"
            fontWeight={500}
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
                color="#646668"
              >
                <LogoutIcon fill="#646668" /> Log Out
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
