import {
  makeStyles,
  FormControl,
  Select,
  InputLabel,
  Box,
  FormHelperText
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme: any) => ({
  root: {
    width: `100%`,
    margin: (props: any) => props.margin,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
    display: (props: any) => props.display,
    flexDirection: (props: any) => props.flexdirection,
    alignItems: (props: any) => props.alignitems,
    justifyContent: (props: any) => props.justifycontent,
    "& .MuiInputBase-root": {
      fontSize: `30px`,
      lineHeight: `45px;`,
    },
    "& .MuiSelect-select:focus": {
      borderColor: `#d8d8d8`,
      backgroundColor: "transparent",
    },
    "& .MuiSelect-icon": {
      color: `rgba(0, 0, 0, 1)`,
    },
  },
  controlTextField: {
    borderRadius: (props: any) => props.borderraduis || 5,
    width: `100%`,
    backgroundColor: `#fff`,
    maxWidth: (props: any) => props.maxwidth,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100% !important",
    },
    "& .MuiSelect-select": {
      padding: (props: any) => props.paddingselect || `0 14px`,
      height: (props: any) => props.height || 50,
      textAlign: (props: any) => props.textalign,
      fontSize: 22,
      lineHeight: "24px",
      fontFamily: "DBHeavent_Cond",
      color: "#000",
    },
    "& .MuiSelect-select.Mui-disabled": {
      backgroundColor: "#F2F4F3",
      color: "#979797",
    },
    "& fieldset": {
      border: "1px solid",
      borderColor: (props: any) => props.bordercolor || "#DBDBDB",
    },
  },
  label: {
    position: "relative",
    transform: "none !important",
    fontSize: 20,
    lineHeight: "28px",
    color: "#000",
    fontFamily: "DBHeavent_Cond",
    // marginBottom: 4,
    // minHeight: 24,
    height: "auto",
    display: (props: any) => props.label,
  },
  labelrequired: {
    position: `relative`,
    marginRight: (props: any) => props.marginright,
    "&::after": {
      position: `absolute`,
      content: `'*'`,
      right: `-13px`,
      top: `0`,
      color: `red`,
      display: (props: any) => props.required || "none",
    },
  },
}));
const SelectFixd = (props: any) => {
  const {
    label,
    defaultValue,
    onChange,
    renderOption,
    children,
    disabled = false,
    required = false,
    id,
    classNameField,
    error=null,
    value
  } = props;
  const classes = useStyles(props);
  const { labelrequired, controlTextField, root } = useStyles(props);

  return (
    <FormControl required={required} className={`${root} ${classNameField}`} {...(error && {error:true})}>
      <InputLabel htmlFor="" className={classes.label} disabled={disabled}>
        <Box component="span" className={`${labelrequired}`}>
          {label}
        </Box>
      </InputLabel>
      <Select
        id={id}
        className={`${controlTextField}`}
        disabled={disabled}
        native={true}
        onChange={onChange}
        defaultValue={defaultValue}
        variant="outlined"
        fullWidth
        value={value}
      >
        {renderOption}
        {children}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectFixd;
