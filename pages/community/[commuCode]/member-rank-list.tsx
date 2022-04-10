import {
  Box,
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ButtonProps } from "components/common/button";
import { IconAddGroup } from "components/common/icon";
import { CheckCircle, RemoveCircle, ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ControlButton } from "components/common";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import TableDefault from "components/TableDefault";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ActionSaga } from "services/action.saga";
import { CommunitiesAction } from "stores/communities/communities.action";
import { IStates } from "stores/root.reducer";
import PopupModal from "components/common/PopupModal";

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
  betweenBtn: {
    marginBottom: 16,
  },
  controlModal: {
    textAlign: "center",
  },
}));

const tableHeader = ["e-BIB", "ชื่อ - นามสกุล", "แคลอรี่", "Exp"];

const MemberRankListPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { commuCode } = router.query;
  const { msg, error, isModal, detailCommunities, memberRankList } =
    useSelector((state: IStates) => state.communitiesReducer);
  const [statusRemove, setStatusRemove] = useState(false);
  const [usersSelect, setUsersSelect] = useState([] as any);
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const [sort, setSort] = useState('DESC')


  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_R,
        payload: commuCode,
      })
    );
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_MEMBER_RANK_LST_R,
        payload: {
          groupId: commuCode,
          sort: sort,
        },
      })
    );
  }, [profile]);

  const ClickSort = () => {
    if (sort === 'DESC') {
      setSort('ASC')
    } else {
      setSort('DESC')
    }
  }

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_MEMBER_RANK_LST_R,
        payload: {
          groupId: commuCode,
          sort: sort,
        },
      })
    );
  }, [sort])

  const handleSelectDelete = (e: any) => {
    const { value, checked } = e.target;
    if (checked == true) {
      setUsersSelect([...usersSelect, value]);
    } else {
      setUsersSelect(
        usersSelect.filter(function (item: any) {
          return item !== value;
        })
      );
    }
  };

  const renderTable = () => {
    return (
      memberRankList.length > 0 &&
      memberRankList.map((item: any, index: number) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{item.ebib_code}</TableCell>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.calories || 0}</TableCell>
            <TableCell align="center">{item.exp_total || 0}</TableCell>
            {statusRemove &&
              <TableCell align="center">
                <input
                  onClick={handleSelectDelete}
                  type="checkbox"
                  value={item.user_id}
                  disabled={profile?.ebib_code === item.ebib_code}
                />
              </TableCell>
            }
          </TableRow>
        );
      })
    );
  };

  const handleRemoveMember = () => {
    setStatusRemove(true);
  };

  const handleConfirmRemoveMember = () => {
    if (usersSelect.length > 0) {
      dispatch(
        ActionSaga({
          type: CommunitiesAction.REMOVE_MEMBER_GROUP_R,
          payload: {
            commu_code: commuCode,
            user_id_all: usersSelect,
          },
        })
      );

      setUsersSelect([]);
      setStatusRemove(false);
    }
  };

  const handleLeaveGroup = () => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.LEAVE_GROUP_COMMUNITIES_R,
        payload: {
          groupId: commuCode,
        },
      })
    );
  };

  // const handleModalOpen = () => {
  //   dispatch(
  //       ActionSaga({
  //         type: CommunitiesAction.IS_MODAL_OPEN,
  //         payload: {
  //           msg: 'ยืนยันออกจากกลุ่ม',
  //           error: false,
  //           isOpen: true,
  //         },
  //       })
  //   );
  // };

  const handleModalClose = () => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: "",
          error: false,
          isOpen: false,
        },
      })
    );
  };

  return (
    <InnerLayout titlepage="อันดับสมาชิก">
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h3">รายชื่อสมาชิก</Typography>
          </Grid>
          <Grid item xs={2}>
            <ButtonProps
              titlebutton="EXP"
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              heightbtn="40px"
              borderradiusbtn="5px"
              maxwidthbtn="167px"
              marginbtn="0 auto"
              fontsizebtn="22px"
              endIcon={sort === "DESC" ? <ArrowDropDown /> : <ArrowDropUp />}
              onClick={ClickSort}
            />
          </Grid>

        </Grid>
        <Box className={classes.contentTable}>
          <TableDefault
            tablehead={tableHeader}
            tablebody={renderTable()}
            action="n"
          />
        </Box>

        {detailCommunities.status_admin == 1 ? (
          <ControlButton justifycontent="center" alignitems="center">
            <ButtonProps
              titlebutton={statusRemove ? "ยืนยันการลบสมาชิก" : "ลบสมาชิก"}
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              heightbtn="40px"
              borderradiusbtn="5px"
              maxwidthbtn="167px"
              marginbtn="0 auto"
              fontsizebtn="22px"
              startIcon={statusRemove ? <CheckCircle /> : <RemoveCircle />}
              onClick={
                statusRemove ? handleConfirmRemoveMember : handleRemoveMember
              }
            />
            <ButtonProps
              background="linear-gradient(to top, #8CA51E, #D0FD08)"
              titlebutton="เชิญสมาชิก"
              heightbtn="40px"
              borderradiusbtn="5px"
              maxwidthbtn="167px"
              marginbtn="0 auto"
              fontsizebtn="22px"
              startIcon={<IconAddGroup />}
              onClick={() =>
                router.push({ pathname: `/community/${commuCode}/add-group` })
              }
            />
          </ControlButton>
        ) : (
          <ControlButton justifycontent="center" alignitems="center">
            <ButtonProps
              titlebutton="ออกจากกลุ่ม"
              background="linear-gradient(to bottom, #68D5E5, #674EEF)"
              heightbtn="40px"
              borderradiusbtn="5px"
              maxwidthbtn="167px"
              marginbtn="0 auto"
              fontsizebtn="22px"
              onClick={handleLeaveGroup}
            />
          </ControlButton>
        )}
      </Box>

      <PopupModal
        isOpen={isModal}
        handleClose={error ? handleModalClose : handleModalClose}
      >
        <Box className={classes.controlModal}>
          <Box>
            <Typography variant="h2">{msg}</Typography>
          </Box>
          <Box className={classes.betweenBtn} />
          <ButtonProps
            titlebutton={error ? "ปิด" : "ตกลง"}
            background="linear-gradient(to bottom, #68D5E5, #674EEF)"
            heightbtn="40px"
            borderradiusbtn="5px"
            maxwidthbtn="167px"
            marginbtn="0 auto"
            fontsizebtn="22px"
            onClick={error ? handleModalClose : handleLeaveGroup}
          />
        </Box>
      </PopupModal>
    </InnerLayout>
  );
};

export default MemberRankListPage;
