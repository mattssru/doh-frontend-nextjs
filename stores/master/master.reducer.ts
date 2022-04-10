import { IActionReducer } from "services/action.reducer";
import { MasterAction } from "./master.action";

const MasterState = {
  activitiesList: [],
  listMonthTh: [
    { id: 1, name: "มกราคม" },
    { id: 2, name: "กุมภาพันธ์" },
    { id: 3, name: "มีนาคม" },
    { id: 4, name: "เมษายน" },
    { id: 5, name: "พฤษภาคม" },
    { id: 6, name: "มิถุนายน" },
    { id: 7, name: "กรกฎาคม" },
    { id: 8, name: "สิงหาคม" },
    { id: 9, name: "กันยายน" },
    { id: 10, name: "ตุลาคม" },
    { id: 11, name: "พฤศจิกายน" },
    { id: 12, name: "ธันวาคม" },
  ],
  communitiesList: [],
};

export interface IMasterState {
  activitiesList: any;
  listMonthTh: any;
  communitiesList: any;
}

const masterReducer = (state = MasterState, e: IActionReducer) => {
  switch (e.type) {
    case MasterAction.FETCH_ACTIVITIES_LST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            activitiesList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }

    case MasterAction.FETCH_COMMUNITIES_LST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            communitiesList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }

    default:
      return state;
  }
};

export default masterReducer;
