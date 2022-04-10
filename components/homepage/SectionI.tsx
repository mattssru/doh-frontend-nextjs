import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CardThumnail } from "components/common";
import { ButtonProps } from "components/common/button";
import router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionReducer } from "services/action.reducer";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { IStates } from "stores/root.reducer";
// import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 45,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
    "& h2": {
      fontSize: 50,
      lineHeight: "60px",
      textAlign: "center",
      marginBottom: 15,
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
        lineHeight: "40px",
      },
    },
  },
  thumnail: {
    marginBottom: 30,
    "& button": {
      textDirection: "underline",
    },
    [theme.breakpoints.down(600)]: {
      "& .MuiGrid-item:last-child": {
        // visibility: "hidden",
        display: "none",
      },
    },
  },
}));

const SectionI = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.ANAMAI_LIST_R,
        payload: { take: 3, page: 1 },
      })
    );
  }, []);

  const clickRead = (slug: string) => {
    dispatch(
      ActionReducer({
        type: HomeAction.CLICK_NEWS_R,
        payload: { slug: slug },
      })
    );
    router.push({ pathname: `news/detail/${slug}` });
  };

  const { anamaiList } = useSelector((state: IStates) => state.homeReducer);
  const renderNews = (dataList: string[]) => {
    if (dataList?.length > 0) {
      return (
        <>
          {dataList?.map((item: any, _key: number) => (
            <Grid
              item
              sm={4}
              xs={12}
              key={_key}
              onClick={() => clickRead(item.slug)}
            >
              <CardThumnail
                image={item.thumbnail}
                title={item.title}
                des={item.desc}
                slug={item.slug}
              />
            </Grid>
          ))}
        </>
      );
    }
  };
  return (
    <section>
      <Container maxWidth="lg">
        <Box className={classes.root}>
          <Typography variant="h2">ข่าวสารกรมอนามัย</Typography>
          <Box className={classes.thumnail}>
            <Grid container spacing={5}>
              {renderNews(anamaiList.records)}
            </Grid>
          </Box>
          <ButtonProps
            titlebutton="ดูเพิ่มเติม"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn=" 5px 10px 10px 10px"
            heightbtn="40px"
            maxwidthbtn="167px"
            fontsizebtn="22px"
            marginbtn="0 auto"
            onClick={() => router.push({ pathname: "news/news-list" })}
          />
        </Box>
      </Container>
    </section>
  );
};

export default SectionI;
