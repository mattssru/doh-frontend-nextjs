import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import Slider from "react-slick";
import prefix from "utils/path";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme: any) => ({
  section: {
    marginBottom: 60,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 35,
    },
  },
  root: {
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
  },
  imageBanner: {
    width: '100%',
    "& img": {
      width: "100%",
      height: "100%",
      // objectFit: "cover",
      borderRadius: 5,
    },
  },
}));

const SectionE = () => {
  const classes = useStyles();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className={classes.section}>
      <Container maxWidth="lg">
        <Box className={classes.root}>
          <Slider {...settings}>
            <Box className={classes.imageBanner}>
              <img src={`${prefix}/images/banner_slide_1.jpg`} alt="" />
            </Box>
            <Box className={classes.imageBanner}>
              <img src={`${prefix}/images/banner_slide_2.jpg`} alt="" />
            </Box>
            <Box className={classes.imageBanner}>
              <img src={`${prefix}/images/banner_slide_3.jpg`} alt="" />
            </Box>
          </Slider>
        </Box>
      </Container>
    </section>
  );
};

export default SectionE;
