import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { IoMdMenu } from "react-icons/io";
import { Avatar, Image, useMediaQuery } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useGetUser } from "../../services/staff/query/user";
import { useLogOut } from "../../utils/helpers";
import {
  DashboardIcon,
  LeaveIcon,
  MedicalIcon,
  ProfileIcon,
} from "../../components/common/images";

const Header = () => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData } = useGetUser();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [secTitle, setSecTitle] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    switch (true) {
      case pathname.includes("dashboard"):
        return setTitle("Dashboard"), setIcon(<DashboardIcon fill="#086375" />);

      case pathname.includes("leave"):
        return setTitle("Leave"), setIcon(<LeaveIcon fill="#086375" />);

      case pathname.includes("profile"):
        return setTitle("Profile"), setIcon(<ProfileIcon fill="#086375" />);

      case pathname.includes("medical"):
        return setTitle("Medical"), setIcon(<MedicalIcon fill="#086375" />);

      default:
        return setTitle(""), setIcon("");
    }
  }, [pathname]);

  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];
  const number = parseInt(lastPart, 10);

  useEffect(() => {
    switch (true) {
      case pathname.includes("leave/request"):
        return setSecTitle("Request Leave");

      case pathname.includes("leave-request"):
        return setSecTitle(`Leave ID: ${number}`);

      case pathname.includes("medical-assistance/request"):
        return setSecTitle("Request Medical Assistance");

      case pathname.includes("medical-assistance/"):
        return setSecTitle(`Medical Assistance ID: ${number}`);

      default:
        return setSecTitle("");
    }
  }, [pathname]);

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
      w={isMobile ? "calc(100% - 0rem)" : "calc(100% - 390px)"}
      zIndex="5"
      py={isMobile ? "30px" : "20px"}
      px={isMobile ? "20px" : "unset"}
      color="#000"
    >
      <Flex justifyContent="space-between" align="center" w="full">
        <Flex justifyContent="space-between" align="center" w="full">
          <Flex align="flex-end" gap="5px">
            <Flex align="center" gap="12px">
              {icon}
              <Text color="#086375" fontSize="18px" fontWeight={500}>
                {title}
              </Text>
            </Flex>
            {secTitle && (
              <Flex align="center" gap="5px">
                <Text display={isMobile ? "none" : "flex"} color="#292D32">
                  {"/"}
                </Text>
                <Text display={isMobile ? "none" : "flex"} color="#292D32">
                  {secTitle}
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex align="center">
            <Flex
              align="center"
              pos="relative"
              gap="24px"
              display={isMobile ? "none" : "flex"}
              w={isMobile ? "" : "fit-content"}
            >
              <Flex
                bg="#086375"
                h="48px"
                w="48px"
                rounded="full"
                align="center"
                justifyContent="center"
              >
                <Image
                  src="/assets/bell.svg"
                  w="24px"
                  h="24px"
                  objectFit="contain"
                />
              </Flex>
              <Flex
                gap="8px"
                onClick={() => setShow(true)}
                border="1px solid #e2e5dc"
                className="box"
                rounded="full"
                align="center"
                color="#242628"
                cursor="pointer"
                p="12px"
              >
                <Avatar w="20px" h="20px" rounded="full" />

                <Text fontWeight={500}>{userData?.fullName || ""}</Text>
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
                  {[""].map((data, i) => (
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
                      // onClick={() =>
                      //   i === 3
                      //     ? action()
                      //     : (navigate(data?.link), setShow(false))
                      // }
                      px="20px"
                      fontWeight={500}
                      color="#242628"
                      mb="16px"
                    >
                      {i === 3
                        ? isLoading
                          ? "Logging Out"
                          : "Logout"
                        : " data?.name"}
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
                // onClick={onOpen}
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

      {/* <SideDrawer isOpen={isOpen} onClose={onClose} /> */}
    </Flex>
  );
};

export default Header;
