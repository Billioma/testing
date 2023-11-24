import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useEditEventParking,
  useGetAdminEventParkingDetails,
} from "../../../services/admin/query/transactions";
import Select from "react-select";
import { Status, customStyles } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import { useGetZones } from "../../../services/admin/query/locations";
import { QRCodeCanvas } from "qrcode.react";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import { formatDateToISOString } from "../../../utils/helpers";

export default function ViewPayToPark() {
  const { id } = useParams();
  const isEdit = sessionStorage.getItem("edit");

  const statusOptions = Status?.map((status, i) => ({
    value: i,
    label: status.name,
  }));

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [values, setValues] = useState({
    zone: "",
    reservedDate: "",
    status: "",
  });

  const { mutate, data, isLoading } = useGetAdminEventParkingDetails();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const navigate = useNavigate();

  const { data: zones } = useGetZones({}, 1, 10000);

  const zoneOptions = zones?.data?.map((zone) => ({
    label: zone?.name,
    value: zone?.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditEventParking({
    onSuccess: () => {
      successToast("Transaction updated successfully!");
      navigate("/admin/transactions/event-parking");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        vehicle: Number(data?.vehicle?.id),
        zone: Number(data?.zone?.id),
        reservedDate: formatDateToISOString(values?.reservedDate),
        paymentMethod: data?.transaction?.paymentMethod,
      },
    });
  };

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option.value === data?.status
    );
    const selectedZoneOption = zoneOptions?.find(
      (option) => option.value === data?.zone?.id
    );
    setValues({
      ...values,
      zone: selectedZoneOption,
      reservedDate: data?.reservedDate,
      status: selectedStatusOption,
    });
  }, [data, zones]);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="flex-start"
              w={{
                base: "100%",
                md: "80%",
              }}
              flexDir={{ md: "row", base: "column" }}
              gap="30px"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w="100%"
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Event Name
                  </Text>
                  <CustomInput auth value={data?.event?.name} mb isDisabled />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Amount
                  </Text>
                  <CustomInput
                    auth
                    value={data?.amount}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone
                  </Text>
                  <Select
                    styles={customStyles}
                    options={zoneOptions}
                    value={values?.zone}
                    placeholder="Select zone"
                    isDisabled
                    components={{
                      IndicatorSeparator: () => (
                        <div style={{ display: "none" }}></div>
                      ),
                      DropdownIndicator: () => (
                        <div>
                          <IoIosArrowDown size="15px" color="#646668" />
                        </div>
                      ),
                    }}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Vehicle
                  </Text>
                  <CustomInput
                    auth
                    value={data?.vehicle?.licensePlate}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Customer
                  </Text>
                  <CustomInput
                    auth
                    value={`${data?.customer?.profile?.firstName} ${data?.customer?.profile?.lastName}`}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Reserved Date
                  </Text>

                  <DateTimePicker
                    selectedDate={values?.reservedDate || new Date()}
                    hasTime
                    onChange={(date) =>
                      setValues({ ...values, reservedDate: new Date(date) })
                    }
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>

                  <Select
                    styles={customStyles}
                    options={statusOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "status",
                      })
                    }
                    components={{
                      IndicatorSeparator: () => (
                        <div style={{ display: "none" }}></div>
                      ),
                      DropdownIndicator: () => (
                        <div>
                          <IoIosArrowDown size="15px" color="#646668" />
                        </div>
                      ),
                    }}
                    value={values?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate("/admin/transactions/reserved-parking"),
                          sessionStorage.removeItem("edit"))
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="adminPrimary"
                    w="100%"
                    isLoading={isUpdating}
                    onClick={() => (!edit ? setEdit(true) : handleSubmit())}
                  >
                    {!edit ? "Edit" : "Save"}
                  </Button>
                </Flex>
              </Flex>

              <Flex flexDir={"column"} w="100%">
                <Flex
                  bg="#fff"
                  borderRadius="8px"
                  py="32px"
                  px="28px"
                  align="center"
                  justifyContent="center"
                  gap="30px"
                  border="1px solid #E4E6E8"
                  h="fit-content"
                >
                  <Text
                    fontSize="24px"
                    fontWeight={500}
                    lineHeight="100%"
                    color="#646668"
                  >
                    QR Code
                  </Text>

                  <QRCodeCanvas
                    size={150}
                    value={data?.zone?.name}
                    viewBox={`0 0 150 150`}
                    renderAs="canvas"
                    id="qrcode"
                  />
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
