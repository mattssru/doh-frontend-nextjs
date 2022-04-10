import {
  Box,
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { SelectFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { RegisterAction } from "stores/register/register.action";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    height: 130,
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  left: {
    marginRight: 20,
  },
  right: {},
  level: {
    fontSize: 19,
    lineHeight: "23px",
    color: "#000",
    [theme.breakpoints.down("xs")]: {
      fontSize: 19,
      marginBottom: 5,
    },
    "& span": {
      fontSize: 35,
      lineHeight: "16px",
      color: "#E96189",
      position: "relative",
      top: 5,
      marginLeft: 6,
      display: "inline-block",
      [theme.breakpoints.down("xs")]: {},
    },
  },
  imageProfile: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    borderRadius: 10,
    width: 78,
    height: 78,
    [theme.breakpoints.down("xs")]: {},
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "10px",
    },
  },
  detailProfile: {
    [theme.breakpoints.down("xs")]: {},
    "& h3": {
      fontSize: 18,
      lineHeight: "22px",
      color: "#000",
      [theme.breakpoints.down("xs")]: {},
      "& span": {
        fontSize: 18,
        lineHeight: "22px",
        fontFamily: "DBHeavent_Cond",
        [theme.breakpoints.down("xs")]: {},
      },
    },
    "& h2": {
      fontSize: 32,
      lineHeight: "39px",
      [theme.breakpoints.down("xs")]: {},
    },
  },
  resultProfile: {
    "& p": {
      fontSize: 60,
      lineHeight: "40px",
      color: "#E96189",
      display: "inline-block",
    },
    "& span": {
      fontSize: 19,
      lineHeight: "23px",
      color: "#AAAAAA",
      marginLeft: 5,
    },
  },
  boxOpacity: {
    backgroundColor: "#E96189",
    maxWidth: 700,
    margin: "0 auto 20px",
    borderRadius: 5,
    padding: 10,
    "& h3": {
      color: "#fff",
      fontSize: 30,
      textAlign: "center",
      marginBottom: 10,
    },
  },
  boxInOpacity: {
    borderRadius: 5,
    backdropFilter: "brightness(0.85)",
    WebkitBackdropFilter: "brightness(0.85)",
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    flexDirection: "column",
    color: "#D0FD08",
    fontSize: 80,
    lineHeight: "54px",
    "& span": {
      color: "#fff",
      fontSize: 20,
      lineHeight: "24px",
    },
  },
  contentTable: {
    maxWidth: 700,
    margin: "0 auto",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "20px 15px",
    backgroundColor: "#fff",
    marginBottom: 20,
    "& table": {
      [theme.breakpoints.down("xs")]: {
        minWidth: 500,
      },
    },
    "& img": {
      width: 80,

    }
  },
}));

const tablehead = ["ลำดับ", "Lv.", "ชื่อ-นามสกุล", "Ebib", "Exp"];

const renderTable = (dataList: any) => {
  return dataList?.map((item: any, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell align="center" style={{ width: "" }}>
          {/* {item.cell01} */}
          {item.ranking}
        </TableCell>
        <TableCell align="center" style={{ width: "" }}>
          <img src={`${prefix}/level/lv${item.level || 0}.svg`} alt="" />
        </TableCell>
        <TableCell align="center" style={{ width: "" }}>
          {`${item.first_name} ${item.last_name}`}
        </TableCell>
        <TableCell align="center" style={{ width: "" }}>
          {item.ebib_code}
        </TableCell>
        <TableCell align="center" style={{ width: "" }}>
          {item.exp_total}
        </TableCell>
      </TableRow>
    );
  });
};

const RankPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { provinceList } = useSelector((state: IStates) => state.registerReducer);
  const { rankList } = useSelector((state: IStates) => state.homeReducer)
  const [provinceId, setProvinceId] = useState("top_thailand");

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: RegisterAction.PROVINCE_LIST_R
      })
    )
    dispatch(
      ActionSaga({
        type: HomeAction.RANK_LIST_R
      })
    )

  }, [])
  // useEffect(()=>{
  //   if (Object.keys(profile).length > 0){
  //     dispatch(
  //     )
  //   }
  // },[profile])
  const RenderProvicne = () => {

    if (provinceList !== undefined && provinceList.length > 0) {
      return provinceList.map((item: any, key: any) => {
        return (
          <option key={key} value={item.p_code}>{item.p_name}</option>
        )
      })
    } else {
      return ([])
    }
  }
  const ChangeOptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value)
    setProvinceId(value)
  }
  return (
    <InnerLayout titlepage="จัดอันดับ Rank">
      <Box className={classes.root}>
        <Box className={classes.left}>
          <Typography variant="h3" className={classes.level}>
            LEVEL
            <span>{profile?.level}</span>
          </Typography>
          <Box className={classes.imageProfile}>
            <img src={`${prefix}/level/lv${profile?.level || 0}.svg`} alt="" />
          </Box>
        </Box>
        <Box className={classes.right}>
          <Box className={classes.detailProfile}>
            <Typography variant="h3">
              Ebib :&nbsp;<span>{profile?.ebib_code}</span>
            </Typography>
            <Typography variant="h2">{profile?.first_name} {profile?.last_name}</Typography>
            <Box className={classes.resultProfile}>
              <p>{profile?.hp_total}</p>
              <span>แต้มสุขภาพ</span>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.boxOpacity}>
        <Typography variant="h3">อันดับของคุณ</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box className={classes.boxInOpacity}>
              {(profile?.user_ranking !== undefined && profile?.user_ranking?.rank_user) ? profile?.user_ranking.rank_user : <Skeleton variant="text" />} <span>ประเทศ</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.boxInOpacity}>
              {profile?.user_ranking !== undefined ? profile?.user_ranking.rank_user : <Skeleton variant="text" />} <span>จังหวัด</span>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.contentTable}>
        <SelectFixd
          label="none"
          margin="0 0 20px 0"
          onChange={ChangeOptionInput}
        >
          <option key="0" value="top_thailand" selected={provinceId === 'top_thailand'}> ทั้งประเทศ </option>
          {RenderProvicne()}
          {/* <option value="">ทั้งประเทศ</option> */}
        </SelectFixd>
        <TableDefault
          tablehead={tablehead}
          tablebody={renderTable(rankList[provinceId])}
          action="n"
        />
        <ButtonProps
          titlebutton="กลับ"
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          borderradiusbtn="5px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          maxwidthbtn="167px"
          heightbtn="40px"
          fontsizebtn="20px"
          marginbtn="40px auto 0"
          onClick={() => router.back()}
        />
      </Box>
    </InnerLayout>
  );
};

export default RankPage;
