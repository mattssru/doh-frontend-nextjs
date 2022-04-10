import { Box, Grid, makeStyles, TableCell, TableRow, Typography, InputLabel, Button, Modal } from "@material-ui/core";
import { BoxSum, CardReport, SumReport } from "components/common";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";
// import { padStart } from 'lodash';
import { ActionSaga } from "services/action.saga";
import { ReportAction } from "stores/report/report.action";
import SplashScreen from "components/SplashScreen";
import { SelectControl } from "components/common/controls";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { numberWithCommas } from 'utils/numberHelper';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels );

const useStyles = makeStyles((theme:any) => ({
  root: {
    "& .MuiTable-root  *::-webkit-scrollbar": {
      backgroundColor: "#ECEFF0",
      width: "12px",
      borderRadius: "18px",
    },
    "& .MuiTable-root  *::-webkit-scrollbar-thumb": {
      backgroundColor: "#AAAAAA",
      borderRadius: "18px",
      height: "60px",
    },
  },
  TopicReport: {
    fontSize: 50,
    lineHeight: "60px",
    textAlign: "center",
    marginBottom: 20,
    "& span": {
      color: "#E96189",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
      lineHeight: "36px",
    },
  },
  boxSum: {
    marginBottom: 20,
  },
  rowReport_01: {
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
    "& .MuiGrid-spacing-xs-3 > .MuiGrid-item": {
      [theme.breakpoints.down("sm")]: {
        padding: 6,
      },
    },
  },
  rowReport_02: {
    width: "100%",
    height: 600,
    marginBottom: 50,
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: 15,
    boxShadow: "0 1px 5px rgba(0,0,0,.16)",
    [theme.breakpoints.down("xs")]: {
      height: 450,
      marginBottom: 30,
    },
  },
  rowReport_02_title: {
    position: 'relative'
  },
  rowReport_02_button: {
    position: 'absolute',
    top: 0,
    right: 0,
    background:"linear-gradient(to top, #8CA51E, #D0FD08)",
    borderRadius: 10,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    maxWidth: 173,
    minWidth: 'inherit',
    height: 46,
    fontSize: 26,
  },
  rowReport_03: {
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 15,
    },
  },
  tableZone: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: 15,
    boxShadow: "0 1px 5px rgba(0,0,0,.16)",
    "& table": {
      "& tbody": {
        display: "block",
        height: "500px",
        overflowY: "auto",
        width: "100%",
        // paddingRight: "8px",
        "& tr": {
          display: "table",
          width: "100%",
          borderRadius: "12px",
          "& td": {
            width: "50%",
            fontSize: "22px !important",
          },
        },
      },
    },
  },
  rowReport_04: {
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
  },
  contrlshadow: {
    borderRadius: "12px",
    // padding: "20px",
    display: "flex",
    justifyContent: "center",
    height: 160,
    alignItems: "center",
    boxShadow: "0 1px 5px rgba(0,0,0,.16)",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      height: 130,
    },
  },
  contrlshadowLungsh_01: {
    borderRadius: "12px",
    // padding: "20px",
    color: '#fff',
    display: "flex",
    justifyContent: "center",
    height: 160,
    alignItems: "center",
    boxShadow: "0 1px 5px rgba(0,0,0,.16)",
    backgroundColor: "#70B642",
    [theme.breakpoints.down("sm")]: {
      height: 130,
    },
  },
  contrlshadowLungsh_02: {
    borderRadius: "12px",
    // padding: "20px",
    color: '#fff',
    display: "flex",
    justifyContent: "center",
    height: 160,
    alignItems: "center",
    boxShadow: "0 1px 5px rgba(0,0,0,.16)",
    backgroundColor: "#E96189",
    [theme.breakpoints.down("sm")]: {
      height: 130,
    },
  },
  contrlshadowLungshImage: {
    height: 70
  },
  rowReport_05: {
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,0.16)",
    padding: " 20px 15px",
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
      "& table": {
        width: 700,
        overflow: "scroll",
      },
    },
  },
  titleRow: {
    fontSize: 50,
    lineHeight: "60px",
    textAlign: "center",
    marginBottom: 10,
    "& img": {
      marginRight: 10,
      verticalAlign: "middle",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
      lineHeight: "36px",
      maxWidth: 180,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto 15px",
    },
  },
  rowReport_06: {
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,0.16)",
    padding: " 20px 15px",
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      "& table": {
        width: 1200,
        overflow: "scroll",
      },
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
  },
  rowGroup: {
    borderRadius: 12,
    backgroundColor: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,0.16)",
    padding: " 20px 15px",
  },
  rowReport_07: {
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
  },
  rowReport_08: {
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      "& table": {
        width: 1200,
        overflow: "scroll",
      },
    },
  },
  rowReport_09: {
    [theme.breakpoints.down("sm")]: {
      "& table": {
        width: 1200,
        overflow: "scroll",
      },
    },
  },
  filterMember: {
    marginBottom: 25,
    padding: "0 40px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
    "& p": {
      fontSize: 24,
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  },
  groupSum: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 12,
    height: "140px",
    boxShadow: "0 1px 5px rgba(0,0,0,.16)",
    color: "#1688C4",
    fontSize: "25px",
    padding: "17px 0 17px 0",
  },
  groupSum01: {
    fontSize: 20,
    fontFamily: "DBHeavent_MedCond",
    color: "#000",
  },
  groupSum02: {
    fontSize: 45,
    lineHeight: "54px",
    fontFamily: "DBHeavent_BoldCond",
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  },
  groupSum03: {
    fontSize: 20,
  },
  label: {
    position: "relative",
    transform: "none !important",
    fontSize: 20,
    lineHeight: "20px",
    color: "#000",
    fontFamily: "DBHeavent_Cond",
    height: 28,
    display: "flex",
    alignItems: "flex-end",
    margin: 0,
  },
  labelrequired: {
    position: `relative`,
    "&::after": {
      position: `absolute`,
      content: `'*'`,
      right: `-13px`,
      top: `0`,
      color: `red`,
      display: "none",
    },
  },
  labelText: {
    height: '60% !important'
  },
  reportSum: {
    marginBottom: "30px",
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  modal: {
    fontSize: 20,
    fontFamily: 'DBHeavent_MedCond'
  }
}));
interface DateTimeFormatOptions {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}

const ReportPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { token } = useSelector((state: IStates) => state.authenReducer);
  const { sumMembers, sumGroups, sumGraphs, sumRegisterZone, sumRegisterProvinces, sumTransExercies, sumTypeExerciesSS4, sumTypeExercies, sumMembersDesc, sumLungsh, groupsRanking, groupsEXP, groupsCalories, groupsOfficial } = useSelector((state: IStates) => state.reportReducer);
  const { filterZone, filterProvinces, filterDistricts, headerMembers='จังหวัด' } = useSelector((state: IStates) => state.reportReducer);
  const { zoneId, provinceId, districtId } = useSelector((state: IStates) => state.reportReducer.filters);
  const { filterZoneExercies, filterProvincesExercies, filterDistrictsExercies, headerExercies='จังหวัด' } = useSelector((state: IStates) => state.reportReducer);
  const { zoneIdExercies, provinceIdExercies, districtIdExercies } = useSelector((state: IStates) => state.reportReducer.filtersExercies);
  const { isLoadingFirstPage, isLoading } = useSelector((state: IStates) => state.reportReducer);
  const nf = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2,});

  const fetchData = (api:any, payload:any={}) => {
    dispatch(
      ActionSaga({
        type: `${api}`,
        payload: payload
      })
    )
  }

  useEffect(() => {
    fetchData(ReportAction.IS_LOADING_FIRSTPAGE_S, { isLoadingFirstPage: false })
    fetchData(ReportAction.FETCH_SUM_MEMBER_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_GRAPHS_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_REGISTER_ZONE_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_REGISTER_PROVINCES_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_TRANS_EXERCIES_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_TYPE_EXERCIES_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_LUNGSH_R, { accessToken: token })
    fetchData(ReportAction.FETCH_SUM_GROUPS_R, { accessToken: token })
    fetchData(ReportAction.FETCH_GROUPS_RANKING_R, { accessToken: token })
    fetchData(ReportAction.FETCH_GROUPS_EXP_R, { accessToken: token })
    fetchData(ReportAction.FETCH_GROUPS_CALORIES_R, { accessToken: token })
    // fetchData(ReportAction.FETCH_GROUPS_OFFICIAL_R, { accessToken: token })
  },[])

  useEffect(() => {
    fetchData(ReportAction.FETCH_FILTER_ZONE_R, { accessToken: token })
  },[])

  const headeractivity_list = [
    ["ประเภทกีฬา"],
    ["จำนวนผู้ส่งผล (คน)"],
    ["ระยะเวลา (นาที)"],
    ["ระยะทาง (กิโลเมตร)"],
    ["แคลอรี่"],
  ];

  const headeractivity_list_ss4 = [
    [headerExercies],
    ["ใช้พลังงาน (kcal)"],
    ["ระยะเวลา (นาที)"],
    ["ระยะทาง (กิโลเมตร)"],
  ];

  const headermember_list = [
    [headerMembers],
    ["จำนวนสมาชิกทั้งหมด"],
    ["ชาย"],
    ["หญิง"],
    ["ประชาชนทั่วไป"],
    ["นักเรียน"],
    ["อสม."],
    ["บุคลากรภาคเอกชน"],
    ["บุคลากรภาครัฐ"]
  ];

  const headrowGroup_list = [
    ["ลำดับ"],
    ["ชื่อกลุ่ม"],
    ["ประเภทกลุ่ม"],
    ["จังหวัด"],
    ["จำนวนสมาชิกทั้งหมด"],
    ["แคลอรี่"],
  ];

  const headrowGroup_list_exp = [
    ["ลำดับ"],
    ["ชื่อกลุ่ม"],
    ["ประเภทกลุ่ม"],
    ["จังหวัด"],
    ["จำนวนสมาชิกทั้งหมด"],
    ["จำนวน EXP"],
  ];

  const headrowGroup_list_cal = [
    ["ลำดับ"],
    ["ชื่อกลุ่ม"],
    ["ประเภทกลุ่ม"],
    ["จังหวัด"],
    ["จำนวนสมาชิกทั้งหมด"],
    ["แคลอรี่"],
  ];

  const headrowOfficial_list = [
    ["ลำดับ"],
    ["ชื่อกลุ่ม"],
    ["ประเภทกลุ่ม"],
    ["จังหวัด"],
    ["จำนวนสมาชิกทั้งหมด"],
    ["จำนวนแคลอรี"],
    // ["จำนวนกิโลเมตร"],
  ];

  const headergraphs_list = [
    ["ช่วงเวลา"],
    ["จำนวนผู้สมัคร (คน)"]
  ];

  const renderDateCurrent = () => {
    var options:DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('th-TH', options)
    return `ข้อมูล ณ วันที่ ${date}`
  }
  
  // const renderTimeCurrent = () => {
  //   // const dateHour = '' + new Date().getHours()
  //   // const dateMinute = '' + new Date().getMinutes()
  //   // const hour = padStart(dateHour, 2, '0')
  //   const hour = formatAMPM(new Date)
  //   // const minute = padStart(dateMinute, 2, '0')
  //   return `| เวลา ${hour}:${minute} น.`
  // }

  const formatAMPM = (date:any) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    if(hours < 10){
      hours = '0' + hours
    }
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes;
    return `| เวลา ${strTime} น.`;
  }

  const renderUsertype = () => {
    
    if(sumMembers.counttype != undefined && sumMembers.counttype.length > 0){
      return sumMembers.counttype.map((data:any, index:number) => {
        return (
          <Grid item sm xs={6} key={index}>
            <CardReport
              image={renderImageUsertype(index)}
              textcard01={data.name}
              numcard01={nf.format(data.count)}
              textcard02={'วันนี้เพิ่มขึ้น'}
              numcard02={`+ ${nf.format(data.add)}` || 0}
              unit01={'คน'}
              unit02={'คน'}
            />
          </Grid>
        )
      })
    }else{
      return ([])
    }
  }

  const renderImageUsertype = (key:number) => {
    if(key === 4){
      return `${prefix}/images/card_sum04.svg`
    }else{
      return `${prefix}/images/card_sum0${key+1}.svg`
    }
  }

  const renderZoneList = () => {
    if(sumRegisterZone != undefined && sumRegisterZone.length > 0){
      return sumRegisterZone.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{item.pcode != '' ? item.pcode : 'ไม่พบข้อมูล'}</TableCell>
            <TableCell align="center">{nf.format(item.countall) || 0}</TableCell>
          </TableRow>
        );
      });
    }else{
      return ([])
    }
  };

  const renderProvince = () => {
    if(sumRegisterProvinces != undefined && sumRegisterProvinces.length > 0){
      return sumRegisterProvinces.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{item.pcode != '' ? item.pcode : 'ไม่พบข้อมูล'}</TableCell>
            <TableCell align="center">{nf.format(item.countall) || 0}</TableCell>
          </TableRow>
        );
      });
    }else{
      return ([])
    }
  };

  const renderExercise = () => {
    if(sumTypeExercies != undefined && sumTypeExercies.length > 0){
      return sumTypeExercies.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{item.name != '' ? item.name : '-'}</TableCell>
            <TableCell
              align="center"
              style={{
                color: "#70B642",
                fontFamily: "DBHeavent_BoldCond",
                fontSize: 28,
              }}
            >
              {nf.format(item.user_count) || 0}
            </TableCell>
            <TableCell
              align="center"
              style={{
                color: "#E96189",
                fontFamily: "DBHeavent_BoldCond",
                fontSize: 28,
              }}
            >
              {nf.format(item.activity_time) || 0}
            </TableCell>
            <TableCell align="center">{nf.format(item.activity_distance) || 0}</TableCell>
            <TableCell align="center">{nf.format(item.activity_calorie) || 0}</TableCell>
          </TableRow>
        );
      });
    }else{
      return ([])
    }
  };

  const renderExerciseSS4 = () => {
    if(sumTypeExerciesSS4 != undefined && sumTypeExerciesSS4.length > 0){
      return sumTypeExerciesSS4.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{`${item.name}`}</TableCell>
            <TableCell
              align="center"
              style={{
                color: "#70B642",
                fontFamily: "DBHeavent_BoldCond",
                fontSize: 28,
              }}
            >
              {nf.format(item.count_calories) || 0}
            </TableCell>
            <TableCell
              align="center"
              style={{
                color: "#E96189",
                fontFamily: "DBHeavent_BoldCond",
                fontSize: 28,
              }}
            >
              {nf.format(item.count_time) || 0}
            </TableCell>
            <TableCell align="center">{nf.format(item.count_distance) || 0}</TableCell>
          </TableRow>
        );
      });
    }else{
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">กรุณาเลือกข้อมูลที่ต้องการค้นหา</TableCell>
        </TableRow>
      )
    }
  };

  const renderOptionZone = () => {
    if (filterZone !== undefined && filterZone.length > 0) {
      return filterZone.map((item:any, key:number) => {
        return (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        );
      });
    }
    return [];
  }

  const handleSelectZone = (e:any) => {
    const { name, value } = e.target
    fetchData(ReportAction.FILTER_S, {[name]: value})
    fetchData(ReportAction.FETCH_FILTER_PROVINCES_R, { accessToken: token })
    fetchData(ReportAction.FILTER_S, {provinceId: ''})
    fetchData(ReportAction.FILTER_S, {districtId: ''})
    fetchData(ReportAction.FILTER_S, {subDistrictId: ''})
    fetchData(ReportAction.FETCH_SUM_MEMBER_DESC_R, { accessToken: token })
    fetchData(ReportAction.IS_LOADING_S, { isLoading: true })
    fetchData(ReportAction.HEADER_MEMBER_S, 'จังหวัด')
  }

  const renderOptionProvince = () => {
    if (filterProvinces !== undefined && filterProvinces.length > 0) {
      return filterProvinces.map((item:any, key:number) => {
        return (
          <option key={key} value={item.p_code}>
            {item.p_name}
          </option>
        );
      });
    }
    return [];
  }

  const handleSelectProvince = (e:any) => {
    const { name, value } = e.target
    fetchData(ReportAction.FILTER_S, {[name]: value})
    fetchData(ReportAction.FETCH_FILTER_DISTRICTS_R, { accessToken: token })
    fetchData(ReportAction.FILTER_S, {districtId: ''})
    fetchData(ReportAction.FILTER_S, {subDistrictId: ''})
    fetchData(ReportAction.FETCH_SUM_MEMBER_DESC_R, { accessToken: token })
    fetchData(ReportAction.IS_LOADING_S, { isLoading: true })
    fetchData(ReportAction.HEADER_MEMBER_S, 'อำเภอ/เขต')
  }

  const renderOptionDistrict = () => {
    if (filterDistricts !== undefined && filterDistricts.length > 0) {
      return filterDistricts.map((item:any, key:number) => {
        return (
          <option key={key} value={item.a_code}>
            {item.a_name}
          </option>
        );
      });
    }
    return [];
  }

  const handleSelectDistrict = (e:any) => {
    const { name, value } = e.target
    fetchData(ReportAction.FILTER_S, {[name]: value})
    fetchData(ReportAction.FETCH_FILTER_SUBDISTRICTS_R, { accessToken: token })
    fetchData(ReportAction.FILTER_S, {subDistrictId: ''})
    fetchData(ReportAction.FETCH_SUM_MEMBER_DESC_R, { accessToken: token })
    fetchData(ReportAction.IS_LOADING_S, { isLoading: true })
    fetchData(ReportAction.HEADER_MEMBER_S, 'ตำบล/แขวง')
  }

  // const renderOptionSubDistrict = () => {
  //   if (filterSubdistricts !== undefined && filterSubdistricts.length > 0) {
  //     return filterSubdistricts.map((item:any, key:number) => {
  //       return (
  //         <option key={key} value={item.t_code}>
  //           {item.t_name}
  //         </option>
  //       );
  //     });
  //   }
  //   return [];
  // }

  // const handleSelectSubDistrict = (e:any) => {
  //   const { name, value } = e.target
  //   fetchData(ReportAction.FILTER_S, {[name]: value})
  //   // dispatch(report.actions.fetchSumMembersDesc())
  //   // dispatch(report.actions.setLoading(true))
  //   // dispatch(report.actions.setHeaderMembers("หมู่ที่"))
  // }

  const renderMemberList = () => {
    if (sumMembersDesc != undefined && sumMembersDesc.length > 0){
      return sumMembersDesc.map((data:any,index:number) => {
        return (
            <TableRow key={index}>
              <TableCell align="center">{data.name !== "" ? data.name : "ไม่พบข้อมูล"}</TableCell>
              <TableCell align="center">{nf.format(data.count_all)}</TableCell>
              <TableCell align="center">{nf.format(data.count_gm)}</TableCell>
              <TableCell align="center">{nf.format(data.count_gf)}</TableCell>
              <TableCell align="center">{nf.format(data.count_t1)}</TableCell>
              <TableCell align="center">{nf.format(data.count_t2)}</TableCell>
              <TableCell align="center">{nf.format(data.count_t3)}</TableCell>
              <TableCell align="center">{nf.format(data.count_t4)}</TableCell>
              <TableCell align="center">{nf.format(data.count_t5)}</TableCell>
            </TableRow>
        )
      })
    }else{
      return (
        <TableRow>
          <TableCell colSpan={9} align="center">ไม่พบข้อมูล</TableCell>
        </TableRow>
      )
    }
  }

  const renderGroupList = () => {
    if (groupsRanking != undefined && groupsRanking.length > 0){
      return groupsRanking.map((data:any,index:number) => {
        return (
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{data.commu_name}</TableCell>
              <TableCell align="center">{data.type_name}</TableCell>
              <TableCell align="center">{data.p_name}</TableCell>
              <TableCell align="center">{nf.format(data.count_users) || 0}</TableCell>
              <TableCell align="center">{nf.format(data.count_calories) || 0}</TableCell>
            </TableRow>
        )
      })
    }else{
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
        </TableRow>
      )
    }
  }

  const renderGroupListEXP = () => {
    if (groupsEXP != undefined && groupsEXP.length > 0){
      return groupsEXP.map((data:any,index:number) => {
        return (
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{data.commu_name}</TableCell>
              <TableCell align="center">{data.type_name}</TableCell>
              <TableCell align="center">{data.p_name}</TableCell>
              <TableCell align="center">{nf.format(data.count_users) || 0}</TableCell>
              <TableCell align="center">{nf.format(data.sum_exp) || 0}</TableCell>
              {/* <TableCell align="center">{nf.format(data.count_distance) || 0}</TableCell> */}
            </TableRow>
        )
      })
    }else{
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
        </TableRow>
      )
    }
  }

  const renderGroupListCalories = () => {
    if (groupsCalories != undefined && groupsCalories.length > 0){
      return groupsCalories.map((data:any,index:number) => {
        return (
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{data.commu_name}</TableCell>
              <TableCell align="center">{data.type_name}</TableCell>
              <TableCell align="center">{data.p_name}</TableCell>
              <TableCell align="center">{nf.format(data.count_users) || 0}</TableCell>
              <TableCell align="center">{nf.format(data.count_calories) || 0}</TableCell>
            </TableRow>
        )
      })
    }else{
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
        </TableRow>
      )
    }
  }

  const renderOfficialList = () => {
    if (groupsOfficial != undefined && groupsOfficial.length > 0){
      return groupsOfficial.map((data:any,index:number) => {
        return (
            <TableRow key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{data.name}</TableCell>
              <TableCell align="center">{data.t_name}</TableCell>
              <TableCell align="center">{data.p_name}</TableCell>
              <TableCell align="center">{nf.format(data.count_members) || 0}</TableCell>
              <TableCell align="center">{nf.format(data.count_calories) || 0}</TableCell>
              {/* <TableCell align="center">{nf.format(data.count_distance) || 0}</TableCell> */}
            </TableRow>
        )
      })
    }else{
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
        </TableRow>
      )
    }
  }

  const chartData = {
    labels: sumGraphs.map((item: any) => `${item.start_date} - ${item.end_date}`).slice(0, 5),
    datasets: [
      {
        data: sumGraphs.map((item: any) => item.total).slice(0, 5),
        backgroundColor: 'rgb(112, 182, 66)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions:any = {
    display: true,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        // color: 'black',
        anchor: 'end',
        align: 'top',
        clamp: true,
        formatter: function (value: number) {
          return `${numberWithCommas(value)} คน`;
        },
        font: {
          size: 22,
          weight: 'bold',
          family: 'DBHeavent_Cond'
        },
      },
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       display: true,
      //       // fontColor: 'red',
      //       font: {
      //         size: 22,
      //         weight: 'bold',
      //         family: 'DBHeavent_Cond'
      //       },
      //     },
      //   }],
      //   xAxes: [{
      //     ticks: {
      //       display: true,
      //       // fontColor: 'green',
      //       font: {
      //         size: 22,
      //         weight: 'bold',
      //         family: 'DBHeavent_Cond'
      //       },
      //     },
      //   }]
      // }
    },
  };

  const renderSumGraphs = () => {
    if(sumGraphs != undefined && sumGraphs.length > 0){
      return sumGraphs.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{`${item.start_date} - ${item.end_date}`}</TableCell>
            <TableCell align="center">{nf.format(item.total) || 0}</TableCell>
          </TableRow>
        );
      });
    }else{
      return(
        <TableRow>
          <TableCell colSpan={9} align="center">ไม่พบข้อมูล</TableCell>
        </TableRow>
      )
    }
  }

  // Exercise Filter
  const renderOptionZoneExercies = () => {
    if (filterZoneExercies !== undefined && filterZoneExercies.length > 0) {
      return filterZoneExercies.map((item:any, key:number) => {
        return (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        );
      });
    }
    return [];
  }

  const handleSelectZoneExercies = (e:any) => {
    const { name, value } = e.target
    fetchData(ReportAction.FILTER_EXERCIES_S, {[name]: value})
    fetchData(ReportAction.FETCH_FILTER_PROVINCES_R, { accessToken: token, type: 'exercies' })
    fetchData(ReportAction.FILTER_EXERCIES_S, {provinceIdExercies: ''})
    fetchData(ReportAction.FILTER_EXERCIES_S, {districtIdExercies: ''})
    fetchData(ReportAction.FILTER_EXERCIES_S, {subDistrictIdExercies: ''})
    fetchData(ReportAction.FETCH_SUM_TYPE_EXERCIES_SS4_R, { accessToken: token })
    fetchData(ReportAction.IS_LOADING_S, { isLoading: true })
    fetchData(ReportAction.HEADER_EXERCIES_S, 'จังหวัด')
  }

  const renderOptionProvinceExercies = () => {
    if (filterProvincesExercies !== undefined && filterProvincesExercies.length > 0) {
      return filterProvincesExercies.map((item:any, key:number) => {
        return (
          <option key={key} value={item.p_code}>
            {item.p_name}
          </option>
        );
      });
    }
    return [];
  }

  const handleSelectProvinceExercies = (e:any) => {
    const { name, value } = e.target
    let header_exercise = value?.length ? 'อำเภอ/เขต' : 'จังหวัด'
    fetchData(ReportAction.FILTER_EXERCIES_S, {[name]: value})
    fetchData(ReportAction.FETCH_FILTER_DISTRICTS_R, { accessToken: token, type: 'exercies' })
    fetchData(ReportAction.FILTER_EXERCIES_S, {districtIdExercies: ''})
    fetchData(ReportAction.FILTER_EXERCIES_S, {subDistrictIdExercies: ''})
    fetchData(ReportAction.FETCH_SUM_TYPE_EXERCIES_SS4_R, { accessToken: token })
    fetchData(ReportAction.IS_LOADING_S, { isLoading: true })
    fetchData(ReportAction.HEADER_EXERCIES_S, header_exercise)
  }

  const renderOptionDistrictExercies = () => {
    if (filterDistrictsExercies !== undefined && filterDistrictsExercies.length > 0) {
      return filterDistrictsExercies.map((item:any, key:number) => {
        return (
          <option key={key} value={item.a_code}>
            {item.a_name}
          </option>
        );
      });
    }
    return [];
  }

  const handleSelectDistrictExercies = (e:any) => {
    const { name, value } = e.target
    let header_exercise = value?.length && districtIdExercies ? 'ตำบล/แขวง' : provinceIdExercies ? 'อำเภอ/เขต' : 'จังหวัด'
    fetchData(ReportAction.FILTER_EXERCIES_S, {[name]: value})
    fetchData(ReportAction.FETCH_SUM_TYPE_EXERCIES_SS4_R, { accessToken: token })
    // fetchData(ReportAction.FETCH_FILTER_EXERCIES_SUBDISTRICTS_R, { accessToken: token })
    // fetchData(ReportAction.FILTER_EXERCIES_S, {subDistrictId: ''})
    // fetchData(ReportAction.FETCH_SUM_EXERCIES_DESC_R, { accessToken: token })
    fetchData(ReportAction.IS_LOADING_S, { isLoading: true })
    fetchData(ReportAction.HEADER_EXERCIES_S, header_exercise)
  }
  // End Exercise Filter

  return (
    <InnerLayout>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item sm={6} xs={12}>
            <Box className={classes.rowReport_05}>
              <Typography variant="h3" className={classes.titleRow}>
                ผลออกกำลังกาย
              </Typography>
              <TableDefault
                tablehead={headergraphs_list}
                maxHeight="300px"
                tablebody={renderSumGraphs()}
                action="n"
              />
              <Button className={classes.modal} onClick={() => setModal(false)}>ปิด</Button>
            </Box>
          </Grid>
        </Grid>
      </Modal>
      {
        isLoadingFirstPage ?
        <SplashScreen isLoading={isLoadingFirstPage}/> :
        <Box className={classes.root}>
          <SplashScreen isLoading={isLoading}/>

          <Typography variant="h2" className={classes.TopicReport}>
            {`${renderDateCurrent()}`} &nbsp;
            <span>{`${formatAMPM(new Date)}`}</span>
          </Typography>

          <Box className={classes.boxSum}>
            <Grid container spacing={3}>
              <Grid item sm={4} xs={12}>
                <BoxSum
                  backgroundcolor="#70B642"
                  image={`${prefix}/images/sum01.svg`}
                  text="จำนวนผู้ลงทะเบียนทั้งหมด"
                  num={nf.format(sumMembers.countusers)|| 0}
                  // num="1,234,567"
                  unit="คน"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <BoxSum
                  backgroundcolor="#449AE3"
                  image={`${prefix}/images/sum02.svg`}
                  text="ผู้ชาย"
                  num={nf.format(sumMembers.countgm) || 0}
                  unit="คน"
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <BoxSum
                  backgroundcolor="#E96189"
                  image={`${prefix}/images/sum03.svg`}
                  text="ผู้หญิง"
                  num={nf.format(sumMembers.countgf) || 0}
                  unit="คน"
                />
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.rowReport_01}>
            <Grid container spacing={3}>
              {renderUsertype()}
            </Grid>
          </Box>

          <Box className={classes.rowReport_02}>
            <Box className={classes.rowReport_02_title}>
              <p style={{marginBottom:60}}>จำนวนผู้สมัคร (คน)</p>
              <Button
                variant="contained"
                color="primary"
                className={classes.rowReport_02_button}
                onClick={() => setModal(true)}
              >
                เพิ่มเติม
              </Button>
            </Box>
            <div className='chart'>
              <Bar 
                data={chartData} 
                options={chartOptions} 
                width={10} 
                height={4}/>
            </div>
          </Box>

          <Box className={classes.rowReport_03}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <Box className={classes.tableZone}>
                  <TableDefault
                    backgroundcolor="#70B642"
                    color="#70B642"
                    fontfamily="DBHeavent_BoldCond !important"
                    colspan={2}
                    tablehead={["จำนวนผู้สมัครรายเขตสุขภาพ (คน)"]}
                    tablebody={renderZoneList()}
                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box className={classes.tableZone}>
                  <TableDefault
                    backgroundcolor="#E96189"
                    color="#E96189"
                    fontfamily="DBHeavent_BoldCond !important"
                    colspan={2}
                    tablehead={["จำนวนผู้สมัครรายจังหวัด (คน)"]}
                    tablebody={renderProvince()}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.rowReport_06}>
            <Typography variant="h3" className={classes.titleRow}>
              รายละเอียดสมาชิก
            </Typography>
            <Box className={classes.filterMember}>
              <Grid container spacing={2}>
                <Grid item md={1} sm={12} xs={12}>
                  <InputLabel htmlFor="" className={classes.label} disabled={false}>
                    <Box component="span" className={`${classes.labelrequired}`}></Box>
                  </InputLabel>
                    <p className={classes.labelText}>โปรดเลือก</p>
                </Grid>
                <Grid item md={11} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={4} sm={4} xs={12}>
                      <SelectControl
                        name="zoneId"
                        titleDefault={"กรุณาเลือกเขตสุขภาพ"}
                        renderOptions={renderOptionZone()}
                        onChange={handleSelectZone}
                        value={zoneId}
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                      <SelectControl
                        name="provinceId"
                        titleDefault={"กรุณาเลือกจังหวัด"}
                        renderOptions={renderOptionProvince()}
                        onChange={handleSelectProvince}
                        value={provinceId}
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                        <SelectControl
                          name="districtId"
                          titleDefault={"กรุณาเลือกอำเภอ"}
                          renderOptions={renderOptionDistrict()}
                          onChange={handleSelectDistrict}
                          value={districtId}
                        />
                    </Grid>
                    {/* <Grid item md={3} sm={3} xs={12}>
                      <SelectControl
                        name="subDistrictId"
                        titleDefault={"กรุณาเลือกตำบล"}
                        renderOptions={renderOptionSubDistrict()}
                        onChange={handleSelectSubDistrict}
                        value={subDistrictId}
                      />
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {
              sumMembersDesc != undefined && sumMembersDesc.length > 0 &&
              <TableDefault
                tablehead={headermember_list}
                maxHeight="300px"
                tablebody={renderMemberList()}
                action="n"
              />
            }
          </Box>

          <Box className={classes.reportSum}>
            <Typography variant="h3" className={classes.titleRow}>
              รายงานการบริหารปอด
            </Typography>
            <Grid container spacing={4}>
              <Grid item sm={6} xs={12}>
                  <Box className={classes.contrlshadowLungsh_01}>
                      <SumReport
                        propImage={70}
                        imageUnitType={`${prefix}/images/sum04.svg`}
                        unit={'จำนวนคนส่งผลบริหารปอด'}
                        resultNum={nf.format(sumLungsh.count_users) || 0}
                        unitType={'คน'}
                        ColorNum="#fff"
                        ColorUnit="#fff !important"
                        valueType={2}
                      />
                  </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box className={classes.contrlshadowLungsh_02}>
                    <SumReport
                      imageUnitType={`${prefix}/images/ic_time.svg`}
                      unit={'ระยะเวลารวมบริหารปอด'}
                      resultNum={nf.format(sumLungsh.count_time) || 0}
                      unitType={'นาที'}
                      ColorNum="#fff"
                      ColorUnit="#fff !important"
                      sizeImage={70}
                      valueType={2}
                    />
                  </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.rowReport_04}>
            <Typography variant="h3" className={classes.titleRow}>
              รายงานการออกกำลังกาย
            </Typography>
            <Grid container spacing={3}>
              <Grid item sm={4} xs={12}>
                <Box className={classes.contrlshadow}>
                  <SumReport
                    imageUnitType={`${prefix}/images/ic_cal.svg`}
                    unit="จำนวนสะสมพลังงานทั้งหมด"
                    resultNum={nf.format(sumTransExercies.count_calories) || 0}
                    unitType="กิโลแคลอรี่"
                    ColorNum="#70B642"
                  />
                </Box>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box className={classes.contrlshadow}>
                  <SumReport
                    imageUnitType={`${prefix}/images/ic_running.svg`}
                    unit="จำนวนระยะทางทั้งหมด"
                    resultNum={nf.format(sumTransExercies.count_distance) || 0}
                    unitType="กิโลเมตร"
                    ColorNum="#E96189"
                  />
                </Box>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box className={classes.contrlshadow}>
                  <SumReport
                    imageUnitType={`${prefix}/images/ic_time.svg`}
                    unit="จำนวนเวลาทั้งหมด"
                    resultNum={nf.format(sumTransExercies.count_time) || 0}
                    unitType="นาที"
                    ColorNum="#449AE3"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.rowReport_05}>
            <Typography variant="h3" className={classes.titleRow}>
              ผลออกกำลังกาย
            </Typography>
            <TableDefault
              tablehead={headeractivity_list}
              maxHeight="300px"
              tablebody={renderExercise()}
              action="n"
            />
          </Box>

          <Box className={classes.rowReport_05}>
            <Typography variant="h3" className={classes.titleRow}>
              ข้อมูลผลออกกำลังกาย
            </Typography>
            <Box className={classes.filterMember}>
              <Grid container spacing={2}>
                <Grid item md={1} sm={12} xs={12}>
                  <InputLabel htmlFor="" className={classes.label} disabled={false}>
                    <Box component="span" className={`${classes.labelrequired}`}></Box>
                  </InputLabel>
                    <p className={classes.labelText}>โปรดเลือก</p>
                </Grid>
                <Grid item md={11} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={4} sm={4} xs={12}>
                      <SelectControl
                        name="zoneIdExercies"
                        titleDefault={"กรุณาเลือกเขตสุขภาพ"}
                        renderOptions={renderOptionZoneExercies()}
                        onChange={handleSelectZoneExercies}
                        value={zoneIdExercies}
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                      <SelectControl
                        name="provinceIdExercies"
                        titleDefault={"กรุณาเลือกจังหวัด"}
                        renderOptions={renderOptionProvinceExercies()}
                        onChange={handleSelectProvinceExercies}
                        value={provinceIdExercies}
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                        <SelectControl
                          name="districtIdExercies"
                          titleDefault={"กรุณาเลือกอำเภอ"}
                          renderOptions={renderOptionDistrictExercies()}
                          onChange={handleSelectDistrictExercies}
                          value={districtIdExercies}
                        />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <TableDefault
              backgroundColorHeader={'#70B642'}
              tablehead={headeractivity_list_ss4}
              maxHeight="300px"
              tablebody={renderExerciseSS4()}
              action="n"
            />
          </Box>
          
          <Box className={classes.rowGroup}>
            <Box className={classes.rowReport_07}>
              <Typography variant="h3" className={classes.titleRow}>
                รายละเอียดกลุ่ม
              </Typography>
              <Grid container spacing={3}>
                <Grid item md={4} sm={12} xs={12}>
                  <BoxSum
                    backgroundcolor="#449AE3"
                    image={`${prefix}/images/ic_sumgroup.svg`}
                    text={"จำนวนกลุ่มทั้งหมด"}
                    num={nf.format(sumGroups.count_groups)|| 0}
                    unit={"กลุ่ม"}
                  />
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                  <Grid container spacing={3}>
                    <Grid item sm={3} xs={6}>
                      <Box className={classes.groupSum}>
                        <Box className={classes.groupSum01}>จำนวนกลุ่มชุมชน</Box>
                        <Box className={classes.groupSum02}>{nf.format(sumGroups.community)|| 0}</Box>
                        <Box className={classes.groupSum03}>กลุ่ม</Box>
                      </Box>
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <Box className={classes.groupSum}>
                        <Box className={classes.groupSum01}>
                          จำนวนกลุ่มโรงเรียน
                        </Box>
                        <Box className={classes.groupSum02}>{nf.format(sumGroups.school)|| 0}</Box>
                        <Box className={classes.groupSum03}>กลุ่ม</Box>
                      </Box>
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <Box className={classes.groupSum}>
                        <Box className={classes.groupSum01}>จำนวนกลุ่มองกรค์</Box>
                        <Box className={classes.groupSum02}>{nf.format(sumGroups.organization)|| 0}</Box>
                        <Box className={classes.groupSum03}>กลุ่ม</Box>
                      </Box>
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <Box className={classes.groupSum}>
                        <Box className={classes.groupSum01}>
                          จำนวนกลุ่มสาธารณสุข
                        </Box>
                        <Box className={classes.groupSum02}>{nf.format(sumGroups.health)|| 0}</Box>
                        <Box className={classes.groupSum03}>กลุ่ม</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            
            <Box className={classes.rowReport_08}>
              <Typography variant="h3" className={classes.titleRow}>
                อันดับกลุ่มที่สมาชิกสูงสุด 20 อันดับ
              </Typography>
              <TableDefault
                tablehead={headrowGroup_list}
                maxHeight="300px"
                tablebody={renderGroupList()}
                action="n"
              />
            </Box>

            <Box className={classes.rowReport_08}>
              <Typography variant="h3" className={classes.titleRow}>
                อันดับกลุ่มที่มี EXP สูงสุด 10 อันดับ
              </Typography>
              <TableDefault
                tablehead={headrowGroup_list_exp}
                maxHeight="300px"
                tablebody={renderGroupListEXP()}
                type={2}
                action="n"
              />
            </Box>

            <Box className={classes.rowReport_08}>
              <Typography variant="h3" className={classes.titleRow}>
                อันดับกลุ่มที่มีแคลอรี่สูงสุด 20 อันดับ
              </Typography>
              <TableDefault
                backgroundColorHeader={'#70B642'}
                tablehead={headrowGroup_list_cal}
                maxHeight="300px"
                tablebody={renderGroupListCalories()}
                action="n"
              />
            </Box>

            <Box className={classes.rowReport_09}>
              <Typography variant="h3" className={classes.titleRow}>
                <img src={`${prefix}/images/ic_official.svg`} alt="" />
                รายชื่อกลุ่มทางการ (Official Group)
              </Typography>
              <TableDefault
                tablehead={headrowOfficial_list}
                maxHeight="300px"
                tablebody={renderOfficialList()}
                action="n"
              />
            </Box>
          </Box>

        </Box>
      }
    </InnerLayout>
  );
};

export default ReportPage;