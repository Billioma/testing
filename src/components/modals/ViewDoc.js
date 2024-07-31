import React from "react";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useReUpload } from "../../services/admin/query/reports";
import useCustomToast from "../../utils/notifications";

const ViewDoc = ({ isOpen, data, id, onClose, mutate }) => {
  const { errorToast, successToast } = useCustomToast();
  const { mutate: uploadMutate, isLoading } = useReUpload({
    onSuccess: () => {
      successToast("Status updated successfully!");
      onClose();
      mutate(id);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    uploadMutate({
      query: id,
      body: {
        ids: [data?.id],
      },
    });
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        p="24px"
        overflowY="auto"
        borderRadius="0"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex align="center" justifyContent="space-between">
            <Flex
              mb="14px"
              gap="12px"
              align="center"
              cursor="pointer"
              w="fit-content"
            >
              <Image
                src="/assets/folders.svg"
                w="16px"
                h="16px"
                objectFit="contain"
              />
              <Text color="#646668" fontSize="14px" fontWeight={500}>
                {data?.name}
              </Text>
            </Flex>

            <Flex
              border="1px solid #646668"
              w="22px"
              h="22px"
              justifyContent="center"
              align="center"
              cursor="pointer"
              onClick={onClose}
              rounded="full"
            >
              <MdClose size="15px" />
            </Flex>
          </Flex>
          <Box my="24px">
            <Image
              objectFit="contain"
              h="240px"
              w="full"
              src={process.env.REACT_APP_BASE_URL + data?.url}
            />
          </Box>
          {isLoading ? (
            <Flex justifyContent="center" align="center">
              <Spinner size="sm" />
            </Flex>
          ) : (
            <Text
              textAlign="center"
              color="#646668"
              onClick={handleSubmit}
              fontSize="12px"
              textDecor="underline"
              cursor="pointer"
            >
              Ask for Customer Reupload
            </Text>
          )}
          ˝
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewDoc;
