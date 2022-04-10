import { Box, Grid, makeStyles } from "@material-ui/core";
import { CardKnowledgeHealth } from "components/common";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import PaginationCustom from "components/PaginationCustom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  listKnowledge: {
    marginBottom: 50,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
  },
}));

const KnowledgeHealth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.HEALTH_LIST_R,
        payload: { take: 9, page: page }
      })
    )
  }, [])
  const { healthList } = useSelector((state: IStates) => state.homeReducer);
  const handleChagePage = (page: number) => {
    dispatch(
      ActionSaga({
        type: HomeAction.HEALTH_LIST_R,
        payload: { take: 9, page: page }
      })
    )
    setPage(page)
  }

  return (
    <InnerLayout titlepage="รอบรู้แลกแต้มสุขภาพ">
      <Box className={classes.root}>
        <Box className={classes.listKnowledge}>
          <Grid container spacing={3}>
            {healthList.records && (
              healthList.records.map((item: any, index: number) => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={index} >
                    <CardKnowledgeHealth
                      slug={item.slug}
                      link={item.external_link}
                      image={item.thumbnail}
                      title={item.title}
                      des={item.desc}
                    />

                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
        <PaginationCustom
          count={healthList.total_page}
          boundaryCount={1}
          siblingCount={0}
          onChangePage={handleChagePage}
        />
      </Box>
    </InnerLayout>
  );
};

export default KnowledgeHealth;
