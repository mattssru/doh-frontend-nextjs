import { Box, makeStyles, TableCell, TableRow } from "@material-ui/core";
import { ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import RewardHistoryDetail from "components/RewardHistoryDetail";
import TableProps from "components/TableProps";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import HealthAction from "stores/health/health.action";
import { IStates } from "stores/root.reducer";
import convertDate from "utils/convertDate";


const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#449AE3",
    borderRadius: 5,
    maxWidth: 800,
    margin: "0 auto",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "20px 15px",
  },
  nameproduct: {
    color: "#fff",
    fontSize: 18,
    lineHeight: "30px",
    textAlign: "center",
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
  title: {
    whiteSpace: 'initial',
    // display: "-webkit-box",
    // overflow: "hidden",
    // textAlign: 'left',
    // WebkitLineClamp: 1,
    // WebkitBoxOrient: "vertical",
    maxWidth: '270px',
    [theme.breakpoints.down("xs")]: {
      maxWidth: '100px',
      marginLeft: '5px',
    },
  },
  smallTable: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 !important",
    },
    "& button": {
      width: '100px',
      marginTop: '12px',
      [theme.breakpoints.down("xs")]: {
        width: '60px',
      },
    },
  },
  center: {
    margin: '20px',
    textAlign: 'center',
    width: '300px',
    "& button": {
      background: "linear-gradient(to top, #8CA51E, #D0FD08)"
    },
    [theme.breakpoints.down('xs')]: {
      width: '250px',
    },
    "& h3": {
      color: "#70B642",
      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
    },
    "& .MuiTypography-body1": {

      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
      fontWeight: 'bold',
      color: 'black',
    },
  },
  tableHead: {
    width: '20%',
    color: 'pink',
  },
}));





const HealthHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const [rewardCode, setRewardCode] = useState('');
  const [rewardSlug, setRewardSlug] = useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [page, setPage] = useState(1);
  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      dispatch(
        ActionSaga({
          type: HealthAction.BUY_HISTORY_R,
        })
      )
    }
  }, [profile])
  const { buyHistory } = useSelector((state: IStates) => state.healthReducer);
  const clickReward = (code: any, slug: any) => {
    setRewardCode(code)
    setRewardSlug(slug)
    setOpenDialog(true);

  }
  const renderTable = () => {
    if (buyHistory?.records?.length > 0) {
      return buyHistory.records.map((item: any, key: number) => {
        return <>
          <TableRow key={key}>
            <TableCell align="center" style={{ width: '30%' }} className={classes.smallTable}>
              <Box>
                {convertDate(item.created_at)}
              </Box>
            </TableCell>
            <TableCell align="center" style={{ width: '40%' }} className={classes.smallTable}>
              <Box className={classes.title}>
                {item.title}
              </Box>
            </TableCell>
            <TableCell align="center" style={{ width: '10%' }} className={classes.smallTable}>
              {item.point}
            </TableCell>
            <TableCell align="center" style={{ width: '20%' }} className={classes.smallTable}>
              <ControlButton justifycontent="center">
                <ButtonProps
                  titlebutton={item.status_used !== 0 ? 'ใช้สิทธิ์แล้ว' : 'ใช้สิทธิ์'}
                  heightbtn="25px"
                  colorbtn="black"
                  fontsizebtn="15px"
                  background="linear-gradient(to top, #8CA51E,  #D0FD08)"
                  actionBtn={item.status_used !== 0}
                  onClick={() => clickReward(item.barcode, item.slug_reward)}
                />
              </ControlButton>

            </TableCell>
          </TableRow>
        </>
      });
    }
  };
  const renderHead = () => {
    return (
      <TableRow>
        <TableCell align="center" >
          วันที่แลก
        </TableCell>
        <TableCell align="left" >
          รางวัล
        </TableCell>
        <TableCell align="center" >
          แต้ม
        </TableCell>
        <TableCell align="center" >
          การใช้สิทธิ์
        </TableCell>
      </TableRow>)
  }
  return (
    <InnerLayout titlepage="ประวัติการแลกของรางวัล">
      <Box className={classes.root}>
        <TableProps
          // tablehead={tablehead}
          tablehead={renderHead()}
          tablebody={renderTable()}
          action="n"
        />
        <ButtonProps
          titlebutton="กลับหน้าแลกรางวัล"
          maxwidthbtn="167px"
          widthbtn="100%"
          marginbtn="15px auto 0"
          heightbtn="40px"
          background="linear-gradient(to top, #8CA51E,  #D0FD08)"
          onClick={() => router.push('/health-point/redemption')}
        />
      </Box>
      <RewardHistoryDetail
        rewardCode={rewardCode}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        rewardSlug={rewardSlug}
      />
    </InnerLayout>
  );
};

export default HealthHistory;
