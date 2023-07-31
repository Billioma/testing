import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { useGetUser } from "../../../../services/query/user";
import { accountDrop } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";

const Header = () => {
  const navigate = useNavigate();

  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData } = useGetUser();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);
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

      case locationRoute.includes("account"):
        return setTitle("Account");

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

      case locationRoute.includes("account/payment"):
        return setSecTitle("Payments");

      case locationRoute.includes("account/profile"):
        return setSecTitle("Profile");

      case locationRoute.includes("add-subscriptions"):
        return setSecTitle("Add a Subscription");

      case locationRoute.includes("account/settings"):
        return setSecTitle("Settings");

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logout = useLogOut();
  const [isLoading, setIsLoading] = useState(false);

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 1000);
  };

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
              cursor={locationRoute.includes("account/") ? "" : "pointer"}
              onClick={() =>
                locationRoute.includes("account/") ? "" : navigate(-1)
              }
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
            <Flex
              align="center"
              pos="relative"
              gap="18px"
              w={isMobile ? "" : "8rem"}
            >
              <Flex
                gap="12px"
                onClick={() => setShow(true)}
                bg="#F4F6F8"
                className="box"
                w="full"
                borderRadius="12px"
                align="center"
                justifyContent="flex-end"
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
              {show && (
                <Flex
                  flexDir="column"
                  align="center"
                  justifyContent="center"
                  bg="#F4F6F8"
                  pos="absolute"
                  top="35px"
                  right="0"
                  boxShadow="0px 4px 24px 0px rgba(0, 0, 0, 0.05)"
                  border="1px solid #E4E6E8"
                  borderRadius="4px"
                  w="90%"
                  py="12px"
                  px="16px"
                >
                  {accountDrop.map((data, i) => (
                    <Text
                      key={i}
                      fontSize="12px"
                      _hover={{
                        bg: "red",
                        color: "#fff",
                        borderRadius: "4px",
                      }}
                      cursor="pointer"
                      lineHeight="100%"
                      py="10px"
                      onClick={() =>
                        i === 3
                          ? action()
                          : (navigate(data?.link), setShow(false))
                      }
                      px="20px"
                      fontWeight={500}
                      color="#242628"
                      mb="16px"
                    >
                      {i === 3
                        ? isLoading
                          ? "Logging Out"
                          : "Logout"
                        : data?.name}
                    </Text>
                  ))}
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Header;
