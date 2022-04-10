import { Box, Container, makeStyles } from "@material-ui/core";
import router from "next/router";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles(() => ({
  section: {
    marginBottom: 50,
  },
  bannerSection: {
    "& a": {
      display: "block",
      maxHeight: 305,
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      cursor: 'pointer',
    },
  },
}));

const SectionH = () => {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <Container maxWidth="lg">
        <Box className={classes.bannerSection} >
          <img src={`${prefix}/images/section_g.png`} alt="" onClick={() => router.push('/e-learning')} />
        </Box>
      </Container>
    </section>
  );
};

export default SectionH;
