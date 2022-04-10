import { Box, Dialog, DialogActions, makeStyles, Typography } from "@material-ui/core";
import { ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionReducer } from "services/action.reducer";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { IStates } from "stores/root.reducer";
import convertDate from "utils/convertDate";
import prefix from "utils/path";


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
    // height: 700,
    lineHeight: 0,
    marginBottom: 20,
    [theme.breakpoints.down("xs")]: {
      // height: 315,
    },
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
  },
  boxView: {
    display: "flex",
    margin: 30,
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
    lineHeight: "20px",
    marginBottom: 5,
  },
  limit: {
    fontSize: 30,
    lineHeight: "30px",
    marginBottom: 5,
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
      marginBottom: 20,
    },
  },
  detailNews: {
    padding: 30,
    display: 'grid',

    "& strong": {
      lineHeight: "40px",
    },
    "& h4": {
      textAlign: 'center',
      fontSize: 34,
      lineHeight: "29px",
      marginBottom: 50,
    },
    "& p": {
      fontSize: 20,
      lineHeight: "24px",
      marginBottom: 20,
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

const ReWardDetail = () => {
  const classes = useStyles();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { buyRes } = useSelector((state: IStates) => state.homeReducer);
  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      dispatch(
        ActionReducer({
          type: HomeAction.REWARD_DETAIL_R,
          payload: { slug: slug }
        })
      )
    }

  }, [profile])
  const { rewardDetail } = useSelector((state: IStates) => state.homeReducer);
  const buyReward = () => {
    setOpenDialog(true)
    dispatch(
      ActionSaga({
        type: HomeAction.BUY_REWRAD_R,
        payload: { slug: rewardDetail.result.slug, user_id: profile.user_id },
      })
    );
  }
  const closeDialog = () => {
    setOpenDialog(false)
    dispatch(
      ActionReducer({
        type: HomeAction.BUY_REWRAD_S,
        payload: {}
      })
    )
    router.push({ pathname: '/health-point/health-history' })
  }

  return (
    <InnerLayout titlepage="แลกของรางวัล">
      <Box className={classes.root}>
        {
          Object.keys(rewardDetail).length > 0 && <>
            <Box className={classes.imgNews}>
              {rewardDetail?.result?.thumbnail ? (
                <img src={rewardDetail?.result?.thumbnail} alt="" />
              ) : (
                <img src={`${prefix}/images/gift.jpg`} alt="" />
              )}
            </Box>
            <Box className={classes.boxView}>

            </Box>
            <Box className={classes.detailNews}>
              <span className={classes.dateNews}>
                {convertDate(rewardDetail?.result?.start_date)}
              </span>
              <span className={classes.limit}>
                จำนวนรางวัลที่เหลือ {rewardDetail?.result?.limit_left} / {rewardDetail?.result?.limit_right}
              </span>
              <Typography variant="h4">{rewardDetail?.result?.title}</Typography>
              <div dangerouslySetInnerHTML={{ __html: rewardDetail?.result?.detailfull }} />
            </Box>
            <ControlButton justifycontent="center">
              {rewardDetail?.result?.limit_left === 0 ?
                <ButtonProps
                  titlebutton='สิทธิ์แลกรางวัลเต็มแล้ว'
                  maxwidthbtn="155px"
                  heightbtn="40px"
                  background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                  actionBtn={true}
                />
                : (
                  <ButtonProps
                    titlebutton={rewardDetail?.status ? 'คุณเคยแลกรางวัลนี้แล้ว' : 'แลกของรางวัล'}
                    maxwidthbtn="155px"
                    heightbtn="40px"
                    background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                    actionBtn={rewardDetail?.status}
                    onClick={() => {
                      buyReward()
                    }}
                  />
                )
              }
            </ControlButton>
            <br />
            <ControlButton justifycontent="center">
              <ButtonProps
                titlebutton='ประวัติการแลกของรางวัล'
                maxwidthbtn="155px"
                heightbtn="40px"
                // background="linear-gradient(to bottom, #E88EB2, #CC4467)"
                background="linear-gradient(to top, #8CA51E,  #D0FD08)"
                onClick={() => {
                  router.push('/health-point/health-history')
                }}
              />
            </ControlButton>
          </>
        }


      </Box>
      <Dialog open={openDialog} maxWidth="md" onClose={closeDialog}>
        <Box className={classes.dialog}>
          <Typography> {buyRes.message}</Typography>
          <DialogActions>
            <ButtonProps
              variant="contained"
              color="primary"
              marginbtn="10px 0"
              titlebutton="ปิด"
              maxwidthbtn="100%"
              onClick={closeDialog}
            />
          </DialogActions>
        </Box>
      </Dialog>
    </InnerLayout>
  );
};

export default ReWardDetail;
