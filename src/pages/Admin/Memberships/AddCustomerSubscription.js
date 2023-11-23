import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, SimpleGrid, Switch } from "@chakra-ui/react";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useCreateCustomerSubscription,
  useGetCustomerSubscriptions,
  useGetMembershipPlans,
} from "../../../services/admin/query/memberships";
import { useGetAllCustomers } from "../../../services/admin/query/customers";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

export default function AddCustomerSubscription() {
  const [state, setState] = useState({
    customer: 0,
    membershipPlan: "",
    subscriptionOptions: [
      {
        planFeature: 0,
        data: [],
      },
    ],
    autoRenewal: 0,
    paymentMethod: 2,
  });

  const [featureTypes, setFeatureTypes] = useState([]);

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetCustomerSubscriptions();

  const { mutate, isLoading } = useCreateCustomerSubscription({
    onSuccess: () => {
      refetch();
      successToast("Customer subscription added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CUSTOMER_SUBSCRIPTIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: customers } = useGetAllCustomers();
  const { data: locations } = useGetAllLocations();

  const customerOptions = customers?.data?.map((customer) => ({
    label: `${customer.profile?.firstName} ${customer.profile?.lastName}`,
    value: customer.id,
  }));

  const locationOptions = locations?.data?.map((location) => ({
    label: location.name,
    value: parseInt(location.id),
  }));

  const intervalOptions = [
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Biannually",
    "Annually",
  ];

  const { data: plans } = useGetMembershipPlans({}, 1, 100000);

  useEffect(() => {
    setIsDisabled(false);
  }, [state]);

  const handleSelectChange = (selectedOption, { name }) => {
    if (name === "customer") {
      setState({
        ...state,
        [name]: selectedOption,
      });
      return;
    }

    let temp = state?.subscriptionOptions;
    let tempType;
    if (name === "vehicle") {
      tempType = temp?.find((feature) => feature.type === "vehicle");
      tempType.data = [selectedOption];
    }

    if (name === "location") {
      tempType = temp?.find((feature) => feature.type === "location");
      tempType.data = [selectedOption];
    }

    const index = temp?.findIndex((el) => el.type === name);
    temp.splice(index, 1);
    temp.push(tempType);

    setState({ ...state, subscriptionOptions: temp });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...state });
  };

  const handlePlanSelection = (plan) => {
    const tempFeatureTypes = [];
    const temp = plan?.features?.map((feature) => {
      tempFeatureTypes?.push(
        getFeatureType(feature.featureType, feature.value)
      );

      setFeatureTypes(tempFeatureTypes[0] ? tempFeatureTypes : []);
      return {
        planFeature: feature.id,
        data: [],
        type:
          feature.featureType === 0
            ? "vehicle"
            : feature.featureType === 3
            ? "location"
            : null,
      };
    });

    setState({
      ...state,
      membershipPlan: plan.id,
      subscriptionOptions: temp,
    });
  };

  const getFeatureType = (type, limit) => {
    switch (type) {
      case 0:
        return { vehicle: parseInt(limit) };

      case 3:
        return { location: parseInt(limit) };

      case 6:
        return { users: parseInt(limit) };

      default:
        break;
    }
  };

  return (
    <Box minH="75vh">
      {" "}
      {!state?.membershipPlan ? (
        <Box w="fit-content">
          <GoBackTab />
        </Box>
      ) : (
        <Box
          w="fit-content"
          py={2}
          mb={3}
          color="#242628"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Flex
            align="center"
            fontSize="14px"
            fontWeight="500"
            lineHeight="100%"
            cursor="pointer"
            gap="8px"
            onClick={() => setState({ ...state, membershipPlan: "" })}
          >
            <HiOutlineArrowNarrowLeft size={20} />
            Back
          </Flex>
        </Box>
      )}
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        {state?.membershipPlan ? (
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
            <Box bg="#0D0718" borderRadius="8px" p={4} mb={4}>
              <Text color="#fff" fontSize="14px" fontWeight={500}>
                {
                  plans?.data?.find((plan) => plan.id === state?.membershipPlan)
                    ?.name
                }
              </Text>

              <Flex justifyContent="space-between" mt={3}>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="10px" color="#fff">
                    Price{" "}
                  </Text>
                  <Text fontSize="12px" color="#848688" fontWeight={500}>
                    ₦
                    {plans?.data
                      ?.find((plan) => plan.id === state?.membershipPlan)
                      ?.amount?.toLocaleString()}
                  </Text>
                </Flex>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="10px" color="#fff">
                    Duration{" "}
                  </Text>
                  <Text fontSize="12px" color="#848688" fontWeight={500}>
                    {
                      intervalOptions[
                        plans?.data?.find(
                          (plan) => plan.id === state?.membershipPlan
                        )?.interval
                      ]
                    }
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Select a customer
              </Text>
              <Select
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
                styles={customStyles}
                onChange={({ value }) =>
                  handleSelectChange(value, { name: "customer" })
                }
                options={customerOptions}
                placeholder="Select customer"
              />
            </Box>

            {/* {featureTypes?.find((type) => type["vehicle"]) && (
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  {featureTypes?.find((type) => type["vehicle"]).limit > 1
                    ? `Select up to ${limit} vehicles`
                    : "Select a vehicle"}
                </Text>
                <Select
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
                  styles={customStyles}
                  onChange={({ value }) =>
                    handleSelectChange(value, { name: "vehicle" })
                  }
                  isMulti={
                    featureTypes?.find((type) => type["vehicle"]).limit > 1
                  }
                  options={vehicles?.data
                    ?.filter(
                      (vehicle) => vehicle?.customer?.id == state?.customer
                    )
                    ?.map((vehicle) => ({
                      label: `${vehicle.color} - ${vehicle?.make?.name} - ${vehicle?.model?.name}`,
                      value: parseInt(vehicle.id),
                    }))}
                  placeholder="Select vehicles"
                />
              </Box>
            )} */}

            {featureTypes?.find((type) => type["location"]) && (
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  {featureTypes?.find((type) => type["location"]).limit > 1
                    ? `Select up to ${limit} locations`
                    : " Select a location"}
                </Text>
                <Select
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
                  styles={customStyles}
                  onChange={({ value }) =>
                    handleSelectChange(value, { name: "location" })
                  }
                  isMulti={
                    featureTypes?.find((type) => type["location"]).limit > 1
                  }
                  options={locationOptions}
                  placeholder="Select location"
                />
              </Box>
            )}

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
                    autoRenewal: state?.autoRenewal ? 0 : 1,
                  })
                }
                size="sm"
                variant="adminPrimary"
              />
            </Flex>

            <Flex gap={4} mt={4}>
              <Button
                variant="adminSecondary"
                w="45%"
                onClick={() =>
                  navigate(PRIVATE_PATHS.ADMIN_CUSTOMER_SUBSCRIPTIONS)
                }
              >
                Cancel
              </Button>
              <Button
                variant="adminPrimary"
                w="55%"
                isDisabled={isDisabled}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Box border="1px solid #E4E6E8" w="full" p={5} borderRadius="8px">
            <SimpleGrid templateColumns="1fr 1fr 1fr" gap={4} w="full">
              {plans?.data?.map((plan) => (
                <Flex
                  key={plan.id}
                  border="1px solid #E4E6E8"
                  borderRadius="8px"
                  justifyContent="space-between"
                  p={3}
                  alignItems="center"
                >
                  <Box>
                    <Text
                      color="#848688"
                      fontWeight={500}
                      mb={2}
                      fontSize="14px"
                    >
                      {plan.name}
                    </Text>

                    <Flex alignItems="end" gap={2} mb={1}>
                      <Text fontSize="10px">Price </Text>
                      <Text fontSize="12px" color="#848688" fontWeight={500}>
                        ₦{plan.amount?.toLocaleString()}
                      </Text>
                    </Flex>
                    <Flex alignItems="end" gap={2}>
                      <Text fontSize="10px">Duration </Text>
                      <Text fontSize="12px" color="#848688" fontWeight={500}>
                        {intervalOptions[plan.interval]}
                      </Text>
                    </Flex>
                  </Box>
                  <Button
                    variant="adminPrimary"
                    onClick={() => handlePlanSelection(plan)}
                  >
                    Select
                  </Button>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
