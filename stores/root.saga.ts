import { all } from 'redux-saga/effects'

// ------------------------- Application
import authenSaga from './authen/authen.saga';
import registerSaga from './register/register.saga'
import profileSaga from './profile/profile.saga';
import homeSaga from './home/home.saga';
import CommunitiesSaga from "./communities/communities.saga";
import MasterSaga from './master/master.saga';
import bmiSaga from './bmi/bmi.saga';
import achievementsSaga from './achievements/achievements.saga';
import healthSaga from './health/health.saga';
import ResultSaga from "./result/result.saga";
import ReportSaga from "./report/report.saga";

// ------------------------- Application

export default function* rootSaga() {
    yield all([
        ...authenSaga,
        ...registerSaga,
        ...profileSaga,
        ...homeSaga,
        ...CommunitiesSaga,
        ...bmiSaga,
        ...achievementsSaga,
        ...healthSaga,
        ...ResultSaga,
        ...MasterSaga,
        ...ReportSaga,
    ])
}