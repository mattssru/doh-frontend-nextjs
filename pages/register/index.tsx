import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  FormLabel,
  Grid,
  makeStyles,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import {
  ControlButton,
  RadioFixd,
  SelectFixd,
  TextFieldFixd,
} from "components/common";
import React, { useEffect, useState } from "react";
import { ButtonProps } from "components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";

import { ActionSaga } from "services/action.saga";
import { RegisterAction } from "stores/register/register.action";
import validator from "validator";
import prefix from "utils/path";
// import router from "next/router";
import { useRouter } from "next/router";
// import BtnCenter from "components/common/BtnCenter";
import { ImageProfile } from "components";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
    "& ::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& :: -webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },

  boxwrap: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 20px",
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 15,
    },
    "& h1": {
      fontSize: 60,
      lineHeight: "60px",
      color: (props: any) => props.color || "#1688C4",
      [theme.breakpoints.down("xs")]: {
        fontSize: 40,
        lineHeight: "40px",
      },
    },
  },
  label: {
    position: "relative",
    transform: "none !important",
    fontSize: 20,
    lineHeight: "24px",
    color: "#000",
    fontFamily: "DBHeavent_Cond",
    marginBottom: 4,
    height: 24,
  },
  formGroup: {
    display: "flex",
    "& .react-date-picker": {
      width: "100%",
    },
    "& Label": {
      height: "25px",
    },
  },
  collpase: {
    marginTop: 30,
    "& .MuiAccordion-root": {
      borderRadius: 5,
      boxShadow: "none",
    },
    "& .MuiAccordionSummary-root": {
      background: "linear-gradient(to top, #95B12D, #C7F240)",
      height: 50,
    },
    "& .MuiAccordionSummary-content": {
      justifyContent: "center",
    },
    "& .MuiAccordionDetails-root": {
      padding: "30px 0px 0px 0px",
      display: "block",
      // margin: 0,
      [theme.breakpoints.down("xs")]: {
        padding: "30px 0 0 0",
      },
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: 50,
    },
  },
  headingCollapse: {
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontFamily: "DBHeavent_BoldCond",
  },
  titleTabs: {
    color: "#70B642",
    fontSize: 30,
    lineHeight: "30px",
    textAlign: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
  },
  boxForm: {
    marginBottom: 30,
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
    "& p": {
      textIndent: "30px",
      marginBottom: 10,
    },
  },
  datePicker: {
    "& .react-date-picker__wrapper": {
      height: 50,
      border: "1px solid #DBDBDB",
      borderRadius: "5px",
    },
    "& .react-date-picker__inputGroup": {
      // padding: '5px',
      paddingLeft: "20px",
      fontSize: "20px",
      height: 50,
    },
    "& .react-date-picker__calendar": {
      zIndex: 10,
    },
    "& .react-calendar__navigation": {
      "& span": {
        fontSize: 26,
      },
    },
    "& .react-calendar button abbr": {
      fontSize: 16,
    },
  },
  dateTitle: {
    height: '28px',
    fontSize: '20px',
  },
}));

const EditProfilePage = (props: any) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();
  const { ebib_code, lineToken, displayName, pictureUrl, verifySelf } =
    router.query;
  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [registerData, setRegisterData] = useState({
    mobile: "",
    identify_number: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "M",
    type_id: "",
    current_address: "",
    current_moo: "",
    current_t_code: "",
    current_a_code: "",
    current_p_code: "",
    current_postcode: "",
    birthday: "",
    ebib_code: "",
    line_image: "",
    verify_self: "",
    line_token: "",
    weight: "",
    height: "",
    home_address: "",
    home_moo: "",
    home_t_code: "",
    home_a_code: "",
    home_p_code: "",
    home_postcode: "",
  });
  // const isEmpty = !Object.values(registerData).every((x) => x !== "");
  const isEmpty =
    registerData.mobile === "" ||
    registerData.identify_number === "" ||
    registerData.first_name === "" ||
    registerData.last_name === "" ||
    registerData.gender === "" ||
    registerData.type_id === "" ||
    registerData.current_address === "" ||
    registerData.current_address === "" ||
    registerData.current_t_code === "" ||
    registerData.current_a_code === "" ||
    registerData.current_p_code === "" ||
    registerData.current_postcode === "" ||
    // registerData.birthday === "" ||
    registerData.weight === "" ||
    registerData.height === "";
  // const [sameAddress, setSameAddress] = useState(false);
  const [imgData, setImgData] = useState<File | null>(null);
  const [condition, setCondition] = useState(true);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: RegisterAction.RESET_REGISTER_R,
      })
    );
    dispatch(
      ActionSaga({
        type: RegisterAction.PROVINCE_LIST_R,
      })
    );
    dispatch(
      ActionSaga({
        type: RegisterAction.USER_TYPE_R,
      })
    );
    setRegisterData({
      ...registerData,
      ["ebib_code"]: ebib_code?.toString(),
      ["line_token"]: lineToken?.toString(),
      ["first_name"]: displayName && removeEmojis(displayName),
      ["line_image"]: pictureUrl?.toString(),
      ["verify_self"]: verifySelf?.toString(),
    });
  }, [dispatch]);
  const removeEmojis = (text: any) => {
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return text.replace(regex, "");
  };
  const {
    provinceList,
    currentAList,
    currentTList,
    userTypeList,
    registerResponse,
  } = useSelector((state: IStates) => state.registerReducer);
  const renderUserType = () => {
    if (userTypeList?.length > 0) {
      return (
        <>
          <option selected={true} disabled={true}>
            กรุณาเลือกสถานะ
          </option>
          {userTypeList?.map((item: any) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </>
      );
    }
  };
  const renderSubDistrict = (dataList: string[], defaultText: string) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option selected={true} disabled={true}>
            {defaultText}
          </option>
          {dataList?.map((item: any) => (
            <option value={item.t_code} key={item.id}>
              {item.t_name}
            </option>
          ))}
        </>
      );
    } else {
      return (
        <option selected={true} disabled={true}>
          กรุณาเลือกจังหวัดและอำเภอก่อน
        </option>
      );
    }
  };
  const renderDistrict = (dataList: string[], defaultText: string) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option selected={true} disabled={true}>
            {defaultText}
          </option>
          {dataList?.map((item: any) => (
            <option value={item.a_code} key={item.id}>
              {item.a_name}
            </option>
          ))}
        </>
      );
    } else {
      return (
        <option selected={true} disabled={true}>
          กรุณาเลือกจังหวัดก่อน
        </option>
      );
    }
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
  const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // console.log(id, value)
    if (e.target.name === "gender") {
      console.log("it === gender", e.target.name, value);
      setRegisterData({ ...registerData, ["gender"]: value });
      // console.log(e.target.name, value)
    } else if (
      id === "mobile" ||
      id === "identify_number " ||
      id === "current_postcode" ||
      id === 'current_moo'
    ) {
      const isNumber = validator.isInt(value);
      if (isNumber) {
        setRegisterData({ ...registerData, [id]: value });
      } else if (value === "") {
        setRegisterData({ ...registerData, [id]: value });
      }
    } else {
      setRegisterData({ ...registerData, [id]: value });
    }
    if (id === "current_p_code") {
      dispatch(
        ActionSaga({
          type: RegisterAction.CURRENT_A_LIST_R,
          payload: { code: value },
        })
      );
    } else if (id === "current_a_code") {
      dispatch(
        ActionSaga({
          type: RegisterAction.CURRENT_T_LIST_R,
          payload: { code: value },
        })
      );
    }
  };
  const CloseDialog = () => {
    if (registerResponse.status === 200 || registerResponse.status === 500) {
      router.push({ pathname: "/login" });
      dispatch(
        ActionSaga({
          type: RegisterAction.RESET_REGISTER_R,
        })
      );
    }
    setOpenDialog(false);
    setLoading(false)
    setCondition(true);
  };
  const ClickSave = () => {
    const con_weight: number[] = [10, 200];
    const con_height: number[] = [90, 250];
    setOpenDialog(true);
    setLoading(true);
    dispatch(
      ActionSaga({
        type: RegisterAction.RESET_REGISTER_R,
      })
    );
    if (
      parseFloat(registerData.weight) < con_weight[0] ||
      parseFloat(registerData.weight) > con_weight[1] ||
      parseFloat(registerData.height) < con_height[0] ||
      parseFloat(registerData.height) > con_height[1]
    ) {
      setCondition(false);
    } else {
      let data = {
        id: "",
        // ebib_code: registerData.ebib_code?registerData.ebib_code:null,
        // line_token: registerData.line_token?registerData.line_token:null,
        ebib_code: registerData.ebib_code,
        line_token: lineToken ? lineToken : "",
        active: 1,
        avatar: "",
        // line_image: registerData.line_image?registerData.line_image:'',
        line_image: "",
        height: parseFloat(registerData.height),
        weight: parseFloat(registerData.weight),
        username: registerData.mobile,
        mobile: registerData.mobile,
        identify_number: registerData.identify_number,
        password: registerData.password,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        gender: registerData.gender,
        type_id: registerData.type_id,
        current_address: registerData.current_address,
        current_moo: registerData.current_moo,
        current_t_code: registerData.current_t_code,
        current_a_code: registerData.current_a_code,
        current_p_code: registerData.current_p_code,
        current_postcode: registerData.current_postcode,
        birth_date: value,
        home_address: registerData.current_address,
        home_moo: registerData.current_moo,
        home_t_code: registerData.current_t_code,
        home_a_code: registerData.current_a_code,
        home_p_code: registerData.current_p_code,
        home_postcode: registerData.current_postcode,
      };
      let formData = new FormData();
      formData.append("form", JSON.stringify(data));
      if (imgData) {
        formData.append("file", imgData);
      }
      dispatch(
        ActionSaga({
          type: RegisterAction.REGISTER_R,
          payload: formData,
        })
      );
    }
  };

  useEffect(() => {
    if (JSON.stringify(registerResponse) !== "{}") {
      setOpenDialog(true);
      setLoading(false)
    }
  }, [registerResponse]);

  const handlePasslogin = () => {
    // router.push(`/login?lineToken=${lineToken}&verifySelf=${verifySelf}`);
    router.push({ pathname: '/login', query: { lineToken: lineToken, verifySelf: verifySelf } })
  };
  const textA = (value: any) => {
    console.log("picker", moment(value).format("YYYY-MM-DD"));
    const birth_date = moment(value).format("YYYY-MM-DD");
    setRegisterData({
      ...registerData,
      birthday: birth_date,
    });
  };

  // const handleToForgot = () => {
  //   router.push({
  //     pathname: "/forgotpassword",
  //     query: {
  //       lineToken: lineToken,
  //     },
  //   });
  // };

  const renderlinelogin = () => {
    if (lineToken !== undefined) {
      if (verifySelf) {
        return handlePasslogin();
      }
    }
  };

  // const renderButtonMemeberOld = () => {
  //   if (lineToken !== undefined) {
  //     return (
  //       <BtnCenter MarginBottomBtn={"15px"}>
  //         <ButtonProps
  //           titlebutton={"สมาชิก Season 1&2 คลิกที่นี่"}
  //           backgroundcolorbtn={"#FFB100"}
  //           borderradiusbtn={"30px"}
  //           onClick={handleToForgot}
  //           heightbtn={"50px"}
  //           paddingbtn={"6px 20px"}
  //           fontsizebtn={"28px"}
  //         />
  //       </BtnCenter>
  //     );
  //   }
  // };

  const handleImage = ({ thumbnail }: { thumbnail: File }) => {
    if (thumbnail) {
      setImgData(thumbnail);
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
        {/* {renderButtonMemeberOld()} */}
        <Box className={classes.boxwrap}>
          <div className={classes.title}>
            <Typography variant="h1">ลงทะเบียน</Typography>
          </div>
          <ImageProfile
            urlImgCurrent={`${prefix}/images/profile_img.jpg`}
            handleImageChange={handleImage}
          />
          <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
              <TextFieldFixd
                label="เบอร์โทรศัพท์"
                id="mobile"
                onChange={ChangeInput}
                maxLength={10}
                value={registerData.mobile}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextFieldFixd
                label="เลขบัตรประชาชน"
                placeholder="เลขบัตรประชาชน 13 หลัก"
                id="identify_number"
                onChange={ChangeInput}
                maxLength={13}
                value={registerData.identify_number}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextFieldFixd
                label="รหัสผ่าน"
                typeInput="password"
                id="password"
                onChange={ChangeInput}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextFieldFixd
                label="ชื่อจริง"
                placeholder="ชื่อจริง"
                id="first_name"
                onChange={ChangeInput}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextFieldFixd
                label="นามสกุล"
                placeholder="นามสกุล"
                id="last_name"
                onChange={ChangeInput}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <p className={classes.dateTitle}>วันเดือนปีเกิด</p>
              <Box className={classes.formGroup}>
                {/* <TextFieldFixd 
                  id="birthday"
                  name="birthday"
                  label="วันเดือนปีเกิด"
                  typeInput="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={ChangeInput}
                /> */}
                <DatePicker

                  className={classes.datePicker}
                  onChange={(value: any) => {
                    onChange(value), textA(value);
                  }}
                  value={value}
                  locale="th"
                />
                {/* <SelectFixd
                  label="วัน/เดือน/ปี"
                  id="date"
                  onChange={ChangeInput}
                  type="date"
                >
                  <option disabled selected>
                    วัน
                  </option>
                  {Array.from(
                    new Array(31),
                    (_val: number, index: number) => 1 + index
                  ).map((value: number, _key: number) => {
                    return <option value={value}>{value}</option>;
                  })}
                </SelectFixd>
                <SelectFixd id="month" onChange={ChangeInput} type="date">
                  <option disabled selected>
                    เดือน
                  </option>
                  {monthList.map((item: string, key: number) => {
                    return <option value={key + 1}>{item}</option>;
                  })}
                </SelectFixd>
                <SelectFixd id="year" onChange={ChangeInput} type="date">
                  <option disabled selected>
                    ปี
                  </option>
                  {Array.from(
                    new Array(80),
                    (_val: number, index: number) =>
                      80 - index + new Date().getFullYear() + 543 - 80
                  ).map((value: number, _key: number) => {
                    return <option value={value - 543}>{value}</option>;
                  })}
                </SelectFixd> */}
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormLabel
                component="label"
                className={classes.label}
                onClick={() => console.log("hi", registerData)}
              >
                เพศ
              </FormLabel>
              <RadioGroup
                name="gender"
                defaultValue="M"
                id="gender"
                style={{ flexDirection: "row" }}
                onChange={ChangeInput}
              >
                <RadioFixd label="ชาย" value="M" />
                <RadioFixd label="หญิง" value="F" />
              </RadioGroup>
            </Grid>
            <Grid item sm={4} xs={12}>
              <SelectFixd label="สถานะ" id="type_id" onChange={ChangeInput}>
                {renderUserType()}
              </SelectFixd>
            </Grid>
            <Grid item sm={2} xs={6}>
              <TextFieldFixd
                label="น้ำหนัก"
                placeholder="น้ำหนัก"
                id="weight"
                typeInput="number"
                onChange={ChangeInput}
                value={registerData.weight}
              />
            </Grid>
            <Grid item sm={2} xs={6}>
              <TextFieldFixd
                label="ส่วนสูง"
                placeholder="ส่วนสูง"
                id="height"
                typeInput="number"
                onChange={ChangeInput}
                value={registerData.height}
              />
            </Grid>
            <Box className={classes.boxForm}>
              <Typography variant="h3" className={classes.titleTabs}>
                ที่อยู่
              </Typography>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextFieldFixd
                    id="current_address"
                    label="บ้านเลขที่ / หมู่บ้าน / ซอย / ถนน"
                    onChange={ChangeInput}
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextFieldFixd
                    id="current_moo"
                    label="หมู่ที่"
                    onChange={ChangeInput}
                    value={registerData?.current_moo}
                  />
                </Grid>
                <Grid item sm={4} xs={12} id="current_p_code">
                  <SelectFixd
                    label="จังหวัด"
                    id="current_p_code"
                    onChange={ChangeInput}
                  >
                    {renderProvince(provinceList, "กรุณาเลือกจังหวัด")}
                  </SelectFixd>
                </Grid>

                <Grid item sm={4} xs={12}>
                  <SelectFixd
                    label="อำเภอ"
                    id="current_a_code"
                    onChange={ChangeInput}
                  >
                    {renderDistrict(currentAList, "กรุณาเลือกอำเภอ")}
                  </SelectFixd>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <SelectFixd
                    label="ตำบล"
                    id="current_t_code"
                    onChange={ChangeInput}
                  >
                    {renderSubDistrict(currentTList, "กรุณาเลือกตำบล")}
                  </SelectFixd>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextFieldFixd
                    label="รหัสไปรษณีย์"
                    id="current_postcode"
                    onChange={ChangeInput}
                    maxLength={5}
                    value={registerData.current_postcode}
                  />
                </Grid>
                {/* <CheckBoxFixd
                  label="ที่อยู่ตามทะเบียนบ้านเหมือนที่อยู่ปัจจุบัน"
                  marginbottom="20px"
                  value={sameAddress}
                  onChange={() => setSameAddress(!sameAddress)}
                /> */}
              </Grid>
            </Box>
          </Grid>
          <Box className={classes.collpase}>
            <br />
            <ControlButton justifycontent="center">
              <ButtonProps
                titlebutton="ยกเลิก"
                maxwidthbtn="155px"
                heightbtn="40px"
                background="linear-gradient(to top, #674EEF, #68D5E5)"
                onClick={() => router.push({ pathname: "/login" })}
              />
              <ButtonProps
                titlebutton="บันทึก"
                maxwidthbtn="155px"
                heightbtn="40px"
                actionBtn={isEmpty}
                background="linear-gradient(to top, #8CA51E, #D0FD08)"
                onClick={ClickSave}
              />
            </ControlButton>
          </Box>
          <Box>
            <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
              <Box className={classes.dialog}>
                {loading && <CircularProgress />}
                {condition ? (
                  <Typography variant="h4">
                    {JSON.stringify(registerResponse) !== "{}"
                      ? registerResponse?.message
                      : registerResponse?.message}
                  </Typography>
                ) : (
                  <Typography variant="h4">
                    น้ำหนักต้องอยู่ในช่วง 10-200 กก. ส่วนสูงต้องอยู่ในช่วง
                    90-250 ซม.
                  </Typography>
                )}
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
        {renderlinelogin()}
      </Container>
    </Box>
  );
};

export default EditProfilePage;
