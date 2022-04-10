import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    height: "292px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.16)",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "280px",
    },
    "& p": {
      fontFamily: "DBHeavent_BoldCond",
      textAlign: "center",
      "& span": {
        fontSize: "25px",
        lineHeight: "15px",
        fontFamily: "DBHeavent_Cond",
        position: "relative",
        display: "block",
      },
    },
  },
  textblack: {
    fontSize: "25px",
    lineHeight: "30px",
    color: "#000",
    marginBottom: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "22px",
    },
  },
  textblue: {
    fontSize: "40px",
    lineHeight: "44px",
    color: "#1688C4",
    marginBottom: 15,
    [theme.breakpoints.down("sm")]: {
      fontSize: "32x",
      lineHeight: "32px",
    },
    "& span": {
      color: "#1688C4",
    },
  },
  textpink01: {
    fontSize: "24px",
    lineHeight: "22px",
    color: "#E96189",
  },
  textpink02: {
    fontSize: "40px",
    lineHeight: "44px",
    color: "#E96189",
    [theme.breakpoints.down("sm")]: {
      fontSize: "32px",
      lineHeight: "32px",
    },
    "& span": {
      color: "#E96189",
    },
  },
  boximage: {
    marginBottom: 5,
    "& img": {
      maxHeight: "52px",
      [theme.breakpoints.down("sm")]: {
        maxHeight: "50px",
      },
    },
  },
  detailcard: {},
}));

const CardReport = (props: any) => {
  const {
    image,
    textcard01,
    textcard02,
    numcard01,
    numcard02,
    unit01,
    unit02,
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.boximage}>
        <img src={image} alt="" />
      </Box>
      <Box className={classes.detailcard}>
        <Typography className={classes.textblack}>{textcard01}</Typography>
        <Typography className={classes.textblue}>
          {numcard01}
          <Typography component="span">{unit01}</Typography>
        </Typography>
        <Typography className={classes.textpink01}>{textcard02}</Typography>
        <Typography className={classes.textpink02}>
          {numcard02}
          <Typography component="span">{unit02}</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default CardReport;
