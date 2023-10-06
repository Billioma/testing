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
  useAddMake,
  useGetMakes,
} from "../../../services/admin/query/configurations";

export default function ViewRole() {
  const [state, setState] = useState({
    status: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetMakes();
  const { mutate, isLoading } = useAddMake({
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

  const isFormValid = () => {
    return !state.name;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    mutate(state);
  };

  useEffect(() => {
    setState({
      ...location.state,
    });
    setIsEdit(location?.state?.isEdit);
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
                variant={!isEdit ? "adminDanger" : "adminSecondary"}
                w="45%"
                onClick={() =>
                  !isEdit
                    ? setIsOpen(true)
                    : navigate(PRIVATE_PATHS.ADMIN_CONFIG_FAQS)
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
              <CustomAccordionItem
                title="Permissions"
                items={[
                  "Browse Permissions",
                  "Read Permissions",
                  "Edit Permissions",
                  "Add Permissions",
                  "Delete Permissions",
                  "Generate Permissions",
                ]}
              />
              <CustomAccordionItem
                title="Roles"
                items={[
                  "Browse Roles",
                  "Read Roles",
                  "Edit Roles",
                  "Add Roles",
                  "Delete Roles",
                ]}
              />
              <CustomAccordionItem
                title="Users"
                items={[
                  "Browse Users",
                  "Read Users",
                  "Edit Users",
                  "Add Users",
                  "Delete Users",
                ]}
              />

              <CustomAccordionItem
                title="Operators"
                items={[
                  "Browse Operators",
                  "Read Operators",
                  "Edit Operators",
                  "Add Operators",
                  "Delete Operators",
                ]}
              />

              <CustomAccordionItem
                title="Clients"
                items={[
                  "Browse Clients",
                  "Read Clients",
                  "Edit Clients",
                  "Add Clients",
                  "Delete Clients",
                ]}
              />

              <CustomAccordionItem
                title="Attendants"
                items={[
                  "Browse Attendants",
                  "Read Attendants",
                  "Edit Attendants",
                  "Add Attendants",
                  "Delete Attendants",
                ]}
              />

              <CustomAccordionItem
                title="Customers"
                items={[
                  "Browse Customers",
                  "Read Customers",
                  "Edit Customers",
                  "Add Customers",
                  "Delete Customers",
                ]}
              />

              <CustomAccordionItem
                title="Vehicle-Makes"
                items={[
                  "Browse Vehicle-Makes",
                  "Read Vehicle-Makes",
                  "Edit Vehicle-Makes",
                  "Add Vehicle-Makes",
                  "Delete Vehicle-Makes",
                ]}
              />

              <CustomAccordionItem
                title="Vehicle-Models"
                items={[
                  "Browse Vehicle-Models",
                  "Read Vehicle-Models",
                  "Edit Vehicle-Models",
                  "Add Vehicle-Models",
                  "Delete Vehicle-Models",
                ]}
              />

              <CustomAccordionItem
                title="Vehicles"
                items={[
                  "Browse Vehicles",
                  "Read Vehicles",
                  "Edit Vehicles",
                  "Add Vehicles",
                  "Delete Vehicles",
                ]}
              />

              <CustomAccordionItem
                title="Zones"
                items={[
                  "Browse Zones",
                  "Read Zones",
                  "Edit Zones",
                  "Add Zones",
                  "Delete Zones",
                ]}
              />

              <CustomAccordionItem
                title="Locations"
                items={[
                  "Browse Locations",
                  "Read Locations",
                  "Edit Locations",
                  "Add Locations",
                  "Delete Locations",
                ]}
              />

              <CustomAccordionItem
                title="Payments"
                items={[
                  "Browse Payments",
                  "Read Payments",
                  "Edit Payments",
                  "Add Payments",
                  "Delete Payments",
                ]}
              />

              <CustomAccordionItem
                title="Amenities"
                items={[
                  "Browse Amenities",
                  "Read Amenities",
                  "Edit Amenities",
                  "Add Amenities",
                  "Delete Amenities",
                ]}
              />

              <CustomAccordionItem
                title="Bank Details"
                items={[
                  "Browse Bank Details",
                  "Read Bank Details",
                  "Edit Bank Details",
                  "Add Bank Details",
                  "Delete Bank Details",
                ]}
              />

              <CustomAccordionItem
                title="Client-Invoices"
                items={[
                  "Browse Client-Invoices",
                  "Read Client-Invoices",
                  "Edit Client-Invoices",
                  "Add Client-Invoices",
                  "Delete Client-Invoices",
                ]}
              />

              <CustomAccordionItem
                title="Event-Parkings"
                items={[
                  "Browse Event-Parkings",
                  "Read Event-Parkings",
                  "Edit Event-Parkings",
                  "Add Event-Parkings",
                  "Delete Event-Parkings",
                ]}
              />

              <CustomAccordionItem
                title="Events"
                items={[
                  "Browse Events",
                  "Read Events",
                  "Edit Events",
                  "Add Events",
                  "Delete Events",
                ]}
              />

              <CustomAccordionItem
                title="FAQs"
                items={[
                  "Browse FAQs",
                  "Read FAQs",
                  "Edit FAQs",
                  "Add FAQs",
                  "Delete FAQs",
                ]}
              />
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const CustomAccordionItem = ({ title, items }) => {
  return (
    <AccordionItem border={0} mt={4}>
      <AccordionButton _hover={{ bg: "transparent" }} p={0}>
        <Box as="span" flex="1" textAlign="left">
          <Text fontSize={12} fontWeight={500}>
            {title}
          </Text>
        </Box>
        <Flex gap={2}>
          <Checkbox colorScheme="orange" defaultChecked />
          <AccordionIcon />
        </Flex>
      </AccordionButton>

      <AccordionPanel pb={4} pl={3} gap={3} display={"flex"} flexDir={"column"}>
        {items.map((item, index) => (
          <Flex key={index} gap={3}>
            <Checkbox colorScheme="orange" defaultChecked />
            <Text fontSize={12} color="#646668">
              {item}
            </Text>
          </Flex>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};
