import React from "react";
import {
  Header,
  Grid,
  Container,
  Segment,
  Button,
  Divider,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <Container textAlign="center" fluid style={{ minHeight: "100vh" }}>
      <Segment basic size="massive">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header size="huge">Coinpurse </Header>
              <Header size="large">Portfolio Tracker</Header>
              <Header as="h2">
                All-in-one cryptocurrency tracking app. View the latest prices,
                monitor your portfolio, test potential trades, and learn about
                the top cryptocurrencies.
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column >
              <NavLink to="/login"><Button size="massive" content="Log In" /></NavLink>
              <NavLink to="/register"><Button size="massive" content="Sign Up" /></NavLink>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default Landing;
