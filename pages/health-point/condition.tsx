import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import router from "next/router";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    maxWidth: 700,
    margin: "0 auto",
    padding: "30px 15px",
    "& h3": {
      fontSize: 30,
      lineHeight: "36px",
      textAlign: "center",
      marginBottom: 15,
    },
  },
}));

const tablehead = ["เงื่อนไข", "แต้มสุขภาพ", "Exp"];
const tablebody = [
  {
    cell01: "ลงทะเบียนใหม่",
    cell02: "5 แต้ม",
    cell03: "5 Exp",
  },
  {
    cell01: "เชิญชวนเพื่อนลงทะเบียน",
    cell02: "3 แต้ม / คน",
    cell03: "3 Exp / คน",
  },
  {
    cell01: "ประเมิน BMI",
    cell02: "5 แต้ม / ครั้ง",
    cell03: "5 Exp / ครั้ง",
  },
  {
    cell01: "การเผาผลาญพลังงานทุกๆ 100 kcal",
    cell02: "1 แต้ม",
    cell03: "1 Exp",
  },
  {
    cell01: "ผ่านความสำเร็จ 1 ครั้ง",
    cell02: "5 แต้ม / ครั้ง",
    cell03: "5 Exp / ครั้ง",
  },
  {
    cell01: "รอบรู้สุขภาพ",
    cell02: "3 แต้ม / เรื่อง",
    cell03: "3 Exp / เรื่อง",
  },
  {
    cell01: "ผ่านการอบรมหลักสูตรฯ",
    cell02: "20 แต้ม",
    cell03: "20 Exp",
  },
  {
    cell01: "เข้าร่วมกลุ่ม",
    cell02: "5 แต้ม / กลุ่ม",
    cell03: "5 Exp / กลุ่ม",
  },
];

const renderTable = () => {
  return tablebody.map((item, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="center" style={{ width: "50%" }}>
          {item.cell01}
        </TableCell>
        <TableCell align="center" style={{ width: "25%" }}>
          {item.cell02}
        </TableCell>
        <TableCell align="center" style={{ width: "25%" }}>
          {item.cell03}
        </TableCell>
      </TableRow>
    );
  });
};
const ConditionPage = () => {
  const classes = useStyles();
  return (
    <InnerLayout titlepage="เงื่อนไขการรับแต้มต่าง ๆ">
      <Box className={classes.root}>
        <Typography variant="h3">เงื่อนไขการรับแต้มต่าง ๆ</Typography>
        <TableDefault
          tablehead={tablehead}
          tablebody={renderTable()}
          action="n"
          headcolor="#fff"
          bodycolor="#000"
          backgroundcolor="#449ae3"
          backgroundChildcolor="#f5f5f5"
        />
        <ButtonProps
          titlebutton="ย้อนกลับ"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="5px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          maxwidthbtn="200px"
          heightbtn="40px"
          fontsizebtn="22px"
          marginbtn="40px auto 0"
          onClick={() => router.back()}
        />
      </Box>
    </InnerLayout>
  );
};

export default ConditionPage;
