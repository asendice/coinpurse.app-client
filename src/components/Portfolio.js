import React, { useState } from "react";
import Title from "./Title";
import Favorites from "../containers/Favorites";
import RecentTransactions from "../containers/RecentTransactions";
import PortfolioList from "../containers/PortfolioList";
import UserStats from "../containers/UserStats";
import CoinModal from "../containers/CoinModal";
import { copyRight } from "../number/NumberChanger";
import { Grid, Segment, Container } from "semantic-ui-react";

const Portfolio = (props) => {
  const [open, setOpen] = useState(false);
  const [portTotal, setPortTotal] = useState(0);
  const [portGain, setPortGain] = useState(0);

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

export default Portfolio;
