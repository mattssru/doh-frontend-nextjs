import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: `auto`,
    display: `flex`,
    // marginBottom: 15,
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
      position: `relative`,
      marginRight: 15,
      [theme.breakpoints.down("xs")]: {
        maxWidth: `25px`,
        marginRight: `10px`,
      },
    },
    "& .MuiTypography-h2": {
      fontSize: (props: any) => props.fontsize || `50px`,
      lineHeight: (props: any) => props.lineheight || `60px`,
      wordBreak: `break-all`,
      [theme.breakpoints.down("md")]: {
        lineHeight: `80px`,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: `50px`,
        lineHeight: `50px`,
      },
    },
    "& .MuiTypography-h3": {
      fontSize: `60px`,
      lineHeight: `24px`,
      color: `#1688C4`,
      marginBottom: `20px`,
    },
    "& .MuiTypography-body1 ,& .MuiTypography-body2": {
      fontSize: `20px`,
      lineHeight: `24px`,
      [theme.breakpoints.down("xs")]: {
        fontSize: `20px`,
      },
    },
    "& .MuiTypography-body2": {
      color: `#AAAAAA`,
    },
  },
  resultNumColor: {
    color: (props: any) => props.ColorNum,
  },
  controlFlex: {
    display: (props: any) => props.display,
    alignItems: "center",
    "& p:last-child": {
      paddingLeft: 5,
    },
  },
}));
const ResultNumber = (props: any) => {
  const classes = useStyles(props);
  const { resultNumColor, root } = useStyles(props);
  const { imageUnitType, unit, resultNum, unitType } = props;
  return (
    <Box className={`${root}`}>
      <Box className={classes.point}>
        <Box component="span">
          <img src={imageUnitType} alt="" />
        </Box>
        <Box component="span" className={classes.controlFlex}>
          <Typography variant="body1">{unit}</Typography>
          <Typography variant="h2" className={`${resultNumColor}`}>
            {resultNum}
          </Typography>
          <Typography variant="body2">{unitType}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultNumber;
