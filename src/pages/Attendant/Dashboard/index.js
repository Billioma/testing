import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetUser } from "../../../services/attendant/query/user";
import { PiScan } from "react-icons/pi";
import CustomInput from "../../../components/common/CustomInput";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useGetUserVehicles } from "../../../services/attendant/query/logs";
import GuestVeh from "../../../components/modals/GuestVeh";
import { IoIosArrowForward } from "react-icons/io";
import { VehicleIcon } from "../../../components/common/images";

const index = () => {
  const [license, setLicense] = useState("");
  const { data } = useGetUser();
  const navigate = useNavigate();
  const attLoc = JSON.parse(localStorage.getItem("attLoc"));
  const attZone = JSON.parse(localStorage.getItem("attZone"));
  const guest = useDisclosure();
  const { mutate, isLoading } = useGetUserVehicles({
    onSuccess: (res) => {
      sessionStorage.setItem("vehData", JSON.stringify(res));
      navigate("/attendant/valet");
    },
    onError: (err) => {
      const error = err?.response?.data?.message || err?.message;
      console.log(error === "Vehicle Not Found");
      if (error === "Vehicle Not Found") {
        guest.onOpen();
        localStorage.setItem("guestVeh", license);
      }
    },
  });

  useEffect(() => {
    sessionStorage.removeItem("vehData");
  }, []);

  const handleSubmit = () => {
    mutate({ license, zone: attZone?.id });
  };

  return (
    <Box>
      <GuestVeh isOpen={guest.isOpen} onClose={guest.onClose} />
      <Flex align="center" gap="12px">
        <Avatar
          src={process.env.REACT_APP_BASE_URL + data?.avatar}
          w="42px"
          h="42px"
        />
        <Text color="#242628" fontSize="14px">
          Welcome!
          <br />
          <span style={{ fontSize: "16px" }}>{data?.name}</span>
        </Text>
      </Flex>

      <Flex
        my="30px"
        fontSize="14px"
        justifyContent="center"
        bg="#fff"
        w="full"
        align="center"
        h="57px"
        border="1px solid #E4E6E8"
        borderRadius="8px"
        gap="8px"
      >
        <PiScan size="25px" color="#444648" />
        <Text color="#848688">Scan Ticket</Text>
      </Flex>

      <Box
        bg="#fff"
        border="1px solid #E4E6E8"
        borderRadius="8px"
        p="20px 18px"
      >
        <Text mb="8px" color="#242628" fontSize="14px">
          License Plate<span style={{ color: "tomato" }}>*</span>
        </Text>

        <CustomInput
          value={license}
          holder="Enter License Number"
          onChange={(e) => setLicense(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          isDisabled={!license}
          mt="24px"
          w="full"
          isLoading={isLoading}
          h="50px"
        >
          Search vehicle
        </Button>
      </Box>

      <Flex
        align="center"
        border="1px solid #E4E6E8"
        borderRadius="12px"
        mt="35px"
        p="24px"
        bg="#fff"
        fontSize="14px"
        justifyContent="space-between"
      >
        <Box>
          <Text fontFamily="Recoleta" color="#242628" fontSize="24px">
            {attZone?.name}
          </Text>
          <Flex mt="8px" align="center" color="#444648" gap="5px">
            <CiLocationOn />
            <Text>{attLoc?.name}</Text>
          </Flex>
        </Box>
        <Box
          color="#EE383A"
          cursor="pointer"
          onClick={() => navigate("/attendant/locations")}
        >
          <Text textDecor="underline" textUnderlineOffset="4px">
            Change
          </Text>
        </Box>
      </Flex>

      <Flex
        align="center"
        border="1px solid #E4E6E8"
        borderRadius="12px"
        display={data?.accountType === "PARKING" ? "flex" : "none"}
        mt="35px"
        p="24px"
        bg="#fff"
        onClick={() => navigate("/attendant/park")}
        fontSize="14px"
        justifyContent="space-between"
      >
        <Flex align="center" gap="10px">
          <VehicleIcon fill="#242628" />
          <Text color="#444648" fontSize="14px">
            Park Online Customers
          </Text>
        </Flex>

        <IoIosArrowForward />
      </Flex>
    </Box>
  );
};

export default index;
