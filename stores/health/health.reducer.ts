import { IActionReducer } from "services/action.reducer"
import HealthAction from "./health.action"


const HealthState = {
  healthHistory: {},
  buyHistory: {},
  useReward: {},
}

export interface IHealthState {
  healthHistory: any,
  buyHistory: any,
  useReward: any,
}

export default (state = HealthState, e: IActionReducer) => {
  switch (e.type) {
    case HealthAction.HP_HISTORY_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            healthHistory: payload.data.data
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state;
    } case HealthAction.BUY_HISTORY_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            buyHistory: payload.data.result
          }
        }
      } catch (err) {
        console.log(err)
      }
      return state;
    } case HealthAction.USE_REWARD_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            useReward: payload.data.data
          }
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