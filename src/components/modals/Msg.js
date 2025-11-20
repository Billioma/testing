import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";

const Msg = ({ isOpen, action, msgs, setMsgs, isLoading, onClose }) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Text mb="24px" fontWeight={500} color="#444648" fontSize="15px">
        What would you like to do?
      </Text>

      <Box>
        <Flex flexDir="column" gap="16px">
          {[
            "I would like my vehicle now",
            "I would like my vehicle in 5 minutes",
            "I would like my vehicle in 10 minutes",
            "I need something from my car ",
          ].map((item, i) => (
            <Flex key={i} align="center">
              <Checkbox
                isChecked={msgs === item}
                onChange={() => {
                  setMsgs((prev) => (prev === item ? null : item));
                }}
              />
              <Text
                pl="8px"
                onClick={() => {
                  setMsgs((prev) => (prev === item ? null : item));
                }}
                color="#444648"
                fontSize="14px"
              >
                {item}
              </Text>
            </Flex>
          ))}
        </Flex>

        <Flex mt="32px" w="full">
          <Button
            w="full"
            onClick={action}
            isLoading={isLoading}
            isDisabled={!msgs}
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
