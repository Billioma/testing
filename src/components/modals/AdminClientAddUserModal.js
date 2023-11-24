import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCheckLg, BsPlus } from "react-icons/bs";
import { useGetEntityCustomers } from "../../services/admin/query/clients";
import CustomInput from "../common/CustomInput";

const AdminClientAddUserModal = ({
  isOpen,
  onClose,
  isUser,
  handleDetach,
  isAttaching,
  isDetaching,
  clientUsers,
  handleAttach,
}) => {
  const [customer, setCustomer] = useState("");
  const { data: entityCustomers, isLoading } = useGetEntityCustomers(customer);
  const [users, setUsers] = useState([]);

  const handleUserClick = (user) => {
    const userIndex = users?.findIndex((u) => u?.id === user?.id);

    if (userIndex === -1) {
      setUsers([...users, user]);
      handleAttach(user);
    } else if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers?.splice(userIndex, 1);
      setUsers(updatedUsers);
      handleDetach(user);
    }
  };
  const userToMap = isUser ? users : clientUsers;
  const [isExiting, setIsExiting] = useState(false);

  const save = () => {
    setIsExiting(true);
    setTimeout(() => {
      setUsers([]);
      setCustomer("");
      onClose();
      setIsExiting(false);
    }, 2000);
  };

  const close = () => {
    setUsers([]);
    setCustomer("");
    onClose();
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="0"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Text
            textAlign="center"
            mb="32px"
            fontSize="24px"
            color="#242628"
            fontWeight={700}
          >
            Add Users
          </Text>
          <Box borderRadius="8px" p="16px" border="1px solid #e4e6e8">
            <CustomInput
              search
              holder="Search by name or email"
              auth
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />

            <Flex
              h="35vh"
              overflowY="scroll"
              flexDir="column"
              gap="24px"
              mt="16px"
            >
              {isLoading ? (
                <Flex justifyContent="center" align="center">
                  <Spinner />
                </Flex>
              ) : entityCustomers?.length ? (
                entityCustomers
                  ?.filter(
                    (user) =>
                      !userToMap?.some(
                        (clientUser) => clientUser.id === user.id
                      )
                  )
                  ?.map((user, i) => (
                    <Flex
                      align="center"
                      key={i}
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box w="full">
                        <Text color="#646668" fontSize="14px" lineHeight="100%">
                          {user?.profile?.firstName} {user?.profile?.lastName}
                        </Text>
                        <Text
                          mt="8px"
                          color="#444648"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {user?.email}
                        </Text>
                      </Box>
                      <Flex
                        justifyContent="center"
                        align="center"
                        p="10px"
                        cursor="pointer"
                        opacity={isAttaching || isDetaching ? 0.5 : 1}
                        onClick={() =>
                          isAttaching || isDetaching
                            ? ""
                            : handleUserClick(user)
                        }
                        bg={
                          users?.some((u) => u?.id === user?.id)
                            ? "#0b841d"
                            : "#EE383A"
                        }
                        borderRadius="8px"
                        border="1px solid #e4e6e8"
                      >
                        {users?.some((u) => u?.id === user?.id) ? (
                          isAttaching ? (
                            <Spinner size="md" color="#fff" />
                          ) : (
                            <BsCheckLg size="20px" color="#fff" />
                          )
                        ) : isDetaching ? (
                          <Spinner size="md" color="#fff" />
                        ) : (
                          <BsPlus size="20px" color="#fff" />
                        )}
                      </Flex>
                    </Flex>
                  ))
              ) : (
                <Text textAlign="center" fontWeight={500} fontSize="14px">
                  No user with this email
                </Text>
              )}
            </Flex>
          </Box>

          <Flex align="center" gap="24px" mt="32px" w="full">
            <Button onClick={close} w="full" variant="adminSecondary">
              Cancel
            </Button>
            <Button
              isLoading={isExiting}
              onClick={save}
              w="full"
              variant={"adminPrimary"}
            >
              Save
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminClientAddUserModal;
