import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Grid, Container, Divider } from "semantic-ui-react";
import VerticalHeader from "./VerticalHeader";
import Market from "./Market";
import Portfolio from "./Portfolio";

const App = () => {
  
  const menuProps = {
    name:"coinpurse.app",
    itemOne:"market",
    itemTwo:"portfolio",
  }
  return (
    <Container>
      <BrowserRouter>
            <VerticalHeader
              menuProps={menuProps}
            />
            <Route path="/" exact component={Market} />
            <Route path="/coinpurse/portfolio" component={Portfolio} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
