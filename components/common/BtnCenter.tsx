import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    justifyContent: "center",
    flexDirection:`row`,
    alignContent:`center`,
    alignItems:`center`,
    textAlign:`center`,
    display:`flex`,
    flexWrap:`wrap`,
    marginTop: (props:any) => props.MarginTopBtn,
    marginBottom: (props:any) => props.MarginBottomBtn,
    "& .MuiButtonBase-root": {
      width: "300px",
      margin: "0 7.5px",
    },
  },
}));

const BtnCenter = (props:any) => {
  const { root } = useStyles(props);
  const { children} = props;
  return <Box className={`${root}`}>{children}</Box>;
};
export default BtnCenter;
