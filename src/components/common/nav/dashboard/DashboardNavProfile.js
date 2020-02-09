import React from 'react';
import styled from 'styled-components';
import {icon_alert,icon_unlogged_person} from 'components/base/images';
import { color, font } from 'styles/__utils';

function makeConnectView(state){
  return Array(state).fill(1).map((item,idx)=>{
    return <span key={idx} className="connect__ball"></span>
  })
}

function DashboardNavProfile(props) {
  let { title, email, connectState, image, alert,isConnect } = props;
  const alertIcon = alert && <span className="alert_icon">
    <img src={icon_alert} alt="alert icon"/>
  </span>;
  const profileImage = image ?image:icon_unlogged_person;
  const connectObj = {
    '1':1,
    "2":2,
    "3":3,
    "4":4
  }
  let connectView = connectObj[connectState];
  if(!connectView){
    connectView = null
  }else{
    if(!isConnect) connectState = 4;
    connectView = makeConnectView(connectState);
  }
  
  
  return (
    <Styled.DashboardNavProfile {...props}>
      <div className="profile__info row">
        <div className="profile__info_box">
          {alertIcon}
          <div className="profile__info img_con">
            <img src={profileImage} alt="profile imgage" className="profile__info img" />
          </div>
        </div>
      </div>
      <div className="profile__info row">
        <div className="profile__info text_box title">
          {title}
        </div>
        <address className="profile__info text_box email">
          {email}
        </address>
        <div className="profile__info text_box connect">
        {isConnect ? `on-line` : 'off-line'} {connectView}
        </div>
      </div>
    </Styled.DashboardNavProfile>
  );
}

const Styled = {
  DashboardNavProfile: styled.div`
    .profile__info{
      .connect__ball{
        display:inline-block;
        background:${({isConnect})=>isConnect? `green`: `gray`};
        width:10px;
        height:10px;
        border-radius:100%;
        margin-right:2px;
      }
      .profile__info_box{
        position:relative;
        /* border:1px solid red; */
        width:100px;
        margin:auto;
      }
      .alert_icon{
        position:absolute;
        right:-10px;
        top:-10px;
        width:20px;
        height:20px;
      }
      &.row:last-child{
        margin-top:20px;
        text-align:center;
      }
      &.text_box{
        margin-top:5px;
      }
      &.img_con{
        height:100px;
        overflow:hidden;
        border-radius:100%;
      }
      &.img{
        width:100%;
      }
      &.title{
        ${font(16,color.black)}
      }
      &.email{
        ${font(12,color.grayFont)}
      }
      &.connect{
        ${font(12,color.black)}
      }
      
    }
  `
}
export default DashboardNavProfile;