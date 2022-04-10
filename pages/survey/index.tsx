import { Box, Dialog, makeStyles } from "@material-ui/core";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import ModalQuestionnaire from "components/ModalQuestionnaire";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: `#fff`,
    padding: "20px 15px",
    boxShadow: "0px 3px 5px rgba(0,0,0,0.16)",
    borderRadius: 5,
  },
  contentCollapse: {
    "& .MuiAccordionSummary-root": {
      minHeight: "60px !important",
      paddingLeft: `75px`,
      paddingTop: "10px",
      paddingBottom: "10px",
      borderRadius: 5,
      backgroundImage: `url('${prefix}/images/ic_faq.svg')`,
      backgroundSize: `40px`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `20px 10px`,
      [theme.breakpoints.down("xs")]: {
        backgroundPosition: `20px center`,
      },
    },
    "& .MuiAccordionSummary-content p": {
      display: "block",
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
        lineHeight: "25px",
      },
    },
    "& .MuiAccordionSummary-expandIcon": {
      transform: "rotate(180deg)",
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(0deg)",
    },
  },
  dialog: {
    margin: "20px",
    textAlign: "center",
    width: "300px",
    "& button": {
      background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
  },
}))

const SurveyPage = () => {
  const classes = useStyles();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      if (profile.survey_answer !== null) {
        setMessage('คุณทำแบบสอบถามแล้ว')
      }
    }
  }, [profile])
  const onClose = () => {
    setMessage('')
    // router.push('/')
  }
  return (
    <InnerLayout titlePage="แบบสอบถาม">
      <Box className={classes.root}>
        <Box className={classes.contentCollapse}>
          <ModalQuestionnaire />
          <Dialog open={message !== ''} onClose={onClose}>
            <Box className={classes.dialog}>
              {message}
              <br /><br />
              <ButtonProps
                color="primary"
                titlebutton="ปิด"
                onClick={onClose}
              />
            </Box>
          </Dialog>
        </Box>
      </Box>
    </InnerLayout>
  )
}

export default SurveyPage;