import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useDeletePayToPark,
  useGetAdminPayToParkDetails,
} from "../../../services/admin/query/transactions";
import { QRCodeCanvas } from "qrcode.react";

export default function ViewPayToPark() {
  const { id } = useParams();

  const {
    mutate: detailsMutate,
    data,
    isLoading,
  } = useGetAdminPayToParkDetails();

  useEffect(() => {
    detailsMutate({ id: id });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDeletePayToPark({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      navigate("/admin/transactions/pay-to-park");
    },

    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const billingTypes = ["ADHOC", "COMPLEMENTARY", "SUBSCRIPTION", "EVENT"];

  const handleSubmit = () => {
    mutate(id);
  };

  return (
    <Box minH="75vh">
      {" "}
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
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Ticket Number
                  </Text>
                  <CustomInput auth value={data?.ticketNumber} mb isDisabled />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Amount
                  </Text>
                  <CustomInput
                    auth
                    value={"₦" + data?.amount?.toLocaleString()}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Billing Type
                  </Text>
                  <CustomInput
                    auth
                    value={billingTypes[data?.billingType]}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Payment Status
                  </Text>
                  <CustomInput
                    auth
                    value={data?.transaction?.status ? "Paid" : "Unpaid"}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone
                  </Text>
                  <CustomInput
                    auth
                    value={data?.zone?.name}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Service Type
                  </Text>
                  <CustomInput
                    auth
                    value={data?.service?.name}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
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

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>

                  <CustomInput
                    auth
                    value={data?.status ? "ACTIVE" : "INACTIVE"}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminDanger"
                    w="100%"
                    onClick={() => setIsOpen(true)}
                  >
                    Delete
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
            <AdminDeleteModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Delete Transaction"
              subTitle="Are you sure you want to delete this transaction?"
              handleSubmit={handleSubmit}
              isLoading={isDeleting}
            />{" "}
          </>
        )}
      </Flex>
    </Box>
  );
}
