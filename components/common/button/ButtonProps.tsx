import { Button, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: `#fff`,
    fontSize: `22px`,
    padding: 0,
    height: `50px`,
    width: `100%`,
    minWidth: `200px`,
    backgroundRepeat: `no-repeat`,
    textTransform: "none",
    fontFamily: (props: any) => props.fontfamily || "DBHeavent_BoldCond",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    cursor: "pointer",
    "&$disabled": {
      color: `#fff`,
      backgroundColor: `#DBDBDB`,
    },
    "& .MuiButton-startIcon": {
      margin: (props: any) => props.marginiconbtn,
    },
    // [theme.breakpoints.down("xs")]: {
    //   fontSize: "26px !important",
    // },
  },
  disabled: {
    background: `gray !important`,
  },
  controlButton: {
    display: (props: any) => props.displaybtn,
    width: (props: any) => props.widthbtn,
    height: (props: any) => props.heightbtn,
    fontSize: (props: any) => props.fontsizebtn || "22px",
    lineHeight: (props: any) => props.lineheightbtn,
    maxWidth: (props: any) => props.maxwidthbtn,
    minWidth: (props: any) => props.minwidthbtn || "inherit",
    border: (props: any) => props.borderbtn,
    borderRadius: (props: any) => props.borderradiusbtn || 5,
    margin: (props: any) => props.marginbtn,
    background: (props: any) => props.background,
    backgroundColor: (props: any) => props.backgroundcolorbtn,
    backgroundPosition: (props: any) => props.backgroundposition,
    backgroundImage: (props: any) => props.backgroundimagebtn,
    backgroundSize: (props: any) => props.backgroundsizebtn,
    color: (props: any) => props.colorbtn,
    position: (props: any) => props.positionbtn,
    top: (props: any) => props.topbtn,
    bottom: (props: any) => props.bottombtn,
    left: (props: any) => props.leftbtn,
    right: (props: any) => props.rightbtn,
    zIndex: (props: any) => props.zindexbtn,
    boxShadow: (props: any) => props.boxshadowbtn,
    "& .MuiButton-startIcon": {
      margin: (props: any) => props.marginicon,
    },
    "& svg": {
      fontSize: (props: any) => props.fontsizeicon,
    },
    "&:hover": {
      backgroundColor: (props: any) => props.backgroundhoverbtn || "none",
      boxShadow: (props: any) => props.boxshadowhover,
      color: (props: any) => props.colorhoverbtn,
      "& svg path": {
        stroke: "#fff",
      },
      "& svg": {
        color: "#fff !important",
      },
    },
  },
}));

const ButtonProps = (props: any) => {
  const classes = useStyles(props);
  const { controlButton, root } = useStyles(props);
  const {
    titlebutton,
    actionBtn,
    startIcon,
    endIcon,
    onClick,
    link,
    onClose,
    ...rest
  } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      href={link}
      className={`${controlButton} ${root}`}
      classes={{
        disabled: classes.disabled,
      }}
      disabled={actionBtn}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      {...rest}
    >
      {titlebutton}
    </Button>
  );
};
ButtonProps.defaultProps = {
  bacgroundcolor: "#495BDE",
  backgroundhoverbtn: "#555",
  colorhoverbtn: "#fff",
  heightbtn: "50px",
};
export default ButtonProps;
