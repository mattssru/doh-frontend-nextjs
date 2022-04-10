import React from "react";
import dynamic from "next/dynamic";
import { Box, Container, makeStyles } from "@material-ui/core";
import TitlePages from "components/common/TitlePages";
import prefix from "utils/path";

const Header = dynamic(import("../Header"));
const Footer = dynamic(import("../Footer"));

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: "relative",
  },
  background: {
    position: "absolute",
    top: "-2vw",
    right: 0,
    zIndex: 0,
    [theme.breakpoints.down("xs")]: {
      top: "-3vw",
    },
    "& img": {
      maxWidth: "100%",
      maxHeight: 600,
      [theme.breakpoints.down("xs")]: {
        maxHeight: 220,
      },
    },
  },
  zIndex: {
    position: "relative",
    zIndex: 1,
  },
}));

const InnerLayout = (props: any) => {
  const classes = useStyles();
  const { titlepage, children } = props;
  return (
    <>
      <Header />
      <article className={classes.root}>
        <Box className={classes.background}>
          <img src={`${prefix}/images/bg_banner.png`} alt="" />
        </Box>
        <section className={classes.zIndex}>
          <Container maxWidth="lg">
            <TitlePages titlepage={titlepage} />
            {children}
          </Container>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default InnerLayout;
