import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import prefix from "utils/path";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import router from "next/router";

const useStyles = makeStyles((theme: any) => ({
  section: {
    backgroundImage: "linear-gradient(to bottom, #2F8EDE, #5FACEF)",
    position: "relative",
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
    zIndex: 0,
    "& h2": {
      fontSize: 50,
      lineHeight: "60px",
      color: "#fff",
      textAlign: "center",
      marginBottom: 0,
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
        lineHeight: "40px",
      },
    },
  },
  root: {
    padding: "40px 0 20px 0",
    minHeight: 380,
    [theme.breakpoints.down("xs")]: {
      padding: "20px 0",
      minHeight: 280,
    },
  },
  slider: {
    padding: "50px 0 0 0",
    [theme.breakpoints.down(281)]: {
      padding: "20px 0 0 0",
    },
    // "& .slick-list": {
    //   margin: "0 -17.5px",
    //   padding: "50px 0 0 0",
    // },
    // "& .slick-arrow": {
    //   width: 74,
    //   height: 74,
    //   boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    //   opacity: "0.5",
    //   backgroundColor: "#fff",
    //   borderRadius: "100%",
    //   zIndex: 1,
    //   backgroundRepeat: "no-repeat",
    //   backgroundPosition: "center",
    //   [theme.breakpoints.down("xs")]: {
    //     width: 30,
    //     height: 30,
    //   },
    //   "&:hover": {
    //     opacity: "0.9",
    //   },
    // },
    // "& .slick-prev": {
    //   backgroundImage: `url(${prefix}/images/slick_left.svg)`,
    //   transform: "translate(-13%, -60%)",
    //   [theme.breakpoints.down("xs")]: {
    //     transform: "translate(50%, -80%)",
    //   },
    // },
    // "& .slick-next": {
    //   backgroundImage: `url(${prefix}/images/slick_right.svg)`,
    //   transform: "translate(20%, -60%)",
    //   [theme.breakpoints.down("xs")]: {
    //     transform: "translate(-50%, -80%)",
    //   },
    // },
    // "& .slick-prev:before, .slick-next:before": {
    //   display: "none",
    // },
  },
  bgSlider: {
    backgroundImage: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    height: 125,
    border: "1px solid #fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 40,
    [theme.breakpoints.down("xs")]: {
      height: 90,
      marginBottom: 20,
    },
    [theme.breakpoints.down(281)]: {
      maxHeight: 70,
      marginBottom: 10,
    },
    "& > img": {
      position: "relative",
      zIndex: 1,
      [theme.breakpoints.down("xs")]: {
        maxWidth: 100,
      },
      [theme.breakpoints.down(281)]: {
        maxWidth: 50,
      },
    },
  },
  imgResult: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    transform: "translate(0%, -45%)",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      transform: "translate(0%, -30%)",
    },
    [theme.breakpoints.down(281)]: {
      transform: "translate(0%, -13%)",
    },
    "& img": {
      margin: "0 auto",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 130,
      },
      [theme.breakpoints.down(281)]: {
        maxHeight: 80,
      },
    },
  },
  linkResult: {
    display: "block",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 40,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 20,
    },
    [theme.breakpoints.down(281)]: {
      marginBottom: 0,
    },
    "& span": {
      color: "#fff",
      fontSize: 36,
      textAlign: "center",
      display: "block",
      [theme.breakpoints.down("xs")]: {
        fontSize: 25,
      },
      [theme.breakpoints.down(281)]: {
        fontSize: 18,
      },
    },
  },
  bgLeft: {
    position: "absolute",
    top: "-10vh",
    left: 0,
    [theme.breakpoints.down("xs")]: {
      left: "-4vw",
      top: "-6vh",
    },
    "& img": {
      maxHeight: 174,
      transform: "rotate(180deg)",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 100,
      },
    },
  },
  bgRight: {
    position: "absolute",
    bottom: "-13vh",
    right: "-2vw",
    [theme.breakpoints.down("xs")]: {
      bottom: "-8vh",
      right: "-4vw",
    },
    "& img": {
      maxHeight: 206,
      [theme.breakpoints.down("xs")]: {
        maxHeight: 110,
      },
    },
  },
}));

const SectionC = () => {
  const classes = useStyles();
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   autoplay: false,
  //   speed: 800,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1025,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 769,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  return (
    <section className={classes.section}>
      <Box className={classes.bgLeft}>
        <img src={`${prefix}/images/bg_footer_right.png`} alt="" />
      </Box>
      <Box className={classes.bgRight}>
        <img src={`${prefix}/images/bg_footer_right.png`} alt="" />
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.root}>
          <Typography variant="h2">ส่งผลการออกกำลังกาย</Typography>
          <Box className={classes.slider}>
            <Grid container spacing={3}>
              <Grid item md={2} sm={4} xs={4}>
                <Box
                  className={classes.linkResult}
                  onClick={() =>
                    router.push({
                      pathname: "/results-exercise/form",
                      query: { activity_id: 1 },
                    })
                  }
                >
                  <Box className={classes.bgSlider}>
                    <img src={`${prefix}/images/slide_result02.svg`} alt="" />
                    <Box className={classes.imgResult}>
                      <img src={`${prefix}/images/img_result02.svg`} alt="" />
                    </Box>
                  </Box>
                  <Typography component="span">เดิน - วิ่ง</Typography>
                </Box>
              </Grid>
              <Grid item md={2} sm={4} xs={4}>
                <Box
                  className={classes.linkResult}
                  onClick={() =>
                    router.push({
                      pathname: "/results-exercise/form",
                      query: { activity_id: 2 },
                    })
                  }
                > 
                  <Box className={classes.bgSlider}>
                    <img src={`${prefix}/images/slide_result03.svg`} alt="" />
                    <Box className={classes.imgResult}>
                      <img src={`${prefix}/images/img_result03.svg`} alt="" />
                    </Box>
                  </Box>
                  <Typography component="span">ปั่นจักรยาน</Typography>
                </Box>
              </Grid>
              <Grid item md={2} sm={4} xs={4}>
                <Box
                  className={classes.linkResult}
                  onClick={() =>
                    router.push({
                      pathname: "/results-exercise/form",
                      query: { activity_id: 3 },
                    })
                  }
                >
                  <Box className={classes.bgSlider}>
                    <img src={`${prefix}/images/slide_result04.svg`} alt="" />
                    <Box className={classes.imgResult}>
                      <img src={`${prefix}/images/img_result04.svg`} alt="" />
                    </Box>
                  </Box>
                  <Typography component="span">เวทเทรนนิ่ง</Typography>
                </Box>
              </Grid>
              <Grid item md={2} sm={4} xs={4}>
                <Box
                  className={classes.linkResult}
                  onClick={() =>
                    router.push({
                      pathname: "/results-exercise/form",
                      query: { activity_id: 4 },
                    })
                  }
                >
                  <Box className={classes.bgSlider}>
                    <img src={`${prefix}/images/slide_result05.svg`} alt="" />
                    <Box className={classes.imgResult}>
                      <img src={`${prefix}/images/img_result05.svg`} alt="" />
                    </Box>
                  </Box>
                  <Typography component="span">แอโรบิค</Typography>
                </Box>
              </Grid>
              <Grid item md={2} sm={4} xs={4}>
                <Box
                  className={classes.linkResult}
                  onClick={() =>
                    router.push({ pathname: "/results-exercise/form" })
                  }
                >
                  <Box className={classes.bgSlider}>
                    <img src={`${prefix}/images/slide_result06.svg`} alt="" />
                    <Box className={classes.imgResult}>
                      <img src={`${prefix}/images/img_result06.svg`} alt="" />
                    </Box>
                  </Box>
                  <Typography component="span">อื่นๆ</Typography>
                </Box>
              </Grid>
              <Grid item md={2} sm={4} xs={4}>
                <Box
                  className={classes.linkResult}
                  onClick={() =>
                    router.push({ pathname: "/results-exercise/lung" })
                  }
                >
                  <Box className={classes.bgSlider}>
                    <img src={`${prefix}/images/slide_result01.svg`} alt="" />
                    <Box className={classes.imgResult}>
                      <img src={`${prefix}/images/img_result01.svg`} alt="" />
                    </Box>
                  </Box>
                  <Typography component="span">บริหารปอด</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default SectionC;
