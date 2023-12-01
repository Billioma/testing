import React, { useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Text, Flex } from "@chakra-ui/layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const CustomInput = ({
  value,
  values,
  reserve,
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
  pass2,
  holder,
  type,
  bg,
  search,
  add,
  onAdd,
  border,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setIsTyping(true);
    onChange(e);
  };

  const handleInputBlur = (e) => {
    setIsTyping(false);
    onBlur && onBlur(e);
  };

  const getBorderColor = () => {
    if (isTyping) {
      return "1px solid #646668";
    } else if (value && !error) {
      return "1px solid #F4F6F8";
    } else if (error) {
      return "1px solid #EE383A";
    } else {
      return border || "1px solid #D4D6D8";
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
      return bg || "transparent";
    }
  };

  return (
    <FormControl mb={mb ? 0 : 5} isInvalid={error}>
      <InputGroup>
        {ngn ? (
          <InputLeftElement h="44px">
            <Text color="#646668" fontSize="13px">
              +234
            </Text>
          </InputLeftElement>
        ) : reserve ? (
          <InputLeftElement cursor="pointer" h="40px">
            <BsSearch />
          </InputLeftElement>
        ) : (
          ""
        )}
        <Input
          value={value}
          isDisabled={dis}
          w="100%"
          name={name}
          cursor={isDisabled ? "auto" : ""}
          isReadOnly={isDisabled}
          onKeyPress={handleKeyPress}
          onChange={handleInputChange}
          bg={reserve ? "#f4f6f8" : getBackgroundColor()}
          borderRadius={reserve ? "8px" : "4px"}
          border={reserve ? "none" : getBorderColor()}
          onBlur={(e) => (!auth ? handleInputBlur(e) : setIsTyping(false))}
          onFocus={onFocus}
          h={opt ? "60px" : reserve ? "40px" : "44px"}
          type={type ? type : "text"}
          fontSize="13px"
          _placeholder={{
            fontSize: "13px",
            color: "#646668",
          }}
          placeholder={holder}
          autoComplete="new-password"
        />
        {suffix ? (
          <InputRightElement cursor="pointer" h={opt ? "60px" : "44px"}>
            <Text>%</Text>
          </InputRightElement>
        ) : search ? (
          <InputRightElement cursor="pointer" h={opt ? "60px" : "44px"}>
            <BsSearch />
          </InputRightElement>
        ) : add ? (
          <InputRightElement
            onClick={() =>
              values?.filter === "" || values?.dropFilter === "" ? "" : onAdd()
            }
            cursor={
              values?.filter === "" || values?.dropFilter === ""
                ? ""
                : "pointer"
            }
            h={opt ? "60px" : "44px"}
          >
            <BsSearch fill="#646668" size="15px" />
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
      <Flex
        align="center"
        w="full"
        justifyContent={error ? "space-between" : "flex-end"}
      >
        {error && (
          <Text fontSize="10px" mt="8px" color="red">
            {error}
          </Text>
        )}
        {pass2 && (
          <Text
            mt="8px"
            fontSize="10px"
            cursor="pointer"
            color="#1C0203"
            textAlign="end"
          >
            Same password as above
          </Text>
        )}
      </Flex>
    </FormControl>
  );
};

export default CustomInput;
