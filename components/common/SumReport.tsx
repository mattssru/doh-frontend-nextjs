import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: `auto`,
    padding: `0 15px`,
    display: `flex`,
    [theme.breakpoints.down("md")]: {
      padding: `0 25px`,
    },
    [theme.breakpoints.down("sm")]: {
      padding: `0`,
    },
    [theme.breakpoints.down("xs")]: {
      padding: `0 25px`,
    },
  },
  point: {
    display: `flex`,
    flexDirection: `row`,
    alignContent: `center`,
    alignItems: `center`,
    textAlign: `center`,
    justifyContent: `center`,
    margin: "0 auto",
    "& img": {
      top: `0`,
      position: `relative`,
      marginRight: `10px`,
      [theme.breakpoints.down("sm")]: {
        height: "30px",
        marginRight: `5px`,
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: `25px`,
        marginRight: `10px`,
      },
    },
    "& .MuiTypography-h2": {
      fontSize: `80px`,
      lineHeight: `70px`,
      wordBreak: `break-all`,
      height: "65px",
      overflow: "hidden",
      [theme.breakpoints.down("md")]: {
        lineHeight: `80px`,
      },
      [theme.breakpoints.down("sm")]: {
        lineHeight: `44px`,
        fontSize: "40px",
        height: "auto",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: `70px`,
        lineHeight: `66px`,
      },
    },
    "& .MuiTypography-h3": {
      fontSize: `60px`,
      lineHeight: `24px`,
      color: `#1688C4`,
      marginBottom: `20px`,
    },
    "& .MuiTypography-body1": {
      fontSize: `30px`,
      fontFamily: "DBHeavent_BoldCond",
      lineHeight: `24px`,
      [theme.breakpoints.down("sm")]: {
        fontSize: `22px`,
      },
    },
    "& .MuiTypography-body2": {
      fontSize: `25px`,
      lineHeight: `24px`,
      color: `#AAAAAA`,
      [theme.breakpoints.down("xs")]: {
        fontSize: `20px`,
      },
    },
  },
  resultNumColor: {
    color: (props: any) => props.ColorNum,
  },
  resultUnitColor: {
    color: (props: any) => props.ColorUnit,
  },
  imageUnitSize: {
    height: (props: any) => props.sizeImage,
  }
}));

const SumReport = (props: any) => {
  const classes = useStyles(props);
  const { resultNumColor, resultUnitColor, imageUnitSize } = useStyles(props);
  const { imageUnitType, unit, resultNum, unitType } = props;
  
  return (
    <Box className={classes.root}>
      <Box className={classes.point}>
        <Box component="span">
          <img className={`${imageUnitSize}`} src={imageUnitType} alt="" />
        </Box>
        <Box component="span">
          <Typography variant="body1">{unit}</Typography>
          <Typography variant="h2" className={`${resultNumColor}`}>
            {resultNum}
          </Typography>
          <Typography className={`${resultUnitColor}`} variant="body2">{unitType}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

SumReport.defaultProps = {
  ColorNum: "#1688C4",
};

export default SumReport;
