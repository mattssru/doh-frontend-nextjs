import {
  Button,
  Dialog,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
  root: {
    "& .MuiPaper-rounded": {
      borderRadius: `12px`,
      position: `relative`,
    },
    "& .MuiDialogContent-root": {
      padding: `30px 15px 25px 15px`,
      textAlign: (props) => props.textalign,
    },
    "& .MuiOutlinedInput-input , & .MuiInputBase-root": {
      textAlign: `left`,
      color: `#000`,
    },
  },
  closeModal: {
    display: (props) => props.displaybtn,
    width: `25px`,
    minWidth: `inherit`,
    height: `25px`,
    backgroundColor: `#FFB100`,
    borderRadius: `100%`,
    position: `absolute`,
    right: `10px`,
    top: `10px`,
    backgroundImage: `url(/images/icon-close.svg)`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `9px`,
    backgroundPosition: `center`,
    "&:hover": {
      backgroundColor: `#1688C4`,
    },
  },
});
const PopupModal = (props) => {
  const { root, closeModal } = useStyles(props);
  const { isOpen, handleClose, children, maxwidth } = props;
  return (
    <Dialog
      fullWidth
      maxWidth={maxwidth}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      className={`${root}`}
    >
      <Button className={`${closeModal}`} onClick={handleClose} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
Dialog.defaultProps = {
  maxwidth: "xs",
};
export default PopupModal;
