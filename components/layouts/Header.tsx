import {
  AppBar,
  Container,
  makeStyles,
  Box,
  Grid,
  Link,
  Hidden,
  IconButton,
  Drawer,
} from "@material-ui/core";
import { IconMenu } from "components/common/icon";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { AuthenAction } from "stores/authen/authen.action";
// import { HomeAction } from "stores/home/home.action";
import { ProfileAction } from "stores/profile/profile.action";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";

const useStyles = makeStyles((theme: any) => ({
  root: {
    boxShadow: "none",
    zIndex: 1,
  },
  logo: {
    position: "relative",
    left: "-40px",
    display: "block",
    "& img": {
      maxWidth: "100%",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "130%",
      },
    },
    [theme.breakpoints.down("xs")]: {
      left: "-25px",
    },
  },
  header: {
    minHeight: 146,
    borderBottom: "1px solid #D1D1D1",
    display: "flex",
    alignItems: "center",
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      marginBottom: 0,
    },
  },
  rightHeader: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
  },
  topMenu: {
    display: "flex",
    alignItems: "center",
  },
  profile: {
    width: 35,
    height: 35,
    borderRadius: "100%",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    marginRight: 25,
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      marginRight: 12,
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "100%",
    },
  },
  point: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& img": {
      marginRight: 7,
      height: 30,
    },
  },
  bottomMenu: {},
  numPoint: {
    fontSize: 30,
    lineHeight: "24px",
    color: "#E96189",
    textAlign: "center",
    width: "70px",
    "& span": {
      fontSize: 16,
      lineHeight: "14px",
      display: "block",
    },
  },
  listMenu: {
    width: "100%",
    "& li": {
      display: "inline-block",
      paddingRight: 25,
      "&:last-child": {
        paddingRight: 0,
      },
    },
  },
  buttonMenu: {
    color: "#000",
    fontSize: 22,
    fontFamily: "DBHeavent_MedCond",
    "&:hover": {
      color: "#2F8EDE",
    },
  },
  bgMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
    "& img": {
      width: "100%",
      height: 270,
      [theme.breakpoints.down("sm")]: {
        height: 115,
      },
    },
  },
  menuDrawer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& a": {
      padding: 20,
      borderBottom: "1px solid #fff",
      color: "#fff",
    },
  },
  drawerpaper: {
    "& .MuiDrawer-paper": {
      backgroundImage: "linear-gradient(to top, #23C9FC, #BD74CD)",

      width: "40%",
      [theme.breakpoints.down("xs")]: {
        width: "70%",
      },
    },
  },
  logout: {
    marginRight: "20px",
    width: "100px",
    [theme.breakpoints.down("xs")]: {
      // textAlign: 'left',
      marginRight: "5px",
      // width: '100px',
      // fontSize: '24px',
    },
  },
}));
const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: IStates) => state.authenReducer);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [imgProfile, setImgProfile] = useState(
    `${prefix}/images/profile_img.jpg`
  );
  const toggleDrawer = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(
        ActionSaga({
          type: ProfileAction.PROFILE_R,
        })
      );
    } else {
      router.push({ pathname: "/login" });
    }
  }, []);
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      if (profile.avatar) {
        setImgProfile(profile.avatar);
      }
    }
  }, [profile]);
  const listMenu = () => {
    return (
      <Box className={classes.menuDrawer}>
        <Link
          onClick={() => {
            router.push({ pathname: "/" });
          }}
          className={classes.buttonMenu}
        >
          หน้าหลัก
        </Link>
        <Link
          onClick={() => {
            router.push({ pathname: "/profile" });
          }}
          className={classes.buttonMenu}
        >
          โปรไฟล์
        </Link>

        <Link
          onClick={() => {
            router.push({ pathname: "/results-exercise/form" });
          }}
          className={classes.buttonMenu}
        >
          ส่งผล
        </Link>
        <Link
          onClick={() => {
            router.push({ pathname: "/results-exercise" });
          }}
          className={classes.buttonMenu}
        >
          ดูผล
        </Link>
        <Link
          onClick={() => {
            router.push({ pathname: "/report" });
          }}
          className={classes.buttonMenu}
        >
          รายงาน
        </Link>
        {/* <Link onClick={() => { router.push({ pathname: '/' }) }} className={classes.buttonMenu}>
          กลุ่ม
        </Link> */}
        {/* <Link onClick={() => { router.push({ pathname: '/level' }) }} className={classes.buttonMenu}>
          LEVEL
        </Link> */}
        {/* <Link
          onClick={() => {
            router.push({ pathname: "/" });
          }}
          className={classes.buttonMenu}
        >
          จัดอันดับ
        </Link> */}
        <Link
          onClick={() => {
            router.push({ pathname: "/health-point/achievements" });
          }}
          className={classes.buttonMenu}
        >
          รางวัลและความสำเร็จ
        </Link>
        <Link
          onClick={() => {
            router.push({ pathname: "/news/knowledge-health" });
          }}
          className={classes.buttonMenu}
        >
          รอบรู้สุขภาพ
        </Link>
        <Link
          onClick={() => {
            router.push({ pathname: "/health-point/redemption" });
          }}
          className={classes.buttonMenu}
        >
          แลกของรางวัล
        </Link>
        <Link
          onClick={() => {
            router.push({ pathname: "/faq" });
          }}
          className={classes.buttonMenu}
        >
          FAQ
        </Link>
        <Link onClick={ClickLogout} className={classes.buttonMenu}>
          ออกจากระบบ
        </Link>
      </Box>
    );
  };

  const ClickLogout = () => {
    dispatch(
      ActionSaga({
        type: AuthenAction.AUTHEN_LOGOUT_R,
        payload: { user_id: profile?.user_id },
      })
    );
  };

  return (
    <AppBar position="relative" color="transparent" className={classes.root}>
      <Box className={classes.bgMenu}>
        <img src={`${prefix}/images/bg_header.png`} alt="" />
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.header}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Link
                className={classes.logo}
                onClick={() => {
                  router.push({ pathname: "/" });
                }}
              >
                <img src={`${prefix}/images/logo.png`} alt="" />
              </Link>
            </Grid>
            <Grid item sm={9}>
              <Box className={classes.rightHeader}>
                <Hidden smDown>
                  <Box className={classes.topMenu}>
                    <Link onClick={ClickLogout} className={classes.logout}>
                      ออกจากระบบ
                    </Link>
                    <Link
                      onClick={() => {
                        router.push({ pathname: "/profile" });
                      }}
                      className={classes.profile}
                    >
                      <img src={imgProfile} alt="" />
                    </Link>
                    <Box
                      className={classes.point}
                      onClick={() => {
                        router.push({ pathname: "/health-point" });
                      }}
                    >
                      <img src={`${prefix}/images/ic_cuppink.svg`} alt="" />
                      <Box className={classes.numPoint}>
                        {profile.hp_total || 0}
                        <span>แต้มสุขภาพ</span>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.bottomMenu}>
                    <ul className={classes.listMenu}>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/" });
                          }}
                          className={classes.buttonMenu}
                        >
                          หน้าหลัก
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/profile" });
                          }}
                          className={classes.buttonMenu}
                        >
                          โปรไฟล์
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/results-exercise/form" });
                          }}
                          className={classes.buttonMenu}
                        >
                          ส่งผล
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/results-exercise" });
                          }}
                          className={classes.buttonMenu}
                        >
                          ดูผล
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/report" });
                          }}
                          className={classes.buttonMenu}
                        >
                          รายงาน
                        </Link>
                      </li>
                      {/* <li>
                        <Link onClick={() => { router.push({ pathname: '/' }) }} className={classes.buttonMenu}>
                          กลุ่ม
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link onClick={() => { router.push({ pathname: '/level' }) }} className={classes.buttonMenu}>
                          LEVEL
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/" });
                          }}
                          className={classes.buttonMenu}
                        >
                          จัดอันดับ
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          onClick={() => {
                            router.push({
                              pathname: "/health-point/achievements",
                            });
                          }}
                          className={classes.buttonMenu}
                        >
                          รางวัลและความสำเร็จ
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/news/knowledge-health" });
                          }}
                          className={classes.buttonMenu}
                        >
                          รอบรู้สุขภาพ
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({
                              pathname: "/health-point/redemption",
                            });
                          }}
                          className={classes.buttonMenu}
                        >
                          แลกของรางวัล
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => {
                            router.push({ pathname: "/faq" });
                          }}
                          className={classes.buttonMenu}
                        >
                          FAQ
                        </Link>
                      </li>

                    </ul>
                  </Box>
                </Hidden>
              </Box>
            </Grid>
          </Grid>
          <Hidden mdUp>
            <Box className={classes.topMenu}>

              <Box
                className={classes.profile}
                onClick={() => {
                  router.push("/profile");
                }}
              >
                <img src={imgProfile} alt="" />
              </Box>
              <Box
                className={classes.point}
                onClick={() => {
                  router.push({ pathname: "/health-point" });
                }}
              >
                <img src={`${prefix}/images/ic_cuppink.svg`} alt="" />
                <Box className={classes.numPoint}>
                  {profile.hp_total || 0}
                  <span>แต้มสุขภาพ</span>
                </Box>
              </Box>
            </Box>
            <IconButton onClick={toggleDrawer}>
              <IconMenu />
            </IconButton>
            <Drawer
              anchor="left"
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              className={classes.drawerpaper}
            >
              {listMenu()}
            </Drawer>
          </Hidden>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
