import { createTheme } from "@mui/material/styles";

export const MuiTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "white", // Change the label color
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Change the outline color
            },
            "&:hover fieldset": {
              borderColor: "white", // Change the outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Change the outline color when focused
            },
          },
          "& .MuiInputBase-input": {
            color: "white", // Change the text color
          },
          "&.Mui-disabled": {
            "& .MuiInputLabel-root": {
              color: "white", // Change the label color for disabled state
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Change the outline color for disabled state
              },
            },
          },
        },
      },
    },
    MuiFormControl: {
      // Add styles for FormControl
      styleOverrides: {
        root: {
          "& label": {
            color: "white", // Change the label color
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Change the outline color
            },
            "&:hover fieldset": {
              borderColor: "white", // Change the outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Change the outline color when focused
            },
          },
        },
      },
    },
    MuiSelect: {
      // Add styles for Select
      styleOverrides: {
        root: {
          "& label": {
            color: "white", // Change the label color
          },
          "&.MuiSelect-root": {
            color: "white", // Change the text color
          },
          "& .MuiSvgIcon-root": {
            color: "white", // Change the icon color
          },
        },
      },
    },
  },
});
