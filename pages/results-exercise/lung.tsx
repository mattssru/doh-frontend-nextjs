import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { ControlButton, ModalDefault, TextFieldFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconUpload } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import UploadImage from "components/UploadImage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionReducer } from "services/action.reducer";
import { HomeAction } from "stores/home/home.action";
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
  const { sendExcer } = useSelector((state: IStates) => state.homeReducer);
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [minute, setMinute] = useState('');
  const [imgData, setImgData] = useState<File | null>(null);

  const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'minute') {
      const isNumber = validator.isInt(value);
      if (isNumber) {
        setMinute(value)
      } else if (value === '') {
        setMinute('')
      }
    } else {

    }
  }
  const ClickSave = () => {
    dispatch(
      ActionReducer({
        type: HomeAction.EXCER_SEND_S,
        payload: {}
      })
    )
    let data = {
      minute: minute,
    }

    let formData = new FormData()
    formData.append('form', JSON.stringify(data))
    if (imgData) {
      formData.append('file', imgData)
    }
    dispatch(
      ActionReducer({
        type: HomeAction.LUNG_SEND_R,
        payload: formData,
      })
    )

    setOpenDialog(true);

  }
  const CloseDialog = () => {
    if (sendExcer?.status === 201) {
      router.push({ pathname: '/' })
    }
    setOpenDialog(false);

  }
  const handleImage = ({ thumbnail }: { thumbnail: File }) => {
    if (thumbnail) {
      setImgData(thumbnail)
    }
  };
  return (
    <InnerLayout titlepage="ส่งผลการบริหารปอด">
      <Box className={classes.root}>
        <Typography variant="h3">กรอกเวลา</Typography>
        <Box className={classes.boxIn}>
          <Grid item xs={12}>
            <TextFieldFixd
              label="นาที"
              id="minute"
              placeholder="กรอกนาที"
              margin="0 0 15px 0"
              onChange={ChangeInput}
              typeInput="number"
            />
          </Grid>
          <Box className={classes.uploadImage}>
            <UploadImage
              name={"thumbnail"}
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
            <ButtonProps
              titlebutton="บันทึก"
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              fontsizebtn="22px"
              onClick={ClickSave}
            // actionBtn={selectDetail?.calculate_type === 1 ?
            //   (sendData.distance ? false : true)
            //   :
            //   (sendData.tiredness ? false : true)
            // }
            />
          </ControlButton>
        </Box>
        <Box>
          <ModalDefault
            open={openDialog} onClose={CloseDialog}
          >
            <div className={classes.center}>
              <Typography variant="body1">{sendExcer?.message && sendExcer.message}</Typography>
              <ButtonProps
                variant="contained"
                color="primary"
                marginbtn="10px 0"
                titlebutton="ปิด"
                maxwidthbtn="100%"
                onClick={CloseDialog}
              />
            </div>

          </ModalDefault>
        </Box>
      </Box>
    </InnerLayout >
  );
};

export default ResultFormPage;
