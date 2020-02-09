import {handleActions} from 'redux-actions';
import * as actions from 'store/actions';
// import produce from 'immer';

let initialState={
  landing:true,
  error:{
    loading:false,
    message:null
  },
  isNetworkConnect:true,
  wsConnect:false,
  blocking:false,
  socket:null,
}


  

console.log(actions.BASE_NETWORK_CONNECT);
export default handleActions({
  // [actions.BASE_EXIT_LANDING]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     draft.landing = false;
  //   })
  // },
  // [actions.BASE_ENTER_LANDING]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     draft.landing = true;
  //   })
  // },
  // // NETWORK
  // [actions.BASE_NETWORK_CONNECT]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     draft.isNetworkConnect = diff.value;
  //   })
  // },

  
  // [actions.WS_CONNECTED]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_CONNECTED');
  //     draft.wsConnect = true;
  //     draft.socket = diff;
  //   })
  // },
  // [actions.WS_BLOCKING]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_BLOCKING');
  //     draft.blocking = true;
  //   })
  // },
  // [actions.WS_UNBLOCKING]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_UNBLOCKING');
  //     draft.blocking = false;
  //   })
  // },
  // [actions.WS_DISCONNECTED]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_DISCONNECTED');
  //     draft.wsConnect =false;
  //     draft.blocking = true;
  //   })
  // },
  // [actions.WS_ERRORED]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_ERRORED');
  //     draft.wsConnect =false;
  //     draft.blocking = true;
  //     draft.error = true;
  //   })
  // },
  
},initialState)

