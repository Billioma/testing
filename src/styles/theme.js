import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  fonts: {
    heading: `Cooper`,
    body: `Sailec`,
  },
  components: {
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

        adminPrimary: {
          container: {
            border: "2px solid #C4C6C8",
            rounded: "full",
            _checked: {
              border: "2px solid #0D0718",
            },
          },
          thumb: {
            bg: "#C4C6C8",
            _checked: {
              bg: "#0D0718",
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

        adminPrimary: {
          border: "none",
          bgColor: "#0D0718",
          borderRadius: "4px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
          height: "45px",
          _focus: {
            color: "#fff",
          },
          _active: {
            color: "#fff",
          },
          _hover: {
            _disabled: {
              background: "#0D0718",
              border: "1px solid #7B47CC",
            },
          },
        },

        adminDanger: {
          bgColor: "#fff",
          borderRadius: "4px",
          color: "#A11212",
          fontSize: "14px",
          fontWeight: "500",
          borderColor: "#A11212",
          borderWidth: "1px",
          height: "45px",
          _focus: {
            color: "#fff",
          },
          _active: {
            color: "#fff",
          },
          _hover: {
            _disabled: {
              background: "#fff",
              border: "1px solid #A11212",
            },
          },
        },

        adminSecondary: {
          bgColor: "#fff",
          borderRadius: "4px",
          color: "#0D0718",
          fontSize: "14px",
          fontWeight: "500",
          borderColor: "#0D0718",
          borderWidth: "1px",
          height: "45px",
          _focus: {
            color: "#0D0718",
          },
          _active: {
            color: "#0D0718",
          },
          _hover: {
            _disabled: {
              background: "#0D0718",
              border: "1px solid #7B47CC",
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
    dark: "#0D0718",
  },
});
