import React from 'react';
import styled from 'styled-components';
import { color, font } from 'styles/__utils';
import { WorksCard } from 'components/common/card';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useImmer } from 'use-immer';
import moment from 'moment';



function CaseLoadList(props) {
  const { list,onChange } = props;
  const [values, setValues] = useImmer({
    radioCheckedValue: "",
  });
  const {radioCheckedValue} = values;
  // const handleChange = prop => e => {
  //   console.log('change');
  //   const inputType = (prop === 'remember' || prop === 'auto') ? 'checked' : 'value';
  //   const targetValue = e.target[inputType];
  //   setValues(draft => {
  //     draft[prop] = targetValue;
  //   });
  // };

  const handleClick= (config) =>{
    if(config && config.id){
      onChange && onChange(config);
      setValues(draft=>{
        draft.radioCheckedValue = config.id;
      });
    }
  }

  return (
    <Stlyed.CaseLoadList>
      <RadioGroup 
        aria-label="position" 
        name="position" 
        value={radioCheckedValue} 
        // onChange={handleChange(`radioCheckedValue`)} 
        row>
        {Array.isArray(list) && list.map((item, idx) => {
          const worksCardData ={
            id:item.caseCode,
            caseId:item.caseId,
            patient:item.patient,
            sender:item.sender,
            receiver:item.receiver,
            dueDate:moment(item.dueDate).format("YYYY-MM-DD"),
            
          }
          return (
            <div key={idx} className="caseload__con">
              <WorksCard 
                type="list"
                labelColor={'red'}
                checked={false}
                info={worksCardData}
                onClick={handleClick}
              />
            </div>
          )
        })}
      </RadioGroup>
    </Stlyed.CaseLoadList>
  );
}

const Stlyed = {
  CaseLoadList: styled.div`
  padding:20px 0;
    .caseload__con{
      cursor: pointer;
      margin-bottom:15px;
      width:100%;
      &:hover{
        .caseload__box{
          background:rgba(0,0,0,.1);
        }
      }
    }
    .caseload__subtitle{
      ${font(14, color.black)};
      margin-bottom:5px;
    }
    .caseload__box{
      padding:13px;
      border-radius:10px;
      border:1px solid ${color.grat_border6};
      ${font(14, color.black)};
    }
  `
}

export default CaseLoadList;