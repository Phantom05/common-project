import React from 'react';
import { NotFound } from 'components/base/helpers/error';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { PrivateRoute, LRoute } from 'components/base/route';
// import Core from 'containers/base/Core';
import reset from "styled-reset";

import './App.css';
import {
  Home,
} from 'pages';

function App() {
  // const {match} = props;
  return (
    <>
      <Stlyed.GlobalStyles />
      {/* <Core /> */}
      <Switch>
        {/* <PrivateRoute exact path="/" component={Home} redirect="/case" /> */}
        {/* <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/case" component={Case} />
        <PrivateRoute path="/works" component={Works} />
        <PrivateRoute path="/mypage" component={Mypage} />
        <PrivateRoute path="/alert" component={Alert} />
        <LRoute path="/auth" component={Auth} token /> */}
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const Stlyed = {
  GlobalStyles: createGlobalStyle`
  ${reset};
  a{
      text-decoration:none;
      color:inherit;
  }
  *{
      box-sizing:border-box !important;
  }
  body{
      font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
  }

  `
}


export default App;
