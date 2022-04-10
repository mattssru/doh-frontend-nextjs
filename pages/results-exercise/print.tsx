import { Box, makeStyles } from "@material-ui/core";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import ResultExercisePrintOld from "components/ResultExercisePrintOld";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResultAction } from "stores/result/result.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
import { ResultNumber } from "components/common";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    "& .MuiTabs-root": {
      marginBottom: `15px`,
      boxShadow: `0px 10px 20px 0 rgba(0,0,0,0.16)`,
    },
    "& .MuiTab-root": {
      boxShadow: `0px 10px 20px 0 rgba(0,0,0,0.16)`,
      borderRadius: `12px`,
      backgroundColor: `#fff`,
      opacity: `1`,
      color: `#AAAAAA`,
      fontSize: `30px`,
      fontFamily: "DBHeavent_BoldCond",
      lineHeight: `25px`,
      height: "65px",
      marginRight: `15px`,

      "&:last-child": {
        marginRight: `0`,
      },
    },
    "& .MuiTab-textColorInherit.Mui-selected": {
      backgroundColor: `#6FB441`,
      color: `#fff`,
    },
    "& .MuiTabs-indicator": {
      display: `none`,
    },
    "& $Distance, & $Calorie, & $InlineTime, & $InlineCalorie": {
      "& div": {
        padding: "0 !important",
      },
    },
  },
  boxShadow: {
    maxWidth: 700,
    margin: "0 auto",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: "30px",
    [theme.breakpoints.down("xs")]: {
      padding: "30px 15px",
    },
  },
  bodyTabs: {
    boxShadow: "0 10px 20px rgba(0,0,0,0.16)",
    borderRadius: "12px",
    padding: "30px",
    backgroundColor: "#fff",
    maxWidth: "100%",
    margin: "0 auto",
    "& .MuiTypography-body2": {
      fontSize: `24px`,
      lineHeight: `24px`,
      fontFamily: "DBHeavent_Cond",
      [theme.breakpoints.down("xs")]: {
        fontSize: `20px`,
      },
    },
  },
  TopicLevel: {
    fontSize: 30,
    lineHeight: "36px",
    color: "#1688C4",
    fontFamily: "DBHeavent_BoldCond",
    textAlign: "center",
  },
  inlineTime: {
    flexDirection: "column",
    justifyContent: "left",
  },
  TextTime: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      marginRight: "10px",
    },
    "& span": {
      fontSize: "20px",
      lineHeight: "24px",
    },
  },
  textPink: {
    fontSize: "50px !important",
    lineHeight: "60px !important",
    fontFamily: "DBHeavent_BoldCond",
    color: "#E96189",
    padding: "0 10px",
  },
  Boxflex: {
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    "& h2": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "40px !important",
      },
    },
  },
  topicInlineResult: {
    fontSize: 20,
    lineHeight: "24px",
    color: "#000000",
  },
  InlineCalorie: {
    flexDirection: "column",
    "& .MuiBox-root h2": {
      color: "#70B642",
    },
  },
  TopicExersise: {
    marginBottom: "30px",
    textAlign: "center",
    "& h2": {
      fontSize: "30px",
      lineHeight: "30px",
      fontFamily: "DBHeavent_BoldCond",
      color: "#1688C4",
    },
    "& p": {
      fontSize: "24px",
      lineHeight: "14px",
    },
  },
  CalorieExersise: {
    color: "#70B642",
    fontSize: "40px",
    fontFamily: "DBHeavent_BoldCond",
    lineHeight: "48px",
    marginBottom: "10px",
    "& span": {
      fontFamily: "DBHeavent_Cond",
      fontSize: "18px",
      lineHeight: "16px",
      position: "relative",
      top: "-5px",
      marginLeft: "10px",
      color: "#707070",
    },
  },
  chartResult: {
    width: "100%",
    height: 600,
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      height: 450,
    },
  },
  textGreen: {
    fontSize: 30,
    lineHeight: "36px",
    color: "#70B642",
    textAlign: "center",
  },
}));

const PrintPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { exerciseOutput, getChallenge } = useSelector(
    (state: IStates) => state.resultReducer
  );
  const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  const nfv = new Intl.NumberFormat();

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: ResultAction.GET_CHALLENGE_R,
      })
    );
    dispatch(
      ActionSaga({
        type: ResultAction.FETCH_EXERCISE_CHALLENGE_R,
      })
    );
    dispatch(
      ActionSaga({
        type: ResultAction.FETCH_EXERCISE_OUTPUT_R,
      })
    );
  }, []);

  return (
    <InnerLayout titlepage="ผลการออกกำลังกาย">
      <Box className={classes.boxShadow}>
        <Box className={classes.Boxflex}>
          <ResultNumber
            imageUnitType={`${prefix}/images/ic_running.svg`}
            unit="ระยะทาง"
            resultNum={nf.format(exerciseOutput.total?.distance || 0)}
            unitType="กิโลเมตร"
            ColorNum="#E96189"
          />
          <ResultNumber
            imageUnitType={`${prefix}/images/ic_time.svg`}
            unit="ระยะเวลา"
            resultNum={nfv.format(exerciseOutput.total?.time || 0)}
            unitType="นาที"
          />
        </Box>
        <ResultNumber
          imageUnitType={`${prefix}/images/ic_cal.svg`}
          unit="จำนวนแคลอรี่"
          resultNum={nfv.format(exerciseOutput.total?.calories || 0)}
          unitType="แคลอรี่"
          ColorNum="#E96189"
          fontsize="90px"
          lineheight="80px"
        />
      </Box>
      <Box className={classes.root}>
        <ResultExercisePrintOld
          imguser={getChallenge.avatar}
          iduser={getChallenge.ebib_code}
          nameuser={getChallenge.full_name}
          distance={nf.format(getChallenge.distance_total)}
          healthpoint={nfv.format(getChallenge.hp_total)}
        />
      </Box>
    </InnerLayout>
  );
};

export default PrintPage;
