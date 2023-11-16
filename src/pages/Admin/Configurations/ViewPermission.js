import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useEditPermission,
  useGetAdminPermission,
} from "../../../services/admin/query/configurations";

export default function ViewPermissions() {
  const isEdit = sessionStorage.getItem("edit");

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate, data, isLoading } = useGetAdminPermission();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditPermission({
    onSuccess: () => {
      successToast("Permission updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_PERMISSIONS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const [values, setValues] = useState({
    tableName: "",
    name: "",
    displayName: "",
  });

  useEffect(() => {
    setValues({
      ...values,
      name: data?.name,
      displayName: data?.displayName,
      tableName: data?.tableName,
    });
  }, [data]);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
        displayName: values?.displayName,
      },
    });
  };

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
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
                w={{ base: "100%", md: "30rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    mb
                    holder="Enter name"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Display Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.displayName}
                    mb
                    holder="Enter display name"
                    onChange={(e) =>
                      setValues({ ...values, displayName: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Group Name
                  </Text>
                  <CustomInput
                    auth
                    value={values?.tableName}
                    mb
                    holder="Enter group name"
                    onChange={(e) =>
                      setValues({ ...values, tableName: e.target.value })
                    }
                    dis={edit ? false : true}
                  />
                </Box>

                <Flex gap="24px" mt="24px">
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS),
                          sessionStorage.removeItem("edit"))
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
