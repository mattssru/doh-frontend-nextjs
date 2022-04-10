import {
  Box,
  Container,
  Grid,
  // Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ButtonProps } from "components/common/button";
import { IconReport } from "components/common/icon";
import React from "react";
import prefix from "utils/path";

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.bgFooterLeft}>
        <img src={`${prefix}/images/bg_footer_left.png`} alt="" />
      </Box>
      <Box className={classes.bgFooterRight}>
        <img src={`${prefix}/images/bg_footer_right.png`} alt="" />
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.logoFooter}>
          <img src={`${prefix}/images/logo_footer.png`} alt="" />
          <Box className={classes.addressFooter}>
            <Typography variant="h2">กรมอนามัย</Typography>
            <img src={`${prefix}/images/ic_pin.svg`} alt="" />
            <span>88/22 ม.4 ต.ตลาดขวัญ ถ.ติวานนท์ อ.เมือง จ.นนทบุรี 11000</span>
          </Box>
        </Box>
        <Box className={classes.bottomFotter}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              {/* <Box className={classes.tel}>
                <Typography component="p">โทรศัพท์</Typography>
                <Link href="tel:025904000">02 590 4000</Link>
              </Box> */}
              {/* <Link
                href="mailto:mailmaster@anamai.mail.go.th"
                className={classes.email}
              >
                mailmaster@anamai.mail.go.th
              </Link> */}
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={classes.btnCenter}>
                <ButtonProps
                  titlebutton="แจ้งปัญหาการใช้งาน"
                  background="linear-gradient(to bottom, #95B12D, #C7F240)"
                  borderradiusbtn="5px"
                  boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                  maxwidthbtn="261px"
                  marginbtn="15px 0 15px auto"
                  fontsizebtn="26px"
                  fontFamily="DBHeavent_Cond"
                  startIcon={<IconReport />}
                  onClick={()=> window.open('https://docs.google.com/forms/d/e/1FAIpQLSffg5PnRSZjdwXaknhIH0Blce7YusOAo9kRPx4SbX4Wvh3m-w/viewform', '_blank')}
                />
              </Box>
              {/* <Box className={classes.followsUs}>
                <Typography component="p">Follows us</Typography>
                <Box className={classes.listSocial}>
                  <Link href="/" className={classes.btnSocial}>
                    <img src={`${prefix}/images/ic_facebook.svg`} alt="" />
                  </Link>
                  <Link href="/" className={classes.btnSocial}>
                    <img src={`${prefix}/images/ic_line.svg`} alt="" />
                  </Link>
                  <Link href="/" className={classes.btnSocial}>
                    <img src={`${prefix}/images/ic_youtube.svg`} alt="" />
                  </Link>
                  <Link href="/" className={classes.btnSocial}>
                    <img src={`${prefix}/images/ic_ins.svg`} alt="" />
                  </Link>
                  <Link href="/" className={classes.btnSocial}>
                    <img src={`${prefix}/images/ic_twi.svg`} alt="" />
                  </Link>
                </Box>
              </Box> */}
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.copyRight}>
          Copyright 2020 Department of Health : Ministry of Public Health
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundImage: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    minHeight: 430,
    padding: "35px 0 60px 0",
    position: "relative",
  },
  logoFooter: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 30,
    },
    "& > img": {
      maxHeight: 94,
      marginRight: 25,
    },
  },
  addressFooter: {
    color: "#fff",
    "& h2": {
      fontSize: 50,
      lineHeight: "50px",
      fontFamily: "DBHeavent_MedCond",
    },
    "& span": {
      fontSize: 22,
      lineHeight: "20px",
      maxWidth: 200,
      display: "inline-block",
    },
    "& img": {
      position: "relative",
      verticalAlign: "top",
      paddingRight: 13,
    },
  },
  bottomFotter: {
    borderBottom: "1px solid #D0D0D0",
    paddingBottom: 30,
    marginBottom: 20,
  },
  tel: {
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 20,
    },
    "& p": {
      color: "#fff",
      fontSize: 22,
      lineHeight: "22px",
      fontFamily: "DBHeavent_MedCond",
    },
    "& a": {
      color: "#D0FD08",
      fontSize: 50,
      lineHeight: "50px",
      fontFamily: "DBHeavent_MedCond",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  email: {
    fontSize: 50,
    lineHeight: "40px",
    color: "#D0FD08",
    display: "inline-block",
    letterSpacing: 2,
    fontFamily: "DBHeavent_BoldCond",
    borderBottom: "1px solid #D0FD08",
    [theme.breakpoints.down("sm")]: {
      fontSize: 38,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
      color: "#fff",
      borderColor: "#fff",
      lineHeight: "30px",
    },
    "&:hover": {
      color: "#fff",
    },
  },
  copyRight: {
    textAlign: "right",
    color: "#fff",
    fontSize: 25,
    lineHeight: "20px",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      lineHeight: "30px",
    },
  },
  followsUs: {
    maxWidth: 260,
    width: "100%",
    marginLeft: "auto",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
    },
    "& p": {
      color: "#fff",
      fontSize: 24,
      lineHeight: "25px",
      marginBottom: 10,
    },
  },
  listSocial: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnSocial: {
    width: 38,
    height: 38,
    borderRadius: "100%",
    backgroundColor: "transparent",
    border: "1px solid #FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease-in",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover",
    },
    "&:hover": {
      background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
      transition: "all 0.2s ease-in",
    },
  },
  bgFooterLeft: {
    position: "absolute",
    left: 0,
    bottom: 0,
    lineHeight: 0,
    [theme.breakpoints.down("xs")]: {},
    "& img": {
      maxHeight: "100%",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 90,
      },
    },
  },
  bgFooterRight: {
    position: "absolute",
    top: "-20vh",
    right: 0,
    lineHeight: 0,
    [theme.breakpoints.down("xs")]: {
      top: "-9vh",
    },
    "& img": {
      maxHeight: "100%",
      [theme.breakpoints.down("xs")]: {
        maxHeight: 137,
      },
    },
  },
  btnCenter: {
    "& button": {
      [theme.breakpoints.down("xs")]: {
        margin: "0 auto 25px",
      },
    },
  },
}));
