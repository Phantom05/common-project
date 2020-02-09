import React from 'react';
import {useImmer} from 'use-immer';

function Radio(props) {
  const {onClick ,name} = props;
  const [values,setValues] = useImmer({
    value:false,
    name:""
  });

  const handleClick= e=>{
    console.log(e.target.value);
    // const {name,checked} = e.target;
    // console.log(checked);
    // setValues(draft=>{
    //   draft.value = !checked;
    //   draft.name = name
    // });
  }

  console.log(values);

  onClick && onClick(values);

  return (
    <input 
      {...props}
      // checked={values.value}
      type="radio"
      // onChange={handleClick}
      onClick={handleClick}
    />
  );
}

export default Radio;