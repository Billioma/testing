import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TableLayer from "../../../components/data/Admin/Services/TableLayer";
import AdminAddServiceModal from "../../../components/modals/AdminAddServiceModal";
import { useGetServices } from "../../../services/admin/query/services";
import AdminEditServiceModal from "../../../components/modals/AdminEditServiceModal";

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState({
    isOpen: false,
    selectedService: null,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(25);

  const { data, isLoading, refetch } = useGetServices(
    { refetchOnWindowFocus: true },
    page,
    limit
  );

  const handleEdit = (service) => {
    setIsEditOpen({ isOpen: true, selectedService: service });
  };

  return (
    <Box>
      <Box w="full" border={"1px solid #E4E6E8"} borderRadius={"12px"}>
        <Flex justifyContent={"end"} py={3} px={5}>
          <Button
            variant="adminPrimary"
            gap={2}
            fontSize={"12px"}
            onClick={() => setIsOpen(true)}
          >
            Add a Service <FiPlus size={18} />
          </Button>
        </Flex>
        <hr />
        <TableLayer
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          handleEdit={handleEdit}
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
