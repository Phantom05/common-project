import React from 'react';
import { withRouter } from 'react-router-dom';
import {HomeContainer} from 'containers/home';
import {TestContainer} from 'containers/test';

// import {DashboardNav} from 'components/common/nav';
// import {DashboardTemplate} from 'components/base/template';

function Home(props) {
  return (
    <TestContainer />
  // <DashboardTemplate nav={<DashboardNav/>} >
  //   <HomeContainer />
  // </DashboardTemplate>
  );
}

export default withRouter(Home);