import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";

import { useGetOperatorProfile } from "../../../../services/operator/query/user";

const Header = ({ showSidebar }) => {
  const navigate = useNavigate();

  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData, isLoading: isUser } = useGetOperatorProfile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [title, setTitle] = useState("");
  const [secTitle, setSecTitle] = useState("");
  const [finTitle, setFinTitle] = useState("");

  const location = useLocation();
  const locationRoute = location.pathname;

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("dashboard"):
        return setTitle("Dashboard");

      case locationRoute.includes("logs"):
        return setTitle("Logs");

      case locationRoute.includes("user"):
        return setTitle("Users");

      case locationRoute.includes("profile"):
        return setTitle("Profile");

      case locationRoute.includes("reports"):
        return setTitle("Reports");

      case locationRoute.includes("location"):
        return setTitle("Locations");

      case locationRoute.includes("transactions"):
        return setTitle("Transactions");

      default:
        return setTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("attendant"):
        return setSecTitle("Attendants");

      case locationRoute.includes("locations/poli"):
        return setSecTitle("Policies");

      case locationRoute.includes("/reports/payments"):
        return setSecTitle("Payments");

      case locationRoute.includes("/reports/locations"):
        return setSecTitle("Locations");

      case locationRoute.includes("/reports/logs"):
        return setSecTitle("Logs");

      case locationRoute.includes("/reports/zones"):
        return setSecTitle("Zones");

      case locationRoute.includes("serviced"):
        return setSecTitle("Serviced Vehicles");

      case locationRoute.includes("parked"):
        return setSecTitle("Parked Vehicles");

      case locationRoute.includes("valeted"):
        return setSecTitle("Valeted Vehicles");

      case locationRoute.includes("zones"):
        return setSecTitle("Zones");

      case locationRoute.includes("rates"):
        return setSecTitle("Rates");

      case locationRoute.includes("locations/all/create"):
        return setSecTitle("Add Location");

      case locationRoute.includes("locations/all/"):
        return setSecTitle("Location Details");

      default:
        return setSecTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("attendants/create"):
        return setFinTitle("Add Addentant");

      case locationRoute.includes("attendants/"):
        return setFinTitle("Attendant Details");

      case locationRoute.includes("locations/rates/create"):
        return setFinTitle("Add Rate");

      case locationRoute.includes("locations/rates/"):
        return setFinTitle("Rate Details");

      case locationRoute.includes("locations/policies/create"):
        return setFinTitle("Add Policy");

      case locationRoute.includes("locations/policies/"):
        return setFinTitle("Policy Details");

      case locationRoute.includes("serviced-vehicles/"):
        return setFinTitle("Details");

      case locationRoute.includes("parked-vehicles/"):
        return setFinTitle("Details");

      case locationRoute.includes("valeted-vehicles/"):
        return setFinTitle("Details");

      default:
        return setFinTitle("");
    }
  }, [locationRoute]);

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
      py={isMobile ? "30px" : "8px"}
      color="#000"
    >
      <Flex
        justifyContent="space-between"
        align="center"
        px={isMobile ? "20px" : "24px"}
        w="full"
      >
        <Flex justifyContent="space-between" align="center" w="full">
          <Flex align="flex-end" gap="4px">
            <Text
              color="orangeBg"
              fontSize="22px"
              lineHeight="100%"
              cursor={
                locationRoute === "/operator/users/attendants" ||
                locationRoute === "/operator/locations/policies" ||
                locationRoute === "/operator/locations/rates" ||
                locationRoute === "/operator/logs/valeted-vehicles" ||
                locationRoute === "/operator/logs/parked-vehicles" ||
                locationRoute === "/operator/logs/serviced-vehicles" ||
                locationRoute === "/operator/locations/zones" ||
                secTitle === ""
                  ? ""
                  : "pointer"
              }
              onClick={() =>
                locationRoute === "/operator/users/attendants" ||
                locationRoute === "/operator/locations/policies" ||
                locationRoute === "/operator/locations/rates" ||
                locationRoute === "/operator/locations/zones" ||
                locationRoute === "/operator/logs/valeted-vehicles" ||
                locationRoute === "/operator/logs/parked-vehicles" ||
                locationRoute === "/operator/logs/serviced-vehicles" ||
                secTitle === ""
                  ? ""
                  : navigate(-1)
              }
              fontWeight={700}
            >
              {title}
            </Text>

            {secTitle && (
              <Text
                fontSize="12px"
                color="#848688"
                pb={{ base: "2px", md: "1px" }}
                fontWeight={500}
                lineHeight="100%"
              >
                {">"} {secTitle}
              </Text>
            )}

            {finTitle && (
              <Text
                fontSize="12px"
                color="#848688"
                pb={{ base: "2px", md: "1px" }}
                fontWeight={500}
                lineHeight="100%"
              >
                {">"} {finTitle}
              </Text>
            )}
          </Flex>

          <Flex align="center">
            <Flex
              align="center"
              gap="18px"
              display={isMobile ? "none" : "flex"}
              w={isMobile ? "" : "fit-content"}
            >
              <Flex
                gap="12px"
                bg="#fff"
                className="box"
                border="1px solid #E4E6E8"
                onClick={() => navigate("/operator/profile")}
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
                  objectFit="cover"
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
                  <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                    Hi {userData?.name || ""}
                  </Text>
                  <Text
                    mt="8px"
                    textDecor="underline"
                    color="#646668"
                    fontSize="12px"
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
