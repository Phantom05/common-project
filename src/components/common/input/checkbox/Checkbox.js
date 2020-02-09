import React from 'react';
import {useImmer} from 'use-immer';

function Checkbox(props) {
  const { onClick, onChange ,name} = props;
  const [values,setValues] = useImmer({
    value:"",
    name:""
  });

  const handleChange= e =>{
    const {name,checked} = e.target;
    setValues(draft=>{
      draft.value = checked;
      draft.name = name
    })
  }
  onChange && onChange(values);
  onClick&& onClick(values);
  
  return (
    <input 
      {...props}
      name={name}
      checked={values.value}
      type="checkbox"
      onChange={handleChange}
      onClick={handleChange}
    />
  );
}

export default Checkbox;