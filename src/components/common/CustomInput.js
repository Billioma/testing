import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import React from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const CustomInput = ({
  value,
  opt,
  onClick,
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
          onChange={onChange}
          bg={value ? "#F4F6F8" : "unset"}
          border={
            value
              ? "1px solid #F4F6F8"
              : error
              ? "1px solid red"
              : "1px solid #D4D6D8"
          }
          onBlur={onBlur}
          onFocus={onFocus}
          h={opt ? "60px" : "44px"}
          type={type ? type : "text"}
          fontSize="13px"
          // variant="secondary"
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
        <Text fontSize="12px" color="red">
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default CustomInput;
