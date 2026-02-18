import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useEffect, useState } from "react";
import Select from "react-select";
import { PiScan } from "react-icons/pi";
import { customStyles } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import {
  useCheckEvent,
  useCheckReserve,
} from "../../../services/attendant/query/logs";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [values, setValues] = useState({
    type: "",
    id: "",
  });

  const typeOptions = ["Reserve", "Event"]?.map((type) => ({
    value: type,
    label: `${type} Parking`,
  }));

  const { errorToast } = useCustomToast();
  const navigate = useNavigate();
  const attZone = JSON.parse(localStorage.getItem("attZone"));
  const { mutate: eventMutate, isLoading: isEvent } = useCheckEvent({
    onSuccess: (res) => {
      localStorage.setItem("attRes", JSON.stringify(res));
      navigate(`/attendant/reservations/${res?.id}`);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const { mutate: reserveMutate, isLoading: isReserve } = useCheckReserve({
    onSuccess: (res) => {
      localStorage.setItem("attRes", JSON.stringify(res));
      navigate(`/attendant/reservations/${res?.id}`);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    localStorage.setItem("resType", values.type?.value);
    if (values.type.value === "Event") {
      eventMutate(values.id);
    } else {
      reserveMutate({ reservationId: values.id, zoneId: attZone?.id });
    }
  };

  useEffect(() => {
    localStorage.removeItem("attRes");
  }, []);

  return (
    <Box>
      <Text mb="24px" textAlign="center" color="#646668" fontSize="14px">
        Search or scan the customer's QR code to view the reservation.
      </Text>

      <Flex
        flexDir="column"
        gap="24px"
        bg="#fff"
        border="1px solid #E4E6E8"
        borderRadius="8px"
        p="20px 18px"
      >
        <Box>
          <Text color="#242628" fontSize="14px" mb="8px">
            Reservation Type<span style={{ color: "tomato" }}>*</span>
          </Text>

          <Select
            styles={customStyles}
            options={typeOptions}
            placeholder="Select Type"
            value={values.type}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () => (
                <IoIosArrowDown size="15px" color="#646668" />
              ),
            }}
            onChange={(selectedOption) =>
              setValues({ ...values, type: selectedOption })
            }
          />
        </Box>

        <Box>
          <Text mb="8px" color="#242628" fontSize="14px">
            Reservation ID<span style={{ color: "tomato" }}>*</span>
          </Text>

          <CustomInput
            value={values.id}
            holder="Enter ID"
            onChange={(e) => setValues({ ...values, id: e.target.value })}
          />
        </Box>

        <Flex align="center" gap="10px">
          <Button
            isDisabled={!values.id || !values.type}
            mt="24px"
            w="full"
            h="50px"
            onClick={handleSubmit}
            isLoading={isEvent || isReserve}
          >
            Search Reservation
          </Button>

          <Button mt="24px" w="50px" h="50px">
            <PiScan size="25px" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default index;
