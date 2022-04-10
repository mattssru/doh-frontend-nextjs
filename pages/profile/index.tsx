import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  FormLabel,
  Grid,
  makeStyles,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import {
  CheckBoxFixd,
  ControlButton,
  RadioFixd,
  SelectFixd,
  TextFieldFixd,
} from "components/common";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import React, { useEffect, useState } from "react";
import { ButtonProps } from "components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import { ActionSaga } from "services/action.saga";
//import { ProfileAction } from "stores/profile/profile.action";
import { RegisterAction } from "stores/register/register.action";
import validator from "validator";
import router from "next/router";
import { ImageProfile } from "components";
import { BMIActions } from "stores/bmi/bmi.action";
import prefix from "utils/path";
import { ArrowDropDown } from "@material-ui/icons";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 20px",
    "& ::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& :: -webkit - outer - spin - button": {
      WebkitAppearance: "none",
      margin: 0,
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
      padding: "30px 30px 0 30px",
      display: "block",
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
  datePicker: {
    "& .react-date-picker__wrapper": {
      height: 50,
      borderColor: 'rgb(180, 180, 180)',
      borderRadius: '5px',
    },
    "& .react-date-picker__calendar": {
      zIndex: 10,
    },
    "& .react-date-picker__inputGroup": {
      // padding: '5px',
      paddingLeft: '20px',
      fontSize: '20px',
    },
    "& .react-calendar button abbr": {
      fontSize: 16,
    },
    "& .react-calendar__navigation": {
      "& span": {
        fontSize: 26,
      },
    },
  },
  dateTitle: {
    height: '28px',
    fontSize: '20px',
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { updateStatus } = useSelector(
    (state: IStates) => state.registerReducer
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [condition, setCondition] = useState(true);
  const [imgData, setImgData] = useState<File | null>(null);
  const { created_at_new } = useSelector((state: IStates) => state.bmiReducer);
  const testdate = new Date();
  const [imgProfile, setImgProfile] = useState(
    `${prefix}/images/profile_img.jpg`
  );
  const [sameAddress, setSameAddress] = useState(false);
  const [value, onChange] = useState(new Date());

  const [registerData, setRegisterData] = useState({
    first_name: profile?.first_name,
    password: "",
    last_name: profile?.last_name,
    gender: profile?.gender,
    type_id: profile?.type_id,
    current_address: profile?.information?.current_address,
    current_moo: profile?.information?.current_moo,
    current_t_code: profile?.information?.current_t_code,
    current_a_code: profile?.information?.current_a_code,
    current_p_code: profile?.information?.current_p_code,
    current_postcode: profile?.information?.current_postcode,
    birth_date: (profile?.information?.birth_date
      ? new Date(profile?.information?.birth_date)
      : new Date()),
    weight: profile?.information?.weight,
    height: profile?.information?.height,
    home_address: profile?.information?.home_address,
    home_moo: profile?.information?.home_moo,
    home_t_code: profile?.information?.home_t_code,
    home_a_code: profile?.information?.home_a_code,
    home_p_code: profile?.information?.home_p_code,
    home_postcode: profile?.information?.home_postcode,
  });

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      dispatch(
        ActionSaga({
          type: RegisterAction.CURRENT_A_LIST_R,
          payload: { code: profile?.information?.current_p_code },
        })
      );
      dispatch(
        ActionSaga({
          type: RegisterAction.CURRENT_T_LIST_R,
          payload: { code: profile?.information?.current_a_code },
        })
      );
      dispatch(
        ActionSaga({
          type: RegisterAction.HOME_A_LIST_R,
          payload: { code: profile?.information?.home_p_code },
        })
      );
      dispatch(
        ActionSaga({
          type: RegisterAction.HOME_T_LIST_R,
          payload: { code: profile?.information?.home_a_code },
        })
      );
      setRegisterData({
        first_name: profile?.first_name,
        password: "",
        last_name: profile?.last_name,
        gender: profile?.gender,
        type_id: profile?.type_id,
        current_address: profile?.information?.current_address,
        current_moo: profile?.information?.current_moo,
        current_t_code: profile?.information?.current_t_code,
        current_a_code: profile?.information?.current_a_code,
        current_p_code: profile?.information?.current_p_code,
        current_postcode: profile?.information?.current_postcode,
        birth_date: profile?.information?.birth_date
          ? new Date(profile?.information?.birth_date)
          : new Date(),
        weight: profile?.information?.weight,
        height: profile?.information?.height,
        home_address: profile?.information?.home_address,
        home_moo: profile?.information?.home_moo,
        home_t_code: profile?.information?.home_t_code,
        home_a_code: profile?.information?.home_a_code,
        home_p_code: profile?.information?.home_p_code,
        home_postcode: profile?.information?.home_postcode,
      });
      dispatch(
        ActionSaga({
          type: BMIActions.FETCH_BMI_R,
          payload: null,
        })
      );
      if (profile.avatar) {
        setImgProfile(profile.avatar);
      }
    }
    return () => { }
  }, [profile]);

  useEffect(() => {
    if (updateStatus === true) {
      setOpenDialog(true);
    }
  }, [updateStatus]);



  const {
    provinceList,
    currentAList,
    currentTList,
    homeAList,
    homeTList,
    userTypeList,
  } = useSelector((state: IStates) => state.registerReducer);
  const renderUserType = () => {
    if (userTypeList?.length > 0) {
      return (
        <>
          <option disabled={true}>กรุณาเลือกสถานะ</option>
          {userTypeList?.map((item: any) => (
            <option
              value={item.id}
              key={item.id}
              selected={item.id === profile.type_id}
            >
              {item.name}
            </option>
          ))}
        </>
      );
    }
  };
  const renderSubDistrict = (
    dataList: string[],
    defaultText: string,
    defaultSelect: number
  ) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option disabled={true} selected={defaultSelect === 0}>
            {defaultText}
          </option>
          {dataList?.map((item: any) => (
            <option
              value={item.t_code}
              key={item.id}
              selected={item.t_code === defaultSelect}
            >
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
  const renderDistrict = (
    dataList: string[],
    defaultText: string,
    defaultSelect: number
  ) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option disabled={true} selected={defaultSelect === 0}>
            {defaultText}
          </option>
          {dataList?.map((item: any) => (
            <option
              value={item.a_code}
              key={item.id}
              selected={item.a_code === defaultSelect}
            >
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
  const renderProvince = (
    dataList: string[],
    defaultText: string,
    defaultSelect: number
  ) => {
    if (dataList?.length > 0) {
      return (
        <>
          <option disabled={true} selected={defaultSelect === 0}>
            {defaultText}
          </option>
          {dataList?.map((item: any) => {
            // console.log(item.p_code, defaultSelect, item.p_code === defaultSelect)
            return (
              <option
                value={item.p_code}
                selected={item.p_code === defaultSelect}
                key={item.id}
              >
                {item.p_name}

              </option>
            )
          }

          )}
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
  const textA = (value: any) => {
    setRegisterData({
      ...registerData,
      birth_date: value,
    });
  };
  const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value)
    if (e.target.name === "gender") {
      if (value === "1") {
        setRegisterData({ ...registerData, ["gender"]: "M" });
      } else {
        setRegisterData({ ...registerData, ["gender"]: "F" });
      }
    } else if (
      id === "mobile" ||
      id === "identify_number " ||
      id === "current_postcode" ||
      id === "home_postcode" ||
      id === 'current_moo' ||
      id === 'home_moo'
    ) {
      const isNumber = validator.isInt(value);
      if (isNumber) {
        setRegisterData({ ...registerData, [id]: value });
      } else if (value === "") {
        setRegisterData({ ...registerData, [id]: value });
      }
    }
    //  else if (id === 'birth_date') {

    // }
    else {
      setRegisterData({ ...registerData, [id]: value });
    }

    if (id === "current_p_code") {
      dispatch(
        ActionSaga({
          type: RegisterAction.CURRENT_A_LIST_R,
          payload: { code: value },
        })
      );
      setRegisterData({
        ...registerData,
        current_p_code: value,
        current_a_code: 0,
        current_t_code: 0,
      });
    } else if (id === "current_a_code") {
      dispatch(
        ActionSaga({
          type: RegisterAction.CURRENT_T_LIST_R,
          payload: { code: value },
        })
      );

      setRegisterData({ ...registerData, current_a_code: value, current_t_code: 0 });
    } else if (id === 'home_p_code') {
      dispatch(
        ActionSaga({
          type: RegisterAction.HOME_A_LIST_R,
          payload: { code: value },
        })
      );
      setRegisterData({
        ...registerData,
        home_p_code: value,
        home_a_code: 0,
        home_t_code: 0,
      });
    } else if (id === "home_a_code") {
      dispatch(
        ActionSaga({
          type: RegisterAction.HOME_T_LIST_R,
          payload: { code: value },
        })
      );
      setRegisterData({ ...registerData, home_a_code: value, home_t_code: 0 });
    }
  };

  const ClickSave = () => {
    console.log(value)
    const con_weight: number[] = [10, 200];
    const con_height: number[] = [90, 250];
    if (
      registerData.weight < con_weight[0] ||
      registerData.weight > con_weight[1] ||
      parseFloat(registerData.height) < con_height[0] ||
      parseFloat(registerData.height) > con_height[1]
    ) {
      // console.log('test')
      setCondition(false);
      setOpenDialog(true);
    } else {
      let data = {
        id: profile.user_id,
        type_id: registerData.type_id,
        username: profile.username,
        gender: registerData.gender,
        identify_number: profile.identify_number,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        height: registerData.height,
        weight: registerData.weight,
        current_address: registerData.current_address,
        current_moo: registerData.current_moo,
        current_t_code: parseInt(registerData.current_t_code),
        current_a_code: parseInt(registerData.current_a_code),
        current_p_code: parseInt(registerData.current_p_code),
        current_postcode: registerData.current_postcode,
        avartar_type: "s3",
        birth_date: moment(registerData.birth_date).format("YYYY-MM-DD"),
        home_address: registerData.home_address,
        home_moo: registerData.home_moo,
        home_t_code: parseInt(registerData.home_t_code),
        home_a_code: parseInt(registerData.home_a_code),
        home_p_code: parseInt(registerData.home_p_code),
        home_postcode: registerData.home_postcode,
        // birth_date: `${registerData.date}/${registerData.month}/${registerData.year}`,
      };

      if (sameAddress) {
        data["home_address"] = registerData.current_address;
        data["home_moo"] = registerData.current_moo;
        data["home_t_code"] = parseInt(registerData.current_t_code);
        data["home_a_code"] = parseInt(registerData.current_a_code);
        data["home_p_code"] = parseInt(registerData.current_p_code);
        data["home_postcode"] = registerData.current_postcode;
      }
      let formData = new FormData();
      formData.append("form", JSON.stringify(data));
      if (imgData) {
        formData.append("file", imgData);
      }
      console.log('registerData', registerData)
      dispatch(
        ActionSaga({
          type: RegisterAction.UPDATE_PROFILE_R,
          payload: formData,
        })
      );
      setOpenDialog(true);
    }
  };
  const CloseDialog = () => {
    if (updateStatus) {
      dispatch(
        ActionSaga({
          type: RegisterAction.UPDATE_PROFILE_R,
          payload: { status: "finish" },
        })
      );
      router.push({ pathname: "/" });
    }
    setCondition(true);
    setOpenDialog(false);
  };
  const handleImage = ({ thumbnail }: { thumbnail: File }) => {
    if (thumbnail) {
      setImgData(thumbnail);
    }
  };

  return (
    <InnerLayout titlepage="ข้อมูลส่วนตัว">
      <Box className={classes.root}>
        <ImageProfile
          urlImgCurrent={imgProfile}
          handleImageChange={handleImage}
        />
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <TextFieldFixd
              label="เบอร์โทรศัพท์"
              value={profile.username}
              disabled={true}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextFieldFixd
              label="เลขบัตรประชาชน"
              placeholder="เลขบัตรประชาชน 13 หลัก"
              value={profile.identify_number}
              disabled={true}
            />
          </Grid>
          <Grid item sm={4} xs={12}></Grid>
          <Grid item sm={4} xs={12}>
            <TextFieldFixd
              label="ชื่อจริง"
              placeholder="ชื่อจริง"
              id="first_name"
              defaultValue={profile?.first_name}
              onChange={ChangeInput}
              value={registerData?.first_name}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextFieldFixd
              label="นามสกุล"
              placeholder="นามสกุล"
              id="last_name"
              defaultValue={profile?.last_name}
              value={registerData.last_name}
              onChange={ChangeInput}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <p className={classes.dateTitle}>วันเดือนปีเกิด</p>

            <Box className={classes.formGroup}>
              {/* <TextFieldFixd
                id="birth_date"
                name="birthday"
                label="วันเดือนปีเกิด"
                typeInput="date"
                value={registerData.birth_date}
                onChange={ChangeInput}
              /> */}

              <DatePicker
                className={classes.datePicker}
                onChange={(value: any) => {
                  onChange(value), textA(value);
                }}
                value={registerData.birth_date}
                locale="th"
              // defaultValue={registerData.birth_date}
              />
              {/* <SelectFixd label="วัน/เดือน/ปี" onChange={ChangeInput} id="date">
                <option disabled>วัน</option>
                {Array.from(
                  new Array(31),
                  (_val: number, index: number) => 1 + index
                ).map((value: number, _key: number) => {
                  return (
                    <option
                      value={value}
                      selected={value === parseInt(registerData.date)}
                    >
                      {value}
                    </option>
                  );
                })}
              </SelectFixd> */}
              {/* <SelectFixd onChange={ChangeInput} id="month">
                <option disabled>เดือน</option>
                {monthList.map((item: string, key: number) => {
                  return (
                    <option
                      value={key + 1}
                      selected={key + 1 === parseInt(registerData.month)}
                    >
                      {item}
                    </option>
                  );
                })}
              </SelectFixd> */}
              {/* <SelectFixd onChange={ChangeInput} id="year">
                <option disabled>ปี</option>
                {Array.from(
                  new Array(80),
                  (_val: number, index: number) =>
                    80 - index + new Date().getFullYear() + 543 - 80
                ).map((value: number, _key: number) => {
                  return (
                    <option
                      value={value - 543}
                      selected={value - 543 === parseInt(registerData.year)}
                    >
                      {value}
                    </option>
                  );
                })}
              </SelectFixd> */}
            </Box>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FormLabel component="label" className={classes.label}>
              เพศ
            </FormLabel>
            <RadioGroup
              name="gender"
              defaultValue={registerData.gender === "M" ? "1" : "2"}
              value={registerData.gender === "M" ? "1" : "2"}
              style={{ flexDirection: "row" }}
              onChange={ChangeInput}
              id="gender"
            >
              <RadioFixd label="ชาย" value="1" id="gender" />
              <RadioFixd label="หญิง" value="2" id="gender" />
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
              disabled={
                created_at_new &&
                testdate < created_at_new?.toDate() &&
                profile?.information?.weight
              }
              value={registerData.weight}
            />
          </Grid>
          <Grid item sm={2} xs={6}>
            <TextFieldFixd
              label="ส่วนสูง"
              placeholder="ส่วนสูง"
              id="height"
              onChange={ChangeInput}
              value={registerData.height}
              disabled={
                created_at_new &&
                testdate < created_at_new?.toDate() &&
                profile?.information?.height
              }
              typeInput="number"
            />
          </Grid>
          <Typography variant="h3" className={classes.titleTabs}>
            ที่อยู่
          </Typography>
          <Grid item sm={4} xs={12}>
            <TextFieldFixd
              id="current_address"
              label="บ้านเลขที่ / หมู่บ้าน / ซอย / ถนน"
              value={registerData.current_address}
              onChange={ChangeInput}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextFieldFixd
              id="current_moo"
              label="หมู่ที่"
              onChange={ChangeInput}
              value={registerData.current_moo}
            />
          </Grid>
          <Grid item sm={4} xs={12} id="current_p_code">
            <SelectFixd
              label="จังหวัด"
              id="current_p_code"
              onChange={ChangeInput}
            >
              {renderProvince(
                provinceList,
                "กรุณาเลือกจังหวัด",
                parseInt(registerData.current_p_code)
              )}
            </SelectFixd>
          </Grid>
          <Grid item sm={4} xs={12}>
            <SelectFixd
              label="อำเภอ"
              id="current_a_code"
              onChange={ChangeInput}
            >
              {renderDistrict(
                currentAList,
                "กรุณาเลือกอำเภอ",
                parseInt(registerData.current_a_code)
              )}
            </SelectFixd>
          </Grid>
          <Grid item sm={4} xs={12}>
            <SelectFixd
              label="ตำบล"
              id="current_t_code"
              onChange={ChangeInput}
            >
              {renderSubDistrict(
                currentTList,
                "กรุณาเลือกตำบล",
                parseInt(registerData.current_t_code)
              )}
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
        </Grid>
        <Box className={classes.collpase}>
          <Accordion>
            <AccordionSummary
              expandIcon={
                <ArrowDropDown style={{ color: "#fff", fontSize: 28 }} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.headingCollapse}>
                ที่อยู่ตามทะเบียนบ้าน
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckBoxFixd
                label="ที่อยู่ตามทะเบียนบ้านเหมือนที่อยู่ปัจจุบัน"
                marginbottom="20px"
                value={sameAddress}
                onChange={() => setSameAddress(!sameAddress)}
              />
              <Box className={classes.boxForm}>
                <Typography variant="h3" className={classes.titleTabs}>
                  ที่อยู่ตามทะเบียนบ้าน
                </Typography>

                <Grid container spacing={3}>
                  <Grid item sm={4} xs={12}>
                    <TextFieldFixd
                      label="บ้านเลขที่ / หมู่บ้าน / ซอย / ถนน"
                      id="home_address"
                      value={registerData.home_address}
                      onChange={ChangeInput}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <TextFieldFixd
                      id="home_moo"
                      label="หมู่ที่"
                      value={registerData.home_moo}
                      onChange={ChangeInput}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <SelectFixd
                      label="จังหวัด"
                      id="home_p_code"
                      onChange={ChangeInput}
                    >
                      {renderProvince(
                        provinceList,
                        "กรุณาเลือกจังหวัด",
                        parseInt(registerData.home_p_code)
                      )}
                    </SelectFixd>
                  </Grid>

                  <Grid item sm={4} xs={12}>
                    <SelectFixd
                      label="อำเภอ"
                      id="home_a_code"
                      onChange={ChangeInput}
                    >
                      {renderDistrict(
                        homeAList,
                        "กรุณาเลือกอำเภอ",
                        parseInt(registerData.home_a_code)
                      )}
                    </SelectFixd>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <SelectFixd
                      label="ตำบล"
                      id="home_t_code"
                      onChange={ChangeInput}
                    >
                      {renderSubDistrict(
                        homeTList,
                        "กรุณาเลือกตำบล",
                        parseInt(registerData.home_t_code)
                      )}
                    </SelectFixd>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <TextFieldFixd
                      label="รหัสไปรษณีย์"
                      id="home_postcode"
                      onChange={ChangeInput}
                      maxLength={5}
                      value={registerData.home_postcode}
                    />
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className={classes.collpase}>
          <br />
          <ControlButton justifycontent="center">
            <ButtonProps
              titlebutton="ยกเลิก"
              maxwidthbtn="155px"
              heightbtn="40px"
              background="linear-gradient(to top, #674EEF, #68D5E5)"
              onClick={() => {
                router.push({ pathname: "/" });
              }}
            />
            <ButtonProps
              titlebutton="บันทึก"
              maxwidthbtn="155px"
              heightbtn="40px"
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              onClick={ClickSave}
            />
          </ControlButton>
        </Box>

        <Box>
          <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
            <Box className={classes.dialog}>
              {condition ? (
                <Typography variant="h4">
                  {updateStatus ? "บันทึกข้อมูลสำเร็จ" : <CircularProgress />}
                </Typography>
              ) : (
                <Typography variant="h4">
                  น้ำหนักต้องอยู่ในช่วง 10-200 กก. ส่วนสูงต้องอยู่ในช่วง 90-250
                  ซม.
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
    </InnerLayout>
  );
};

export default ProfilePage;
