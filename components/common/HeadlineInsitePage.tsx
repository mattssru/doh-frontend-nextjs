import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    "& h1": {
      textalign: "center",
    },
  },
  controlHeadline:{
    color:(props:any) => props.customcolor, //*if want to change color without theme
    fontSize:(props:any) => props.fontsizetext,
    lineHeight:(props:any) => props.lineheight,
    marginBottom:(props:any) => props.marginbottom,
    marginTop:(props:any) => props.margintop,
    [theme.breakpoints.down("xs")]: {
      fontSize:(props:any) => props.fontsizetextresponsive,
      lineHeight:(props:any) => props.lineheightresponsive,
    },
  }
}));
const HeadlineInsitePage = (props:any) => {
  const { controlHeadline, root } = useStyles(props);
  const {
    varianttypography,
    customcolor,
    titleInsite,
    colortheme,
    textalign,
    displaybox,
    ...rest
  } = props;
  return (
    <Typography
      variant={varianttypography}
      color={colortheme}
      className={`${root} ${controlHeadline}`}
      align={textalign}
      display={displaybox}
      {...rest}
    >
      {titleInsite}
    </Typography>
  );
};
HeadlineInsitePage.defaultProps = {
  varianttypography: "h1",
  colortheme: "secondary",
  textalign: "center",
  marginbottom: "30px",
  displaybox: "block",
  fontsizetextresponsive: "40px",
  lineheightresponsive:"40px"
};
export default HeadlineInsitePage;
