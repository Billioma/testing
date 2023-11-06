import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import TableLayer from "../../../components/data/Admin/Services/TableLayer";
import AdminAddServiceModal from "../../../components/modals/AdminAddServiceModal";
import { useGetServices } from "../../../services/admin/query/services";
import AdminEditServiceModal from "../../../components/modals/AdminEditServiceModal";
import Filter from "../../../components/common/Filter";
import { VscDebugRestart } from "react-icons/vsc";
import { servicesOptions } from "../../../components/common/constants";

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState({
    isOpen: false,
    selectedService: null,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");

  const { data, isLoading, refetch } = useGetServices(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit,
    query
  );

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit]);

  useEffect(() => {
    refetch();
  }, []);

  const handleEdit = (service) => {
    setIsEditOpen({ isOpen: true, selectedService: service });
  };

  return (
    <Box>
      <Box w="full" border={"1px solid #E4E6E8"} borderRadius={"12px"}>
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={servicesOptions}
          handleSearch={refetch}
          title={<Text fontWeight="500">All Services</Text>}
          main={
            <Flex gap="6px">
              <Button
                variant="adminPrimary"
                gap={2}
                fontSize={"12px"}
                onClick={() => setIsOpen(true)}
              >
                Add a Service <FiPlus size={18} />
              </Button>
              <Button
                bg="white"
                py={3}
                h="43px"
                border="1px solid #000"
                color="#000"
                onClick={() => refetch()}
              >
                <VscDebugRestart size={20} />
              </Button>
            </Flex>
          }
        />

        <hr />
        <TableLayer
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          handleEdit={handleEdit}
          setLimit={setLimit}
          startRow={startRow}
          endRow={endRow}
          refetch={refetch}
        />
      </Box>

      <AdminAddServiceModal
        isOpen={isOpen}
        refetch={refetch}
        onClose={() => setIsOpen(!isOpen)}
      />

      <AdminEditServiceModal
        isOpen={isEditOpen.isOpen}
        service={isEditOpen.selectedService}
        refetch={refetch}
        onClose={() => setIsEditOpen({ isOpen: false, selectedService: null })}
      />
    </Box>
  );
}
