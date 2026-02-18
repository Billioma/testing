import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { RiNotification2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { useGetUser } from "../../../../services/attendant/query/user";
import { attDrop } from "../../../common/constants";
import { useLogOut } from "../../../../utils/helpers";

const Header = ({ showSidebar }) => {
  const navigate = useNavigate();

  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData, isLoading: isUser } = useGetUser();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [secTitle, setSecTitle] = useState("");

  const location = useLocation();
  const locationRoute = location.pathname;

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("locations"):
        return setTitle("Locations");

      case locationRoute.includes("dashboard"):
        return setTitle("Dashboard");

      case locationRoute.includes("valet"):
        return setTitle("Valet");

      case locationRoute.includes("park"):
        return setTitle("Park");

      case locationRoute.includes("history"):
        return setTitle("History");

      case locationRoute.includes("vehicle"):
        return setTitle("Guest Parking");

      case locationRoute.includes("reservations"):
        return setTitle("Reservations");

      case locationRoute.includes("notifications"):
        return setTitle("Notifications");

      case locationRoute.includes("profile"):
        return setTitle("Profile");

      case locationRoute.includes("settings"):
        return setTitle("Settings");

      default:
        return setTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("/locations/"):
        return setSecTitle("Zones");

      case locationRoute.includes("reservations/"):
        return setSecTitle("Details");

      default:
        return setSecTitle("");
    }
  }, [locationRoute]);

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
      bg={"#fff"}
      pos="fixed"
      w={
        isMobile
          ? "calc(100% - 2rem)"
          : !showSidebar
          ? "calc(100% - 168px)"
          : "calc(100% - 390px)"
      }
      borderRadius="16px"
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
              fontSize="22px"
              lineHeight="100%"
              cursor={
                locationRoute.includes("account/")
                  ? ""
                  : !secTitle
                  ? ""
                  : "pointer"
              }
              onClick={() =>
                locationRoute.includes("account/")
                  ? ""
                  : !secTitle
                  ? ""
                  : navigate(-1)
              }
              fontWeight={700}
            >
              {title}
            </Text>

            {secTitle && (
              <Text
                // display={isMobile ? "none" : "flex"}
                color="#848688"
                mb="3px"
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
              display={isMobile ? "none" : "flex"}
              w={isMobile ? "" : "fit-content"}
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
                <Image
                  w="20px"
                  h="20px"
                  rounded="full"
                  objectFit="cover"
                  src={
                    isUser
                      ? "/assets/user.png"
                      : process.env.REACT_APP_BASE_URL + userData?.avatar ||
                        "/assets/user.png"
                  }
                />

                <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                  Hi {userData?.name || ""}
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
                  py="12px"
                  px="16px"
                >
                  {attDrop.map((data, i) => (
                    <Text
                      key={i}
                      fontSize="14px"
                      _hover={{
                        bg: "red",
                        color: "#fff",
                        borderRadius: "4px",
                      }}
                      textAlign="center"
                      w="full"
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

            {isMobile && (
              <Flex align="center" gap="16px" color="#BDBDBD">
                <RiNotification2Line
                  onClick={() => navigate("/attendant/notifications")}
                  size="25px"
                />
                <Flex
                  borderRadius="20px"
                  border="1px solid rgba(104, 132, 202, 0.5)"
                  p="7px"
                  onClick={onOpen}
                  w="fit-content"
                  ml={isMobile ? "0" : "320px"}
                  cursor="pointer"
                >
                  <IoMdMenu size="20px" />
                </Flex>
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
