import { Box, Grid, makeStyles } from "@material-ui/core";
import { CardNewList } from "components/common";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import PaginationCustom from "components/PaginationCustom";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionReducer } from "services/action.reducer";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { IStates } from "stores/root.reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    borderRadius: 5,
    backgroundColor: "#fff",
    // maxWidth: 800,
    // margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 15px",
    },
  },
  listNews: {
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
  },
}));


const NewsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.ANAMAI_LIST_R,
        payload: { take: 9, page: page }
      })
    )
  }, [])
  const { anamaiList } = useSelector((state: IStates) => state.homeReducer);

  const handleChagePage = (page: number) => {
    dispatch(
      ActionSaga({
        type: HomeAction.ANAMAI_LIST_R,
        payload: { take: 9, page: page }
      })
    )
    setPage(page)
  }
  const clickRead = (slug: string) => {
    dispatch(
      ActionReducer({
        type: HomeAction.CLICK_NEWS_R,
        payload: { slug: slug }
      })
    )
    router.push({ pathname: `detail/${slug}` })
  }
  return (
    <InnerLayout titlepage="ข่าวสารจากกรมอนามัย">
      <Box className={classes.root}>
        <Box className={classes.listNews}>
          <Grid container spacing={3}>
            {anamaiList.records &&
              anamaiList.records.map((item: any, index: number) => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={index}
                    onClick={() => clickRead(item.slug)}
                  >
                    <CardNewList
                      image={item.thumbnail}
                      date={item.date}
                      title={item.title}
                      des={item.desc}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </Box>
        <PaginationCustom
          count={anamaiList.total_page}
          boundaryCount={1}
          siblingCount={0}
          onChangePage={handleChagePage}
        />
      </Box>
    </InnerLayout>
  );
};

export default NewsList;
