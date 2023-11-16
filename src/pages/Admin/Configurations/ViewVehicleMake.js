import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  useEditMake,
  useGetAdminVehicleMake,
} from "../../../services/admin/query/configurations";

export default function AddVehicleMake() {
  const [values, setValues] = useState({
    name: "",
  });
  const isEdit = sessionStorage.getItem("edit");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit !== null) {
      setEdit(true);
    }
  }, [isEdit]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditMake({
    onSuccess: () => {
      successToast("Make updated successfully!");
      sessionStorage.removeItem("edit");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { id } = useParams();
  const { mutate, data, isLoading } = useGetAdminVehicleMake();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  const handleSubmit = () => {
    updateMutate({
      query: id,
      body: {
        name: values?.name,
      },
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      name: data?.name,
    });
  }, [data]);

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
                    Vehicle Make
                  </Text>
                  <CustomInput
                    auth
                    value={values?.name}
                    dis={edit ? false : true}
                    mb
                    holder="Enter vehicle make"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </Box>

                <Flex gap={4} mt={4}>
                  <Button
                    variant="adminSecondary"
                    w="100%"
                    onClick={() =>
                      edit
                        ? setEdit(false)
                        : (navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES),
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
