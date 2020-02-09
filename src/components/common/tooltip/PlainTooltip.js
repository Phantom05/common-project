import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import styled from 'styled-components';
import {color} from 'styles/__utils';


function PlainTooltip(props) {
  const {type,children} = props;
  const typeIcon ={
    'help':HelpIcon,
  }
  let Icon = typeIcon[type];
  return (
    <Styled.PlainTooltip >
      <Tooltip 
        {...props} 
        className={type?type:''} 
        title={<Styled.TootipStyle>{props.title}</Styled.TootipStyle>}
      >
        {Icon ?<Icon /> :<>{children}</>} 
      </Tooltip>
    </Styled.PlainTooltip>
  );
}


const Styled = {
  PlainTooltip:styled.span`
    display:inline-block;
    .title{
      font-size:30px;
    }
    .help{
      position:relative;
      top:4px;
      color:${color.gray_icon};
      cursor: pointer;
      font-size:20px;
    }
  `,
  TootipStyle:styled.span`
    display:inline-block;
    font-size:12px;
    padding:5px;
  `
}

export default PlainTooltip;