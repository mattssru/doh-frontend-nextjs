import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  CheckBoxFixd,
  ControlButton,
  SelectFixd,
  TextFieldFixd
} from "components/common";
import { ButtonProps } from "components/common/button";
import { IconUpload } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import UploadImageCustom from "components/UploadImageCustom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommunitiesAction } from "stores/communities/communities.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
import { useForm, Form } from 'hooks/useForm';
import { useRouter } from "next/router";


const useStyles = makeStyles((theme) => ({
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
  },
}));

const initialValues = {
  type_id: '',
  name: '',
  contact_desc: '',
  desc: '',
  announcement: '',
  amount: 0,
  official: 0,
  thumbnail: '',
  address: '',
  p_code: '',
  a_code: '',
  t_code: '',
  checked: false
};

// interface IinitialValues {
//   type_id:any,
//   name:any,
//   contact_desc:any,
//   desc:any,
//   announcement:any,
//   amount: any,
//   official: any,
//   thumbnail:any,
//   address:any,
//   p_code: any,
//   a_code: any,
//   t_code: any,
//   checked: any
// }

const CreateGroupPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { listCommunitiesType, provinceList, districtList, subDistrictList, createCommunitiesRes } = useSelector((state: IStates) => state.communitiesReducer);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isDistrict, setIsDistrict] = React.useState(true);
  const [isSubdistrict, setIsSubdistrict] = React.useState(true);
  const [resMsg, setResMsg] = useState('');

  const validate = (fieldValues = values) => {
    // let temp = { ...errors as unknown as IinitialValues  }
    let temp = { ...errors }

    // let temp = {
    //   type_id:'',
    //   name:'',
    //   contact_desc:'',
    //   desc:'',
    //   announcement:'',
    //   amount: 0,
    //   official: 0,
    //   thumbnail:'',
    //   address:'',
    //   p_code: '',
    //   a_code: '',
    //   t_code: '',
    //   checked: false
    // }

    if ('type_id' in fieldValues) {
      temp.type_id = fieldValues.type_id ? '' : "เลือกประเภทกลุ่ม"
    }
    if ('name' in fieldValues) {
      temp.name = fieldValues.name ? "" : "กรอกชื่อกลุ่ม"
    }
    if ('contact_desc' in fieldValues) {
      temp.contact_desc = fieldValues.contact_desc ? "" : "กรอกข้อมูลติดต่อผู้ดูแล"
    }
    if ('desc' in fieldValues) {
      temp.desc = fieldValues.desc ? "" : "กรอกคำอธิบายกลุ่ม"
    }
    if ('address' in fieldValues) {
      temp.address = fieldValues.address ? "" : "กรอกที่อยู่"
    }
    if ('p_code' in fieldValues) {
      temp.p_code = fieldValues.p_code ? '' : "กรอกจังหวัด"
    }
    if ('a_code' in fieldValues) {
      temp.a_code = fieldValues.a_code ? '' : "กรอกอำเภอ"
    }
    if ('t_code' in fieldValues) {
      temp.t_code = fieldValues.t_code ? '' : "กรอกตำบล"
    }

    setErrors({
      ...errors,
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = (e: any) => {
    setCreateBtn(true)
    e.preventDefault()
    if (validate()) {
      setResMsg('กำลังสร้างกลุ่ม')
      const inputValue = {
        type_id: values.type_id,
        name: values.name,
        contact_desc: values.contact_desc,
        desc: values.desc,
        announcement: values.announcement,
        amount: values.amount,
        official: values.official,
        address: values.address,
        p_code: values.p_code,
        a_code: values.a_code,
        t_code: values.t_code
      }
      dispatch(
        ActionSaga({
          type: CommunitiesAction.CREATE_COMMUNITIES_R,
          payload: { inputValue: inputValue, thumbnail: values.thumbnail }
        })
      )
    } else {
      setResMsg('สร้างกลุ่มไม่สำเร็จ')

    }
  }

  const handleImage = (thumbnail: any) => {
    setValues({
      ...values,
      ...thumbnail,
    })
  }

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_COMMUNITIES_R,
      })
    )
    dispatch(
      ActionSaga({
        type: CommunitiesAction.PROVINCE_LIST_R,
      })
    )
  }, []);
  const [createBtn, setCreateBtn] = useState(false)

  useEffect(() => {
    if (Object.keys(createCommunitiesRes).length) {

      setResMsg('สร้างกลุ่มสำเร็จ')
    }
  }, [createCommunitiesRes])


  useEffect(() => {
    if (createCommunitiesRes.commu_code != null) {
      // router.push(`/community/${createCommunitiesRes.commu_code}`)
    }
  }, [createCommunitiesRes.commu_code]);

  const setAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'noLimit') {
      setValues({
        ...values,
        ['amount']: 0,
        ['checked']: true,
      })
      setIsChecked(true)
    } else {
      setValues({
        ...values,
        ['amount']: value,
        ['checked']: false,
      })
      setIsChecked(false)
    }
  }

  // const handleChecked = () => {
  //   console.log('hi', values.isChecked)
  //   if (values.isChecked) {
  //     setValues({
  //       ...values,
  //       ['amount']: 0,
  //     })
  //   }
  //   setValues({
  //     ...values,
  //     ['checked']: !isChecked
  //   })
  //   setIsChecked(!isChecked)
  // }

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
    setIsDistrict(false)
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
    setIsSubdistrict(false)
  }

  const handleSelectSubdistrict = (e: any) => {
    const { value } = e.target
    setValues({
      ...values,
      ['t_code']: value
    })
  }

  const handleInputChangeType = (e: any) => {
    const { value } = e.target
    setValues({
      ...values,
      ['type_id']: value
    })
  }


  const renderCommunitiesType = () => {
    if (listCommunitiesType !== undefined && listCommunitiesType.length > 0) {
      return listCommunitiesType.map((item: any, key: any) => {
        return (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        );
      });
    } else {
      return [];
    }
  };

  const renderProvince = () => {
    if (provinceList !== undefined && provinceList.length > 0) {
      return provinceList.map((item: any, key: any) => {
        return (
          <option key={key} value={item.p_code}>{item.p_name}</option>
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
          <option key={key} value={item.a_code}>{item.a_name}</option>
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
          <option key={key} value={item.t_code}>{item.t_name}</option>
        )
      })
    } else {
      return ([])
    }
  }

  return (
    <InnerLayout titlepage="กลุ่ม">
      <Box className={classes.root}>
        <Typography variant="h3">สร้างกลุ่ม</Typography>
        <Box className={classes.boxIn}>
          <Form onSubmit={handleSubmit}>
            <SelectFixd
              label="เลือกประเภทกลุ่ม"
              margin="0 0 10px 0"
              name={'type_id'}
              value={values.type_id}
              onChange={handleInputChangeType}
              error={errors.type_id}
            >
              <option value="">กรุณาเลือกประเภทกลุ่ม</option>
              {renderCommunitiesType()}
            </SelectFixd>
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
              // margin="0 0 10px 0"
              multiline
              rows="5"
              name={'contact_desc'}
              value={values.contact_desc}
              onChange={handleInputChange}
              error={errors.contact_desc}
            />
            <TextFieldFixd
              label="คำอธิบายกลุ่ม"
              placeholder="กรอก..."
              margin="0 0 10px 0"
              name={'desc'}
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
                  name={'amount'}
                  value={values.amount}
                  onChange={handleInputChange}
                  error={errors.amount}
                />
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.limitBox}>
                  <CheckBoxFixd
                    label="ไม่จำกัด"
                    id="amount"
                    name="noLimit"
                    value={isChecked}
                    onChange={setAmount}
                  // onClick={handleChecked}
                  />

                </Box>
                {/* <RadioGroup
                  name="gender"
                  defaultValue="1"
                  className={classes.radioAbsolute}
                  
                >
                  <RadiogroupCustom
                    label="ไม่จำกัด"
                    checked={isChecked}
                    onClick={handleChecked}
                  />
                </RadioGroup> */}
              </Grid>
            </Grid>
            <Box className={classes.uploadImage}>
              <UploadImageCustom
                name={"thumbnail"}
                text="อัปโหลดรูปภาพ"
                label="อัปโหลดรูปภาพ"
                error={errors.thumbnail}
                handleImageChange={handleImage}
                icon={<IconUpload />}
              />
            </Box>
            <Typography variant="h3">ที่อยู่กลุ่ม</Typography>
            <TextFieldFixd
              label="ที่อยู่"
              defaultValue="5"
              margin="0 0 10px 0"
              name={'address'}
              value={values.address}
              onChange={handleInputChange}
              error={errors.address}
            />
            <SelectFixd
              label="จังหวัด"
              margin="0 0 10px 0"
              name={'p_code'}
              value={values.p_code}
              error={errors.p_code}
              onChange={handleSelectProvince}
            >
              <option value="">กรุณาเลือกจังหวัด</option>
              {renderProvince()}
            </SelectFixd>
            <SelectFixd
              label="อำเภอ"
              margin="0 0 10px 0"
              name={'a_code'}
              value={values.a_code}
              error={errors.a_code}
              disabled={isDistrict}
              onChange={handleSelectDistrict}
            >
              <option value="">กรุณาเลือกอำเภอ</option>
              {renderDistrict()}
            </SelectFixd>
            <SelectFixd
              label="ตำบล"
              margin="0 0 40px 0"
              name={'t_code'}
              value={values.t_code}
              error={errors.t_code}
              disabled={isSubdistrict}
              onChange={(e: any) => handleSelectSubdistrict(e)}
            >
              <option value="">กรุณาเลือกตำบล</option>
              {renderSubDistrict()}
            </SelectFixd>
            <ControlButton justifycontent="center">
              <ButtonProps
                titlebutton="ยกเลิก"
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={() => router.back()}
              />
              <ButtonProps
                titlebutton="บันทึก"
                background="linear-gradient(to top, #8CA51E, #D0FD08)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                type="submit"
                actionBtn={createBtn}
                onClick={handleSubmit}
              />
            </ControlButton>
          </Form>
        </Box>
        <Dialog open={createBtn} maxWidth="md">
          <Box className={classes.dialog}>
            <Typography variant="h4">
              {resMsg}
            </Typography>
            <br />
            {resMsg === 'สร้างกลุ่มไม่สำเร็จ' ?
              <ButtonProps
                titlebutton="ปิด"
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={() => {
                  setResMsg('')
                  setCreateBtn(false)
                }

                }
              />
              :
              (resMsg === 'สร้างกลุ่มสำเร็จ' ?
                <ButtonProps
                  titlebutton="ปิด"
                  background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                  boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                  heightbtn="46px"
                  fontsizebtn="26px"
                  onClick={() => {
                    setResMsg('')
                    router.push(`/community/${createCommunitiesRes.commu_code}`)
                  }
                  }
                />
                : <CircularProgress />)
            }

            <br />
          </Box>
        </Dialog>
      </Box>
    </InnerLayout>
  );
};

export default CreateGroupPage;
