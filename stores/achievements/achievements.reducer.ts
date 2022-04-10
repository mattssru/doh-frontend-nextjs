import { IActionReducer } from "services/action.reducer"
import { AchievementActions } from "./achievements.action";

export interface IAward {
    id: number
    thumbnail: string
    title: string
    detail: string
    condition: number
    created_at: string
    created_by: number
    updated_at: string | null
    updated_by: number | null
    status_pass: number
}

export interface IAchievementState {
    awardList: Array<IAward>
}

const AwardState: IAchievementState = {
    awardList: []
}

const achievementReducer = (state = AwardState, e: IActionReducer):IAchievementState => {
    switch (e.type) {
        case AchievementActions.FETCH_AWARD_S: {
            try {
                const { payload }: { payload: IAward[] } = e
                return {
                    ...state,
                    awardList: payload
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

export default achievementReducer