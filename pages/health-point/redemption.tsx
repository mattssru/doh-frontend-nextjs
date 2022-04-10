import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { CardHealth } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import PaginationCustom from "components/PaginationCustom";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { ProfileAction } from "stores/profile/profile.action";
import { IStates } from "stores/root.reducer";
// import convertDate from "utils/convertDate";
import prefix from "utils/path";

const useStyles = makeStyles((theme: Theme) => ({
  boxTop: {
    backgroundColor: "#E96189",
    borderRadius: 5,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: 800,
    height: 100,
    margin: "0 auto 30px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
    "& img": {
      marginRight: 10,
    },
    "& p": {
      color: "#fff",
      fontSize: 24,
      lineHeight: "24px",
    },
    "& h2": {
      color: "#fff",
      fontSize: 72,
      lineHeight: "50px",
      "& span": {
        fontSize: 20,
        color: "#fff",
        verticalAlign: "middle",
      },
    },
  },
  boxBottom: {
    backgroundColor: "#449AE3",
    padding: "20px 20px 40px 20px",
    backgroundSize: "auto",
    borderRadius: 5,
    maxWidth: 800,
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 15px 40px 15px",
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

const redemption = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rewardList, buyRes } = useSelector(
    (state: IStates) => state.homeReducer
  );
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = React.useState(false);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.REWARD_LIST_R,
        payload: { take: 18, page: page },
      })
    );
  }, []);
  const handleChagePage = (page: number) => {
    dispatch(
      ActionSaga({
        type: HomeAction.REWARD_LIST_R,
        payload: { take: 18, page: page },
      })
    );
    setPage(page);
  };
  const CloseDialog = () => {
    if (buyRes.status === 201) {
      dispatch(
        ActionSaga({
          type: HomeAction.REWARD_LIST_R,
          payload: { take: 18, page: page },
        })
      );
      dispatch(
        ActionSaga({
          type: ProfileAction.PROFILE_R,
        })
      );
    }
    setOpenDialog(false);
  };

  return (
    <InnerLayout titlepage="แลกลุ้นของรางวัล">
      <Link href="/health-point" className={classes.boxTop}>
        <p>คุณมี</p>
        <Typography variant="h2">
          <img src={`${prefix}/images/ic_cup_yellow.svg`} alt="" />
          {profile.hp_total || 0}&nbsp;<span>แต้ม</span>
        </Typography>
      </Link>
      <Box className={classes.boxBottom}>
        <Grid container spacing={2} style={{ marginBottom: 25 }}>
          {rewardList.records &&
            rewardList.records.map((item: any, index: number) => {
              return (
                <Grid item sm={4} xs={6} id={item.slug}>
                  <CardHealth
                    key={index}
                    image={item.thumbnail}
                    point={item.point}
                    permission={`${item.limit_left} / ${item.limit_right}`}
                    name={item.title}
                    des={item.detail}
                    margin="0 5px"
                    slug={item.id}
                  />
                </Grid>
              );
            })}
        </Grid>
        <PaginationCustom
          count={rewardList.total_page}
          boundaryCount={1}
          siblingCount={0}
          onChangePage={handleChagePage}
        />
        <ButtonProps
          titlebutton="ประวัติการแลกของรางวัล"
          maxwidthbtn="167px"
          widthbtn="100%"
          marginbtn="0 auto"
          heightbtn="40px"
          background="linear-gradient(to top, #8CA51E,  #D0FD08)"
          onClick={() => router.push('/health-point/health-history')}
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
    </InnerLayout>
  );
};

export default redemption;
