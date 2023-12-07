import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useEditMembershipFeature,
  useGetAdminMembershipPlanFeature,
  useGetMembershipPlans,
} from "../../../services/admin/query/memberships";
import { IoIosArrowDown } from "react-icons/io";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    value: "",
    featureType: null,
    membershipPlan: "",
  });
  const { id } = useParams();

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const { mutate, data, isLoading } = useGetAdminMembershipPlanFeature();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const { mutate: updateMutate, isLoading: isUpdating } =
    useEditMembershipFeature({
      onSuccess: () => {
        successToast("Membership feature updated successfully!");
        sessionStorage.removeItem("edit");
        navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES);
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    });

  const { data: membershipPlans } = useGetMembershipPlans({}, 1, 100000);

  const membershipPlanOptions = membershipPlans?.data?.map((plan) => ({
    label: plan.name,
    value: parseInt(plan.id),
  }));

  const featureTypes = [
    "Vehicle Limit",
    "Parking Limit",
    "Valet Limit",
    "Location Limit",
    "Car Service Limit",
    "Applicable Locations",
    "User Limit",
  ].map((feature, index) => ({ label: feature, value: index }));

  const handleSelectChange = (selectedOption, { name }) => {
    setState({
      ...state,
      [name]: selectedOption,
    });
  };

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        featureType: state?.featureType?.value,
        membershipPlan: state?.membershipPlan?.value,
        name: state?.name,
        value: state?.value,
        status: 1,
      },
    });
  };

  useEffect(() => {
    const selectedPlanOption = membershipPlanOptions?.find(
      (option) => option?.value === Number(data?.membershipPlan?.id)
    );
    const selectedFeatureOption = featureTypes?.find(
      (option) => option?.value === Number(data?.featureType)
    );
    setState({
      ...state,
      membershipPlan: selectedPlanOption,
      featureType: selectedFeatureOption,
      name: data?.name,
      value: Number(data?.value),
    });
  }, [data, membershipPlans]);

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
                    Select Membership Plan
                  </Text>
                  <Select
                    styles={customStyles}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "membershipPlan",
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
                    options={membershipPlanOptions}
                    placeholder="Select membership plan"
                    value={state?.membershipPlan}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Name
                  </Text>
                  <CustomInput
                    auth
                    value={state.name}
                    mb
                    holder="Enter name of feature"
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Feature Type
                  </Text>
                  <Select
                    styles={customStyles}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "featureType",
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
                    options={featureTypes}
                    placeholder="Select feature type"
                    value={state?.featureType}
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Value Limit
                  </Text>
                  <CustomInput
                    auth
                    mb
                    type="number"
                    holder="Enter limit"
                    onChange={(e) =>
                      setState({ ...state, value: e.target.value })
                    }
                    value={state.value}
                    dis={edit ? false : true}
                  />
                </Box>

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_FEATURES)
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
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
