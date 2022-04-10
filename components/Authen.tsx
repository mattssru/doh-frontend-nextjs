import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionSaga } from 'services/action.saga';
import authService from 'services/auth.service'
import { AuthenAction } from 'stores/authen/authen.action';
import Crypto from 'services/crypto';
// import SplashScreen from "components/SplashScreen";
import { IStates } from 'stores/root.reducer';
//import router from "next/router";


const Authen = (props: any) => {

  const { children } = props
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true);
  const { token: tokenStore } = useSelector((state: IStates) => state.authenReducer)
  useEffect(() => {
    //maintainance close
    //router.push({ pathname: "/redirect" });

    const initAuth = async () => {
      const onLogout = () => {

        return dispatch(ActionSaga({ type: AuthenAction.AUTHEN_LOGOUT_R, payload: {} }))
      }
      authService.setAxiosInterceptors({ onLogout })
      let token = tokenStore;
      const url = window.decodeURI(window.location.href);
      const isFormAuthen = url.startsWith(`${window.location.origin}/?i=`)
      if (isFormAuthen) {
        const tokenEncrypt = url.substring(url.indexOf('=') + 1);
        const tokenDecrypt = Crypto.decrypt(tokenEncrypt);
        token = tokenDecrypt;
      }
      if (authService.isValidToken(token)) {
        authService.setAuthorization(`${token}`)
        // dispatch(
        //   ActionSaga({
        //     type: AuthenAction.AUTHEN_TOKEN_R,
        //     payload: { token, isFormAuthen: true },

        //   }))
      }
      setLoading(false)
    }
    //initial Auth
    initAuth()

  }, [dispatch, tokenStore])


  if (isLoading) {
    // return <SplashScreen isLoading={isLoading}/>
  }

  return children
}
export default Authen