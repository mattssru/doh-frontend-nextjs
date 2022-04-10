import {
  Box,
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
import { ButtonProps } from "components/common/button";
import { IconUpload } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import UploadImage from "components/UploadImage";
import router from "next/router";
import React from "react";

const useStyles = makeStyles(() => ({
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
}));

const CreateGroupPage = () => {
  const classes = useStyles();
  return (
    <InnerLayout titlepage="กลุ่ม">
      <Box className={classes.root}>
        <Typography variant="h3">สร้างกลุ่ม</Typography>
        <Box className={classes.boxIn}>
          <SelectFixd label="เลือกประเภทกลุ่ม" margin="0 0 10px 0">
            <option value="">ชุมชน</option>
          </SelectFixd>
          <TextFieldFixd
            label="ชื่อกลุ่ม"
            placeholder="กรอก..."
            margin="0 0 10px 0"
          />
          <TextFieldFixd
            label="ข้อมูลติดต่อผู้ดูแล"
            placeholder="กรอก..."
            margin="0 0 10px 0"
          />
          <TextFieldFixd
            label="คำอธิบายกลุ่ม"
            placeholder="กรอก..."
            margin="0 0 10px 0"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextFieldFixd
                label="จำนวนสมาชิกภายในกลุ่ม"
                placeholder="ระบุจำนวน"
                margin="0 0 20px 0"
              />
            </Grid>
            <Grid item xs={6}>
              <RadioGroup
                name="gender"
                defaultValue="1"
                className={classes.radioAbsolute}
              >
                <RadioFixd label="ไม่จำกัด" value="1" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Box className={classes.uploadImage}>
            <UploadImage
              name={"thumbnail"}
              text="อัปโหลดรูปภาพ"
              label="อัปโหลดรูปภาพ"
              icon={<IconUpload />}
            />
          </Box>
          <Typography variant="h3">ที่อยู่กลุ่ม</Typography>
          <TextFieldFixd label="ที่อยู่" defaultValue="5" margin="0 0 10px 0" />
          <SelectFixd label="จังหวัด" margin="0 0 10px 0">
            <option value="">นนทบุรี</option>
          </SelectFixd>
          <SelectFixd label="อำเภอ" margin="0 0 10px 0">
            <option value="">เมืองนนทบุรี</option>
          </SelectFixd>
          <SelectFixd label="ตำบล" margin="0 0 40px 0">
            <option value="">ตลาดขวัญ</option>
          </SelectFixd>
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
            />
          </ControlButton>
        </Box>
      </Box>
    </InnerLayout>
  );
};

export default CreateGroupPage;
