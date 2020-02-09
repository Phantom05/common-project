import React from 'react';
import _ from 'lodash';


function Visible(props) {
  const {show = [],children, success,failure} = props;
  const bool = _.every(_.flattenDeep([show]));
  // if(!show.every(item=>item)) return <>{failure}</>;
  if(!bool) return <>{failure}</>;
  return (
    <>
      {success}
      {children}
    </>
  );
}

export default Visible;