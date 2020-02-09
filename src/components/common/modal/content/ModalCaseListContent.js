import React from 'react';
import {CaseLoadForm} from 'components/common/form';


function ModalCaseListContent(props) {
  return (
    <div>
      <CaseLoadForm {...props}/>
    </div>
  );
}

export default ModalCaseListContent;