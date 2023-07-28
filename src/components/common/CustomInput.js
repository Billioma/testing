import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CustomInput = ({
  value,
  opt,
  onClick,
  auth,
  show,
  password,
  name,
  isDisabled,
  suffix,
  handleKeyPress,
  error,
  ngn,
  onChange,
  mb,
  dis,
  onBlur,
  onFocus,
  holder,
  type,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setIsTyping(true);
    onChange(e);
  };

  const handleInputBlur = (e) => {
    setIsTyping(false);
    onBlur(e);
  };

  const getBorderColor = () => {
    if (isTyping) {
      return "1px solid #646668";
    } else if (value && !error) {
      return "1px solid #F4F6F8";
    } else if (error) {
      return "1px solid #EE383A";
    } else {
      return "1px solid #D4D6D8";
    }
  };

  const getBackgroundColor = () => {
    if (isTyping) {
      return "transparent";
    } else if (value && !error) {
      return "#F4F6F8";
    } else if (error) {
      return "#FDE8E8";
    } else {
      return "transparent";
    }
  };

  return (
    <FormControl mb={mb ? 0 : 5} isInvalid={error}>
      <InputGroup>
        {ngn && (
          <InputLeftElement h="44px">
            <Text color="#646668" fontSize="13px">
              +234
            </Text>
          </InputLeftElement>
        )}
        <Input
          value={value}
          isDisabled={dis}
          w="100%"
          name={name}
          isReadOnly={isDisabled}
          onKeyPress={handleKeyPress}
          onChange={handleInputChange}
          bg={getBackgroundColor()}
          border={getBorderColor()}
          onBlur={() => (!auth ? handleInputBlur() : setIsTyping(false))}
          onFocus={onFocus}
          h={opt ? "60px" : "44px"}
          type={type ? type : "text"}
          fontSize="13px"
          _placeholder={{ fontSize: "13px", color: "#646668" }}
          placeholder={holder}
        />
        {suffix ? (
          <InputRightElement cursor="pointer" h="60px">
            <Text>%</Text>
          </InputRightElement>
        ) : (
          <InputRightElement
            cursor="pointer"
            h="44px"
            display={show ? "flex" : "none"}
            onClick={onClick}
          >
            {!password ? (
              <FaEyeSlash color={value ? "#0F172B" : "#4F4F4F"} />
            ) : (
              <FaEye color={value ? "#0F172B" : "#4F4F4F"} />
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {error && (
        <Text fontSize="11px" mt="8px" color="red">
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default CustomInput;
