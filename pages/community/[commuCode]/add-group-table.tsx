import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
  Link
} from "@material-ui/core";
import { ControlButton } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconAdd, IconAddGroup, IconDelete } from "components/common/icon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { CommunitiesAction } from "stores/communities/communities.action";
import { IStates } from "stores/root.reducer";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 3px 5px rgba(0,0,0,0.16)",
    padding: "30px 15px",
    borderRadius: 5,
    "& h3": {
      fontSize: 30,
      lineHeight: "36px",
      textAlign: "center",
      marginBottom: 15,
    },
  },
  contentTable: {
    marginBottom: 30,
  },
}));

const tablehead = ["e-BIB", "ชื่อ - นามสกุล", "รับเชิญ"];



const AddGroupTablePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { commuCode } = router.query;
  const { usersInviteList } = useSelector((state: IStates) => state.communitiesReducer);

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_USER_INVITE_LST_R,
        payload: {
          groupId: commuCode
        }
      })
    )
  }, [dispatch]);

  const renderTable = (dataList: any) => {
    return dataList.length > 0 && dataList.map((item: any, index: number) => {
      return (
        <TableRow key={index}>
          <TableCell align="center">{item.ebib_code}</TableCell>
          <TableCell align="center">{item.first_name}</TableCell>
          <TableCell align="center">
            <ControlButton justifycontent="center" alignitems="center">
              <ButtonProps
                borderradiusbtn="100%"
                widthbtn="30px"
                heightbtn="30px"
                backgroundcolorbtn="#FFB100"
                marginicon="0"
                startIcon={<IconAdd />}
                onClick={() => handleAcceptInvite(item.user_id)}
              />
              <ButtonProps
                borderradiusbtn="100%"
                widthbtn="30px"
                heightbtn="30px !important"
                backgroundcolorbtn="#FF2929"
                marginicon="0"
                startIcon={<IconDelete />}
                onClick={() => handleRejectInvite(item.user_id)}
              />
            </ControlButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleAcceptInvite = (userId: any) => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.ACCEPT_USER_INVITE_R,
        payload: {
          commu_code: commuCode,
          user_id: userId
        }
      })
    )
  }

  const handleRejectInvite = (userId: any) => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.REJECT_USER_INVITE_R,
        payload: {
          commu_code: commuCode,
          user_id: userId
        }
      })
    )
  }

  return (
    <InnerLayout titlepage="เชิญ / รับเพื่อนเข้ากลุ่ม">
      <Box className={classes.root}>
        <Typography variant="h3">รายชื่อสมาชิกขอเข้ากลุ่ม</Typography>
        <Box className={classes.contentTable}>
          <TableDefault
            tablehead={tablehead}
            tablebody={renderTable(usersInviteList)}
            action="n"
          />
        </Box>
        <Link onClick={() => router.push({ pathname: `/community/${commuCode}/add-group` })}>
        <ButtonProps
          background="linear-gradient(to top, #8CA51E, #D0FD08)"
          titlebutton="เชิญเพื่อนเข้ากลุ่ม"
          heightbtn="40px"
          borderradiusbtn="5px"
          maxwidthbtn="167px"
          marginbtn="0 auto"
          fontsizebtn="22px"
          startIcon={<IconAddGroup />}
          // href={`/community/${commuCode}/add-group`}
          // as={`/community/${commuCode}/add-group-table`}
        />
        </Link>
      </Box>
    </InnerLayout>
  );
};

export default AddGroupTablePage;
