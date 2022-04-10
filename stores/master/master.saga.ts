// import { call } from "redux-saga/effects";
import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { ActionSaga } from "services/action.saga";
import { callGet } from "services/api.services";
import { MasterAction } from "./master.action";

const hostAuth = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* FetchActivitiesList() {
  try {
    const response: any[] = yield callGet(`${hostAuth}/api/v1/master/activities`);
    yield put(
      ActionReducer({
        type: MasterAction.FETCH_ACTIVITIES_LST_S,
        payload: response,
      })
    );
  } catch (err) {
    yield put(
      ActionSaga({
        type: MasterAction.IS_MODAL_OPEN,
        payload: {
          msg: err.error,
          isOpen: true,
        },
      })
    );
  }
}

function* FetchCommunitiesList() {
  try {
    const response: any[] = yield callGet(`${hostAuth}/api/v1/master/communities`);
    yield put(
      ActionReducer({
        type: MasterAction.FETCH_COMMUNITIES_LST_S,
        payload: response,
      })
    );
  } catch (err) {
    yield put(
      ActionSaga({
        type: MasterAction.IS_MODAL_OPEN,
        payload: {
          msg: err.error,
          isOpen: true,
        },
      })
    );
  }
}

export default [takeLatest(MasterAction.FETCH_ACTIVITIES_LST_R, () => FetchActivitiesList()), takeLatest(MasterAction.FETCH_COMMUNITIES_LST_R, () => FetchCommunitiesList())];
