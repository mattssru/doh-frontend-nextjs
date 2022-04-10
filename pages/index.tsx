import React, { useEffect } from "react";
import { HomeLayout } from "components/layouts/HomeLayout";
import {
  SectionA,
  SectionB,
  SectionC,
  SectionD,
  SectionE,
  SectionF,
  // SectionH,
  Section9,
  Section10,
  SectionI,
} from "components/homepage";
// import {
//   Box,
//   Dialog,
//   DialogActions,
//   makeStyles,
//   Typography,
// } from "@material-ui/core";
// import { ButtonProps } from "components/common/button";
// import ModalQuestionnaire from "components/ModalQuestionnaire";
import router from "next/dist/client/router";
import { BMIModal, PDPAModal } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import { ActionSaga } from "services/action.saga";
import { ProfileAction } from "stores/profile/profile.action";
import { BMIActions } from "stores/bmi/bmi.action";

// const useStyles = makeStyles((theme: any) => ({
//   root: {},
//   dialog: {
//     margin: "10px",
//     textAlign: "center",
//     width: "300",
//     "& button": {
//       background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
//     },
//     [theme.breakpoints.down("xs")]: {
//       width: "300px",
//     },
//   },
// }));

const IndexPage = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [openPDPA, setOpenPDPA] = React.useState(false);
  const [openBMI, setOpenBMI] = React.useState(false);
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const [callBMI, setCallBMI] = React.useState(false);
  // const [openDialog, setOpenDialog] = React.useState(false);
  const testdate = new Date();
  const { isInvite } = router.query;
  const { created_at_new, created_at } = useSelector(
    (state: IStates) => state.bmiReducer
  );
  useEffect(() => {
    if (isInvite === "true") {
      //
    } else {
      if (Object.keys(profile).length > 0) {
        if (profile?.information?.is_PDPA === 1) {
          setOpenPDPA(false);
          isBMI();
        } else {
          setOpenPDPA(true);
        }
        dispatch(
          ActionSaga({
            type: BMIActions.FETCH_BMI_R,
            payload: null,
          })
        );
        setCallBMI(true);
      }
    }
  }, [profile]);

  // useEffect(() => {
  //   if (profile?.information?.birth_date === null) {
  //     // setOpenDialog(true);
  //     router.push({ pathname: "/profile" });
  //   }
  // }, [profile]);

  // const CloseDialog = () => {
  //   setOpenDialog(false);
  //   router.push({ pathname: "/profile" });
  // };

  const isBMI = () => {
    if (openPDPA === false && callBMI === true) {
      if (created_at_new && testdate >= created_at_new?.toDate()) {
        console.log(1);
        setOpenBMI(true);
      } else if (created_at_new === null && created_at !== null) {
        console.log(2, created_at_new);
        setOpenBMI(true);
      }
    }
  };

  useEffect(() => {
    if (isInvite === "true") {
      setOpenPDPA(false);
      setOpenBMI(false);
    }
  }, []);

  const handleClosePDPA = () => {
    dispatch(
      ActionSaga({
        type: ProfileAction.PDPA_R,
      })
    );
    setOpenPDPA(false);
    isBMI();
  };

  const handleCloseBMI = () => {
    setOpenBMI(false);
  };

  const renderHomePage = () => {
    return (
      <>
        <SectionA />
        <SectionB />
        <SectionC />
        <SectionD />
        <SectionE />
        <SectionF />
        {/* <SectionH /> */}
        <SectionI />
        <Section9 />
        <Section10 />
        {/* <ModalQuestionnaire open={openModal} onClose={handleCloseModal} onStopInterval={handleStopInterval} /> */}
        <PDPAModal openModal={openPDPA} handleCloseModal={handleClosePDPA} />
        <BMIModal openModal={openBMI} handleCloseModal={handleCloseBMI} />
      </>
    );
  };
  return (
    <>
      <HomeLayout>{renderHomePage()}</HomeLayout>
      {/* <Dialog open={openDialog} maxWidth="lg" onClose={CloseDialog}>
        <Box className={classes.dialog}>
          <Typography variant="h4">
            {" "}
            ไม่พบข้อมูลวันเกิด
            <br /> กรุณาอัพเดตวันเกิดที่หน้าโปรไฟล์
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
      </Dialog> */}
    </>
  );
};

export default IndexPage;
