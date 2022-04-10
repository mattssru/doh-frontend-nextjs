import { IRes } from "interfaces";
import { put, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet, callPost } from "services/api.services";
import { HomeAction } from "./home.action";


const baseUrl = `${process.env.NEXT_PUBLIC_API_AUTHEN_HOST}`;

interface IUserType {
  type_id: number
  name: string
  total: number
  increase: number
}

interface IActivity {
  activity_id: number
  name: string
  user_count: number
  activity_time: number
  activity_distance: number
}

interface IZone {
  zone_code: number
  zone_text: string
  count: number
}

interface IProvince {
  p_code: number
  p_name: string
  user_count: number
}

interface IUserCount {
  total: number
  male: number
  female: number
}

interface IExerciseList {
  total_calories: number
  total_distance: number
  total_time: number
  total_hp: number
  sumdistance: number
  sumcaloriesburn: number
}

export interface ISatistics {
  Day: string
  user_count: IUserCount
  user_type: Array<IUserType>
  exercise_list: IExerciseList
  activity_list: Array<IActivity>
  zone_list: Array<IZone>
  province_list: Array<IProvince>
}

function* getAnamaiList(e: IActionSaga) {
  const { take, page } = e.payload;
  try {
    const response: any[] = yield callGet(`${baseUrl}//api/v1/content/news/anamai?take=${take}&page=${page}`)
    yield put(
      ActionReducer({
        type: HomeAction.ANAMAI_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* getHealthList(e: IActionSaga) {
  const { take, page } = e.payload;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/content/news/health?take=${take}&page=${page}`)
    yield put(
      ActionReducer({
        type: HomeAction.HEALTH_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* AnamaiDetail(e: IActionSaga) {
  const { slug } = e.payload;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/content/news/anamai/${slug}`)
    yield put(
      ActionReducer({
        type: HomeAction.ANAMAI_DETAIL_S,
        payload: response,
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* getRewardList(e: IActionSaga) {
  const { take, page } = e.payload;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/redeem/reward/get-reward?take=${take}&page=${page}`)
    yield put(
      ActionReducer({
        type: HomeAction.REWARD_LIST_S,
        payload: response,
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* getRewardDetail(e: IActionSaga) {
  const { slug } = e.payload;
  try {
    // const response: any[] = yield callGet(`${baseUrl}/api/v1/redeem/reward/find-by-slug/${slug}`)
    const response: any[] = yield callGet(`${baseUrl}/api/v1/redeem/reward/get-reward-detail?rewardId=${slug}`)
    yield put(
      ActionReducer({
        type: HomeAction.REWARD_DETAIL_S,
        payload: response,
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* buyReward(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPost(`${baseUrl}/api/v1/redeem/reward/redeem-reward`, payload);
    yield put(
      ActionReducer({
        type: HomeAction.BUY_REWRAD_S,
        payload: response
      })
    )
  } catch (err) {
    e.onFailure(err)
  }
}

function* getSatistics(e: IActionSaga) {
  try {
    const response: { data: IRes<ISatistics> } = yield callGet(`${baseUrl}/api/v1/transaction/exrecise-send/getSummary`)
    yield put(
      ActionReducer({
        type: HomeAction.SET_LOADER_S,
        payload: true
      })
    )
    yield put(
      ActionReducer({
        type: HomeAction.FETCH_SATISTICS_S,
        payload: response.data.data
      })
    )
    yield put(
      ActionReducer({
        type: HomeAction.SET_LOADER_S,
        payload: false
      })
    )
    e.onSuccess(response)
  } catch (err) {
    e.onFailure(err)
  }
}

function* getExcerList() {
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/master/activities`);
    yield put(
      ActionReducer({
        type: HomeAction.EXCER_LIST_S,
        payload: response
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function* sendExcer(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPost(`${baseUrl}/api/v1/transaction/exrecise-send`, payload);
    yield put(
      ActionReducer({
        type: HomeAction.EXCER_SEND_S,
        payload: response
      })
    )
  } catch (err) {
    yield put(
      ActionReducer({
        type: HomeAction.EXCER_SEND_S,
        payload: err
      })
    )
  }
}

function* setLung(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callPost(`${baseUrl}/api/v1/transaction/lungs/storeLung`, payload);
    yield put(
      ActionReducer({
        type: HomeAction.EXCER_SEND_S,
        payload: response
      })
    )
  } catch (err) {
    yield put(
      ActionReducer({
        type: HomeAction.EXCER_SEND_S,
        payload: err
      })
    )
  }
}

function* clickNews(e: IActionSaga) {
  const { slug } = e.payload;
  try {
    yield callPost(`${baseUrl}/api/v1/transaction/health/clickhealth/${slug}`);
    e.onSuccess(e)
  } catch (err) {
    console.log(err)
  }
}

function* getFAQ() {
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/content/faqs/getfaqs`);
    yield put(
      ActionReducer({
        type: HomeAction.FAQ_S,
        payload: response
      })
    )
  } catch (err) {
    console.error(err)
  }
}

function* getRankList() {
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/frontend/users/get-all-ranking`);
    // const response: any[] = yield callGet(`http://192.168.1.151:9600/api/v1/frontend/users/get-all-ranking`);
    yield put(
      ActionReducer({
        type: HomeAction.RANK_LIST_S,
        payload: response
      })
    )
  } catch (err) {
    console.error(err)
  }
}

function* getMyRank(e: IActionSaga) {
  const { payload } = e;
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/frontend/users/getUserRankingById/${payload}`)
    yield put(
      ActionReducer({
        type: HomeAction.MY_RANK_S,
        payload: response
      })
    )
  } catch (err) {
    console.error(err)
  }
}

function* getBanner() {
  try {
    const response: any[] = yield callGet(`${baseUrl}/api/v1/content/banner`)
    yield put(
      ActionReducer({
        type: HomeAction.BANNER_S,
        payload: response
      })
    )
  } catch (err) {
    console.log(err)
  }
}

export default [
  takeLatest(HomeAction.ANAMAI_LIST_R, (e: IActionSaga) => getAnamaiList(e)),
  takeLatest(HomeAction.HEALTH_LIST_R, (e: IActionSaga) => getHealthList(e)),
  takeLatest(HomeAction.ANAMAI_DETAIL_R, (e: IActionSaga) => AnamaiDetail(e)),
  takeLatest(HomeAction.REWARD_LIST_R, (e: IActionSaga) => getRewardList(e)),
  takeLatest(HomeAction.REWARD_DETAIL_R, (e: IActionSaga) => getRewardDetail(e)),
  takeLatest(HomeAction.BUY_REWRAD_R, (e: IActionSaga) => buyReward(e)),
  takeLatest(HomeAction.FETCH_SATISTICS_R, (e: IActionSaga) => getSatistics(e)),
  takeLatest(HomeAction.EXCER_LIST_R, () => getExcerList()),
  takeLatest(HomeAction.EXCER_SEND_R, (e: IActionSaga) => sendExcer(e)),
  takeLatest(HomeAction.LUNG_SEND_R, (e: IActionSaga) => setLung(e)),
  takeLatest(HomeAction.CLICK_NEWS_R, (e: IActionSaga) => clickNews(e)),
  takeLatest(HomeAction.FAQ_R, () => getFAQ()),
  takeLatest(HomeAction.RANK_LIST_R, () => getRankList()),
  takeLatest(HomeAction.MY_RANK_R, (e: IActionSaga) => getMyRank(e)),
  takeLatest(HomeAction.BANNER_R, () => getBanner()),

]