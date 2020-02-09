import React from 'react';
import {
  PlainInput,
  Input
} from 'components/common/input/text';
import {
  // PlainInput,
  Radio
} from 'components/common/input/radio';
import {
  // PlainInput,
  Checkbox
} from 'components/common/input/checkbox';

import styled from 'styled-components';
// import {useInput} from 'lib/utils';


function TestContainer(props) {


  const handleChange = value => {
    console.log('handleChange');
    console.log(value);
  }

  const handleClick = value=>{
    console.log(`handleClick`);
    console.log(value);
  }

  // console.log(state);
  return (
    <Styled.TestContainer>

      <div>
        <PlainInput
          onChange={handleChange}
          className="test"
        />
      </div>

      <div>
        <Input
          type="radio"
          name="wow"
          onChange={handleChange}
        />
      </div>

      <div>
        <Radio 
          name="zz"
          onClick={handleClick}
        />
      </div>

      <div>
        <Checkbox
          name="zz"
          onChange={handleChange}
          onClick={handleClick}
        />
      </div>

      <div>
        <input 
          name="쿄쿄쿄"
          type="text"
          onChange={({target})=>{
            const {value,name} = target;
            console.log( {value,name} );
          }}
        />
      </div>
  
    </Styled.TestContainer >
      );
    }
    
    
const Styled ={
        TestContainer:styled.div`
    .test{
        color:blue;
    }
  `
}



export default TestContainer;