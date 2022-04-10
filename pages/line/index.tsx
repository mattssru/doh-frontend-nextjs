import React, { useEffect } from "react";

import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { AuthenAction } from "stores/authen/authen.action";
import { IStates } from "stores/root.reducer";



const LevelPage = () => {
  const { lineToken,
    verifySelf,
    // page
  } = router.query;
  const { isLoggedIn } = useSelector((state: IStates) => state.authenReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (verifySelf === '1') {
      if (lineToken !== undefined && lineToken !== '') {
        dispatch(
          ActionSaga({
            type: AuthenAction.FROM_LINE_R,
            payload: { line_token: lineToken }
          })
        );
      }
    } else {
      // router.push({
      //   pathname:"/login",
      //   query: {lineToken: lineToken, verifySelf: 0}
      // })
    }
  }, [verifySelf])
  useEffect(() => {
    console.log('resLogin', isLoggedIn)

    // if (isLoggedIn) {
    //   if (page === 'community') {
    //     router.push('/community')
    //   } else if (page === 'reward') {
    //     router.push('/health-point/redemption')
    //   } else {
    //     router.push('/')
    //   }
    // }
  }, [isLoggedIn])
  return (
    <div>
      {/* <button onClick={testLocal}> clear local</button>
      {test?.toString()} */}
    </div>
  );
};


export default LevelPage;
