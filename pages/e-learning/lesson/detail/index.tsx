import { Box, makeStyles, TableCell, TableRow } from "@material-ui/core";
import { ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import router from "next/router";
import React from "react";
import ReactPlayer from "react-player";
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
  },
  loadIcon: {
    cursor: 'pointer',
  }
}));

const dataList = [
  { name: 'การออกกำลังกาย', url: 'testurl' },
  { name: 'การทานอาหารครบ5หมู่', url: 'testurl' }
]

const Introduction = () => {
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
    <InnerLayout titlepage="บทนำ">
      <Box className={classes.root}>
        <ReactPlayer
          url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
          playing={true}
          controls
          width="100%"
          height="100%"
        />
        <br />
        <TableDefault
          tablehead={tablehead}
          tablebody={renderTable(dataList)}
          action="n"
        />
        <br />
        <ControlButton justifycontent="center">
          <ButtonProps
            titlebutton="กลับ"
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
            marginbtn="0 auto"
            onClick={() => router.back()}
          />
          <ButtonProps
            titlebutton="แบบทดสอบ"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
            marginbtn="0 auto"
            onClick={() => router.push({ pathname: '/e-learning/quiz', query: { quizId: 1 } })}
          />
        </ControlButton>
      </Box>
    </InnerLayout>
  );
};

export default Introduction;
