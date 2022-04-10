import { IActionReducer } from "services/action.reducer";
import { RegisterAction } from "./register.action";

const RegisterState = {
  provinceList: {},
  currentAList: {},
  currentTList: {},
  homeAList: {},
  homeTList: {},
  userTypeList: {},
  registerResponse: {},
  updateStatus: false,
};

export interface IRegisterState {
  provinceList: any;
  currentAList: any;
  currentTList: any;
  homeAList: any;
  homeTList: any;
  userTypeList: any;
  registerResponse: any;
  updateStatus: boolean;
}

const registerReducer = (state = RegisterState, e: IActionReducer) => {
  switch (e.type) {
    case RegisterAction.PROVINCE_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            provinceList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case RegisterAction.CURRENT_A_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            currentAList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case RegisterAction.CURRENT_T_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            currentTList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case RegisterAction.HOME_A_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            homeAList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case RegisterAction.HOME_T_LIST_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            homeTList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case RegisterAction.USER_TYPE_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          return {
            ...state,
            userTypeList: payload.data.data,
          };
        }
      } catch (error) {
        console.log(error);
      }
      return { ...state };
    }
    case RegisterAction.REGISTER_S: {
      try {
        const { payload } = e;
        if (!payload || payload !== null) {
          if (payload?.status === 400) {
            const response = {
              status: payload?.status,
              message: payload?.message,
            };
            return {
              ...state,
              registerResponse: response,
            };
          } else if (payload?.status === 200) {
            const response = {
              status: payload?.status,
              message: "ลงทะเบียนสำเร็จ",
            };
            return {
              ...state,
              registerResponse: response,
            };
          } else if (payload?.status === 500) {
            const response = {
              status: payload?.status,
              message: "ลงทะเบียนสำเร็จ",
            };
            return {
              ...state,
              registerResponse: response,
            };
          } else {
            const response = {
              status: 400,
              message: "ลงทะเบียนไม่สำเร็จ",
            };
            return {
              ...state,
              registerResponse: response,
            };
          }
        }
      } catch (error) {
        const response = {
          status: 400,
          message: "ลงทะเบียนไม่สำเร็จ",
        };
        return {
          ...state,
          registerResponse: response,
        };
      }
      return { ...state };
    }

    case RegisterAction.UPDATE_PROFILE_S: {
      try {
        const { payload } = e;
        if (payload.status === 200) {
          return { ...state, updateStatus: true };
        } else if (payload.status === 204) {
          return { ...state, updateStatus: false };
        }
      } catch (err) {
        return { ...state, updateStatus: false };
      }
      return state;
    }
    case RegisterAction.UPDATE_PASSWORD_S: {
      try {
        const { payload } = e;
        if (payload.status === 201) {
          return { ...state, updateStatus: true };
        } else if (payload.status === 204) {
          return { ...state, updateStatus: false };
        }
      } catch (err) {
        return { ...state, updateStatus: false };
      }
      return state;
    }
    case RegisterAction.RESET_REGISTER_S: {
      try {
        const { payload } = e;
        console.log(payload)
        return { ...state, registerResponse: {} }
      } catch (err) {
        console.log(err)
      }
      return state;
    }
    default:
      return state;
  }
};

export default registerReducer;
