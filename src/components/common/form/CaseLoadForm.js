import React from 'react';
import styled from 'styled-components';
import { color, font } from 'styles/__utils';
import {CaseLoadList} from 'components/common/listing';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';


function CaseLoadForm(props) {
  const {onSubmit} = props;
  const { listing:listingReducer } = useSelector(state=>state);
  const {case:caseList} = listingReducer;
  const [values , setValues] = useImmer({result:null});

  const handleClick = value => config =>{
    if(value === 'list'){
      setValues(draft=>{{
        draft.result = config;
      }});
    }
    if(value === 'load'){
      onSubmit && onSubmit(values.result)
    }
  };


  return (
    <Stlyed.ModalCaseListContent>
      <h1 className="caseload__title">Load Case</h1>
      <div className="caseload__con_box">
        <CaseLoadList 
          list={caseList.load}
          onChange={handleClick('list')}
        />
      </div>
      <div className="caseload__button_box">
        <button 
          onClick={handleClick('load')}
          className="caseload__button caseload__button-blue"
          >LOAD</button>
      </div>
    </Stlyed.ModalCaseListContent>
  );
}

const Stlyed = {
  ModalCaseListContent: styled.div`
    padding:30px 5px;
    .caseload__con_box{
      max-height:425px;
      overflow-y:auto;
      padding-right:30px;
    }
    .caseload__title{
      text-align:center;
      ${font(18, color.black)};
      margin-bottom:20px;
    }
    .caseload__button_box{
      background:white;
      text-align:right;
      padding-top:15px;
      padding-right:30px;
    }
    .caseload__button{
      box-shadow:none;
      border-radius:3px;
      font-weight:600;
      cursor: pointer;
      padding:5px 15px;
      &-blue{
        border:2px solid ${color.blue};
        background:${color.blue};
        color:white;
        &:hover{
          background:${color.blue_hover};
          box-shadow:none;
        }
      }
      &-white{
        border:2px solid ${color.blue};
        background:white;
        color:${color.blue};
        &:hover{
          background:white;
          box-shadow:none;
        }
      }
    }
  `
}

export default CaseLoadForm;