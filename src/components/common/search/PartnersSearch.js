import React,{useEffect} from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import {
  LISTING_PARTNERS_TYPE_SAGAS
} from 'store/actions';
// import { color, font, buttonBlue, dotdotdot } from 'styles/__utils';





function PartnersSearch(props) {
  const classes = useStyles();
  const {listing:listingReducer} = useSelector(state=>state);
  const {search:{partnersType:typeList}} = listingReducer;
  const [values, setValues] = useImmer({
    searchKeyword: "",
    searchSelectedType: ""
  });
  const {
    searchSelectedType,
    searchKeyword,
  } = values;

  const handleChange = (value) => e => {
    const targetValue = e.target.value;
    if (value === 'keyword') {
      setValues(draft => {
        draft.searchKeyword = targetValue;
      });
    }
  };

  const handleClick = config => e => {
    const {type ,value} = config;
    if (type === 'selected') {
      if (value === 'partnersType') {
        const targetValue = e.target.value;
        setValues(draft => {
          draft.searchSelectedType = targetValue;
        })
      }
    }
    if(type === 'search'){
      const result = {
        keyword: values.searchKeyword,
        selectedType:values.searchSelectedType
      }
      props.onSubmit && props.onSubmit(result);
    }
  };

  useEffect(()=>{
    LISTING_PARTNERS_TYPE_SAGAS();
  },[])

 
  return (
    <Styled.PartnersSearch>
       <Grid container justify="space-between" spacing={1}>
          <Grid item xs={8}>
            <TextField
              // error={false}
              id="keyword"
              value={searchKeyword}
              name="keyword"
              onChange={handleChange(`keyword`)}
              variant="outlined"
              fullWidth
              placeholder={`최소 2글자 이상 입력해주세요. `}
              inputProps={{
                maxLength: 25,
                minLength:2
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} variant="outlined">
              <Select
                value={searchSelectedType}
                onChange={handleClick({ type: 'selected', value: 'partnersType' })}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem disabled value="">
                  <em>타입선택</em>
                </MenuItem>
                {Array.isArray(typeList) && typeList.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={handleClick({type:'search'})}
              variant="contained"
              className="partnerss__btn"
              component="span">검색</Button>
          </Grid>
        </Grid>
    </Styled.PartnersSearch>
  );
}



const useStyles = makeStyles(theme => ({
  formControl: {
    width: `100%`
  },
}));

const Styled ={
  PartnersSearch:styled.div`
  
  `
}

export default PartnersSearch;