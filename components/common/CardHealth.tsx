import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ButtonProps } from "./button";
import { IconCupSmall } from "./icon";
import prefix from "utils/path";
import router from "next/router";

const useStyles = makeStyles((theme: any) => ({
  root: {
    borderRadius: 5,
    border: "1px solid #D9D9D9",
    margin: (props: any) => props.margin,
  },
  topCard: {
    lineHeight: 0,
    position: "relative",
    width: "100%",
    paddingTop: "57%",
    "& img": {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      objectFit: "cover",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
  },
  centerCard: {
    backgroundColor: "#EFEFEF",
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& h3": {
      fontSize: 22,
      lineHeight: "30px",
      color: "#E04B56",
      position: "relative",
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
      "& span": {
        fontSize: 16,
        lineHeight: "12px",
        verticalAlign: "middle",
        color: "#000",
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
      },
      "&:last-child::after": {
        content: '""',
        position: "absolute",
        width: 1,
        height: "13px",
        backgroundColor: "#D8D8D8",
        top: 9,
        left: "-15px",
      },
    },
  },
  bottomCard: {
    backgroundColor: "#fff",
    padding: "12px 18px",
    "& h3": {
      fontSize: 21,
      lineHeight: "23px",
      marginBottom: 3,
      display: "-webkit-box",
      overflow: "hidden",
      maxHeight: '25px',
      height: "25px",
      // maxWidth: "100px",
      // width: 100,
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
    },
    "& p": {
      fontSize: 16,
      lineHeight: "14px",
      color: "#6C6C6C",
      marginBottom: 6,
    },
    [theme.breakpoints.down('xs')]: {
      padding: "6px 9px",
    }
  },
  des: {
    display: "-webkit-box",
    overflow: "hidden",
    maxHeight: '25px',
    height: "25px",
    // maxWidth: "100px",
    // width: 100,
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",

  },
}));

const CardHealth = (props: any) => {
  const classes = useStyles(props);
  const { image, point, permission, name, des, slug } = props;
  const { root } = useStyles(props);

  const handleClick = () => {
    router.push({pathname: `/health-point/reward/${slug}`})
  };
  return (
    <Box className={`${root}`}>
      <Box className={classes.topCard}>
        {image ? (
          <img src={image} alt="" />
        ) : (
          <img src={`${prefix}/images/gift.jpg`} alt="" />
        )}
      </Box>
      <Box className={classes.centerCard}>
        <Typography variant="h3">
          {point} &nbsp;<span>แต้ม</span>
        </Typography>
        <Typography variant="h3">
          {permission} &nbsp;<span>สิทธิ์</span>
        </Typography>
      </Box>
      <Box className={classes.bottomCard}>
        <Typography variant="h3">{name}</Typography>
        <p className={classes.des}>{des}</p>
        <ButtonProps
          id={slug}
          titlebutton="แลกของรางวัล"
          backgroundcolorbtn="#449AE3"
          borderradiusbtn="22px"
          heightbtn="27px"
          fontsizebtn="12px"
          fontFamily="DBHeavent_Cond"
          startIcon={<IconCupSmall />}
          onClick={handleClick}
        />
      </Box>
    </Box>
  );
};

export default CardHealth;
