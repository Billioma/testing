import React, { useState } from "react";
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
  useAddRole,
  useGetPermissions,
} from "../../../services/admin/query/configurations";

export default function ViewRole() {
  const [values, setValues] = useState({
    name: "",
    displayName: "",
    permissions: [],
  });

  const navigate = useNavigate();

  const { data: permissionList } = useGetPermissions({}, 1, 2000);

  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useAddRole({
    onSuccess: () => {
      successToast("Role created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_ROLES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const main = permissionList?.data;

  const handleSubmit = () => {
    updateMutate({
      name: values?.name,
      displayName: values?.displayName,
      permissions: values?.permissions?.map((item) => item),
    });
  };

  const removeSpecialCharacters = (str) => {
    return str.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, " ");
  };

  function groupByTableName(array) {
    return Object.values(
      array?.reduce((acc, item) => {
        const key = item?.tableName;
        acc[key] = acc[key] || [];
        acc[key]?.push(item);
        return acc;
      }, {})
    );
  }
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (group) => {
    const groupPermissionIds = group?.map((permi) => Number(permi?.id));

    const allSelected = groupPermissionIds.every((id) =>
      values?.permissions?.includes(id)
    );

    const updatedPermissions = allSelected
      ? values?.permissions?.filter((id) => !groupPermissionIds?.includes(id))
      : [...values?.permissions, ...groupPermissionIds];

    setValues((prevValues) => ({
      ...prevValues,
      permissions: updatedPermissions,
    }));
  };

  const handleChange = (id, isChecked) => {
    const temp = [...values?.permissions];
    if (isChecked) {
      temp?.push(Number(id));
    } else {
      setSelectAll(false);
      const index = temp?.findIndex((el) => el === Number(id));
      temp?.splice(index, 1);
    }

    setValues({ ...values, permissions: temp });
  };

  const isDisabled = Object.values(values).some((value) => !value);

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

        <Flex
          justifyContent="center"
          w="100%"
          flexDir={{ md: "row", base: "column" }}
          gap="30px"
        >
          <Flex
            bg="#fff"
            borderRadius="8px"
            py="32px"
            px="24px"
            justifyContent="center"
            w={{
              base: "100%",
              md: "80%",
            }}
            h="fit-content"
            flexDir="column"
            border="1px solid #E4E6E8"
          >
            <form
              onSubmit={(e) => {
                isDisabled
                  ? setFormSubmitted(true)
                  : (setFormSubmitted(true), handleSubmit(e));
                e.preventDefault();
              }}
            >
              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Name{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "13px",
                    }}
                  >
                    *
                  </span>
                </Text>
                <CustomInput
                  auth
                  value={values?.name}
                  mb
                  holder="Enter role name"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  error={formSubmitted && !values?.name ? true : false}
                />

                {formSubmitted && !values?.name && (
                  <Text mt="-3px" fontSize="10px" color="tomato">
                    Name is required
                  </Text>
                )}
              </Box>

              <Box w="full" mb={4}>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Display Name{" "}
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "13px",
                    }}
                  >
                    *
                  </span>
                </Text>

                <CustomInput
                  auth
                  value={values?.displayName}
                  mb
                  error={formSubmitted && !values?.displayName ? true : false}
                  holder="Enter display name"
                  onChange={(e) =>
                    setValues({ ...values, displayName: e.target.value })
                  }
                />
                {formSubmitted && !values?.displayName && (
                  <Text mt="-3px" fontSize="10px" color="tomato">
                    Display Name is required
                  </Text>
                )}
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  variant="adminSecondary"
                  w="100%"
                  onClick={() => navigate(PRIVATE_PATHS.ADMIN_CONFIG_ROLES)}
                >
                  Cancel
                </Button>
                <Button
                  variant="adminPrimary"
                  w="100%"
                  type="submit"
                  isLoading={isUpdating}
                >
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>

          <Flex flexDir={"column"} w="100%">
            <Flex
              bg="#fff"
              borderRadius="8px"
              py="24px"
              px="28px"
              justifyContent="center"
              flexDir="column"
              border="1px solid #E4E6E8"
              h="fit-content"
            >
              <Accordion p={0} allowToggle>
                {main?.length
                  ? groupByTableName(main)?.map((group, i) => (
                      <AccordionItem border={0} mt={4} key={i}>
                        <Flex align={"center"} p={0}>
                          <AccordionButton
                            as="span"
                            flex="1"
                            textAlign="left"
                            cursor="pointer"
                            _hover={{ bg: "transparent" }}
                          >
                            <Text
                              fontSize={12}
                              fontWeight={500}
                              textTransform="capitalize"
                            >
                              {removeSpecialCharacters(group[0]?.tableName)}{" "}
                            </Text>
                          </AccordionButton>
                          <Flex gap={2}>
                            <Checkbox
                              colorScheme="orange"
                              onChange={() => handleSelectAll(group)}
                              isChecked={
                                selectAll ||
                                group?.every((permi) =>
                                  values?.permissions?.includes(
                                    Number(permi?.id)
                                  )
                                )
                              }
                            />
                            <AccordionButton
                              w="fit-content"
                              p={0}
                              _hover={{ bg: "transparent" }}
                            >
                              <AccordionIcon />
                            </AccordionButton>
                          </Flex>
                        </Flex>

                        <AccordionPanel
                          pb={4}
                          pl={3}
                          gap={3}
                          display={"flex"}
                          flexDir={"column"}
                        >
                          {group?.map((permi) => (
                            <Flex key={permi.id} gap={3}>
                              <Checkbox
                                colorScheme="orange"
                                isChecked={values?.permissions?.includes(
                                  Number(permi?.id)
                                )}
                                onChange={(e) => {
                                  handleChange(permi?.id, e.target.checked);
                                }}
                              />
                              <Text
                                fontSize={12}
                                color="#646668"
                                textTransform="capitalize"
                              >
                                {removeSpecialCharacters(permi?.name)}
                              </Text>
                            </Flex>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    ))
                  : ""}
              </Accordion>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
