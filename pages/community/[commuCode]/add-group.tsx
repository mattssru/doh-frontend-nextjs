import {
  Box,
  makeStyles,
  Typography,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import { TextFieldFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import PopupModal from "components/common/PopupModal";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import { Form, useForm } from "hooks/useForm";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { CommunitiesAction } from "stores/communities/communities.action";
import { IStates } from "stores/root.reducer";
// import prefix from "utils/path";

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 15px",
    borderRadius: 5,
  },
  boxPassGroup: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E96189",
    borderRadius: 5,
    color: "#fff",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    marginBottom: 15,
    "& p": {
      fontSize: 24,
      lineHeight: "29px",
    },
    "& h5": {
      fontSize: 70,
      lineHeight: "70px",
    },
  },
  textGray: {
    color: "#848484",
    fontSize: 20,
    lineHeight: "24px",
    textAlign: "center",
    marginBottom: 30,
  },
  qrCode: {
    "& h3": {
      fontSize: 24,
      lineHeight: "29px",
      textAlign: "center",
      marginBottom: 15,
    },
  },
  imgQrcode: {
    height: 140,
    maxWidth: 139,
    margin: "0 auto",
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  betweenBtn: {
    marginBottom: 16,
  },
  controlModal: {
    textAlign: "center",
  },
  dialog: {
    margin: "10px",
    textAlign: "center",
    width: "300",
    "& button": {
      background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
}));

const initialValues = {
  ebib_code: "",
  commu_code: "",
};

const AddGroupPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { commuCode } = router.query;
  const { msg, error, isModal, qrCode } = useSelector(
    (state: IStates) => state.communitiesReducer
  );
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleInviteUser = () => {
    if (validate()) {
      dispatch(
        ActionSaga({
          type: CommunitiesAction.INVITE_USER_EBIB_R,
          payload: values,
        })
      );
    }
  };

  const CloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.GENERATE_QR_CODE_R,
        payload: {
          groupId: commuCode,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setValues({
      ...values,
      ["commu_code"]: commuCode,
    });
  }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("ebib_code" in fieldValues) {
      temp.ebib_code =
        /^[0-9\b]+$/.test(fieldValues.ebib_code) === false &&
        fieldValues.ebib_code !== ""
          ? "กรอกเฉพาะตัวเลขเท่านั้น"
          : (temp.ebib_code = fieldValues.ebib_code ? "" : "กรอก e-BIB");
    }
    setErrors({
      ...errors,
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  );

  const handleModalOpen = () => {
    if (values.ebib_code !== "") {
      dispatch(
        ActionSaga({
          type: CommunitiesAction.IS_MODAL_OPEN,
          payload: {
            msg: "ยืนยันการเชิญเข้ากลุ่ม",
            error: false,
            isOpen: true,
          },
        })
      );
    }
    // dispatch(
    //     ActionSaga({
    //       type: CommunitiesAction.IS_MODAL_OPEN,
    //       payload: {
    //         msg: 'ยืนยันการเชิญเข้ากลุ่ม',
    //         error: false,
    //         isOpen: true,
    //       },
    //     })
    // );
  };

  const handleModalClose = () => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: "",
          error: false,
          isOpen: false,
        },
      })
    );
  };

  return (
    <InnerLayout titlepage="เชิญเพื่อนเข้ากลุ่ม">
      <Box className={classes.root}>
        <Form onSubmit={handleInviteUser}>
          <TextFieldFixd
            name="ebib_code"
            label="เขิญเพื่อนโดย e-BIB"
            placeholder="กรอก e-BIB"
            value={values.ebib_code}
            error={errors.ebib_code}
            onChange={handleInputChange}
          />
          <ButtonProps
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            titlebutton="เชิญ"
            heightbtn="40px"
            borderradiusbtn="5px"
            maxwidthbtn="167px"
            marginbtn="30px auto 35px"
            fontsizebtn="22px"
            onClick={handleModalOpen}
          />
        </Form>

        <Box className={classes.boxPassGroup}>
          <p>รหัสกลุ่มของท่านคือ</p>
          <Typography variant="h5">{commuCode}</Typography>
          <ButtonProps
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            titlebutton="คัดลอก"
            heightbtn="40px"
            borderradiusbtn="5px"
            maxwidthbtn="167px"
            // marginbtn="30px auto 35px"
            fontsizebtn="22px"
            onClick={async () => {
              await navigator.clipboard.writeText(commuCode.toString());
              setOpenDialog(true);
            }}
          />
        </Box>

        <Typography className={classes.textGray}>
          ให้เพื่อนของท่านกดค้นหากลุ่ม และกรอกรหัสเพื่อค้นหา
        </Typography>
        <Box className={classes.qrCode}>
          <Typography variant="h3">QR code เชิญเพื่อนเข้ากลุ่ม</Typography>
          <Box className={classes.imgQrcode}>
            <img src={qrCode} alt="" />
          </Box>
        </Box>
      </Box>

      <PopupModal
        isOpen={isModal}
        handleClose={error ? handleModalOpen : handleModalClose}
      >
        <Box className={classes.controlModal}>
          <Box>
            <Typography variant="h2">{msg === 'Bad Request'? 'มีสมาชิกอยู่แล้ว' : msg}</Typography>
          </Box>
          <Box className={classes.betweenBtn} />
          <ButtonProps
            titlebutton={error ? "ปิด" : "ตกลง"}
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            heightbtn="40px"
            borderradiusbtn="5px"
            maxwidthbtn="167px"
            marginbtn="0 auto"
            fontsizebtn="22px"
            onClick={error ? handleModalClose : handleInviteUser}
          />
        </Box>
      </PopupModal>
      <Dialog open={openDialog} maxWidth="sm" onClose={CloseDialog}>
        <Box className={classes.dialog}>
          <Typography variant="h4">คัดลอกแล้ว</Typography>
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
    </InnerLayout>
  );
};

export default AddGroupPage;
