import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import Switch from "react-switch";
import { staffDetailsTab } from "../../../components/common/constants";
import GeneralInfo from "../../../components/data/Admin/StaffProfile/GeneralInfo";
import {
  useActivateStaff,
  useEditStaff,
  useGetStaff,
} from "../../../services/admin/query/staff";
import { useParams } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import EmployeeDocuments from "../../../components/data/Admin/StaffProfile/EmployeeDocuments";
import Schedule from "../../../components/data/Admin/StaffProfile/Schedule";
import LoanHistory from "../../../components/data/Admin/StaffProfile/LoanHistory";
import LeaveHistory from "../../../components/data/Admin/StaffProfile/LeaveHistory";
import MedAssist from "../../../components/data/Admin/StaffProfile/MedAssist";

const StaffProfileDetails = () => {
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("General Information");

  const { id } = useParams();
  const { data, refetch, isLoading } = useGetStaff(id, {
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    refetch();
  }, []);

  const { successToast, errorToast } = useCustomToast();
  const { mutate: updateMutate, isLoading: isUpdating } = useEditStaff({
    onSuccess: () => {
      successToast("Status updated successfully!");
      refetch();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  const { mutate: activateMutate, isLoading: isActivating } = useActivateStaff({
    onSuccess: () => {
      successToast("Status activated successfully!");
      refetch();
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred",
      );
    },
  });

  useEffect(() => {
    if (data?.status === "ACTIVE") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [data]);

  return (
    <Box>
      <GoBackTab />
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Box my="24px">
            <Flex
              bg="#fff"
              borderRadius="8px"
              py="32px"
              px="24px"
              justifyContent="center"
              w="full"
              flexDir="column"
              border="1px solid #E4E6E8"
            >
              <Flex align="center" justifyContent="space-between">
                <Box fontWeight={500}>
                  <Text
                    color="#090c02"
                    textTransform="capitalize"
                    fontSize="18px"
                  >
                    {data?.fullName}
                  </Text>
                  <Text color="#949698" fontSize="13px">
                    ID: {data?.staffId}
                  </Text>
                </Box>
                {isUpdating || isActivating ? (
                  <Flex
                    rounded="full"
                    border="1px solid #949698"
                    w="90px"
                    h="35px"
                    justifyContent="center"
                    align="center"
                  >
                    <Spinner size="sm" />
                  </Flex>
                ) : (
                  <Switch
                    checked={checked}
                    onChange={(e) =>
                      isUpdating || isActivating
                        ? ""
                        : checked
                          ? (setChecked(!checked),
                            updateMutate({
                              query: id,
                              body: {
                                status: e ? "ACTIVE" : "INACTIVE",
                              },
                            }))
                          : activateMutate(id)
                    }
                    handleDiameter={15}
                    offColor="#EE383A"
                    onColor="#0B841D"
                    offHandleColor="#fff"
                    onHandleColor="#fff"
                    height={40}
                    width={95}
                    borderRadius={100}
                    uncheckedIcon={
                      <Text pt="10px" fontSize="15px" w="full" color="#fff">
                        Inactive
                      </Text>
                    }
                    checkedIcon={
                      <Text
                        pl="10px"
                        pt="10px"
                        fontSize="15px"
                        w="full"
                        color="#fff"
                      >
                        Active
                      </Text>
                    }
                  />
                )}
              </Flex>
            </Flex>
          </Box>

          <Flex
            align={{ base: "flex-start", md: "center" }}
            flexDir={{ base: "column", md: "row" }}
            gap="25px"
            borderBottom={{ base: "none", md: "2px solid #D9DBF1" }}
          >
            {staffDetailsTab.map((item, i) => (
              <Text
                cursor="pointer"
                pb="10px"
                onClick={() => setTab(item)}
                _hover={{ color: "#444648" }}
                transition=".3s ease-in-out"
                fontSize="14px"
                borderBottom={tab === item ? "2px solid #444648" : "none"}
                color={tab === item ? "#444648" : "#949698"}
                fontWeight={500}
                key={i}
              >
                {item}
              </Text>
            ))}
          </Flex>

          {tab === "General Information" && (
            <GeneralInfo refetch={refetch} id={id} data={data} />
          )}
          {tab === "Employee Documents" && (
            <EmployeeDocuments data={data} refetch={refetch} />
          )}
          {tab === "Schedule" && <Schedule />}
          {tab === "Loan History" && <LoanHistory />}
          {tab === "Leave History" && <LeaveHistory data={data} />}
          {tab === "Medical Assistance" && <MedAssist />}
        </>
      )}
    </Box>
  );
};

export default StaffProfileDetails;
