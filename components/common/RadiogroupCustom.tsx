import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles({
  root: {
    marginBottom: "15px",
  },
  noHover: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 24,
    height: 24,
    border: "2px solid #DBDBDB",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#fff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 10,
      height: 10,
      backgroundColor: "#70B642",
      borderRadius: "100%",
      position: "absolute",
      top: 16,
      left: 16,
      content: '""',
    },
  },
  formRadio: {
    marginRight: "30px",
    "& .MuiFormControlLabel-label": {
      fontSize: "24px",
      lineHeight: "31px",
      color: "#000",
      fontFamily: "DBHeavent_Cond",
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props:any) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.noHover}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function RadiogroupCustom(props:any) {
  // const [setValue] = React.useState("");
  const { value, label, onChange, name, ...rest } = props;
  const classes = useStyles();
  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormControlLabel
        className={classes.formRadio}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        {...rest}
        control={<StyledRadio />}
      />
    </FormControl>
  );
}
