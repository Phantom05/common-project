import React from 'react';
import styled from 'styled-components';
import { color, font, buttonBlue, dotdotdot } from 'styles/__utils';
import { useImmer } from 'use-immer';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { PartnersList } from 'components/common/listing';
import { PartnersSearch } from 'components/common/search';
import {LISTING_PARTNERS_SEARCH_SAGAS} from 'store/actions';

function PartnerListSearchForm(props) {
  const { list = [] } = props;
  const [values, setValues] = useImmer({
    searchCheckbox: {
      value: 'id'
    },
    companySelected: {
      value: ""
    },
    partnerSearch:{
      search:"",
      selected:""
    }
  });
  const {
    searchCheckbox,
    companySelected
  } = values;

  const handleChange = (value) => e => {
    const targetValue = e.target.value;
    // 고유번호, 업체명 셀렉
    if (value === 'searchCheckbox') {
      setValues(draft => {
        draft.searchCheckbox.value = targetValue;
      })
    }
  };

  const handleClick = config => e => {
    const {type} = config;
    if (type === 'selected') {
      if(e.component === "PartnersList"){
        setValues(draft => {
          draft.companySelected = e;
        })
      }
    }

    if(type === 'change'){
      props.onSubmit && props.onSubmit(values);
    }
  };

  // Partners List Search Submit
  const onSubmit = (config) => {
    LISTING_PARTNERS_SEARCH_SAGAS(config);
  }
  return (
    <Styled.PartnerListSearchForm>
      <div className="partenrs__row">
        <RadioGroup
          aria-label="position"
          name="position"
          value={searchCheckbox.value}
          onChange={handleChange(`searchCheckbox`)} row>
          <FormControlLabel
            value="id"
            control={<Radio color="default" size="small" />}
            label={<span className="signup__input public text">고유번호</span>}
            labelPlacement="end"
          />
          <FormControlLabel
            value="storeName"
            control={<Radio color="default" size="small" />}
            label={<span className="signup__input public text">업체명</span>}
            labelPlacement="end"
          />
        </RadioGroup>
      </div>

      <div className="partenrs__row">
        <PartnersSearch
          onSubmit={onSubmit}
        />
      </div>

      <div className="partenrs__row">
        <PartnersList 
          info={companySelected}
          list={list} 
          onClick={(result)=>handleClick({type:"selected"})(result)}
        />
      </div>

      <div className="partenrs__row">
        <div className="list__btn_box">
          <Button
            onClick={handleClick({ type: "change" })}
            variant="contained"
            className="partnerss__btn"
            component="span">CHANGE</Button>
        </div>
      </div>

    </Styled.PartnerListSearchForm>
  );
}

const Styled = {
  PartnerListSearchForm: styled.div`
    .partenrs__row{
      margin-bottom:10px;
    }
    .list__control .MuiFormGroup-root{
      flex-wrap:nowrap;
    }

    .list__control{
      height:400px;
      overflow:auto;
    }

    .MuiSelect-outlined.MuiSelect-outlined{
      padding:10px ;
    }
    .partnerss__btn{
      ${buttonBlue};
      box-shadow:none;
      &:hover{
        box-shadow:none;
      }
    }
    .list__box_tx{
      &.tx{
        padding:0 5px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        ${font(14, color.black_font)};
        ${dotdotdot};
        width:100%;
      }
      &.bold{
        font-weight:600;
      }
    }
    .list__box_item{
      position:relative;
      height:40px;
      border-right:1px solid ${color.grat_border6};
      text-align:center;
      &:last-child{
        border-right:0;
      }
      &.th{
        background:${color.gray_bg1};
      }
      &.td{

      }
    }
    .list__btn_box{
      border-top:1px solid ${color.grat_border6};
      text-align:right;
      padding-top:15px;
    }
  `
}

export default PartnerListSearchForm;