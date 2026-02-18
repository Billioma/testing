import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";
import { formatDateTime } from "../../utils/helpers";
import { IoIosArrowForward } from "react-icons/io";

const Noti = ({ isOpen, data, onClose }) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Flex align="flex-start" gap="12px">
        <Image src="/assets/car2.png" w="40px" h="40px" />
        <Box>
          <Text color="#242628" fontWeight={500} fontSize="14px">
            {data?.title}
          </Text>
          <Text color="#242628" fontSize="14px">
            {data?.content}
          </Text>
          <Text mt="20px" color="#848688" fontSize="12px">
            {formatDateTime(data?.createdAt)}
          </Text>
        </Box>
      </Flex>
    </ModalLayout>
  );
};

export default Noti;
