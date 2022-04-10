import { IActionReducer } from "services/action.reducer"
import { GeneralAction } from "./general.action";

export interface IGeneralState {
    language: string;
    userInfo: {};
}
const GeneralState = {
    language: 'th', // ภาษาของระบบ
    userInfo: {} // ข้อมูลผู้ใช้งานระบบ
} as IGeneralState

const gerneralReducer  = (state = GeneralState, e: IActionReducer): IGeneralState => {
    switch (e.type) {

        case GeneralAction.GENERAL_TOKEN_S: {
            const userInfo = e.payload.userInfo;
            return { ...state, userInfo: userInfo?.data?.result.data }
        }

        default:
            return state;
    }
}

export default gerneralReducer;