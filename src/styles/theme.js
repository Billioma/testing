import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
  "3xl": "1636px",
};

export const customTheme = extendTheme({
  fonts: {
    heading: `Recoleta`,
    body: `Recoleta`,
  },
  breakpoints,
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: "#EE383A",
            borderColor: "#EE383A",
          },
        },
      },
    },
    Radio: {
      variants: {
        primary: {
          control: {
            borderColor: "#242628",
            _checked: {
              borderColor: "red",
              bg: "red",
            },
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
    Switch: {
      variants: {
        primary: {
          container: {
            border: "2px solid #C4C6C8",
            rounded: "full",
            _checked: {
              border: "2px solid red",
            },
          },
          thumb: {
            bg: "#C4C6C8",
            _checked: {
              bg: "red",
            },
          },
          track: {
            bg: "transparent",
          },
        },
      },

      defaultProps: {
        variant: "primary",
      },
    },
    Input: {
      variants: {
        primary: {
          field: {
            bgColor: "#fff",
            fontFamily: "Satoshi",
            borderRadius: "4px",
            color: "#000",
            _placeholder: {
              color: "gray",
            },
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
    Select: {
      variants: {
        primary: {
          field: {
            bgColor: "#F1EBF9",
            borderRadius: "10px",
            cursor: "pointer",
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
    Textarea: {
      variants: {
        primary: {
          bg: "#f2f2f2",
          color: "#000",
          borderRadius: "10px",
          _placeholder: {
            color: "#BDBDBD",
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                transform: "scale(0.85) translateY(-24px)",
                color: "#000000",
                borderRadius: "5px",
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                transform: "scale(0.85) translateY(-24px)",
                color: "#000000",
                borderRadius: "5px",
              },
            label: {
              color: "#C4C4C4",
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
    Button: {
      variants: {
        primary: {
          border: "none",
          bgColor: "red",
          borderRadius: "12px",
          color: "#fff",
          fontFamily: "Satoshi",
          transition: ".3s ease-in-out",
          fontSize: "14px",
          fontWeight: "500",
          _hover: {
            opacity: 0.9,
          },
          _disabled: {
            _hover: {
              border: "1px solid #7B47CC",
              color: "red",
            },
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
  },

  colors: {
    red: "#EE383A",
  },
});
