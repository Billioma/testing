import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  fonts: {
    heading: `Poppins`,
    body: `Poppins`,
  },
  components: {
    Input: {
      defaultProps: {
        variant: "primary",
      },
      variants: {
        primary: {
          field: {
            bgColor: "#fff",
            borderRadius: "10px",
            color: "#000",
            _placeholder: {
              color: "gray",
              padding: "5",
            },
          },
        },
        alternate: {
          field: {
            bgColor: "unset",
            border: "",
            borderRadius: "10px",
            color: "#BDBDBD",
            _placeholder: {
              color: "gray",
              fontSize: "13px",
            },
          },
        },
        secondary: {
          field: {
            bgColor: "",
            borderRadius: "10px",
            border: "1px solid rgba(15, 23, 43, 0.3)",
            color: "#000",
            _placeholder: {
              color: "#4F4F4F",
            },
          },
        },
        filter: {
          field: {
            bgColor: "#F2F2F2",
            border: "1px solid #E0E0E0",
            borderRadius: "5px",
            color: "#000",
            _placeholder: {
              color: "#333333",
              padding: "10px",
              fontSize: "13px",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        primary: {
          field: {
            borderColor: "purple.100",
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
    Button: {
      variants: {
        primary: {
          border: "none",
          borderRadius: "8px",
          bgColor: "#086375",
          transition: ".3s ease-in-out",
          color: "#fff",
          fontWeight: 500,
          _hover: {
            bgColor: "#086375",
            opacity: 0.8,
            color: "#fff",
          },
          _disabled: {
            _hover: {
              border: "1px solid #7B47CC",
              color: "red",
            },
          },
          _focus: {
            bgColor: "#086375",
            color: "#fff",
          },
          _active: {
            bgColor: "#086375",
            color: "#fff",
          },
        },
        secondary: {
          bgColor: "orangeColor",
          size: "md",
          border: "1px solid",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: "300",
          _hover: {
            bgColor: "purpleColor",
            color: "#fff",
          },
          _disabled: {
            _hover: {
              border: "1px solid #F3C948",
              color: "orangeColor",
            },
          },
          _focus: {
            bgColor: "",
            color: "#fff",
          },
          _active: {
            bgColor: "purpleColor",
            color: "#fff",
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
  },

  colors: {
    darkBg: "#0F172B",
    orangeBg: "#F3C948",
    blueBg: "#2463EB",
    semiBlue: "#F1F5FE",
  },
});
