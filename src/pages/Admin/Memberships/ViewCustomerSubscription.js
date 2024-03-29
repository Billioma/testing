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
  useCancelCustomerSubscription,
  useEditCustomerSubscription,
  useGetAdminCustomerSub,
  useGetMembershipPlans,
  useRenewCustomerSubscription,
} from "../../../services/admin/query/memberships";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import AdminActionModal from "../../../components/modals/AdminDeleteModal";

export default function ViewMembershipSubscription() {
  const [state, setState] = useState({
    membershipPlan: "",
    subscriptionOptions: [
      {
        planFeature: 0,
        data: "",
      },
    ],
    startDate: "",
    nextPaymentDate: "",
    autoRenewal: 0,
    status: 1,
    paymentMethod: "",
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const { id } = useParams();

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const { mutate, data, isLoading } = useGetAdminCustomerSub();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const navigate = useNavigate();

  const { mutate: renewCustomerSub, isLoading: isRenewing } =
    useRenewCustomerSubscription({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsRenewModalOpen(false);
        sessionStorage.removeItem("edit");
        navigate(PRIVATE_PATHS.ADMIN_CUSTOMER_SUBSCRIPTIONS);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const { mutate: cancelCustomerSub, isLoading: isCanceling } =
    useCancelCustomerSubscription({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsCancelModalOpen(false);
        sessionStorage.removeItem("edit");
        navigate(PRIVATE_PATHS.ADMIN_CUSTOMER_SUBSCRIPTIONS);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { mutate: updateMutate, isLoading: isUpdating } =
    useEditCustomerSubscription({
      onSuccess: () => {
        successToast("Customer Sub updated successfully!");
        navigate(PRIVATE_PATHS.ADMIN_CUSTOMER_SUBSCRIPTIONS);
        sessionStorage.removeItem("edit");
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        status: state?.status?.value,
      },
    });
  };

  const { data: membershipPlans } = useGetMembershipPlans({}, 1, 100000);
  const { data: locations } = useGetAllLocations();

  const membershipPlanOptions = membershipPlans?.data?.map((plan) => ({
    label: plan?.name,
    value: parseInt(plan?.id),
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location?.name,
    value: location?.id,
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  useEffect(() => {
    const selectedPlanOption = membershipPlanOptions?.find(
      (option) => option?.value === Number(data?.membershipPlan?.id)
    );
    const selectedStatusOption = statusOptions?.find(
      (option) => option?.value === data?.status
    );

    setState({
      ...state,
      membershipPlan: selectedPlanOption,
      startDate: data?.startDate,
      status: selectedStatusOption,
      nextPaymentDate: data?.nextPaymentDate,
    });
  }, [data, membershipPlans]);

  return (
    <Box minH="75vh">
      {" "}
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
                borderRadius="16px"
                py="24px"
                px="28px"
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
                    options={membershipPlanOptions}
                    placeholder="Select plan"
                    value={state?.membershipPlan}
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
                    holder="Enter amount"
                    isDisabled
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
                      selectedDate={state?.startDate || new Date()}
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
                      selectedDate={state?.nextPaymentDate || new Date()}
                      isDisabled
                    />
                  </Box>
                </Flex>

                {state?.locations?.data ? (
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Select a location
                    </Text>
                    <Select
                      styles={customStyles}
                      isMulti
                      options={locationOptions}
                      value={state?.location}
                      isDisabled
                    />
                  </Box>
                ) : null}

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
                    value={state?.status}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex wrap={"wrap"} gap={4} mt={2}>
                  <Flex
                    fontSize="14px"
                    opacity={edit ? 1 : 0.6}
                    cursor={!edit ? "" : "pointer"}
                    fontWeight={500}
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
                      isDisabled
                      isChecked={state?.autoRenewal}
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
                  <Button
                    variant="adminPrimary"
                    display={edit ? "flex" : "none"}
                    i
                    isLoading={isUpdating}
                    w="100%"
                    onClickCapture={handleSubmit}
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <AdminActionModal
              isOpen={isCancelModalOpen}
              onClose={() => setIsCancelModalOpen(false)}
              title="Cancel Subscription"
              subTitle="Are you sure you want to cancel this subscription?"
              handleSubmit={() => cancelCustomerSub(id)}
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
                renewCustomerSub({
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
