import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import {
  CheckBoxFixd,
  ControlButton,
  TextFieldFixd,
} from "components/common";
import SelectFixd from "components/common/SelectFixdValidate";
import { ButtonProps } from "components/common/button";
// import { IconUpload } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
// import UploadImage from "components/UploadImage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommunitiesAction } from "stores/communities/communities.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
import { useForm, Form } from 'hooks/useForm';
import { useRouter } from "next/router";
import ImageProfile from "components/ImageProfile";
import prefix from "utils/path";

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 15px",
    borderRadius: 5,
    "& h3": {
      fontSize: 30,
      lineHeight: "36px",
      textAlign: "center",
      marginBottom: 15,
    },
    "& ::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& :: -webkit - outer - spin - button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
  boxIn: {
    maxWidth: 400,
    margin: "0 auto",
  },
  radioAbsolute: {
    justifyContent: "center",
    paddingTop: 10,
    alignItems: "center",
    height: "100%",
  },
  uploadImage: {
    marginBottom: 25,
  },
  textHeader: {
    color: "#1688c4"
  },
  dialog: {
    margin: "20px",
    textAlign: "center",
    width: "300px",
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
  },
  limitBox: {
    marginTop: 30,
  }
}));

const initialValues = {
  commu_code: "",
  type_id: "",
  name: "",
  contact_desc: "",
  desc: "",
  announcement: "",
  amount: 0,
  official: 0,
  thumbnail: "",
  address: "",
  p_code: "",
  a_code: "",
  t_code: "",
};

const EditGroupPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { commuCode } = router.query;
  const {
    detailCommunities,
    provinceList,
    districtList,
    subDistrictList
  } = useSelector((state: IStates) => state.communitiesReducer);
  const [openDelete, setOpenDelete] = useState(false)
  const [openSubmit, setOpenSubmit] = useState(false)
  const [imgData, setImgData] = useState<File | null>(null);
  const [imgGroup, setImgGroup] = useState(`${prefix}/images/logo_print.svg`);
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (validate()) {
      setOpenSubmit(true)
      dispatch(
        ActionSaga({
          type: CommunitiesAction.UPDATE_COMMUNITIES_R,
          // payload: values
          payload: { inputValue: values, thumbnail: imgData, commu_code: commuCode }
        })
      )
    }
  }

  const handleCancel = () => {
    router.push(`/community/${commuCode}`)
  }

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_R,
        payload: commuCode
      })
    )
    dispatch(
      ActionSaga({
        type: CommunitiesAction.PROVINCE_LIST_R,
      })
    )
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_EVENT_R,
        payload: commuCode
      })
    )
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_ACTIVITIES_R,
      })
    )
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_NOTI_NEWS_R,
        payload: commuCode
      })
    )
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_DETAIL_GROUP_R,
        payload: commuCode
      })
    )
  }, [])

  useEffect(() => {
    if (detailCommunities.status_admin === 1) {
      if (detailCommunities.p_code != undefined) {
        dispatch(
          ActionSaga({
            type: CommunitiesAction.DISTRICT_LIST_R,
            payload: detailCommunities.p_code
          })
        )

        dispatch(
          ActionSaga({
            type: CommunitiesAction.SUB_DISTRICT_LIST_R,
            payload: detailCommunities.a_code
          })
        )
        // dispatch(communities.actions.setIsChecked(detailCommunities.amount == 0 ? true : false))
      }
      setValues({ ...detailCommunities })
    } else {
      router.push(`/community/${commuCode}`)
    }
    if (detailCommunities?.thumbnail) {
      setImgGroup(detailCommunities.thumbnail)
    }

  }, [detailCommunities])
  const setAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "noLimit") {
      setValues({
        ...values,
        ["amount"]: 0
      })
    } else {
      setValues({
        ...values,
        ["amount"]: parseInt(value)
      })
    }

  }
  const handleSelectProvince = (e: any) => {
    const { value } = e.target
    setValues({
      ...values,
      ['p_code']: value,
      ['a_code']: '',
      ['t_code']: ''
    })
    dispatch(
      ActionSaga({
        type: CommunitiesAction.DISTRICT_LIST_R,
        payload: value
      })
    )
    //   setIsDistrict(false)
    // dispatch(masterdata.actions.setIsProvinceId({key: 'current', data: value}))
  }

  const handleSelectDistrict = (e: any) => {
    const { value } = e.target
    setValues({
      ...values,
      ['a_code']: value,
      ['t_code']: ''
    })
    dispatch(
      ActionSaga({
        type: CommunitiesAction.SUB_DISTRICT_LIST_R,
        payload: value
      })
    )
  }

  const handleSelectSubdistrict = (e: any) => {
    const { value } = e.target
    setValues({
      ...values,
      ['t_code']: value
    })
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('name' in fieldValues) {
      temp.name = fieldValues.name ? "" : "กรุณากรอกชื่อกลุ่ม"
    }
    if ('contact_desc' in fieldValues) {
      temp.contact_desc = fieldValues.contact_desc ? "" : "กรุณากรอกข้อมูลการติดต่อ"
    }
    if ('desc' in fieldValues) {
      temp.desc = fieldValues.desc ? "" : "กรุณากรอกคำอธิบายกลุ่ม"
    }
    if ('address' in fieldValues) {
      temp.address = fieldValues.address ? "" : "กรุณากรอกข้อมูลที่อยู่"
    }
    if ('p_code' in fieldValues) {
      temp.p_code = fieldValues.p_code ? '' : "This field is required"
    }
    if ('a_code' in fieldValues) {
      temp.a_code = fieldValues.a_code ? '' : "This field is required"
    }
    if ('t_code' in fieldValues) {
      temp.t_code = fieldValues.t_code ? '' : "This field is required"
    }
    setErrors({
      ...errors,
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const renderProvince = () => {
    if (provinceList !== undefined && provinceList.length > 0) {
      return provinceList.map((item: any, key: any) => {
        return (
          <option key={key} value={item.p_code} selected={item.p_code === values.p_code}>{item.p_name}</option>
        )
      })
    } else {
      return ([])
    }
  }

  const renderDistrict = () => {
    if (districtList !== undefined && districtList.length > 0) {
      return districtList.map((item: any, key: any) => {
        return (
          <option key={key} value={item.a_code} selected={item.a_code === values.a_code}>{item.a_name}</option>
        )
      })
    } else {
      return ([])
    }
  }

  const renderSubDistrict = () => {
    if (subDistrictList !== undefined && subDistrictList.length > 0) {
      return subDistrictList.map((item: any, key: any) => {
        return (
          <option key={key} value={item.t_code} selected={item.t_code === values.t_code}>{item.t_name}</option>
        )
      })
    } else {
      return ([])
    }
  }
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);
  const ConfirmDelete = () => {
    //
    dispatch(
      ActionSaga({
        type: CommunitiesAction.DELETE_GROUP_R,
        payload: commuCode
      })
    )
    router.push('/community')
  }
  const handleImage = ({ thumbnail }: { thumbnail: File }) => {
    if (thumbnail) {
      setImgData(thumbnail);
    }

  };
  return (
    <InnerLayout titlepage="กลุ่ม">
      <Box className={classes.root}>
        <Typography variant="h3" className={classes.textHeader}>แก้ไขกลุ่ม (ผู้ดูแล)</Typography>
        <Form onSubmit={handleSubmit}>
          <Box className={classes.uploadImage}>
            <ImageProfile
              urlImgCurrent={imgGroup}
              handleImageChange={handleImage}
            />
            {/* <UploadImage
              name={"thumbnail"}
              text="อัปโหลดรูปภาพ"
              label="อัปโหลดรูปภาพ"
              icon={<IconUpload />}
            /> */}
          </Box>
          <Box className={classes.boxIn}>

            {/* <SelectFixd label="เลือกประเภทกลุ่ม" margin="0 0 10px 0">
                        <option value="">ชุมชน</option>
                    </SelectFixd> */}
            <TextFieldFixd
              label="ชื่อกลุ่ม"
              placeholder="กรอก..."
              margin="0 0 10px 0"
              name={'name'}
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <TextFieldFixd
              label="ข้อมูลติดต่อผู้ดูแล"
              placeholder="กรอก..."
              margin="0 0 10px 0"
              name="contact_desc"
              value={values.contact_desc}
              onChange={handleInputChange}
              error={errors.contact_desc}
            />
            <TextFieldFixd
              label="คำอธิบายกลุ่ม"
              placeholder="กรอก..."
              margin="0 0 10px 0"
              name="desc"
              value={values.desc}
              onChange={handleInputChange}
              error={errors.desc}
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextFieldFixd
                  label="จำนวนสมาชิกภายในกลุ่ม"
                  placeholder="ระบุจำนวน"
                  margin="0 0 20px 0"
                  typeInput='number'
                  name="amount"
                  id='amount'
                  value={values.amount}
                  onChange={setAmount}
                  error={errors.amount}
                />
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.limitBox}>
                  <CheckBoxFixd
                    label="ไม่จำกัด"
                    id="amount"
                    name="noLimit"
                    value={values.amount === 0}
                    onChange={setAmount}
                  />

                </Box>

                {/* <RadioGroup
                  name="gender"
                  defaultValue="1"
                  className={classes.radioAbsolute}
                >
                  <RadioFixd label="ไม่จำกัด" value="1" />
                </RadioGroup> */}
              </Grid>
            </Grid>

            <Typography variant="h3">ที่อยู่กลุ่ม</Typography>
            <TextFieldFixd
              label="ที่อยู่"
              defaultValue="5"
              margin="0 0 10px 0"
              value={values.address}
              onChange={handleInputChange}
              error={errors.address}
            />
            <SelectFixd
              label="จังหวัด"
              margin="0 0 10px 0"
              name={'p_code'}
              // value={values.p_code}
              // error={errors.p_code}
              onChange={handleSelectProvince}
            >
              <option disabled={true}> กรุณาเลือกจังหวัด </option>
              {renderProvince()}
            </SelectFixd>
            <SelectFixd
              label="อำเภอ"
              margin="0 0 10px 0"
              name={'current_a_code'}
              // value={values.a_code}
              // error={errors.a_code}
              onChange={handleSelectDistrict}
            >
              <option disabled={true} selected={values.a_code === ''}> กรุณาเลือกจังหวัดก่อน </option>
              {renderDistrict()}
            </SelectFixd>
            <SelectFixd
              label="ตำบล"
              margin="0 0 40px 0"
              name={'current_t_code'}
              // value={values.t_code}
              // error={errors.t_code}
              onChange={(e: any) => handleSelectSubdistrict(e)}
            >

              <option disabled={true} selected={values.t_code === ''}> กรุณาเลือกจังหวัดและอำเภอก่อน </option>
              {renderSubDistrict()}
            </SelectFixd>
            <ControlButton justifyContent="center">
              <ButtonProps
                titlebutton='ลบกลุ่ม'
                background="linear-gradient(to bottom, #E88EB2, #CC4467)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={() => setOpenDelete(true)}
              />
            </ControlButton>
            <br />
            <br />
            <ControlButton justifycontent="center">
              <ButtonProps
                titlebutton="ยกเลิก"
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={handleCancel}
              />
              <ButtonProps
                titlebutton="บันทึก"
                background="linear-gradient(to top, #8CA51E, #D0FD08)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={handleSubmit}
              />
            </ControlButton>
          </Box>
        </Form>
        <Dialog open={openDelete} maxWidth="md" onClose={() => setOpenDelete(false)}>
          <Box className={classes.dialog}>
            <Typography variant="h4">
              ยืนยันการลบกลุ่ม
            </Typography>
            <br />
            {/* <DialogActions> */}
            <ControlButton justifyContent='center'>
              <ButtonProps
                titlebutton='ลบกลุ่ม'
                background="linear-gradient(to bottom, #E88EB2, #CC4467)"
                // boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={ConfirmDelete}
              />
              <ButtonProps
                variant="contained"
                color="primary"
                heightbtn="46px"
                fontsizebtn="26px"
                titlebutton="ยกเลิก"
                onClick={() => setOpenDelete(false)}
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              />
            </ControlButton>

            {/* </DialogActions> */}
          </Box>
        </Dialog>
        <Dialog open={openSubmit} maxWidth='md' onClose={()=> setOpenSubmit(false)}>
          <Box className={classes.dialog}>
            <CircularProgress />
          </Box>
        </Dialog>
      </Box>
    </InnerLayout>
  );
};

export default EditGroupPage;