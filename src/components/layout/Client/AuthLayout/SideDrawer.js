import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { useLogOut } from "../../../../utils/helpers";
import { useState } from "react";
import { LogoutIcon } from "../../../common/images";
import {
  activeStyle,
  businessSidebar,
  corpSidebar,
  eventSidebar,
} from "../../../common/constants";
import { AiOutlineClose } from "react-icons/ai";
import { useGetClientDetails } from "../../../../services/client/query/user";

const SideDrawer = ({ isOpen, onClose }) => {
  const logout = useLogOut();
  const location = useLocation();
  const { data: userData } = useGetClientDetails();
  const [isLoading, setIsLoading] = useState(false);

  const sideBarMap =
    userData?.accountType === "CORPORATE"
      ? corpSidebar
      : userData?.accountType === "EVENT_PLANNER"
      ? eventSidebar
      : userData?.accountType === "BUSINESS"
      ? businessSidebar
      : corpSidebar;

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

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
                  Space Plus
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

            <Box mx="20px">
              {sideBarMap?.map((item, i) => (
                <Box
                  key={i}
                  onClick={onClose}
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
                    <Flex
                      align="center"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Flex
                        transition=".3s ease-in-out"
                        align="center"
                        className="child_nav"
                        gap="11px"
                      >
                        <Box w="20px" h="20px" className="hovered_image">
                          {item.hover}
                        </Box>

                        <Box w="20px" h="20px" className="initial_image">
                          {location.pathname === item.path
                            ? item.sec
                            : item.icon}
                        </Box>

                        {item.name}
                      </Flex>
                    </Flex>
                  </NavLink>
                </Box>
              ))}
            </Box>

            <Flex
              mt="auto"
              fontSize="14px"
              fontWeight={400}
              mx="13px"
              cursor="pointer"
              onClick={action}
              align="center"
              gap="8px"
              mb="39px"
            >
              {isLoading ? (
                <Flex gap="8px" color="red" align="center">
                  <Spinner size="sm" /> Loggin Out
                </Flex>
              ) : (
                <Flex gap="8px" align="center" color="#242628">
                  <LogoutIcon fill="#242628" /> Log Out
                </Flex>
              )}
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
