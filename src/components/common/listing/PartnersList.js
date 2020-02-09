import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { color, font, buttonBlue, dotdotdot } from 'styles/__utils';
import RadioGroup from '@material-ui/core/RadioGroup';
import {PartnersListItem} from 'components/common/card';


/**
 * onClick
 * list,info 
 * @param {*} props 
 */
function PartnersList(props) {
  let { list,info } = props;

  const handleClick = config => e => {
    const {type} = config;
    if (type === 'selected') {
      const result={
        component:`PartnersList`,
        value:e.key
      }
      Object.assign(result,config,e);
      props.onClick && props.onClick(result);
    }
  };

  return (
    <Styled.PartnersList>
      
        <div className="list__control">
          <div className="list__box_title">
            <Grid container justify="space-between" >
              <Grid item xs={3} className="list__box_item th">
                <span className="list__box_tx tx bold">고유번호</span>
              </Grid>
              <Grid item xs={3} className="list__box_item th">
                <span className="list__box_tx tx bold">업체명</span>
              </Grid>
              <Grid item xs={3} className="list__box_item th">
                <span className="list__box_tx tx bold">주소</span>
              </Grid>
              <Grid item xs={2} className="list__box_item th">
                <span className="list__box_tx tx bold">타입</span>
              </Grid>
              <Grid item xs={1} className="list__box_item th">
                <span className="list__box_tx tx bold">선택</span>
              </Grid>
            </Grid>
          </div>

          <RadioGroup value={info.value} >
            <div className="list__box">
              {list.map((item, idx) => (
                <PartnersListItem key={idx} {...item} 
                  onClick={handleClick({ type: 'selected' })} 
                />
              ))}
            </div>
          </RadioGroup>
        </div>
      
    </Styled.PartnersList>
  );
}

const Styled = {
  PartnersList: styled.div`
    .list__control .MuiFormGroup-root{
      flex-wrap:nowrap;
    }
    .list__control{
      height:400px;
      overflow:auto;
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

    }
  `
}

export default PartnersList;