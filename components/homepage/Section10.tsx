import {
  Container,
  Grid,
  makeStyles,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  section: {
    position: "relative",
    "& h2": {
      fontSize: 50,
      lineHeight: "67px",
      textAlign: "center",
      marginBottom: 0,
    },
  },
  logoBig: {
    maxHeight: "100%",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "100%",
    },
  },
  logoSmall: {
    borderRadius: '50px',
    maxHeight: "100%",
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "100%",
    },
  },
  boxBig: {
    width: "100%",
    height: "220px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.16)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "120px",
    },
  },
  boxSmall: {
    width: "100%",
    height: "160px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.16)",
    borderRadius: '12px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      height: "100px",
    },
  },
}));

const Data = [
  // { id: 1, img: "/images/s1_b.jpeg" },
  // { id: 2, img: "/images/s2_b.jpeg" },
  // { id: 3, img: "/images/s3_b.jpeg" },
  { id: 4, img: "/images/logo-smal-1.jpg" },
  { id: 5, img: "/images/logo-smal-2.jpg" },
  { id: 6, img: "/images/logo-smal-3.jpg" },
  { id: 7, img: "/images/logo-smal-4.jpg" },
  { id: 8, img: "/images/logo-smal-5.jpg" },
  { id: 9, img: "/images/logo-smal-6.jpeg" },
  { id: 10, img: "/images/logo-smal-7.jpeg" },
];

const Section10 = () => {
  const classes = useStyles();
  const isXS = useMediaQuery((theme: any) => theme.breakpoints.down("xs"));
  // let limit = [3, 9];
  // if (isXS) {
  //   limit = [2, 6];
  // }
  const ShowData = () => {
    return Data.map((item: any) => {
      if (isXS) {
        return (
          <Grid item xs={6} md={6} sm={6}>
            <Paper className={classes.boxSmall}>
              <img src={`${prefix}${item.img}`} className={classes.logoSmall} />
            </Paper>
          </Grid>
        )
      }
      return (
        <Grid item xs={6} md={2} sm={2}>
          <Paper className={classes.boxSmall}>
            <img src={`${prefix}${item.img}`} className={classes.logoSmall} />
          </Paper>
        </Grid>
      )
    });
  };
  return (
    <section className={classes.section}>
      <Container>
        <Grid container spacing={2}>
          {ShowData()}
        </Grid>
        {/* {isXS ? (
          <Grid container spacing={2}>
            {ShowData()}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {ShowData()}
          </Grid>
        )} */}
      </Container>
    </section>
  );
};

export default Section10;
