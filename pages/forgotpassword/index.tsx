import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { SelectFixd, TextFieldFixd } from "components/common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import { RegisterAction } from "stores/register/register.action";
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
const IndexPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    p_code: "",
  });
  const { provinceList } = useSelector(
    (state: IStates) => state.registerReducer
  );
  const { resForgot } = useSelector((state: IStates) => state.authenReducer);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: RegisterAction.PROVINCE_LIST_R,
      })
    );
  }, [dispatch]);
  const lineToken = router.query;

  const CloseDialog = () => {
    if (resForgot.status === 201) {
      router.push({
        pathname: "/forgotpassword/question",
        query: {
          token: resForgot.token,
          lineToken: lineToken.lineToken,
        },
      });
    }
    setOpenDialog(false);
  };
  const ClickSubmit = () => {
    dispatch(
      ActionSaga({
        type: AuthenAction.FORGOT_PASSWORD_R,
        payload: { inputData },
      })
    );
    setOpenDialog(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputData({ ...inputData, [id]: value });
  };
  const renderProvince = (dataList: string[], defaultText: string) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option selected={true} disabled={true}>
            {defaultText}
          </option>
          {dataList?.map((item: any) => (
            <option value={item.p_code} key={item.id}>
              {item.p_name}
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
            <TextFieldFixd
              label="เบอร์โทรศัพท์"
              id="username"
              maxLength={10}
              borderradius="32px"
              margin="0 0 15px 0"
              onChange={handleChange}
            />
            <SelectFixd
              label="จังหวัด"
              id="p_code"
              borderradius="32px"
              margin="0 0 15px 0"
              onChange={handleChange}
            >
              {renderProvince(provinceList, "กรุณาเลือกจังหวัด")}
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
              actionBtn={
                inputData.username !== "" && inputData.p_code !== ""
                  ? false
                  : true
              }
              // actionBtn={true}
            />
          </Box>
          <Box>
            <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
              <Box className={classes.dialog}>
                <Typography variant="h4">
                  {resForgot?.message || <CircularProgress />}
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
        </Box>
      </Container>
    </Box>
  );
};

export default IndexPage;
