import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { general } from "../../components/common/constants";
import { useLogOut } from "../../utils/helpers";
import { VStack, Spinner } from "@chakra-ui/react";
import { LogoutIcon } from "../../components/common/images";

const SideBar = () => {
  const logout = useLogOut();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();

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
      className="no_scroller"
      p="40px"
      h="calc(100% - 80px)"
      w="275px"
      overflowY="auto"
      borderRadius="24px"
      bg="#086375"
    >
      <Box flex="1">
        <Box>
          <Text
            fontSize="24px"
            color="#fff"
            fontWeight={900}
            fontFamily="Cooper"
          >
            Managr
          </Text>
        </Box>

        <Box mt="73px">
          {general?.map((item, i) => {
            return (
              <VStack
                key={i}
                align="stretch"
                mb={pathname.includes(item?.path) ? "5px" : "unset"}
                className={!pathname.includes(item?.path) && "parent_nav"}
              >
                <Flex
                  align="center"
                  w="full"
                  py="12px"
                  px="10px"
                  mb="12px"
                  fontSize="15px"
                  lineHeight="100%"
                  cursor="pointer"
                  onClick={() => navigate(item.path)}
                  bg={pathname.includes(item.path) ? "#fff" : "transparent"}
                  color={pathname.includes(item.path) ? "#086375" : "#fff"}
                  fontWeight={500}
                  transition=".3s ease-in-out"
                  _hover={{
                    bg: pathname.includes(item.path) ? "" : "#fff",
                    color: pathname.includes(item.path) ? "" : "#086375",
                  }}
                  borderRadius={4}
                  gap="8px"
                  position="relative"
                >
                  <Box className="hovered_image">{item.sec}</Box>

                  <Box className="initial_image">
                    {pathname.includes(item.path) ? item.sec : item.icon}
                  </Box>

                  <Text>{item.name}</Text>
                </Flex>
              </VStack>
            );
          })}
        </Box>
      </Box>

      <Box mt="auto">
        <Flex
          fontSize="15px"
          mt="60px"
          cursor="pointer"
          onClick={action}
          w="fit-content"
          align="center"
          gap="8px"
          px="10px"
          fontWeight={500}
        >
          {isLoading ? (
            <Flex gap="5px" color="red" align="center" fontWeight={500}>
              <Spinner size="sm" /> <Text>Logging Out</Text>
            </Flex>
          ) : (
            <Flex gap="12px" align="center" color="#fff">
              <Text>Log Out</Text> <LogoutIcon />
            </Flex>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SideBar;
