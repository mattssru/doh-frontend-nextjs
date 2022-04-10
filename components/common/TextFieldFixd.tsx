import React from "react";
import { makeStyles, TextField, FormControl, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "100%",
    maxWidth: (props: any) => props.maxwidth,
    margin: (props: any) => props.margin,
    "&:placeholder": {
      color: "red !important",
      opacity: 1,
    },
    "&::-webkit-input-placeholder": {
      color: "red !important",
      opacity: 1,
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  controlTextField: {
    width: `100%`,
    "&::placeholder": {
      color: "red !important",
      opacity: 1,
    },
    "&::-webkit-input-placeholder": {
      color: "red !important",
      opacity: 1,
    },
    "& label": {
      position: "relative",
      transform: "none !important",
      fontSize: 20,
      lineHeight: "20px",
      color: "#000",
      fontFamily: "DBHeavent_Cond",
      height: 28,
      display: (props: any) => props.label || "flex",
      alignItems: "flex-end",
      margin: 0,
      "& span": {
        color: "red",
      },
    },
    "& textarea": {
      border: "none !important",
      height: "auto !important",
      padding: "0 20px !important",
    },

    "& .MuiOutlinedInput-root": {
      fontSize: 22,
      lineHeight: `24px`,
      // color: "#AAAAAA",
      color: "black",
      borderRadius: (props: any) => props.borderradius || 5,
      backgroundColor: (props: any) => props.disableColor || `#fff`,
      // height: (props: any) => props.height || "50px",
    },
    "& ::-webkit-input-placeholder": {
      color: "#AAAAAA !important",
    },
    "& .MuiOutlinedInput-input": {
      padding: `0 20px`,
      fontSize: 22,
      lineHeight: "24px",
      borderRadius: 5,
      height: (props: any) => props.height || "50px",
      borderColor: (props: any) => props.bordercolor || "#DBDBDB",
    },
    "& .MuiInputBase-input::-webkit-input-placeholder": {
      opacity: `1`,
    },
    "& legend": {
      maxWidth: "0",
      width: "0",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      backgroundColor: "#F2F4F3",
      color: "#979797",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "15px 0px",
    },
  },
  btnSearch: {
    width: 66,
    height: 66,
    // minWidth: 45,
    backgroundColor: "#FFB01F",
    borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 2,
    right: 3,
    "&:hover": {
      backgroundColor: "#666",
    },
    [theme.breakpoints.down("xs")]: {
      width: (props: any) => props.btnSearchWidthXS || 66,
      height: (props: any) => props.btnSearchHeightXS || 66,
      minWidth: (props: any) => props.btnSearchMinWidthXS || 64,
    },
  },
}));
const TextFieldFixd = (props: any) => {
  const {
    name,
    placeholder,
    defaultValue,
    label,
    typeInput,
    maskInput,
    maxLength,
    onChange,
    rows,
    multiline,
    visionbtnSearch = false,
    required = false,
    disabled = false,
    id,
    value,
    error = null,
  } = props;
  const classes = useStyles(props);
  const { root, controlTextField } = useStyles(props);
  return (
    <FormControl className={`${root}`}>
      <TextField
        id={id}
        label={label}
        required={required}
        disabled={disabled}
        rows={rows}
        name={name}
        fullWidth
        value={value}
        // multiline={multiline}
        onChange={onChange}
        className={`${controlTextField}`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        variant="outlined"
        type={typeInput}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputComponent: maskInput,
        }}
        inputProps={{
          maxLength: maxLength,
        }}
        multiline={multiline === undefined ? false : true}
        {...(error && { error: true, helperText: error })}
      ></TextField>
      {visionbtnSearch && (
        <Button className={classes.btnSearch}>
          <img src="/images/ic_search.svg" alt="" />
        </Button>
      )}
    </FormControl>
  );
};

export default TextFieldFixd;
