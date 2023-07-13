import { Flex, Heading, Text, useToast } from "@chakra-ui/react";

const BaseAlert = (props) => {
  const { ...style } = props;
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...style}
      py={4}
      mt={5}
      px={4}
      borderRadius="10px"
      borderRightRadius="0"
      borderLeft={`4px solid`}
      borderColor={`${style.colorScheme}.700`}
      boxShadow="0px 0px 24px 20px rgba(100, 102, 104, 0.15)"
      bgColor={`#fff`}
    >
      <Heading
        as="h4"
        fontSize="md"
        color={`${style.colorScheme}.700`}
        fontWeight="500"
      >
        {props.title}
      </Heading>
      {props.details ? (
        <Text color={`${style.colorScheme}.400`}>{props.details}</Text>
      ) : null}
    </Flex>
  );
};

export const SuccessAlert = (props) => {
  return <BaseAlert colorScheme="green" {...props} />;
};

export const ErrorAlert = (props) => {
  return <BaseAlert colorScheme="orange" {...props} />;
};
export const WarningAlert = (props) => {
  return <BaseAlert colorScheme="orange" {...props} />;
};
export const InfoAlert = (props) => {
  return <BaseAlert colorScheme="blue" {...props} />;
};

const useCustomToast = () => {
  const toast = useToast();

  const successToast = (
    successMsg = "Operation successful",
    pos = "top-right"
  ) => {
    return toast({
      position: pos,
      isClosable: true,
      render: () => <SuccessAlert title="Success" details={successMsg} />,
    });
  };
  const errorToast = (errorMessage = "Error occurred", pos = "top-right") => {
    return toast({
      position: pos,
      isClosable: true,
      render: () => <ErrorAlert title="Error" details={errorMessage} />,
    });
  };
  const warningToast = (warningMessage = "Warning", pos = "top-right") => {
    return toast({
      position: pos,
      isClosable: true,
      render: () => <WarningAlert title="Warning" details={warningMessage} />,
    });
  };
  const infoToast = (infoMessage = "Info", pos = "top-right") => {
    return toast({
      position: pos,
      isClosable: true,
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
