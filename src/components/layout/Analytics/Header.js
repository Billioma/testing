import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { adminHeaderOptions } from "../../common/constants";
import { useGetProfile } from "../../../services/admin/query/auth";
import { useLogOut } from "../../../utils/helpers";

const Header = ({ showSidebar }) => {
  const navigate = useNavigate();
  const logout = useLogOut();

  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const [show, setShow] = useState(false);

  const { data: userData, isLoading: isUser } = useGetProfile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [title, setTitle] = useState("");

  const location = useLocation();
  const locationRoute = location.pathname;

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("dashboard"):
        return setTitle("Dashboard");

      case locationRoute.includes("customers"):
        return setTitle("Customers");

      case locationRoute.includes("reserve"):
        return setTitle("Reserve Parking");

      case locationRoute.includes("pay-to-park"):
        return setTitle("Pay To Park Services");

      case locationRoute.includes("clients&"):
        return setTitle("Clients & Operators");

      case locationRoute.includes("valet"):
        return setTitle("Valet Parking");

      case locationRoute.includes("event"):
        return setTitle("Event Parking");

      case locationRoute.includes("interac"):
        return setTitle("Interactions");

      case locationRoute.includes("car-ser"):
        return setTitle("Car Services");

      case locationRoute.includes("vehicles"):
        return setTitle("Vehicles");

      case locationRoute.includes("metrics/payment"):
        return setTitle("Payments");

      case locationRoute.includes("metrics/attendants"):
        return setTitle("Attendants");

      case locationRoute.includes("metrics/points"):
        return setTitle("Points");

      case locationRoute.includes("metrics/incidents"):
        return setTitle("Incidents/Claims");

      case locationRoute.includes("metrics/business"):
        return setTitle("Businesses");

      case locationRoute.includes("metrics/transactions"):
        return setTitle("Transactions & Invoices");

      case locationRoute.includes("metrics/subsc"):
        return setTitle("Subscriptions");

      case locationRoute.includes("metrics/locations"):
        return setTitle("Locations");

      case locationRoute.includes("metrics/support"):
        return setTitle("Support");

      case locationRoute.includes("service-ratings"):
        return setTitle("Service Ratings");

      default:
        return setTitle("");
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

  return (
    <Flex
      flexDirection="column"
      bg={"#f4f6f8"}
      pos="fixed"
      w={
        isMobile
          ? "calc(100% - 2.4rem)"
          : !showSidebar
          ? "calc(100% - 120px)"
          : "calc(100% - 342px)"
      }
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
          <Text
            color="#242628"
            fontSize={{ base: "", md: "22px" }}
            lineHeight="100%"
            fontWeight={500}
          >
            {title}
          </Text>

          <Flex align="center">
            <Flex
              align="center"
              gap="18px"
              display={isMobile ? "none" : "flex"}
              w={isMobile ? "" : "fit-content"}
              pos="relative"
            >
              <Flex
                gap="12px"
                bg="#fff"
                className="box"
                border="1px solid #E4E6E8"
                onClick={() => setShow(!show)}
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
                  w="20px"
                  h="20px"
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

                <Box>
                  <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                    Hi {userData?.firstName || ""}
                  </Text>
                </Box>
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
                  zIndex="2"
                >
                  {adminHeaderOptions.map((data, i) => (
                    <Text
                      key={i}
                      fontSize="14px"
                      _hover={{
                        bg: "#1C0203",
                        color: "#fff",
                        borderRadius: "4px",
                      }}
                      cursor="pointer"
                      lineHeight="100%"
                      py="10px"
                      onClick={() =>
                        i === 1
                          ? logout()
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
