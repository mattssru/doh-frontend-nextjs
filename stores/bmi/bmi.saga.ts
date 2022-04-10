import { IRes } from "interfaces";
import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet, callPost } from "services/api.services";

import { BMIActions } from "./bmi.action";
import { ICreateBMI } from "./bmi.reducer";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL_NEST_TRANSACTION}`;

export interface ICreateBMIRes {
  user_id: number;
  bmi: number;
}

export interface IFetchBMIRes {
  status: number;
  created_at: string;
  created_at_new: string | null;
}

function* fetchBMI(e: IActionSaga) {
  try {
    const response: { data: IRes<IFetchBMIRes> } = yield callGet(
      `${baseUrl}/api/v1/transaction/bmi`
    );
    yield put(
      ActionReducer({
        type: BMIActions.FETCH_BMI_S,
        payload: response.data.data,
      })
    );
    e.onSuccess(e);
  } catch (error) {
    yield put(
      ActionReducer({
        type: BMIActions.FETCH_BMI_S,
        payload: error,
      })
    );
    e.onFailure(error);
  }
}

function* InsertBMI(e: IActionSaga) {
  const { payload }: { payload: ICreateBMI } = e;
  try {
    const response: { data: IRes<ICreateBMIRes> } = yield callPost(
      `${baseUrl}/api/v1/transaction/bmi/insertBmi`,
      payload
    );
    yield put(
      ActionReducer({
        type: BMIActions.BMI_SAVE_S,
        payload: response.data.data,
      })
    );
    e.onSuccess(e);
  } catch (error) {
    yield put(
      ActionReducer({
        type: BMIActions.BMI_SAVE_S,
        payload: error,
      })
    );
    e.onFailure(error);
  }
}

export default [
  takeLatest(BMIActions.BMI_SAVE_R, (e: IActionSaga) => InsertBMI(e)),
  takeLatest(BMIActions.FETCH_BMI_R, (e: IActionSaga) => fetchBMI(e)),
];
