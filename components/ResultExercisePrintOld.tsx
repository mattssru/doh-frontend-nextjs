import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  controlexercise: {
    position: "relative",
    paddingTop: "74%",
    marginBottom: "50px",
    maxWidth: "700px",
    margin: "0 auto",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      paddingTop: "94%",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "500px",
      paddingTop: "93%",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "125%",
    },
  },
  pageresultexercise: {
    backgroundImage: `url(${prefix}/images/bg_saveresult.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "0 0",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  },
  imguser: {
    width: "16vw",
    height: "16vw",
    borderRadius: "100%",
    border: "7px solid #fff",
    backgroundColor: "#fff",
    lineHeight: "0",
    position: "absolute",
    right: "18%",
    top: "4%",
    [theme.breakpoints.down("md")]: {
      width: "28vw",
      height: "28vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "26vw",
      height: "26vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "36vw",
      height: "36vw",
      top: "3%",
      right: "16%",
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "100%",
    },
  },
  borderuser: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    border: "8px solid rgba(93,211,253,1)",
    [theme.breakpoints.down("xs")]: {
      border: "4px solid rgba(93,211,253,1)",
    },
  },
  tabtext_01: {
    width: "45%",
    height: "85px",
    marginBottom: "70px",
    backgroundImage: `url(${prefix}/images/tab_01.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "0 0",
    position: "absolute",
    right: "0",
    top: "35%",
    color: "#fff",
    padding: "20px 15px",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      height: "50px",
      padding: "14px 15px",
      width: "45%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 8px",
      width: "35vw",
      backgroundSize: "100% 30px",
    },
    "& span:first-child": {
      fontSize: "38px",
      fontStyle: "italic",
      marginRight: "15px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
        marginRight: "10px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "17px",
        marginRight: "5px",
      },
    },
    "& span:last-child": {
      fontSize: "40px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "32px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.1rem",
      },
    },
  },
  tabtext_02: {
    width: "74%",
    height: "80px",
    margin: "0 14%",
    backgroundImage: `url(${prefix}/images/tab_02.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "0 0",
    position: "absolute",
    top: "50%",
    color: "#fff",
    padding: "25px 15px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "76%",
      height: "70px",
      margin: "0 12%",
      padding: "15px 15px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "40px",
      padding: "8px 10px",
      backgroundSize: "100% 40px",
      width: "80%",
    },
    "& p": {
      fontSize: "45px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "36px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "21px",
      },
    },
  },
  tabtext_03: {
    width: "59%",
    height: "85px",
    margin: "0 14%",
    backgroundImage: `url(${prefix}/images/tab_03.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "0 0",
    position: "absolute",
    textAlign: "center",
    top: "58%",
    color: "#fff",
    padding: "30px 30px 20px 30px",
    fontFamily: "DBHeavent_BoldCond",
    [theme.breakpoints.down("sm")]: {
      height: "75px",
      backgroundSize: "100% 100%",
      width: "80%",
      margin: "0 5% 0 18%",
      top: "59%",
      padding: "20px 30px 20px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "45px",
      width: "60vw",
      padding: "15px 10px 20px 10px",
      top: "60%",
    },

    "& span:first-child": {
      fontStyle: "italic",
      fontSize: "40px",
      marginRight: "15px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "35px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
        lineHeight: "12px",
        marginRight: "10px",
      },
    },
    "& span:nth-child(2)": {
      fontSize: "70px",
      marginRight: "15px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "60px",
        lineHeight: "22px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "36px",
        lineHeight: "10px",
        marginRight: "10px",
      },
    },
    "& span:last-child": {
      fontStyle: "italic",
      fontSize: "40px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "35px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "21px",
        marginRight: "10px",
      },
    },
  },
  tabtext_04: {
    width: "50%",
    height: "60px",
    backgroundImage: `url(${prefix}/images/tab_04.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "0 0",
    position: "absolute",
    top: "70%",
    left: "7%",
    color: "#000",
    textAlign: "center",
    padding: "10px 15px",
    [theme.breakpoints.down("sm")]: {
      width: "55%",
      left: "4%",
      top: "72%",
      height: "50px",
      padding: "0 15px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "57%",
      padding: "0 15px",
      top: "73%",
      height: "40px",
    },
    "& span:first-child": {
      fontStyle: "italic",
      fontSize: "35px",
      fontFamily: "DBHeavent_BoldCond",
      marginRight: "20px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "28px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
        marginRight: "5px",
      },
    },
    "& span:last-child": {
      fontSize: "40px",
      marginLeft: "10px",
      fontFamily: "DBHeavent_BoldCond",
      [theme.breakpoints.down("sm")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
        marginLeft: "5px",
      },
    },
    "& svg": {
      height: "27px",
      [theme.breakpoints.down("xs")]: {
        height: "12px",
      },
    },
  },
}));

const ResultExercisePrint = (props: any) => {
  const { imguser, iduser, nameuser, distance, healthpoint } = props;
  const classes = useStyles();

  return (
    <>
      <Box className={classes.controlexercise}>
        <Box className={classes.pageresultexercise}>
          <Box className={classes.imguser}>
            <Box component="span" className={classes.borderuser}></Box>
            <img src={imguser} alt="" />
          </Box>
          <Box className={classes.tabtext_01}>
            <Typography component="span">E-BIB: </Typography>
            <Typography component="span">{iduser}</Typography>
          </Box>
          <Box className={classes.tabtext_02}>
            <Typography>{nameuser}</Typography>
          </Box>
          <Box className={classes.tabtext_03}>
            <Typography component="span">ระยะทางสะสม</Typography>
            <Typography component="span">{distance}</Typography>
            <Typography component="span">กม.</Typography>
          </Box>
          <Box className={classes.tabtext_04}>
            <Typography component="span">Health Point</Typography>
            {/* <IcCup /> */}
            <Typography component="span">{healthpoint}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResultExercisePrint;
