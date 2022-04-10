import { Box, Grid, Link, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {},
  imgCard: {
    display: "block",
    width: "100%",
    height: 97,
    lineHeight: 0,
    "& img": {
      borderRadius: 12,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "all 0.2s ease-in",
      "&:hover": {
        transition: "all 0.2s ease-in",
      },
    },
  },
  detailCard: {
    "& span": {
      fontSize: 20,
      lineHeight: "24px",
      color: "#AAAAAA",
      display: "block",
    },
    "& a": {
      color: "#000",
      fontSize: 24,
      lineHeight: "29px",
      height: 29,
      display: "block",
      overflow: "hidden",
      marginBottom: 5,
      "&:hover": {
        color: "#2F8EDE",
      },
    },
    "& p": {
      fontSize: 20,
      lineHeight: "20px",
      height: 40,
      display: "block",
      overflow: "hidden",
    },
  },
}));

const CardNewList = (props: any) => {
  const classes = useStyles();
  const { image, date, link, des, title } = props;
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Link className={classes.imgCard}>
            <img src={image} alt="" />
          </Link>
        </Grid>
        <Grid item xs={9}>
          <Box className={classes.detailCard}>
            <span>{date}</span>
            <Link href={link}>{title}</Link>
            <p>{des}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardNewList;
