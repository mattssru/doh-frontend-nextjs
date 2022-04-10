import { Box, makeStyles, Typography } from "@material-ui/core";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionReducer } from "services/action.reducer";
import { HomeAction } from "stores/home/home.action";
import { IStates } from "stores/root.reducer";
import convertDate from "utils/convertDate";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    borderRadius: 5,
    backgroundColor: "#fff",
    // maxWidth: 800,
    // margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 15px",
    },
  },
  imgNews: {
    height: 700,
    lineHeight: 0,
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      height: 315,
    },
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
  },
  boxView: {
    display: "flex",
    marginBottom: 20,
  },
  itemView: {
    color: "#AAAAAA",
    fontSize: 24,
    lineHeight: "26px",
    display: "flex",
    alignItems: "center",
    marginRight: 15,
    "&:hover": {
      color: "#2F8EDE",
    },
    "& img": {
      marginRight: 10,
      // verticalAlign: "middle",
    },
  },
  dateNews: {
    color: "#AAAAAA",
    fontSize: 20,
    lineHeight: "24px",
    marginBottom: 5,
  },
  detailNews: {
    "& h4": {
      fontSize: 24,
      lineHeight: "29px",
      marginBottom: 5,
    },
    "& p": {
      fontSize: 20,
      lineHeight: "24px",
      marginBottom: 20,
    },
  },
}));

const NewsDetail = () => {
  const classes = useStyles();
  const { slug } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      ActionReducer({
        type: HomeAction.ANAMAI_DETAIL_R,
        payload: { slug: slug }
      })
    )
  }, [])
  const { anamaiDetail } = useSelector((state: IStates) => state.homeReducer);
  // console.log('date', convertDate(anamaiDetail.start_date))

  return (
    <InnerLayout titlepage="ข่าวสารจากกรมอนามัย">
      <Box className={classes.root}>
        <Box className={classes.imgNews}>
          <img src={anamaiDetail.thumbnail} alt="" />
        </Box>
        <Box className={classes.boxView}>
          {/* <Link className={classes.itemView}>
            <img src={`${prefix}/images/ic_view.svg`} alt="" />
            400
          </Link> */}
          {/* <Link className={classes.itemView}>
            <img src={`${prefix}/images/ic_share.svg`} alt="" />
            290
          </Link> */}
        </Box>
        <Box className={classes.detailNews}>
          <span className={classes.dateNews}> {convertDate(anamaiDetail.start_date)} </span>
          <Typography variant="h4">{anamaiDetail.title}</Typography>
          <p>{anamaiDetail.desc}</p>

        </Box>
      </Box>
    </InnerLayout>
  );
};

export default NewsDetail;
