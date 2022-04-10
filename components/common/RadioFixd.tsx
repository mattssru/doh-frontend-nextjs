import { FormControlLabel, Radio, RadioProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& span.MuiTypography-body1": {
      color: "red",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 24,
    height: 24,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    border: "1px solid #DBDBDB",
    backgroundColor: "#fff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },

    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 10,
      height: 10,
      backgroundColor: "#70B642",
      borderRadius: "100%",
      content: '""',
    },
    "input:hover ~ &": {},
  },
  style: {
    height: 30,
    "& span.MuiTypography-body1": {
      fontSize: (props: any) => props.fontsize,
    },
  },
}));

function StyledRadio(props: RadioProps) {
  const classes = useStyles(props);

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const RadioFixd = (props: any) => {
  const { style } = useStyles(props);
  const { label, value } = props;
  return (
    <>
      <FormControlLabel
        className={`${style}`}
        value={value}
        control={<StyledRadio />}
        label={label}
      />
    </>
  );
};

export default RadioFixd;
