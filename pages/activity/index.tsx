import { Box, TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ControlButton, ModalCommon } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import router from "next/router";
import React, { useState } from "react";
import prefix from "utils/path";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "5px",
    maxWidth: 700,
    margin: "0 auto",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "20px",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  header: {
    // display: "flex",
    alignItems: "center",
    position: "relative",
    "& p": {
      fontSize: 30,
      lineHeight: "36px",
      fontFamily: "DBHeavent_MedCond",
      color: "#000",
      textAlign: "center",
    },
    "& img": {
      position: "absolute",
      right: 0,
      top: -2,
    },
  },
  boxDetail: {
    marginTop: 24,
    marginBottom: 25,
  },
  detail: {
    display: "flex",
    marginTop: 6,
  },
  detailTitle: {
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DBHeavent_MedCond",
    width: 125,
  },
  detailData: {
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DB Heavent",
    width: "100%",
    position: "relative",
    "&::before": {
      content: '":"',
      display: "block",
      position: "absolute",
      left: "-6px",
      top: "-1px",
    },
  },
  buttongroup: {
    marginTop: 30,
    marginBottom: 20,
  },
  dialog: {
    backgroundColor: "#fff",
    backgroundImage: "unset !important",
    // padding: "16px !important",
    // justifyContent: "unset !important"
  },
  textModalHead: {
    color: "#1688c4",
    fontSize: 48,
    lineHeight: "58px",
    fontFamily: "DBHeavent_MedCond",
    width: "100%",
    textAlign: "center",
  },
  textModalDetail: {
    color: "#000",
    fontSize: 24,
    lineHeight: "29px",
    fontFamily: "DB Heavent",
    width: "100%",
    textAlign: "center",
    marginBottom: 30,
  },
}));

const ActivityPage = () => {
  const classes = useStyles();

  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };

  const tablehead = ["e-BIB", "ชื่อ - นามสกุล", "กิโลเมตร"];
  const tablebody = [
    {
      cell01: "000123",
      cell02: "กิจกวิน สัจจานันดร์",
      cell03: "10.25",
    },
    {
      cell01: "000124",
      cell02: "ขจรศักดิ์ ส่องแสง",
      cell03: "9.56",
    },
    {
      cell01: "000125",
      cell02: "งามทิพย์ ประกายทอง",
      cell03: "8.25",
    },
    {
      cell01: "000126",
      cell02: "กิจกวิน สัจจานันดร์",
      cell03: "8.00",
    },
  ];

  const renderTable = () => {
    return tablebody.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="center" style={{ width: "20%" }}>
            {item.cell01}
          </TableCell>
          <TableCell align="center" style={{ width: "50%" }}>
            {item.cell02}
          </TableCell>
          <TableCell align="center" style={{ width: "30%" }}>
            {item.cell03}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <InnerLayout titlepage="กิจกรรม">
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography>ก้าวท้าใจไปด้วยกัน</Typography>
          <img
            src={`${prefix}/icons/ic_trash.svg`}
            alt=""
            onClick={handleOpen}
          />
        </Box>
        <Box className={classes.boxDetail}>
          <Box className={classes.detail}>
            <Typography className={classes.detailTitle}>ระยะเวลา</Typography>
            <Typography className={classes.detailData}>
              {" "}
              1 มกราคม 2565 - 30 มีนาคม 2565
            </Typography>
          </Box>
          <Box className={classes.detail}>
            <Typography className={classes.detailTitle}>ประเภทกีฬา</Typography>
            <Typography className={classes.detailData}> เดิน - วิ่ง</Typography>
          </Box>
        </Box>
        <TableDefault
          tablehead={tablehead}
          tablebody={renderTable()}
          action="n"
          headcolor="#fff"
          bodycolor="#000"
          backgroundcolor="#449ae3"
          backgroundChildcolor="#f5f5f5"
        />
        <Box className={classes.buttongroup}>
          <ControlButton justifycontent="center">
            <ButtonProps
              titlebutton="ยกเลิก"
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              maxwidthbtn="155px"
              fontsizebtn="22px"
              onClick={() => router.back()}
            />
            <ButtonProps
              titlebutton="บันทึก"
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              maxwidthbtn="155px"
              fontsizebtn="22px"
            />
          </ControlButton>
        </Box>
        <ModalCommon
          open={modal}
          onClose={handleClose}
          minheight="270px"
          classNameDialog={classes.dialog}
        >
          <Typography className={classes.textModalHead}>ก้าวท้าใจ</Typography>
          <Typography className={classes.textModalDetail}>ลบกิจกรรม</Typography>
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
              titlebutton="ยืนยัน"
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              borderradiusbtn="5px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="40px"
              fontsizebtn="22px"
              maxwidthbtn="155px"
            />
          </ControlButton>
        </ModalCommon>
      </Box>
    </InnerLayout>
  );
};

export default ActivityPage;
