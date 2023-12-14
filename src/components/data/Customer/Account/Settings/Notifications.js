import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Spinner, Switch, Text } from "@chakra-ui/react";
import {
  useCustomerUpdatePreference,
  useGetPreference,
} from "../../../../../services/customer/query/user";
import useCustomToast from "../../../../../utils/notifications";

const Notifications = () => {
  const { data, isLoading, refetch } = useGetPreference();
  const [values, setValues] = useState({
    emailNoti: false,
    smsNoti: false,
    alertNoti: false,
  });

  useEffect(() => {
    if (data) {
      setValues({
        ...values,
        emailNoti: data?.emailNotifications?.enabled,
        smsNoti: data?.smsNotifications?.enabled,
        alertNoti: data?.alertNotifications?.enabled,
      });
    }
  }, [data]);

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isUpdating } = useCustomerUpdatePreference({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      alertNotifications: values.alertNoti,
      emailNotifications: values.emailNoti,
      smsNotifications: values.smsNoti,
    });
  };

  return (
    <Box>
      <Flex mb="16px" align="center" justifyContent="space-between" w="full">
        <Text color="#646668" fontSize="14px" lineHeight="100%">
          Alert Notifications
        </Text>

        {isLoading ? (
          <Spinner color="red" />
        ) : (
          <Switch
            isChecked={values?.alertNoti}
            onChange={() =>
              setValues({ ...values, alertNoti: !values.alertNoti })
            }
            size="sm"
            colorScheme="green"
          />
        )}
      </Flex>

      <Flex mb="16px" align="center" justifyContent="space-between" w="full">
        <Text color="#646668" fontSize="14px" lineHeight="100%">
          E-mail Notifications
        </Text>

        {isLoading ? (
          <Spinner color="red" />
        ) : (
          <Switch
            isChecked={values?.emailNoti}
            onChange={() =>
              setValues({ ...values, emailNoti: !values.emailNoti })
            }
            size="sm"
            colorScheme="green"
          />
        )}
      </Flex>

      <Flex mb="16px" align="center" justifyContent="space-between" w="full">
        <Text color="#646668" fontSize="14px" lineHeight="100%">
          SMS Notifications
        </Text>

        {isLoading ? (
          <Spinner color="red" />
        ) : (
          <Switch
            isChecked={values?.smsNoti}
            onChange={() => setValues({ ...values, smsNoti: !values.smsNoti })}
            size="sm"
            colorScheme="green"
          />
        )}
      </Flex>

      <Button
        onClick={handleSubmit}
        isLoading={isUpdating}
        mt="40px"
        py="17px"
        w="full"
        color="#fff"
        lineHeight="100%"
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default Notifications;
