import React, { useEffect, useState } from "react";
import Title from "./Title";
import Favorites from "./Favorites";
import RecentTransactions from "./RecentTransactions";
import PortfolioList from "./PortfolioList";
import UserStats from "./UserStats";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container, Header, Statistic } from "semantic-ui-react";
import {
  getFavorites,
  getMarket,
  deleteFavorite,
  getTransactions,
} from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);

  useEffect(() => {
    props.getFavorites();
    props.getMarket();
    props.getTransactions();
  }, []);

  return (
    <>
      <Container fluid >
        <Segment raised padded>
          <Title label="portfolio" />
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <UserStats header="UserName Portfolio" portTotal={portTotal} portGain={portGain} />
              </Grid.Column>
              <Grid.Column>
                <Favorites
                  favorites={props.favorites}
                  market={props.market}
                  deleteFavorite={props.deleteFavorite}
                  header="Favorites"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <PortfolioList
                  market={props.market}
                  transactions={props.transactions}
                  setPortTotal={setPortTotal}
                  setPortGain={setPortGain}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <RecentTransactions transactions={props.transactions} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment basic textAlign="center">
          {copyRight()}
        </Segment>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    transactions: state.transactions,
    market: state.market,
  };
};

const mapDispatchToProps = {
  getFavorites: () => getFavorites(),
  getTransactions: () => getTransactions(),
  getMarket: () => getMarket(),
  deleteFavorite: (coinId) => deleteFavorite(coinId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
