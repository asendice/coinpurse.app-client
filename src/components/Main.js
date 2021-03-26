import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import VerticalHeader from "./VerticalHeader";
import Market from "../containers/Market";
import Portfolio from "../containers/Portfolio";
import Landing from "./Landing";
import Login from "../containers/Login";
import Register from "../containers/Register";

const Main = (props) => {
  const [active, setActive] = useState("");
  const menuProps = {
    name: "coinpurse.app",
    itemOne: "market",
    itemTwo: "portfolio",
  };

  const onHeaderClick = (term) => {
    setActive(term);
  };

  return (
    <Container fluid className="bkg">
      <BrowserRouter>
        <VerticalHeader menuProps={menuProps} onHeaderClick={onHeaderClick} />
        <Grid>
          <Grid.Column computer={3} tablet={2}></Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={11}>
            <Route path="/" exact component={Landing} />
            <Route path="/market" exact render={() => <Market />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/register" exact render={() => <Register />} />
            <Route path="/portfolio" exact render={() => <Portfolio active={active} />} />
          </Grid.Column>
          <Grid.Column computer={2} tablet={2}></Grid.Column>
        </Grid>
      </BrowserRouter>
    </Container>
  );
};

export default Main;
