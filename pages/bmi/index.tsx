import {
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import { Form, Formik } from "formik";
import moment from "moment";
import { Container } from "next/app";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { BMIActions } from "stores/bmi/bmi.action";
import { ICreateBMI } from "stores/bmi/bmi.reducer";
import { ProfileAction } from "stores/profile/profile.action";
import { IStates } from "stores/root.reducer";
import convertDate from "utils/convertDate";
import prefix from "utils/path";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {},
  sectionOne: {
    padding: "30px",
    textAlign: "center",
    boxShadow: "0px 3px 5px #00000016",
    [theme.breakpoints.down("xs")]: {
      marginTop: "-25px",
      padding: "20px",
    },
  },
  text: {
    color: "#848484",
    fontSize: "32px",
    lineHeight: "30px",
    padding: "0px 50px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "22px",
      lineHeight: "24px",
      padding: "0px",
    },
  },
  textBig: {
    color: "black",
    fontSize: "38px",
    lineHeight: "32px",
    verticalAlign: "center",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "33px",
      lineHeight: "26px",
    },
  },
  textPink: {
    // display: 'flex',
    color: "#E96189",
    fontSize: "90px",
    lineHeight: "47px",
    paddingTop: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "70px",
      lineHeight: "35px",
    },
  },
  textEqual: {
    color: "black",
    fontSize: "38px",
    marginTop: "5px",
    lineHeight: "32px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "33px",
      lineHeight: "26px",
    },
  },
  spaceTop: {
    paddingTop: "50px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "30px",
    },
  },
  sectionTwo: {
    padding: "30px",
    marginTop: "40px",
    textAlign: "center",
    boxShadow: "0px 3px 5px #00000016",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
      padding: "20px",
    },
  },
  textSave: {
    color: "black",
    fontSize: "38px",
    lineHeight: "32px",
    verticalAlign: "center",
    padding: "10px",
    paddingBottom: "40px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
      lineHeight: "14px",
      paddingBottom: "21px",
    },
  },
  sectionThree: {
    padding: "30px",
    marginTop: "40px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
      padding: "20px",
    },
  },
  textThree: {
    color: "black",
    fontSize: "38px",
    lineHeight: "32px",
    verticalAlign: "center",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
      lineHeight: "30px",
    },
  },
  textNotBirthDay: {
    color: "red",
    fontSize: "38px",
    lineHeight: "32px",
    verticalAlign: "center",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
      lineHeight: "30px",
    },
  },
  imgBmi: {
    width: "65%",
    paddingTop: "30px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      paddingTop: "15px",
    },
  },
  topBox: {
    backgroundColor: "#449AE3",
    minHeight: 180,
    borderRadius: 5,
    position: "relative",
    backgroundImage: `url(${prefix}/images/bmi_dec.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "auto",
    padding: 15,
    marginBottom: 25,

    textAlign: "center",
    boxShadow: "0px 3px 5px #00000016",
  },
  inputField: {
    borderRadius: 5,
    background: "white",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: 40,
      color: "#449AE3",
      fontSize: 22,
      borderRadius: 5,
    },
    [theme.breakpoints.down("xs")]: {},
    "& .Mui-focused": {
      color: "#449AE3",
      border: "none",
      order: "none",
    },
    "&$cssFocused $notchedOutline": {
      borderColor: `red !important`,
    },
  },
  buttonSave: {
    color: "white",
    background:
      "linear-gradient(180deg, rgba(208,253,8,1) 0%, rgba(140,165,16,1) 100%)",
    fontSize: "22px",
    width: "180px",
    height: "40px",
    lineHeight: "30px",
    borderRadius: "5px",
    margin: "20px 0 0 0",
  },
  sectionFour: {
    marginTop: "30px",
    background: "#E96189",
    borderRadius: "5px",
    padding: "30px",
    textAlign: "center",
  },
  textFour: {
    fontSize: "35px",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
    },
  },
  numberFour: {
    color: "#D0FD08",
    fontSize: "45px",
    backgroundColor: "#00000020",
    padding: "0px 20px",
    margin: "0px 20px",
    borderRadius: "5px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "30px",
    },
  },
  sectionFive: {
    marginTop: "30px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: "25px",
    },
  },
  titleFive: {
    padding: "20px",
    fontSize: "40px",
    lineHeight: "40px",
    [theme.breakpoints.down("xs")]: {
      padding: "15px",
      fontSize: "25px",
      lineHeight: "40px",
    },
  },
  textDate: {
    color: "#FFE200",
    fontSize: "25px",
    lineHeight: "30px",
    textAlign: "left",
    paddingTop: "20px",
    paddingLeft: "27%",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      padding: "15px",
      fontSize: "26px",
      lineHeight: "24px",
    },
  },
  textWhite: {
    color: "white",
    fontSize: "30px",
    lineHeight: "24px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "25px",
      lineHeight: "24px",
    },
  },
  textYellow: {
    color: "#D0FD08",
    fontSize: "70px",
    lineHeight: "45px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "60px",
      lineHeight: "40px",
    },
  },
  title: {
    fontSize: 25,
    lineHeight: "20px",
    color: "#fff",
    marginBottom: 20,
  },
}));

interface IForm {
  weight: number | undefined;
  height: number | undefined;
}

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile, bmiList } = useSelector(
    (state: IStates) => state.profileReducer
  );
  const { created_at, created_at_new } = useSelector(
    (state: IStates) => state.bmiReducer
  );
  const [onSubmit, setSubmit] = useState<boolean>(true);
  const [isCooldown, setCooldown] = useState<boolean>(false);
  let images = {
    f: "/images/graph-girl.jpeg",
    m: "/images/graph-boy.jpeg",
  };
  const formValidate = yup.object().shape({
    weight: yup
      .number()
      .required("กรุณากรอกข้อมูลน้ำหนัก")
      .min(10, "น้ำหนักต้องไม่น้อยกว่า 10 กก.")
      .max(200, "น้ำหนักต้องไม่เกิน 200 กก."),
    height: yup
      .number()
      .required("กรุณากรอกข้อมูลส่วนสูง")
      .min(90, "ส่วนสูงต้องไม่น้อยกว่า 90 ซม.")
      .max(250, "ส่วนสูงต้องไม่เกิน 250 ซม."),
  });

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      dispatch(
        ActionSaga({
          type: BMIActions.FETCH_BMI_R,
          payload: null,
        })
      );
    }
  }, [profile]);

  useEffect(() => {
    if (created_at && created_at_new && moment().isBefore(created_at_new)) {
      setCooldown(true);
    } else {
      setSubmit(false);
    }
  }, [created_at, created_at_new]);

  const initialValues: IForm = {
    weight: undefined,
    height: undefined,
  };

  const onFormSubmit = (values: IForm) => {
    setSubmit(true);
    const data: ICreateBMI = {
      height: values.height!,
      weight: values.weight!,
      getBmi: Number(
        (
          values.weight! /
          ((values.height! / 100) * (values.height! / 100))
        ).toFixed(2)
      ),
      user_id: profile.user_id,
    };
    dispatch(
      ActionSaga({
        type: BMIActions.BMI_SAVE_R,
        payload: data,
      })
    );
    setTimeout(() => {
      dispatch(
        ActionSaga({
          type: ProfileAction.PROFILE_R,
        })
      );
    }, 3000);
  };

  const checkAge = () => {
    if (profile && profile.information) {
      // const newDate = new Date(new Date().getTime() -  60 * 60 * 24 * 1000);
      let dateOld = new Date()
      let dateYoung = new Date()
      dateYoung.setFullYear(dateYoung.getFullYear() - 5)
      dateOld.setFullYear(dateOld.getFullYear() - 18)
      const dateBirth = new Date(profile.information.birth_date)
      if (dateYoung > dateBirth && dateBirth > dateOld) {
        return true;
      } else {
        return false;
      }

    }
    return false;
  };

  const renderBmiLogs = () => {
    if (bmiList.length > 0) {
      return bmiList.map((each, index) => {
        let updateDate = moment(each.updateDate)
          .add(543, "years")
          .locale("th")
          .format("DD/MM/YY");
        return (
          <Box className={classes.topBox} key={index}>
            <p className={classes.textDate}>{updateDate}</p>
            <Grid container className={classes.textWhite}>
              <Grid item xs={1} sm={3} />
              <Grid item xs={3} sm={2}>
                น้ำหนัก
              </Grid>
              <Grid item xs={4} sm={2}>
                ส่วนสูง
              </Grid>
              <Grid item xs={3} sm={2}>
                BMI
              </Grid>
              <Grid item xs={1} sm={3} />
            </Grid>
            <Grid container className={classes.textYellow}>
              <Grid item xs={1} sm={3} />
              <Grid item xs={3} sm={2}>
                {each.weight}
              </Grid>
              <Grid item xs={4} sm={2}>
                {each.height}
              </Grid>
              <Grid item xs={3} sm={2}>
                {each.bmi}
              </Grid>
              <Grid item xs={1} sm={3} />
            </Grid>
            <Grid container className={classes.textWhite}>
              <Grid item xs={1} sm={3} />
              <Grid item xs={3} sm={2}>
                กิโลกรัม
              </Grid>
              <Grid item xs={4} sm={2}>
                เซนติเมตร
              </Grid>
              <Grid item xs={3} sm={2}>
                = {each.bmiStatus}
              </Grid>
              <Grid item xs={1} sm={3} />
            </Grid>
          </Box>
        );
      });
    }
    return "";
  };

  return (
    <InnerLayout titlepage="ดัชนีมวลกาย (BMI)">
      <Box className={classes.root}>
        <Container>
          <Paper className={classes.sectionOne}>
            <p className={classes.text}>
              คือ
              ตัวชี้วัดมาตรฐานเพื่อประเมินสภาวะของร่างกายว่ามีความสมดุลของน้ำหนักตัวต่อส่วนสูงอยู่ในเกณฑ์ที่เหมาะสมหรือไม่
            </p>
            <p className={classes.textBig}>ดัชนีมวลกาย (BMI)</p>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item className={classes.textPink}>
                {bmiList.length > 0 ? (
                  bmiList[0].bmi
                ) : (
                  <Skeleton variant="text" />
                )}
              </Grid>
              <Grid item className={classes.textEqual}>
                ={" "}
                {bmiList.length > 0 ? (
                  bmiList[0].bmiStatus
                ) : (
                  <Skeleton variant="text" />
                )}
              </Grid>
            </Grid>
            <p className={`${classes.text} ${classes.spaceTop}`}>
              {bmiList.length > 0 ? (
                bmiList[0].bmiDesc
              ) : (
                <Skeleton variant="text" />
              )}
            </p>
          </Paper>
          {isCooldown && (
            <Paper elevation={3} className={classes.sectionTwo}>
              <p className={classes.textSave}>
                บันทึกข้อมูล เพื่อดู BMI ล่าสุดของท่าน
              </p>
              <p className={classes.text}>
                บันทึกข้อมูลล่าสุด {convertDate(created_at!.toDate())}
              </p>
              <p className={classes.text}>
                สามารถบันทึกข้อมูลได้อีกครั้ง{" "}
                {convertDate(created_at_new!.toDate())}
              </p>
            </Paper>
          )}
          {checkAge() ? (
            <Grid className={classes.sectionThree}>
              <p className={classes.textThree}>
                กราฟแสดงเกณฑ์อ้างอิงการเจริญเติบโต อายุ 5-18 ปี
              </p>
              <img
                src={`${prefix}${profile && profile.gender === "F" ? images.f : images.m
                  }`}
                className={classes.imgBmi}
              />
            </Grid>
          ) : profile?.information?.birth_date === null ? (
            <Grid className={classes.sectionThree}>
              <p className={classes.textNotBirthDay}>
                ไม่พบข้อมูลวัน/เดือน/ปีเกิด โปรดใส่วัน/เดือน/ปีเกิดที่หน้า
                <Link
                  onClick={() => {
                    router.push({ pathname: "/profile" });
                  }}
                >
                  โปรไฟล์
                </Link>
                อีกครั้ง
              </p>
            </Grid>
          ) : null}
          {!isCooldown && (
            <React.Fragment>
              <Box className={classes.topBox}>
                <Typography variant="h3" className={classes.title}>
                  บันทึกข้อมูล เพื่อดู BMI ล่าสุดของท่าน
                </Typography>
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  onSubmit={onFormSubmit}
                  validationSchema={formValidate}
                >
                  {({
                    values,
                    dirty,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            id="weight"
                            name="weight"
                            type="number"
                            variant="outlined"
                            placeholder="กรอกน้ำหนัก"
                            className={classes.inputField}
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.weight}
                            error={!!errors.weight}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="height"
                            name="height"
                            type="number"
                            variant="outlined"
                            placeholder="กรอกส่วนสูง"
                            className={classes.inputField}
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.height}
                            error={!!errors.height}
                          />
                        </Grid>
                      </Grid>
                      <Grid>
                        <Button
                          type="submit"
                          className={classes.buttonSave}
                          disabled={
                            !dirty || Object.keys(errors).length > 0 || onSubmit
                          }
                        >
                          บันทึก
                        </Button>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </React.Fragment>
          )}
          <Grid className={classes.sectionFour}>
            <span className={classes.textFour}>รอบเอวของคุณไม่ควรเกิน</span>
            <span className={classes.numberFour}>
              {bmiList.length > 0 ? bmiList[0].height / 2 : 0}
            </span>
            <span className={classes.textFour}>ซม.</span>
          </Grid>
          {!!profile.bmi_logs && profile.bmi_logs.length > 0 ? (
            <Grid className={classes.sectionFive}>
              <p className={classes.titleFive}>ประวัติการบันทึก BMI</p>
              {renderBmiLogs()}
              {bmiList.length > 0}
            </Grid>
          ) : (
            ""
          )}
        </Container>
      </Box>
    </InnerLayout>
  );
};

export default ProfilePage;
