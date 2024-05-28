import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import {
  useSendPassOtp,
  useVerifyPassOtp,
} from "../../../services/staff/query/auth";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const CodeVerification = () => {
  const { errorToast, successToast } = useCustomToast();
  const phone = sessionStorage.getItem("phone");
  const staffId = sessionStorage.getItem("staffId");
  const navigate = useNavigate();
  const { mutate, isLoading } = useVerifyPassOtp({
    onSuccess: (res) => {
      navigate("/staff/auth/reset-password");
      sessionStorage.removeItem("staffId");
      sessionStorage.setItem(
        "new_token",
        JSON.stringify(res?.data?.access_token),
      );
      sessionStorage.removeItem("phone");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const { mutate: resendMutate, isLoading: isResending } = useSendPassOtp({
    onSuccess: (res) => {
      successToast(res.message);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const [otp, setOtp] = useState("");

  const handleResend = () => {
    resendMutate({
      staffId: staffId,
    });
  };

  const handleSubmit = () => {
    mutate({ resetCode: otp });
  };

  return (
    <Box w={{ base: "100%", md: "30rem" }}>
      <Flex
        mb="64px"
        justifyContent="space-between"
        onClick={() => navigate(-1)}
        cursor="pointer"
        w="15rem"
        align="center"
        color="#086375"
      >
        <IoIosArrowBack size="20px" />

        <Text fontWeight={500} fontSize="18px">
          Verify Phone Number
        </Text>
      </Flex>

      <Text
        mt="40px"
        fontSize={{ base: "30px", md: "40px" }}
        color="#090c02"
        fontWeight={700}
      >
        Verify Phone Number
      </Text>

      <Text opacity={0.5} color="#090c02" fontWeight={500}>
        Enter the four digit code sent to {phone}
      </Text>

      <Box color="#090c02" mt="62px">
        <HStack alignItems="center" gap="16px">
          <PinInput value={otp} color="#086375" onChange={(e) => setOtp(e)}>
            <PinInputField
              bg="#F3F7F8"
              h="80px"
              w="72px"
              border="none"
              type="password"
              borderRadius="none"
              color="#086375"
              borderBottom="4px solid #086375"
              fontSize={16}
            />
            <PinInputField
              bg="#F3F7F8"
              h="80px"
              border="none"
              borderRadius="none"
              w="72px"
              type="password"
              color="#086375"
              borderBottom="4px solid #086375"
              fontSize={16}
            />
            <PinInputField
              bg="#F3F7F8"
              border="none"
              borderRadius="none"
              type="password"
              h="80px"
              color="#086375"
              w="72px"
              borderBottom="4px solid #086375"
              fontSize={16}
            />
            <PinInputField
              bg="#F3F7F8"
              h="80px"
              border="none"
              color="#086375"
              borderRadius="none"
              type="password"
              w="72px"
              borderBottom="4px solid #086375"
              fontSize={16}
            />
          </PinInput>
        </HStack>

        <Box mt="12px" fontSize="14px" fontWeight={500}>
          <Text
            onClick={() => (isResending ? "" : handleResend())}
            color="#086375"
            cursor={isResending ? "" : "pointer"}
          >
            {isResending ? "Resending..." : "Resend Code"}
          </Text>
        </Box>

        <Flex
          display={isLoading ? "flex" : "none"}
          mt="9px"
          align="center"
          gap="5px"
        >
          <Box className="loader" />
          <Text color="#086375" fontSize="14px">
            Verifying...
          </Text>
        </Flex>

        <Button
          my="42px"
          cursor={isLoading ? "text" : "pointer"}
          type="submit"
          onClick={() => (isLoading ? "" : handleSubmit())}
          isDisabled={otp?.length < 4}
          opacity={isLoading ? 0.7 : 1}
          w="full"
          h="60px"
          fontSize="18px"
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
};

export default CodeVerification;
