import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import prefix from "utils/path";
import { ControlButton, ModalCommon, TextFieldFixd } from ".";
import { ButtonProps } from "./button";

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #dbdbdb",
    paddingBottom: 12,
    "& img": {
      marginLeft: "auto",
      marginRight: 0,
      cursor: "pointer",
    },
    "& p": {
      color: "#000",
      fontSize: 30,
      lineHeight: "36px",
      fontFamily: "DBHeavent_MedCond",
    },
  },
  body: {
    display: "flex",
    alignItems: "center",
    marginTop: 12,
    "& img": {
      width: 40,
      height: 40,
      marginRight: 12,
      marginTop: 12,
      alignSelf: "flex-start",
    },
    "& .date": {
      color: "#aaaaaa",
      fontSize: 18,
      lineHeight: "22px",
      fontFamily: "DBHeavent_MedCond",
    },
    "& .description": {
      color: "#000",
      fontSize: 24,
      lineHeight: "24px",
      fontFamily: "DBHeavent_Cond",
      wordBreak: "break-all",
    },
  },
  dialog: {
    backgroundColor: "#fff",
    backgroundImage: "unset !important",
    padding: "16px !important",
    justifyContent: "unset !important",
  },
  buttonGroup: {
    marginTop: 20,
  },
}));

const CardInfoList = (props: any) => {
  const classes = useStyles();
  const { data, disableButtonMore, handleSaveInfoNew } = props;

  const [modal, setModal] = useState(false);
  const [valueInput, setValueInput] = useState({
    announcement: "",
  });

  const handleSaveInfo = () => {
    handleSaveInfoNew(valueInput);
    setModal(false);
  };

  const hundleChange = (e: any) => {
    console.log("e", e.target);
    setValueInput({ ...valueInput, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography>แจ้งข่าวสาร</Typography>
        {disableButtonMore ? (
          <img src={`${prefix}/icons/ic_add.svg`} alt="" onClick={handleOpen} />
        ) : (
          ""
        )}
      </Box>
      {data?.map((el: any, i: number) => (
        <Box className={classes.body} key={i}>
          <img src={`${prefix}/icons/ic_info.svg`} alt="" />
          <Box>
            <Typography className="date">{el?.date}</Typography>
            <Typography className="description">{el?.des}</Typography>
          </Box>
        </Box>
      ))}
      <ModalCommon
        open={modal}
        onClose={handleClose}
        minheight="413px"
        classNameDialog={classes.dialog}
        header="แจ้งข่าวสาร"
      >
        <TextFieldFixd
          height="200px"
          label="แจ้งข่าวสาร"
          placeholder="กรอกข้อความ"
          defaultValue=""
          margin="0 0 10px 0"
          multiline
          rows={7}
          id={"announcement"}
          value={valueInput.announcement}
          onChange={hundleChange}
        />
        <Box className={classes.buttonGroup}>
          <ControlButton justifycontent="center">
            <ButtonProps
              titlebutton="ยกเลิก"
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              borderradiusbtn="10px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="46px"
              fontsizebtn="26px"
              onClick={handleClose}
            />
            <ButtonProps
              titlebutton="บันทึก"
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              borderradiusbtn="10px"
              boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
              heightbtn="46px"
              fontsizebtn="26px"
              onClick={handleSaveInfo}
            />
          </ControlButton>
        </Box>
      </ModalCommon>
    </Box>
  );
};

export default CardInfoList;
