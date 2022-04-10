import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
// import { IActionSaga } from "services/action.saga";
import { callGet, callPost, callPut } from "services/api.services";
import { ProfileAction } from "./profile.action";

const hostAuth = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* getProfile() {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/frontend/users/findReadByID`
      // `http://192.168.1.33:9600/api/v1/frontend/users/findReadByID`
    );
    yield put(
      ActionReducer({
        type: ProfileAction.PROFILE_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* setTokenR(e: any) {
  const { username, line_token } = e.payload;
  try {
    const response: any[] = yield callPut(
      `${hostAuth}/api/v1/backend/users/update/checktoken`,
      { username, line_token }
    );
    yield put(
      ActionReducer({
        type: ProfileAction.SETTOKEN_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* getHealthPoint(e: IActionSaga) {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/transaction/hp-services/historyhp`
    );
    yield put(
      ActionReducer({
        type: ProfileAction.HEALTH_POINT_S,
        payload: response,
      })
    );
  } catch (err) {
    e.onFailure(err);
  }
  //
}

function* postPDPA() {
  try {
    yield callPost(`${hostAuth}/api/v1/backend/users/update/pdpa`);
  } catch (err) {
    console.error(err);
  }
}

function* postQSurvay(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPost(
      `${hostAuth}/api/v1/backend/users/survey/answer`,
      payload
    );
    console.log("q survay", response);
  } catch (err) {
    console.error(err);
  }
}

export default [
  takeLatest(ProfileAction.SETTOKEN_R, (e: IActionSaga) => setTokenR(e)),
  takeLatest(ProfileAction.PROFILE_R, () => getProfile()),
  takeLatest(ProfileAction.HEALTH_POINT_R, (e: IActionSaga) =>
    getHealthPoint(e)
  ),
  takeLatest(ProfileAction.PDPA_R, () => postPDPA()),
  takeLatest(ProfileAction.Q_SURVAY_R, (e: IActionSaga) => postQSurvay(e)),
];
