import React, { useState } from "react";
import { Select, Td, Text, Flex, Tr, Box } from "@chakra-ui/react";
import { IncidentStatus } from "../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TableFormat from "../../../common/TableFormat";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../../loaders/TableLoader";
import { formatDateTime } from "../../../../utils/helpers";
import { BsEye, BsTrash } from "react-icons/bs";
import AdminDeleteModal from "../../../modals/AdminDeleteModal";
import { useDelAdminIncident } from "../../../../services/admin/query/reports";
import useCustomToast from "../../../../utils/notifications";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
  refetch,
}) => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({ isOpen: false, id: null });

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading: isDeleting } = useDelAdminIncident({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
      setSelectedRow({ isOpen: false, id: null });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(selectedRow.id);
  };

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <TableFormat
          opt
          alignFirstHeader
          alignSecondHeader
          header={[
            "INCIDENT ID",
            "ZONE",
            "SERVICE TYPE",
            "STATUS",
            "DATE SUBMITTED",
            "ACTIONS",
          ]}
          paginationValues={{
            startRow,
            endRow,
            total: data?.total,
            page: data?.page,
            pageCount: data?.pageCount,
            onNext: () =>
              data?.page !== data?.pageCount ? setPage(page + 1) : null,
            onPrevious: () => (data?.page !== 1 ? setPage(page - 1) : null),
            setLimit,
            limit,
          }}
          useDefaultPagination
        >
          {data?.data?.map((item, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="14px"
              lineHeight="100%"
            >
              <Td>{item?.id}</Td>
              <Td>{item?.serviceLog?.zone?.name}</Td>

              <Td textAlign="center">{item?.serviceLog?.service?.name}</Td>
              <Td>
                <Flex justifyContent="center" align="center" w="full">
                  <Flex
                    color={
                      IncidentStatus?.find(
                        (dat) =>
                          dat.name?.toLowerCase() ===
                          item?.status?.toLowerCase()
                      )?.color || ""
                    }
                    bg={
                      IncidentStatus?.find(
                        (dat) =>
                          dat.name?.toLowerCase() ===
                          item?.status?.toLowerCase()
                      )?.bg || ""
                    }
                    border={`1px solid ${
                      IncidentStatus?.find(
                        (dat) =>
                          dat.name?.toLowerCase() ===
                          item?.status?.toLowerCase()
                      )?.border
                    }`}
                    py="5px"
                    px="16px"
                    w="fit-content"
                    justifyContent="center"
                    borderRadius="4px"
                    align="center"
                    textTransform="capitalize"
                  >
                    {item?.status?.replace("_", " ").toLowerCase()}
                  </Flex>
                </Flex>
              </Td>
              <Td textAlign="center">{formatDateTime(item?.createdAt)}</Td>
              <Td>
                <Flex gap="10px" align="center" justifyContent="center">
                  <Flex
                    onClick={() => {
                      navigate(`/admin/claims/${item?.id}`);
                    }}
                    border="1px solid #999999"
                    borderRadius="8px"
                    w="32px"
                    justifyContent="center"
                    cursor="pointer"
                    h="32px"
                    fontSize="14px"
                    align="center"
                  >
                    <BsEye size="16px" color="#999999" />
                  </Flex>

                  <Flex
                    cursor="pointer"
                    onClick={() =>
                      setSelectedRow({ isOpen: true, id: item?.id })
                    }
                    border="1px solid #999999"
                    borderRadius="8px"
                    w="32px"
                    justifyContent="center"
                    h="32px"
                    fontSize="14px"
                    align="center"
                  >
                    <BsTrash size="16px" color="#848688" />
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          ))}
        </TableFormat>
      ) : (
        ""
      )}
      <AdminDeleteModal
        isOpen={selectedRow.isOpen}
        onClose={() => setSelectedRow({ ...selectedRow, isOpen: false })}
        title="Delete Incident Claim"
        subTitle="Are you sure you want to delete this claim?"
        handleSubmit={handleSubmit}
        isLoading={isDeleting}
      />{" "}
    </Box>
  );
};

export default TableLayer;
