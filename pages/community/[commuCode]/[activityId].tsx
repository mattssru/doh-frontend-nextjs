import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import { Box, TableCell, TableRow, Typography } from "@material-ui/core";
import prefix from "utils/path";
import router from "next/router";
import TableDefault from "components/TableDefault";
import { ControlButton, ModalCommon } from "components/common";
import { ButtonProps } from "components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { CommunitiesAction } from "stores/communities/communities.action";
import { IStates } from "stores/root.reducer";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "5px",
    maxWidth: 700,
    margin: "0 auto",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "20px",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  header: {
    // display: "flex",
    alignItems: "center",
    position: "relative",
    "& p": {
      fontSize: 30,
      lineHeight: "36px",
      fontFamily: "DBHeavent_MedCond",
      color: "#000",
      textAlign: "center",
    },
    "& img": {
      position: "absolute",
      right: 0,
      top: -2,
    },
  },
  boxDetail: {
    marginTop: 24,
    marginBottom: 25,
  },
  detail: {
    display: "flex",
    marginTop: 6,
  },
  detailTitle: {
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DBHeavent_MedCond",
    width: 125,
  },
  detailData: {
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DB Heavent",
    width: "100%",
    position: "relative",
    "&::before": {
      content: '":"',
      display: "block",
      position: "absolute",
      left: "-6px",
      top: "-1px",
    },
  },
  buttongroup: {
    marginTop: 30,
    marginBottom: 20,
  },
  dialog: {
    backgroundColor: "#fff",
    backgroundImage: "unset !important",
    // padding: "16px !important",
    // justifyContent: "unset !important"
  },
  textModalHead: {
    color: "#1688c4",
    fontSize: 48,
    lineHeight: "58px",
    fontFamily: "DBHeavent_MedCond",
    width: "100%",
    textAlign: "center",
  },
  textModalDetail: {
    color: "#000",
    fontSize: 24,
    lineHeight: "29px",
    fontFamily: "DB Heavent",
    width: "100%",
    textAlign: "center",
    marginBottom: 30,
  },
}));

export const Activity = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { commuCode, activityId } = router.query;
  const [modal, setModal] = useState(false);
  const { communitiesEventDetail } = useSelector((state: IStates) => state.communitiesReducer);

  const tablehead = ["e-BIB", "ชื่อ - นามสกุล", communitiesEventDetail.display_type_text];

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_COMMUNITIES_EVENT_DETAIL_R,
        payload: {
          groupId: commuCode,
          eventId: activityId,
        },
      })
    );
  }, [dispatch]);

  const renderTable = () => {
    return (
      communitiesEventDetail &&
      communitiesEventDetail.item &&
      communitiesEventDetail.item.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center" style={{ width: "20%" }}>
              {item.ebib_code}
            </TableCell>
            <TableCell align="center" style={{ width: "50%" }}>
              {item.first_name}
            </TableCell>
            <TableCell align="center" style={{ width: "30%" }}>
              {item.total}
            </TableCell>
          </TableRow>
        );
      })
    );
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };

  return (
    <InnerLayout titlepage="กิจกรรม">
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography>{communitiesEventDetail.title}</Typography>
          <img src={`${prefix}/icons/ic_trash.svg`} alt="" onClick={handleOpen} />
        </Box>

        <Box className={classes.boxDetail}>
          <Box className={classes.detail}>
            <Typography className={classes.detailTitle}>ระยะเวลา</Typography>
            <Typography className={classes.detailData}> {communitiesEventDetail.period_datetime}</Typography>
          </Box>
          <Box className={classes.detail}>
            <Typography className={classes.detailTitle}>ประเภทกีฬา</Typography>
            <Typography className={classes.detailData}> {communitiesEventDetail.sport_type}</Typography>
          </Box>
        </Box>

        <TableDefault tablehead={tablehead} tablebody={renderTable()} action="n" headcolor="#fff" bodycolor="#000" backgroundcolor="#449ae3" backgroundChildcolor="#f5f5f5" />

        <ModalCommon open={modal} onClose={handleClose} minheight="270px" classNameDialog={classes.dialog}>
          <Typography className={classes.textModalHead}>{communitiesEventDetail.title}</Typography>
          <Typography className={classes.textModalDetail}>ลบกิจกรรม</Typography>
          <ControlButton justifycontent="center">
            <ButtonProps
              titlebutton="ยกเลิก"
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              fontsizebtn="22px"
              maxwidthbtn="155px"
              onClick={() => router.back()}
            />
            <ButtonProps
              titlebutton="ยืนยัน"
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              fontsizebtn="22px"
              maxwidthbtn="155px"
              onClick={() => {
                dispatch(
                  ActionSaga({
                    type: CommunitiesAction.DELETE_COMMUNITIES_EVENT_DETAIL_R,
                    payload: {
                      groupId: commuCode,
                      eventId: activityId,
                    },
                  })
                );
              }}
            />
          </ControlButton>
        </ModalCommon>
      </Box>
    </InnerLayout>
  );
};

export default Activity;
