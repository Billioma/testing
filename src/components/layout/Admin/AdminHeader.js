import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetProfile } from "../../../services/admin/query/auth";
import { FaGreaterThan } from "react-icons/fa";

export default function AdminHeader() {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const { data: userData } = useGetProfile();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const options = [
    {
      name: "Profile",
      link: "/admin/dashboard",
    },

    {
      name: "Logout",
    },
  ];

  const action = () => {
    setIsLoading(true);
    setTimeout(() => {
      //   logout();
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    switch (true) {
      case pathname.includes("services"):
        return setTitle({ header: "Services", sub: "" });

      case pathname.includes("users"):
        switch (true) {
          case pathname.includes("attendants"):
            return setTitle({ header: "Users", sub: "Attendants" });

          case pathname.includes("customers"):
            return setTitle({ header: "Users", sub: "Customers" });

          default:
            return setTitle({ header: "Users", sub: "" });
        }

      default:
        return setTitle({ header: "Dashboard", sub: "" });
    }
  }, [pathname]);

  return (
    <Box bg="#F4F6F8" p={4} h={"60px"} borderRadius={8}>
      <Flex alignItems={"center"} h="100%" justifyContent={"space-between"}>
        <Text
          as="h4"
          fontSize="15px"
          fontWeight={500}
          display="flex"
          alignItems="end"
          gap="8px"
        >
          {title.header}{" "}
          {title.sub && (
            <Text
              display="flex"
              fontSize="10px"
              color="#646668"
              gap="4px"
              alignItems="center"
            >
              <FaGreaterThan size={8} color="#242628" />
              {title.sub}
            </Text>
          )}
        </Text>
        <Flex
          align="center"
          pos="relative"
          gap="18px"
          w={isMobile ? "" : "8rem"}
        >
          <Flex
            gap="12px"
            onClick={() => setShow(!show)}
            bg="#fff"
            className="box"
            w="full"
            borderRadius="8px"
            border=" 1px solid #E4E6E8"
            align="center"
            justifyContent="flex-end"
            color="#242628"
            cursor="pointer"
            py="6px"
            px="8px"
          >
            <Image w="20px" h="20px" src="/assets/user.png" />

            <Text fontSize="12px" fontWeight={500} lineHeight="100%">
              Hi {userData?.firstName || ""}
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
              zIndex="2"
            >
              {options.map((data, i) => (
                <Text
                  key={i}
                  fontSize="12px"
                  _hover={{
                    bg: "#1C0203",
                    color: "#fff",
                    borderRadius: "4px",
                  }}
                  cursor="pointer"
                  lineHeight="100%"
                  py="10px"
                  onClick={() =>
                    i === 3 ? action() : (navigate(data?.link), setShow(false))
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
      </Flex>
    </Box>
  );
}
