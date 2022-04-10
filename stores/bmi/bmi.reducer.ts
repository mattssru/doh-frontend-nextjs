import moment, { Moment } from "moment";
import { IActionReducer } from "services/action.reducer";
import { BMIActions } from "./bmi.action";
import { ICreateBMIRes, IFetchBMIRes } from "./bmi.saga";

const BMIState: IBMIState = {
    height: 0,
    weight: 0,
    getBmi: 0.00,
    created_at: null,
    created_at_new: null
}

export interface IBMIState {
    height: number,
    weight: number,
    getBmi: number,
    created_at: Moment | null,
    created_at_new: Moment | null
}

export interface ICreateBMI {
    height: number,
    weight: number,
    getBmi: number,
    user_id: number
}

const bmiReducer = (state = BMIState, e: IActionReducer) => {
    switch (e.type) {
        case BMIActions.BMI_SAVE_S: {
            try {
                const { payload }: { payload: ICreateBMIRes } = e
                return {
                    ...state,
                    bmiResponse: payload
                }
            } catch (error) {
                console.error(error)
            }
            return {...state}
        }
        case BMIActions.FETCH_BMI_S: {
            try {
                const { payload }: { payload: IFetchBMIRes } = e
                return {
                    ...state,
                    created_at: !!payload.created_at ? moment(payload.created_at) : null,
                    created_at_new: !!payload.created_at_new ? moment(payload.created_at_new) : null
                }
            } catch (error) {
                console.error(error)
            }
            return {...state}
        }
        default:
            return state;
    }
}

export default bmiReducer;