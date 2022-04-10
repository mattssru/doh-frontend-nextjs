import { AppBar, Box, Container, Grid, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: any) => ({
  root: {
    // padding: '25px 0',v
    justifyContent: 'center',
    height: 110,
    '& .MuiContainer-maxWidthLg': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      '& .MuiGrid-spacing-xs-3': {
        height: '100%',
      },
      '& .MuiGrid-grid-sm-9': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    [theme.breakpoints.down('xs')]: {},
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    '& a img': {
      width: '100%',
      height: '56px',
    },
  },
  topRight: {
    display: 'flex',
    height: '100%',
  },
  listMenu: {
    display: 'flex',
    paddingRight: '2.1vw',
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    borderRight: '1px solid #BBCED5',
  },
  listMenu_1: {
    flexBasis: '30%',
    justifyContent: 'space-between',
  },
  listMenu_2: {
    paddingLeft: '2.1vw',
  },
  listMenu_3: {
    paddingLeft: '2.1vw',
  },
  listMenu_4: {
    paddingLeft: '2.1vw',
    borderRight: 0,
  },
  itemMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img': {
      marginBottom: 5,
    },
  },
  textMenu: {
    fontSize: '28px',
    fontFamily: 'DBHeavent_BoldCond',
    color: '#333333',
  },
  textLang: {
    color: '#333333',
    fontSize: '24px',
    fontFamily: 'DBHeavent_BoldCond',
    position: 'relative',
    '&::before': {
      content: '""',
      backgroundImage: 'url(../images/ic_drop.svg)',
      position: 'absolute',
      right: '-13px',
      top: 5,
      width: 10,
      height: 5,
    },
  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: '100%',
    boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: 44,
      height: 44,
    },
  },
  linkLogin: {
    fontSize: '24px',
    lineHeight: '14px',
    fontFamily: 'DBHeavent_BoldCond',
    color: '#333333',
    marginRight: 15,
    '&:first-child': {
      borderRight: '2px solid #333333',
      paddingRight: 15,
    },
  },
}));

const MainMenu = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item sm={3}>
            <Box className={classes.logo}>
              <Link href="/">
                <img src="/images/logo.svg" alt="" />
              </Link>
            </Box>
          </Grid>
          <Grid item sm={9}>
            <Box className={classes.topRight}>
              <Box className={clsx(classes.listMenu, classes.listMenu_1)}>
                <Box className={classes.itemMenu}>
                  <Box>
                    <img src="/images/ic_menu1.svg" alt="" />
                  </Box>
                  <Box className={classes.textMenu}>บริการ</Box>
                </Box>
                <Box className={classes.itemMenu}>
                  <Box>
                    <img src="/images/ic_menu2.svg" alt="" />
                  </Box>
                  <Box className={classes.textMenu}>คำแนะนำ</Box>
                </Box>
                <Box className={classes.itemMenu}>
                  <Box>
                    <img src="/images/ic_menu3.svg" alt="" />
                  </Box>
                  <Box className={classes.textMenu}>ติดต่อเรา</Box>
                </Box>
              </Box>
              <Box className={clsx(classes.listMenu, classes.listMenu_2)}>
                <Box className={classes.itemMenu}>
                  <Box>
                    <img src="/images/ic_menu4.svg" alt="" />
                  </Box>
                  <Box className={classes.textMenu}>ร่วมเป็นส่วนหนึ่งกับเรา</Box>
                </Box>
              </Box>
              <Box className={clsx(classes.listMenu, classes.listMenu_3)}>
                <Link href="/" className={classes.textLang}>
                  TH
                </Link>
              </Box>
              <Box className={clsx(classes.listMenu, classes.listMenu_4)}>
                <Link href="/" className={classes.linkLogin}>
                  ลงทะเบียน
                </Link>
                <Link href="/" className={classes.linkLogin}>
                  เข้าสู่ระบบ
                </Link>
                <Box className={classes.imgUser}>
                  <img src="/images/img_user.svg" alt="" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default MainMenu;
