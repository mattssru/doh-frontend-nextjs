import { Box, makeStyles, Typography, withStyles } from "@material-ui/core";
import { ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import React from "react";
import prefix from "utils/path";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import router from "next/router";

const useStyles = makeStyles(() => ({
  boxOpacity: {
    maxWidth: 200,
    width: "100%",
    borderRadius: 5,
    backdropFilter: "brightness(0.85)",
    WebkitBackdropFilter: "brightness(0.85)",
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    "& h5": {
      color: "#D0FD08",
      fontSize: 80,
    },
  },
  boxStatus: {
    backgroundColor: "#449AE3",
    padding: "15px 15px 40px 15px",
    backgroundImage: `url(${prefix}/images/bg_big.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top 25px",
    backgroundSize: "auto",
    borderRadius: 5,
    maxWidth: 700,
    margin: "0 auto",
  },
  boxPoint: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#1688C4",
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: 20,
    "& h3": {
      color: "#fff",
      fontSize: 30,
      lineHeight: "36px",
      marginBottom: 10,
      textAlign: "center",
    },
    "& h5": {
      color: "#D0FD08",
      fontSize: 60,
      lineHeight: "60px",
      display: "flex",
      justifyContent: "flex-end",
      flex: 1.2,
    },
    "& > p": {
      color: "#fff",
      fontSize: 20,
      lineHeight: "24px",
      display: "flex",
      justifyContent: "flex-end",
      flex: 1,
    },
  },
  point: {
    fontSize: 80,
    lineHeight: "38px",
    color: "#D0FD08",

    "& span": {
      color: "#fff",
      fontSize: 30,
    },
    "& p": {
      fontSize: 20,
      color: "#FFE200",
      lineHeight: "20px",
      textAlign: "center",
    },
  },
  statusLevel: {

    marginBottom: 20,
    width: '310px',
    display: "flex",
    paddingTop: '20px',
    alignItems: "center",
    margin: "0 auto"
  },
  imageLevel: {
    maxWidth: 88,
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    "& p": {
      color: "#fff",
      fontSize: 20,
      lineHeight: "24px",
    },
    "& span": {
      color: "#FFCA3D",
      fontSize: 30,
      lineHeight: "28px",
      verticalAlign: "middle",
    },
  },
  icon: {
    width: 88,
    height: 88,
    marginBottom: 5,
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "100%",
    },
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 13,
    width: "100%",
    top: -20,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 13,
    backgroundColor: "#FFCA3D",
  },
}))(LinearProgress);

const LevelPage = () => {
  const classes = useStyles();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  return (
    <InnerLayout titlepage="LEVEL">
      <Box className={classes.boxStatus}>
        <Box className={classes.statusLevel}>
          <Box className={classes.imageLevel} style={{ marginRight: -10 }}>
            <Box className={classes.icon}>
              <img src={`${prefix}/level/lv${profile?.level}.svg`} alt="" />
            </Box>
            <Typography variant="body1">
              LEVEL &nbsp;<span>{profile?.level}</span>
            </Typography>
          </Box>
          <BorderLinearProgress variant="determinate" value={(parseInt(profile?.exp_total) / parseInt(profile?.nextLevel)) * 100} />
          <Box className={classes.imageLevel} style={{ marginLeft: -10 }}>
            <Box className={classes.icon}>
              <img src={`${prefix}/level/lv${profile?.level + 1}.svg`} alt="" />
            </Box>
            <Typography variant="body1">
              LEVEL &nbsp;<span>{profile?.level + 1}</span>
            </Typography>
          </Box>
        </Box>
        <Box
          className={classes.boxPoint}
          style={{
            flexDirection: "column",
            minHeight: 150,
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">ค่าประสบการณ์</Typography>
          <Box className={classes.point}>
            {profile?.exp_total} <span>/ {profile?.nextLevel}</span>
            <p>Exp</p>
          </Box>
        </Box>
        <ControlButton justifycontent="center">
          <ButtonProps
            titlebutton="Exp ได้รับอย่างไร ?"
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            onClick={() => router.push('/health-point/condition')}
          />
          <ButtonProps
            titlebutton="หน้าหลัก"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            onClick={() => router.push('/')}
          />
        </ControlButton>
      </Box>
    </InnerLayout>
  );
};

export default LevelPage;
