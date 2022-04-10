import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 0,
    position: "relative",
    width: "100%",
    paddingTop: "134vh",
    background: "linear-gradient(to bottom, #c6eadf, #c6d0c4)",
    [theme.breakpoints.down("md")]: {
      paddingTop: "100vh",
    },
    // [theme.breakpoints.down("sm")]: {
    //   paddingTop: "100%",
    // },
    // [theme.breakpoints.down(830)]: {
    //   paddingTop: "125%",
    // },
    // [theme.breakpoints.down(700)]: {
    //   paddingTop: "140%",
    // },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      [theme.breakpoints.down("md")]: {
        objectFit: "contain",
      },
    },
  },
}));

const RedirectPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <img src={`${prefix}/images/redirect.jpeg`} alt="" />
    </Box>
  );
};

export default RedirectPage;
