import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { CardGroup, SelectFixd, TextFieldFixd } from "components/common";
import HeadlineInsitePage from "components/common/HeadlineInsitePage";
import BtnCenter from "components/common/BtnCenter";
import dynamic from "next/dynamic";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import React, { useEffect } from "react";
// import prefix from "utils/path";
import { useDispatch, useSelector } from "react-redux";
import { CommunitiesAction } from "stores/communities/communities.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";
const PopupModal = dynamic(import("components/PopupModal"));

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 15px",
    borderRadius: 5,
    marginBottom: 20,
    "& h3": {
      fontSize: 30,
      lineHeight: "36px",
      textAlign: "center",
      marginBottom: 15,
    },
  },
  rootIn: {
    maxWidth: 400,
    margin: "0 auto",
  },
  listGroup: {},
  textBottom: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    width: "100%",
    fontFamily: "DBHeavent_MedCond",
    marginTop: 25,
  },
  controlModal: {
    "& .MuiCard-root": {
      marginBottom: `70px`,
      width: "167px",
    },
  },
}));

// const datalistGroup = [
//   {
//     image: `${prefix}/images/group.jpeg`,
//     topic: "ก้าวคนละก้าว",
//     member: "500",
//     calorie: "18,945,890",
//     visionOfficial: "true",
//   },
//   {
//     image: `${prefix}/images/group.jpeg`,
//     topic: "THAI RUN",
//     member: "500",
//     calorie: "18,945,890",
//   },
//   {
//     image: `${prefix}/images/group.jpeg`,
//     topic: "THAI RUN",
//     member: "500",
//     calorie: "18,945,890",
//   },
// ];

const SearchGroup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValue] = React.useState({
    commu_type: "",
    commu_code: "",
  });
  const [isModal, setIsModal] = React.useState(false);
  const [valueModel, setValueModel] = React.useState("");

  const { listCommunitiesType, listSearchCommunities, fetchCountGroup } =
    useSelector((state: IStates) => state.communitiesReducer);
  const { token: tokenStore } = useSelector(
    (state: IStates) => state.authenReducer
  );

  const handleJoinGroup = (commuCode: any) => {
    console.log("commuCode", commuCode);
    if (fetchCountGroup.CountGroup >= 1) {
      setIsModal(true);
      // dispatch(communities.actions.fetchCommunitiesByCode(commuCode));
      // dispatch(communities.actions.setCommuCode(commuCode));
      // dispatch(communities.actions.setIsModal(true));
      // dispatch(communities.actions.fetchCountGroup());
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_COUNT_GROUP_R,
          payload: tokenStore,
        })
      );
      setValueModel(commuCode);
    }
  };

  const handleJoinGroupConfirm = () => {
    const valueInput = {
      data: valueModel,
      values: values,
    };
    dispatch(
      ActionSaga({
        type: CommunitiesAction.INSERT_COMMUNITIES_INVITE_R,
        payload: { valueInput: valueInput, tokenStore: tokenStore },
      })
    );
    // dispatch(
    //   communities.actions.insertCommunitiesInvite({ commuCode, values })
    // );
    setIsModal(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_SEARCH_COMMUNITIES_R,
        payload: values,
      })
    );
  };

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_COUNT_GROUP_R,
        payload: tokenStore,
      })
    );
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_COMMUNITIES_R,
      })
    );
  }, []);

  const handleInputChange = (e: any) => {
    console.log("e", e.target.value);
    setValue({ ...values, [e.target.id]: e.target.value });
  };

  const renderCommunitiesType = () => {
    if (listCommunitiesType !== undefined && listCommunitiesType.length > 0) {
      return listCommunitiesType.map((item: any, key: any) => {
        return (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        );
      });
    } else {
      return [];
    }
  };
  return (
    <InnerLayout titlepage="กลุ่ม">
      <Box className={classes.root}>
        <Box className={classes.rootIn}>
          <Typography variant="h3">ค้นหากลุ่ม</Typography>
          <SelectFixd
            id="commu_type"
            label="เลือกประเภทกลุ่ม"
            margin="0 0 15px 0"
            value={values.commu_type}
            onChange={handleInputChange}
          >
            <option value="">กรุณาเลือกประเภทกลุ่ม</option>
            {renderCommunitiesType()}
          </SelectFixd>
          <TextFieldFixd
            id="commu_code"
            label="ชื่อกลุ่ม/รหัสกลุ่ม"
            placeholder="กรอกรหัสกลุ่ม"
            value={values.commu_code}
            onChange={handleInputChange}
          />
          <ButtonProps
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            titlebutton="ค้นหา"
            heightbtn="40px"
            borderradiusbtn="5px"
            maxwidthbtn="167px"
            marginbtn="30px auto 0"
            fontsizebtn="22px"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
      <Box className={classes.listGroup}>
        <Grid container spacing={3}>
          {listSearchCommunities.map((item: any, index: number) => {
            return (
              <Grid item sm={4} xs={12} key={index}>
                {/* <CardGroup
                  image={item.image}
                  topic={item.topic}
                  member={item.member}
                  calorie={item.calorie}
                  visionOfficial={item.visionOfficial}
                  visionButton
                /> */}
                <CardGroup
                  image={item.thumbnail || `${prefix}/images/logo_print.svg`}
                  topic={item.name}
                  member={item.total_member}
                  calorie={item.total_calories}
                  visionOfficial={item.official == 1 ? true : false}
                  visionButton={item.status == 0 ? true : false}
                  visionStatus={item.status == 1 ? true : false}
                  onClickButton={() => handleJoinGroup(item.commu_code)}
                />
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="body1" className={classes.textBottom}>
          **ท่านสามารถเข้าร่วมกลุ่มได้อีก {fetchCountGroup.CountGroup} กลุ่ม
        </Typography>
      </Box>
      <PopupModal isOpen={isModal} handleClose={() => setIsModal(false)}>
        <Box className={classes.controlModal}>
          <HeadlineInsitePage
            titleInsite="ยืนยันการเข้ากลุ่ม"
            colortheme="primary"
            varianttypography="h2"
          />
          {/* {renderModalJoinGroup()} */}
          <BtnCenter>
            <ButtonProps
              borderbtn="1px solid #FFB100"
              titlebutton="ยกเลิก"
              colorbtn="#FFB100"
              backgroundcolorbtn="#fff"
              borderradiusbtn="5px"
              backgroundhoverbtn="#FFB100"
              colorhoverbtn="#fff"
              heightbtn="40px"
              maxwidthbtn="167px"
              fontsizebtn="22px"
              onClick={() => setIsModal(false)}
            />
            {/* <ButtonProps
              backgroundcolorbtn="#FFB100"
              titlebutton="ตกลง"
              borderradiusbtn="30px"
              // onClick={handleJoinGroupConfirm}
            /> */}
            <ButtonProps
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              titlebutton="ตกลง"
              heightbtn="40px"
              borderradiusbtn="5px"
              maxwidthbtn="167px"
              marginbtn="30px auto 0"
              fontsizebtn="22px"
              onClick={handleJoinGroupConfirm}
            />
          </BtnCenter>
        </Box>
      </PopupModal>
    </InnerLayout>
  );
};

export default SearchGroup;
