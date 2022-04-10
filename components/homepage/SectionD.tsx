import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CardHealth } from "components/common";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import prefix from "utils/path";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ButtonProps } from "components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
// import convertDate from "utils/convertDate";
import { ProfileAction } from "stores/profile/profile.action";
import router from "next/router";

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#449AE3",
    minHeight: 380,
    borderRadius: 5,
    marginBottom: 25,
    padding: "20px 35px 15px 35px",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 10px 15px 10px",
    },
    "& h2": {
      color: "#fff",
      fontSize: 60,
      lineHeight: "50px",
      fontFamily: "DBHeavent_BoldCond",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
      },
      "& img": {
        marginRight: 12,
        [theme.breakpoints.down("xs")]: {
          maxHeight: 26,
        },
      },
    },
    "& .slick-list": {
      margin: "0 -5px",
    },
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: 30,
  },
  point: {
    borderLeft: "1px solid #fff",
    paddingLeft: 30,
    marginLeft: 30,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 15,
      marginLeft: 15,
    },
    "& p:first-child": {
      color: "#fff",
      fontSize: 22,
      lineHeight: "21px",
      [theme.breakpoints.down("xs")]: {
        fontSize: 15,
      },
    },
    "& p:nth-child(2)": {
      color: "#D0FD08",
      fontSize: 64,
      lineHeight: "40px",
      fontFamily: "DBHeavent_BoldCond",
      display: "inline-block",
      [theme.breakpoints.down("xs")]: {
        fontSize: 50,
        lineHeight: "28px",
      },
    },
    "& span": {
      display: "inline-block",
      color: "#fff",
      fontSize: 18,
      lineHeight: "20px",
    },
  },
  slider: {
    marginBottom: 35,
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 40,
    },
    "& .slick-dots li button:before": {
      fontSize: 9,
      color: "#C9C9C9",
    },
    "& .slick-dots li.slick-active button:before": {
      color: "#D0FD08",
    },
    "& .slick-dots li": {
      margin: 0,
    },
    "& .slick-dots": {
      [theme.breakpoints.down("xs")]: {
        bototm: "-30px",
      },
    },
  },
  boxCenter: {
    textAlign: "center",
    marginBottom: 30,
    "& h3": {
      fontSize: 60,
      lineHeight: "50px",
      color: "#D0FD08",
    },
    "& h4": {
      fontSize: 34,
      lineHeight: "34px",
      color: "#D0FD08",
      marginBottom: 5,
    },
  },
  dialog: {
    margin: "20px",
    textAlign: "center",
    width: "300px",
    "& button": {
      background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
  },
}));

const SectionD = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { rewardList, buyRes } = useSelector(
    (state: IStates) => state.homeReducer
  );
  const [sliderLength, setSliderLength] = useState(4);
  const [openDialog, setOpenDialog] = React.useState(false);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.REWARD_LIST_R,
        payload: { take: 6, page: 1 },
      })
    );
  }, []);
  useEffect(() => {
    if (rewardList?.records?.length > 0) {
      setSliderLength(rewardList.records.length);
    }
  }, [rewardList]);

  const CloseDialog = () => {
    if (buyRes.status === 201) {
      dispatch(
        ActionSaga({
          type: HomeAction.REWARD_LIST_R,
          payload: { take: 6, page: 1 },
        })
      );
    }
    dispatch(
      ActionSaga({
        type: ProfileAction.PROFILE_R,
      })
    );
    setOpenDialog(false);
  };
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 800,
    slidesToShow: sliderLength >= 6 ? 6 : sliderLength,
    // slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: sliderLength >= 4 ? 4 : sliderLength,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: sliderLength >= 3 ? 3 : sliderLength,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: sliderLength >= 2 ? 2 : sliderLength,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section>
      <Container maxWidth="lg">
        <Box className={classes.root}>
          <Box className={classes.topSection}>
            <Typography variant="h2">
              <img src={`${prefix}/images/ic_cup.svg`} alt="" />
              แต้มสุขภาพ
            </Typography>
            <Box className={classes.point}>
              <p>คะแนนสะสม</p>
              <p>{profile.hp_total || 0}</p>&nbsp;
              <span>แต้ม</span>
            </Box>
          </Box>
          <Box className={classes.slider}>
            <Slider {...settings}>
              {rewardList.total_record > 0 &&
                rewardList.records.map((item: any, index: number) => {
                  return (
                    <CardHealth
                      key={index}
                      image={item.thumbnail}
                      point={item.point}
                      permission={`${item.limit_left} / ${item.limit_right}`}
                      name={item.title}
                      margin="0 5px"
                      des={item.detail}
                      slug={item.id}
                    />
                  );
                })}
            </Slider>
          </Box>
          <ButtonProps
            titlebutton="ดูเพิ่มเติม"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn=" 5px 10px 10px 10px"
            heightbtn="40px"
            maxwidthbtn="167px"
            fontsizebtn="22px"
            marginbtn="0 auto"
            onClick={() => router.push('/health-point/redemption')}
          />
        </Box>
      
        <Box>
          <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
            <Box className={classes.dialog}>
              <Typography variant="h4">
                {buyRes?.message || <CircularProgress />}
              </Typography>
              <DialogActions>
                <ButtonProps
                  variant="contained"
                  color="primary"
                  marginbtn="10px 0"
                  titlebutton="ปิด"
                  maxwidthbtn="100%"
                  onClick={CloseDialog}
                />
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      </Container>
    </section>
  );
};

export default SectionD;
