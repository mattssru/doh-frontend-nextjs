import React, { useEffect } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import prefix from "utils/path";
import { numberWithCommas } from "utils/numberHelper";
import {
  ControlButton,
  // HexPrint,
  ItemHexagon
} from "./common";
import { useDispatch, useSelector } from "react-redux";
import { AchievementActions } from "stores/achievements/achievements.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
import { ButtonProps } from "./common/button";
// import { ItemHexagon } from "./common";
// import { Skeleton } from "@material-ui/lab";
import html2canvas from 'html2canvas';
import router from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 960,
    margin: "0 auto 30px",
    height: "1000px",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url('${prefix}/images/bg_print.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 1000px",
    [theme.breakpoints.down("sm")]: {
      height: 820,
      backgroundSize: "100% 820px",
    },
    [theme.breakpoints.down(769)]: {
      height: 800,
      backgroundSize: "100% 800px",
    },
    [theme.breakpoints.down(600)]: {
      height: 500,
      backgroundSize: "100% 500px",
      margin: "0 auto 20px",
    },
    [theme.breakpoints.down(491)]: {
      height: 350,
      backgroundSize: "100% 350px",
    },
    [theme.breakpoints.down(391)]: {
      height: 340,
      backgroundSize: "100% 340px",
    },
    [theme.breakpoints.down(376)]: {
      height: 315,
      backgroundSize: "100% 315px",
    },
  },
  boxTop: {
    display: "flex",
    padding: "0 22px",
    alignItems: "center",
  },
  leftTop: {
    lineHeight: 0,
    "& img": {
      maxWidth: "100%",
    },
  },
  rightTop: {
    lineHeight: 0,
    "& img": {
      maxWidth: "100%",
      [theme.breakpoints.down("sm")]: {
        maxHeight: 200,
      },
    },
  },
  bgleftPrint: {
    position: "absolute",
    left: "-21vw",
    top: 145,
  },
  bgrightPrint: {
    position: "absolute",
  },
  boxUser: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: "20%",
    [theme.breakpoints.down(600)]: {
      marginBottom: 6,
    },
    [theme.breakpoints.down(480)]: {
      paddingTop: "18%",
    },
    [theme.breakpoints.down(376)]: {
      paddingTop: "17%",
    },
  },
  leftUser: {
    padding: 3,
    borderRadius: "100%",
    width: 175,
    height: 175,
    marginRight: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.16)",
    marginTop: 15,
    [theme.breakpoints.down("sm")]: {
      width: 140,
      height: 140,
    },
    [theme.breakpoints.down(600)]: {
      width: 90,
      height: 90,
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "100%",
      zIndex: '99999',
    },
  },
  rightUser: {},
  imgLevel: {
    height: 50,
    width: 50,
    [theme.breakpoints.down("xs")]: {
      width: 40,
      height: 40,
    },
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  textLevel: {
    fontSize: 33,
    lineHeight: "39px",
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
    [theme.breakpoints.down(600)]: {
      fontSize: 20,
      lineHeight: "24px",
    },
    "& span": {
      color: "#E96189",
      fontSize: 53,
      lineHeight: "55px",
      verticalAlign: "middle",
      [theme.breakpoints.down("sm")]: {
        fontSize: 46,
        lineHeight: "45px",
      },
      [theme.breakpoints.down(600)]: {
        fontSize: 26,
        lineHeight: "22px",
      },
    },
  },
  nameUser: {
    fontSize: 50,
    lineHeight: "54px",
    fontFamily: "DBHeavent_MedCond",
    [theme.breakpoints.down("sm")]: {
      fontSize: 40,
      lineHeight: "48px",
    },
    [theme.breakpoints.down(600)]: {
      fontSize: 18,
      lineHeight: "18px",
    },
  },
  ebib: {
    fontSize: 40,
    lineHeight: "48px",
    color: "#000",
    fontFamily: "DBHeavent_MedCond",
    [theme.breakpoints.down(600)]: {
      fontSize: 18,
      lineHeight: "18px",
    },
    "& span": {
      color: "#E96189",
      fontFamily: "DBHeavent_BoldCond",
    },
  },
  boxPoint: {
    maxWidth: 750,
    margin: "0 auto 30px",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "15px 0",
    maxHeight: 220,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 600,
    },
    [theme.breakpoints.down(700)]: {
      maxWidth: 400,
    },
    [theme.breakpoints.down(600)]: {
      maxWidth: 252,
      height: 65,
      margin: "0 auto 8px",
      borderRadius: 4,
    },
    [theme.breakpoints.down(376)]: {
      maxWidth: 230,
      height: 60,
    },
    "& > span": {
      fontSize: 45,
      lineHeight: "82px",
      fontFamily: "DBHeavent_MedCond",
      // maxWidth: 210,
      textAlign: "center",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        fontSize: 50,
        lineHeight: "54px",
      },
      [theme.breakpoints.down(600)]: {
        fontSize: 18,
        lineHeight: "24px",
        // maxWidth: 60,
      },
      "$ img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    "& h5": {
      color: "#E96189",
      fontSize: 149,
      lineHeight: "100px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 70,
        lineHeight: "70px",
        // marginTop: '10px',
      },
      [theme.breakpoints.down(600)]: {
        fontSize: 30,
        lineHeight: "30px",
      },
      // "& img": {
      //   marginRight: 10,
      //   verticalAlign: "middle",
      //   maxHeight: 92,
      //   top: -5,
      //   position: "relative",
      //   [theme.breakpoints.down("sm")]: {
      //     maxHeight: 70,
      //   },
      //   [theme.breakpoints.down(600)]: {
      //     maxHeight: 30,
      //   },
      // },
      "& span": {
        color: "#000",
        fontSize: 64,
        fontFamily: "DBHeavent_MedCond",
        [theme.breakpoints.down("sm")]: {
          fontSize: 50,
        },
        [theme.breakpoints.down(600)]: {
          fontSize: 24,
        },
      },
    },
  },

  oldPoint: {
    maxWidth: 620,
    margin: "0 auto",
    height: 69,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontFamily: "DBHeavent_MedCond",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 550,
    },
    [theme.breakpoints.down(600)]: {
      fontSize: 14,
      height: 23,
      maxWidth: 200,
      borderRadius: 4,
    },
    "& span": {
      color: "#E96189",
      fontSize: 58,
      [theme.breakpoints.down(600)]: {
        fontSize: 20,
      },
    },
  },
  icCup: {
    height: 92,
    marginRight: 10,
    backgroundImage: `url('${prefix}/images/cup_big.svg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    display: "inline-block",
    paddingLeft: "3vw",
    backgroundPosition: "left bottom",
    [theme.breakpoints.down("sm")]: {
      height: 40,
    },
    [theme.breakpoints.down(600)]: {
      height: 30,
    },
    [theme.breakpoints.down(491)]: {
      height: 20,
    },
  },
  controlHex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    [theme.breakpoints.down(480)]: {
      marginTop: 0,
    },
    "& div": {
      // width: 100,
      // height: 115,
      [theme.breakpoints.down("xs")]: {
        width: 45,
        height: 45,
      },
      [theme.breakpoints.down(491)]: {
        width: 35,
        height: 35,
      },
      [theme.breakpoints.down(376)]: {
        width: 27,
        height: 27,
      },
      "& img": {
        width: "auto",
        maxWidth: "inherit",
      },
    },
    "& img:hover": {
      transition: "none",
      transform: "none",
    },
  },
  controlButton: {
    maxWidth: 375,
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
}));

const ResultExercisePrint = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [imagePath, setImagePath] = useState();
  // const [visible, setVisible] = useState(true);
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { awardList } = useSelector((state: IStates) => state.achievementReducer);
  const { level, name, point, ebib, profileImg }: any =
    props;
  // useEffect(() => {
  //   value(imagePath);
  // }, [imagePath]);

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      dispatch(
        ActionSaga({
          type: AchievementActions.FETCH_AWARD_R,
          payload: null,
        })
      );
    }
  }, [profile]);
  // const handleOnLoad = (e: any) => {
  //   const { currentSrc } = e.target;
  //   if (currentSrc.includes("data:image")) {
  //     setImagePath(currentSrc);
  //     setVisible(false);
  //   }
  // };

  const saveCanvas = async () => {
    const element = document.getElementById('capture')
    var newCanvas = document.createElement('canvas');
    if (element?.clientWidth && element?.clientHeight) {
      newCanvas.width = element?.clientWidth
      newCanvas.height = element?.clientHeight
    }
    var option = {
      allowTaint: true,
      useCORS: true,
    }
    if (element !== null) {
      html2canvas(element, option).then(canvas => {
        var image = canvas.toDataURL('image/png')
        let a = document.createElement('a');
        a.href = image;
        a.download = 'result.png'
        a.click();
      });
    }
  }

  // const renderHtml = () => {
  //   return (
  //     <ImageAsHtml width="1080px" format="png">
  //       <Box className={classes.root}>
  //         <Box className={classes.boxUser}>
  //           <Box className={classes.leftUser}>
  //             <img src={profileImg} alt="" crossOrigin="anonymous" />
  //           </Box>
  //           <Box className={classes.rightUser}>
  //             <Box className={classes.imgLevel}>
  //               <img src={`${prefix}/level/lv${level}.svg`} />
  //             </Box>
  //             <Typography variant="h4" className={classes.textLevel}>
  //               LEVEL &nbsp;
  //               <span>{level || 0}</span>
  //             </Typography>
  //             <Box className={classes.nameUser}>{name}</Box>
  //             <Box className={classes.ebib}>
  //               Ebib : <span>{ebib || "000"}</span>
  //             </Box>
  //           </Box>
  //         </Box>
  //         <Box className={classes.boxPoint}>
  //           <span>แต้มสุขภาพ SEASON 4</span>
  //           <Typography variant="h5">
  //             <Box className={classes.icCup}></Box>
  //             {/* <img src={`${prefix}/images/cup_big.svg`} alt="" /> */}
  //             {numberWithCommas(point) || 0}
  //             <span> แต้ม</span>
  //           </Typography>
  //         </Box>
  //         <Box className={classes.controlHex}>
  //           {awardList.map((item: any) => {
  //             return (
  //               <HexPrint image={`url(${prefix}/badge/bd${item.type}-${item.icon + 1}.png)`} />
  //             );
  //           })}
  //         </Box>
  //       </Box>
  //     </ImageAsHtml>
  //   );
  // };

  return (
    <React.Fragment >
      <Box className={classes.root} id="capture">
        <Box className={classes.boxUser}>
          <Box className={classes.leftUser}>
            <img src={profileImg} alt="" id="profileImg" />
          </Box>
          <Box className={classes.rightUser}>
            <Box className={classes.imgLevel}>
              <img src={`${prefix}/level/lv${level}.svg`} />{" "}
            </Box>
            <Typography variant="h4" className={classes.textLevel}>
              LEVEL &nbsp;
              <span>{level || 0}</span>
            </Typography>
            <Box className={classes.nameUser}>{name}</Box>
            <Box className={classes.ebib}>
              Ebib : <span>{ebib || "000"}</span>
            </Box>
          </Box>
        </Box>
        <Box className={classes.boxPoint}>
          <span>แต้มสุขภาพ SEASON 4</span>
          <Typography variant="h5">
            <Box className={classes.icCup}></Box>
            {numberWithCommas(point) || 0}
            <span> แต้ม</span>
          </Typography>
        </Box>
        <Box className={classes.controlHex}>
          {Object.keys(awardList).length && awardList.map((item: any) => {
            return (
              <ItemHexagon image={`${prefix}/badge/bd${item.type}-${item.icon + 1}.png`} />
            );
          })}
        </Box>
        {/* <Box className={classes.oldPoint}>
          คุณพิชิต 100 แต้มสุขภาพเป็นลำดับที่ &nbsp;
          <span>{ordernumber || 0}</span>
        </Box> */}
      </Box>
      {/* <Box
        style={visible ? { opacity: 0 } : { display: "none" }}
        onLoad={(e: any) => handleOnLoad(e)}
      >
        {Object.keys(awardList).length &&
          renderHtml()
        }

      </Box> */}
      <Box className={classes.controlButton}>
        <ButtonProps
          titlebutton="เงื่อนไขการรับคะแนน"
          maxwidthbtn="100%"
          marginbtn="0 auto 15px"
          heightbtn="50px"
          borderradiusbtn="5px"
          backgroundcolorbtn="#E96189"
          fontsizebtn="24px"
          onClick={() => router.push("/health-point/condition")}
        />
      </Box>
      <ControlButton justifycontent="center">
        <ButtonProps
          titlebutton="บันทึกรูปภาพ"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="5px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          heightbtn="40px"
          fontsizebtn="22px"
          maxwidthbtn="180px"
          zindexbtn="999"
          onClick={saveCanvas}
        // onClick={() => downloadImage()}
        />
      </ControlButton>
      {/* <Box className={classes.controlButton}>
        <ButtonProps
          titlebutton="บันทึกรูปภาพ"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="5px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          heightbtn="40px"
          fontsizebtn="22px"
          maxwidthbtn="180px"
          zindexbtn="999"
          onClick={saveCanvas}
        />
      </Box> */}
    </React.Fragment>
  );
};

export default ResultExercisePrint;
