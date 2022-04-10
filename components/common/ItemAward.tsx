import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    background: (props: any) => props.background || "#fff",
    borderRadius: "100%",
    width: (props: any) => props.width || 94,
    height: (props: any) => props.height || 94,
    margin: "0 auto",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    border: "none",
    cursor: "pointer",
    // background: "linear-gradient(to top, #8CA51E,  #D0FD08)"
    // "&.Mui-selected": {
    //   background: "linear-gradient(to top, #8CA51E,  #D0FD08)",
    //   "&:hover": {
    //     backgroundColor: "#fff",
    //   },
    //   "& svg, path": {
    //     fill: "#fff",
    //   },
    // },
  },
  boxIn: {
    width: "100%",
    height: "100%",
    backgroundImage: (props: any) => props.backgroundimage,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  // propsIcon: {
  //   "& svg, path, text,circle": {
  //     fill: (props: any) => props.fillIcon,
  //     // stroke: "transparent",
  //   },
  //   "& circle": {},
  // },
}));

const ItemAward = (props: any) => {
  const { root, boxIn } = useStyles(props);
  const { onClick } = props;
  return (
    <Box className={`${root}`} onClick={onClick}>
      <Box className={`${boxIn}`}></Box>
    </Box>
  );
};

export default ItemAward;
