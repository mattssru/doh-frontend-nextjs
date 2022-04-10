import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: (props: any) => props.backgroundcolor,
    borderRadius: "12px",
    height: "140px",
    boxShadow: "0 10px 20px rgba(0,0,0,.16)",
    [theme.breakpoints.down("xs")]: {
      height: "120px",
    },
  },
  img: {
    marginRight: "20px",
    [theme.breakpoints.down("md")]: {
      marginRight: "15px",
    },
    "& img": {
      [theme.breakpoints.down("sm")]: {
        maxHeight: "80px",
      },
    },
  },
  textsum: {
    color: "#fff",
    textAlign: "center",
    "& p:first-child": {
      fontSize: "30px",
      lineHeight: "30px",
      fontFamily: "DBHeavent_BoldCond",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        lineHeight: "24px",
      },
    },
    "& p:last-child": {
      fontSize: "60px",
      lineHeight: "65px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "42px",
        lineHeight: "43px",
      },
      "& span": {
        fontSize: "30px",
        lineHeight: "22px",
        color: "#fff",
        fontFamily: "DBHeavent_Cond",
        marginLeft: "15px",
        position: "relative",
        verticalAlign: "middle",
      },
    },
  },
}));

const BoxSum = (props: any) => {
  const classes = useStyles(props);
  const { root } = useStyles(props);
  const { image, text, num, unit } = props;
  return (
    <Box className={`${root}`}>
      <Box className={classes.img}>
        <img src={image} alt="" />
      </Box>
      <Box className={classes.textsum}>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="body1">
          {num}
          <Typography component="span" variant="body1">
            {unit}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default BoxSum;
