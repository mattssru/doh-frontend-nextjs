import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet } from "services/api.services";
import { ResultAction } from "./result.action";

const baseUrl = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* fetchGetChallengeSaga() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${baseUrl}/api/v1/transaction/exrecise-send/getChallengeStat`
    );
    yield put(
      ActionReducer({
        type: ResultAction.GET_CHALLENGE_S,
        payload: response,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
}

function* fetchExerciseChallenge() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${baseUrl}/api/v1/transaction/exrecise-send/Challengeputexercise`
    );
    yield put(
      ActionReducer({
        type: ResultAction.FETCH_EXERCISE_CHALLENGE_S,
        payload: response,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
}

function* fetchExerciseOutputSaga() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${baseUrl}/api/v1/transaction/exrecise-send/Outputexercise`
    );
    yield put(
      ActionReducer({
        type: ResultAction.FETCH_EXERCISE_OUTPUT_S,
        payload: response,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
}

function* FetchHistoryExerciseList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(
      `${baseUrl}/api/v1/transaction/exrecise-send/gethistoryexercise`,
      payload
    );
    yield put(
      ActionReducer({
        type: ResultAction.FETCH_HISTORY_LST_S,
        payload: response,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(ResultAction.GET_CHALLENGE_R, () => fetchGetChallengeSaga()),
  takeLatest(ResultAction.FETCH_EXERCISE_CHALLENGE_R, () =>
    fetchExerciseChallenge()
  ),
  takeLatest(ResultAction.FETCH_EXERCISE_OUTPUT_R, () =>
    fetchExerciseOutputSaga()
  ),
  takeLatest(ResultAction.FETCH_HISTORY_LST_R, (e: IActionSaga) =>
    FetchHistoryExerciseList(e)
  ),
];
