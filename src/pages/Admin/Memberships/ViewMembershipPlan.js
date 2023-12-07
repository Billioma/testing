import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import Select from "react-select";
import { customStyles } from "../../../components/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

import {
  useEditMembershipPlan,
  useGetAdminMembershipPlan,
} from "../../../services/admin/query/memberships";
import { IoIosArrowDown } from "react-icons/io";

export default function AddOperator() {
  const [state, setState] = useState({
    name: "",
    description: "",
    amount: "",
    interval: 0,
    isActive: 0,
    isCorporate: 0,
    isUpgradable: 0,
  });

  const { id } = useParams();

  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const { mutate, data, isLoading } = useGetAdminMembershipPlan();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditMembershipPlan(
    {
      onSuccess: () => {
        successToast("Membership plan updated successfully!");
        navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS);
        sessionStorage.removeItem("edit");
      },
      onError: (error) => {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "An Error occurred"
        );
      },
    }
  );

  const intervalOptions = [
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Quarterly",
    "Biannually",
    "Annually",
  ].map((interval, index) => ({ label: interval, value: index }));

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
        name: state?.name,
        description: state?.description,
        amount: Number(state?.amount),
        interval: state?.interval?.value,
        isActive: state?.isActive,
        isCorporate: state?.isCorporate,
        isUpgradable: state?.isUpgradable,
      },
    });
  };

  useEffect(() => {
    const selectedIntervalOption = intervalOptions?.find(
      (option) => option?.value === data?.interval
    );
    setState({
      ...state,
      name: data?.name,
      description: data?.description,
      amount: data?.amount,
      isActive: data?.isActive,
      interval: selectedIntervalOption,
      isCorporate: data?.isCorporate,
      isUpgradable: data?.isUpgradable,
    });
  }, [data]);

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
                    Plan Name
                  </Text>
                  <CustomInput
                    auth
                    value={state.name}
                    mb
                    holder="Enter plan name"
                    dis={edit ? false : true}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Plan Description
                  </Text>
                  <CustomInput
                    auth
                    value={state.description}
                    mb
                    holder="What is the plan for?"
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
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
                    Amount
                  </Text>
                  <CustomInput
                    auth
                    value={state.amount}
                    type="number"
                    mb
                    holder="Enter amount"
                    onChange={(e) =>
                      setState({ ...state, amount: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box mb="24px">
                  <Text
                    color="#444648"
                    lineHeight="100%"
                    fontSize="12px"
                    fontWeight={500}
                    mb="8px"
                  >
                    Select Interval
                  </Text>
                  <Select
                    styles={customStyles}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "interval",
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
                    options={intervalOptions}
                    value={state?.interval}
                    placeholder="Select interval"
                    isDisabled={edit ? false : true}
                  />
                </Box>

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                >
                  <Text fontSize="14px" fontWeight={500} color="#444648">
                    Activate plan
                  </Text>
                  <Switch
                    onChange={() =>
                      setState({
                        ...state,
                        isActive: state.isActive ? 0 : 1,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                    isChecked={state.isActive}
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                >
                  <Text fontSize="14px" fontWeight={500} color="#444648">
                    Set as Corporate Plan
                  </Text>
                  <Switch
                    onChange={() =>
                      setState({
                        ...state,
                        isCorporate: state.isCorporate ? 0 : 1,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                    isChecked={state.isCorporate}
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Flex
                  align="center"
                  justifyContent={"space-between"}
                  gap="15px"
                  mb="16px"
                >
                  <Text fontSize="14px" fontWeight={500} color="#444648">
                    Set as Upgradeable Plan
                  </Text>
                  <Switch
                    onChange={() =>
                      setState({
                        ...state,
                        isUpgradable: state.isUpgradable ? 0 : 1,
                      })
                    }
                    size="sm"
                    variant="adminPrimary"
                    isChecked={state.isUpgradable}
                    isDisabled={edit ? false : true}
                  />
                </Flex>

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : navigate(PRIVATE_PATHS.ADMIN_MEMBERSHIP_PLANS)
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
