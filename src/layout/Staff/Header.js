import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { IoMdMenu } from "react-icons/io";
import { Avatar, Image, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUser } from "../../services/staff/query/user";
import {
  DashboardIcon,
  LeaveIcon,
  LoanIcon,
  MedicalIcon,
  ProfileIcon,
  ScheduleIcon,
} from "../../components/common/images";

const Header = () => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  const { data: userData } = useGetUser();
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [secTitle, setSecTitle] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (true) {
      case pathname.includes("dashboard"):
        return setTitle("Dashboard"), setIcon(<DashboardIcon fill="#086375" />);

      case pathname.includes("leave"):
        return setTitle("Leave"), setIcon(<LeaveIcon fill="#086375" />);

      case pathname.includes("loans"):
        return setTitle("Loans"), setIcon(<LoanIcon fill="#086375" />);

      case pathname.includes("profile"):
        return setTitle("Profile"), setIcon(<ProfileIcon fill="#086375" />);

      case pathname.includes("medical"):
        return setTitle("Medical"), setIcon(<MedicalIcon fill="#086375" />);

      case pathname.includes("schedule"):
        return setTitle("Schedule"), setIcon(<ScheduleIcon fill="#086375" />);

      default:
        return setTitle(""), setIcon("");
    }
  }, [pathname]);

  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];
  const prevPart = parts[parts.length - 2];
  const number = parseInt(Number(prevPart) ? prevPart : lastPart, 10);

  useEffect(() => {
    switch (true) {
      case pathname.includes("leave/request"):
        return setSecTitle("Request Leave");

      case pathname.includes("leave-request"):
        return setSecTitle(`Leave ID: ${number}`);

      case pathname.includes("loans/request"):
        return setSecTitle("Request Loan");

      case pathname.includes("loans/"):
        return setSecTitle(`Loan ID: ${number}`);

      case pathname.includes("medical-assistance/request"):
        return setSecTitle("Request Medical Assistance");

      case pathname.includes("medical-assistance/"):
        return setSecTitle(`Medical Assistance ID: ${number}`);

      default:
        return setSecTitle("");
    }
  }, [pathname]);

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
                border="1px solid #e2e5dc"
                cursor="pointer"
                rounded="full"
                onClick={() => navigate("/staff/profile")}
                align="center"
                color="#242628"
                p="12px"
              >
                <Avatar w="20px" h="20px" rounded="full" />

                <Text fontWeight={500}>{userData?.fullName || ""}</Text>
              </Flex>
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
