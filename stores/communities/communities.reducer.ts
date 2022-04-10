import { IActionReducer } from "services/action.reducer";
import { CommunitiesAction } from "./communities.action";

const CommunitiesState = {
  fetchCountGroup: {},
  tabGroup1: [],
  tabGroup2: [],
  tabGroup3: [],
  tabGroup4: [],
  listCommunitiesType: [],
  listSearchCommunities: [],
  provinceList: [],
  districtList: [],
  subDistrictList: [],
  detailCommunities: {},
  listEvents: [],
  listActivity: [],
  listNotiNews: [],
  detailgroup: [],
  usersInviteList: [],
  createCommunitiesRes: {},
  memberRankList: [],
  isModal: false,
  msg: "",
  error: false,
  communitiesEventDetail: {
    title: "",
    period_datetime: "",
    sport_type: "",
    display_type_text: "",
    item: [],
  },
  expRanking: {},
  groupExpList: {},
};

export interface ICommunitiesState {
  fetchCountGroup: any;
  tabGroup1: any;
  tabGroup2: any;
  tabGroup3: any;
  tabGroup4: any;
  listCommunitiesType: any;
  listSearchCommunities: any;
  provinceList: any;
  districtList: any;
  subDistrictList: any;
  detailCommunities: any;
  listEvents: any;
  listActivity: any;
  listNotiNews: any;
  detailgroup: any;
  usersInviteList: any;
  createCommunitiesRes: any;
  memberRankList: any;
  isModal: boolean;
  msg: string;
  error: boolean;
  qrCode: string;
  communitiesEventDetail: {
    title: string;
    period_datetime: string;
    sport_type: string;
    display_type_text: string;
    item: any;
  };
  expRanking: any;
  groupExpList: any;
}

const communitiesReducer = (state = CommunitiesState, e: IActionReducer) => {
  switch (e.type) {
    case CommunitiesAction.FETCH_COUNT_GROUP_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            fetchCountGroup: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_TAB_GROUP_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          if (payload?.status === 200) {
            return {
              ...state,
              tabGroup1: payload.data.data,
            };
          } else {
            return {
              ...state,
              tabGroup1: []
            };
          }
          console.log('1', payload);
        }
      } catch (error) {
        console.log(error);
      }
      return state
    }
    case CommunitiesAction.FETCH_TAB_GROUP2_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          if (payload?.status === 200) {
            return {
              ...state,
              tabGroup2: payload.data.data,
            };
          } else {
            return {
              ...state,
              tabGroup2: []
            };
          }
        }
      } catch (error) {
        return {
          ...state,
          tabGroup2: []
        };
        console.log(error);
      }
      return {
        ...state,
        tabGroup2: []
      };
    }
    case CommunitiesAction.FETCH_TAB_GROUP3_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          if (payload?.status === 200) {
            return {
              ...state,
              tabGroup3: payload.data.data,
            };
          } else {
            return {
              ...state,
              tabGroup3: []
            };
          }
        }
      } catch (error) {
        return {
          ...state,
          tabGroup3: []
        };
        console.log(error);
      }
      return {
        ...state,
        tabGroup3: []
      };
    }
    case CommunitiesAction.FETCH_TAB_GROUP4_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          if (payload?.status === 200) {
            return {
              ...state,
              tabGroup4: payload.data.data,
            };
          } else {
            return {
              ...state,
              tabGroup4: []
            };
          }
        }
      } catch (error) {
        return {
          ...state,
          tabGroup4: []
        };
        console.log(error);
      }
      return {
        ...state,
        tabGroup4: []
      };
    }
    case CommunitiesAction.FETCH_LIST_COMMUNITIES_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            listCommunitiesType: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_SEARCH_COMMUNITIES_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            listSearchCommunities:
              payload.data.data.records != null
                ? payload.data.data.records
                : [],
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.PROVINCE_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            provinceList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.DISTRICT_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            districtList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.SUB_DISTRICT_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            subDistrictList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_COMMUNITIES_BY_CODE_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            detailCommunities: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_LIST_EVENT_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            listEvents: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_LIST_ACTIVITIES_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            listActivity: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_LIST_NOTI_NEWS_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            listNotiNews: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_DETAIL_GROUP_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            detailgroup: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.UPDATE_NEW_COMMUNITY_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          console.log("UPDATE_NEW_COMMUNITY_S", payload);
          return {
            ...state,
            // detailgroup: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_USER_INVITE_LST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            usersInviteList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.CREATE_COMMUNITIES_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          console.log("payloadCREATE_COMMUNITIES_S", payload);
          return {
            ...state,
            createCommunitiesRes: payload.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_MEMBER_RANK_LST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            memberRankList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.IS_MODAL_OPEN: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            msg: payload.msg,
            error: payload.error,
            isModal: payload.isOpen,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.GENERATE_QR_CODE_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            qrCode: payload.data.data.qr_code,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_COMMUNITIES_EVENT_DETAIL_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            communitiesEventDetail: {
              ...state.communitiesEventDetail,
              title: payload.data.data.title,
              period_datetime: payload.data.data.period_datetime,
              sport_type: payload.data.data.sport_type
                ? payload.data.data.sport_type
                : "ไม่พบข้อมูล",
              display_type_text: payload.data.data.display_type_text
                ? payload.data.data.display_type_text
                : "ไม่พบข้อมูล",
              item: payload.data.data.item,
            },
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.FETCH_EXP_RANKING_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            expRanking: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case CommunitiesAction.GROUP_EXP_S: {
      try {
        const { payload } = e;
        if (payload.data.data !== null) {
          return {
            ...state,
            groupExpList: payload.data.data
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    default:
      return state;
  }
};

export default communitiesReducer;
