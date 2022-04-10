import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginBottom: 30,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 15,
    },
    "& h1": {
      fontSize: 60,
      lineHeight: "60px",
      color: (props: any) => props.color || "#1688C4",
      [theme.breakpoints.down("xs")]: {
        fontSize: 40,
        lineHeight: "40px",
      },
    },
  },
}));

const TitlePages = (props: any) => {
  const { root } = useStyles(props);
  const { titlepage } = props;
  return (
    <Box className={`${root}`}>
      <Typography variant="h1">{titlepage}</Typography>
    </Box>
  );
};

export default TitlePages;
