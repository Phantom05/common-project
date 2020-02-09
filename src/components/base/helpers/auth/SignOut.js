import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import {storage,keys} from 'lib/library';
import {withRouter,Redirect} from 'react-router-dom';
import {AUTH_SIGNOUT_SAGAS} from 'store/actions';
// import {Actions} from 'store/actionCreators'

function SignOut(props) {
  const {pending, success,failure} = useSelector(state=>state.auth.signOut)
  useEffect(()=>{
    AUTH_SIGNOUT_SAGAS()
    // Actions.auth_signout_request();
  },[]);
  if(pending){

  }
  if(success){
    // storage.clear();
    storage.remove(keys.token);
    storage.remove(keys.autoLogin);
    // props.history.goBack()
    return <Redirect to="/"/>
  }
  if(failure){

  }
  return null;
}

export default withRouter(SignOut);