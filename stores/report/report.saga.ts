import { put, select, takeLatest } from "redux-saga/effects";
import { ActionReducer } from "services/action.reducer";
import { IActionSaga } from "services/action.saga";
import { callGet } from "services/api.services";
import { ReportAction } from "./report.action";
import authService from "services/auth.service";
const host = `${process.env.NEXT_PUBLIC_API_GOLANG}`;

function* fetchSumMember(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-members`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_MEMBER_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumGraphs(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-graphs`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_GRAPHS_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumRegisterZone(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-register-zone`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_REGISTER_ZONE_S,
              payload: data,
            })
        );
        yield put(
            ActionReducer({
              type: ReportAction.IS_LOADING_FIRSTPAGE_S,
              payload: { isLoadingFirstPage: false },
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumRegisterProvinces(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-register-provinces`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_REGISTER_PROVINCES_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumTransExercies(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-trans-exercies`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_TRANS_EXERCIES_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumTypeExercies(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-type-exercies`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_TYPE_EXERCIES_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumTypeExerciesSS4(e: IActionSaga) {
    const { filtersExercies } = yield select((state: any) => state.reportReducer);
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-type-exercies-ss4`, filtersExercies)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_TYPE_EXERCIES_SS4_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchFilterZone(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/filter-zone`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_FILTER_ZONE_S,
              payload: data,
            })
        );
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_FILTER_ZONE_EXERCIES_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchFilterProvinces(e: IActionSaga) {
    const { zoneId } = yield select((state: any) => state.reportReducer.filters);
    const { zoneIdExercies } = yield select((state: any) => state.reportReducer.filtersExercies);
    const { accessToken, type='member' } = e.payload
    try {
        authService.setAuthorization(accessToken);
        if(type === 'member'){
            const { data } = yield callGet(`${host}/api/v1/report/filter-province-by-zone/${zoneId}`)
            yield put(
                ActionReducer({
                  type: ReportAction.FETCH_FILTER_PROVINCES_S,
                  payload: data,
                })
            );
        }else if (type === 'exercies'){
            const { data } = yield callGet(`${host}/api/v1/report/filter-province-by-zone/${zoneIdExercies}`)
            yield put(
                ActionReducer({
                  type: ReportAction.FETCH_FILTER_PROVINCES_EXERCIES_S,
                  payload: data,
                })
            );
        }
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchFilterDistricts(e: IActionSaga) {
    const { provinceId } = yield select((state: any) => state.reportReducer.filters);
    const { provinceIdExercies } = yield select((state: any) => state.reportReducer.filtersExercies);
    const { accessToken, type='member' } = e.payload
    try {
        authService.setAuthorization(accessToken);
        if(type === 'member'){
            const { data } = yield callGet(`${host}/api/v1/report/filter-district-by-province/${provinceId}`)
            yield put(
                ActionReducer({
                  type: ReportAction.FETCH_FILTER_DISTRICTS_S,
                  payload: data,
                })
            );
        }else if (type === 'exercies'){
            const { data } = yield callGet(`${host}/api/v1/report/filter-district-by-province/${provinceIdExercies}`)
            yield put(
                ActionReducer({
                  type: ReportAction.FETCH_FILTER_DISTRICTS_EXERCIES_S,
                  payload: data,
                })
            );
        }
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchFilterSubdistricts(e: IActionSaga) {
    const { districtId } = yield select((state: any) => state.reportReducer.filters);
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/filter-subdistrict-by-district/${districtId}`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_FILTER_SUBDISTRICTS_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumMemberDESC(e: IActionSaga) {
    const { filters } = yield select((state: any) => state.reportReducer);
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-members-desc`, filters)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_MEMBER_DESC_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumLungsh(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-lungsh`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_LUNGSH_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchSumGroups(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/sum-groups`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_SUM_GROUPS_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchGroupsRanking(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/groups-rank-members?limit=20`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_GROUPS_RANKING_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchGroupsEXP(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/groups-exp-members`, { limit: 10 })
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_GROUPS_EXP_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchGroupsCalories(e: IActionSaga){
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/groups-rank-calories`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_GROUPS_CALORIES_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

function* fetchGroupsOfficial(e: IActionSaga) {
    const { accessToken } = e.payload
    try {
        authService.setAuthorization(accessToken);
        const { data } = yield callGet(`${host}/api/v1/report/groups-rank-members?official=1`)
        yield put(
            ActionReducer({
              type: ReportAction.FETCH_GROUPS_OFFICIAL_S,
              payload: data,
            })
        );
    }catch(error) {
        // yield put(actions.setError(error))
    }
}

export default [
  takeLatest(ReportAction.FETCH_SUM_MEMBER_R, (e: IActionSaga) => fetchSumMember(e)),
  takeLatest(ReportAction.FETCH_SUM_GRAPHS_R, (e: IActionSaga) => fetchSumGraphs(e)),
  takeLatest(ReportAction.FETCH_SUM_REGISTER_ZONE_R, (e: IActionSaga) => fetchSumRegisterZone(e)),
  takeLatest(ReportAction.FETCH_SUM_REGISTER_PROVINCES_R, (e: IActionSaga) => fetchSumRegisterProvinces(e)),
  takeLatest(ReportAction.FETCH_SUM_TRANS_EXERCIES_R, (e: IActionSaga) => fetchSumTransExercies(e)),
  takeLatest(ReportAction.FETCH_SUM_TYPE_EXERCIES_R, (e: IActionSaga) => fetchSumTypeExercies(e)),
  takeLatest(ReportAction.FETCH_SUM_TYPE_EXERCIES_SS4_R, (e: IActionSaga) => fetchSumTypeExerciesSS4(e)),
  takeLatest(ReportAction.FETCH_FILTER_ZONE_R, (e: IActionSaga) => fetchFilterZone(e)),
  takeLatest(ReportAction.FETCH_FILTER_PROVINCES_R, (e: IActionSaga) => fetchFilterProvinces(e)),
  takeLatest(ReportAction.FETCH_FILTER_DISTRICTS_R, (e: IActionSaga) => fetchFilterDistricts(e)),
  takeLatest(ReportAction.FETCH_FILTER_SUBDISTRICTS_R, (e: IActionSaga) => fetchFilterSubdistricts(e)),
  takeLatest(ReportAction.FETCH_SUM_MEMBER_DESC_R, (e: IActionSaga) => fetchSumMemberDESC(e)),
  takeLatest(ReportAction.FETCH_SUM_LUNGSH_R, (e: IActionSaga) => fetchSumLungsh(e)),
  takeLatest(ReportAction.FETCH_SUM_GROUPS_R, (e: IActionSaga) => fetchSumGroups(e)),
  takeLatest(ReportAction.FETCH_GROUPS_RANKING_R, (e: IActionSaga) => fetchGroupsRanking(e)),
  takeLatest(ReportAction.FETCH_GROUPS_EXP_R, (e: IActionSaga) => fetchGroupsEXP(e)),
  takeLatest(ReportAction.FETCH_GROUPS_CALORIES_R, (e: IActionSaga) => fetchGroupsCalories(e)),
  takeLatest(ReportAction.FETCH_GROUPS_OFFICIAL_R, (e: IActionSaga) => fetchGroupsOfficial(e)),
]