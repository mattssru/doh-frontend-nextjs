import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
  root: {
    "& .MuiPaper-rounded": {
      borderRadius: `12px`,
      position: `relative`,
    },
    "& .MuiDialogContent-root": {
      padding: `30px 15px 25px 15px`,
      textAlign: (props: any) => props.textalign,
    },
    "& .MuiOutlinedInput-input , & .MuiInputBase-root": {
      textAlign: `left`,
      color: `#000`,
    },
  },
  closeModal: {
    width: `25px`,
    minWidth: `inherit`,
    height: `25px`,
    backgroundColor: `#FFB100`,
    borderRadius: `100%`,
    position: `absolute`,
    right: `10px`,
    top: `10px`,
    display: (props: any) => props.displayclose,
    "&:hover": {
      backgroundColor: `#1688C4`,
    },
  },
});

const PopupModal = (props: any) => {
  const { root } = useStyles(props);
  const { isOpen, handleClose, children, maxwidth } = props;

  return (
    <Dialog fullWidth maxWidth={maxwidth} open={isOpen} onClose={handleClose} aria-labelledby="dialog-title" className={`${root}`}>
      {/* <Button className={`${closeModal}`} onClick={handleClose} /> */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupModal;
