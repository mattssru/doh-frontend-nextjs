import moment, { Moment } from "moment";
import { IActionReducer } from "services/action.reducer";
import { ProfileAction } from "./profile.action";

interface IBmi {
  bmiStatus: string;
  bmiDesc: string;
  bmi: number;
  height: number;
  weight: number;
  updateDate: Moment | null;
}

export interface IProfileState {
  profile: any;
  bmiList: Array<IBmi>;
}

const ProfileState: IProfileState = {
  profile: {},
  bmiList: [],
};

export default (state = ProfileState, e: IActionReducer) => {
  switch (e.type) {
    case ProfileAction.PROFILE_S: {
      const { status, data } = e.payload;
      if (status === 200) {
        const birthdate = moment(data.data.information.birth_date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').isValid()
          ? moment(data.data.information.birth_date, 'YYYY-MM-DDTHH:mm:ss.SSSSZ') 
          : moment(data.data.information.birth_date, 'DD/MM/YYYY')
        const bmiList = data.data.bmi_logs ? data.data.bmi_logs.map(
          (each: any) => ({
            bmiDesc: each.desDetail,
            bmi: each.BMI.split(' = ')[0],
            bmiStatus: each.BMI.split(' = ')[1],
            height: Number(each.height),
            weight: Number(each.weight),
            updateDate: moment(each.updated_date)
          })
        ) : []
        return {
          ...state,
          profile: {
            ...data?.data,
            date: birthdate.date(),
            month: birthdate.month() + 1,
            year: birthdate.year() + 543
          },
          bmiList
        }
      } else {
        return {
          ...state,
          profile: {},
        };
      }
    }
    default: {
      return state;
    }
  }
};
