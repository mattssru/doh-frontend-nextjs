import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles(() => ({
  root: {
    margin: "15px 0",
    "& .MuiAccordionSummary-content": {
      margin: `0`,
    },
    "& .MuiAccordionSummary-root": {
      borderRadius: "12px",
      padding: `5px 15px`,
      // height: "50px",
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      // maxHeight: "50px",
      minHeight: "inherit",
    },
    "& .MuiAccordion-root": {
      boxShadow: "none",
    },
    "& .MuiAccordionDetails-root": {
      padding: "15px 0",
      display: "block",
    },
  },
  heading: {
    textAlign: (props: any) => props.textalign || "center",
    margin: (props: any) => props.margin || "0 auto",
    fontSize: (props: any) => props.fontsizetext || 30,
    lineHeight: (props: any) => props.lineheighttext || "30px",
    fontFamily: "DBHeavent_BoldCond",
    color: "#fff",
  },
  titleForm: {
    fontSize: "30px",
    lineHeight: "30px",
    color: "#70B642",
    fontFamily: "DBHeavent_BoldCond",
    textAlign: "center",
    marginBottom: "10px",
  },
  control: {
    "& .MuiAccordionSummary-root": {
      backgroundColor: (props: any) => props.backgroundcollape || "70B642",
    },
  },
}));

const CollapseFaq = (props: any) => {
  const { headCollapse, children, titleForm } = props;
  const classes = useStyles(props);
  const { root, control, heading } = useStyles(props);
  return (
    <Box className={`${root} ${control}`}>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={`${heading}`}>{headCollapse}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h3" className={classes.titleForm}>
            {titleForm}
          </Typography>
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CollapseFaq;
