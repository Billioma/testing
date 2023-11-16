import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { SecStatus, clientUserHeader } from "../../../common/constants";
import { formatDate } from "../../../../utils/helpers";
import { FiMoreVertical } from "react-icons/fi";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { useDetachUser } from "../../../../services/client/query/users";
import { BsTrash } from "react-icons/bs";
import { Add } from "../../../common/images";
import { useNavigate } from "react-router-dom";
import TableFormat from "../../../common/TableFormat";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  setLimit,
  limit,
  userMutate,
}) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const open = (item) => {
    setShow(true);
    setCurrentUser(item);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showDelete) {
      setShow(false);
    }
  }, [showDelete]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate: detachMutate, isLoading: isDelete } = useDetachUser({
    onSuccess: () => {
      successToast("User has been removed");
      userMutate({ limit: 10, page: 1 });
      setShowDelete(false);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleDelete = () => {
    detachMutate(currentUser?.email);
  };

  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={clientUserHeader}
            opt
            alignFirstHeader
            paginationValues={{
              startRow,
              endRow,
              total: data?.total,
              page: data?.page,
              pageCount: data?.pageCount,
              onNext: () =>
                data?.page !== data?.pageCount ? setPage(page + 1) : null,
              onPrevious: () => (data?.page !== 1 ? setPage(page - 1) : null),
              setLimit,
              limit,
            }}
            useDefaultPagination
          >
            {data?.data?.map((item, i) => (
              <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                <Td>
                  {item?.profile?.firstName} {item?.profile?.lastName}
                </Td>

                <Td textAlign="center">{item?.profile?.phone}</Td>
                <Td textAlign="center">
                  {item?.profile?.companyName || "N/A"}
                </Td>
                <Td textAlign="center">{item?.email}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[item?.status])[0]}
                      bg={Object?.values(SecStatus[item?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(SecStatus[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDate(item?.createdAt)}</Td>
                <Td>
                  <Flex
                    onClick={() => open(item)}
                    justifyContent="center"
                    pos="relative"
                    cursor="pointer"
                    className="box"
                    align="center"
                  >
                    <FiMoreVertical />
                    {show && currentUser === item && (
                      <Box
                        border="1px solid #F4F6F8"
                        px="4px"
                        py="8px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        top={i < 3 ? "20px" : "unset"}
                        bottom={i > 3 ? "0" : "unset"}
                        right="0"
                        zIndex={5555555}
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        <Flex
                          py="6px"
                          px="8px"
                          borderRadius="2px"
                          justifyContent="center"
                          align="center"
                          onClick={() => setShowDelete(true)}
                          _hover={{ bg: "#F4F6F8" }}
                          cursor="pointer"
                          fontSize="10px"
                          color="red"
                          w="full"
                          lineHeight="100%"
                          fontWeight={500}
                          gap="12px"
                        >
                          <BsTrash size="15px" />
                          Remove User
                        </Flex>
                      </Box>
                    )}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </TableFormat>
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-user.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No User Data
          </Text>

          <Button
            onClick={() => navigate("/client/users/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a User</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}

      <ConfirmDeleteModal
        user
        title="User"
        action={handleDelete}
        isLoading={isDelete}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default TableLayer;
