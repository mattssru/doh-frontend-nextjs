import { IActionReducer } from "services/action.reducer"
import { HomeAction } from "./home.action"
import { ISatistics } from "./home.saga";


const HomeState: IHomeState = {
  anamaiList: {},
  healthList: {},
  anamaiDetail: {},
  rewardList: {},
  rewardDetail: {},
  buyRes: {},
  satistics: {
    Day: '',
    activity_list: [],
    exercise_list: {
      total_calories: 0,
      total_distance: 0,
      total_time: 0,
      total_hp: 0,
      sumdistance: 0,
      sumcaloriesburn: 0
    },
    province_list: [],
    user_count: {
      female: 0,
      male: 0,
      total: 0
    },
    user_type: [],
    zone_list: []
  },
  isLoading: true,
  excerList: {},
  sendExcer: {},
  faqList: {},
  rankList: {},
  myRank: {},
  bannerList: {}

}

export interface IHomeState {
  anamaiList: any,
  healthList: any,
  anamaiDetail: any,
  rewardList: any,
  rewardDetail: any,
  buyRes: any,
  satistics: ISatistics,
  isLoading: boolean,
  excerList: any,
  sendExcer: any,
  faqList: any,
  rankList: any,
  myRank: any,
  bannerList: any,
}

export default (state = HomeState, e: IActionReducer) => {
  switch (e.type) {
    case HomeAction.ANAMAI_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            anamaiList: payload.data.data,
          };
        }
      } catch (err) {
        console.log(err)
      }
      return { ...state }
    }
    case HomeAction.HEALTH_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            healthList: payload.data.data,
          }
        }
      } catch (err) {
        console.log(err)
      }
      return { ...state }
    }
    case HomeAction.ANAMAI_DETAIL_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            anamaiDetail: payload.data.data,
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    case HomeAction.REWARD_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            rewardList: payload.data.data
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    case HomeAction.REWARD_DETAIL_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            rewardDetail: payload.data.data
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    case HomeAction.BUY_REWRAD_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            buyRes: payload
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    case HomeAction.FETCH_SATISTICS_S: {
      try {
        const { payload }: { payload: ISatistics } = e
        return {
          ...state,
          satistics: payload
        }
      } catch (err) {
        console.error(err)
      }
      return state
    }
    case HomeAction.SET_LOADER_S: {
      try {
        const { payload }: { payload: boolean } = e
        return {
          ...state,
          isLoading: payload
        }
      } catch (err) {
        console.error(err)
      }
      return state
    }
    case HomeAction.EXCER_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            excerList: payload.data.data
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    case HomeAction.EXCER_SEND_S: {
      try {
        const { payload } = e;
        return {
          ...state,
          sendExcer: payload
        }
      } catch (err) {
        console.log(err)
      }
      return state
    }
    case HomeAction.FAQ_S: {
      try {
        const { payload } = e;
        return {
          ...state,
          faqList: payload.data.data,
        }
      } catch (err) {
        console.log(err)
      }
      return state;
    }
    case HomeAction.RANK_LIST_S: {
      try {
        const { payload } = e;
        return {
          ...state,
          rankList: payload.data
        }
      } catch (err) {
        console.log(err)
      }
      return state;
    }
    case HomeAction.MY_RANK_S: {
      try {
        const { payload } = e;
        return {
          ...state,
          myRank: payload.data.data
        }
      } catch (err) {
        console.log(err)
      }
      return state;
    }
    case HomeAction.BANNER_S: {
      try {
        const { payload } = e;
        return {
          ...state,
          bannerList: payload.data.result
        }
      } catch (err) {
        console.log(err)
      }
      return state;
    }
    default: {
      return state;
    }
  }
}