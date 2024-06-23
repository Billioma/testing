import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
  useDelScheduleLocation,
  useGetScheduleLocation,
} from "../../../services/admin/query/schedule";
import { useNavigate, useParams } from "react-router-dom";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import useCustomToast from "../../../utils/notifications";

const ViewLocationSchedule = () => {
  const { id, week, day } = useParams();
  const { mutate, data, isLoading } = useGetScheduleLocation();
  const { successToast, errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate: deleteMutate, isLoading: isDeleting } =
    useDelScheduleLocation({
      onSuccess: (res) => {
        successToast(res?.message);
        // navigate(-1);
        window.location.href = "/admin/staff-schedule";
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const handleFind = () => {
    mutate({
      week: week,
      day: day,
      id: id,
    });
  };

  useEffect(() => {
    handleFind();
  }, []);

  return (
    <Box>
      <GoBackTab />
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <Box border="1px solid #D4D6D8" borderRadius="8px" py="24px" px="28px">
          <Flex
            borderBottom="1px solid #F4F6F8"
            py="12px"
            px="10px"
            align="center"
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize="13px" fontWeight={700} opacity={0.6}>
                LOCATION
              </Text>
              <Text fontSize="18px" mt="3px" fontWeight={500}>
                {data?.name}
              </Text>
            </Box>

            <Flex align="center" fontSize="13px" gap="12px">
              <Flex
                bg="#242628"
                borderRadius="8px"
                py="10px"
                color="#fff"
                px="16px"
                cursor="pointer"
                onClick={() =>
                  navigate(
                    `/admin/staff-schedule/edit/location/${day}/${week}/${id}`
                  )
                }
                align="center"
                _hover={{ opacity: 0.7 }}
                transition=".3s ease-in-out"
                gap="8px"
              >
                <Text>Edit Schedule</Text>
                <AiOutlineEdit size="16px" />
              </Flex>

              <Flex
                cursor="pointer"
                _hover={{ opacity: 0.7 }}
                transition=".3s ease-in-out"
                border="1px solid #242628"
                borderRadius="8px"
                py="10px"
                onClick={() => deleteMutate(day)}
                color="#242628"
                px="16px"
                align="center"
              >
                {isDeleting ? <Spinner size="sm" /> : <Text>Delete</Text>}
              </Flex>
            </Flex>
          </Flex>

          <Box mt="32px" borderBottom="1px solid #F4F6F8" py="12px" px="10px">
            <Text fontSize="13px" fontWeight={700} opacity={0.6}>
              STAFF
            </Text>

            <Flex mt="8px" align="center" flexWrap="wrap" gap="12px">
              {data?.staffProfiles.map((item, i) => (
                <Flex
                  border="1px solid #f4f6f8"
                  borderRadius="4px"
                  py="4px"
                  fontWeight={500}
                  color="#000"
                  px="8px"
                  justifyContent="center"
                  key={i}
                  align="center"
                  gap="12px"
                >
                  <Flex align="center" gap="8px">
                    <Avatar w="24px" h="24px" />

                    <Text fontWeight={500}>{item?.fullName}</Text>
                  </Flex>

                  <Flex
                    bg="#F4F6F8"
                    borderRadius="2px"
                    py="6px"
                    px="8px"
                    fontSize="12px"
                  >
                    {item?.jobTitle?.name || "N/A"}
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ViewLocationSchedule;
