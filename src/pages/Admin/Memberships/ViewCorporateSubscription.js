import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { customStyles, intervals } from "../../../components/common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoMdRefresh, IoMdClose } from "react-icons/io";
import {
  useCancelCorporateSubscription,
  useDeleteCorporateSubscription,
  useEditCorporateSubscription,
  useGetCorporateSubscriptions,
  useGetMembershipPlans,
  useRenewCorporateSubscription,
} from "../../../services/admin/query/memberships";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import AdminActionModal from "../../../components/modals/AdminDeleteModal";

export default function ViewCorporateSubscription() {
  const [state, setState] = useState({
    customer: 0,
    membershipPlan: "",
    subscriptionOptions: [
      {
        planFeature: 0,
        data: "string",
      },
    ],
    startDate: "",
    nextPaymentDate: "",
    autoRenewal: 0,
    status: 1,
    paymentMethod: 2,
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { refetch } = useGetCorporateSubscriptions();

  const { mutate, isLoading } = useEditCorporateSubscription({
    onSuccess: () => {
      refetch();
      successToast("Corporate subscription updated successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteCorporateSub, isLoading: isDeleting } =
    useDeleteCorporateSubscription({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsDeleteModalOpen(false);
        refetch();
        navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const { mutate: renewCorporateSub, isLoading: isRenewing } =
    useRenewCorporateSubscription({
      onSuccess: (res) => {
        successToast(res?.message);
        setIsRenewModalOpen(false);
        refetch();
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
        refetch();
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
    label: plan.name,
    value: parseInt(plan.id),
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { autoRenewal, nextPaymentDate, startDate, status, id } = state;

    mutate({ autoRenewal, nextPaymentDate, startDate, status, id });
  };

  useEffect(() => {
    setState({
      ...state,
      ...location.state,
      membershipPlan: parseInt(location.state?.membershipPlan?.id),
      customer: location.state.customer?.id,
      amount: location.state.membershipPlan.amount,
      interval: membershipPlans?.data?.find(
        (plan) => plan?.id === location.state.membershipPlan.id
      )?.interval,
      locations: location.state?.subscriptionOptions?.find(
        (option) => option?.planFeature?.featureType == 3
      ),
    });

    setIsEdit(location?.state?.isEdit);
  }, [location.state, membershipPlans]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />

        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w="30rem"
          flexDir="column"
          border="1px solid #E4E6E8"
        >
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Subscription plan
            </Text>
            <Select
              styles={customStyles}
              onChange={({ value }) =>
                handleSelectChange(value, { name: "membershipPlan" })
              }
              options={membershipPlanOptions}
              placeholder="Select plan"
              value={membershipPlanOptions?.find(
                (plan) => plan.value === state.membershipPlan
              )}
              isDisabled
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Amount
            </Text>
            <CustomInput
              auth
              value={`₦${state.amount}`}
              mb
              holder="Enter amount"
              isDisabled
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Duration
            </Text>
            <CustomInput
              auth
              value={
                intervals[state?.interval]
                  ? intervals[state?.interval][state?.interval]
                  : ""
              }
              mb
              holder="Enter amount"
              isDisabled
            />
          </Box>

          <Flex justify={"space-between"} gap={4} flexDir={["column", "row"]}>
            <Box mb={4} w={["100%", "50%"]}>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Start Date
              </Text>
              <DateTimePicker
                selectedDate={state.startDate || new Date()}
                onChange={(date) => setState({ ...state, startDate: date })}
                isDisabled={!isEdit}
              />
            </Box>

            <Box mb={4} w={["100%", "50%"]}>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Next Payment Date
              </Text>
              <DateTimePicker
                selectedDate={state.nextPaymentDate || new Date()}
                onChange={(date) =>
                  setState({ ...state, nextPaymentDate: date })
                }
                isDisabled={true}
              />
            </Box>
          </Flex>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Status
            </Text>
            <Select
              styles={customStyles}
              placeholder="Status"
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
                { label: "Canceled", value: 2 },
              ]}
              onChange={(selectedOption) =>
                setState({ ...state, status: selectedOption.value })
              }
              value={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
                { label: "Canceled", value: 2 },
              ]?.find((status) => status.value === state.status)}
              isDisabled={!isEdit}
            />
          </Box>

          {state.locations?.data ? (
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select a location
              </Text>
              <Select
                styles={customStyles}
                isMulti={typeof location === "object"}
                options={locationOptions}
                value={locationOptions?.find(
                  (option) => option.value == state.locations?.data
                )}
                isDisabled
              />
            </Box>
          ) : null}

          <Flex wrap={"wrap"} gap={4} mt={2}>
            <Flex
              fontSize="12px"
              fontWeight={500}
              color="#A11212"
              align={"center"}
              gap={2}
              onClick={() => setIsCancelModalOpen(true)}
            >
              <IoMdClose />
              <Text>Cancel Subscription</Text>
            </Flex>
            <Flex
              cursor={"pointer"}
              fontSize="12px"
              fontWeight={500}
              color="#0B841D"
              align={"center"}
              gap={2}
              onClick={() => setIsRenewModalOpen(true)}
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
              <Text fontSize="12px" fontWeight={500} color="#444648">
                Renew Automatically
              </Text>
              <Switch
                onChange={() =>
                  setState({
                    ...state,
                    autoRenewal: state.autoRenewal ? 0 : 1,
                  })
                }
                isChecked={state.autoRenewal}
                size="sm"
                variant="adminPrimary"
              />
            </Flex>
          </Flex>

          <Flex gap={4} mt={4}>
            <Button
              variant={!isEdit ? "adminDanger" : "adminSecondary"}
              w="45%"
              onClick={() =>
                !isEdit
                  ? setIsDeleteModalOpen(true)
                  : navigate(PRIVATE_PATHS.ADMIN_CORPORATE_SUBSCRIPTIONS)
              }
            >
              {!isEdit ? "Delete" : "Cancel"}
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isLoading={isLoading}
              onClick={(e) => (!isEdit ? setIsEdit(!isEdit) : handleSubmit(e))}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <AdminActionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancel Subscription"
        subTitle="Are you sure you want to cancel this subscription?"
        handleSubmit={() => cancelCorporateSub(state.id)}
        isLoading={isCanceling}
        headerColor="#A11212"
        btnColor="#A11212"
      />

      <AdminActionModal
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
        title="Renew Subscription"
        subTitle="Are you sure you want to renew this subscription?"
        handleSubmit={() => renewCorporateSub(state.id)}
        isLoading={isRenewing}
      />

      <AdminActionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Subscription"
        subTitle="Are you sure you want to delete this subscription?"
        handleSubmit={() => deleteCorporateSub(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}
