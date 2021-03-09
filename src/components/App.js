import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import VerticalHeader from "./VerticalHeader";
import Market from "./Market";
import Portfolio from "./Portfolio";
import { Grid } from "semantic-ui-react";

const App = () => {
  return (
    <div className="ui">
      <BrowserRouter>
        <Grid>
          <Grid.Column width={3} tablet={3} computer={3}>
            <VerticalHeader
              name="coinpurse.app"
              itemOne="market"
              itemTwo="portfolio"
            />
          </Grid.Column>
          <Grid.Column tablet={3} computer={3}>
            <div></div>
          </Grid.Column>
          <Grid.Column width={13} tablet={13} computer={13}>
            <Route path="/" exact component={Market} />
            <Route path="/coinpurse/portfolio" component={Portfolio} />
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default App;
