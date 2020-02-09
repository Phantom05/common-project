
import {api_address} from 'lib/setting';
import _ from 'lodash';
import axios from 'axios';
import {Actions} from 'store/actionCreators';
const endPoint={
  post_signin:'/auth/launcher/login',
  post_signout:'/auth/launcher/logout',
  post_token:'/auth/launcher/token',
  post_signup:'/auth/launcher/user/signup',
  post_signup_verify_email:`/auth/launcher/verify/email`,
  post_signup_verify_code:`/auth/launcher/verify/code`,
  post_mypage_info: '/users/launcher/my/information',
  post_mypage_update_info: '/users/launcher/my/information/update',
  post_mypage_partner: '/users/launcher/my/partner',
  post_reset_verify_email:`/auth/launcher/user/verifyCode`,
  post_reset_password: '/auth/launcher/password/change',
  post_listing_country:`/list/launcher/country/list`,
  post_listing_location:`/list/launcher/location/list`,
  post_listing_case_load:`/list/launcher/case/load/list`,
  post_listing_partners_list:`/list/launcher/partners/list`,
  post_listing_partners_search_list:`/list/launcher/partners/list/search`,
  post_listing_partners_type_list:`/list/launcher/partners/list/type`,
  post_info_case_create:`/case/launcher/create/case`,
  post_info_case_list_count:`/case/launcher/count/case`,
  post_info_case_load:`/case/launcher/api/case/load/detail`,
  
}
for(const keyName in endPoint){
  const value = endPoint[keyName];
  endPoint[keyName] = api_address + value
}


/**
 * 
 * @param {*} axiosConf object
 * 통신할때 필요한 axios의 config 값을 넣어줍니다.
 * @param {*} config object
 * {header:false} 라고 할 시 header 체크를 하지 않습니다.
 */
function Acx(axiosConf,config = {}){
    const defaultConfig = {header:true};
    const mergeConfig = _.merge(defaultConfig,config);
    const {header} = mergeConfig;
    if(header){
      return axios(axiosConf).catch(err=>({error:err})).then(res=>{
        const {data} = res;
        if(data.headers && data.headers.isNetworkConnect != null){
          Actions.base_network_connect({value:data.headers.isNetworkConnect}); 
        }
        
        return res;
      });
    }else{
      return axios(axiosConf)
      .catch(err=>({error:err}));
    }
  }



/**
 * 
 * @param {*} payload object
 */
export function postSignin(payload){
  console.log(`api : post signin`,payload);
  const axiosConf={
    url:endPoint.post_signin,
    method:'post',
    data:payload
  }
  return Acx(axiosConf)
}

/**
 * 
 */
export function postSignOut(){
  console.log(`api : signout`);
  const axiosConf={
    url:endPoint.post_signout,
    method:'post',
  }
  return Acx(axiosConf)
}

/**
 * 
 * @param {*} payload object
 */
export function postToken(payload){
  const axiosConf={
    url:endPoint.post_token,
    method:'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload obejct
 */
export function postSignUp(payload){
  console.log('api post Signup');
  const axiosConf={
    url:endPoint.post_signup,
    method:'post',
    data:payload
  }
  return Acx(axiosConf)
}
/**
 * 
 * @param {*} payload object
 */
export function postGetMyInfo(payload){
  console.log(`api: post my info : ${payload}`);
  const axiosConf={
    url: endPoint.post_mypage_info,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload object 
 */
export function postUpdateMyInfo(payload){
  console.log(`api: post update my info : ${payload}`);
  const axiosConf={
    url: endPoint.post_mypage_update_info,
    method: 'post',
    data: payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload object
 */
export function postGetPartnerInfo(payload){
  console.log(`api: post my partners : ${payload}`);
  const axiosConf={
    url: endPoint.post_mypage_partner,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf)
}

/**
 * 
 * @param {*} payload 
 * 회원가입 인증코드 확인 요청
 */
export function postVerifyCode(payload){
  console.log('api post Signup');
  const axiosConf={
    url:endPoint.post_signup_verify_code,
    method:'post',
    data:payload
  }
  return Acx(axiosConf)

}

/**
 * 
 * @param {*} payload object 
 * 패스워드 변경 요청
 */
export function postResetPassword(payload){
  console.log(`api: post reset password : ${JSON.stringify(payload)}`);
  const axiosConf={
    url: endPoint.post_reset_password,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload object 
 * 인증코드 이메일 전송 요청
 */
export function postVerifyEmail(payload){
  console.log(`api: post verify email : ${payload}`);
  const axiosConf={
    url: endPoint.post_reset_verify_email,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 인증코드 이메일 전송 요청
 */
export function postSignUpVerifyEmail(payload){
  console.log(`api: post verify email : ${payload}`);
  const axiosConf={
    url: endPoint.post_signup_verify_email,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postGetCountryList(payload){
  const axiosConf={
    url: endPoint.post_listing_country,
    method: 'get',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postGetLocationList(payload){
  const axiosConf={
    url: endPoint.post_listing_location,
    method: 'post',
    data:{
      locationReq:payload
    }
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postGetCaseList(payload){
  const axiosConf={
    url: endPoint.post_listing_case_load,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postCreateCase(payload){
  const axiosConf={
    url: endPoint.post_info_case_create,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 케이스 리스트 갯수
 */
export function postGetCaseListCount(payload){
  const axiosConf={
    url: endPoint.post_info_case_list_count,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}


/**
 * 
 * @param {*} payload 
 * 파트너 리스트 정보
 */
export function postGetPartnersList(payload){
  const axiosConf={
    url: endPoint.post_listing_partners_list,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 파트너 리스트 정보 검색
 */
export function postGetPartnersSearchList(payload){
  const axiosConf={
    url: endPoint.post_listing_partners_search_list,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 파트너 타입 리스트
 */
export function postGetPartnersTypeList(payload){
  const axiosConf={
    url: endPoint.post_listing_partners_type_list,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

export function postGetCaseLoad(payload){
  const axiosConf={
    url: endPoint.post_info_case_load,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}


/**
 * Test
 * @param {*} payload 
 */
export function getTest(payload){
  const axiosConf={
    url:`https://jsonplaceholder.typicode.com/todos/1`
  }
  return Acx(axiosConf);
}