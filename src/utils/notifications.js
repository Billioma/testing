import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";

const BaseAlert = (props) => {
  const { backgroundColor, ...style } = props;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...style}
      mt={8}
      ml={{ base: "unset", md: "150px" }}
      px={4}
      w="full"
      borderRadius="10px"
      border="1px solid #F4F6F8"
      boxShadow="0px 4px 14px 0px rgba(110, 110, 110, 0.15)"
      bgColor={`#fff`}
    >
      <Box pt="10px" textAlign="center" w="full">
        <Heading
          fontFamily="Sailec"
          fontSize="16px"
          lineHeight="100%"
          color={`${style.colorScheme}.700`}
          fontWeight="500"
        >
          {props.title}
        </Heading>
        {props.details ? (
          <Text py="12px" color="#646668" lineHeight="100%" fontSize="12px">
            {props.details}
          </Text>
        ) : null}
        <Flex justifyContent="center" align="center">
          <Flex
            justifyContent="center"
            bgColor={backgroundColor}
            align="center"
            className="toast"
          ></Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export const SuccessAlert = (props) => {
  return <BaseAlert backgroundColor="green" colorScheme="green" {...props} />;
};

export const ErrorAlert = (props) => {
  return <BaseAlert backgroundColor="orange" colorScheme="orange" {...props} />;
};
export const WarningAlert = (props) => {
  return <BaseAlert backgroundColor="orange" colorScheme="orange" {...props} />;
};
export const InfoAlert = (props) => {
  return <BaseAlert backgroundColor="blue" colorScheme="blue" {...props} />;
};

const useCustomToast = () => {
  const toast = useToast();

  const successToast = (successMsg = "Operation successful", pos = "top") => {
    return toast({
      position: pos,
      isClosable: true,
      duration: 5000,
      render: () => <SuccessAlert title="Success" details={successMsg} />,
    });
  };
  const errorToast = (errorMessage = "Error occurred", pos = "top") => {
    return toast({
      position: pos,
      isClosable: true,
      duration: 5000,
      render: () => <ErrorAlert title="Error" details={errorMessage} />,
    });
  };
  const warningToast = (warningMessage = "Warning", pos = "top") => {
    return toast({
      position: pos,
      isClosable: true,
      duration: 4000,
      render: () => <WarningAlert title="Warning" details={warningMessage} />,
    });
  };
  const infoToast = (infoMessage = "Info", pos = "top") => {
    return toast({
      position: pos,
      isClosable: true,
      duration: 5000,
      render: () => <InfoAlert title="Info" details={infoMessage} />,
    });
  };
  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
  };
};

export default useCustomToast;
