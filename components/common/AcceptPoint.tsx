import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles(() => ({
  root: {
    height: 80,
    maxWidth: 80,
    width: "100%",
    backgroundColor: "#E96189",
    borderRadius: 5,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& span": {
      display: "inline-block",
      "& img": {
        verticalAlign: "middle",
      },
    },
    "& h4": {
      fontSize: 45,
      lineHeight: "26px",
    },
    "& p": {
      fontSize: 16,
      lineHeight: "24px",
    },
  },
  firstP: {
    display: "inline-block",
    fontSize: 16,
    lineHeight: "30px",
  },
}));

const AcceptPoint = (props: any) => {
  const classes = useStyles();
  const { accept = false, reduce = false, point } = props;
  return (
    <Box className={classes.root}>
      <Box>
        <p className={classes.firstP}>{accept && 'ได้รับ'}{reduce && 'ถูกหัก'}</p>
        {accept && (
          <span>
            <img src={`${prefix}/images/ic_up.svg`} alt="" />
          </span>
        )}
        {reduce && (
          <span>
            <img src={`${prefix}/images/ic_down.svg`} alt="" />
          </span>
        )}
      </Box>
      <Typography variant="h4">{point}</Typography>
      <Typography variant="body1">แต้มสุขภาพ</Typography>
    </Box>
  );
};

export default AcceptPoint;
