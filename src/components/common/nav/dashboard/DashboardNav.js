import React from 'react';
import {  NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardNavProfile } from 'components/common/nav';
import { device } from 'styles/__utils';
import { color, font } from 'styles/__utils';
import cx from 'classnames';
import {useImmer} from 'use-immer';
import {
  icon_case_teeth,
  icon_mypage_person,
  icon_works_box,
  icon_alert_big} 
from  'components/base/images';

const menuList = [
  {
    id:0,
    title:'Home',
    icon:icon_case_teeth,
    link:'/home',
    hidden:true
  },
  {
    id:1,
    title:'Case',
    icon:icon_case_teeth,
    link:'/case',
    hidden:false
  },
  {
    id:2,
    title:'Works',
    icon:icon_works_box,
    link:'/works',
    hidden:false
  },
  {
    id:3,
    title:'Message',
    icon:icon_alert_big,
    link:'/alert/list',
    hidden:false
  },
  {
    id:4,
    title:'My Page',
    icon:icon_mypage_person,
    link:'/mypage',
    hidden:false
  },
];

function DashboardNav(props) {
  const [navList] = useImmer(menuList);
  const {profile,info} =props;
  return (
    <Styled.DashboardNav>
      <DashboardNavProfile
        image={null}
        title={profile.company?profile.company:profile.name}
        email={profile.email}
        connectState={4}
        isConnect={info.isNetworkConnect}
        alert={true}
      />

      <div className="DashboardNav__link_con">
        {navList.map(item=>{
          return <div className={cx('DashboardNav__link box',{hidden:item.hidden})} key={item.id}>
          <NavLink to={item.link} className="DashboardNav__link an">
            <span className="DashboardNav_icon_box DashboardNav_item_box">
              <img src={item.icon} alt="nav icon" className="DashboardNav_icon"/>
            </span>
          <span className="DashboardNav__text DashboardNav_item_box">{item.title}</span>
          </NavLink>
          </div>
        })}


      </div>

      <div className="DashboardNav__link box logout">
        <NavLink to="/auth/signout" className="DashboardNav__link an" >Logout</NavLink>    
      </div>
      
    </Styled.DashboardNav>
  );
}

const Styled = {
  DashboardNav: styled.nav`
    position:relative;
    width:220px;
    min-height:100vh;
    padding-top:50px;
    background:white;
    .DashboardNav__link{
      display:block;
      padding:0 10px;
      &.hidden{
        display:none;
      }
      &.logout{
        position:absolute;
        bottom:10px;
        left:50%;
        transform:translateX(-50%);
        width:100px;
        border-radius:30px;
        border:2px solid ${color.blue};
        &  a{
          padding:7px 15px;
          ${font(14,color.black)};
          font-weight:500;
          
        }
      }
    }
    .DashboardNav__link_con{
      margin-top:40px;
    }
    .DashboardNav__link.an{
      position: relative;
      padding:15px;
      overflow: hidden;
      &.active{
        &:after{
          position:absolute;
          content:"";
          display:block;
          clear: both;
          left:0;
          top:0;
          width:5px;
          height:100%;
          background:${color.blue_week};
        }
        background:${color.blue_week_hover}
      }
    }
    .DashboardNav_icon_box{
      display:inline-block;
      width:40px;
      height:36px;
      margin-right:15px;
    }
    .DashboardNav_icon{
      display:inline-block;
      width:100%;
      height:100%;
    }
    .DashboardNav__text{
      position:relative;
      ${font(20,color.black)};
      top:8px;
    }
    .DashboardNav_item_box{
      float:left;
    }
    
    
    @media screen and (max-width:${device.pc}){
      /* width:100vh; */
    }
  `
}

export default DashboardNav;