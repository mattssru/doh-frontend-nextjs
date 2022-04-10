import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet, callPost, callPut } from "services/api.services";
import { RegisterAction } from "./register.action";


const baseUrl = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* Register(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPost(`${baseUrl}/api/v1/backend/users/register`, payload);
    // const response: any[] = yield callPost(`http://192.168.1.151:9500/api/v1/backend/users/register`, payload);
    yield put(
      ActionReducer({
        type: RegisterAction.REGISTER_S,
        payload: response,
      }),
    );
    e.onSuccess(e)
  } catch (error) {
    yield put(
      ActionReducer({
        type: RegisterAction.REGISTER_S,
        payload: error,
      }),
    );
    e.onFailure(error)
  }
}


function* UpdateProfile(e: IActionSaga) {
  const { payload } = e;
  if (payload?.status === 'finish') {
    yield put(
      ActionReducer({
        type: RegisterAction.UPDATE_PROFILE_S,
        payload: { status: 204 },
      })
    )
  } else {
    try {
      const response: any[] = yield callPut(`${baseUrl}/api/v1/backend/users/update`, payload);
      yield put(
        ActionReducer({
          type: RegisterAction.UPDATE_PROFILE_S,
          payload: response,
        })
      )
    } catch (error) {
      e.onFailure(error)
    }
  }
}

function* UpdatePassword(e: IActionSaga) {
  const { payload } = e;
  if (payload?.status === 'finish') {
    yield put(
      ActionReducer({
        type: RegisterAction.UPDATE_PASSWORD_S,
        payload: { status: 204 },
      })
    )
  } else {
    try {
      const response: any[] = yield callPost(`${baseUrl}/api/v1/backend/users/reset/password`, payload);
      yield put(
        ActionReducer({
          type: RegisterAction.UPDATE_PASSWORD_S,
          payload: response,
        })
      )
    } catch (error) {
      e.onFailure(error)
    }
  }
}

function* GetProvinceList() {
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/province/`)
    yield put(
      ActionReducer({
        type: RegisterAction.PROVINCE_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* GetCurrentDistrictList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/district/?p_code=${payload.code}`)
    yield put(
      ActionReducer({
        type: RegisterAction.CURRENT_A_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* GetCurrentSubDistrictList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/sub-district/?a_code=${payload.code}`)
    yield put(
      ActionReducer({
        type: RegisterAction.CURRENT_T_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}


function* GetHomeDistrictList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/district/?p_code=${payload.code}`)
    yield put(
      ActionReducer({
        type: RegisterAction.HOME_A_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* GetHomeSubDistrictList(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/sub-district/?a_code=${payload.code}`)
    yield put(
      ActionReducer({
        type: RegisterAction.HOME_T_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}


function* GetUserType() {
  // const { payload } = e;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/users-type/`)
    yield put(
      ActionReducer({
        type: RegisterAction.USER_TYPE_S,
        payload: response,
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* ResetRegister() {
  try {
    yield put(
      ActionReducer({
        type: RegisterAction.RESET_REGISTER_S,
        payload: 'reset'
      })
    )
  } catch (err) {
    console.log(err)
  }
}


export default [
  takeLatest(RegisterAction.PROVINCE_LIST_R, () => GetProvinceList()),
  takeLatest(RegisterAction.CURRENT_A_LIST_R, (e: IActionSaga) => GetCurrentDistrictList(e)),
  takeLatest(RegisterAction.CURRENT_T_LIST_R, (e: IActionSaga) => GetCurrentSubDistrictList(e)),

  takeLatest(RegisterAction.HOME_A_LIST_R, (e: IActionSaga) => GetHomeDistrictList(e)),
  takeLatest(RegisterAction.HOME_T_LIST_R, (e: IActionSaga) => GetHomeSubDistrictList(e)),

  takeLatest(RegisterAction.USER_TYPE_R, () => GetUserType()),
  takeLatest(RegisterAction.REGISTER_R, (e: IActionSaga) => Register(e)),
  takeLatest(RegisterAction.UPDATE_PROFILE_R, (e: IActionSaga) => UpdateProfile(e)),
  takeLatest(RegisterAction.UPDATE_PASSWORD_R, (e: IActionSaga) => UpdatePassword(e)),
  takeLatest(RegisterAction.RESET_REGISTER_R, () => ResetRegister()),


]
