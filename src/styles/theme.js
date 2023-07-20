import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  fonts: {
    heading: `Cooper`,
    body: `Sailec`,
  },
  components: {
    Input: {
      variants: {
        primary: {
          field: {
            bgColor: "#fff",
            borderRadius: "4px",
            color: "#000",
            _placeholder: {
              color: "gray",
            },
          },
        },
        alternate: {
          field: {
            bgColor: "#F2F2F2",
            border: "1px solid #E0E0E0",
            borderRadius: "5px",
            color: "#000",
            _placeholder: {
              color: "#333333",
              fontSize: "13px",
            },
          },
        },
        secondary: {
          field: {
            bgColor: "#F2F2F2",
            borderRadius: "4px",
            color: "#000",
            _placeholder: {
              color: "#BDBDBD",
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
        secondary: {
          field: {
            rounded: "full",
            borderRadius: "10px",
            cursor: "pointer",
            bg: "#fafafa",
            border: "1px solid #E0E0E0",
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
        secondary: {
          bg: "#fff",
          color: "#000",
          border: "1px solid gray",
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
          borderRadius: "4px",
          color: "#fff",
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
        secondary: {
          bgColor: "orangeColor",
          size: "md",
          border: "1px solid",
          color: "#fff",
          fontWeight: "300",
          _hover: {
            bgColor: "red",
            color: "#fff",
          },
          _disabled: {
            _hover: {
              border: "1px solid #F3C948",
              color: "orangeColor",
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
