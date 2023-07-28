import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { useGetUser } from "../../../../services/query/user";

const Header = () => {
  const navigate = useNavigate();

  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData } = useGetUser();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [title, setTitle] = useState("");
  const [secTitle, setSecTitle] = useState("");

  const location = useLocation();
  const locationRoute = location.pathname;

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("dashboard"):
        return setTitle("Dashboard");

      case locationRoute.includes("services"):
        return setTitle("Services");

      case locationRoute.includes("services/park"):
        return setSecTitle("Parkc");

      case locationRoute.includes("subscription"):
        return setTitle("Subscription");

      case locationRoute.includes("history"):
        return setTitle("History");

      case locationRoute.includes("help"):
        return setTitle("Help Center");

      case locationRoute.includes("vehicles"):
        return setTitle("Vehicles");

      default:
        return setTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("services/park"):
        return setSecTitle("Park");

      case locationRoute.includes("services/reserve"):
        return setSecTitle("Reserve Parking");

      case locationRoute.includes("services/event"):
        return setSecTitle("Event Parking");

      default:
        return setSecTitle("");
    }
  }, [locationRoute]);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      flexDirection="column"
      bg={scroll ? "rgba(255, 255, 255, 0.15)" : "#fff"}
      backdropFilter={"blur(10px)"}
      pos="fixed"
      w={isMobile ? "calc(100% - 85px)" : "calc(100% - 390px)"}
      borderRadius="24px"
      zIndex="5"
      py={isMobile ? "30px" : "20px"}
      color="#000"
    >
      <Flex
        justifyContent="space-between"
        align="center"
        pl={isMobile ? "20px" : "32px"}
        pr={isMobile ? "20px" : "24px"}
        w="full"
      >
        <Flex justifyContent="space-between" align="center" w="full">
          <Flex align="flex-end" gap="16px">
            <Text
              color="orangeBg"
              fontSize="20px"
              lineHeight="100%"
              cursor={secTitle ? "pointer" : ""}
              onClick={() => (secTitle ? navigate(-1) : "")}
              fontWeight={700}
            >
              {title}
            </Text>

            {secTitle && (
              <Text
                color="#848688"
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
              >
                {">"} {secTitle}
              </Text>
            )}
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

          {!isMobile && (
            <Flex align="center" gap="18px" w={isMobile ? "" : "15%"}>
              <Flex
                gap="12px"
                bg="#F4F6F8"
                borderRadius="12px"
                align="center"
                color="#242628"
                cursor="pointer"
                py="6px"
                px="8px"
              >
                <Image w="20px" h="20px" src="/assets/user.png" />

                <Text fontSize="12px" fontWeight={500} lineHeight="100%">
                  Hi {userData?.profile?.firstName || ""}
                </Text>
                <IoIosArrowDown />
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Header;
