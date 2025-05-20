import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { Button, Flex, Text } from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import { getNumber } from "../../utils/helpers";
import { useEditSales } from "../../services/admin/query/audit";
import useCustomToast from "../../utils/notifications";
import { useParams } from "react-router-dom";

const Layout = ({ title, value, onChange, name }) => {
  return (
    <Flex flexDir="column" mb="20px">
      <Text
        textTransform="uppercase"
        color="#999999"
        fontSize="10px"
        mb="8px"
        fontWeight={700}
      >
        {title}
      </Text>
      <CustomInput
        mb
        value={value}
        name={name}
        onChange={onChange}
        textAlign="end"
        color="#090C02"
        fontSize="12px"
        fontWeight={500}
      />
    </Flex>
  );
};

const EditSales = ({ isOpen, onClose, data, refetch, refetchTrans }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (data) {
      setValues({
        cashPayment: Number(data?.cashPayment)?.toLocaleString(),
        bankTransfer: Number(data?.bankTransfer)?.toLocaleString(),
        posPayment: Number(data?.posPayment)?.toLocaleString(),
        tips: Number(data?.tips)?.toLocaleString(),
        totalRevenueCollected: Number(
          data?.totalRevenueCollected
        )?.toLocaleString(),
        totalCarsParked: data.totalCarsParked || "",
        remarks: data.remarks || "",
      });
    }
  }, [data]);

  const updateTextView = (event) => {
    const { name, value } = event.target;
    const num = getNumber(value);
    if (num === 0) {
      setValues({
        ...values,
        [name]: "",
      });
    } else {
      setValues({
        ...values,
        [name]: num.toLocaleString(),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isEdit } = useEditSales({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      refetchTrans();
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const { locationId, managerId } = useParams();
  const handleSubmit = () => {
    const sanitizeAmount = (value) => Number(String(value).replace(/,/g, ""));

    mutate({
      query: data?.id,
      body: {
        location: Number(locationId),
        manager: Number(managerId),
        cashPayment: sanitizeAmount(values.cashPayment),
        bankTransfer: sanitizeAmount(values.bankTransfer),
        posPayment: sanitizeAmount(values.posPayment),
        tips: sanitizeAmount(values.tips),
        totalRevenueCollected: sanitizeAmount(values.totalRevenueCollected),
        totalCarsParked: Number(values.totalCarsParked),
        remarks: values.remarks,
      },
    });
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Layout
        name="cashPayment"
        title="cash"
        value={values.cashPayment}
        onChange={updateTextView}
      />
      <Layout
        name="bankTransfer"
        title="transfer"
        value={values.bankTransfer}
        onChange={updateTextView}
      />
      <Layout
        name="posPayment"
        title="pos"
        value={values.posPayment}
        onChange={updateTextView}
      />
      <Layout
        name="tips"
        title="tips"
        value={values.tips}
        onChange={updateTextView}
      />
      <Layout
        name="totalRevenueCollected"
        title="total revenue"
        value={values.totalRevenueCollected}
        onChange={updateTextView}
      />
      <Layout
        name="totalCarsParked"
        title="cars parked"
        value={values.totalCarsParked}
        onChange={handleChange}
      />
      <Layout
        name="remarks"
        title="remarks"
        value={values.remarks}
        onChange={handleChange}
      />

      <Button
        fontSize="14px"
        fontWeight={500}
        onClick={handleSubmit}
        isLoading={isEdit}
        lineHeight="100%"
        w="full"
        py="17px"
      >
        Save
      </Button>
    </ModalLayout>
  );
};

export default EditSales;
