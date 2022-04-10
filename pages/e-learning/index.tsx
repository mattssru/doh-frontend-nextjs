import { makeStyles, Box, RadioGroup } from "@material-ui/core";
import { ControlButton, RadioFixd, TextFieldFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import router from "next/router";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    maxWidth: 700,
    margin: "0 auto",
    padding: "30px 30px",
    [theme.breakpoints.down("xs")]: {
      padding: "30px 15px",
    },
    "& .paddingLeft": {
      paddingLeft: 30,
    },
  },
}));

const index = () => {
  const classes = useStyles();
  const clickSave = () => {
    router.push('/e-learning/course-dpac')
  }
  return (
    <InnerLayout titlepage="โปรดเลือกสถานะ">
      <Box className={classes.root}>
        <RadioGroup name="q4" defaultValue="">
          <RadioFixd label="ประชาชนทั่วไป" value="1" fontsize="24px" />
          <RadioFixd label="อสม. / อสค." value="2" fontsize="24px" />
          <RadioFixd label="เจ้าหน้าที่สังกัดกระทรวงสาธารณสุข" value="3" />
          <Box className="paddingLeft">
            <TextFieldFixd
              placeholder="กรอกชื่อหน่วยงานของท่าน"
              margin="0 0 15px 0"
            />
          </Box>
          <RadioFixd label="เจ้าหน้าที่สังกัดกระทรวงสาธารณสุข" value="4" />
          <Box className="paddingLeft">
            <TextFieldFixd
              placeholder="เจ้าหน้าที่ในสถานประกอบการ"
              margin="0 0 15px 0"
            />
          </Box>
          <RadioFixd label="เจ้าหน้าที่สังกัดกระทรวงสาธารณสุข" value="5" />
          <Box className="paddingLeft">
            <TextFieldFixd
              placeholder="พนักงานองค์กรปกครองส่วนท้องถิ่น"
              margin="0 0 30px 0"
            />
          </Box>
        </RadioGroup>
        <ControlButton justifycontent="center">
          <ButtonProps
            titlebutton="ยกเลิก"
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
            onClick={() => router.back()}
          />
          <ButtonProps
            titlebutton="บันทึก"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
            onClick={clickSave}
          />
        </ControlButton>
      </Box>
    </InnerLayout>
  );
};

export default index;
