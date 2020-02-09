import React from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
// import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';

function WorksSearch(props) {
  return (
    <Styled.WorksSearch>
      <div className="WorksSearch__search_box">
        <select name="case" className="WorksSearch__select">
          <option value="patientName">Patient Name</option> 
          <option value="state">State</option>  
        </select> 
        <input type="text" className="WorksSearch__input"/>
        <a href="/" className="WorksSearch__btn">Seach</a>
      </div>

      <div className="WorksSearch__sort_box">
        <select name="case" className="WorksSearch__select type">
          <option value="sender">Sender</option>  
          <option value="receiver">Receiver</option>  
        </select> 
        <a href="/" className="WorksSearch__btn load">LOAD</a>
        <a href="/" className="WorksSearch__btn delete">DELETE</a>
       <a href="/" className="WorksSearch__refresh_btn"><CachedIcon  style={{ fontSize: 30 }}/></a>
      </div>
      
    </Styled.WorksSearch>
  );
}

const Styled = {
  WorksSearch:styled.div`

    .WorksSearch__search_box{
      display: inline-block;
      margin-bottom: 15px;
    }
    .WorksSearch__sort_box{
      display: inline-block;
      float: right;
    }

    .WorksSearch__select,
    .WorksSearch__input {
      padding: 3px;
      border: 1px solid ${color.gray_font};
      border-radius: 2px;
      ${font(14, color.gray_font)};
      margin-right: 5px; 
    }

    .WorksSearch__input {
      padding: 4px;
    }
    .WorksSearch__btn {
      padding: 5px 10px;
      background: ${color.blue};
      ${font(14, color.white)};
      border-radius: 2px;
      margin-right: 5px;
    }

    .WorksSearch__refresh_btn{
      position: relative;
      top: 8px;
      border: none;
      background: none;
      color: ${color.blue};
    }
  
  `
}

export default WorksSearch;