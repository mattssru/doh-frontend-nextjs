import {
  Box,
  Container,
  Dialog,
  DialogActions,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { SelectFixd } from "components/common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
// import { RegisterAction } from "stores/register/register.action";
import { ActionSaga } from "services/action.saga";
import { ButtonProps } from "components/common/button";
import { AuthenAction } from "stores/authen/authen.action";
import router from "next/router";
import prefix from "utils/path";

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    padding: 20,
  },
  boxwrap: {
    maxWidth: 800,
    margin: "0 auto",
    borderRadius: 5,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    padding: 20,
    backgroundColor: "#fff",
  },
  boxIn: {
    maxWidth: 400,
    margin: "40px auto",
    "& h2": {
      fontSize: 30,
      lineHeight: "30px",
      color: "#70B642",
      marginBottom: 20,
      textAlign: "center",
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
  imageLogin: {
    marginBottom: 20,
    textAlign: "center",
  },
  bgTop: {
    position: "absolute",
    top: 0,
    left: 0,
    "& img": {
      [theme.breakpoints.down("xs")]: {
        maxHeight: 150,
      },
    },
  },
}));
const QuizPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [openDialog, setOpenDialog] = React.useState(false);
  const { token, lineToken } = router.query;

  const [openDialog, setOpenDialog] = useState(false);
  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: AuthenAction.QUIZ_LIST_R,
        payload: { token: token },
      })
    );
  }, [dispatch]);
  const { resForgot, resQA } = useSelector(
    (state: IStates) => state.authenReducer
  );
  const CloseDialog = () => {
    if (resQA.status === 401 || resQA.status === 400) {
      router.push({
        pathname: "/forgotpassword",
      });
    } else if (resQA.status === 201) {
      dispatch(
        ActionSaga({
          type: AuthenAction.LOGIN_TOKEN_R,
          payload: {
            accessToken: resQA.data.accessToken,
            secret: resQA.data.secret,
          },
        })
      );
      router.push({
        pathname: "/register/update",
        query: {
          lineToken: lineToken,
        },
      });
    }
    setOpenDialog(false);
  };

  const ClickSubmit = () => {
    dispatch(
      ActionSaga({
        type: AuthenAction.QA_R,
        payload: {
          token: resForgot.token,
          first_name: inputData.first_name,
          last_name: inputData.last_name,
        },
      })
    );
    setOpenDialog(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputData({ ...inputData, [id]: value });
  };

  const renderQuiz = (dataList: string[], defaultText: string) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option selected={true} disabled={true}>
            {defaultText}
          </option>
          {dataList?.map((item: string, key: number) => (
            <option value={item} key={key}>
              {item}
            </option>
          ))}
        </>
      );
    } else {
      return (
        <option selected={true} disabled={true}>
          {defaultText}
        </option>
      );
    }
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.bgTop}>
        <img src={`${prefix}/images/bg_header.png`} alt="" />
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.imageLogin}>
          <img src={`${prefix}/images/logo.png`} alt="" />
        </Box>
        <Box className={classes.boxwrap}>
          <Box className={classes.boxIn}>
            <Typography variant="h2">ตอบคำถามเพื่อยืนยันตัวตน</Typography>
            <SelectFixd
              label="ชื่อจริง"
              id="first_name"
              borderradius="32px"
              margin="0 0 15px 0"
              onChange={handleChange}
            >
              {renderQuiz(resForgot.first_name, "กรุณาเลือกชื่อจริง")}
            </SelectFixd>
            <SelectFixd
              label="นามสกุล"
              id="last_name"
              borderradius="32px"
              margin="0 0 15px 0"
              onChange={handleChange}
            >
              {renderQuiz(resForgot.last_name, "กรุณาเลือกนามสกุล")}
            </SelectFixd>
            <ButtonProps
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              titlebutton="ยืนยัน"
              heightbtn="60px"
              borderradiusbtn="30px"
              maxwidthbtn="400px"
              marginbtn="15px auto 20px"
              fontsizebtn="32px"
              onClick={ClickSubmit}
              // actionBtn={true}
            />
          </Box>
          <Box>
            <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
              <Box className={classes.dialog}>
                <Typography variant="h4">{resQA?.message}</Typography>
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
        </Box>
      </Container>
    </Box>
  );
};

export default QuizPage;
