// import { MasterAction } from 'stores/master/master.action';
import { call } from "redux-saga/effects";
// import { put, takeLatest } from "@redux-saga/core/effects";
import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { ActionSaga, IActionSaga } from "services/action.saga";
import { callDelete, callGet, callPost, callPut } from "services/api.services";
import { CommunitiesAction } from "./communities.action";
import Router from "next/router";

//const baseUrl = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;
const hostAuth = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* FetchCountGroup() {
  // const { payload } = e;
  // console.log("payload", payload);
  // let header = null;
  // if (payload != null) {
  //   header = { Authorization: `Bearer ${payload}` };
  // }
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/membergroupCount`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_COUNT_GROUP_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchTabGroup1() {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByUserType/1`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_TAB_GROUP_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_TAB_GROUP_S,
        payload: err,
      })
    );
  }
}
function* FetchTabGroup2() {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByUserType/2`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_TAB_GROUP2_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
function* FetchTabGroup3() {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByUserType/3`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_TAB_GROUP3_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
function* FetchTabGroup4() {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByUserType/4`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_TAB_GROUP4_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
function* FetchListCommunitiesType() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/master/communities`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_LIST_COMMUNITIES_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
function* FetchSearchCommunities(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunities`,
      payload
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_SEARCH_COMMUNITIES_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* GetProvinceList() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/master/province/`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.PROVINCE_LIST_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* GetDistrictList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/master/district/?p_code=${payload}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.DISTRICT_LIST_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* GetSubDistrictList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/master/sub-district/?a_code=${payload}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.SUB_DISTRICT_LIST_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchCommunitiesByCode(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByCode/${payload}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchListEvent(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communitiesEvents/findCommunitiesEvent/${payload}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_LIST_EVENT_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchListActivities(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/master/activities`,
      payload
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_LIST_ACTIVITIES_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchListNotiNews(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByCode/${payload}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_LIST_NOTI_NEWS_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchDetailGroup(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities-info/findCommunitiesDetail/${payload}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_DETAIL_GROUP_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* UpdateNewCommunity(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPut(
      `${hostAuth}/api/v1/communities/updateAnnouncement/${payload.commu_code}`,
      payload
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.UPDATE_NEW_COMMUNITY_S,
        payload: response,
      })
    );
    const response2: any[] = yield callGet(
      `${hostAuth}/api/v1/communities/findCommunitiesByCode/${payload.commu_code}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_S,
        payload: response2,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* createCommunities(e: IActionSaga) {
  const { payload } = e;
  let formData = new FormData();

  formData.append("form", JSON.stringify(payload.inputValue));
  formData.append("file", payload.thumbnail);
  console.log("formData", formData);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response: any[] = yield callPost(
      `${hostAuth}/api/v1/communities/insertCommunities`,
      formData,
      config
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.CREATE_COMMUNITIES_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* FetchUserInviteList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities-invite/GetUsersInvite/${payload.groupId}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_USER_INVITE_LST_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* AcceptUserInvite(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPut(
      `${hostAuth}/api/v1/communities-invite/AcceptInvite`,
      payload
    );
    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_USER_INVITE_LST_R,
        payload: {
          groupId: payload.commu_code,
        },
      })
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.ACCEPT_USER_INVITE_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* RejectUserInvite(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPut(
      `${hostAuth}/api/v1/communities-invite/RejectInvite`,
      payload
    );
    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_USER_INVITE_LST_R,
        payload: {
          groupId: payload.commu_code,
        },
      })
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.REJECT_USER_INVITE_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* SaveNewsActivity(e: IActionSaga) {
  const { payload } = e;
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log("payload", payload);
    const response: any[] = yield callPost(
      `${hostAuth}/api/v1/communitiesEvents/insertCommunitiesEvents`,
      payload,
      config
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.SAVE_NEWS_ACTIVITY_S,
        payload: response,
      })
    );

    console.log("payload2", payload.commu_code);

    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_EVENT_R,
        payload: payload.commu_code,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* InviteUserByEbib(e: IActionSaga) {
  const { payload } = e;
  try {
    yield callPost(`${hostAuth}/api/v1/communities-invite/InviteUser`, payload);

    // yield put(
    //   ActionReducer({
    //     type: CommunitiesAction.INVITE_USER_EBIB_S,
    //     payload: response,
    //   })
    // );
    yield call(() =>
      Router.push(`/community/${payload.commu_code}/member-rank-list`)
    );
    yield put(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: "",
          error: false,
          isOpen: false,
        },
      })
    );
  } catch (err: any) {
    yield put(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: err.error,
          error: true,
          isOpen: true,
        },
      })
    );
  }
}

function* FetchMemberRankList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities-members/GetMemberRage/${payload.groupId}?sort=${payload.sort}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_MEMBER_RANK_LST_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* InsertCommunitiesInvite(e: IActionSaga) {
  const { payload } = e;
  try {
    yield callPost(
      `${hostAuth}/api/v1/communities-invite/insertCommunitiesInvite`,
      { commu_code: payload.valueInput.data }
    );

    // yield put(
    //   ActionReducer({
    //     type: CommunitiesAction.INVITE_USER_EBIB_S,
    //     payload: response,
    //   })
    // );
    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_COUNT_GROUP_R,
        payload: payload.tokenStore,
      })
    );
    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_SEARCH_COMMUNITIES_R,
        payload: payload.values,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* UpdateCommunities(e: IActionSaga) {
  const { payload } = e;
  let formData = new FormData();

  formData.append('file', payload.thumbnail)
  formData.append("form", JSON.stringify(payload.inputValue));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response: any[] = yield callPut(
      `${hostAuth}/api/v1/communities/updateCommunities/${payload.commu_code}`,
      formData,
      config
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.UPDATE_COMMUNITIES_S,
        payload: response,
      })
    );
    yield call(() => Router.push(`/community/${payload.commu_code}`));
  } catch (err) {
    console.log(err);
  }
}
function* LeaveGroupCommunities(e: IActionSaga) {
  const { payload } = e;
  try {
    yield callPut(
      `${hostAuth}/api/v1/communities-members/leavegroup/${payload.groupId}`
    );
    // yield put(
    //   ActionReducer({
    //     type: CommunitiesAction.LEAVE_GROUP_COMMUNITIES_S,
    //     payload: response,
    //   })
    // );
    yield call(() => Router.push(`/community`));
  } catch (err: any) {
    yield put(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: err.error,
          error: true,
          isOpen: true,
        },
      })
    );
  }
}

function* RemoveMemberGroup(e: IActionSaga) {
  const { payload } = e;
  try {
    yield callPut(`${hostAuth}/api/v1/communities-invite/outGroup`, payload);

    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_R,
        payload: payload.commu_code,
      })
    );

    yield put(
      ActionSaga({
        type: CommunitiesAction.FETCH_MEMBER_RANK_LST_R,
        payload: {
          groupId: payload.commu_code,
        },
      })
    );
  } catch (err: any) {
    yield put(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: err.error,
          error: true,
          isOpen: true,
        },
      })
    );
  }
}

function* GenerateQrCode(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities-invite/Genqrcodecommu/${payload.groupId}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.GENERATE_QR_CODE_S,
        payload: response,
      })
    );
  } catch (err: any) {
    yield put(
      ActionSaga({
        type: CommunitiesAction.IS_MODAL_OPEN,
        payload: {
          msg: err.message,
          error: true,
          isOpen: true,
        },
      })
    );
  }
}

function* FetchCommunitiesEventDetail(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communitiesEvents/findCommunitiesEventDetail/${payload.groupId}/${payload.eventId}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_COMMUNITIES_EVENT_DETAIL_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* DeleteCommunitiesEvent(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPut(
      `${hostAuth}/api/v1/communitiesEvents/DeleteCommunitiesEvents/${payload.eventId}`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.DELETE_COMMUNITIES_EVENT_DETAIL_S,
        payload: response,
      })
    );
    yield call(() => Router.push(`/community/${payload.groupId}`));
  } catch (err) {
    console.log(err);
  }
}

// function* FetchCommunitiesTypeList(e: IActionSaga) {
//   try {
//     const response: any[] = yield callGet(`${hostAuth}/api/v1/master/communities`);
//     let typeCommunities = response.filter((item:any) => item.id === e.payload.type_id);
//     console.log("typeCommunities", response);
//     console.log("typeCommunities", typeCommunities);

//     yield put(
//       ActionReducer({
//         type: CommunitiesAction.FETCH_COMMUNITIES_TYPE_LST_S,
//         payload: response,
//       })
//     );
//   } catch (err) {
//     yield put(
//       ActionSaga({
//         type: MasterAction.IS_MODAL_OPEN,
//         payload: {
//           msg: err.error,
//           isOpen: true,
//         },
//       })
//     );
//   }
// }

function* FetchExpRankingList() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/communities-members/GetGroupExpRanking`
    );
    yield put(
      ActionReducer({
        type: CommunitiesAction.FETCH_EXP_RANKING_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* DeleteGroup(e: IActionSaga) {
  const { payload } = e;
  try {
    const resposne: any[] = yield callDelete(`${hostAuth}/api/v1/communities/DeleteCommunities/${payload}`)
    e.onSuccess(resposne)
  } catch (err) {
    e.onFailure(err)
  }
}

function* GroupExp(e: IActionSaga) {
  const { id } = e.payload;
  try {
    const response: any[] = yield callGet(`${hostAuth}/api/v1/communities-members/GetGroupExpRanking?type_id=${id}`)

    yield put(
      ActionReducer({
        type: CommunitiesAction.GROUP_EXP_S,
        payload: response
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}


export default [
  takeLatest(CommunitiesAction.FETCH_COUNT_GROUP_R, () => FetchCountGroup()),
  takeLatest(CommunitiesAction.FETCH_TAB_GROUP_R, () => FetchTabGroup1()),
  takeLatest(CommunitiesAction.FETCH_TAB_GROUP2_R, () => FetchTabGroup2()),
  takeLatest(CommunitiesAction.FETCH_TAB_GROUP3_R, () => FetchTabGroup3()),
  takeLatest(CommunitiesAction.FETCH_TAB_GROUP4_R, () => FetchTabGroup4()),
  takeLatest(CommunitiesAction.FETCH_LIST_COMMUNITIES_R, () =>
    FetchListCommunitiesType()
  ),
  takeLatest(CommunitiesAction.FETCH_SEARCH_COMMUNITIES_R, (e: IActionSaga) =>
    FetchSearchCommunities(e)
  ),
  takeLatest(CommunitiesAction.PROVINCE_LIST_R, () => GetProvinceList()),
  takeLatest(CommunitiesAction.DISTRICT_LIST_R, (e: IActionSaga) =>
    GetDistrictList(e)
  ),
  takeLatest(CommunitiesAction.SUB_DISTRICT_LIST_R, (e: IActionSaga) =>
    GetSubDistrictList(e)
  ),
  takeLatest(CommunitiesAction.CREATE_COMMUNITIES_R, (e: IActionSaga) =>
    createCommunities(e)
  ),
  takeLatest(CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_R, (e: IActionSaga) =>
    FetchCommunitiesByCode(e)
  ),
  takeLatest(CommunitiesAction.FETCH_LIST_EVENT_R, (e: IActionSaga) =>
    FetchListEvent(e)
  ),
  takeLatest(CommunitiesAction.FETCH_LIST_ACTIVITIES_R, (e: IActionSaga) =>
    FetchListActivities(e)
  ),
  takeLatest(CommunitiesAction.FETCH_LIST_NOTI_NEWS_R, (e: IActionSaga) =>
    FetchListNotiNews(e)
  ),
  takeLatest(CommunitiesAction.FETCH_DETAIL_GROUP_R, (e: IActionSaga) =>
    FetchDetailGroup(e)
  ),
  takeLatest(CommunitiesAction.UPDATE_NEW_COMMUNITY_R, (e: IActionSaga) =>
    UpdateNewCommunity(e)
  ),
  takeLatest(CommunitiesAction.FETCH_USER_INVITE_LST_R, (e: IActionSaga) =>
    FetchUserInviteList(e)
  ),
  takeLatest(CommunitiesAction.ACCEPT_USER_INVITE_R, (e: IActionSaga) =>
    AcceptUserInvite(e)
  ),
  takeLatest(CommunitiesAction.REJECT_USER_INVITE_R, (e: IActionSaga) =>
    RejectUserInvite(e)
  ),
  takeLatest(CommunitiesAction.INVITE_USER_EBIB_R, (e: IActionSaga) =>
    InviteUserByEbib(e)
  ),
  takeLatest(CommunitiesAction.FETCH_MEMBER_RANK_LST_R, (e: IActionSaga) =>
    FetchMemberRankList(e)
  ),
  takeLatest(CommunitiesAction.LEAVE_GROUP_COMMUNITIES_R, (e: IActionSaga) =>
    LeaveGroupCommunities(e)
  ),
  takeLatest(CommunitiesAction.REMOVE_MEMBER_GROUP_R, (e: IActionSaga) =>
    RemoveMemberGroup(e)
  ),
  takeLatest(CommunitiesAction.SAVE_NEWS_ACTIVITY_R, (e: IActionSaga) =>
    SaveNewsActivity(e)
  ),
  takeLatest(CommunitiesAction.UPDATE_COMMUNITIES_R, (e: IActionSaga) =>
    UpdateCommunities(e)
  ),
  takeLatest(CommunitiesAction.INSERT_COMMUNITIES_INVITE_R, (e: IActionSaga) =>
    InsertCommunitiesInvite(e)
  ),
  takeLatest(CommunitiesAction.GENERATE_QR_CODE_R, (e: IActionSaga) =>
    GenerateQrCode(e)
  ),
  takeLatest(
    CommunitiesAction.FETCH_COMMUNITIES_EVENT_DETAIL_R,
    (e: IActionSaga) => FetchCommunitiesEventDetail(e)
  ),
  takeLatest(
    CommunitiesAction.DELETE_COMMUNITIES_EVENT_DETAIL_R,
    (e: IActionSaga) => DeleteCommunitiesEvent(e)
  ),
  takeLatest(CommunitiesAction.FETCH_EXP_RANKING_R, () =>
    FetchExpRankingList()
  ),
  takeLatest(CommunitiesAction.DELETE_GROUP_R, (e: IActionSaga) => DeleteGroup(e)),
  // takeLatest(CommunitiesAction.FETCH_COMMUNITIES_TYPE_LST_R, (e: IActionSaga) =>
  //   FetchCommunitiesTypeList(e)
  // ),
  takeLatest(CommunitiesAction.GROUP_EXP_R, (e: IActionSaga) => GroupExp(e)),
];
