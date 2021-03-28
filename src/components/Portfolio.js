import React, { useState, useEffect } from "react";
import Title from "./Title";
import Favorites from "../containers/Favorites";
import RecentTransactions from "../containers/RecentTransactions";
import PortfolioList from "../containers/PortfolioList";
import UserStats from "../containers/UserStats";
import CoinModal from "../containers/CoinModal";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container, Divider } from "semantic-ui-react";
import { getMarket, getTransactions } from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [open, setOpen] = useState(false);

  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);

  useEffect(() => {
    props.getMarket();
    props.getTransactions();
  }, []);

  return (
    <>
      <Container fluid>
        <Segment basic>
          <Title label="Portfolio" />
          <Grid>
            <Grid.Row>
              <Grid.Column computer={8} tablet={16}>
                <UserStats
                  header="Balance"
                  portTotal={portTotal}
                  portGain={portGain}
                  setPortTotal={setPortTotal}
                  setPortGain={setPortGain}
                />
              </Grid.Column>
              <Grid.Column computer={8} tablet={16}>
                <Favorites header="Favorites" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <PortfolioList
                  header="Coin List"
                  portTotal={portTotal}
                  setPortTotal={setPortTotal}
                  setPortGain={setPortGain}
                  setOpen={setOpen}
                  open={open}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <RecentTransactions />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Divider />
        <Segment basic textAlign="center">
          {copyRight()}
        </Segment>
        <CoinModal open={open} setOpen={setOpen} />
      </Container>
    </>
  );
};

const mapDispatchToProps = {
  getTransactions: () => getTransactions(),
  getMarket: () => getMarket(),
};

export default connect(null, mapDispatchToProps)(Portfolio);
