import React from 'react';
import styled from 'styled-components';
import {font,color} from 'styles/__utils';
import {Link} from 'react-router-dom';
import {
  floatClear,
  positionHeightCenter} from 'styles/__utils';

function PlainFooter(props) {
  return (
    <Styled.Footer>
      <div className="footer__con">
        <div className="footer__box link bold">
          <Link to="/">이용 약관</Link>
        </div>
        <div className="footer__box link bold">
          <Link to="/">개인정보 처리방침</Link>
        </div>
        <div className="footer__box copyright">
          Copyright © DOF Inc. All rights reserved.
        </div>
      </div>
      
    </Styled.Footer>
  );
}

const Styled={
  Footer:styled.div`
    font-size:14px;
    color:#777;
    width:100%;
    text-align:center;
    .footer__con{
      ${floatClear}
      display:inline-block;
    }
    .footer__box{
      position: relative;
      float:left;
      margin-right:10px;
      padding-right:10px;
      ${font(12,color.black_font)};
      &:after{
        ${positionHeightCenter}
        content:'';
        width:1px;
        height:14px;
        right:0;
        background:#C4C4C4;
      }
      &:last-child{
        margin-right:0;
        padding-right:0;
      }
      &:last-child:after{
        display:none
      }
      &.link:hover{
        text-decoration:underline;
      }
      &.bold{
        font-weight:bold;
      }
      &.copyright{
        color:${color.gray_font};
      }
    }
  `
}

export default PlainFooter;