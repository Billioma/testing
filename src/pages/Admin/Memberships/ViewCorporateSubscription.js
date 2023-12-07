import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import {
  customStyles,
  intervals,
  statusType,
} from "../../../components/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoMdRefresh, IoMdClose, IoIosArrowDown } from "react-icons/io";
import {
  useCancelCorporateSubscription,
  useGetAdminCorpSub,
  useGetMembershipPlans,
  useRenewCorporateSubscription,
} from "../../../services/admin/query/memberships";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import AdminActionModal from "../../../components/modals/AdminDeleteModal";

export default function ViewCorporateSubscription() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const { errorToast, successToast } = useCustomToast();

  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const { mutate, data, isLoading } = useGetAdminCorpSub();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { mutate: renewCorporateSub, isLoading: isRenewing } =
    useRenewCorporateSubscription({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsRenewModalOpen(false);
        sessionStorage.removeItem("edit");
        navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { mutate: cancelCorporateSub, isLoading: isCanceling } =
    useCancelCorporateSubscription({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsCancelModalOpen(false);
        sessionStorage.removeItem("edit");
        navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { data: membershipPlans } = useGetMembershipPlans({}, 1, 100000);
  const { data: locations } = useGetAllLocations();

  const membershipPlanOptions = membershipPlans?.data?.map((plan) => ({
    label: plan?.name,
    value: parseInt(plan?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const [values, setValues] = useState({
    autoRenewal: "",
    nextPaymentDate: "",
    membershipPlan: "",
    startDate: "",
    status: "",
  });

  useEffect(() => {
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );
    const selectedPlanOption = membershipPlanOptions?.find(
      (option) => option?.value === Number(data?.membershipPlan?.id)
    );

    setValues({
      ...values,
      membershipPlan: selectedPlanOption,
      startDate: data?.startDate,
      nextPaymentDate: data?.nextPaymentDate,
      autoRenewal: data?.autoRenewal,
      status: selectedStatusOption,
    });
  }, [data, membershipPlans, locations]);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Flex
                bg="#fff"
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
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
                    Subscription plan
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Select plan"
                    options={membershipPlanOptions}
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
                    value={values?.membershipPlan}
                    isDisabled
                  />
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
                    value={`₦ ${data?.membershipPlan?.amount?.toLocaleString()}`}
                    mb
                    holder="Enter amount"
                    dis
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Duration
                  </Text>
                  <CustomInput
                    auth
                    value={
                      data &&
                      Object.values(
                        intervals[data?.membershipPlan?.interval]
                      )[0]
                    }
                    mb
                    holder="Enter duration"
                    dis
                  />
                </Box>

                <Flex
                  justify={"space-between"}
                  gap={4}
                  flexDir={["column", "row"]}
                >
                  <Box mb={4} w={["100%", "50%"]}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Start Date
                    </Text>
                    <DateTimePicker
                      selectedDate={values?.startDate || new Date()}
                      isDisabled
                    />
                  </Box>

                  <Box mb={4} w={["100%", "50%"]}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="12px"
                    >
                      Next Payment Date
                    </Text>
                    <DateTimePicker
                      selectedDate={values?.nextPaymentDate || new Date()}
                      isDisabled
                    />
                  </Box>
                </Flex>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Status
                  </Text>
                  <Select
                    styles={customStyles}
                    placeholder="Status"
                    options={statusOptions}
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
                    isDisabled
                  />
                </Box>

                <Flex wrap={"wrap"} gap={4} mt={2}>
                  <Flex
                    fontSize="14px"
                    fontWeight={500}
                    opacity={edit ? 1 : 0.6}
                    cursor={!edit ? "" : "pointer"}
                    color="#A11212"
                    align={"center"}
                    gap={2}
                    onClick={() => (!edit ? "" : setIsCancelModalOpen(true))}
                  >
                    <IoMdClose />
                    <Text>Cancel Subscription</Text>
                  </Flex>
                  <Flex
                    cursor={!edit ? "" : "pointer"}
                    fontSize="14px"
                    fontWeight={500}
                    color="#0B841D"
                    opacity={edit ? 1 : 0.6}
                    align={"center"}
                    gap={2}
                    onClick={() => (!edit ? "" : setIsRenewModalOpen(true))}
                  >
                    <IoMdRefresh />
                    <Text>Renew Subscription</Text>
                  </Flex>
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                  >
                    <Text fontSize="14px" fontWeight={500} color="#444648">
                      Auto-Renewal
                    </Text>
                    <Switch
                      isChecked={values?.autoRenewal}
                      isDisabled
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                </Flex>

                <Flex gap={4} mt={4}>
                  <Button
                    variant={!edit ? "adminPrimary" : "adminSecondary"}
                    w="100%"
                    onClick={() => setEdit(!edit)}
                  >
                    {edit ? "Cancel" : "Edit"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <AdminActionModal
              isOpen={isCancelModalOpen}
              onClose={() => setIsCancelModalOpen(false)}
              title="Cancel Subscription"
              subTitle="Are you sure you want to cancel this subscription?"
              handleSubmit={() => cancelCorporateSub(id)}
              isLoading={isCanceling}
              headerColor="#A11212"
              btnColor="#A11212"
            />

            <AdminActionModal
              isOpen={isRenewModalOpen}
              onClose={() => setIsRenewModalOpen(false)}
              title="Renew Subscription"
              subTitle="Are you sure you want to renew this subscription?"
              handleSubmit={() =>
                renewCorporateSub({
                  id,

                  body: {
                    autoRenewal: 0,
                    paymentMethod: 2,
                  },
                })
              }
              isLoading={isRenewing}
            />
          </>
        )}
      </Flex>
    </Box>
  );
}
