import React, { useEffect, useState } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import prefix from "utils/path";
import { Skeleton } from "@material-ui/lab";
import ImageAsHtml from "react-render-as-image";

const useStyles = makeStyles((theme) => ({
  controlexercise: {
    position: "relative",
    marginBottom: "30px",
    maxWidth: "950px",
    margin: "0 auto",
    overflow: "hidden",
    paddingTop: "80%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "88%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "88%",
      // height: 680,
      // maxWidth: 650,
    },
    [theme.breakpoints.down("xs")]: {
      // height: 385,
    },
  },
  pageresultexercise: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    paddingRight: 40,
    paddingTop: 40,
    backgroundImage: `url(${prefix}/images/bg_result.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
    backgroundPosition: "0 0",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 20,
      paddingTop: 20,
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 10,
      paddingTop: 10,
    },
  },
  user: {
    display: "flex",
    alignItems: "center",
    maxWidth: 480,
    marginLeft: "auto",
    marginBottom: 40,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
      marginBottom: 30,
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 170,
      marginBottom: 15,
    },
  },
  imgUser: {
    padding: 3,
    borderRadius: "100%",
    width: 97,
    height: 97,
    marginRight: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.16)",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    [theme.breakpoints.down("sm")]: {
      width: 70,
      height: 70,
    },
    [theme.breakpoints.down("sm")]: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
  },
  nameUser: {
    fontSize: 48,
    color: "#000",
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
    },
  },
  level: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "#000",
    fontSize: 30,
    marginBottom: 55,
    "& span": {
      color: "#E96189",
      fontSize: 48,
      [theme.breakpoints.down("xs")]: {
        fontSize: 30,
      },
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 15,
      fontSize: 18,
    },
  },
  imgLevel: {
    lineHeight: 0,
    marginRight: 10,
    "& img": {
      maxHeight: 52,
      [theme.breakpoints.down("xs")]: {
        maxHeight: 30,
      },
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: 5,
    },
  },
  boxResult: {
    borderRadius: 12,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    maxWidth: 480,
    marginLeft: "auto",
    display: "flex",
    minHeight: 105,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 170,
      borderRadius: 5,
      minHeight: 35,
      padding: "5px 0",
    },
  },
  boxLeft: {
    paddingRight: 40,
    marginRight: 40,
    borderRight: "1px solid #E0E0E0",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 20,
      marginRight: 20,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: 10,
      marginRight: 10,
    },
  },
  boxRight: {},
  titleBox: {
    color: "#000",
    fontSize: 30,
    lineHeight: "36px",
    marginBottom: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
      lineHeight: "24px",
      marginBottom: 0,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      lineHeight: "16px",
      marginBottom: 0,
    },
  },
  resultLeft: {
    color: "#E96189",
    fontSize: 48,
    "& img": {
      marginRight: 10,
      verticalAlign: "middle",
      [theme.breakpoints.down("sm")]: {
        height: 25,
      },
      [theme.breakpoints.down("xs")]: {
        height: 15,
        marginRight: 5,
      },
    },
    "& span": {
      color: "#000",
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 22,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 34,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 22,
    },
  },
  resultRight: {
    color: "#E96189",
    fontSize: 48,
    [theme.breakpoints.down("sm")]: {
      fontSize: 34,
      lineHeight: "24px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 22,
    },
  },
  resultBottom: {
    fontSize: 74,
    lineHeight: "60px",
    color: "#E96189",
    fontFamily: "DBHeavent_BoldCond",
    [theme.breakpoints.down("sm")]: {
      fontSize: 60,
      lineHeight: "50px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
      lineHeight: "24px",
    },
  },
}));

const ResultExercisePrint = (props: any) => {
  // const { iduser, nameuser, distance, healthpoint } = props;
  const classes = useStyles();
  const [imagePath, setImagePath] = useState();
  const [visible, setVisible] = useState(true);
  const { level, name, point, ebib, ordernumber, value } = props;
  console.log(ordernumber);
  useEffect(() => {
    value(imagePath);
  }, [imagePath]);

  const handleOnLoad = (e: any) => {
    const { currentSrc } = e.target;
    if (currentSrc.includes("data:image")) {
      setImagePath(currentSrc);
      setVisible(false);
    }
  };

  const renderHtml = () => {
    return (
      <ImageAsHtml width="1080px" format="png">
        <Box className="controlexercise">
          <Box className={classes.pageresultexercise}>
            <Box className={classes.level}>
              <Box className={classes.imgLevel}>
                <img src={`${prefix}/images/level.svg`} alt="" />
              </Box>
              LEVEL &nbsp; {level ? level : <Skeleton variant="text" />}
            </Box>
            <Box className={classes.user}>
              <Box className={classes.imgUser}>
                <img src={`${prefix}/images/user_result.svg`} alt="" />
              </Box>
              <Box className={classes.nameUser}>{name || "นายก้าว ท้าใจ"}</Box>
            </Box>
            <Box className={classes.boxResult}>
              <Box className={classes.boxLeft}>
                <Typography variant="h5" className={classes.titleBox}>
                  สะสมแต้มสุขภาพ
                </Typography>
                <Box className={classes.resultLeft}>
                  <img src={`${prefix}/images/ic_cupyellow.svg`} alt="" />
                  {point || <Skeleton variant="text" />} &nbsp;
                  <span>คะแนน</span>
                </Box>
              </Box>
              <Box className={classes.boxRight}>
                <Typography variant="h5" className={classes.titleBox}>
                  Ebib :
                </Typography>
                <Box className={classes.resultRight}>
                  {ebib || <Skeleton variant="text" />}
                </Box>
              </Box>
            </Box>
            {/* <Box
              className={classes.boxResult}
              style={{ flexDirection: "column" }}
            >
              <Typography variant="h5" className={classes.titleBox}>
                คุณพิชิต 100 แต้มสุขภาพเป็นลำดับที่
              </Typography>
              <Box className={classes.resultBottom}>
                {ordernumber || <Skeleton variant="text" />}
              </Box>
            </Box> */}
          </Box>
        </Box>
      </ImageAsHtml>
    );
  };

  return (
    <React.Fragment>
      <Box className="controlexercise">
        <Box className={classes.pageresultexercise}>
          <Box className={classes.level}>
            <Box className={classes.imgLevel}>
              <img src={`${prefix}/images/level.svg`} alt="" />
            </Box>
            LEVEL &nbsp; {level ? level : <Skeleton variant="text" />}
          </Box>
          <Box className={classes.user}>
            <Box className={classes.imgUser}>
              <img src={`${prefix}/images/user_result.svg`} alt="" />
            </Box>
            <Box className={classes.nameUser}>{name || "นายก้าว ท้าใจ"}</Box>
          </Box>
          <Box className={classes.boxResult}>
            <Box className={classes.boxLeft}>
              <Typography variant="h5" className={classes.titleBox}>
                สะสมแต้มสุขภาพ
              </Typography>
              <Box className={classes.resultLeft}>
                <img src={`${prefix}/images/ic_cupyellow.svg`} alt="" />
                {point || <Skeleton variant="text" />} &nbsp;<span>คะแนน</span>
              </Box>
            </Box>
            <Box className={classes.boxRight}>
              <Typography variant="h5" className={classes.titleBox}>
                Ebib :
              </Typography>
              <Box className={classes.resultRight}>
                {ebib || <Skeleton variant="text" />}
              </Box>
            </Box>
          </Box>
          {/* <Box
            className={classes.boxResult}
            style={{ flexDirection: "column" }}
          >
            <Typography variant="h5" className={classes.titleBox}>
              คุณพิชิต 100 แต้มสุขภาพเป็นลำดับที่
            </Typography>
            <Box className={classes.resultBottom}>
              {ordernumber || <Skeleton variant="text" />}
            </Box>
          </Box> */}
        </Box>
      </Box>
      <Box
        style={visible ? { opacity: 0 } : { display: "none" }}
        onLoad={(e: any) => handleOnLoad(e)}
      >
        {renderHtml()}
      </Box>
    </React.Fragment>
  );
};

export default ResultExercisePrint;
