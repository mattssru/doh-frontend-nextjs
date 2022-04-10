import { IRes } from "interfaces"
import { put, takeLatest } from "redux-saga/effects"
import { ActionReducer } from "services/action.reducer"
import { IActionSaga } from "services/action.saga"
import { callGet } from "services/api.services"
import { TransactionAction } from "./transaction.action"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL_NEST_TRANSACTION}`

interface IFetchEventExp {
    total_point: number
}

function* fetchEventExp (e: IActionSaga) {
    const {payload}: {payload: IFetchEventExp} = e
    try {
        const response: { data: IRes<IFetchEventExp>} = yield callGet(`${baseUrl}/api/v1/transaction/hp-services/exp-alike`, payload)
        yield put(
            ActionReducer({
                type: TransactionAction.FETCH_EVENT_EXP_S,
                payload: response.data.data
            })
        )
        e.onSuccess(e)
    } catch (error) {
        yield put(
            ActionReducer({
                type: TransactionAction.FETCH_EVENT_EXP_S,
                payload: error
            })
        )
        e.onFailure(error)
    }
}

export default [
    takeLatest(TransactionAction.FETCH_EVENT_EXP_R, (e: IActionSaga) => fetchEventExp(e))
]