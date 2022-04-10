import { Box, makeStyles, Typography } from "@material-ui/core";
import { ButtonProps } from "components/common/button";
import { IconCupmd } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    maxWidth: 700,
    margin: "0 auto",
    padding: "15px 15px 60px 15px",
    "& .img": {
      width: "100%",
      position: "relative",
      paddingTop: "57%",
      marginBottom: 20,
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        borderRadius: 5,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
  },
  detail: {
    "& .date": {
      fontSize: 20,
      lineHeight: "24px",
      color: "#AAAAAA",
    },
    "& .topic": {
      fontSize: 24,
      lineHeight: "29px",
      color: "#000",
      marginBottom: 5,
    },
    "& .detail": {
      fontSize: 20,
      lineHeight: "20px",
      color: "#000",
      marginBottom: 30,
    },
  },
  number: {
    display: "flex",
    "& .number": {
      fontSize: 50,
      lineHeight: "60px",
      color: "#E96189",
      paddingRight: 15,
      marginRight: 15,
      position: "relative",
      fontFamily: "DBHeavent_BoldCond",
      "&::before": {
        position: "absolute",
        content: "''",
        width: 3,
        height: "calc(100% - 20px)",
        backgroundColor: "#000",
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
      },
      "&:last-child::before": {
        display: "none",
      },
      "& span": {
        fontSize: 20,
        lineHeight: "24px",
        verticalAlign: "middle",
        color: "#000",
        paddingLeft: 5,
      },
    },
  },
}));

const HealthDetail = () => {
  const classes = useStyles();
  return (
    <InnerLayout titlepage="แลกลุ้นของรางวัล">
      <Box className={classes.root}>
        <Box className="img">
          <img src={`${prefix}/images/img_detail.svg`} alt="" />
        </Box>
        <Box className={classes.number}>
          <Box className="number">
            100
            <span>แต้ม</span>
          </Box>
          <Box className="number">
            2/2
            <span>สิทธิ์</span>
          </Box>
        </Box>
        <Box className={classes.detail}>
          <Typography component="p" className="date">
            7 ม.ค. 64
          </Typography>
          <Typography variant="h3" className="topic">
            รางวัลสำหรับคนรักสุขภาพ
          </Typography>
          <Typography component="p" className="detail">
            นักวิ่งที่ได้รับรางวัล สามารถตรวจสอบรายชื่อตัวเองได้จาก
            ระบบจับเวลาในงาน และต้องทำการรับใบรายงานผลการ
            แข่งขันแบบไม่เป็นทางการเพื่อมาแสดงต่อเจ้าหน้าที่ นักวิ่งจะ
            ต้องทำการยืนยันตัวตนโดยยื่นบัตรต่อไปนี้อย่างใดอย่างหนึ่ง
            ให้เจ้าหน้าที่ตรวจสอบตัวตน
          </Typography>
        </Box>
        <ButtonProps
          titlebutton="แลกของรางวัล"
          backgroundcolorbtn="#449AE3"
          borderradiusbtn="22px"
          heightbtn="40px"
          maxwidthbtn="195px"
          marginbtn="0 auto"
          fontsizeicon="30px !important"
          startIcon={<IconCupmd />}
        />
      </Box>
    </InnerLayout>
  );
};

export default HealthDetail;
