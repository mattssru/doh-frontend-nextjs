import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet, callPut } from "services/api.services";
import HealthAction from "./health.action";

const hostAuth = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* getHealthHistory(e: IActionSaga) {
  const { take, page } = e.payload;
  try {
    const response: any[] = yield callGet(`${hostAuth}/api/v1/transaction/hp-services/historyhp?take=${take}&page=${page}`);
    yield put(
      ActionReducer({
        type: HealthAction.HP_HISTORY_S,
        payload: response,
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* getBuyHistory() {
  try {
    const response: any[] = yield callGet(`${hostAuth}/api/v1/transaction/reward/one-reward-history`);
    yield put(
      ActionReducer({
        type: HealthAction.BUY_HISTORY_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* useReward(e: IActionSaga) {
  const { slug } = e.payload
  try {
    const response: any[] = yield callPut(`${hostAuth}/api/v1/redeem/reward/update-status-reward/${slug}`)
    yield put({
      type: HealthAction.USE_REWARD_S,
      payload: response,
    })
  } catch (err) {
    e.onFailure(err)
  }
}

export default [
  takeLatest(HealthAction.HP_HISTORY_R, (e: IActionSaga) => getHealthHistory(e)),
  takeLatest(HealthAction.BUY_HISTORY_R, () => getBuyHistory()),
  takeLatest(HealthAction.USE_REWARD_R, (e: IActionSaga) => useReward(e)),
]