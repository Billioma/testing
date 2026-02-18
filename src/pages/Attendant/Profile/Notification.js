import { useEffect, useState } from "react";
import {
  useCheckNoti,
  useGetUserNoti,
} from "../../../services/attendant/query/user";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { formatDateTime } from "../../../utils/helpers";
import { IoIosArrowForward } from "react-icons/io";
import Noti from "../../../components/modals/Noti";
import useCustomToast from "../../../utils/notifications";

const Notification = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, refetch } = useGetUserNoti(debouncedSearch, {
    refetchOnWindowFocus: true,
  });

  const { errorToast } = useCustomToast();
  const { mutate } = useCheckNoti({
    onSuccess: (res) => {
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = (id) => {
    mutate(id);
  };

  return (
    <Box>
      <Noti isOpen={show} data={show} onClose={() => setShow(false)} />
      <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
        <CustomInput
          mb
          holder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Flex flexDir="column" mt="24px" gap="16px">
        {data?.data?.length
          ? data?.data?.map((item, i) => (
              <Flex
                key={i}
                pos="relative"
                justifyContent="space-between"
                bg="#fff"
                p="24px"
                onClick={() => {
                  setShow(item);
                  if (!item?.isRead) {
                    handleSubmit(item?.id);
                  }
                }}
                align="center"
                border="1px solid #E4E6E8"
                borderRadius="12px"
              >
                <Box
                  pos="absolute"
                  left="0"
                  top="0"
                  display={!item?.isRead ? "block" : "none"}
                  w="10px"
                  h="10px"
                  bg="red"
                  rounded="full"
                />
                <Flex align="center" gap="12px">
                  <Image src="/assets/car2.png" w="40px" h="40px" />
                  <Box>
                    <Text color="#242628" fontWeight={500} fontSize="14px">
                      {item?.title}
                    </Text>
                    <Text color="#848688" fontSize="12px">
                      {formatDateTime(item?.createdAt)}
                    </Text>
                  </Box>
                </Flex>

                <IoIosArrowForward />
              </Flex>
            ))
          : ""}
      </Flex>
    </Box>
  );
};

export default Notification;
