import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet, callPost, callPut } from "services/api.services";
import authService from "services/auth.service";
import { GeneralAction } from "stores/general/general.action";
import { AuthenAction } from "./authen.action";

const hostAuth = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

function* authenLoginR(e: IActionSaga) {
  authService.removeAuthorization();
  const { username, password, lineToken } = e.payload;
  try {
    const response: any[] = yield callPost(`${hostAuth}/api/v1/authen/login`, {
      // const response: any[] = yield callPost(`http://192.168.1.33:5000/api/v1/authen/login`, {
      username,
      password,
      lineToken,
    });
    yield put(
      ActionReducer({
        type: AuthenAction.AUTHEN_LOGIN_S,
        payload: response,
      })
    );
    e.onSuccess();
  } catch (err) {
    yield put(
      ActionReducer({
        type: AuthenAction.LOGIN_FAIL_S,
        payload: err,
      })
    );
    e.onFailure(err);
  }
}

function* resetLoginRes() {
  authService.removeAuthorization();
  yield put(
    ActionReducer({
      type: AuthenAction.RESET_LOGIN_S,
    })
  );
}

function* authenLogoutR(e: IActionSaga) {
  try {
    const { payload } = e;
    const response: any[] = yield callPut(`${hostAuth}/api/v1/backend/users/logout`, payload)
    yield put(
      ActionReducer({
        type: AuthenAction.AUTHEN_LOGOUT_S,
        payload: response
      })
    );
  } catch (err) {
    console.log('logout err', err)
  }
  yield put(
    ActionReducer({
      type: AuthenAction.AUTHEN_LOGOUT_S,
    })
  );
}

function* getUserProfile(e: IActionSaga) {
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/frontend/users/findReadByID`
    );
    yield put(
      ActionReducer({
        type: AuthenAction.USER_PROFILE_S,
        payload: response,
      })
    );
    e.onSuccess(response);
  } catch (err) {
    e.onFailure(err);
  }
}

function* authenTokenR(e: IActionSaga) {
  const { isFormAuthen } = e.payload;
  try {
    if (isFormAuthen) {
      // yield put(
      //   ActionReducer({ type: AuthenAction.AUTHEN_LOGIN_S, payload: { token } })
      // );
    }

    const userInfo: string[] = yield callGet(
      `${hostAuth}/api/v1/authen/auth/login-token`
    );

    yield put(
      ActionReducer({
        type: GeneralAction.GENERAL_TOKEN_S,
        payload: { userInfo },
      })
    );

    e.onSuccess(userInfo);
  } catch (err) {
    e.onFailure(err);
  }
}

interface ForgotInterface {
  data?: { token?: string };
  status?: number;
  message: string;
  statusCode?: number;
  error?: string;
}

function* callForgotPassword(e: IActionSaga) {
  const { inputData } = e.payload;
  try {
    const response: ForgotInterface = yield callPost(
      `${hostAuth}/api/v1/authen/forgot`,
      {
        username: inputData.username,
        p_code: inputData.p_code,
      }
    );
    if (response.status === 201) {
      const payloadData = {
        statusCode: response.status,
        data: response.data,
        message: "กรุณาตอบคำถามเพื่อยืนยันตัวตน",
      };
      yield put(
        ActionReducer({
          type: AuthenAction.FORGOT_PASSWORD_S,
          payload: payloadData,
        })
      );
    }
  } catch (err) {
    yield put(
      ActionReducer({
        type: AuthenAction.FORGOT_PASSWORD_S,
        payload: err,
      })
    );
  }
}

function* getQuizList(e: IActionSaga) {
  const { token } = e.payload;
  try {
    const response: any[] = yield callPost(
      `${hostAuth}/api/v1/authen/forgot/quiz`,
      {
        token: token,
      }
    );
    yield put(
      ActionReducer({
        type: AuthenAction.QUIZ_LIST_S,
        payload: response,
      })
    );
  } catch (err) {
    e.onFailure(err);
  }
}

function* postQA(e: IActionSaga) {
  const { token, first_name, last_name } = e.payload;
  try {
    const response: any[] = yield callPost(
      `${hostAuth}/api/v1/authen/forgot/qa`,
      {
        token: token,
        first_name: first_name,
        last_name: last_name,
      }
    );
    yield put(
      ActionReducer({
        type: AuthenAction.QA_S,
        payload: response,
      })
    );
  } catch (err) {
    yield put(
      ActionReducer({
        type: AuthenAction.QA_S,
        payload: err,
      })
    );
  }
}

function* loginToken(e: IActionSaga) {
  const { accessToken } = e.payload;
  authService.setAuthorization(accessToken);
  try {
    const response: any[] = yield callGet(
      `${hostAuth}/api/v1/frontend/users/findReadByID`
    );
    yield put(
      ActionReducer({
        type: AuthenAction.LOGIN_TOKEN_S,
        payload: response,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

function* loginLineSaga(e: IActionSaga) {
  const { payload } = e;
  console.log('payload', payload)
  try {
    // const response: any[] = yield callPost(
    //   `${hostAuth}/api/v1/authen/line/profile`,
    //   // `http://192.168.1.33:5000/api/v1/authen/line/profile`,
    //   payload
    // ) || {};
    yield put(
      ActionReducer({
        type: AuthenAction.LOGIN_LINE_S,
        payload: payload,
      })
    );
    // yield put(actions.setToken(accessToken))
    //     authService.setAuthorization(accessToken)
  } catch (err) {
    console.log(err);
  }
}

function* fromLine(e: IActionSaga) {
  const { payload } = e;
  console.log('payload', payload)
  try {
    const response: any[] = yield callPost(
      `${hostAuth}/api/v1/authen/line/profile`,
      // `http://192.168.1.33:5000/api/v1/authen/line/profile`,
      payload
    ) || {};
    yield put(
      ActionReducer({
        type: AuthenAction.FROM_LINE_S,
        payload: response,
      })
    );
    // yield put(actions.setToken(accessToken))
    //     authService.setAuthorization(accessToken)
  } catch (err) {
    console.log(err);
  }
}

export default [
  takeLatest(AuthenAction.AUTHEN_LOGIN_R, (e: IActionSaga) => authenLoginR(e)),
  takeLatest(AuthenAction.USER_PROFILE_R, (e: IActionSaga) =>
    getUserProfile(e)
  ),
  takeLatest(AuthenAction.AUTHEN_LOGOUT_R, (e: IActionSaga) => authenLogoutR(e)),
  takeLatest(AuthenAction.AUTHEN_TOKEN_R, (e: IActionSaga) => authenTokenR(e)),
  takeLatest(AuthenAction.FORGOT_PASSWORD_R, (e: IActionSaga) =>
    callForgotPassword(e)
  ),
  takeLatest(AuthenAction.QUIZ_LIST_R, (e: IActionSaga) => getQuizList(e)),
  takeLatest(AuthenAction.QA_R, (e: IActionSaga) => postQA(e)),
  takeLatest(AuthenAction.LOGIN_TOKEN_R, (e: IActionSaga) => loginToken(e)),
  takeLatest(AuthenAction.LOGIN_LINE_R, (e: IActionSaga) => loginLineSaga(e)),
  takeLatest(AuthenAction.FROM_LINE_R, (e: IActionSaga) => fromLine(e)),
  takeLatest(AuthenAction.RESET_LOGIN_R, () => resetLoginRes()),
];
