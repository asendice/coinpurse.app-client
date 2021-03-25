import React, { useEffect, useState } from "react";
import Title from "./Title";
import Favorites from "./Favorites";
import RecentTransactions from "./RecentTransactions";
import PortfolioList from "./PortfolioList";
import UserStats from "./UserStats";
import CoinModal from "./CoinModal";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container } from "semantic-ui-react";
import {
  getFavorites,
  getMarket,
  deleteFavorite,
  getTransactions,
  modalInfo,
  coinSelect,
  addPortList,
} from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getFavorites();
    props.getMarket();
    props.getTransactions();
    props.modalInfo();
  }, []);



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
                  portList={props.portList}
                />
              </Grid.Column>
              <Grid.Column computer={8} tablet={16}>
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
                  header="Coin List"
                  market={props.market}
                  transactions={props.transactions}
                  portTotal={portTotal}
                  setPortTotal={setPortTotal}
                  setPortGain={setPortGain}
                  addPortList={props.addPortList}
                  coinSelect={props.coinSelect}
                  setOpen={setOpen}
                  open={open}
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
        <CoinModal
          portList={props.portList}
          open={open}
          setOpen={setOpen}
          info={props.info}
          selectedCoin={props.selectedCoin}
          postFavorite={props.postFavorite}
          favorites={props.favorites}
        />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
    transactions: state.transactions,
    market: state.market,
    info: state.info,
    selectedCoin: state.selectedCoin,
    portList: state.portList,
  };
};

const mapDispatchToProps = {
  getFavorites: () => getFavorites(),
  getTransactions: () => getTransactions(),
  coinSelect: (coin) => coinSelect(coin),
  addPortList: (list) => addPortList(list),
  modalInfo: () => modalInfo(),
  getMarket: () => getMarket(),
  deleteFavorite: (coinId) => deleteFavorite(coinId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
