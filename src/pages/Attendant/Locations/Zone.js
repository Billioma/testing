import { useEffect } from "react";
import { useGetUserZones } from "../../../services/attendant/query/user";
import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const Zone = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserZones(id);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("attZone");
  }, []);
  
  return (
    <Flex flexDir="column" gap="16px">
      {isLoading
        ? [...Array(3)].map((_, i) => (
            <Skeleton key={i} h="70px" w="100%" borderRadius="8px" />
          ))
        : data?.map((item, i) => (
            <Flex
              key={i}
              bg="#fff"
              align="center"
              justifyContent="space-between"
              p="17px"
              onClick={() => {
                navigate(`/attendant/dashboard`);
                localStorage.setItem("attZone", JSON.stringify(item));
              }}
              border="1px solid #E4E6E8"
              borderRadius="8px"
            >
              <Flex align="center" gap="12px">
                <CiLocationOn color="#444648" />
                <Text>{item?.name}</Text>
              </Flex>

              <IoIosArrowForward />
            </Flex>
          ))}
    </Flex>
  );
};

export default Zone;
