import { Box, makeStyles, Typography } from "@material-ui/core";
import { ControlButton, TextFieldFixd } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import router from "next/router";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    maxWidth: 700,
    margin: "0 auto",
    padding: "30px 30px",
    [theme.breakpoints.down("xs")]: {
      padding: "30px 17px",
    },
    "& h3": {
      fontSize: 30,
      lineHeight: "36px",
      textAlign: "center",
      marginBottom: 15,
    },
  },
}));

const assessment = () => {
  const classes = useStyles();
  return (
    <InnerLayout titlepage="สอบประเมิณหลักสูตร">
      <Box className={classes.root}>
        <Typography variant="h3">โปรดตอบคำถามต่อไปนี้</Typography>
        <TextFieldFixd
          label="1. คำถาม"
          placeholder="กรอกคำตอบของท่านที่นี่"
          multiline
          rows={4}
          margin="0 0 15px 0"
        />
        <TextFieldFixd
          label="2. คำถาม"
          placeholder="กรอกคำตอบของท่านที่นี่"
          multiline
          rows={4}
          margin="0 0 15px 0"
        />
        <TextFieldFixd
          label="3. คำถาม"
          placeholder="กรอกคำตอบของท่านที่นี่"
          multiline
          rows={4}
          margin="0 0 15px 0"
        />
        <TextFieldFixd
          label="4. คำถาม"
          placeholder="กรอกคำตอบของท่านที่นี่"
          multiline
          rows={4}
          margin="0 0 15px 0"
        />

        <ControlButton justifycontent="center">
          <ButtonProps
            titlebutton="ยกเลิก"
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
            onClick={() => router.back()}
          />
          <ButtonProps
            titlebutton="ส่งคำตอบ"
            background="linear-gradient(to top, #8CA51E, #D0FD08)"
            borderradiusbtn="5px"
            boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
            heightbtn="40px"
            fontsizebtn="22px"
            maxwidthbtn="155px"
          />
        </ControlButton>
      </Box>
    </InnerLayout>
  );
};

export default assessment;
