import React from "react";
import {
  makeStyles,
  // withStyles,
  Table,
  TableBody,
  // TableCell,
  TableContainer,
  TableHead,
  Paper,
  Box,
  Typography,
} from "@material-ui/core";

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: "#1688C4",
//     color: theme.palette.common.white,
//     textAlign: `center`,
//   },
//   body: {
//     fontSize: 25,
//     textAlign: `center`,
//     lineHeight: "25px",
//   },
// }))(TableCell);

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: 15,
    "& p": {
      marginTop: 10,
    },
    "& .MuiTableContainer-root": {
      boxShadow: "none",
      borderRadius: 5,
      backgroundColor: "transparent",
    },
    "& table": {
      border: "none",
      marginBottom: "0",
      fontSize: "21px",
      // [theme.breakpoints.down("md")]: {
      //   width: "1400px",
      // },
      "& thead": {
        "& tr": {
          "& th": {
            height: 50,
            position: "relative",
            borderBottom: "0",
            padding: "0 5px 0 5px",
            fontFamily: "DBHeavent_BoldCond",
            fontWeight: "normal !important",
            fontSize: 20,
            color: (props: any) => props.headcolor ? props.headcolor : "#D0FD08",
            "&:after": {
              content: '""',
              position: "absolute",
              width: "1px",
              height: "calc(100% - 30px)",
              backgroundColor: "#FFFFFF",
              opacity: 0.4,
              right: 0,
              top: 15,
            },
            "&:first-child": {
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            },
            "&:last-child": {
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            },
          },
          "& th:last-child:after": {
            display: "none",
          },
        },
      },
      "& tbody": {
        "& tr": {
          borderBottom: "none",
          "& td": {
            position: "relative",
            borderBottom: "0",
            fontSize: "18px",
            height: 50,
            fontFamily: "DBHeavent_Cond",
            // color: "#fff",
            color: (props: any) => props.bodycolor ? props.bodycolor : "#fff",
            padding: "0 15px",
            verticalAlign: (props: any) => props.verticalalign,
            "&:after": {
              content: '""',
              position: "absolute",
              width: "1px",
              height: "calc(100% - 30px)",
              backgroundColor: "#fff",
              opacity: 0.4,
              right: 0,
              top: 15,
            },
          },
          "& td:first-child": {
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            paddingLeft: "30px",
          },
          "& td:last-child": {
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          },
          "& td:last-child:after": {
            display: "none",
          },
        },
      },
      "& tr:nth-child(odd)": {
        backgroundColor: "transparent",
      },
      "& tr:nth-child(even)": {
        // backgroundColor: "#52A6ED",
        backgroundColor: (props: any) => props.backgroundChildcolor ? props.backgroundChildcolor : "#52A6ED",
      },
    },
  },
  headfont: {
    fontFamily: "DBHeavent_BoldCond",
    fontSize: "24px",
    lineHeight: "24px",
  },
  controltablehead: {
    "& tr": {
      "& th": {
        backgroundColor: (props: any) => props.backgroundcolor,
      },
    },
  },
  controltablebody: {
    "& tr": {
      height: (props: any) => props.heightbody,
      "& td:last-child": {
        color: (props: any) => props.color,
        fontSize: (props: any) => props.fontsize,
        fontFamily: (props: any) => props.fontfamily,
      },
    },
  },
  topicTable: {
    color: "#000",
    marginBottom: "10px",
    height: "auto",
  },
}));

const TableProps = (props: any) => {
  const classes = useStyles(props);
  const { tablehead,  tablebody, topictable, remark } = props;

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.topicTable}>
        {topictable}
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.root} aria-label="customized table">
          <TableHead className={classes.controltablehead}>
           {tablehead}
          </TableHead>

          <TableBody className={classes.controltablebody}>
            {tablebody}
          </TableBody>
        </Table>
      </TableContainer>
      <p>{remark}</p>
    </Box>
  );
};

export default TableProps;
