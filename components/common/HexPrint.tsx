import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    width: 90,
    height: 110,
    backgroundImage: (props: any) => props.image,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    margin: '0 5px',
  },
}));

const HexPrint = (props: any) => {
  const { root } = useStyles(props);
  return (
    <Box className={`${root}`}></Box>
  )
};

export default HexPrint;
