import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { ProfileAction } from "stores/profile/profile.action";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: 30,
    background: "#f5f5f5",
    position: "relative",
    padding: "25px 0px 30px 0",
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
  showBox: {
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 25,
    },
  },
  boxWrap: {
    // padding: "12px",
    [theme.breakpoints.down("xs")]: {
      // padding: "2px",
    },
  },
  imgData: {
    cursor: 'pointer',
    width: "100%",
    maxHeight: '170px',
    objectFit: 'cover',
    // overflow: 'hidden',
    [theme.breakpoints.down("xs")]: {
      padding: "0px 5px",
    },
  },


  card: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "0",
    [theme.breakpoints.down("xs")]: {
      padding: "0",
      height: "100%",
    },
  },
  cardContent: {
    padding: "0",
    paddingBottom: "10px",
    cursor: 'pointer',

    height: "60px",
    [theme.breakpoints.down("xs")]: {
      height: "50px",
    },
  },
  cardAction: {
    height: "20%",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      height: "20^",
      padding: 0,
    },
  },
  title: {
    paddingTop: "5px",
    fontSize: "32px",
    lineHeight: "30px",
    color: "#263843",
    [theme.breakpoints.down("xs")]: {
      padding: "3px 10px",
      fontSize: "20px",
      lineHeight: "28px",
    },
  },
  readMoreBtn: {
    background: "#E96189",
    cursor: 'pointer',
    color: "white",
    width: "77px",
    height: "28px",
    fontSize: "20px",
    textDecoration: "underline",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "10px",
    },
    "&:hover": {
      background: "#922847",
      textDecoration: "underline",
    },
  },
  readIcon: {
    width: "15px",
    marginLeft: "5px",
  },
  center: {
    marginTop: "10px",
    textAlign: `center`,
    display: `flex`,
    "& .MuiButton-root": {
      maxWidth: `180px`,
      margin: `0 auto`,
    },
  },
  moreBtn: {
    fontSize: "22px",
    background:
      "linear-gradient(180deg, rgba(208,253,8,1) 0%, rgba(140,165,16,1) 100%)",
    color: "white",
    height: "40px",
    width: "170px",
  },
}));

const Section9 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.HEALTH_LIST_R,
        payload: { take: 4, page: 1 }
      })
    )
  }, [])
  const { healthList } = useSelector((state: IStates) => state.homeReducer);
  const clickRead = (slug: string, url: string) => {
    dispatch(
      ActionSaga({
        type: HomeAction.CLICK_NEWS_R,
        payload: { slug: slug },
        onSuccess: () => {
          dispatch(
            ActionSaga({
              type: ProfileAction.PROFILE_R,
            })
          );
        }
      })
    )
    window.open(url, '_blank');
  }
  const renderNews = (dataList: string[]) => {
    if (dataList?.length > 0) {
      return dataList.map((item: any, _key: number) => {
        return (
          <Grid
            key={item.id}
            item
            xs={12}
            md={3}
            sm={4}
            container
            className={classes.boxWrap}
          >
            <Grid item xs={5} sm={12}>
              <img src={item.thumbnail} className={classes.imgData} onClick={() => clickRead(item.slug, item.external_link)} />
            </Grid>
            <Grid item xs={7} sm={12}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <p className={classes.title} onClick={() => clickRead(item.slug, item.external_link)}
                  >{item.title}</p>
                </CardContent>
                <CardActions className={classes.cardAction}>
                  <Button className={classes.readMoreBtn} onClick={() => clickRead(item.slug, item.external_link)}>
                    อ่านต่อ{" "}
                    <img
                      src={`${prefix}/icons/arrow-right-circle.png`}
                      className={classes.readIcon}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid >
        )
      })
    }
  }

  return (
    <section className={classes.section}>
      <Container>
        <Typography variant="h2">รอบรู้สุขภาพ</Typography>
        <Grid container className={classes.showBox} spacing={3}>
          {/* {ShowData()} */}
          {renderNews(healthList.records)}
        </Grid>
        <Grid className={classes.center}>
          <Button className={classes.moreBtn} onClick={() => router.push({ pathname: '/news/knowledge-health' })}>ดูเพิ่มเติม</Button>
        </Grid>
      </Container>
    </section>
  );
};

export default Section9;
