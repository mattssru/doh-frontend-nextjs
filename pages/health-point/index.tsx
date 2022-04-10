import {
  Box,
  CircularProgress,
  Grid, makeStyles,
  Typography
} from "@material-ui/core";
import { AcceptPoint, ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconCupmd } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import PaginationCustom from "components/PaginationCustom";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import HealthAction from "stores/health/health.action";
import { IStates } from "stores/root.reducer";
import convertDate from "utils/convertDate";
import prefix from "utils/path";

const useStyles = makeStyles((theme: any) => ({
  boxBg: {
    cursor: 'pointer',
    backgroundColor: "#449AE3",
    minHeight: 100,
    borderRadius: 5,
    position: "relative",
    backgroundImage: `url(${prefix}/images/bg_small.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "auto",
    maxWidth: 800,
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 15px",
    color: "#fff",
    flexDirection: "column",
    "& h2": {
      fontSize: 45,
      lineHeight: "40px",
      "& img": {
        height: 26,
        marginRight: 20,
      },
    },
    "& p": {
      fontSize: 30,
      lineHeight: "26px",
    },
  },
  title: {
    fontSize: 30,
    lineHeight: "30px",
    marginBottom: 10,
    textAlign: "center",
  },
  boxBottom: {
    backgroundColor: "#449AE3",
    minHeight: 110,
    borderRadius: 5,
    position: "relative",
    backgroundImage: `url(${prefix}/images/bg_mg.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "auto",
    maxWidth: 800,
    margin: "0 auto 30px",
    padding: "18px 20px 12px 20px",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto 10px",
    },
  },
  textYellow: {
    color: "#FFE200",
    fontSize: 16,
    lineHeight: "20px",
  },
  textWhite: {
    color: "#fff",
    fontSize: 20,
    lineHeight: "20px",
    fontFamily: "DBHeavent_BoldCond",
  },
  resultGreen: {
    color: "#D0FD08",
    fontSize: 45,
    lineHeight: "30px",
    display: "inline-block",
    "& span": {
      color: "#fff",
      fontSize: 16,
      lineHeight: "20px",
      display: "block",
      textAlign: "center",
    },
  },
  textGreen: {
    color: "#D0FD08",
    fontSize: 16,
    lineHeight: "20px",
  },
}));

const HealthPoint = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      dispatch(
        ActionSaga({
          type: HealthAction.HP_HISTORY_R,
          payload: { take: 10, page: page },
        })
      );
    }
  }, [profile]);
  const { healthHistory } = useSelector(
    (state: IStates) => state.healthReducer
  );
  const handleChagePage = (page: number) => {
    dispatch(
      ActionSaga({
        type: HealthAction.HP_HISTORY_R,
        payload: { take: 10, page: page },
      })
    );
    setPage(page);
  };
  return (
    <InnerLayout titlepage="แต้มสุขภาพ">
      <Box className={classes.boxBg} onClick={() => router.push('/health-point/condition')}>
        {/* <Link href="https://doh.2fellows.com/health-point/condition"> */}
        <Typography variant="h2">
          <img src={`${prefix}/images/ic_cup.svg`} alt="" />
          แต้มสุขภาพ
        </Typography>
        <p>ได้รับอย่างไร ?</p>
        {/* </Link> */}
      </Box>
      <Typography variant="h3" className={classes.title}>
        ประวัติการสะสม แต้มสุขภาพ
      </Typography>
      {healthHistory?.records?.length > 0 ? (
        healthHistory.records.map((item: any, _key: number) => {
          if (item.flag === "M") {
            return (
              <Box className={classes.boxBottom}>
                <Grid container spacing={0} alignItems="flex-start">
                  <Grid xs={8}>
                    <Box>
                      <p className={classes.textYellow}>
                        {convertDate(item.created_at)}
                      </p>
                      <p className={classes.textWhite}>{item.header}</p>
                      <p className={classes.textGreen}>{item.text}</p>
                    </Box>
                  </Grid>
                  <Grid
                    xs={4}
                    justifyContent="flex-end"
                    style={{ display: "flex" }}
                  >
                    {item.header.slice(0, 6) === "คุณถูก" ? (
                      <AcceptPoint reduce point={item.point} />
                    ) : (
                      <AcceptPoint accept point={item.point} />
                    )}
                  </Grid>
                </Grid>
              </Box>
            );
          } else if (item.flag === "A") {
            return (
              <Box className={classes.boxBottom}>
                <Grid container spacing={0} alignItems="flex-end">
                  <Grid xs={8}>
                    <Grid container spacing={0} alignItems="flex-end">
                      <Grid item xs={4}>
                        <Box>
                          <p className={classes.textYellow}>
                            {convertDate(item.created_at)}
                          </p>
                          <p className={classes.textWhite}>
                            ส่งผล{item.header}
                          </p>
                        </Box>
                        <Typography
                          variant="h4"
                          className={classes.resultGreen}
                        >
                          {item.time}
                          <span>นาที</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="h4"
                          className={classes.resultGreen}
                        >
                          {item.distant}
                          <span>กิโลเมตร</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="h4"
                          className={classes.resultGreen}
                        >
                          {item.calories}
                          <span>แคลอรี่</span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    xs={4}
                    justifyContent="flex-end"
                    style={{ display: "flex" }}
                  >
                    <AcceptPoint accept point={item.point} />
                  </Grid>
                </Grid>
              </Box>
            );
          }
        })
      ) : (
        <ControlButton justifycontent="center">
          <CircularProgress />
        </ControlButton>
      )}
      <PaginationCustom
        count={healthHistory.total_page}
        boundaryCount={1}
        siblingCount={0}
        onChangePage={handleChagePage}
      />
      <ButtonProps
        titlebutton="กลับหน้าแลกของรางวัล"
        widthbtn="100%"
        maxwidthbtn="315px"
        marginbtn="25px auto 0"
        backgroundcolorbtn="#E96189"
        startIcon={<IconCupmd />}
        onClick={() => {
          router.push({ pathname: "/health-point/redemption" });
        }}
      />
    </InnerLayout>
  );
};

export default HealthPoint;
