import {
  Box,
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: "#449AE3",
      borderRadius: 5,
      margin: 15,
      width: 345,
      minHeight: (props: any) => props.minheight,
    },
    "& .MuiDialogContent-root": {
      padding: "50px 40px 40px 40px",
      backgroundImage: `url(${prefix}/images/bg_big.png)`,
      backgroundSize: "auto 203px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
  },
  close: {
    zIndex: 99,
    position: "absolute",
    borderRadius: "100%",
    top: 20,
    right: 20,
    width: 42,
    height: 42,
    backgroundColor: "#E96189",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(85, 85, 85)",
    },
  },
  dialogHeader: {
    display: "flex",
    "& p": {
      width: "100%",
      backgroundColor: "#fff",
      color: "#1688c4",
      fontSize: 30,
      lineHeight: "36px",
      fontFamily: "DBHeavent_MedCond",
      textAlign: "center",
      paddingTop: 25,
    },
  },
}));

const ModalCommon = (props: any) => {
  const { root } = useStyles(props);
  const { open, onClose, children, classNameDialog, header } = props;
  const classes = useStyles(props);
  return (
    <Dialog
      className={`${root}`}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box className={classes.dialogHeader}>
        {header && <Typography>{header}</Typography>}
        <Box className={classes.close} onClick={onClose}>
          <img src={`${prefix}/images/ic_close.svg`} alt="" />
        </Box>
      </Box>

      <DialogContent className={`${classNameDialog}`}>{children}</DialogContent>
      {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
    </Dialog>
  );
};

export default ModalCommon;
