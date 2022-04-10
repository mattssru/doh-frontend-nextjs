import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TextFieldFixd } from "components/common";
import { ButtonProps } from "components/common/button";
// import { isEmpty } from "lodash";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { AuthenAction } from "stores/authen/authen.action";
import { ProfileAction } from "stores/profile/profile.action";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "105vh",
    backgroundImage: `url(${prefix}/images/bg_banner.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "auto",
    padding: "30px 0",
    position: "relative",
    "& h3": {
      fontSize: 60,
      lineHEight: 60,
      marginBottom: 20,
      color: "#1688C4",
      textAlign: "center",
    },
  },
  boxLogin: {
    maxWidth: 800,
    margin: "0 auto",
    borderRadius: 5,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    padding: 20,
    backgroundColor: "#fff",
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
  controlInformation: {
    textAlign: "center",
    "& .MuiTypography-body1": {
      marginBottom: "20px",
    },
    "& h2": {
      fontSize: 30,
      lineHeight: "30px",
      color: "#70B642",
      marginBottom: 20,
      textAlign: "center",
    },
  },
  boxIn: {
    maxWidth: 400,
    margin: "0 auto",
  },
  forgotPass: {
    color: "#000",
    fontSize: "24px",
    lineHeight: "45px",
    fontFamily: "DBHeavent_BoldCond",
    display: "block",
    textAlign: "center",
  },
  "&:hover": {
    color: "#1688C4",
  },
  boxConditions: {
    height: 350,
    overflow: "auto",
    border: "1px solid #eee",
    marginBottom: 30,
    padding: 20,
    "& h3": {
      color: "#70B642",
      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
    },
    "& h4": {
      fontSize: 34,
    },
    "& p": {
      textIndent: "30px",
      marginBottom: 10,
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

const LoginPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { lineToken, verifySelf, accessToken } = router.query;
  const isLoginEmpty = !Object.values(loginData).every((x) => x !== "");
  const {
    resLogin,
    isLoggedIn,
    // token
  } = useSelector((state: IStates) => state.authenReducer);
  const [openDialog, setOpenDialog] = React.useState(false);

  // useEffect(() => {
  //   router.push({
  //     pathname: '/'
  //   })
  // }, [isLoggedIn])
  useEffect(() => {
    if (lineToken) {
      localStorage.setItem("lineToken", JSON.stringify(lineToken));
    } else {
      localStorage.setItem("lineToken", JSON.stringify(undefined));
    }
  }, [lineToken]);

  useEffect(() => {
    //maintainance close
    //router.push({ pathname: "/redirect" });

    if (verifySelf === "0") {
      console.log("go to register with line");

      // dispatch(authen.actions.setIsLoading(true));
      // Router.push({
      //   pathname: '/register/update',
      //   query: {
      //     line_token: lineToken
      //   }
      // })
    } else if (verifySelf === "1") {
      if (lineToken != undefined && lineToken != "") {
        dispatch(
          ActionSaga({
            type: AuthenAction.LOGIN_LINE_R,
            // payload: { line_token: lineToken },
            payload: { accessToken: accessToken },
          })
        );
      }
    }
  }, [verifySelf, dispatch]);

  const CloseDialog = () => {
    if (isLoggedIn) {
      dispatch(
        ActionSaga({
          type: ProfileAction.SETTOKEN_R,
          payload: {
            username: loginData.username,
            line_token: lineToken ? lineToken : null,
          },
        })
      );
      dispatch(
        ActionSaga({
          type: ProfileAction.PROFILE_R,
          payload: {
            username: loginData.username,
            // line_token: lineToken ? lineToken : null,
          },
        })
      );
      router.push({ pathname: "/" });
    } else {
      dispatch(
        ActionSaga({
          type: AuthenAction.RESET_LOGIN_R,
        })
      )
    }
    setOpenDialog(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };
  const onSubmitLogin = () => {
    dispatch(
      ActionSaga({
        type: AuthenAction.AUTHEN_LOGIN_R,
        payload: { ...loginData, lineToken: lineToken },
      })
    );
    setOpenDialog(true);
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
        <Box className={classes.boxLogin}>
          <Box className={classes.boxIn}>
            <Box className={classes.controlInformation}>
              <Typography variant="h2">ก้าวท้าใจ</Typography>
              <Typography variant="body1">
                หากท่านไม่เคยเข้าร่วมกิจกรรมมาก่อน กรุณาสมัครสมาชิก
              </Typography>
              <ButtonProps
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                titlebutton="สมัครลงทะเบียน"
                heightbtn="60px"
                borderradiusbtn="30px"
                maxwidthbtn="400px"
                marginbtn="0 auto 20px"
                fontsizebtn="32px"
                onClick={() => router.push({ pathname: '/register', query: { lineToken: lineToken } })}
              />
              <Typography variant="body1">
                หรือหากเคยเข้าร่วมโครงการแล้ว
              </Typography>
            </Box>
            <Typography variant="h3">เข้าสู่ระบบ</Typography>
            <TextFieldFixd
              label="เบอร์โทรศัพท์"
              margin="0 0 15px 0"
              borderradius="32px"
              onChange={handleChange}
              id="username"
            />
            <TextFieldFixd
              label="รหัสผ่าน"
              margin="0 0 15px 0"
              borderradius="32px"
              id="password"
              onChange={handleChange}
              typeInput="password"
            />
            <ButtonProps
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              titlebutton="เข้าสู่ระบบ"
              heightbtn="60px"
              borderradiusbtn="30px"
              maxwidthbtn="400px"
              marginbtn="15px auto 20px"
              fontsizebtn="32px"
              onClick={onSubmitLogin}
              actionBtn={isLoginEmpty}
            />
            <Link
              onClick={() => {
                router.push({
                  pathname: "/forgotpassword",
                  query: { lineToken: lineToken },
                });
              }}
              className={classes.forgotPass}
            >
              ลืมรหัสผ่าน?
            </Link>

          </Box>
        </Box>
        <Box>
          <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
            <Box className={classes.dialog}>
              <Typography variant="h4">
                {isLoggedIn
                  ? "เข้าสู่ระบบสำเร็จ"
                  : resLogin?.message || <CircularProgress />}
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
      </Container>
    </Box>
  );
};

export default LoginPage;
