/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.userReducer.userData);
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then(response => {
        //Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            // props.history.push('/login');
            window.location.replace("/login");
          }
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !response.payload.isAdmin) {
            window.location.replace("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              window.location.replace("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
