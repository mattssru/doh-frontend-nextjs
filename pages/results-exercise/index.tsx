import { Box, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { ControlButton, ResultNumber } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import ProgressDoughnut from "components/ProgressDoughnut";
import ResultExercisePrint from "components/ResultExercisePrint";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ActionSaga } from "services/action.saga";
import { ResultAction } from "stores/result/result.action";
import { IStates } from "stores/root.reducer";
import { TransactionAction } from "stores/transaction/transaction.action";
import prefix from "utils/path";

// import Router from 'next/router'
const useStyles = makeStyles((theme) => ({
  root: {
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
      [theme.breakpoints.down('xs')]: {
        fontSize: 22,
        height: 50,
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
  controlButton: {
    maxWidth: 375,
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  tabSS4Date: {
    textAlign: "center",
    color: "#70B642",
    fontSize: 40,
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    },
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const dataLabel = [
  {
    name: "จ",
  },
  {
    name: "อ",
  },
  {
    name: "พ",
  },
  {
    name: "พฤ",
  },
  {
    name: "ศ",
  },
  {
    name: "ส",
  },
  {
    name: "อา",
  },
];

const ResultExecise = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { exerciseOutput } = useSelector(
    (state: IStates) => state.resultReducer
  );
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  // const { total_point: number } = useSelector(
  //   (state: IStates) => state.transactionReducer
  // );
  const [value, setValue] = React.useState(1);
  // const [valueImage, setValueImage] = useState("");
  const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  const nfv = new Intl.NumberFormat();

  // const getPathImage = (image: any) => {
  //   if (image !== undefined) {
  //     setValueImage(image);
  //   }
  // };

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
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
      dispatch(
        ActionSaga({
          type: TransactionAction.FETCH_EVENT_EXP_R,
        })
      );
    }
  }, [profile]);

  const combineRecords = (items: any) => {
    if (items) {
      const data = items.map((item: any, index: number) => {
        return { name: dataLabel[index]?.name, average: item };
      });
      return data;
    }
  };

  // const downloadImage = () => {
  //   let a = document.createElement("a");
  //   a.href = valueImage;
  //   a.download = "result.png";
  //   a.click();
  // };

  return (
    <InnerLayout titlepage="ผลการออกกำลังกาย">
      <Box className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="ทั้งหมด" {...a11yProps(0)} />
          <Tab label="ก้าวท้าใจ season 4" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box className={classes.bodyTabs}>
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
            <Box className={classes.TopicLevel}>เป้าหมายในสัปดาห์นี้</Box>
            <Box className={classes.Boxflex}>
              <Box className={classes.inlineTime}>
                <ResultNumber
                  imageUnitType={`${prefix}/images/ic_time.svg`}
                  resultNum={exerciseOutput.target_time || 0}
                  unitType="นาที"
                  display="flex"
                />
              </Box>
              <Box className={classes.TextTime}>
                <Box component="span">เหลือเวลาอีก</Box>
                <Box component="span" className={classes.textPink}>
                  {exerciseOutput.time_left || 0}
                </Box>
                <Box component="span">นาที</Box>
              </Box>
            </Box>
            <ProgressDoughnut progress={exerciseOutput.time_process} />
            <Box className={classes.Boxflex}>
              <Box className={classes.inlineTime}>
                <Box className={classes.topicInlineResult}>
                  เวลาออกกำลังกายรวม
                </Box>
                <ResultNumber
                  imageUnitType={`${prefix}/images/ic_time.svg`}
                  resultNum={exerciseOutput.weekly_time || 0}
                  unitType="นาที"
                  display="flex"
                />
              </Box>
              <Box className={classes.InlineCalorie}>
                <Box className={classes.topicInlineResult}>
                  การเผาผลาญหลังงาน
                </Box>
                <ResultNumber
                  imageUnitType={`${prefix}/images/ic_cal.svg`}
                  resultNum={exerciseOutput.weekly_calories || 0}
                  unitType="แคลอรี่"
                  display="flex"
                />
              </Box>
            </Box>
            <Box className={classes.TopicExersise}>
              <h2>เฉลี่ย</h2>
              <Box className={classes.CalorieExersise}>
                {nfv.format(exerciseOutput.weekly_avg_calories || 0)}
                <Box component="span">แคลอรี่</Box>
              </Box>
              <Typography>{exerciseOutput.duration_text}</Typography>
            </Box>
            <Box className={classes.chartResult}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={200}
                  data={combineRecords(exerciseOutput.records)}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="10 10" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="average"
                    stroke="#6DBCDB"
                    fill="#6DBCDB"
                    activeDot={{ r: 10 }}
                  />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </AreaChart>
              </ResponsiveContainer>
            </Box>
            <ControlButton alignitems="flex-end" justifycontent="center">
              <ButtonProps
                titlebutton="ก้าวท้าใจ season 3"
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                borderradiusbtn="5px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                maxwidthbtn="180px"
                heightbtn="40px"
                fontsizebtn="20px"
                onClick={() => {
                  router.push({ pathname: "/results-exercise/print" });
                }}
              />
              <ButtonProps
                titlebutton="ประวัติการออกกำลังกาย"
                background="linear-gradient(to top, #8CA51E, #D0FD08)"
                borderradiusbtn="5px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                maxwidthbtn="180px"
                heightbtn="40px"
                fontsizebtn="20px"
                onClick={() => {
                  router.push({ pathname: "/results-exercise/history" });
                }}
              />
            </ControlButton>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box className={classes.bodyTabs}>
            <Typography variant="h2" className={classes.tabSS4Date}>
              “เริ่ม 1 ก.พ. - 11 พ.ค. 2565”
            </Typography>
            <ResultExercisePrint
              ebib={profile.ebib_code}
              point={profile?.exp_total || 0}
              name={`${profile.first_name} ${profile.last_name}`}
              ordernumber={undefined}
              level={profile?.level || 0}
              // value={getPathImage}
              profileImg={profile?.avatar || `${prefix}/images/profile_img.jpg`}
            />
            {/* <Box className={classes.controlButton}>
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
                onClick={() => downloadImage()}
              />
            </ControlButton> */}
          </Box>
        </TabPanel>
      </Box>
    </InnerLayout>
  );
};

export default ResultExecise;
