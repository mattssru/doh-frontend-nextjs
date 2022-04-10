import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  overrides: {
    MuiTab: {
      root: {
        fontFamily: "DBHeavent_BoldCond",
        fontWeight: "normal",
      },
    },
    MuiFormHelperText: {
      contained: {
        fontSize: `18px`,
        lineHeight: `18px`,
      },
      root: {
        fontSize: `18px`,
        lineHeight: `18px`,
      },
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          WebkitFontSmoothing: "auto",
          fontFamily: "DBHeavent_Cond",
          fontSize: "28px",
          maxWidth: "1920px",
          color: "#000000",
          backgroundImage: "url(/static/images/bg-green.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "auto",
          "@media (max-width: 1024px)": {
            backgroundSize: "70vw auto",
          },
          "@media (max-width: 767px)": {
            backgroundSize: "40% auto",
          },
        },
        article: {
          overflow: "hidden",
        },
        ".MuiContainer-root": {
          padding: "0 15px !important",
        },
        ".MuiFormLabel-root": {
          position: "relative",
          transform: "none !important",
          fontSize: 20,
          lineHeight: "24px",
          color: "#000",
          fontFamily: "DBHeavent_Cond",
          marginBottom: 4,
          height: 24,
        },
        ".MuiToolbar-gutters": {
          padding: "0 15px !important",
        },
        ".MuiLink-root": {
          textDecoration: "none",
          cursor: "pointer",
        },
        ".MuiToolbar-root .MuiContainer-root": {
          "@media (max-width: 767px)": {
            padding: "0 !important",
          },
        },
        ".MuiInputBase-root": {
          fontFamily: "DBHeavent_Cond !important",
        },

        ".MuiTableCell-root": {
          fontFamily: "DBHeavent",
          fontWeight: "normal !important",
        },
        a: {
          textDecoration: "none",
          curser: "pointer",
          MozTransition: "all .2s ease-in",
          WebkitTransition: "all .2s ease-in",
          transition: "all .2s ease-in",
        },
        "&:focus, &:hover, &:visited, &:link, &:active": {
          textDecoration: "none",
        },
        MuiButton: {
          text: {
            color: "white",
          },
        },
        strong: {
          fontFamily: "DBHeavent_BoldCond",
          fontWeight: "normal",
        },

        button: {
          fontFamily: "DBHeavent_Cond",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#313490",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1688C4",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      contrastText: "#fff",
    },
    info: {
      main: "#2196f3",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "DBHeavent_Cond",

    h1: {
      fontFamily: "DBHeavent_BoldCond",
      fontSize: 60,
      lineHeight: "60px",
      fontWeight: "normal",
    },
    h2: {
      fontFamily: "DBHeavent_BoldCond",
      fontSize: 30,
      lineHeight: "30px",
      fontWeight: "normal",
    },
    h3: {
      fontFamily: "DBHeavent_BoldCond",
      fontWeight: "normal",
    },
    h4: {
      fontFamily: "DBHeavent_BoldCond",
      fontWeight: "normal",
    },
    h5: {
      fontFamily: "DBHeavent_BoldCond",
      fontWeight: "normal",
    },
    h6: {
      fontFamily: "DBHeavent_BoldCond",
      fontWeight: "normal",
    },
    body1: {
      fontSize: "24px",
      lineHeight: "24px",
    },
    body2: {
      fontSize: "21px",
      lineHeight: "21px",
    },
  },
  shape: {
    borderRadius: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
