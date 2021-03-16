import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import VerticalHeader from "./VerticalHeader";
import Market from "./Market";
import Portfolio from "./Portfolio";
import Landing from "./Landing";
import Login from './Login';
import Register from './Register';

const Main = () => {
  const menuProps = {
    name: "coinpurse.app",
    itemOne: "market",
    itemTwo: "portfolio",
  };

  return (
    <Container fluid>
      <BrowserRouter>
        <VerticalHeader menuProps={menuProps} />
        <Grid>
          <Grid.Column computer={3} tablet={2}></Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={11}>
            <Route path="/" exact component={Landing} />
            <Route path="/market" exact render={() => <Market />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/register" exact render={() => <Register />} />
            <Route path="/portfolio" component={Portfolio} />
          </Grid.Column>
          <Grid.Column computer={2} tablet={2}></Grid.Column>
        </Grid>
      </BrowserRouter>
    </Container>
  );
};

export default Main;
