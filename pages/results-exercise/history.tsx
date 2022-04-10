import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ResultNumber, SelectFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { MasterAction } from "stores/master/master.action";
import { ResultAction } from "stores/result/result.action";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";
import Router from "next/router";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    padding: 30,
    maxWidth: 600,
    margin: "0 auto",
    "& h3": {
      fontSize: 30,
      lineHeight: "36px",
      color: "#70B642",
      textAlign: "center",
      marginBottom: 15,
    },
  },
  TopicLevel: {
    fontSize: 30,
    lineHeight: "36px",
    textAlign: "center",
    fontFamily: "DBHeavent_MedCond",
    marginTop: 20,
    marginBottom: 20,
    "& span": {
      fontSize: 50,
    }
  },
  TopicBurn: {
    fontSize: 30,
    lineHeight: "36px",
    textAlign: "center",
    fontFamily: "DBHeavent_MedCond",
    color: "#1688C4",
    marginBottom: 10,
  },
  boxFlex: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400,
    margin: "0 auto 20px",
  },
  contentTable: {
    marginBottom: 40,
  },
}));

const tablehead = ["วันที่", "กิโลเมตร", "นาที", "แคลอรี่"];

const HistoryPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { activitiesList, listMonthTh } = useSelector(
    (state: IStates) => state.masterReducer
  );
  const {
    historyExerciseList,
    historyExerciseCalories,
    historyExerciseDistance,
    historyExerciseTime,
  } = useSelector((state: IStates) => state.resultReducer);
  const date = new Date();

  const [dataSearch, setDataSearch] = useState({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    activity_id: "",
    take: "",
  });

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: MasterAction.FETCH_ACTIVITIES_LST_R,
      })
    );
    dispatch(
      ActionSaga({
        type: ResultAction.FETCH_HISTORY_LST_R,
        payload: dataSearch,
      })
    );
  }, [dispatch]);

  const monthname = [
    0,
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const renderTable = (dataList: any) => {
    return dataList.map((item: any, index: any) => {
      return (
        <TableRow key={index}>
          <TableCell align="center">
            {item.daydate + " " + monthname[Number(item.month)]}
          </TableCell>
          <TableCell align="center">{item.sumdistance}</TableCell>
          <TableCell align="center">{item.sumtime}</TableCell>
          <TableCell align="center">{item.sumcalories}</TableCell>
        </TableRow>
      );
    });
  };

  const renderTableContainer = (historyList: any) => {
    if (historyList.length > 0) {
      return historyList.map((item: any, idx: any) => {
        return (
          <div key={idx}>
            {/* <Typography>{item.name_month}</Typography> */}
            <TableDefault
              tablehead={tablehead}
              tablebody={renderTable(item.list)}
              action="n"
            />
          </div>
        );
      });
    } else {
      return <Typography>ไม่มีข้อมูล</Typography>;
    }
  };

  const handleChangeActivities = (e: any) => {
    setDataSearch({ ...dataSearch, activity_id: e.target.value });
    dispatch(
      ActionSaga({
        type: ResultAction.FETCH_HISTORY_LST_R,
        payload: {
          month: dataSearch.month,
          year: dataSearch.year,
          activity_id: e.target.value,
          take: dataSearch.take,
        },
      })
    );
  };

  const handleChangeYear = (e: any) => {
    setDataSearch({ ...dataSearch, year: e.target.value });
    dispatch(
      ActionSaga({
        type: ResultAction.FETCH_HISTORY_LST_R,
        payload: {
          month: dataSearch.month,
          year: e.target.value,
          activity_id: dataSearch.activity_id,
          take: dataSearch.take,
        },
      })
    );
  };

  const handleChangeMonth = (e: any) => {
    setDataSearch({ ...dataSearch, month: e.target.value });
    dispatch(
      ActionSaga({
        type: ResultAction.FETCH_HISTORY_LST_R,
        payload: {
          month: e.target.value,
          year: dataSearch.year,
          activity_id: dataSearch.activity_id,
          take: dataSearch.take,
        },
      })
    );
  };

  return (
    <InnerLayout titlepage="ประวัติการออกกำลังกาย">
      <Box className={classes.root}>
        <Typography variant="h3">ประเภทกีฬา</Typography>
        <SelectFixd
          borderraduis="25px"
          height="50px"
          margin="0 0 20px 0"
          onChange={handleChangeActivities}
        >
          <option value="">เลือกประเภทกีฬา</option>
          {activitiesList.length > 0 &&
            activitiesList.map((item: any, idx: number) => {
              return (
                <option value={item.id} key={idx}>
                  {item.name}
                </option>
              );
            })}
        </SelectFixd>
        <Box className={classes.TopicBurn}>การเผาผลาญพลังงาน</Box>
        <Box className={classes.TopicLevel}><span>{historyExerciseCalories || 0}</span> แคลอรี่</Box>
        <Box className={classes.boxFlex}>
          <ResultNumber
            imageUnitType={`${prefix}/images/ic_running.svg`}
            unit="ระยะทาง"
            resultNum={Number(historyExerciseDistance).toFixed(2) || 0}
            unitType="กิโลเมตร"
            ColorNum="#E96189"
          />
          <ResultNumber
            imageUnitType={`${prefix}/images/ic_time.svg`}
            unit="ระยะเวลา"
            resultNum={historyExerciseTime || 0}
            unitType="นาที"
          />
        </Box>
        <SelectFixd
          borderraduis="25px"
          height="50px"
          label="none"
          margin="0 0 10px 0"
          onChange={handleChangeYear}
          value={dataSearch.year}
        >
          <option value="">กรุณาเลือกปี</option>
          <option value="2021">2564</option>
          <option value="2022">2565</option>
          <option value="2023">2566</option>
        </SelectFixd>
        <SelectFixd
          borderraduis="25px"
          height="50px"
          label="none"
          margin="0 0 20px 0"
          onChange={handleChangeMonth}
          value={dataSearch.month}
        >
          <option value="">กรุณาเลือกเดือน</option>
          {listMonthTh.map((itemMonth: any, idxMonth: number) => {
            return (
              <option value={itemMonth.id} key={idxMonth}>
                {itemMonth.name}
              </option>
            );
          })}
        </SelectFixd>
        <Box className={classes.contentTable}>
          {renderTableContainer(historyExerciseList)}
        </Box>
        <ButtonProps
          titlebutton="กลับ"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="10px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          maxwidthbtn="180px"
          heightbtn="40px"
          fontsizebtn="20px"
          marginbtn="0 auto"
          onClick={() => Router.push({ pathname: "/results-exercise" })}
        />
      </Box>
    </InnerLayout>
  );
};

export default HistoryPage;
