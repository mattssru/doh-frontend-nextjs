import {
  Box,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { CardGroup, ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconPlus, IconSearch } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import React, { useEffect } from "react";
// import prefix from "utils/path";
import { useDispatch, useSelector } from "react-redux";
import { CommunitiesAction } from "stores/communities/communities.action";
import { ActionSaga } from "services/action.saga";
import { IStates } from "stores/root.reducer";
import Router from "next/router";
import router from "next/router";
import prefix from "utils/path";

const useStyles = makeStyles(() => ({
  root: {},
  tabsGroup: {
    marginTop: 20,
    "& .MuiTabs-root": {
      marginBottom: 25,
      boxShadow: "none",
      overflow: "unset",
    },
    "& .MuiTab-root": {
      boxShadow: `0px 3px 5px rgba(0,0,0,0.16)`,
      borderRadius: 5,
      backgroundColor: `#fff`,
      opacity: 1,
      color: `#AAAAAA`,
      fontSize: 20,
      fontFamily: "DBHeavent_BoldCond",
      lineHeight: `25px`,
      height: 40,
      minHeight: "inherit",
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
  },
  textBottom: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    lineHeight: "24px",
    width: "100%",
    fontFamily: "DBHeavent_MedCond",
    marginTop: 25,
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
//     visionOfficial: "true",
//   },
//   {
//     image: `${prefix}/images/group.jpeg`,
//     topic: "THAI RUN",
//     member: "500",
//     calorie: "18,945,890",
//     visionOfficial: "true",
//   },
// ];

const GroupPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { fetchCountGroup, tabGroup1, tabGroup2, tabGroup3, tabGroup4 } =
    useSelector((state: IStates) => state.communitiesReducer);
  // const { token: tokenStore } = useSelector(
  //   (state: IStates) => state.authenReducer
  // );

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  const hundleClickSearch = () => {
    Router.push("/community/search-group");
  };

  const hundleClickCard = (item: any) => {
    console.log("item", item);
    router.push({ pathname: `/community/${item}` });
  };

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      console.log('have profile')
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_COUNT_GROUP_R,
          // payload: tokenStore,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_TAB_GROUP_R,
          // payload: tokenStore,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_TAB_GROUP2_R,
          // payload: tokenStore,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_TAB_GROUP3_R,
          // payload: tokenStore,
        })
      );
      dispatch(
        ActionSaga({
          type: CommunitiesAction.FETCH_TAB_GROUP4_R,
          // payload: tokenStore,
        })
      );
    }
  }, [profile]);

  const renderBtnCreate = () => {
    if (fetchCountGroup) {
      if (fetchCountGroup.CountGroup > 0) {
        return (
          <ButtonProps
            titlebutton="สร้างกลุ่ม"
            backgroundcolorbtn="#E96189"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            maxwidthbtn="173px"
            heightbtn="40px"
            fontsizebtn="22px"
            startIcon={<IconPlus />}
            onClick={() => router.push('/community/create-group')}
          />
        );
      } else {
        return <></>;
      }
    }
  };

  return (
    <InnerLayout titlepage="กลุ่ม">
      <Box className={classes.root}>
        <ControlButton alignitems="flex-end">
          <ButtonProps
            titlebutton="ค้นหากลุ่ม"
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            maxwidthbtn="173px"
            heightbtn="40px"
            fontsizebtn="22px"
            startIcon={<IconSearch />}
            onClick={hundleClickSearch}
          />
          {renderBtnCreate()}
        </ControlButton>
        <Box className={classes.tabsGroup}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="ชุมชน" {...a11yProps(0)} />
            <Tab label="โรงเรียน" {...a11yProps(1)} />
            <Tab label="องค์กร" {...a11yProps(2)} />
            <Tab label="สาธารณสุข" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid container spacing={3}>
              {tabGroup1?.map((item: any, index: number) => {
                return (
                  <Grid item sm={4} xs={12} key={index}>
                    <CardGroup
                      image={item.thumbnail || `${prefix}/images/logo_print.svg`}
                      topic={item.name}
                      member={item.total_member}
                      calorie={item.total_calories}
                      visionOfficial={item.official == 1 ? true : false}
                      onClickBox={() => hundleClickCard(item.commu_code)}
                    // visionButton
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Typography variant="body1" className={classes.textBottom}>
              **ท่านสามารถเข้าร่วมกลุ่มได้อีก {fetchCountGroup.CountGroup} กลุ่ม
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={3}>
              {tabGroup2?.map((item: any, index: number) => {
                return (
                  <Grid item sm={4} xs={12} key={index}>
                    <CardGroup
                      image={item.thumbnail || `${prefix}/images/logo_print.svg`}
                      topic={item.name}
                      member={item.total_member}
                      calorie={item.total_calories}
                      visionOfficial={item.official == 1 ? true : false}
                      onClickBox={() => hundleClickCard(item.commu_code)}
                    // visionButton
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Typography variant="body1" className={classes.textBottom}>
              **ท่านสามารถเข้าร่วมกลุ่มได้อีก {fetchCountGroup.CountGroup} กลุ่ม
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={3}>
              {tabGroup3?.map((item: any, index: number) => {
                return (
                  <Grid item sm={4} xs={12} key={index}>
                    <CardGroup
                      image={item.thumbnail || `${prefix}/images/logo_print.svg`}
                      topic={item.name}
                      member={item.total_member}
                      calorie={item.total_calories}
                      visionOfficial={item.official == 1 ? true : false}
                      onClickBox={() => hundleClickCard(item.commu_code)}
                    // visionButton
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Typography variant="body1" className={classes.textBottom}>
              **ท่านสามารถเข้าร่วมกลุ่มได้อีก {fetchCountGroup.CountGroup} กลุ่ม
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container spacing={3}>
              {tabGroup4?.map((item: any, index: number) => {
                return (
                  <Grid item sm={4} xs={12} key={index}>
                    <CardGroup
                      image={item.thumbnail || `${prefix}/images/logo_print.svg`}
                      topic={item.name}
                      member={item.total_member}
                      calorie={item.total_calories}
                      visionOfficial={item.official == 1 ? true : false}
                      onClickBox={() => hundleClickCard(item.commu_code)}
                    // visionButton
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Typography variant="body1" className={classes.textBottom}>
              **ท่านสามารถเข้าร่วมกลุ่มได้อีก {fetchCountGroup.CountGroup} กลุ่ม
            </Typography>
          </TabPanel>
        </Box>
      </Box>
    </InnerLayout>
  );
};

export default GroupPage;
