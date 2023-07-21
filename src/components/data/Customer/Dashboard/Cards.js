import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useGetVehicles } from "../../../../services/query/vehicles";
import { useGetUser } from "../../../../services/query/user";

const Cards = () => {
  const [index, setIndex] = useState(0);
  const { data: vehicles, isLoading } = useGetVehicles();
  const { data: userData, isLoading: isUserLoading } = useGetUser();

  const currentVehicle = vehicles?.data?.filter((item, i) => i === index);

  return (
    <Box>
      <Grid
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        <GridItem>
          <Skeleton isLoaded={!isUserLoading}>
            <Box
              bg="#fff"
              py="24px"
              px="20px"
              borderRadius="16px"
              h="14rem"
              w="full"
            >
              <Flex align="center" gap="16px">
                <Image src="/assets/wallet.png" w="40px" h="40px" />
                <Text
                  color="red"
                  lineHeight="100%"
                  fontWeight={700}
                  fontSize="20px"
                >
                  Wallet
                </Text>
              </Flex>

              <Text
                mt="20px"
                fontSize="12px"
                color="#848688"
                fontWeight={700}
                lineHeight="100%"
              >
                Wallet Balance
              </Text>
              <Text
                mt="8px"
                color="#242628"
                fontSize="32px"
                fontWeight={500}
                lineHeight="100%"
              >
                ₦{" "}
                {userData?.wallet?.balance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>

              <Button
                mt="20px"
                w="full"
                lineHeight="100%"
                bg="#242628"
                borderRadius="8px"
                py="14px"
                color="#fff"
                fontSize="12px"
                fontWeight={500}
              >
                Add Funds
              </Button>
            </Box>
          </Skeleton>
        </GridItem>

        <GridItem>
          <Box
            bg="#fff"
            py="24px"
            px="20px"
            borderRadius="16px"
            h="14rem"
            w="full"
          >
            <Flex align="center" gap="16px">
              <Image src="/assets/card.png" w="40px" h="40px" />
              <Text
                color="red"
                lineHeight="100%"
                fontWeight={700}
                fontSize="20px"
              >
                Subscriptions
              </Text>
            </Flex>

            <Flex
              mt="32px"
              align="center"
              justifyContent="space-between"
              w="full"
            >
              <Box>
                <Text
                  fontSize="12px"
                  color="#848688"
                  fontWeight={700}
                  lineHeight="100%"
                >
                  Subscription Type
                </Text>
                <Text
                  mt="8px"
                  color="#242628"
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  Valet Parking (Only)
                </Text>
              </Box>

              <Box>
                <Text
                  fontSize="12px"
                  color="#848688"
                  fontWeight={700}
                  lineHeight="100%"
                >
                  Duration
                </Text>
                <Text
                  mt="8px"
                  color="#242628"
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  Monthly
                </Text>
              </Box>
            </Flex>

            <Flex
              align="center"
              mt="32px"
              justifyContent="space-between"
              w="full"
            >
              <Box w="full">
                <Text
                  fontSize="12px"
                  color="#848688"
                  fontWeight={700}
                  lineHeight="100%"
                >
                  Amount
                </Text>
                <Text
                  mt="8px"
                  color="#242628"
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  ₦10,000
                </Text>
              </Box>

              <Box w="full">
                <Text
                  fontSize="12px"
                  color="#848688"
                  fontWeight={700}
                  lineHeight="100%"
                >
                  Expiry
                </Text>
                <Text
                  mt="8px"
                  color="#242628"
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  23/8/2023
                </Text>
              </Box>

              <Box w="full">
                <Button
                  w="full"
                  bg="#242628"
                  rounded="full"
                  py="8px"
                  color="#fff"
                  lineHeight="100%"
                  fontSize="12px"
                  fontWeight={500}
                >
                  Details
                </Button>
              </Box>
            </Flex>
          </Box>
        </GridItem>

        <GridItem>
          <Skeleton isLoaded={!isLoading}>
            <Box
              bg="#fff"
              py="24px"
              px="20px"
              borderRadius="16px"
              h="14rem"
              w="full"
            >
              <Flex align="center" gap="16px">
                <Image src="/assets/car.png" w="56px" h="40px" />
                <Text
                  color="red"
                  lineHeight="100%"
                  fontWeight={700}
                  fontSize="20px"
                >
                  Vehicles
                </Text>
              </Flex>
              {vehicles?.data?.length ? (
                currentVehicle?.map((data, i) => (
                  <Box key={i}>
                    <Flex
                      mt="32px"
                      align="center"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Vehicle
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.model?.make?.name} {data?.model?.name}
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Color
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.color}
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          State
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.state}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex
                      align="center"
                      mt="32px"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box w="full">
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          License Plate
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.licensePlate}
                        </Text>
                      </Box>

                      <Flex w="full">
                        <Button
                          bg="transparent"
                          border="1px solid #242628"
                          rounded="full"
                          px="27px"
                          color="#242628"
                          lineHeight="100%"
                          fontSize="10px"
                          fontWeight={500}
                        >
                          Edit
                        </Button>
                      </Flex>

                      <Flex
                        flexDir="column"
                        justifyContent="center"
                        align="center"
                        gap="4px"
                        w="15%"
                      >
                        <Text
                          fontSize="10px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          {index + 1} of {vehicles?.data?.length}
                        </Text>
                        <Flex align="center" gap="16px">
                          <Flex
                            cursor="pointer"
                            border="1px solid #242628"
                            opacity={index !== 0 ? 1 : 0.4}
                            onClick={() => index !== 0 && setIndex(index - 1)}
                            rounded="full"
                            p="2px"
                          >
                            <IoIosArrowBack size="13px" />
                          </Flex>
                          <Flex
                            cursor="pointer"
                            opacity={
                              vehicles?.data?.length !== index + 1 ? 1 : 0.4
                            }
                            onClick={() =>
                              vehicles?.data?.length !== index + 1 &&
                              setIndex(index + 1)
                            }
                            border="1px solid #242628"
                            rounded="full"
                            p="2px"
                          >
                            <IoIosArrowForward size="13px" />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Flex
                  h="15vh"
                  justifyContent="center"
                  align="center"
                  fontSize="13px"
                  fontWeight={500}
                  color="#000"
                >
                  No vehicle has been added
                </Flex>
              )}
            </Box>
          </Skeleton>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Cards;
