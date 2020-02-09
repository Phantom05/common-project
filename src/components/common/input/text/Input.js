
import React from 'react';
import {useImmer} from 'use-immer';
// import {useInput} from 'lib/utils';


function Input(props){
  const {onChange ,name} = props;
  const [values,setValues] = useImmer({
    value:"",
    name:""
  });

  const handleChange= e =>{
    const {value ,name} = e.target;
    setValues(draft=>{
      draft.value = value;
      draft.name = name
    })
  }
  onChange && onChange(values);
  return (
    <input 
      {...props}
      type="text" 
      onChange={handleChange}
      value={values.value}
    />
  )
}


// function Input(props) {
//   const {onChange,name} = props;
//   const [state, setState] = useInput({
//     $$input$$: '',
//   });
//   const {$$input$$} = state;
//   const resultObi = {
//     [props.name]:$$input$$
//   };
//   onChange && onChange(resultObi);
 
//   return (
//     <input 
//       {...props}
//       name="$$input$$"
//       value={$$input$$} 
//       onChange={setState} 
//     />
//   );
// }


export default Input;