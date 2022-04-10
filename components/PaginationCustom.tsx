import { Box, makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const useStyles = makeStyles((theme: any) => ({
  root: {
    margin: (props: any) => props.margin,
    "& ul": {
      justifyContent: "center",
      marginBottom: 15,
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#70B642",
      color: "#fff",
      border: "none",
    },
    "& .MuiPaginationItem-root": {
      width: 40,
      height: 40,
      fontSize: "34px",
      borderRadius: 5,
      border: "1px solid #D4D7DC",
      color: "#BABABA",
      fontFamily: "DBHeavent_Cond",
      "& svg": {
        fontSize: "30px",
        color: "#BABABA",
        fontFamily: "DBHeavent_BoldCond",
      },
      [theme.breakpoints.down("xs")]: {
        width: 30,
        height: 30,
        fontSize: 26,
      },
    },
    "& .MuiPaginationItem-ellipsis": {
      height: "auto",
      border: "none",
    },
    "& .MuiPaginationItem-page.Mui-disabled": {
      backgroundColor: "#E1E8EB",
      border: "none",
      "& svg": {
        fontSize: "30px",
        color: "#fff",
        fontFamily: "DBHeavent_BoldCond",
      },
    },
  },
  textPagin: {
    fontSize: "24px",
    lineHeight: "24px",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: 22,
    },
  },
}));

const PaginationCustom = (props: any) => {
  const classes = useStyles(props);
  const { root } = useStyles(props);
  const { count, boundaryCount, siblingCount, textpagin } = props;
  const handleChange = (_event: object, page: number) => {
    props.onChangePage(page);
  };
  return (
    <Box className={`${root}`}>
      <Pagination
        count={count}
        boundaryCount={boundaryCount}
        siblingCount={siblingCount}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      <Box className={classes.textPagin}>{textpagin}</Box>
    </Box>
  );
};

export default PaginationCustom;
