import React from 'react';
import {Input} from 'components/common/input/text';
import styled from 'styled-components';

const CustomInput = styled(Input)`
  color:red;
  padding:5px;
`

function PlainInput(props) {
  return (
    <CustomInput {...props}/>
  );
}

export default PlainInput;