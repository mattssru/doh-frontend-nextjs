import authService from 'services/auth.service';
import { useSelector } from 'react-redux';

import Router from 'next/router'
import { IStates } from 'stores/root.reducer';


const GuestGuard = (props: any) => {

    const { children } = props
    const { token } = useSelector((state: IStates) => state.authenReducer)

    const isAuthen = authService.isValidToken(token)
    if(isAuthen) {
        Router.replace('/')
    }

    return children
}

export default GuestGuard
