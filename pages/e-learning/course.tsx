import { Box, makeStyles, Typography } from "@material-ui/core";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import router from "next/router";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .cardLesson": {
      backgroundColor: "#fff",
      borderRadius: 5,
      boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
      maxWidth: 700,
      margin: "0 auto 20px",
      padding: 30,
      [theme.breakpoints.down("xs")]: {
        padding: "30px 15px",
      },
      "& h4": {
        textAlign: "center",
      },
      "& p": {
        fontSize: 22,
        lineHeight: "24px",
        color: "#848484",
        marginBottom: 20,
      },
      "& .textAction": {
        display: "flex",
        alignItems: "center",
        fontSize: 22,
        lineHeight: "24px",
        color: "#848484",
        marginBottom: 10,
        "& img": {
          marginRight: 10,
        },
      },
    },
  },
}));

const lesson = () => {
  const classes = useStyles();
  return (
    <InnerLayout titlepage="คอสเรียน">
      <Box className={classes.root}>
        <Box className="cardLesson">
          <Typography variant="h4">การทานอาหารมีประโยชน์</Typography>
          <Typography component="p">
            คือ ตัวชี้วัดมาตรฐานเพื่อประเมินสภาวะของร่างกาย
            ว่ามีความสมดุลของน้ำหนักตัวต่อส่วนสูงอยู่ในเกณฑ์
            ที่เหมาะสมหรือไม่...
          </Typography>
          <ButtonProps
            titlebutton="ดูบทเรียน"
            backgroundcolorbtn="#9BCC5E"
            maxwidthbtn="320px"
            marginbtn="0 auto 25px"
            onClick={() => router.push({ pathname: '/e-learning/lesson', query: { courseId: 1 } })}
          />
          <Box className="textAction pass">
            <img src={`${prefix}/images/pass.svg`} alt="" />
            เข้าเรียนอย่างน้อย 30 นาที
          </Box>
        </Box>
        <Box className="cardLesson">
          <Typography variant="h4">การออกำลังกาย</Typography>
          <Typography component="p">
            คือ ตัวชี้วัดมาตรฐานเพื่อประเมินสภาวะของร่างกาย
            ว่ามีความสมดุลของน้ำหนักตัวต่อส่วนสูงอยู่ในเกณฑ์
            ที่เหมาะสมหรือไม่...
          </Typography>
          <ButtonProps
            titlebutton="ดูบทเรียน"
            backgroundcolorbtn="#9BCC5E"
            maxwidthbtn="320px"
            marginbtn="0 auto 25px"
            onClick={() => router.push({ pathname: '/e-learning/lesson', query: { courseId: 2 } })}
          />
          <Box className="textAction pass">
            <img src={`${prefix}/images/pass.svg`} alt="" />
            เข้าเรียนอย่างน้อย 30 นาที
          </Box>
        </Box>

        <ButtonProps
          titlebutton="กลับ"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="5px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          heightbtn="40px"
          fontsizebtn="22px"
          maxwidthbtn="167px"
          marginbtn="40px auto 0"
          onClick={() => router.back()}
        />
      </Box>
    </InnerLayout>
  );
};

export default lesson;
