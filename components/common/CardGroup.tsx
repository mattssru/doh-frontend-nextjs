import { makeStyles, Box, Typography } from "@material-ui/core";
import React from "react";
import prefix from "utils/path";
import { ButtonProps } from "./button";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: 150,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    borderRadius: 5,
    padding: "20px 15px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: 'pointer',
    backgroundColor: 'white',
    height: 190,
  
  },
  imageCard: {
    width: 110,
    height: 110,
    borderRadius: "100%",
    padding: 5,
    backgroundColor: "#fff",
    marginRight: 20,
    "& img": {
      width: "110px",
      height: "110px",
      objectFit: "cover",
      borderRadius: "100%",
    },
  },
  rightCard: {
    "& h4": {
      fontSize: 24,
      lineHeight: "29px",
    },
  },
  member: {
    fontSize: 20,
    lineHeight: "24px",
    color: "#FFB100",
    "& img": {
      verticalAlign: "middle",
      marginRight: 6,
    },
  },
  calorie: {
    fontSize: 40,
    lineHeight: "48px",
    color: "#E96189",
    fontFamily: "DBHeavent_BoldCond",
    marginBottom: 10,
    "& span": {
      fontSize: 20,
      lineHeight: "24px",
      color: "#AAAAAA",
      verticalAlign: "middle",
    },
  },
  absolute: {
    position: "absolute",
    top: 13,
    right: 25,
  },
}));

const CardGroup = (props: any) => {
  const classes = useStyles();
  const {
    image,
    topic,
    member,
    calorie,
    visionButton = false,
    visionOfficial = false,
    onClickButton,
    visionStatus = false,
    onClickBox
  } = props;
  return (
    <Box className={classes.root} onClick={onClickBox}>
      <Box className={classes.imageCard}>
        <img src={image || `${prefix}/images/logo_print.svg`} alt="" />
      </Box>
      <Box className={classes.rightCard}>
        <Typography variant="h4">{topic}</Typography>
        <Box className={classes.member}>
          <img src={`${prefix}/images/run_yellow.svg`} alt="" />
          สมาชิก {member} คน
        </Box>
        <Box className={classes.calorie}>
          {calorie} <span>แคลอรี่</span>
        </Box>
        {visionButton && (
          <ButtonProps
            titlebutton="เข้าร่วม"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            heightbtn="40px"
            borderradiusbtn="5px"
            maxwidthbtn="155px"
            marginbtn="0 auto 0"
            fontsizebtn="22px"
            onClick={onClickButton}
          />
        )}
        {visionStatus &&<Box className={classes.rightCard}>รออนุมัติ</Box>}
      </Box>
      {visionOfficial && (
        <Box className={classes.absolute}>
          <img src={`${prefix}/images/ic_official.svg`} alt="" />
        </Box>
      )}
    </Box>
  );
};

export default CardGroup;
