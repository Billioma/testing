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
import { useGetUser } from "../../../../../services/query/user";

const Cards = () => {
  const { data: userData, isLoading: isUserLoading } = useGetUser();

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
                Fund My Wallet
              </Button>
            </Box>
          </Skeleton>
        </GridItem>

        <GridItem>
          <Flex
            flexDir="column"
            bg="#fff"
            py="24px"
            px="20px"
            borderRadius="16px"
            h="14rem"
            w="full"
          >
            <Flex align="center" gap="16px">
              <Image src="/assets/cards.png" w="40px" h="40px" />
              <Text
                color="red"
                lineHeight="100%"
                fontWeight={700}
                fontSize="20px"
              >
                Cards
              </Text>
            </Flex>

            <Box mt="20px">
              <Text
                fontSize="12px"
                color="#848688"
                fontWeight={700}
                lineHeight="100%"
              >
                No card yet
              </Text>
            </Box>

            <Button
              mt="auto"
              w="full"
              lineHeight="100%"
              bg="#242628"
              borderRadius="8px"
              py="14px"
              color="#fff"
              fontSize="12px"
              fontWeight={500}
            >
              Add a Card
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Cards;
