import { Box, Grid, Link, makeStyles } from "@material-ui/core";
import React from "react";
import { ActionSaga } from "services/action.saga";
import { useDispatch } from "react-redux";
import { HomeAction } from "stores/home/home.action";
import { ProfileAction } from "stores/profile/profile.action";
import { ButtonProps } from "./button";
import { Iconviewmore } from "./icon";

const useStyles = makeStyles(() => ({
  root: {},
  imgCard: {
    display: "block",
    width: "100%",
    height: 155,
    lineHeight: 0,
    cursor: 'pointer',
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
    "& a": {
      fontSize: 22,
      lineHeight: "20px",
      color: "#70B642",
      display: "block",
      height: 40,
      overflow: "hidden",
      marginBottom: 15,
      fontFamily: "DBHeavent_BoldCond",
      "&:hover": {
        color: "#2F8EDE",
      },
    },
    "& p": {
      fontSize: 22,
      lineHeight: "20px",
      display: "block",
      height: 61,
      overflow: "hidden",
      marginBottom: 10,
    },
  },
}));

const CardKnowledgeHealth = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { image, link, title, des, slug } = props;
  const clickRead = () => {
    dispatch(
      ActionSaga({
        type: HomeAction.CLICK_NEWS_R,
        payload: { slug: slug },
        onSuccess: () => {
          dispatch(
            ActionSaga({
              type: ProfileAction.PROFILE_R,
            })
          );
        }
      })
    )
    window.open(link, '_blank');
  }
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box className={classes.imgCard}>
            <img src={image} alt="" onClick={clickRead} />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.detailCard}>
            <Link onClick={clickRead}>{title}</Link>
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
            onClick={clickRead}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardKnowledgeHealth;
