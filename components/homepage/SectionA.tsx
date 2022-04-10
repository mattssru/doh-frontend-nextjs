import {
  Box,
  Container,
  Grid,
  Hidden,
  // LinearProgress,
  Link,
  makeStyles,
  Typography
} from "@material-ui/core";
import { ControlButton, ModalDefault } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconUser, IconUserAdd } from "components/common/icon";
import router from "next/router";
import React, { useEffect, useState } from "react";
import QRCode from 'react-qr-code';
import { useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";

const useStyles = makeStyles((theme: any) => ({
  level: {
    fontSize: 30,
    lineHeight: "24px",
    color: "#000",
    marginBottom: 15,
    cursor: 'pointer',
    [theme.breakpoints.down("xs")]: {
      fontSize: 19,
      marginBottom: 5,
    },
    "& span": {
      fontSize: 50,
      lineHeight: "30px",
      color: "#E96189",
      position: "relative",
      top: 5,
      marginLeft: 6,
      [theme.breakpoints.down("xs")]: {
        fontSize: 35,
        lineHeight: "16px",
      },
    },
  },
  imageProfile: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    backgroundColor: 'white',
    borderRadius: 10,
    width: 105,
    height: 105,
    cursor: 'pointer',
    [theme.breakpoints.down("xs")]: {
      width: 78,
      height: 78,
    },
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
      fontSize: 30,
      lineHeight: "30px",
      color: "#000",
      marginBottom: 8,
      [theme.breakpoints.down("xs")]: {
        fontSize: 18,
        marginBottom: 0,
        lineHeight: "20px",
      },

      "& span": {
        fontSize: 30,
        lineHeight: "30px",
        fontFamily: "DBHeavent_Cond",
        [theme.breakpoints.down("xs")]: {
          fontSize: 18,
          lineHeight: "20px",
        },
      },
    },
    "& h2": {
      fontSize: 42,
      lineHeight: "44px",
      marginBottom: 10,
      [theme.breakpoints.down("xs")]: {
        fontSize: 32,
        lineHeight: "30px",
        marginBottom: 5,
      },
    },
  },
  resultProfile: {},
  rankBmi: {
    paddingRight: 20,
    marginRight: 20,
    borderRight: "1px solid #D3D3D3",
    [theme.breakpoints.down("sm")]: {
      paddingRight: 15,
      marginRight: 15,
    },
    "&:last-child": {
      borderRight: "none",
    },
    "& p": {
      fontSize: 20,
      lineHeight: "20px",
      color: "#000",
      [theme.breakpoints.down("xs")]: {
        fontSize: 19,
      },
      "&:nth-child(2)": {
        fontSize: 50,
        lineHeight: "42px",
        color: "#E96189",
        display: "inline-block",
        "&:hover": {
          color: "#2F8EDE",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: 44,
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: 35,
          lineHeight: "30px",
        },
      },
    },
    "& span": {
      display: "inline-block",
      fontSize: 20,
      color: "#000",
    },
  },
  result: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {},
  },
  controlBtn: {
    marginTop: 15,
    "& button": {
      maxWidth: "100%",
    },
  },
  center: {
    margin: '20px',
    textAlign: 'center',
    width: '300px',
    "& button": {
      background: "linear-gradient(to top, #8CA51E, #D0FD08)"
    },
    [theme.breakpoints.down('xs')]: {
      width: '250px',
    },
    "& h3": {
      color: "#70B642",
      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
    },
    "& .MuiTypography-body1": {

      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
      fontWeight: 'bold',
      color: 'black',
    },
  },
}));

const SectionA = () => {
  const classes = useStyles();
  const { profile, bmiList } = useSelector((state: IStates) => state.profileReducer);
  const [openDialog, setOpenDialog] = React.useState(false);
  // const { myRank } = useSelector((state: IStates) => state.homeReducer);
  const public_host = process.env.NEXT_PUBLIC_API_AUTHEN_HOST;
  const [copy, setCopy] = useState(false)
  const CloseDialog = () => {
    setOpenDialog(false);
    setCopy(false)
  }
  const {
    isInvite
  } = router.query
  const Invite = () => {
    setOpenDialog(true);
  }
  const ClicKCopy = () => {
    navigator.clipboard.writeText(`${public_host}/register/?ebib_code=${profile.ebib_code}`)
    setCopy(true)
  }
  useEffect(() => {
    if (isInvite === 'true') {
      setOpenDialog(true);
    }
  }, [])
  return (
    <section style={{ marginBottom: 30, zIndex: 1, position: "relative" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item sm={2} xs={3}>
            <Typography variant="h3" className={classes.level}
              onClick={() => router.push('level')}
            >
              LEVEL
              <span>{profile?.level}</span>
              {/* <span>-</span> */}
            </Typography>
            <Box className={classes.imageProfile}
              onClick={() => router.push('level')}
            >
              {/* <img src={`${prefix}/level/lv0.svg`} alt="" /> */}
              <img src={`${prefix}/level/lv${profile?.level || 0}.svg`} alt="" />
            </Box>
          </Grid>
          <Grid item sm={10} xs={9}>
            <Box className={classes.detailProfile}>
              <Typography variant="h3">
                Ebib :&nbsp;<span>{profile.ebib_code}</span>
              </Typography>
              <Typography variant="h2">{profile.first_name} {profile.last_name}</Typography>
              <Box className={classes.resultProfile}>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={5} sm={6} xs={12}>
                    <Box className={classes.result}>
                      <Link className={classes.rankBmi}
                      // onClick={() => router.push('/rank')}
                      >
                        <p>อันดับ (RANK)</p>
                        {(profile?.user_ranking !== undefined && profile?.user_ranking?.rank_user) ?
                          <p>{profile?.user_ranking.rank_user}</p>
                          :
                          '-'
                        }
                        {/* {myRank.personal !== undefined ?
                          <p>{myRank?.personal}</p>
                          :
                          <>
                            <br />
                            <LinearProgress color="secondary" />
                          </>
                        } */}
                        {/* {Object.keys(myRank).length ?
                          <p>{myRank?.personal}</p>
                          :
                          <>
                            <br />
                            <LinearProgress color="secondary" />
                          </>
                        } */}


                      </Link>
                      <Link className={classes.rankBmi}
                        onClick={() => router.push('/bmi')}
                      >
                        <p>ดัชนีมวลกาย (BMI)</p>
                        <p>{bmiList.length > 0 ? bmiList[0].bmi : ''}</p>
                        <span>= {bmiList.length > 0 ? bmiList[0].bmiStatus : ''}</span>
                      </Link>
                    </Box>
                  </Grid>
                  <Hidden xsDown>
                    <Grid item lg={8} md={7} sm={6} xs={12}>
                      <ControlButton alignitems="flex-end">
                        <ButtonProps
                          titlebutton="กลุ่ม"
                          background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                          borderradiusbtn="10px"
                          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                          maxwidthbtn="173px"
                          heightbtn="46px"
                          fontsizebtn="26px"
                          startIcon={<IconUser />}
                          onClick={() => router.push({ pathname: '/community' })}
                        />
                        <ButtonProps
                          titlebutton="เชิญเพื่อน"
                          background="linear-gradient(to top, #8CA51E, #D0FD08)"
                          borderradiusbtn="10px"
                          boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                          maxwidthbtn="173px"
                          heightbtn="46px"
                          fontsizebtn="26px"
                          startIcon={<IconUserAdd />}
                          onClick={Invite}
                        />
                      </ControlButton>
                    </Grid>
                  </Hidden>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Hidden smUp>
          <Box className={classes.controlBtn}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ButtonProps
                  titlebutton="กลุ่ม"
                  background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                  borderradiusbtn="10px"
                  boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                  maxwidthbtn="173px"
                  heightbtn="46px"
                  fontsizebtn="26px"
                  startIcon={<IconUser />}
                  onClick={() => router.push({ pathname: '/community' })}
                />
              </Grid>
              <Grid item xs={6}>
                <ButtonProps
                  titlebutton="เชิญเพื่อน"
                  background="linear-gradient(to top, #8CA51E, #D0FD08)"
                  borderradiusbtn="10px"
                  boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                  maxwidthbtn="173px"
                  heightbtn="46px"
                  fontsizebtn="26px"
                  startIcon={<IconUserAdd />}
                  onClick={Invite}
                />
              </Grid>
            </Grid>
          </Box>
        </Hidden>
        <Box>
          <ModalDefault
            open={openDialog} onClose={CloseDialog}
          >
            <div className={classes.center}>
              <Typography variant="body1">QR Code เชิญเพื่อน</Typography>
              <QRCode
                value={`${public_host}/register/?ebib_code=${profile.ebib_code}`}
                title={`${public_host}/register/?ebib_code=${profile.ebib_code}`}
              />
              {/* {`${public_host}/register/?ebib_code=${profile.ebib_code}`} */}
              <ButtonProps
                variant="contained"
                color="primary"
                marginbtn="10px 0"
                titlebutton="Copy Link"
                maxwidthbtn="100%"
                onClick={ClicKCopy}
              // background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              />
              {copy && <Typography variant="h3">Success</Typography>}
            </div>

          </ModalDefault>
        </Box>
      </Container>
    </section>
  );
};

export default SectionA;
