import React, { useState } from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Textarea } from "@chakra-ui/react";

const TextInput = ({
  value,
  auth,
  name,
  isDisabled,
  handleKeyPress,
  error,
  onChange,
  mb,
  dis,
  onBlur,
  h,
  onFocus,
  holder,
  type,
  bg,
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
      return "1px solid #086375";
    } else if (value && !error) {
      return "1px solid #086375";
    } else if (error) {
      return "1px solid #EE383A";
    } else {
      return border || "1px solid #999999";
    }
  };

  const getBackgroundColor = () => {
    if (isTyping) {
      return "#E8FBF7";
    } else if (value && !error) {
      return "#E8FBF7";
    } else if (error) {
      return "#FDE8E8";
    } else {
      return bg || "transparent";
    }
  };

  return (
    <FormControl mb={mb ? 0 : 5} isInvalid={error}>
      <Textarea
        value={value}
        isDisabled={dis}
        w="100%"
        name={name}
        isReadOnly={isDisabled}
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
        borderRadius="8px"
        bg={getBackgroundColor()}
        border={getBorderColor()}
        onBlur={(e) => (!auth ? handleInputBlur(e) : setIsTyping(false))}
        onFocus={onFocus}
        h={h}
        type={type ? type : "text"}
        fontSize="13px"
        _placeholder={{ fontSize: "13px", color: "#646668" }}
        placeholder={holder}
      />
    </FormControl>
  );
};

export default TextInput;
