import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Favorites from "./Favorites";
import RecentTransactions from "./RecentTransactions";
import PortfolioList from "./PortfolioList";
import UserStats from "./UserStats";
import CoinModal from "./CoinModal";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container } from "semantic-ui-react";
import { getMarket, getTransactions, addPortList } from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [open, setOpen] = useState(false);
  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);

  console.log("props.portList.list", props.portList.list);

  

  return (
    <>
      <Container fluid>
        <Segment basic>
          <Title label="Portfolio" />
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column computer={8} tablet={16}>
                <UserStats
                  header="Balance"
                  portTotal={portTotal}
                  portGain={portGain}
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
        <Segment basic textAlign="center">
          {copyRight()}
        </Segment>
        <CoinModal open={open} setOpen={setOpen} />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    market: state.market,
    transactions: state.transactions,
    portList: state.portList,
  };
};

const mapDispatchToProps = {
  getTransactions: () => getTransactions(),
  getMarket: () => getMarket(),
  addPortList: (list) => addPortList(list),
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
