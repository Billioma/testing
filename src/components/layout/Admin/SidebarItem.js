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
            color="white"
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
            _hover={{ bg: "white", color: "#000" }}
            bg={isOpen || pathname.includes(path) ? "white" : "inherit"}
            color={pathname.includes(path) ? "black" : "#fff"}
            transition=".3s ease-in-out"
            className="child_nav"
            borderTopRadius={4}
            borderBottomRadius={isOpen ? 0 : 4}
            position="relative"
          >
            <Box className="hovered_image">{hoverIcon}</Box>

            <Box className="initial_image">
              {pathname.includes(path) ? hoverIcon : isOpen ? hoverIcon : icon}
            </Box>
            <Box>
              <Text
                pt={1}
                color={isOpen ? "#000" : "inherit"}
                fontSize="12px"
                ml={4}
                mb={0}
              >
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
                bg="black"
                borderRadius={4}
              />
            ) : (
              subItems && (
                <Box
                  flex="1"
                  textAlign="right"
                  pt={1}
                  color={isOpen ? "black" : "inherit"}
                >
                  {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </Box>
              )
            )}
          </Flex>

          {subItems && (
            <Collapse in={isOpen}>
              <VStack
                pl={8}
                align="stretch"
                bg="white"
                borderBottomRadius={4}
                pb="2"
                gap={3}
              >
                {subItems.map((subItem) => (
                  <Link
                    key={subItem.title}
                    to={subItem.path}
                    style={{
                      padding: "2",
                      fontSize: "10px",
                      textDecoration: "none",
                      color: "black",
                      fontWeight: pathname.includes(subItem.path)
                        ? "500"
                        : "normal",
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
