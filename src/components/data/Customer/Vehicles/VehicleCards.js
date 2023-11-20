import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useDeleteVehicles,
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../../services/customer/query/vehicles";
import AddVehicleModal from "../../../modals/AddVehicleModal";
import useCustomToast from "../../../../utils/notifications";
import EditVehicleModal from "../../../modals/EditVehicleModal";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import { colorTypes } from "../../../common/constants";

const VehicleCards = () => {
  const { data: vehicles, isLoading, refetch } = useGetVehicles();
  const [showDelete, setShowDelete] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState("");
  const { data: models } = useGetModel();
  const { data: makes } = useGetMake();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);

  const openMenu = (data) => {
    setShow(true);
    setCurrentVehicle(data);
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentVehicle("");
    }
  }, [isOpen]);

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isDeleting } = useDeleteVehicles({
    onSuccess: (res) => {
      setShowDelete(false);
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const openDelete = (data) => {
    setShowDelete(true);
    setCurrentVehicle(data);
  };

  const handleSubmit = () => {
    mutate(currentVehicle?.id);
  };

  return (
    <Box>
      <Grid
        gap="20px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {isLoading ? (
          <Skeleton isLoaded={!isLoading}></Skeleton>
        ) : vehicles?.data?.length ? (
          vehicles?.data?.map((data, i) => (
            <GridItem key={i}>
              <Flex
                flexDir="column"
                justifyContent="center"
                align="center"
                w="full"
                minH="11.75rem"
                bg="#fff"
                px="20px"
                borderRadius="8px"
              >
                {/* <Flex
                  color="red"
                  mb="24px"
                  w="full"
                  justifyContent="space-between"
                  align="center"
                >
                  <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                    Default
                  </Text>

                  <AiOutlineCheckCircle size="20px" />
                </Flex> */}
                <Flex justifyContent="space-between" w="full" align="center">
                  <Box w="full">
                    <Text
                      mb="8px"
                      color="#848688"
                      fontWeight={700}
                      fontSize="10px"
                    >
                      Vehicles
                    </Text>
                    <Text fontSize="14px" color="#242628" fontWeight={500}>
                      {data?.model?.make?.name} {data?.model?.name}
                    </Text>
                  </Box>

                  <Flex align="flex-end" flexDir="column" w="full">
                    <Text
                      mb="8px"
                      color="#848688"
                      fontWeight={700}
                      fontSize="10px"
                    >
                      Color
                    </Text>
                    <Text fontSize="14px" color="#242628" fontWeight={500}>
                      {colorTypes.find(
                        (item) =>
                          item?.color?.toLocaleLowerCase() === data?.color
                      )?.label || data?.color}
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  mt="32px"
                  justifyContent="space-between"
                  w="full"
                  align="center"
                >
                  <Box w="full">
                    <Text
                      mb="8px"
                      color="#848688"
                      fontWeight={700}
                      fontSize="10px"
                    >
                      License Plate
                    </Text>
                    <Text fontSize="14px" color="#242628" fontWeight={500}>
                      {data?.licensePlate}
                    </Text>
                  </Box>

                  <Flex
                    flexDir="column"
                    justifyContent="center"
                    align="center"
                    w="full"
                  >
                    <Text
                      mb="8px"
                      color="#848688"
                      fontWeight={700}
                      fontSize="10px"
                    >
                      State
                    </Text>
                    <Text fontSize="14px" color="#242628" fontWeight={500}>
                      {data?.state}
                    </Text>
                  </Flex>

                  <Flex
                    align="center"
                    justifyContent="flex-end"
                    gap="24px"
                    w="full"
                  >
                    <Image
                      cursor="pointer"
                      src="/assets/edit.svg"
                      onClick={() => openMenu(data)}
                    />

                    <Image
                      onClick={() => openDelete(data)}
                      src="/assets/bin.svg"
                      cursor="pointer"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
          ))
        ) : (
          ""
        )}

        <GridItem>
          <Flex
            minH="11.75rem"
            w="full"
            cursor="pointer"
            bg="#fff"
            flexDir="column"
            justifyContent="center"
            align="center"
            onClick={onOpen}
            borderRadius="8px"
          >
            <Image src="/assets/add-icon.svg" />
            <Text
              mt="10px"
              lineHeight="100%"
              color="#646668"
              fontWeight={500}
              fontSize="10px"
            >
              Add New Vehicle
            </Text>
          </Flex>
        </GridItem>
      </Grid>

      <AddVehicleModal
        makes={makes}
        models={models}
        refetch={refetch}
        isOpen={isOpen}
        onClose={onClose}
      />

      <EditVehicleModal
        dataa={currentVehicle}
        makes={makes}
        models={models}
        refetch={refetch}
        isOpen={show}
        onClose={() => setShow(false)}
      />
      <ConfirmDeleteModal
        isOpen={showDelete}
        isLoading={isDeleting}
        action={handleSubmit}
        title="Vehicle"
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default VehicleCards;
