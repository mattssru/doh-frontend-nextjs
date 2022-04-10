import { put, select, takeLatest } from "redux-saga/effects";
import { actions } from "./reducer";
import { callGet } from "@utils/axios.service";

const hostReport = `${process.env.NEXT_PUBLIC_API_GOLANG}`

function* fetchSumMembersSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-members`)
        yield put(actions.setSumMembers(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumGroupsSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-groups`)
        yield put(actions.setSumGroups(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumRegisterZoneSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-register-zone`)
        yield put(actions.setSumRegisterZone(response))
        yield put(actions.setLoadingFirstPage(false))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumRegisterProvincesSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-register-provinces`)
        yield put(actions.setSumRegisterProvinces(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumTransExerciesSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-trans-exercies`)
        yield put(actions.setSumTransExercies(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumTypeExerciesSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-type-exercies`)
        yield put(actions.setSumTypeExercies(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumMembersDescSaga() {
    try {
        const getFilters = state => state.report
        const { filters } = yield select(getFilters)
        const response = yield callGet(`${hostReport}/api/v1/report/sum-members-desc`, filters)
        yield put(actions.setSumMembersDesc(response))
        yield put(actions.setLoading(false))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumMapsSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-maps`)
        yield put(actions.setSumMaps(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumGraphsSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-graphs`)
        yield put(actions.setSumGraphs(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchSumLungshSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/sum-lungsh`)
        yield put(actions.setSumLungsh(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchFilterZoneSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/filter-zone`)
        yield put(actions.setFilterZone(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchGroupsRankingSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/groups-rank-members`)
        yield put(actions.setGroupsRanking(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchGroupsOfficialSaga() {
    try {
        const response = yield callGet(`${hostReport}/api/v1/report/groups-rank-members?official=1`)
        yield put(actions.setGroupsOfficial(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchFilterProvincesSaga() {
    try {
        const getZoneId = state => state.report.filters
        const { zoneId } = yield select(getZoneId)
        const response = yield callGet(`${hostReport}/api/v1/report/filter-province-by-zone/${zoneId}`)
        yield put(actions.setFilterProvinces(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchFilterDistrictsSaga() {
    try {
        const getProvinceId = state => state.report.filters
        const { provinceId } = yield select(getProvinceId)
        const response = yield callGet(`${hostReport}/api/v1/report/filter-district-by-province/${provinceId}`)
        yield put(actions.setFilterDistricts(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

function* fetchFilterSubdistrictsSaga() {
    try {
        const getDistrictId = state => state.report.filters
        const { districtId } = yield select(getDistrictId)
        const response = yield callGet(`${hostReport}/api/v1/report/filter-subdistrict-by-district/${districtId}`)
        yield put(actions.setFilterSubdistricts(response))
    }catch(error) {
        yield put(actions.setError(error))
    }
}

const ReportSaga = function* () {
    yield takeLatest(actions.fetchSumMembers.type, fetchSumMembersSaga)
    yield takeLatest(actions.fetchSumGroups.type, fetchSumGroupsSaga)
    yield takeLatest(actions.fetchSumRegisterZone.type, fetchSumRegisterZoneSaga)
    yield takeLatest(actions.fetchSumRegisterProvinces.type, fetchSumRegisterProvincesSaga)
    yield takeLatest(actions.fetchSumTransExercies.type, fetchSumTransExerciesSaga)
    yield takeLatest(actions.fetchSumTypeExercies.type, fetchSumTypeExerciesSaga)
    yield takeLatest(actions.fetchSumMembersDesc.type, fetchSumMembersDescSaga)
    yield takeLatest(actions.fetchFilterZone.type, fetchFilterZoneSaga)
    yield takeLatest(actions.fetchFilterProvinces.type, fetchFilterProvincesSaga)
    yield takeLatest(actions.fetchFilterDistricts.type, fetchFilterDistrictsSaga)
    yield takeLatest(actions.fetchFilterSubdistricts.type, fetchFilterSubdistrictsSaga)
    yield takeLatest(actions.fetchGroupsRanking.type, fetchGroupsRankingSaga)
    yield takeLatest(actions.fetchGroupsOfficial.type, fetchGroupsOfficialSaga)
    yield takeLatest(actions.fetchSumMaps.type, fetchSumMapsSaga)
    yield takeLatest(actions.fetchSumGraphs.type, fetchSumGraphsSaga)
    yield takeLatest(actions.fetchSumLungsh.type, fetchSumLungshSaga)
}
export default ReportSaga