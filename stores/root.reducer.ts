import { combineReducers } from 'redux'
import authenReducer, { IAuthenState } from './authen/authen.reducer'
import generalReducer, { IGeneralState } from './general/general.reducer'
import registerReducer, { IRegisterState } from './register/register.reducer'
import profileReducer, { IProfileState } from './profile/profile.reducer'
import homeReducer, { IHomeState } from './home/home.reducer'
import communitiesReducer, { ICommunitiesState } from "./communities/communities.reducer"
import bmiReducer, { IBMIState } from './bmi/bmi.reducer'
import achievementReducer, { IAchievementState } from './achievements/achievements.reducer'
import healthReducer, { IHealthState } from './health/health.reducer'
import masterReducer, { IMasterState } from './master/master.reducer'
import resultReducer, { IResultState } from "./result/result.reducer";
import transactionReducer, { ITransactionState } from './transaction/transaction.reducer'
import reportReducer, { IReportState } from './report/report.reducer'

// ----------------------------- Application

// ----------------------------- Application

export const rootPersist = ["authenReducer", "generalReducer"];
export const authenPersist = ["authenReducer"];

export interface IStates {
    authenReducer: IAuthenState;
    generalReducer: IGeneralState;
    registerReducer: IRegisterState;
    profileReducer: IProfileState;
    homeReducer: IHomeState;
    communitiesReducer: ICommunitiesState;
    bmiReducer: IBMIState;
    achievementReducer: IAchievementState;
    healthReducer: IHealthState,
    resultReducer: IResultState;
    masterReducer: IMasterState;
    transactionReducer: ITransactionState;
    reportReducer: IReportState;
}

export default combineReducers({
    authenReducer,
    generalReducer,
    registerReducer,
    profileReducer,
    homeReducer,
    communitiesReducer,
    bmiReducer,
    achievementReducer: achievementReducer,
    healthReducer,
    resultReducer,
    masterReducer,
    transactionReducer,
    reportReducer,
});
