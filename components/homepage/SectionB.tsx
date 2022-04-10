import { Box, Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import Slider from "react-slick";
import prefix from "utils/path";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { IStates } from "stores/root.reducer";

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginBottom: 50,
    position: "relative",
    zIndex: 1,
    "& .slick-dots li button:before": {
      fontSize: 9,
      color: "#C9C9C9",
    },
    "& .slick-dots li.slick-active button:before": {
      color: "#D0FD08",
    },
  },
  imageBanner: {
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: 180,
    },
    "& img": {
      width: "100%",
      height: "100%",
      // objectFit: "cover",
      objectFit: "contain",
    },
  },
  bgBanner: {
    position: "absolute",
    top: "50%",
    right: 0,
    zIndex: -1,
    transform: "translate(50%, -50%)",
    "& img": {
      maxWidth: "100%",
      maxHeight: "605px",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 300,
      },
    },
  },
}));

const SectionB = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.BANNER_R
      })
    )
  }, [])

  const { bannerList } = useSelector((state: IStates) => state.homeReducer);

  return (
    <section style={{ position: "relative" }}>
      <Box className={classes.bgBanner}>
        <img src={`${prefix}/images/bg_v.png`} alt="" />
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.root}>
          {Object.keys(bannerList).length ?
            <Slider {...settings}>
              {bannerList.map((item: any) => {
                return <Box className={classes.imageBanner}>
                  <img
                    src={item.url}
                    alt=""
                    onClick={() => {
                      window.open(`${item.link}`, "_blank");
                    }}
                  />
                </Box>
              })}
            </Slider>
            :
            <>
              <Slider {...settings}>
                <Box className={classes.imageBanner}>
                  <img
                    src={`${prefix}/images/banner_2.jpg`}
                    alt=""
                    onClick={() => {
                      window.open("https://activefam.anamai.moph.go.th/", "_blank");
                    }}
                  />
                </Box>
                <Box className={classes.imageBanner}>
                  <img src={`${prefix}/images/banner.jpg`} alt="" />
                </Box>
              </Slider>
            </>}
        </Box>
      </Container>
    </section>
  );
};

export default SectionB;
