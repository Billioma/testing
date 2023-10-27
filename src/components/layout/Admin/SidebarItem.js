import React from "react";
import { Box, Flex, Text, VStack, Collapse } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation, Link, useNavigate } from "react-router-dom";

const SidebarItem = ({
  title,
  icon,
  subItems,
  hoverIcon,
  path,
  isOpen,
  onToggleSubItem,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    onToggleSubItem(title);
  };

  return (
    <>
      {title === "Administrator" ? (
        <Box>
          <Text
            textTransform={"uppercase"}
            color="#444648"
            fontSize="12px"
            fontWeight={500}
            p={2}
          >
            {title}
          </Text>
        </Box>
      ) : (
        <VStack
          align="stretch"
          className={!pathname.includes(path) && "parent_nav"}
          gap={0}
        >
          <Flex
            align="center"
            p={2}
            cursor="pointer"
            onClick={() => (subItems ? handleToggle() : navigate(path))}
            bg={
              isOpen ||
              (pathname.includes(path) && !pathname.includes("reports"))
                ? "#EE383A"
                : "inherit"
            }
            color={
              (pathname.includes(path) && !pathname.includes("reports")) ||
              isOpen
                ? "#fff"
                : "#444648"
            }
            _hover={{ bg: "#EE383A", color: "#fff" }}
            transition=".3s ease-in-out"
            borderTopRadius={4}
            borderBottomRadius={isOpen ? 0 : 4}
            position="relative"
          >
            <Box className="hovered_image">{hoverIcon}</Box>

            <Box className="initial_image">
              {pathname.includes(path) || isOpen ? hoverIcon : icon}
            </Box>
            <Box>
              <Text pt={1} color={"inherit"} fontSize="12px" ml={4} mb={0}>
                {title}
              </Text>
            </Box>

            {pathname.includes(path) ? (
              <Box
                position="absolute"
                top="50%"
                right={2}
                transform="translateY(-50%)"
                w="3px"
                h="25px"
                bg="#fff"
                borderRadius={4}
              />
            ) : (
              subItems && (
                <Box
                  flex="1"
                  textAlign="right"
                  pt={1}
                  color={isOpen ? "#000" : "inherit"}
                >
                  {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </Box>
              )
            )}
          </Flex>

          {subItems && (
            <Collapse in={isOpen}>
              <VStack
                pl={3}
                align="stretch"
                borderBottomRadius={4}
                pb="2"
                gap={3}
                pt={4}
              >
                {subItems.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.path}
                    style={{
                      padding: "2",
                      fontSize: "10px",
                      textDecoration: "none",
                      color: pathname.includes(subItem.path)
                        ? "#EE383A"
                        : "#848688",
                      fontWeight: pathname.includes(subItem.path)
                        ? "500"
                        : "400",
                    }}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </VStack>
            </Collapse>
          )}
        </VStack>
      )}
    </>
  );
};

export default SidebarItem;
