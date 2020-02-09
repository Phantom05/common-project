import React from 'react';
import styled from 'styled-components';
import {LoadingCircle} from 'components/base/loading';

function FullScreenLoading(props) {
  if(props.visible === false)  return null;
  return (
    <Styled.FullScreenLoading>
      <span className="loading__center">
        <LoadingCircle size={props.size?props.size:30}/>
      </span>
    </Styled.FullScreenLoading>
  );
}

const Styled={
  FullScreenLoading:styled.div`
    position:fixed;
    width:100%;
    height:100%;
    z-index:100000;
    .loading__center{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
    }
  `
}

export default FullScreenLoading;




