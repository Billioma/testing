import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useAddMake } from "../../../services/admin/query/configurations";

export default function AddVehicleMake() {
  const [values, setValues] = useState({
    name: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useAddMake({
    onSuccess: () => {
      successToast("Make created successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    updateMutate({
      name: values?.name,
    });
  };

  const isDisabled = Object.values(values).some((value) => !value);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
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
                  Vehicle Make{" "}
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
                  holder="Enter vehicle make"
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  error={formSubmitted && !values?.name ? true : false}
                />
                {formSubmitted && !values?.name && (
                  <Text fontSize="10px" color="tomato">
                    Name is required
                  </Text>
                )}
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  variant="adminSecondary"
                  w="100%"
                  onClick={() => navigate(ADMIN_CONFIG_VEHICLE_MAKES)}
                >
                  Cancel
                </Button>
                <Button
                  variant="adminPrimary"
                  w="100%"
                  isLoading={isUpdating}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
