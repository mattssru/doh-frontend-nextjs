import { Box, makeStyles, Typography } from "@material-ui/core";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import React, { useEffect } from "react";
import CollapseFaq from "components/CollapseFaq";
import prefix from "utils/path";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { HomeAction } from "stores/home/home.action";
import { IStates } from "stores/root.reducer";

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
  content: {
    padding: `0 15px 0 75px`,
    backgroundImage: `url('${prefix}/images/ic_answer.svg')`,
    backgroundSize: `40px`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `20px -3px`,
    minHeight: `40px`,
    "& .MuiTypography-root": {
      fontSize: `24px`,
      lineHeight: `24px`,
      [theme.breakpoints.down("xs")]: {
        fontSize: "21px",
        lineHeight: "21px",
      },
    },
  },
  answer: {},
}));



const FaqPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      ActionSaga({
        type: HomeAction.FAQ_R,
      })
    )
  }, [])
  const { faqList } = useSelector((state: IStates) => state.homeReducer);
  useEffect(() => {
    if (Object.keys(faqList).length > 0) {
      console.log('faq', faqList)
    }
  }, [faqList])

  return (
    <InnerLayout titlepage="FAQ">
      <Box className={classes.root}>
        <Box className={classes.contentCollapse}>
          {faqList?.records?.length > 0 &&
            faqList?.records?.map((item: any, index: number) => {
              console.log(typeof (item.answer) === 'string')
              return (
                <CollapseFaq
                  key={index}
                  textalign="left"
                  margin="inherit"
                  backgroundcollape="#1688C4"
                  headCollapse={item.question}
                >
                  <Box className={classes.content}>
                    <Typography variant="h4" className={classes.answer}>
                      {/* {item.answer} */}
                      {item.answer.split('\n').map((item: string, _index: number) => {
                        return <p>{item}</p>
                      })
                      }
                    </Typography>
                  </Box>
                </CollapseFaq>
              );
            })
          }
          { }
        </Box>
      </Box>
    </InnerLayout>
  );
};

export default FaqPage;
