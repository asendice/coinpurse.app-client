import React, { useEffect } from "react";
import Title from "./Title";
import Favorites from "./Favorites";
import RecentTransactions from "./RecentTransactions";
import PortfolioList from "./PortfolioList";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container, Header, Statistic } from "semantic-ui-react";
import { getFavorites, getMarket, deleteFavorite, getTransactions } from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {

  useEffect(() => {
    props.getFavorites();
    props.getMarket()
    props.getTransactions();
  },[])

  return (
    <>
      <Container>
        <Segment padded raised>
          <Title label="portfolio" />
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment>
                  <Header as="h2">Username's Portfolio</Header>
                  <Segment basic textAlign="center">
                    <Statistic>
                      <Statistic.Value>$23,648</Statistic.Value>
                      <Statistic.Label>Portfolio Total</Statistic.Label>
                    </Statistic>
                  </Segment>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Favorites favorites={props.favorites} market={props.market} deleteFavorite={props.deleteFavorite} header="Favorites" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <PortfolioList market={props.market} transactions={props.transactions} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <RecentTransactions transactions={props.transactions}/>
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
    market: state.market
  }
}

const mapDispatchToProps = {
  getFavorites: () => getFavorites(),
  getTransactions: () => getTransactions(),
  getMarket: () => getMarket(),
  deleteFavorite: coinId => (deleteFavorite(coinId))
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

