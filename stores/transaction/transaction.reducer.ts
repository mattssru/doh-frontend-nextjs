import { IActionReducer } from "services/action.reducer"
import { TransactionAction } from "./transaction.action"

interface IFetchEventExpRes {
    total_point: number
}

export interface ITransactionState {
    total_point: number
}
const TransactionState: ITransactionState = {
    total_point: 0
}

const transactionReducer = (state = TransactionState, e: IActionReducer) => {
    switch (e.type) {
        case TransactionAction.FETCH_EVENT_EXP_S: {
            try {
                const { payload }: {payload: IFetchEventExpRes} = e
                return {
                    ...state,
                    total_point: payload.total_point
                }
            } catch (error) {
                console.log(error)
            }
            return {...state}
        }
        default:
            return state;
    }
}

export default transactionReducer