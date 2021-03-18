import React, {useEffect} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import VerticalHeader from "./VerticalHeader";
import Market from "./Market";
import Portfolio from "./Portfolio";
import Landing from "./Landing";
import Login from './Login';
import Register from './Register';
import { postFavorite, getFavorites } from "../actions";
import { connect } from "react-redux";

const Main = (props) => {
  const menuProps = {
    name: "coinpurse.app",
    itemOne: "market",
    itemTwo: "portfolio",
  };
  

  useEffect(() => {
    props.getFavorites();
  },[])

  return (
    <Container fluid>
      <BrowserRouter>
        <VerticalHeader menuProps={menuProps} />
        <Grid>
          <Grid.Column computer={3} tablet={2}></Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={11}>
            <Route path="/" exact component={Landing} />
            <Route path="/market" exact render={() => <Market  postFavorite={props.postFavorite} favorites={props.favorites} />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/register" exact render={() => <Register />} />
            <Route path="/portfolio" exact render ={() => <Portfolio />} />
          </Grid.Column>
          <Grid.Column computer={2} tablet={2}></Grid.Column>
        </Grid>
      </BrowserRouter>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  }
}

const mapDispatchToProps = {
  getFavorites: () => getFavorites(),
  postFavorite: (name, price, pricePercent) => (postFavorite(name, price, pricePercent))
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
