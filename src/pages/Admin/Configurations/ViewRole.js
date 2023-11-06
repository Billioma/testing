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
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useDeleteRole,
  useEditRole,
  useGetRoles,
} from "../../../services/admin/query/configurations";
import AdminDeleteModal from "../../../components/modals/AdminDeleteModal";

export default function ViewRole() {
  const [state, setState] = useState({
    name: "",
    displayName: "",
    permissions: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetRoles();
  const { mutate, isLoading } = useEditRole({
    onSuccess: () => {
      successToast("Role updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_ROLES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: deleteRole, isLoading: isDeleting } = useDeleteRole({
    onSuccess: (res) => {
      successToast(res?.message);
      setIsOpen(false);
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_ROLES);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
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
        isEdit={isEdit}
      />
    );
  };

  useEffect(() => {
    const { id, name, displayName, permissions } = location.state;

    setState({
      id,
      name,
      displayName,
      permissions: permissions.map((permission) => parseInt(permission.id)),
    });
  }, [location.state]);

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
                isDisabled={!isEdit}
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
                isDisabled={!isEdit}
              />
            </Box>

            <Flex gap={4} mt={4}>
              <Button
                variant={!isEdit ? "adminDanger" : "adminSecondary"}
                w="45%"
                onClick={() =>
                  !isEdit
                    ? setIsOpen(true)
                    : navigate(PRIVATE_PATHS.ADMIN_CONFIG_ROLES)
                }
              >
                {!isEdit ? "Delete" : "Cancel"}
              </Button>
              <Button
                variant="adminPrimary"
                w="55%"
                isDisabled={isEdit && isDisabled}
                isLoading={isLoading}
                onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
              >
                {!isEdit ? "Edit" : "Save"}
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

      <AdminDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Role"
        subTitle="Are you sure you want to delete this role?"
        handleSubmit={() => deleteRole(state.id)}
        isLoading={isDeleting}
      />
    </Box>
  );
}

const CustomAccordionItem = ({ title, items, setState, state, isEdit }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      let tempPermission = state.permissions;

      items.map((item) => tempPermission.push(item.id));

      tempPermission = [...new Set(tempPermission)];

      setState({ ...state, permissions: tempPermission });
    }
  };

  const handleChange = (id, isChecked) => {
    const temp = [...state.permissions];
    if (isChecked) {
      temp.push(id);
    } else {
      setSelectAll(false);
      const index = temp.findIndex((el) => el === id);
      temp.splice(index, 1);
    }

    setState({ ...state, permissions: temp });
  };

  return (
    <AccordionItem border={0} mt={4}>
      <Flex align={"center"} p={0}>
        <AccordionButton
          as="span"
          flex="1"
          textAlign="left"
          cursor="pointer"
          _hover={{ bg: "transparent" }}
        >
          <Text fontSize={12} fontWeight={500}>
            {title}
          </Text>
        </AccordionButton>
        <Flex gap={2}>
          <Checkbox
            colorScheme="orange"
            onChange={handleSelectAllChange}
            isChecked={selectAll}
            isDisabled={!isEdit}
          />
          <AccordionButton w="fit-content" p={0} _hover={{ bg: "transparent" }}>
            <AccordionIcon />
          </AccordionButton>
        </Flex>
      </Flex>

      <AccordionPanel pb={4} pl={3} gap={3} display={"flex"} flexDir={"column"}>
        {items.map((item, index) => (
          <Flex key={index} gap={3}>
            <Checkbox
              colorScheme="orange"
              isChecked={state.permissions?.includes(item.id) || selectAll}
              isDisabled={!isEdit}
              onChange={(e) => {
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
