import { Box, Link, makeStyles } from "@material-ui/core";
import React from "react";
import { ButtonProps } from "./button";
import { Iconviewmore } from "./icon";

const useStyles = makeStyles((theme) => ({
  root: {},
  detail: {
    "& a": {
      color: "#263843",
      fontSize: 32,
      lineHeight: "30px",
      fontFamily: "DBHeavent_BoldCond",
      height: 40,
      overflow: "hidden",
      display: "block",
      [theme.breakpoints.down("sm")]: {
        fontSize: 28,
        lineHeight: "28px",
        height: 55,
      },
      [theme.breakpoints.down("xs")]: {
        height: "auto",
        marginBottom: 5,
      },
      "&:hover": {
        color: "#449AE3",
      },
    },
    "& p": {
      color: "#868686",
      fontSize: 26,
      lineHeight: "26px",
      height: 52,
      overflow: "hidden",
      display: "block",
      marginBottom: 15,
      [theme.breakpoints.down("xs")]: {
        height: "auto",
      },
    },
  },
  imgthumnail: {
    position: "relative",
    display: "block",
    width: "100%",
    paddingTop: "55%",
    marginBottom: 15,
    "& img": {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
}));

const CardThumnail = (props: any) => {
  const classes = useStyles();
  const { image, link, title, des, onClick } = props;
  return (
    <Box className={classes.root}>
      <Link href={link} className={classes.imgthumnail}>
        <img src={image} alt="" />
      </Link>
      <Box className={classes.detail}>
        <Link href={link}>{title}</Link>
        <p>{des}</p>
      </Box>
      <ButtonProps
        titlebutton="อ่านต่อ"
        maxwidthbtn="77px"
        heightbtn="28px"
        borderradiusbtn="14px"
        backgroundcolorbtn="#E96189"
        fontsizebtn="15px"
        endIcon={<Iconviewmore />}
        onClick={onClick}
      />
    </Box>
  );
};

export default CardThumnail;
