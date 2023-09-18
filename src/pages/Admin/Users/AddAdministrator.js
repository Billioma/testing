import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch, Image } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCamera,
} from "react-icons/ai";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCreateAdministrator } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import { useGetAllRoles } from "../../../services/admin/query/roles";
import { useUploadMedia } from "../../../services/admin/query/general";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

export default function AddAttendants() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    status: 1,
    isManager: 0,
    avatarImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { errorToast, successToast } = useCustomToast();
  const { data: allRoles } = useGetAllRoles();

  const roleOptions =
    allRoles?.data?.map((role) => ({
      label: role.displayName,
      value: parseInt(role.id),
    })) || [];

  const { mutate, isLoading } = useCreateAdministrator({
    onSuccess: () => {
      successToast("Administrator added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ADMINISTRATORS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { mutate: uploadMedia, isLoading: uploadingImage } = useUploadMedia({
    onSuccess: (data) => {
      mutate({ ...state, avatar: data.path });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const isFormValid = () => {
    return (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.role ||
      !state.password ||
      !state.passwordConfirmation
    );
  };

  const handleAvatarImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setState({
        ...state,
        avatarImage: selectedImage,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.avatarImage) {
      const formData = new FormData();
      formData.append("profilePicture", state.avatarImage);
      uploadMedia({
        fileType: "avatar",
        entityType: "admin",
        file: formData.get("profilePicture"),
      });
    } else {
      mutate(state);
    }
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

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
          <Box alignSelf={"center"} mb={5}>
            <Text
              fontSize="10px"
              fontWeight={500}
              color="#444648"
              textAlign="center"
            >
              Avatar
            </Text>
            <label htmlFor="avatarInput">
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
                {state.avatarImage ? (
                  <Image
                    src={URL.createObjectURL(state.avatarImage)}
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
            />
          </Box>

          <Box w="full" mb={4} position="relative">
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Password
            </Text>
            <CustomInput
              auth
              value={state.password}
              mb
              holder="Set password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
              type={showPassword ? "text" : "password"}
            />
            <Box
              w="fit-content"
              position="absolute"
              zIndex={2}
              right={"10px"}
              top="35px"
              cursor="pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </Box>
          </Box>

          <Box position="relative" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Comfirm Password
            </Text>
            <CustomInput
              auth
              value={state.passwordConfirmation}
              mb
              holder="Re-enter password"
              onChange={(e) =>
                setState({ ...state, passwordConfirmation: e.target.value })
              }
              type={showConfirmPassword ? "text" : "password"}
            />

            <Box
              w="fit-content"
              position="absolute"
              zIndex={2}
              right={"10px"}
              top="35px"
              cursor="pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </Box>
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
            />
          </Flex>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminSecondary"
              w="45%"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS)}
            >
              Cancel
            </Button>
            <Button
              variant="adminPrimary"
              w="55%"
              isDisabled={isDisabled}
              isLoading={isLoading || uploadingImage}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    height: "44px",
    color: "#646668",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #D4D6D8",
    background: "unset",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "13px",
  }),
};
