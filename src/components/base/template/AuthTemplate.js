import React from 'react';
import styled from 'styled-components';
import {
  positionCenterCenter,
  positionWidthCenter} from 'styles/__utils';
/**
 * 
 * @param {*} param0 ReactElement
 */
function AuthTemplate({children = null,footer=null,header=null}) {
  return (
    <Stlyed.AuthTemplate>
      <div className="auth__section">
        {children}
      </div>
      {footer && 
      <div className="auth__footer"> {footer} </div>}
      
    </Stlyed.AuthTemplate>
  );
}

const Stlyed ={
  AuthTemplate:styled.div`
  position:absolute;
  width:100%;
  height:100%;
  .auth__section{
    ${positionCenterCenter};
  }
  .auth__footer{
    ${positionWidthCenter};
    width:100%;
    bottom:32px;
  }
  `
}

export default AuthTemplate;