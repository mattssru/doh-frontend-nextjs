import { Box, makeStyles, RadioGroup, Typography } from "@material-ui/core";
import { ControlButton, RadioFixd } from "components/common";
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
      padding: "30px 17px",
    },
    "& h3": {
      textAlign: "center",
      fontSize: 30,
      lineHeight: "36px",
    },
    "& .boxQuiz": {
      marginBottom: 15,
      "& p": {
        fontSize: 20,
        lineHeight: "20px",
        marginBottom: 10,
      },
      "& .quizIn": {
        paddingLeft: 15,
      },
    },
  },
}));

const quiz = () => {
  const classes = useStyles();
  return (
    <InnerLayout titlepage="แบบทดสอบ บทที่ 1">
      <Box className={classes.root}>
        <Typography variant="h3">โปรดเลือกข้อที่ถูกที่สุด</Typography>
        <Box className="boxQuiz">
          <p>
            1. ท่านมีกิจกรรมทางกายระดับหนัก ซึ่งทำให้หายใจ
            แรงและเร็วกว่าปกติมากหรือหอบ ติดต่อกันเป็น ระยะเวลา อย่างน้อย 10
            นาที เช่น การยกหรือแบกของหนักๆ การขุดดิน งานก่อสร้าง เป็นต้น
            ใช่หรือไม่
          </p>
          <Box className="quizIn">
            <RadioGroup name="q1" defaultValue="">
              <RadioFixd label="ก. กอไก่" value="1" fontsize="20px" />
              <RadioFixd label="ข. ขอไข่" value="2" fontsize="20px" />
              <RadioFixd label="ค. คอควาย" value="3" fontsize="20px" />
              <RadioFixd label="ง. งองู" value="4" fontsize="20px" />
            </RadioGroup>
          </Box>
        </Box>
        <Box className="boxQuiz">
          <p>
            2. โดยปกติท่านมีกิจกรรมทางกายระดับหนัก ในแต่ละสัปดาห์เป็นจำนวนกี่วัน
          </p>
          <Box className="quizIn">
            <RadioGroup name="q1" defaultValue="">
              <RadioFixd label="ก. กอไก่" value="1" fontsize="20px" />
              <RadioFixd label="ข. ขอไข่" value="2" fontsize="20px" />
              <RadioFixd label="ค. คอควาย" value="3" fontsize="20px" />
              <RadioFixd label="ง. งองู" value="4" fontsize="20px" />
            </RadioGroup>
          </Box>
        </Box>
        <Box className="boxQuiz">
          <p>
            3. โดยปกติท่านมีกิจกรรมทางกายระดับหนักนั้น
            ในแต่ละวันท่านทำเป็นระยะเวลานานเท่าไร นึกถึงเฉพาะงานที่ติดต่อกัน 10
            นาทีขึ้นไป
          </p>
          <Box className="quizIn">
            <RadioGroup name="q1" defaultValue="">
              <RadioFixd label="ก. กอไก่" value="1" fontsize="20px" />
              <RadioFixd label="ข. ขอไข่" value="2" fontsize="20px" />
              <RadioFixd label="ค. คอควาย" value="3" fontsize="20px" />
              <RadioFixd label="ง. งองู" value="4" fontsize="20px" />
            </RadioGroup>
          </Box>
        </Box>
        <Box className="boxQuiz">
          <p>
            4. โดยปกติท่านมีกิจกรรมทางกายระดับปานกลาง
            ในแต่ละสัปดาห์เป็นจำนวนกี่วัน
          </p>
          <Box className="quizIn">
            <RadioGroup name="q1" defaultValue="">
              <RadioFixd label="ก. กอไก่" value="1" fontsize="20px" />
              <RadioFixd label="ข. ขอไข่" value="2" fontsize="20px" />
              <RadioFixd label="ค. คอควาย" value="3" fontsize="20px" />
              <RadioFixd label="ง. งองู" value="4" fontsize="20px" />
            </RadioGroup>
          </Box>
        </Box>
        <Box className="boxQuiz">
          <p>
            5. โดยปกติท่านมีกิจกรรมทางกายระดับปานกลางนั้น
            ในแต่ละวันท่านทำเป็นระยะเวลานานเท่าไร นึกถึงเฉพาะ งานที่ติดต่อกัน 10
            นาทีขึ้นไป
          </p>
          <Box className="quizIn">
            <RadioGroup name="q1" defaultValue="">
              <RadioFixd label="ก. กอไก่" value="1" fontsize="20px" />
              <RadioFixd label="ข. ขอไข่" value="2" fontsize="20px" />
              <RadioFixd label="ค. คอควาย" value="3" fontsize="20px" />
              <RadioFixd label="ง. งองู" value="4" fontsize="20px" />
            </RadioGroup>
          </Box>
        </Box>
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
            titlebutton="ส่งคำตอบ"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
          />
        </ControlButton>
      </Box>
    </InnerLayout>
  );
};

export default quiz;
