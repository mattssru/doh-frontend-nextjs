import { Box, Container, Link, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionSaga } from 'services/action.saga';
import { HomeAction } from 'stores/home/home.action';
import { IStates } from 'stores/root.reducer';
import { numberWithCommas } from 'utils/numberHelper';
import prefix from 'utils/path';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundImage: `url(${prefix}/images/section_f.png)`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    minHeight: 500,
    padding: "30px 0 35px 0",
    marginBottom: 20,
    fontWeight: 'bold',
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "auto",
      backgroundPosition: "left",
    },
    [theme.breakpoints.down("xs")]: {
      backgroundSize: "auto 100%",
      backgroundPosition: "left",
      minHeight: 400,
    },
  },
  headline: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 15,
    },
    "& h2": {
      display: "flex",
      alignItems: "center",
      fontSize: 80,
      lineHeight: "63px",
      color: "#54469B",
      [theme.breakpoints.down("sm")]: {
        fontSize: 60,
        lineHeight: "60px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
      },
      "& img": {
        marginRight: 28,
        [theme.breakpoints.down("sm")]: {
          maxHeight: 70,
        },
        [theme.breakpoints.down("xs")]: {
          maxHeight: 44,
          marginRight: 15,
        },
      },
    },
  },
  maxWidthSection: {
    maxWidth: 700,
    margin: "0 auto",
    position: "relative",
  },
  boxIn: {
    display: "flex",
    justifyContent: "space-between",
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: 68,
    height: 68,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "100%",
    marginRight: 15,
    [theme.breakpoints.down("xs")]: {
      width: 34,
      height: 34,
      marginRight: 5,
    },
    "& img": {
      [theme.breakpoints.down("xs")]: {
        height: 19,
      },
    },
  },
  lastLine: {
    [theme.breakpoints.down("xs")]: {
      marginTop: '-35px',
    },
  },
  result: {
    "& p": {
      fontSize: 33,
      lineHeight: "30px",
      color: "#2C569F",
      [theme.breakpoints.down("xs")]: {
        fontSize: 17,
        lineHeight: "20px",
      },
    },
    "& h3": {
      fontSize: 64,
      lineHeight: "50px",
      color: "#E96189",
      fontFamily: "DBHeavent_Cond",
      fontWeight: '800',
      [theme.breakpoints.down("xs")]: {
        fontSize: 33,
        lineHeight: "24px",
      },
    },
    "& span": {
      fontSize: 33,
      lineHeight: "30px",
      color: "#2C569F",
      [theme.breakpoints.down("xs")]: {
        fontSize: 17,
        lineHeight: "20px",
      },
    },
    "& span.MuiSkeleton-text": {
      height: '1em',
      width: '4em',
      marginRight: "8px",
      display: "inline-block"
    }
  },
  fullWidth: {
    backgroundImage: `url(${prefix}/images/bg_opacity.png)`,
    padding: "15px 0",
    margin: "10px 0",
  },
  imgLink: {
    "& img": {
      maxHeight: 115,
      transition: "all 0.2s ease-in",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 80,

      },
      "&:hover": {
        transition: "all 0.2s ease-in",
      },
    },
  },
  textAbsolut: {
    fontSize: 60,
    color: "#2C569F",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(0, -50%)",
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  conText: {
    color: '#900C3F',
    fontSize: 18,
    paddingLeft: 40,

  }
}));

const SectionF = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { satistics, isLoading } = useSelector((state: IStates) => state.homeReducer)
  useEffect(() => {
    const fetchSatistic = () => {
      dispatch(
        ActionSaga({
          type: HomeAction.FETCH_SATISTICS_R
        })
      )
    }
    fetchSatistic()
  }, [])

  return (
    <section className={classes.root}>
      <Box className={classes.headline}>
        <Container maxWidth="lg">
          <Typography variant="h2">
            <img src={`${prefix}/images/ic_winnig.svg`} alt="" />
            ก้าวท้าใจ ร่วมก้าวไปด้วยกัน
          </Typography>
        </Container>
      </Box>
      <Box className={classes.maxWidthSection}>
        <Container maxWidth="lg">
          <Box className={classes.boxIn}>
            <Box className={classes.item}>
              <Box className={classes.icon}>
                <img src={`${prefix}/images/ic_user.svg`} alt="" />
              </Box>
              <Box className={classes.result}>
                <p>สมาชิก</p>
                <Typography variant="h3">
                  {isLoading ? (<Skeleton variant="text" />) : numberWithCommas(satistics?.user_count?.total)}
                  <span>คน</span>
                </Typography>
              </Box>
            </Box>
            <Box className={classes.item}>
              <Box className={classes.icon}>
                <img src={`${prefix}/images/ic_earth.svg`} alt="" />
              </Box>
              <Box className={classes.result}>
                <p>ก้าวรอบโลก</p>
                <Typography variant="h3">
                  {isLoading ? (<Skeleton variant="text" />) : numberWithCommas(satistics?.exercise_list?.sumdistance)}
                  <span>รอบ</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box className={classes.fullWidth}>
        <Box className={classes.maxWidthSection}>
          <Container maxWidth="lg">
            <Box className={classes.boxIn}>
              <Box className={classes.item} style={{ flex: "1 auto" }}>
                <Box className={classes.icon}>
                  <img src={`${prefix}/images/ic_fire.svg`} alt="" />
                </Box>
                <Box className={classes.result}>
                  <p>เผาผลาญพลังงานไป</p>
                  <Typography variant="h3">
                    {isLoading ? <Skeleton variant="text" /> : numberWithCommas(satistics?.exercise_list?.total_calories)}
                    <span>Kcal</span>
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.item} style={{ flex: "1 1" }}>
                <Box className={classes.result}>
                  <p>เผาผลาญไขมัน</p>
                  <Typography variant="h3">
                    {isLoading ? <Skeleton variant="text" /> : numberWithCommas(satistics?.exercise_list?.sumcaloriesburn)}
                    <span>kg.</span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <Box className={classes.maxWidthSection}>
        <Container maxWidth="lg">
          <Box className={classes.boxIn}>
            <Box className={classes.item}>
              <div className={classes.lastLine}>
                <Box className={classes.icon}>
                  <img src={`${prefix}/images/ic_point.svg`} alt="" />
                </Box>
              </div>
              <Box className={classes.result}>
                <div className={classes.lastLine}>
                  <p>สะสมแต้มสุขภาพแล้ว</p>
                  <Typography variant="h3">
                    {isLoading ? <Skeleton variant="text" /> : numberWithCommas(satistics?.exercise_list?.total_hp)}
                    <span>คะแนน</span>
                  </Typography>
                </div>
              </Box>
            </Box>
            <Box className={classes.item}>
              <Link href="/health-point/achievements" className={classes.imgLink}>
                <img src={`${prefix}/images/img_link.svg`} alt="" />
              </Link>
            </Box>
          </Box>

        </Container>
        <p className={classes.conText}>*ตัดยอดทุกเที่ยงคืน</p>
      </Box>
    </section>
  );
};

export default SectionF;
