import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Image, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { AiOutlineCamera } from "react-icons/ai";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import {
  useEditAdministrator,
  useGetAdministrators,
} from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import AdminChangePassword from "../../../components/modals/AdminChangePasswordModal";
import { useGetAllRoles } from "../../../services/admin/query/roles";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useUploadMedia } from "../../../services/admin/query/general";
import { customStyles } from "../../../components/common/constants";

export default function AddAttendants() {
  const [state, setState] = useState({
    name: "",
    operator: "",
    accountType: "",
    userId: "",
    locations: [],
    status: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { refetch } = useGetAdministrators();
  const { mutate, isLoading } = useEditAdministrator({
    onSuccess: () => {
      successToast("Administrator updated successfully!");
      refetch();
      navigate(PRIVATE_PATHS.ADMIN_ADMINISTRATORS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: allRoles } = useGetAllRoles();

  const roleOptions =
    allRoles?.data?.map((role) => ({
      label: role.displayName,
      value: parseInt(role.id),
    })) || [];

  const { mutate: uploadMedia } = useUploadMedia({
    onSuccess: (data) => {
      mutate({ ...state, avatar: data.path });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const handleAvatarImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setState({
        ...state,
        avatarImage: selectedImage,
      });
    }
  };

  const isFormValid = () => {
    return !state.firstName || !state.lastName || !state.email || !state.role;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = (data = state) => {
    if (typeof state.avatarImage != "string" && state.avatarImage) {
      const formData = new FormData();
      formData.append("profilePicture", state.avatarImage);
      uploadMedia({
        fileType: "avatar",
        entityType: "admin",
        file: formData.get("profilePicture"),
      });
    } else {
      mutate({ ...data, id: state.id });
    }
  };

  useEffect(() => {
    setState({
      ...location.state,
      role: parseInt(location.state.role?.id),
    });

    setIsEdit(location?.state?.isEdit);
  }, [location.state]);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <GoBackTab />
        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w={{ md: "30rem", base: "100%" }}
          flexDir="column"
          border="1px solid #E4E6E8"
        >
          <Box
            alignSelf={"center"}
            justifyContent={"center"}
            mb={5}
            display="flex"
            flexDir="column"
          >
            <Text
              fontSize="10px"
              fontWeight={500}
              color="#444648"
              textAlign="center"
            >
              Avatar
            </Text>
            <label htmlFor="avatarInput" disabled={!isEdit}>
              <Box
                w="120px"
                h="120px"
                justifyContent="center"
                alignItems="center"
                border="4px solid #0D0718"
                borderRadius="12px"
                display="flex"
                cursor="pointer"
                overflow={"hidden"}
              >
                {state.avatarImage || state.avatar ? (
                  <Image
                    src={
                      state.avatarImage
                        ? URL?.createObjectURL(state.avatarImage)
                        : process.env.REACT_APP_BASE_URL +
                          state.avatar?.substring(1)
                    }
                    alt="Avatar"
                    boxSize="100%"
                    objectFit="cover"
                  />
                ) : (
                  <AiOutlineCamera size={32} />
                )}
              </Box>
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarImageChange}
            />
          </Box>
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              First Name
            </Text>
            <CustomInput
              auth
              value={state.firstName}
              mb
              holder="Enter first name"
              onChange={(e) =>
                setState({ ...state, firstName: e.target.value })
              }
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Last Name
            </Text>
            <CustomInput
              auth
              value={state.lastName}
              mb
              holder="Enter last name"
              onChange={(e) => setState({ ...state, lastName: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Email Address
            </Text>
            <CustomInput
              auth
              value={state.email}
              mb
              holder="Enter email address"
              onChange={(e) => setState({ ...state, email: e.target.value })}
              isDisabled={!isEdit}
            />
          </Box>

          <Box mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Default Role
            </Text>
            <Select
              styles={customStyles}
              options={roleOptions}
              placeholder="Select role"
              onChange={(selectedOption) =>
                setState({
                  ...state,
                  role: selectedOption.value,
                })
              }
              value={roleOptions.find((option) => option.value == state.role)}
              isDisabled={!isEdit}
            />
          </Box>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              This user is a manager
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  isManager: state.isManager ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
              value={state.isManager}
              isDisabled={!isEdit}
            />
          </Flex>

          <Button
            variant="adminSecondary"
            fontSize="12px"
            mt={4}
            h="32px"
            onClick={() => setIsOpen(true)}
            alignSelf="center"
          >
            Change Password
          </Button>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminDanger"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS)}
            >
              Delete
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isEdit && isDisabled}
              isLoading={!isOpen && isLoading}
              onClick={() => (!isEdit ? setIsEdit(!isEdit) : handleSubmit())}
            >
              {!isEdit ? "Edit" : "Save"}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <AdminChangePassword
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Box>
  );
}
