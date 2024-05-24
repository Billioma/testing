import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { Image, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import { adminHeaderOptions } from "../../components/common/constants";
import { useGetProfile } from "../../services/admin/query/auth";
import { useLogOut } from "../../utils/helpers";

const Header = ({ showSidebar }) => {
  const navigate = useNavigate();
  const logout = useLogOut();

  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const [show, setShow] = useState(false);

  const { data: userData, isLoading: isUser } = useGetProfile();
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

      case locationRoute.includes("profiles"):
        return setTitle("Staff Profiles");

      case locationRoute.includes("profile"):
        return setTitle("Profile");

      case locationRoute.includes("settings"):
        return setTitle("Settings");

      case locationRoute.includes("leave"):
        return setTitle("Leaves");

      case locationRoute.includes("medical"):
        return setTitle("Medical Assistance");

      case locationRoute.includes("loan"):
        return setTitle("Loans");

      default:
        return setTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("profiles/create"):
        return setSecTitle("Add New Staff");

      case locationRoute.includes("leave-mgt/create"):
        return setSecTitle("Add Absence");

      default:
        return setSecTitle("");
    }
  }, [locationRoute]);

  useEffect(() => {
    switch (true) {
      case locationRoute.includes("clients/all/details/"):
        return setFinTitle("Client Details");

      case locationRoute.includes("configurations/roles/details"):
        return setFinTitle("Role Details");

      case locationRoute.includes("configurations/roles/create"):
        return setFinTitle("Add Role");

      case locationRoute.includes("configurations/permissions/details"):
        return setFinTitle("Permission Details");

      case locationRoute.includes("configurations/permissions/create"):
        return setFinTitle("Add Permission");

      case locationRoute.includes("configurations/vehicle-makes/details"):
        return setFinTitle("Vehicle Make Details");

      case locationRoute.includes("configurations/vehicle-makes/create"):
        return setFinTitle("Add Vehicle Make");

      case locationRoute.includes("configurations/vehicle-models/details"):
        return setFinTitle("Vehicle Model Details");

      case locationRoute.includes("configurations/faqs/create"):
        return setFinTitle("Add FAQ");

      case locationRoute.includes("configurations/faqs/details"):
        return setFinTitle("FAQ Details");

      case locationRoute.includes("configurations/bank-details/create"):
        return setFinTitle("Add Bank Detail");

      case locationRoute.includes("configurations/bank-details/details"):
        return setFinTitle("");

      case locationRoute.includes("configurations/vehicle-models/create"):
        return setFinTitle("Add Vehicle Model");

      case locationRoute.includes("transactions/pay-to-park/"):
        return setFinTitle("Transaction Details");

      case locationRoute.includes("transactions/event-parking/"):
        return setFinTitle("Transaction Details");

      case locationRoute.includes("transactions/reserved-parking/"):
        return setFinTitle("Transaction Details");

      case locationRoute.includes("transactions/car-services/"):
        return setFinTitle("Transaction Details");

      case locationRoute.includes("clients/invoices/details/"):
        return setFinTitle("Invoice Details");

      case locationRoute.includes("clients/all/create"):
        return setFinTitle("Add a Client");

      case locationRoute.includes("clients/invoices/create"):
        return setFinTitle("Create an Invoice");

      case locationRoute.includes("memberships/plans/details"):
        return setFinTitle("Membership Plan Details");

      case locationRoute.includes("memberships/customer-subscriptions/create"):
        return setFinTitle("Add Subscription");

      case locationRoute.includes("memberships/customer-subscriptions/details"):
        return setFinTitle("Customer Subscription Details");

      case locationRoute.includes("memberships/corporate-subscriptions/create"):
        return setFinTitle("Add Subscription");

      case locationRoute.includes(
        "memberships/corporate-subscriptions/details"
      ):
        return setFinTitle("Corporate Subscription Details");

      case locationRoute.includes("memberships/features/create"):
        return setFinTitle("Add Membership Feature");

      case locationRoute.includes("memberships/features/details"):
        return setFinTitle("Membership Feature Details");

      case locationRoute.includes("memberships/plans/create"):
        return setFinTitle("Add Membership Plan");

      case locationRoute.includes("users/customers/details"):
        return setFinTitle("Customer Details");

      case locationRoute.includes("users/customers/create"):
        return setFinTitle("Add a Customer");

      case locationRoute.includes("users/attendants/details"):
        return setFinTitle("Attendant Details");

      case locationRoute.includes("users/attendants/create"):
        return setFinTitle("Add an Attendant");

      case locationRoute.includes("users/administrators/details"):
        return setFinTitle("Adminstrator Details");

      case locationRoute.includes("users/administrators/create"):
        return setFinTitle("Add an Adminstrator");

      case locationRoute.includes("users/operators/details"):
        return setFinTitle("Operator Details");

      case locationRoute.includes("users/operators/create"):
        return setFinTitle("Add an Operator");

      case locationRoute.includes("locations/locations/create"):
        return setFinTitle("Add Location");

      case locationRoute.includes("locations/locations/details"):
        return setFinTitle("Location Details");

      case locationRoute.includes("locations/zones/create"):
        return setFinTitle("Add Zone");

      case locationRoute.includes("locations/zones/details"):
        return setFinTitle("Zone Details");

      case locationRoute.includes("locations/rates/create"):
        return setFinTitle("Add Rate");

      case locationRoute.includes("locations/rates/details"):
        return setFinTitle("Rate Details");

      case locationRoute.includes("locations/amenities/create"):
        return setFinTitle("Add Amenity");

      case locationRoute.includes("locations/amenities/details"):
        return setFinTitle("Amenity Details");

      case locationRoute.includes("locations/policies/create"):
        return setFinTitle("Add Policy");

      case locationRoute.includes("locations/policies/details"):
        return setFinTitle("Policy Details");

      default:
        return setFinTitle("");
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
          <Flex align="flex-end" gap="4px">
            <Text
              color="#242628"
              fontSize={{ base: "", md: "22px" }}
              lineHeight="100%"
              fontWeight={500}
            >
              {title}
            </Text>

            {secTitle && (
              <Text
                fontSize="12px"
                color="#646668"
                pb="3px"
                fontWeight={700}
                lineHeight="100%"
              >
                {">"} {secTitle}
              </Text>
            )}

            {finTitle && (
              <Text
                fontSize="12px"
                color="#646668"
                pb="3px"
                fontWeight={700}
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
