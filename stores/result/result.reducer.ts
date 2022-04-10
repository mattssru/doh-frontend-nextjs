import { IActionReducer } from "services/action.reducer";
import { ResultAction } from "./result.action";

interface IExerciseOutput {
  total: {
    calories: number
    time: number
    distance: number
  }
  target_time: number
  time_left: number
  time_process: number
  weekly_calories: number
  weekly_time: number
  weekly_avg_calories: number
  start_date: string
  end_date: string
  duration_text: string
  records: Array<number>
}

const ResultState: IResultState = {
  getChallenge: null,
  exerciseChallenge: {},
  exerciseOutput: {
    total: {
      calories: 0,
      distance: 0,
      time: 0
    },
    target_time: 0,
    time_left: 0,
    time_process: 0,
    weekly_calories: 0,
    weekly_time: 0,
    weekly_avg_calories: 0,
    duration_text: '',
    end_date: '',
    start_date: '',
    records: []
  },
  historyExerciseList: [],
  historyExerciseCalories: "0",
  historyExerciseDistance: "0",
  historyExerciseTime: "0",
};

export interface IResultState {
  getChallenge: any;
  exerciseChallenge: any;
  exerciseOutput: IExerciseOutput;
  historyExerciseList: any;
  historyExerciseCalories: string,
  historyExerciseDistance: string,
  historyExerciseTime: string,
}

const resultReducer = (state = ResultState, e: IActionReducer) => {
  switch (e.type) {
    case ResultAction.GET_CHALLENGE_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            getChallenge: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case ResultAction.FETCH_EXERCISE_CHALLENGE_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            exerciseChallenge: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case ResultAction.FETCH_EXERCISE_OUTPUT_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            exerciseOutput: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case ResultAction.FETCH_HISTORY_LST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          console.log(payload);
          
          return {
            ...state,
            historyExerciseList: payload.data.data.records,
            historyExerciseCalories: payload.data.data.totalCalories,
            historyExerciseDistance: payload.data.data.totalDistance,
            historyExerciseTime: payload.data.data.totalTime,
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

export default resultReducer;
