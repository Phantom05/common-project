import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { color, font,  dotdotdot } from 'styles/__utils';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/**
 * onClick
 * id
  company
  address
  type
 * @param {*} props 
 */
function PartnersListItem(props) {
  const handleClick = () => {
    props.onClick && props.onClick({ ...props,key: props.id })
  }

  return (
    <Styled.PartnersListItem >
      <div className="list__row" onClick={handleClick}>
      <Grid container justify="space-between">
        <Grid item xs={3} className="list__box_item td">
          <span className="list__box_tx tx">
            {props.id}
          </span>
        </Grid>
        <Grid item xs={3} className="list__box_item td">
          <span className="list__box_tx tx">
            {props.company}
          </span>
        </Grid>
        <Grid item xs={3} className="list__box_item td">
          <span className="list__box_tx tx">
            {props.address}
          </span>
        </Grid>
        <Grid item xs={2} className="list__box_item td">
          <span className="list__box_tx tx">
            {props.type}
          </span>
        </Grid>
        <Grid item xs={1} className="list__box_item td">
          <span className="list__box_tx tx">
            <FormControlLabel
              value={props.id}
              color="primary"
              name="partnersItem"
              control={<Radio color="default" size="small" />}
            />
          </span>
        </Grid>
      </Grid>
      </div>
    </Styled.PartnersListItem>
  )
}

const Styled ={
  PartnersListItem:styled.div`
    .list__row{
      border-bottom:1px solid ${color.gray_border2};
      cursor: pointer;

      &:hover{
        background:#ececec;
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
  `
}

export default PartnersListItem;
