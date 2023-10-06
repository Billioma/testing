import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useAddMake,
  useGetMakes,
} from "../../../services/admin/query/configurations";

export default function AddRole() {
  const [state, setState] = useState({
    name: "",
    displayName: "",
    permissions: [],
  });

  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetMakes();
  const { mutate, isLoading } = useAddMake({
    onSuccess: () => {
      successToast("Make added successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const isFormValid = () => {
    return !state.name;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  const generateAccordionItems = (
    title,
    startNumber = 0,
    extras = [],
    custom = false
  ) => {
    const items = [];

    if (!custom) {
      items.push(
        { label: `Browse ${title}`, id: startNumber },
        { label: `Read ${title}`, id: startNumber + 1 },
        { label: `Edit ${title}`, id: startNumber + 2 },
        { label: `Add ${title}`, id: startNumber + 3 },
        { label: `Delete ${title}`, id: startNumber + 4 }
      );
    }

    if (extras)
      extras.map((extra, index) =>
        items.push({
          label: `${extra} ${title}`,
          id: startNumber + index + (custom ? 0 : 5),
        })
      );

    return (
      <CustomAccordionItem
        title={title}
        items={items}
        setState={setState}
        state={state}
      />
    );
  };

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />

        <Flex gap={6}>
          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            justifyContent="center"
            w="30rem"
            flexDir="column"
            border="1px solid #E4E6E8"
            h="fit-content"
          >
            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Name
              </Text>
              <CustomInput
                auth
                value={state.name}
                mb
                holder="Enter role name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </Box>

            <Box w="full" mb={4}>
              <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                Display Name
              </Text>

              <CustomInput
                auth
                value={state.displayName}
                mb
                holder="Enter display name"
                onChange={(e) =>
                  setState({ ...state, displayName: e.target.value })
                }
              />
            </Box>

            <Flex gap={4} mt={4}>
              <Button
                variant="adminSecondary"
                w="45%"
                onClick={() => navigate(PRIVATE_PATHS.ADMIN_CONFIG_ROLES)}
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

          <Flex
            bg="#fff"
            borderRadius="16px"
            py="24px"
            px="28px"
            w="30rem"
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <Accordion p={0} allowToggle>
              {generateAccordionItems("Permissions", 0, ["Generate"])}
              {generateAccordionItems("Roles", 6)}
              {generateAccordionItems("Users", 11)}
              {generateAccordionItems("Operators", 16)}
              {generateAccordionItems("Clients", 21, [
                "Fund",
                "Export",
                "View_user",
                "Attach_user",
                "Detach_user",
              ])}
              {generateAccordionItems("Attendants", 31)}
              {generateAccordionItems("Customers", 36, ["Fund", "Export"])}
              {generateAccordionItems("Vehicle-Makes", 43)}
              {generateAccordionItems("Vehicle-Models", 48)}
              {generateAccordionItems("Vehicles", 53, ["Export"])}
              {generateAccordionItems("Zones", 59, ["Export"])}
              {generateAccordionItems("Locations", 65, ["Export"])}
              {generateAccordionItems(
                "Payments",
                71,
                ["Browse", "Export"],
                true
              )}
              {generateAccordionItems("Amenities", 73)}
              {generateAccordionItems("Bank Details", 78)}
              {generateAccordionItems("Client-Invoices", 83, [
                "Update_payment",
                "Send",
                "Export",
              ])}
              {generateAccordionItems("Stats", 91, ["Browse"], true)}
              {generateAccordionItems("Event Parkings", 92, ["Cancel"])}
              {generateAccordionItems("Events", 98, ["Cancel"])}
              {generateAccordionItems("Faqs", 104)}
              {generateAccordionItems("Membership Plans", 109, ["Restore"])}
              {generateAccordionItems("Membership Plans Features", 115)}
              {generateAccordionItems("Membership Subscriptions", 120, [
                "Cancel",
                "Renew",
                "Export",
              ])}
              {generateAccordionItems("Pay-to-Park", 128)}
              {generateAccordionItems("Policies", 133)}
              {generateAccordionItems("Rates", 135)}
              {generateAccordionItems("Reservations", 140, [
                "Cancel",
                "Request",
              ])}

              {generateAccordionItems("Service Bookings", 147, [
                "Cancel",
                "Operations",
              ])}

              {generateAccordionItems("Service Log", 154, [
                "Export",
                "Retrieve",
              ])}

              {generateAccordionItems("Services", 166)}
              {generateAccordionItems(
                "Transactions",
                91,
                ["Browse", "Read", "Refund"],
                true
              )}

              {generateAccordionItems("Corporate Subscription", 169, [
                "Cancel",
                "Renew",
                "Export",
                "Attach User",
                "Detach User",
              ])}
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const CustomAccordionItem = ({ title, items, setState, state }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (e) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    // Update the checked state of all other checkboxes based on selectAll
    const updatedItems = items.map((item) => ({
      ...item,
      isChecked: isChecked,
    }));

    // Log the selected items
    console.log(updatedItems);
  };

  const handleChange = (id, action) => {
    const temp = [...state.permissions];
    if (action) {
      temp.push(id);
    } else {
      const index = temp.findIndex((el) => el === id);
      temp.splice(index, 1);
    }

    setState({ ...state, permissions: temp });
  };

  console.log(state);

  return (
    <AccordionItem border={0} mt={4}>
      <Flex align={"center"} p={0}>
        <AccordionButton as="span" flex="1" textAlign="left">
          <Text fontSize={12} fontWeight={500}>
            {title}
          </Text>
        </AccordionButton>
        <Flex gap={2}>
          <Checkbox colorScheme="orange" onClick={handleSelectAllChange} />
          <AccordionIcon onClick={(e) => e.stopPropagation()} />
        </Flex>
      </Flex>

      <AccordionPanel pb={4} pl={3} gap={3} display={"flex"} flexDir={"column"}>
        {items.map((item, index) => (
          <Flex key={index} gap={3}>
            <Checkbox
              colorScheme="orange"
              isChecked={state.permissions?.includes(item.id) || selectAll}
              onChange={(e) => {
                console.log(e.target.checked, item.id);
                handleChange(item.id, e.target.checked);
              }}
            />
            <Text fontSize={12} color="#646668">
              {item?.label}
            </Text>
          </Flex>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};
