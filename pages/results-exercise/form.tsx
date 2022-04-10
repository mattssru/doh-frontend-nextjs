import { Box, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";
import { ControlButton, ModalDefault, SelectFixd, TextFieldFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconUpload } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import UploadImage from "components/UploadImage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionReducer } from "services/action.reducer";
import { HomeAction } from "stores/home/home.action";
// import { ProfileAction } from "stores/profile/profile.action";
import { IStates } from "stores/root.reducer";
import validator from "validator";

const useStyles = makeStyles((theme: any) => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 15px",
    borderRadius: 5,
    "& ::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& :: -webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
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
  uploadImage: {
    marginBottom: 25,
  },
  center: {
    margin: '20px',
    textAlign: 'center',
    width: '300px',
    "& button": {
      background: "linear-gradient(to top, #8CA51E, #D0FD08)"
    },
    [theme.breakpoints.down('xs')]: {
      width: '250px',
    },
    "& h3": {
      color: "#70B642",
      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
    },
    "& .MuiTypography-body1": {

      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
      fontWeight: 'bold',
      color: 'black',
    },
  },
}));

const ResultFormPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { excerList, sendExcer } = useSelector((state: IStates) => state.homeReducer);
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const {
    activity_id,
  } = router.query;
  const [selectID, setSelectID] = useState(1);
  const [selectDetail, setSelectDetail] = useState({
    id: 0,
    calculate_type: 0,
    created_at: '',
    created_by: 0,
    name: "football",
    ordering: 15,
    publish: 1,
    thumbnail: '',
    updated_at: null,
    updated_by: null,
  });
  const [sendData, setSendData] = useState({
    distance: '',
    hour: '',
    minute: '',
    tiredness: '',
    calculate_type: 1,
  })
  const [imgData, setImgData] = useState<File | null>(null);
  useEffect(() => {
    dispatch(
      ActionReducer({
        type: HomeAction.EXCER_LIST_R,
      })
    )
  }, [])
  useEffect(() => {
    if (Object.keys(excerList).length !== 0) {
      // console.log(excerList[Object.keys(excerList)[0]])
      if (activity_id) {
        if (excerList.find((each: { id: number }) => each.id === parseInt(activity_id?.toString())) === undefined) {
          setSelectDetail(excerList[Object.keys(excerList)[0]])
          setSelectID(excerList[Object.keys(excerList)[0]].id)
        } else {
          setSelectDetail(excerList.find((each: { id: number }) => each.id === parseInt(activity_id?.toString())))
          setSelectID(excerList.find((each: { id: number }) => each.id === parseInt(activity_id?.toString())).id)
        }
      } else {
        setSelectDetail(excerList[Object.keys(excerList)[0]])
        setSelectID(excerList[Object.keys(excerList)[0]].id)
      }
    }
  }, [excerList])
  const changeExcerType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectDetail(excerList.find((each: { id: number }) => each.id === parseInt(value)));
    setSelectID(parseInt(value))
  }
  const renderExcerList = (defaultSelect: number) => {
    if (excerList?.length > 0) {
      // console.log(excerList)
      const myData = [].concat(excerList)
        .sort((a: any, b: any) => a.itemM > b.itemM ? -1 : 1)
        .map((item, _i) =>
          item
        );
      // console.log('myData', myData)
      return (
        <>
          {myData?.map((item: any) => (
            <option value={item.id} key={item.id} selected={item.id === defaultSelect}>{item.name}</option>
          ))}
        </>
      )
    }
  }
  const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'hour' || id === 'minute' || id === 'distance') {
      const isNumber = validator.isInt(value);
      if (isNumber) {
        setSendData({ ...sendData, [id]: value })
      } else if (value === '') {
        setSendData({ ...sendData, [id]: value })
      }
    } else {
      setSendData({ ...sendData, [id]: value })
    }
  }
  const ClickSave = () => {
    let data = {
      activity_id: selectID,
      calculate_type: '1',
      tiredness: sendData.tiredness,
      distance: sendData.distance,
      hour: sendData.hour,
      minute: sendData.minute,
    }
    if (selectDetail.calculate_type === 1) {
      data['calculate_type'] = '1'
      data['tiredness'] = ''
    }
    if (selectDetail.calculate_type === 2) {
      data['calculate_type'] = '2'
      data['distance'] = ''
    }
    let formData = new FormData()
    formData.append('form', JSON.stringify(data))
    if (imgData) {
      formData.append('file', imgData)
    }
    dispatch(
      ActionReducer({
        type: HomeAction.EXCER_SEND_R,
        payload: formData
      })
    )
    setOpenDialog(true);

  }
  const CloseDialog = () => {
    if (sendExcer?.status === 201) {
      // dispatch(
      //   ActionReducer({
      //     type: ProfileAction.PROFILE_R,
      //   }) 
      // )
      router.push({ pathname: '/results-exercise/result-status' })
    }
    setOpenDialog(false);

  }
  const handleImage = ({ thumbnail }: { thumbnail: File }) => {
    if (thumbnail) {
      setImgData(thumbnail)
    }
  };
  return (
    <InnerLayout titlepage="ส่งผลการออกกำลังกาย">
      <Box className={classes.root}>
        <Typography variant="h3">ส่งผลระยะทางและเวลา</Typography>
        <Box className={classes.boxIn}>
          <SelectFixd label="เลือกประเภทกีฬา" margin="0 0 10px 0" onChange={changeExcerType}>
            {renderExcerList(selectID)}
          </SelectFixd>

          {Object.keys(selectDetail).length !== 0 &&
            selectDetail?.calculate_type === 1 &&
            <>
              <TextFieldFixd
                label="กรอกระยะทาง (กิโลเมตร)"
                placeholder="กรอก..."
                margin="0 0 15px 0"
                id='distance'
                // onChange
                typeInput="number"
                onChange={ChangeInput}
              />
            </>
          }
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextFieldFixd
                label="ชั่วโมง"
                id="hour"
                placeholder="กรอกชั่วโมง"
                margin="0 0 15px 0"
                typeInput="number"
                onChange={ChangeInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldFixd
                label="นาที"
                id="minute"
                placeholder="กรอกนาที"
                margin="0 0 15px 0"
                typeInput="number"
                onChange={ChangeInput}
              />
            </Grid>
          </Grid>
          {Object.keys(selectDetail).length !== 0 &&
            selectDetail?.calculate_type === 2 &&
            <>
              <SelectFixd label="ระดับความเหนื่อย" id="tiredness" margin="0 0 10px 0" onChange={ChangeInput}>
                <option disabled selected>กรุณาเลือกระดับความเหนื่อย</option>
                <option value="L">เหนื่อยนิดหน่อย</option>
                <option value="N">เหนื่อยปานกลาง</option>
                <option value="H">เหนื่อยมาก</option>
              </SelectFixd>
            </>
          }
          <Box className={classes.uploadImage}>
            <UploadImage
              name="thumbnail"
              text="อัปโหลดรูปภาพ"
              label="อัปโหลดรูปภาพ"
              icon={<IconUpload />}
              handleImageChange={handleImage}
            />
          </Box>
          <ControlButton justifycontent="center">
            <ButtonProps
              titlebutton="ยกเลิก"
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              fontsizebtn="22px"
              onClick={() => router.back()}
            />
            {(selectID === 1 || selectID === 2) ?
              (imgData ?
                <ButtonProps
                  titlebutton="บันทึก"
                  background="linear-gradient(to top, #8CA51E, #D0FD08)"
                  borderradiusbtn="5px"
                  boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                  heightbtn="40px"
                  fontsizebtn="22px"
                  onClick={ClickSave}
                  actionBtn={selectDetail?.calculate_type === 1 ?
                    (sendData.distance ? false : true)
                    :
                    (sendData.tiredness ? false : true)
                  }
                />
                :
                <ButtonProps
                  titlebutton="บันทึก"
                  background="linear-gradient(to top, #8CA51E, #D0FD08)"
                  borderradiusbtn="5px"
                  boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                  heightbtn="40px"
                  fontsizebtn="22px"
                  onClick={ClickSave}
                  actionBtn={true}
                />
              )
              :
              <ButtonProps
                titlebutton="บันทึก"
                background="linear-gradient(to top, #8CA51E, #D0FD08)"
                borderradiusbtn="5px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="40px"
                fontsizebtn="22px"
                onClick={ClickSave}
                actionBtn={selectDetail?.calculate_type === 1 ?
                  (sendData.distance ? false : true)
                  :
                  (sendData.tiredness ? false : true)
                }
              />
            }


          </ControlButton>
        </Box>
        <Box>
          <ModalDefault
            open={openDialog} onClose={CloseDialog}
          >
            <div className={classes.center}>
              <Typography variant="body1">{sendExcer?.message ? sendExcer.message : <CircularProgress />}</Typography>
              {/* {`${public_host}/register/?ebib_code=${profile.ebib_code}`} */}
              <ButtonProps
                variant="contained"
                color="primary"
                marginbtn="10px 0"
                titlebutton="ปิด"
                maxwidthbtn="100%"
                onClick={CloseDialog}
              // background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              />
            </div>

          </ModalDefault>
        </Box>
      </Box>
    </InnerLayout>
  );
};

export default ResultFormPage;
