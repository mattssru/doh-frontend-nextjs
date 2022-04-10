import React, { useState } from "react";
import {
  makeStyles,
  Box,
  Dialog,
  Typography,
  DialogActions,
} from "@material-ui/core";
import { ModalDefault } from "./common";
import QRCode from "react-qr-code";
import { ButtonProps } from "./common/button";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import HealthAction from "stores/health/health.action";
import { ActionReducer } from "services/action.reducer";
import { IStates } from "stores/root.reducer";
var Barcode = require('react-barcode');


const useStyles = makeStyles((theme: any) => ({
  root: {

  },
  dialog: {
    margin: "20px",
    textAlign: "center",
    width: "300px",
    "& button": {
      // background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
  },
  barcode: {
    margin: 40,
    padidng: 50,
  },
  textButtonInfo: {
    color: "red",
    textAlign: "center",
    fontFamily: "DBHeavent_Cond",
    fontSize: "20px",
  }
}))
const RewardHistoryDetail = (props: any) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { rewardCode, openDialog, setOpenDialog, rewardSlug } = props;
  const { useReward } = useSelector((state: IStates) => state.healthReducer);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const useRewardCode = () => {
    setOpenConfirmDialog(true)
    // dispatch(
    //   ActionSaga({
    //     type: HealthAction.USE_REWARD_R,
    //     payload: { slug: rewardSlug }
    //   })
    // )
  }
  const useCode = () => {
    dispatch(
      ActionSaga({
        type: HealthAction.USE_REWARD_R,
        payload: { slug: rewardSlug },
      })
    )
    // setOpenConfirmDialog(false)
  }
  const CloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
    if (useReward === 1) {
      dispatch(
        ActionReducer({
          type: HealthAction.USE_REWARD_S,
          payload: {}
        })
      )
      dispatch(
        ActionSaga({
          type: HealthAction.BUY_HISTORY_R,
        })
      )
    }
  }
  const CloseSuccess = () => {
    setOpenConfirmDialog(false)
    if (useReward === 1) {
      dispatch(
        ActionReducer({
          type: HealthAction.USE_REWARD_S,
          payload: {}
        })
      )
      dispatch(
        ActionSaga({
          type: HealthAction.BUY_HISTORY_R,
        })
      )
    }
    setOpenDialog(false)
  }
  const closeDialog = () => {
    if (useReward === 1) {
      dispatch(
        ActionReducer({
          type: HealthAction.USE_REWARD_S,
          payload: {}
        })
      )
      dispatch(
        ActionSaga({
          type: HealthAction.BUY_HISTORY_R,
        })
      )
    }
    setOpenDialog(false)
  }
  return (<>
    <ModalDefault
      open={openDialog} onClose={closeDialog}
    >
      <Box className={classes.dialog}>
        <QRCode
          value={`${rewardCode}`}
          title={`${rewardCode}`}
          size={128}
        />
        <p>{rewardCode}</p>
        <br /><br />

        <Barcode value={`${rewardCode}`} width={2} />
        <ButtonProps
          variant="contained"
          color="primary"
          marginbtn="10px 0"
          titlebutton="ยืนยันใช้สิทธิ์"
          background="linear-gradient(to bottom, #68D5E5, #674EEF)"
          maxwidthbtn="100%"
          onClick={() => { useRewardCode() }}
        />
      </Box>
      <p className={classes.textButtonInfo}>กดปุ่ม "ยืนยันสิทธิ์" เมื่อใช้สิทธิ์แล้ว</p>

      <Dialog open={openConfirmDialog} maxWidth="md" onClose={CloseConfirmDialog}>
        <Box className={classes.dialog}>
          <Typography variant="h4">
            {useReward === 1 ?
              <>ใช้สิทธิ์สำเร็จ</> :
              <> กรุนายืนยันการใช้สิทธิ์ </>
            }
          </Typography>
          <DialogActions>
            {useReward === 1 ?
              <><ButtonProps
                variant="contained"
                marginbtn="10px 0"
                titlebutton="ปิด"
                background="linear-gradient(to top, #8CA51E,  #D0FD08)"
                maxwidthbtn="100%"
                onClick={CloseSuccess}
              /></> :
              <>
                <ButtonProps
                  variant="contained"
                  marginbtn="10px 0"
                  titlebutton="ยืนยัน"
                  background="linear-gradient(to top, #8CA51E,  #D0FD08)"
                  maxwidthbtn="100%"
                  onClick={useCode}
                />
                <ButtonProps
                  variant="contained"
                  // color="primary"
                  background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                  marginbtn="10px 0"
                  titlebutton="ปิด"
                  maxwidthbtn="100%"
                  onClick={CloseConfirmDialog}
                />
              </>
            }

          </DialogActions>
        </Box>
      </Dialog>

    </ModalDefault >
  </>)

}

export default RewardHistoryDetail;