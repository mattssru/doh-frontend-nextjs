import { Box } from "@material-ui/core";
import React from "react";

const ItemHexagon = (props: any) => {
  const { image, onClick } = props;
  return (
    <Box className="hex" onClick={onClick}>
      <img src={image} alt="" />
    </Box>
  );
};

export default ItemHexagon;
