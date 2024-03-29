import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Switch,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import Select from "react-select";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
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
import { useGetVehicles } from "../../../services/admin/query/vehicles";

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

  const convertedFilters = `filter=customer.id||${"cont"}||"${
    state?.customer
  }"`;

  const { data: customers } = useGetAllCustomers();
  const { data: locations } = useGetAllLocations();
  const { data: vehicles, isLoading: isVehicle } = useGetVehicles(
    {},
    1,
    1000,
    convertedFilters
  );
  const customerOptions = customers?.data?.map((customer) => ({
    label: `${customer?.profile?.firstName} ${customer?.profile?.lastName}`,
    value: customer?.id,
  }));

  const locationToMap = locations?.data?.filter(
    (item) => item?.isSubApplicable
  );

  const locationOptions = locationToMap?.map((location) => ({
    label: location?.name,
    value: parseInt(location?.id),
  }));
  const vehicleOptions =
    state.customer === 0
      ? []
      : vehicles?.data?.map((car) => ({
          label: `${car?.licensePlate} - ${car?.make?.name} ${car?.model?.name}`,
          value: parseInt(car?.id),
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

  const { data: plans, isLoading: isPlanning } = useGetMembershipPlans(
    {},
    1,
    100000
  );

  const handleSelectChange = (selectedOption, { name }) => {
    if (name === "customer") {
      setState({
        ...state,
        [name]: selectedOption,
      });
      return;
    }

    let temp = state?.subscriptionOptions;
    let tempTypeIndex = temp?.findIndex((feature) => feature.type === name);

    if (tempTypeIndex !== -1) {
      const objectsWithSameType = temp.filter(
        (feature) => feature.type === name
      );

      if (name === "vehicle" || name === "location") {
        const newData = Array.isArray(selectedOption)
          ? selectedOption.map((dat) => dat?.value)
          : selectedOption
          ? [selectedOption.value]
          : [];

        objectsWithSameType.forEach((obj) => {
          obj.data = [...new Set(newData)];
        });
      }

      setState({ ...state, subscriptionOptions: [...temp] });
    } else {
      const newEntry = {
        type: name,
        data:
          (name === "vehicle" || name === "location") &&
          (Array.isArray(selectedOption)
            ? selectedOption.map((dat) => dat?.value)
            : selectedOption
            ? [selectedOption.value]
            : []),
      };

      setState({
        ...state,
        subscriptionOptions: [...temp, newEntry],
      });
    }
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

  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <Box minH="75vh">
      {" "}
      {!state?.membershipPlan ? (
        <>
          <Box w="fit-content">
            <GoBackTab />
          </Box>

          {isPlanning ? (
            <Box border="1px solid #E4E6E8" w="full" p={5} borderRadius="8px">
              <SimpleGrid templateColumns="1fr 1fr 1fr" gap={4} w="full">
                <Skeleton h="150px" borderRadius="8px"></Skeleton>
                <Skeleton h="150px" borderRadius="8px"></Skeleton>
                <Skeleton h="150px" borderRadius="8px"></Skeleton>
                <Skeleton h="150px" borderRadius="8px"></Skeleton>
                <Skeleton h="150px" borderRadius="8px"></Skeleton>
                <Skeleton h="150px" borderRadius="8px"></Skeleton>
              </SimpleGrid>
            </Box>
          ) : (
            ""
          )}
        </>
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
            fontWeight="500"
            lineHeight="100%"
            cursor="pointer"
            gap="8px"
            onClick={() => {
              setState({
                ...state,
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
              setFormSubmitted(false);
              setFeatureTypes([]);
            }}
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
              <Text color="#fff" fontWeight={500}>
                {
                  plans?.data?.find((plan) => plan.id === state?.membershipPlan)
                    ?.name
                }
              </Text>

              <Flex justifyContent="space-between" mt={3}>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="12px" color="#fff">
                    Price{" "}
                  </Text>
                  <Text fontSize="14px" color="#848688" fontWeight={500}>
                    ₦
                    {plans?.data
                      ?.find((plan) => plan.id === state?.membershipPlan)
                      ?.amount?.toLocaleString()}
                  </Text>
                </Flex>
                <Flex alignItems="end" gap={2} mb={1}>
                  <Text fontSize="12px" color="#fff">
                    Duration{" "}
                  </Text>
                  <Text fontSize="14px" color="#848688" fontWeight={500}>
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

            <form
              onSubmit={(e) => {
                (featureTypes?.length &&
                  (featureTypes?.find((type) => type["vehicle"]) !==
                    undefined ||
                    featureTypes?.find((type) => type["location"]) !==
                      undefined) &&
                  !state?.subscriptionOptions[0]?.data?.length) ||
                !state?.customer
                  ? setFormSubmitted(true)
                  : (setFormSubmitted(true), handleSubmit(e));
                e.preventDefault();
              }}
            >
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
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
                  styles={
                    formSubmitted && !state?.customer
                      ? errorCustomStyles
                      : customStyles
                  }
                  onChange={({ value }) =>
                    handleSelectChange(value, { name: "customer" })
                  }
                  options={customerOptions}
                  placeholder="Select customer"
                />
                {formSubmitted && !state?.customer && (
                  <Text mt="5px" fontSize="12px" color="tomato">
                    Customer is required
                  </Text>
                )}
              </Box>

              {isVehicle ? (
                <Flex justifyContent="center">
                  <Spinner mb={4} />
                </Flex>
              ) : (
                state?.customer !== 0 &&
                featureTypes?.find((type) => type["vehicle"]) && (
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      {featureTypes?.find((type) => type["vehicle"])?.vehicle >
                      1
                        ? `Select up to ${
                            featureTypes?.find((type) => type["vehicle"])
                              ?.vehicle
                          } vehicles`
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
                      isOptionDisabled={() =>
                        state.subscriptionOptions?.find(
                          (item) => item?.type === "vehicle"
                        )?.data?.length ===
                        featureTypes?.find((type) => type["vehicle"])?.vehicle
                          ? true
                          : false
                      }
                      styles={
                        featureTypes?.length &&
                        featureTypes?.find((type) => type["vehicle"]) &&
                        formSubmitted &&
                        !state?.subscriptionOptions?.find(
                          (item) => item?.type === "vehicle"
                        )?.data?.length
                          ? errorCustomStyles
                          : customStyles
                      }
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "vehicle",
                        })
                      }
                      isMulti={
                        featureTypes?.find((type) => type["vehicle"])?.vehicle >
                        1
                      }
                      options={vehicleOptions}
                      placeholder="Select vehicles"
                    />
                    {formSubmitted &&
                      featureTypes?.find((type) => type["vehicle"]) &&
                      !state?.subscriptionOptions?.find(
                        (item) => item?.type === "vehicle"
                      )?.data?.length && (
                        <Text mt="5px" fontSize="12px" color="tomato">
                          Select at least one vehicle
                        </Text>
                      )}
                  </Box>
                )
              )}
              {state?.customer !== 0 &&
                featureTypes?.find((type) => type["location"]) && (
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      {featureTypes?.find((type) => type["location"])
                        ?.location > 1
                        ? `Select up to ${
                            featureTypes?.find((type) => type["location"])
                              ?.location
                          } locations`
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
                      isOptionDisabled={() =>
                        state.subscriptionOptions?.find(
                          (item) => item?.type === "location"
                        )?.data?.length ===
                        featureTypes?.find((type) => type["location"])?.location
                          ? true
                          : false
                      }
                      styles={
                        featureTypes?.length &&
                        featureTypes?.find((type) => type["location"]) &&
                        formSubmitted &&
                        !state?.subscriptionOptions?.find(
                          (item) => item?.type === "location"
                        )?.data?.length
                          ? errorCustomStyles
                          : customStyles
                      }
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "location",
                        })
                      }
                      isMulti={
                        featureTypes?.find((type) => type["location"])
                          ?.location > 1
                      }
                      options={locationOptions}
                      placeholder="Select location"
                    />
                    {formSubmitted &&
                      featureTypes?.find((type) => type["location"]) &&
                      !state?.subscriptionOptions?.find(
                        (item) => item?.type === "location"
                      )?.data?.length && (
                        <Text mt="5px" fontSize="12px" color="tomato">
                          Select at least one location
                        </Text>
                      )}
                  </Box>
                )}

              <Flex
                align="center"
                justifyContent={"space-between"}
                gap="15px"
                mb="16px"
              >
                <Text fontSize="14px" fontWeight={500} color="#444648">
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
                  isLoading={isLoading}
                  isDisabled={isVehicle}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>
        ) : (
          <Box
            border="1px solid #E4E6E8"
            display={isPlanning ? "none" : "flex"}
            w="full"
            p={5}
            borderRadius="8px"
          >
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
                    <Text color="#848688" fontWeight={500} mb={2}>
                      {plan.name}
                    </Text>

                    <Flex alignItems="end" gap={2} mb={1}>
                      <Text fontSize="12px">Price </Text>
                      <Text fontSize="14px" color="#848688" fontWeight={500}>
                        ₦{plan.amount?.toLocaleString()}
                      </Text>
                    </Flex>
                    <Flex alignItems="end" gap={2}>
                      <Text fontSize="12px">Duration </Text>
                      <Text fontSize="14px" color="#848688" fontWeight={500}>
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
