import React, { useState, useEffect } from "react";
import Title from "./Title";
import Favorites from "../containers/Favorites";
import RecentTransactions from "../containers/RecentTransactions";
import PortfolioList from "../containers/PortfolioList";
import UserStats from "../containers/UserStats";
import CoinModal from "../containers/CoinModal";
import { roundComma, rounder } from "../number/NumberChanger";
import { copyRight } from "../number/NumberChanger";
import { Redirect } from "react-router";
import { Grid, Segment, Container, Divider } from "semantic-ui-react";
import { getMarket, getTransactions } from "../actions";
import { connect } from "react-redux";

const Portfolio = (props) => {
  const [open, setOpen] = useState(false);
  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);
  const [portPercentGain, setPortPercentGain] = useState(0);

  console.log(portPercentGain);

  useEffect(() => {
    props.getMarket();
    props.getTransactions(props.userId);
  }, [open]);
  if (props.isLoggedIn) {
    return (
      <>
        <Container fluid>
          <Segment basic>
            <Title
              label={`Portfolio`}
              portPercentGain={portPercentGain}
              searchBarDisplay="none"
            />
            <Grid>
              <Grid.Row>
                <Grid.Column tablet={16} computer={8}>
                  <UserStats
                    header="Balance"
                    portTotal={portTotal}
                    portPercentGain={portPercentGain}
                    portGain={portGain}
                    setPortTotal={setPortTotal}
                    setPortPercentGain={setPortPercentGain}
                    setPortGain={setPortGain}
                    open={open}
                  />
                </Grid.Column>

                <Grid.Column tablet={16} computer={8}>
                  <Favorites header="Favorites" />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
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
  } else {
    return <Redirect to="/market" />;
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
    userId: state.userInfo.user ? state.userInfo.user.data.message._id : "",
  };
};

const mapDispatchToProps = {
  getTransactions: (userId) => getTransactions(userId),
  getMarket: () => getMarket(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
