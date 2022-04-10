import {
  Box,
  createStyles,
  LinearProgress,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import CollapseFaq from "components/CollapseFaq";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import router from "next/router";
import React from "react";
import prefix from "utils/path";
import GetAppIcon from '@material-ui/icons/GetApp';

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
      fontSize: 30,
      lineHeight: "36px",
      textAlign: "center",
      marginBottom: 10,
    },
    "& .progressBar": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      // background: 'green',
      height: '20px'
    },
    "& .cardCourse": {
      padding: 17,
      boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
      borderRadius: 5,
      maxWidth: 330,
      margin: "0 auto 20px",
      "& .numberBar": {
        fontSize: 40,
        lineHeight: "48px",
        fontFamily: "DBHeavent_BoldCond",
        "& span": {
          fontSize: 20,
          lineHeight: "24px",
          color: "#AAAAAA",
        },
      },
    },
    "& .topCard": {
      display: "flex",
      alignItems: "center",
      cursor: 'pointer',
      "& img": {
        height: 81,
        marginRight: 25,
      },
      "& h4": {
        fontSize: 30,
        lineHeight: "30px",
        color: "#E96189",
      },
    },
    "& .contentCollapse": {
      marginBottom: 30,
      "& .MuiAccordionSummary-root": {
        minHeight: "60px !important",
        paddingLeft: `75px`,
        paddingTop: "10px",
        paddingBottom: "10px",
        borderRadius: 5,
        backgroundImage: `url('${prefix}/images/ic_faq.svg')`,
        backgroundSize: `40px`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `20px 10px`,
        [theme.breakpoints.down("xs")]: {
          backgroundPosition: `20px center`,
        },
      },
      "& .MuiAccordionSummary-content p": {
        display: "block",
        [theme.breakpoints.down("xs")]: {
          fontSize: "25px",
          lineHeight: "25px",
        },
      },
      "& .MuiAccordionSummary-expandIcon": {
        transform: "rotate(180deg)",
      },
      "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
        transform: "rotate(0deg)",
      },
      "& .content": {
        padding: `0 15px 0 75px`,
        backgroundImage: `url('${prefix}/images/ic_answer.svg')`,
        backgroundSize: `40px`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `20px -3px`,
        minHeight: `40px`,
        "& .MuiTypography-root": {
          fontSize: `24px`,
          lineHeight: `24px`,
          [theme.breakpoints.down("xs")]: {
            fontSize: "21px",
            lineHeight: "21px",
          },
        },
      },
    },
  },
  courseName: {
    paddingTop: '15px',
    fontSize: '20px',
    cursor: 'pointer',
  },
  loadIcon: {
    cursor: 'pointer',
  }
}));

const BorderLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 20,
      borderRadius: 10,
      width: "100%",
      maxWidth: 220,
    },
    colorPrimary: {
      backgroundColor: "#ECEFF0",
    },
    bar: {
      borderRadius: 10,
      backgroundColor: "#70B642",
    },
  })
)(LinearProgress);

const dataList = [
  { name: 'การออกกำลังกาย', url: 'testurl' },
  { name: 'การทานอาหารครบ5หมู่', url: 'testurl' }
]

const CourseDpac = () => {
  const classes = useStyles();

  const tablehead = ["ลำดับ", "ชื่อไฟล์", "ดาวน์โหลด"];
  const renderTable = (dataList: any) => {
    return dataList.map((item: any, index: any) => (
      <TableRow key={index}>
        {/* <TableCell align="center">
          {item.daydate + " " + monthname[Number(item.month)]}
        </TableCell> */}
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{item.name}</TableCell>
        <TableCell align="center">
          <GetAppIcon
            className={classes.loadIcon}
          />
        </TableCell>
      </TableRow>
    ));
  };
  return (
    <InnerLayout titlepage="หลักสูตร DPAC">
      <Box className={classes.root}>
        <Typography variant="h3">ผ่าน 3 ขั้นตอนง่าย ๆ</Typography>
        <Box className="cardCourse">
          <Box className="topCard" onClick={() => router.push('/e-learning/course')}>
            <img src={`${prefix}/images/course_01.svg`} alt="" />
            <Typography variant="h4">เข้าสู่บทเรียน</Typography>
          </Box>
          <p className={classes.courseName}>1. การทานอาหารมีประโยชน์</p>
          <Box className="progressBar">
            <BorderLinearProgress variant="determinate" value={50} />
            <Box className="numberBar">
              1<span> / 4</span>
            </Box>
          </Box>
          <p className={classes.courseName}>2. การออกำลังกาย</p>
          <Box className="progressBar">
            <BorderLinearProgress variant="determinate" value={50} />
            <Box className="numberBar">
              2<span> / 4</span>
            </Box>
          </Box>
        </Box>
        <Box className="cardCourse">
          <Box className="topCard" onClick={() => router.push('/e-learning/assessment')}>
            <img src={`${prefix}/images/course_02.svg`} alt="" />
            <Typography variant="h4">
              สอบประเมิน
              <br />
              หลักสูตร
            </Typography>
          </Box>
          <br />
          <Box className="progressBar">
            <BorderLinearProgress variant="determinate" value={0} />
            <Box className="numberBar">
              0<span> / 4</span>
            </Box>
          </Box>
        </Box>
        <Box className="cardCourse">
          <Box className="topCard">
            <img src={`${prefix}/images/course_03.svg`} alt="" />
            <Typography variant="h4">
              ดาวน์โหลด
              <br />
              ใบประกาศณียบัตร
            </Typography>
          </Box>
          <br />
          <Box className="progressBar">
            <BorderLinearProgress variant="determinate" value={0} />
            <Box className="numberBar">
              0<span> / 4</span>
            </Box>
          </Box>
        </Box>
        <Box className="contentCollapse">
          <CollapseFaq
            textalign="left"
            margin="inherit"
            backgroundcollape="#1688C4"
            headCollapse="เกี่ยวกับหลักสูตร"
          >
            <Box className="content">
              <Typography variant="h4">
                นักวิ่งที่ได้รับรางวัล
                สามารถตรวจสอบรายชื่อตัวเองได้จากระบบจับเวลาในงาน
                และต้องทำการรับใบรายงานผลการแข่งขันแบบไม่เป็นทางการเพื่อมาแสดงต่อเจ้าหน้าที่
                นักวิ่งจะต้องทำการยืนยันตัวตนโดยยื่นบัตรต่อไปนี้อย่างใดอย่างหนึ่งให้เจ้าหน้าที่ตรวจสอบตัวตน
              </Typography>
            </Box>
          </CollapseFaq>
        </Box>
        <TableDefault
          tablehead={tablehead}
          tablebody={renderTable(dataList)}
          action="n"
        />
        {/* <ButtonProps
          titlebutton="ดาวน์โหลดเอกสารประกอบการอบรม"
          backgroundcolorbtn="#E96189"
          maxwidthbtn="314px"
          marginbtn="0 auto 25px"
        /> */}
        <ButtonProps
          titlebutton="หน้าหลัก"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="5px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          heightbtn="40px"
          fontsizebtn="22px"
          maxwidthbtn="167px"
          marginbtn="0 auto"
          onClick={() => router.push('/')}
        />
      </Box>
    </InnerLayout>
  );
};

export default CourseDpac;
