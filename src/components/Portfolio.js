import React, { useEffect } from "react";
import Title from "./Title";
import Favorites from "./Favorites";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container, Header, Statistic } from "semantic-ui-react";
import { getFavorites, getMarket, deleteFavorite } from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {

  useEffect(() => {
    props.getFavorites();
    props.getMarket()
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
                <Segment textAlign="center">
                  <Header as="h2">Portfolio List</Header>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Segment textAlign="center">
                  <Header as="h2">Recent Transactions</Header>
                </Segment>
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
    market: state.market
  }
}

const mapDispatchToProps = {
  getFavorites: () => getFavorites(),
  getMarket: () => getMarket(),
  deleteFavorite: coinId => (deleteFavorite(coinId))
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

