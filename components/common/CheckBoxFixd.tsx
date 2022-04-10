import { Box, makeStyles } from "@material-ui/core";
// import clsx from "clsx";
import React from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: 2,
    width: 24,
    height: 24,
    border: "1px solid #DBDBDB",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 15,
      height: 15,
      backgroundImage: "url(../images/check.svg)",
      backgroundRepeat: "no-repeat",
      content: '""',
    },
  },
  styleCheckbox: {
    display: (props: any) => props.display || "flex",
    marginRight: (props: any) => props.marginright,
    marginLeft: (props: any) => props.marginleft,
    height: (props: any) => props.height,
    marginBottom: (props: any) => props.marginbottom,
    alignItems: "center",
    "& label": {
      fontSize: 24,
      lineHeight: "30px",
    },
  },
}));

function StyledCheckbox(props: CheckboxProps) {
  const classes = useStyles(props);
  return (
    <Checkbox
      className={classes.root}
      // disableRipple
      // defaultChecked
    color="default"
    // checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
    icon={<span className={classes.icon} />}
    inputProps={{ "aria-label": "decorative checkbox" }}
    {...props}
    />
  );
}
const CheckBoxFixd = (props: any) => {
  const { styleCheckbox } = useStyles(props);
  const { label, value, onChange, name } = props;

  return (
    <Box className={`${styleCheckbox}`}>
      <StyledCheckbox checked={value} name={name} onChange={onChange} />
      <label>{label}</label>
    </Box>
  );
};
export default CheckBoxFixd;

// .MuiCheckbox-root
// .MuiIconButton-colorPrimary:hover
// .MuiIconButton-root:hover
