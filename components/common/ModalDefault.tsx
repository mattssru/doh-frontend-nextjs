import { Box, Dialog, DialogContent, makeStyles } from "@material-ui/core";
import React from "react";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: "#ffff",
      borderRadius: 5,
      margin: 15,
      minHeight: (props: any) => props.minheight,
    },
    "& .MuiDialogContent-root": {
      padding: "50px 30px 30px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      marginTop: 20,
      [theme.breakpoints.down("xs")]: {
        padding: "50px 20px 20px 20px",
      },
    },
  },
  close: {
    position: "absolute",
    borderRadius: "100%",
    top: 20,
    zIndex:99,
    right: 20,
    width: 35,
    height: 35,
    backgroundColor: "#E96189",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(85, 85, 85)",
    },
  },
}));

const ModalDefault = (props: any) => {
  const { root } = useStyles(props);
  const { open, onClose, children, maxWidth, noClose } = props;
  const classes = useStyles(props);
  return (
    <Dialog
      className={`${root}`}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {noClose ? (
        <></>
      ) : (
        <Box className={classes.close} onClick={onClose}>
          <img src={`${prefix}/images/ic_close.svg`} alt="" />
        </Box>
      )}

      <DialogContent>{children}</DialogContent>
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

export default ModalDefault;
