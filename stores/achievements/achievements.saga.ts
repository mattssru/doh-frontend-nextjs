import { IRes } from 'interfaces';
import { put, takeLatest } from 'redux-saga/effects';
import { ActionReducer } from 'services/action.reducer';
import { IActionSaga } from 'services/action.saga';
import { callGet } from 'services/api.services';

import { AchievementActions } from './achievements.action';
import { IAward } from './achievements.reducer';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL_NEST_TRANSACTION}`

function* fetchAward(e: IActionSaga) {
    try {
        const response: { data: IRes<IAward[]> } = yield callGet(`${baseUrl}/api/v1/transaction/achievement`)
        yield put(
            ActionReducer({
                type: AchievementActions.FETCH_AWARD_S,
                payload: response.data.data
            })
        )
        e.onSuccess(e)
    } catch (error) {
        yield put(
            ActionReducer({
                type: AchievementActions.FETCH_AWARD_S,
                payload: error
            })
        )
        e.onFailure(error)
    }
}

export default [
    takeLatest(AchievementActions.FETCH_AWARD_R, (e: IActionSaga) => fetchAward(e))
]