import { Box, makeStyles, Typography, Link } from "@material-ui/core";
import { CardActivityList, CardInfoList } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import prefix from "utils/path";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommunitiesAction } from "stores/communities/communities.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
// import { useForm, Form } from 'hooks/useForm';
import { useRouter } from "next/router";
import { MasterAction } from "stores/master/master.action";
// import { time } from "console";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "20px",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  paddingCommuCard: {
    width: 230,
    [theme.breakpoints.down("md")]: {
      width: 130,
    },
    [theme.breakpoints.down("sm")]: {
      width: 70,
    },
    [theme.breakpoints.down("xs")]: {
      width: 0,
    },
  },
  cardCommunity: {
    display: "flex",
    justifyContent: "space-between",
    // padding: '0px 250px',
  },
  logoCommunity: {
    color: "#1688c4",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DBHeavent_MedCond",
    marginRight: 10,
  },
  imageCommunity: {
    width: 110,
    height: 110,
    borderRadius: "100%",
    padding: 5,
    backgroundColor: "#fff",
    boxShadow: "0 3px 5px #707070",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "100%",
    },
  },
  buttonCommunity: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15,
    cursor: "pointer",
    "& img": {
      marginRight: 5,
    },
  },
  memberCommunity: {
    width: 180,
    height: 170,
    backgroundColor: "#449ae3",
    borderRadius: 40,
    padding: 16,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: 80,
      padding: 10,
    },

    // marginRight: 10
  },
  calorieCommunity: {
    width: 180,
    height: 170,
    backgroundColor: "#e96189",
    borderRadius: 40,
    padding: 16,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: 80,
      padding: 10,
    },
  },
  titleCommunity: {
    color: "#fff",
    fontSize: 24,
    lineHeight: "29px",
    fontFamily: "DBHeavent_MedCond",
    height: 40,
    [theme.breakpoints.down("xs")]: {
      // height: 60,
      fontSize: 20,
    },
  },
  degreeCommunity: {
    color: "#fff",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DBHeavent_MedCond",
    marginTop: 5,
  },
  numberCommunity: {
    color: "#fff",
    fontSize: 60,
    lineHeight: "50px",
    fontFamily: "DBHeavent_BoldCond",
    [theme.breakpoints.down("xs")]: {
      // height: 60,
      fontSize: 40,
    },
  },
  detailCommunity: {
    width: "100%",
    marginTop: 32,
    marginBottom: 20,
  },
  bothLine: {
    display: "flex",
    borderBottom: "1px solid #dbdbdb",
    borderTop: "1px solid #dbdbdb",
    padding: "8px 0",
  },
  underline: {
    display: "flex",
    borderBottom: "1px solid #dbdbdb",
    padding: "8px 0",
  },
  detailTitle: {
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DBHeavent_MedCond",
    width: 180,
  },
  detail: {
    color: "#848484",
    fontSize: 20,
    lineHeight: "24px",
    fontFamily: "DBHeavent_MedCond",
    width: "100%",
    position: "relative",
    "&::before": {
      content: '":"',
      display: "block",
      position: "absolute",
      left: "-6px",
      top: "-1px",
    },
  },
  exerciseHeader: {
    color: "#000",
    fontSize: 30,
    lineHeight: "36px",
    fontFamily: "DBHeavent_MedCond",
    width: "100%",
    textAlign: "center",
  },
  exerciseData: {
    display: "flex",
    alignItems: "end",
    marginBottom: 20,
    "& img": {
      width: 33,
      height: 33,
      marginBottom: 4,
      marginRight: 16,
    },
    "& .title": {
      fontSize: 20,
      lineHeight: "24px",
      fontFamily: "DBHeavent_MedCond",
    },
  },
  exerciseDetail: {
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: 60,
      lineHeight: "40px",
      fontFamily: "DBHeavent_BoldCond",
    },
    "& .distance": {
      color: "#e96189",
    },
    "& .time": {
      color: "#449ae3",
    },
    "& .burn": {
      color: "#70b642",
    },
    "& .exp": {
      color: "#54469b",
    },
    "& .unit": {
      fontSize: 20,
      lineHeight: "24px",
      fontFamily: "DBHeavent_MedCond",
      color: "#aaaaaa",
      marginLeft: 12,
    },
  },
  betweenBtn: {
    marginBottom: 16,
  },
  conText: {
    color: '#900C3F',
    fontSize: 24,
    // paddingLeft: 40,

  }
}));

const CommunityPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { commuCode } = router.query;
  const { profile } = useSelector((state: IStates) => state.profileReducer);

  const { detailCommunities, detailgroup, listEvents, expRanking, groupExpList } =
    useSelector((state: IStates) => state.communitiesReducer);
  const { communitiesList } = useSelector(
    (state: IStates) => state.masterReducer
  );
  // console.log('group exp ', groupExpList)

  const [typeCommunities, setTypeCommunities] = useState("");
  const [expFilterRanking, setFilterExpRanking] = useState(0);
  const [expFilterTotal, setFilterExpTotal] = useState(0);
  // console.log("detailCommunities", detailCommunities?.type_id);
  // console.log("expRanking", expRanking);
  //   console.log("communitiesList", communitiesList);
  // commu_code
  useEffect(() => {
    if (
      detailCommunities &&
      expRanking &&
      JSON.stringify(detailCommunities) !== "{}" &&
      JSON.stringify(expRanking) !== "{}"
    ) {
      expRanking[detailCommunities?.type_id - 1]?.data?.map((item: any) => {
        if (item.commu_code === detailCommunities?.commu_code) {
          // console.log("filter", item.exp_total);
          setFilterExpRanking(item.ranking);
          setFilterExpTotal(item.exp_total);
          // console.log(detailCommunities, detailgroup)
        }
      });
    }
  }, [detailCommunities, expRanking]);
  useEffect(() => {
    if (Object.keys(detailCommunities).length > 0) {
      dispatch(
        ActionSaga({
          type: CommunitiesAction.GROUP_EXP_R,
          payload: { id: detailCommunities.type_id }
        })
      )
    }
  }, [detailCommunities])

  useEffect(() => {
    if (Object.keys(groupExpList).length > 0) {
      groupExpList?.map((item: any) => {
        if (item.commu_code === commuCode) {
          console.log(item)
          setFilterExpTotal(item.exp_total)
          setFilterExpRanking(item.ranking)
        }
      })
    }
  }, [groupExpList])

  const handleSaveInfoNew = async (e: any) => {
    // console.log("e", e);
    // return (dispatch: any) => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.UPDATE_NEW_COMMUNITY_R,
        payload: {
          commu_code: commuCode,
          announcement: e.announcement,
        },
      })
    );
    // return dispatch(
    //     ActionSaga({
    //         type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_R,
    //         payload:commuCode
    //         })
    //     )
    //   }
  };

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      dispatch(
        ActionSaga({
          type: MasterAction.FETCH_COMMUNITIES_LST_R,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_R,
          payload: commuCode,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.PROVINCE_LIST_R,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_LIST_EVENT_R,
          payload: commuCode,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_LIST_ACTIVITIES_R,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_LIST_NOTI_NEWS_R,
          payload: commuCode,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_DETAIL_GROUP_R,
          payload: commuCode,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_EXP_RANKING_R,
          payload: commuCode,
        })
      );
    }
  }, [profile]);

  useEffect(() => {
    if (detailCommunities?.type_id && communitiesList.length > 0) {
      const typeCommunities = communitiesList.find(
        (item: any) => item.id === detailCommunities.type_id
      );
      setTypeCommunities(typeCommunities["name"]);
    }
  }, [detailCommunities, communitiesList]);

  const convertDate = (date: any) => {
    var options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString(["th-TH"], options as any);
  };

  const convertDateEvent = (date: any) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("th-TH", options as any);
  };

  const renderActivityList = () => {
    var activityList = listEvents?.map((item: any) => {
      const newObject = {
        eventId: item.id,
        dateStart: convertDateEvent(item.start_date),
        dateEnd: convertDateEvent(item.end_date),
        title: item.title,
      };
      return newObject;
    });
    return activityList;
  };

  // const dataInfo = [
  //     {
  //         date: "10/01/2564",
  //         des: "เป็นแค่ข้อความยาวๆ เพิ่มไม่ได้มากกว่านี้แล้วจ้า กด + คือการแก้ไข Text"
  //     }
  // ]

  // const dataActivity = [
  //     {
  //         dateStart: "1 มกราคม 2564",
  //         dateEnd: "30 มีนาคม 2564",
  //         title: "ก้าวท้าใจไปด้วยกัน"
  //     },
  //     {
  //         dateStart: "1 มกราคม 2564",
  //         dateEnd: "30 มีนาคม 2564",
  //         title: "ก้าวท้าใจไปด้วยกัน"
  //     },
  //     {
  //         dateStart: "1 มกราคม 2564",
  //         dateEnd: "30 มีนาคม 2564",
  //         title: "ก้าวท้าใจไปด้วยกัน"
  //     },
  // ]

  return (
    <InnerLayout titlepage={typeCommunities}>
      <Box className={classes.root}>
        <Box className={classes.cardCommunity}>
          <Box className={classes.paddingCommuCard} />
          <Box className={classes.logoCommunity}>
            <Box className={classes.imageCommunity}>
              <img
                src={
                  detailCommunities?.thumbnail ||
                  `${prefix}/images/logo_print.svg`
                }
                alt=""
              />
            </Box>
            {detailCommunities?.status_admin == 1 && (
              <Link
                onClick={() =>
                  router.push({
                    pathname: `/community/${commuCode}/edit-group`,
                  })
                }
              >
                <Box className={classes.buttonCommunity}>
                  <img src={`${prefix}/icons/ic_setting.svg`} alt="" />
                  แก้ไขกลุ่ม
                </Box>
              </Link>
            )}
          </Box>
          <Box className={`${classes.memberCommunity}`}>
            <Typography className={classes.titleCommunity}>สมาชิก</Typography>
            <img src={`${prefix}/icons/ic_member.svg`} alt="" />
            <Typography className={classes.degreeCommunity}>
              ลำดับที่
            </Typography>
            <Typography className={classes.numberCommunity}>
              {detailgroup.member_rank || 0}
            </Typography>
          </Box>
          <Box className={`${classes.calorieCommunity}`}>
            <Typography className={classes.titleCommunity}>
              อันดับ EXP
            </Typography>
            <img src={`${prefix}/icons/ic_calorie.svg`} alt="" />
            <Typography className={classes.degreeCommunity}>
              ลำดับที่
            </Typography>
            <Typography className={classes.numberCommunity}>
              {expFilterRanking}
            </Typography>
          </Box>
          <Box className={classes.paddingCommuCard} />
        </Box>

        <Box className={classes.detailCommunity}>
          <Box className={classes.bothLine}>
            <Typography className={classes.detailTitle}>ชื่อ</Typography>
            <Typography className={classes.detail}>
              {" "}
              {detailCommunities?.name}
            </Typography>
          </Box>
          <Box className={classes.underline}>
            <Typography className={classes.detailTitle}>รหัสกลุ่ม</Typography>
            <Typography className={classes.detail}>
              {" "}
              {detailCommunities?.commu_code}
            </Typography>
          </Box>
          <Box className={classes.underline}>
            <Typography className={classes.detailTitle}>ผู้ดูแล</Typography>
            <Typography className={classes.detail}>
              {" "}
              {detailCommunities?.nameAdmin || "-"}
            </Typography>
          </Box>
          <Box className={classes.underline}>
            <Typography className={classes.detailTitle}>สมาชิก</Typography>
            <Typography className={classes.detail}>
              {" "}
              {`${detailCommunities?.total_member || 0} คน`}
            </Typography>
          </Box>
          <Box className={classes.underline}>
            <Typography className={classes.detailTitle}>ติดต่อ</Typography>
            <Typography className={classes.detail}>
              {" "}
              {detailCommunities?.contact_desc || "-"}
            </Typography>
          </Box>
          <Box className={classes.underline}>
            <Typography className={classes.detailTitle}>คำอธิบาย</Typography>
            <Typography className={classes.detail}>
              {" "}
              {detailCommunities?.desc || 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.root}>
        <Typography className={classes.exerciseHeader}>
          ข้อมูลการออกกำลังกาย
        </Typography>
        <Box className={classes.exerciseData}>
          <img src={`${prefix}/icons/ic_shoes.svg`} alt="" />
          <Box>
            <Typography className="title">ระยะทาง</Typography>
            <Box className={classes.exerciseDetail}>
              <Typography className="distance">
                {detailgroup.total_distanct || 0}
              </Typography>
              <Typography className="unit">กิโลเมตร</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.exerciseData}>
          <img src={`${prefix}/icons/ic_clock.svg`} alt="" />
          <Box>
            <Typography className="title">ระยะเวลา</Typography>
            <Box className={classes.exerciseDetail}>
              <Typography className="time">
                {detailgroup.total_time || 0}
              </Typography>
              <Typography className="unit">นาที</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.exerciseData}>
          <img src={`${prefix}/icons/ic_fireburn.svg`} alt="" />
          <Box>
            <Typography className="title">การเผาผลาญพลังงาน</Typography>
            <Box className={classes.exerciseDetail}>
              <Typography className="burn">
                {detailgroup.total_calories || 0}
              </Typography>
              <Typography className="unit">แคลอรี่</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.exerciseData}>
          <img src={`${prefix}/icons/ic_fireburn.svg`} alt="" />
          <Box>
            <Typography className="title">ค่าประสบการณ์รวม</Typography>
            <Box className={classes.exerciseDetail}>
              <Typography className="burn">{expFilterTotal}</Typography>
              <Typography className="unit">Exp</Typography>
            </Box>
          </Box>

        </Box>
        <p className={classes.conText}> ค่าประสบการณ์รวม และ อันดับ exp จะถูกอัพเดททุกเที่ยงคืน </p>
        {/* <Box className={classes.exerciseData}>
                    <img src={`${prefix}/icons/ic_exp.svg`} alt="" />
                    <Box>
                        <Typography className="title">ค่าประสบการณ์รวม</Typography>
                        <Box className={classes.exerciseDetail}>
                            <Typography className="exp">1,231</Typography>
                            <Typography className="unit">Exp</Typography>
                        </Box>
                    </Box>
                </Box> */}
      </Box>
      <Box className={classes.root}>
        <CardInfoList
          data={[
            {
              date: convertDate(detailCommunities?.created_at),
              des: detailCommunities.announcement,
            },
          ]}
          disableButtonMore={detailCommunities?.status_admin == 1 ? true : false}
          handleSaveInfoNew={handleSaveInfoNew}
        />
      </Box>
      <Box className={classes.root}>
        <CardActivityList
          commuCode={commuCode}
          data={renderActivityList()}
          disableButtonMore={detailCommunities?.status_admin == 1 ? true : false}
        />
      </Box>
      <Link
        onClick={() =>
          router.push({ pathname: `/community/${commuCode}/member-rank-list` })
        }
      >
        <ButtonProps
          titlebutton="อันดับสมาชิก"
          background="linear-gradient(to bottom, #68D5E5, #674EEF)"
          borderradiusbtn="10px"
          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
          heightbtn="46px"
          fontsizebtn="26px"
        />
      </Link>
      <Box className={classes.betweenBtn} />
      {detailCommunities?.status_admin == 1 && (
        <Link
          onClick={() =>
            router.push({ pathname: `/community/${commuCode}/add-group-table` })
          }
        >
          <ButtonProps
            titlebutton="เชิญ / รับ เพื่อนเข้ากลุ่ม"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn="10px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="46px"
            fontsizebtn="26px"
          />
        </Link>
      )}
    </InnerLayout>
  );
};

export default CommunityPage;
