import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";
import { useNavigate } from "react-router-dom";
import CustomInput from "../common/CustomInput";

const Msg = ({ isOpen, action, msgs, setMsgs, isLoading, onClose }) => {
  const navigate = useNavigate();
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Box>
        <Box>
          <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
            Enter Message
          </Text>
          <CustomInput
            value={msgs}
            holder="Enter message"
            onChange={(e) => setMsgs(e.target.value)}
          />
        </Box>
        <Flex mt="32px" w="full">
          <Button
            w="full"
            onClick={action}
            isLoading={isLoading}
            fontSize="13px"
            borderRadius="4px"
            py="17px"
          >
            Proceed
          </Button>
        </Flex>
      </Box>
    </ModalLayout>
  );
};

export default Msg;
