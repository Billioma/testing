import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { useGetClientDetails } from "../../../../services/client/query/user";

const Header = () => {
  const navigate = useNavigate();

  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData, isLoading: isUser } = useGetClientDetails();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [title, setTitle] = useState("");
  const [secTitle, setSecTitle] = useState("");

  const location = useLocation();
  const locationRoute = location.pathname;

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("dashboard"):
        return setTitle("Dashboard");

      case locationRoute.includes("user"):
        return setTitle("Users");

      case locationRoute.includes("subscription"):
        return setTitle("Subscription");

      case locationRoute.includes("event"):
        return setTitle("Events");

      default:
        return setTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("add-sub"):
        return setSecTitle("Add Subscription");

      case locationRoute.includes("edit-event"):
        return setSecTitle("Edit Event");

      case locationRoute.includes("add-event"):
        return setSecTitle("Add Event");

      case locationRoute.includes("add-user"):
        return setSecTitle("Add User");

      case locationRoute.includes("view-sub"):
        return setSecTitle("View Subscriptions");

      default:
        return setSecTitle("");
    }
  }, [locationRoute]);

  return (
    <Flex
      flexDirection="column"
      bg={"#f4f6f8"}
      pos="fixed"
      w={isMobile ? "calc(100% - 85px)" : "calc(100% - 343px)"}
      borderRadius="8px"
      zIndex="5"
      py={isMobile ? "30px" : "20px"}
      color="#000"
    >
      <Flex
        justifyContent="space-between"
        align="center"
        px={isMobile ? "20px" : "24px"}
        w="full"
      >
        <Flex justifyContent="space-between" align="center" w="full">
          <Flex align="flex-end" gap="16px">
            <Text
              color="orangeBg"
              fontSize="20px"
              lineHeight="100%"
              cursor={
                locationRoute.includes("account/") || secTitle === ""
                  ? ""
                  : "pointer"
              }
              onClick={() =>
                locationRoute.includes("account/") || secTitle === ""
                  ? ""
                  : navigate(-1)
              }
              fontWeight={700}
            >
              {title}
            </Text>

            {secTitle && (
              <Text
                fontSize="14px"
                display={isMobile ? "none" : "flex"}
                color="#848688"
                fontWeight={500}
                lineHeight="100%"
              >
                {">"} {secTitle}
              </Text>
            )}
          </Flex>

          <Flex align="center">
            <Flex
              align="center"
              pos="relative"
              gap="18px"
              w={isMobile ? "" : "fit-content"}
            >
              <Flex
                gap="12px"
                bg="#fff"
                className="box"
                border="1px solid #E4E6E8"
                onClick={() => navigate("/client/profile")}
                w="full"
                borderRadius="8px"
                align="center"
                justifyContent="flex-end"
                color="#242628"
                cursor="pointer"
                py="6px"
                px="8px"
              >
                <Image
                  w="32px"
                  h="32px"
                  rounded="full"
                  src={
                    isUser
                      ? "/assets/pfp.svg"
                      : !userData?.logo === null
                      ? userData?.logo
                      : "/assets/pfp.svg"
                  }
                />

                <Box>
                  <Text fontSize="12px" fontWeight={500} lineHeight="100%">
                    Hi {userData?.name || ""}
                  </Text>
                  <Text
                    mt="8px"
                    textDecor="underline"
                    color="#646668"
                    fontSize="10px"
                    fontWeight={500}
                    lineHeight="100%"
                  >
                    View Profile
                  </Text>
                </Box>
                <IoIosArrowDown />
              </Flex>
            </Flex>

            {isMobile && (
              <Flex
                color="#BDBDBD"
                borderRadius="20px"
                border="1px solid rgba(104, 132, 202, 0.5)"
                p="7px"
                onClick={onOpen}
                w="fit-content"
                ml={isMobile ? "25px" : "320px"}
                cursor="pointer"
              >
                <IoMdMenu size="20px" />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Header;
