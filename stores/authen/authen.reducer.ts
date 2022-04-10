import { IActionReducer } from "services/action.reducer";
import { AuthenAction } from "./authen.action";
import authService from "services/auth.service";
import router from "next/router";

export interface IAuthenState {
  isLoggedIn: boolean;
  token: string | undefined;
  resLogin: any;
  noToken: false;
  resForgot: any;
  resQA: any;
}
const AuthenState = {
  isLoggedIn: false, // true Login แล้ว
  token: undefined, // token ที่ได้หลังจาก Login
  resLogin: {},
  noToken: false,
  resForgot: {},
  resQA: {},
} as IAuthenState;

const authenReducer = (state = AuthenState, e: IActionReducer) => {
  switch (e.type) {
    case AuthenAction.AUTHEN_LOGIN_S: {
      const { status, data } = e.payload;
      if (status === 201) {
        if (data?.accessToken) {
          authService.setAuthorization(data?.accessToken);
          const resLogin = {
            userInfo: data?.userInfo,
            status: status,
            message: "เข้าสู่ระบบสำเร็จ",
            isLoggedIn: true,
          };
          return {
            ...state,
            isLoggedIn: true,
            token: data?.accessToken,
            resLogin: resLogin.userInfo,
            noToken: false,
          };
        } else {
          // router.push({
          //   pathname: "/forgotpassword",
          //   query: { secret: data?.secret },
          // });
          return {
            ...state,
            isLoggedIn: true,
            token: data?.accessToken,
            resLogin: "รหัสผ่านผิด",
            noToken: false,
          };
        }
      }
      // else if (status === 400) {
      //   console.log('login, ', data)
      // }
      else {
        return {
          ...state,
          isLoggedIn: false,
          token: undefined,
          resLogin: undefined,
          noToken: false,
        };
      }
    }
    case AuthenAction.RESET_LOGIN_S: {
      return {
        ...state,
        isLoggedIn: false,
        resLogin: {},
        token: undefined,
        noToken: false,
        resForgot: {},
      };
    }
    case AuthenAction.LOGIN_TOKEN_S: {
      const { data } = e.payload;
      console.log("reducer, ", data);
      if (data?.status === 200) {
        return {
          ...state,
          isLoggedIn: true,
          resLogin: data?.data,
          noToken: false,
        };
      }
      return { ...state };
    }
    case AuthenAction.LOGIN_FAIL_S: {
      const resErr = { message: e.payload.message, status: e.payload.status };
      return { ...state, isLoggedIn: false, resLogin: resErr, noToken: false };
    }
    case AuthenAction.AUTHEN_LOGOUT_S: {
      authService.removeAuthorization();
      try {
        //const { data } = e.payload;
        router.replace(`${process.env.NEXT_PUBLIC_HOST}/login`);
        {/*
        if (data.url) {
          router.push(`${data.url}`);
        }
        else {
          router.push('login');
        }
        */}
      } catch {
        router.push('login');
      }
      return {
        ...state,
        isLoggedIn: false,
        resLogin: {},
        token: undefined,
        noToken: false,
        resForgot: {},
      };
    }
    case AuthenAction.FORGOT_PASSWORD_S: {
      const payload = e.payload;
      if (payload.statusCode === 201) {
        const resForgot = {
          status: payload.statusCode,
          token: payload.data.token,
          message: payload.message,
        };

        return { ...state, resForgot: resForgot };
      } else {
        const resForgot = {
          status: payload.statusCode,
          message: payload.message,
        };
        return { ...state, resForgot: resForgot };
      }
      return { ...state };
    }
    case AuthenAction.QUIZ_LIST_S: {
      const { status, data } = e.payload;
      if (status === 201) {
        return { ...state, resForgot: data };
      }
      return { ...state };
    }
    case AuthenAction.QA_S: {
      const payload = e.payload;

      if (payload?.status === 201) {
        return { ...state, resQA: payload };
      } else if (payload?.statusCode === 400) {
        if (payload.message === "Token ที่ใช้งานไม่ถูกต้อง") {
          return {
            ...state,
            resQA: {
              status: 401,
              message: "หมดเวลาทำการ กรุณาลองใหม่อีกครั้ง",
            },
          };
        } else {
          return {
            ...state,
            resQA: { status: payload.statusCode, message: payload.message },
          };
        }
      }
      return { ...state };
    }
    case AuthenAction.LOGIN_LINE_S: {
      const { accessToken } = e.payload;
      authService.setAuthorization(accessToken);
      const resLogin = {
        userInfo: {},
        status: 201,
        message: "เข้าสู่ระบบสำเร็จ",
      };
      router.push({
        pathname: '/'
      })
      return {
        ...state,
        isLoggedIn: true,
        token: accessToken,
        resLogin: resLogin.userInfo,
        noToken: false,
      };
      // const { status, data } = e.payload;
      // if (status === 201) {
      //   if (data?.accessToken) {
      //     authService.setAuthorization(data?.accessToken);
      //     const resLogin = {
      //       userInfo: data?.userInfo,
      //       status: status,
      //       message: "เข้าสู่ระบบสำเร็จ",
      //     };
      //     router.push({
      //       pathname: "/",
      //       // query: { secret: data?.secret },
      //     });
      //     return {
      //       ...state,
      //       isLoggedIn: true,
      //       token: data?.accessToken,
      //       resLogin: resLogin.userInfo,
      //       noToken: false,
      //     };
      //   } else {
      //     // router.push({
      //     //   pathname: "/forgotpassword",
      //     //   query: { secret: data?.secret },
      //     // });
      //     return {
      //       ...state,
      //       isLoggedIn: false,
      //       token: undefined,
      //       resLogin: undefined,
      //       noToken: true,
      //     };
      //   }
      // } else {
      //   return {
      //     ...state,
      //     isLoggedIn: false,
      //     token: undefined,
      //     resLogin: undefined,
      //     noToken: false,
      //   };
      // }
    } case AuthenAction.FROM_LINE_S: {
      const { status, data } = e.payload;
      if (status === 201) {
        if (data?.accessToken) {
          authService.setAuthorization(data?.accessToken);
          const resLogin = {
            userInfo: data?.userInfo,
            status: status,
            message: "เข้าสู่ระบบสำเร็จ",
          };
          return {
            ...state,
            isLoggedIn: true,
            token: data?.accessToken,
            resLogin: resLogin.userInfo,
            noToken: false,
          };
        } else {
          return {
            ...state,
            isLoggedIn: false,
            token: undefined,
            resLogin: undefined,
            noToken: true,
          };
        }
      } else {
        return {
          ...state,
          isLoggedIn: false,
          token: undefined,
          resLogin: undefined,
          noToken: false,
        };
      }
    }
    default: {
      return state;
    }
  }
};

export default authenReducer;
