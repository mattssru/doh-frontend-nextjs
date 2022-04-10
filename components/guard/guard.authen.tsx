import authService from 'services/auth.service';
import { useSelector } from 'react-redux';
import { IStates } from 'stores/root.reducer';
import Router from 'next/router'

const AuthGuard = (props: any) => {
    const { children } = props;
    const { token } = useSelector((state:IStates) => state.authenReducer)
    
    const isAuthen = authService.isValidToken(token)
   
    if(isAuthen === false) {
        // window.location.href = `${window.location.origin}/login`
        Router.push('/login')
    }
    return children
}

export default AuthGuard
