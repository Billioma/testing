import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import { BsCheckCircle } from "react-icons/bs";
import { useCustomerFundWallet } from "../../services/customer/query/user";
import useCustomToast from "../../utils/notifications";

const FundWalletDrawer = ({ isOpen, cards, refetchUser, onClose, action }) => {
  const [values, setValues] = useState({
    cardId: "",
    amount: "",
  });

  const close = () => {
    onClose();
    setValues({
      cardId: "",
      amount: "",
    });
  };
  const { successToast, errorToast } = useCustomToast();
  const { mutate, isLoading } = useCustomerFundWallet({
    onSuccess: (res) => {
      close();
      successToast(res?.message);
      refetchUser();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      amount: Number(values?.amount),
      cardId: Number(values?.cardId),
    });
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Box>
            <Flex align="center" flexDirection="column">
              <Image w="40px" h="40px" src="/assets/purse.png" />
              <Text
                my="24px"
                color="#444648"
                fontSize="24px"
                fontWeight={700}
                lineHeight="100%"
              >
                Add Funds
              </Text>
            </Flex>

            <Box>
              <Box mb="24px">
                <Text
                  color="#444648"
                  fontWeight={500}
                  lineHeight="100%"
                  fontSize="10px"
                  mb="8px"
                >
                  Enter Funding Amount
                </Text>
                <CustomInput
                  mb
                  value={values?.amount}
                  type="number"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      amount: e.target.value,
                    })
                  }
                  auth
                />
              </Box>

              {cards?.data?.length
                ? cards?.data?.map((dat, i) => (
                    <Box key={i}>
                      <Box
                        mb="16px"
                        cursor="pointer"
                        border={
                          values?.cardId === dat?.id
                            ? "1px solid #0B841D"
                            : "1px solid #D4D6D8"
                        }
                        onClick={() =>
                          setValues({
                            ...values,
                            cardId: dat?.id,
                          })
                        }
                        borderRadius="4px"
                        p="16px"
                      >
                        <Flex
                          align="center"
                          w="full"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Text
                              color="#444648"
                              fontSize="12px"
                              lineHeight="100%"
                              mb="8px"
                            >
                              Card Details
                            </Text>
                            <Text
                              fontSize="14px"
                              textTransform="capitalize"
                              color="#646668"
                              lineHeight="100%"
                            >
                              {dat?.cardType} Ending *****{dat?.last4}
                            </Text>
                          </Box>

                          {values.cardId === dat?.id && (
                            <Box>
                              <BsCheckCircle color="#0B841D" />
                            </Box>
                          )}
                        </Flex>
                      </Box>
                    </Box>
                  ))
                : ""}

              <Text
                color="red"
                onClick={action}
                fontSize="12px"
                _hover={{ textDecor: "underline" }}
                textAlign="end"
                cursor="pointer"
                lineHeight="100%"
                fontWeight={500}
              >
                Add a Card
              </Text>
            </Box>

            <Flex mt="24px" w="100%" gap="24px" align="center">
              <Button
                bg="transparent"
                color="#0D0718"
                fontSize="14px"
                onClick={close}
                w="full"
                border="1px solid #0D0718"
                py="25px"
              >
                Cancel
              </Button>
              <Button
                w="100%"
                py="25px"
                fontSize="12px"
                isDisabled={!values.cardId || !values.amount}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Fund Wallet
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FundWalletDrawer;
