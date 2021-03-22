import React from "react";
import _ from "lodash";
import { roundComma, renderArrow } from "../number/NumberChanger";
import {
  Segment,
  Header,
  Card,
  Grid,
  Divider,
  Image,
  Icon,
} from "semantic-ui-react";

const PortfolioList = (props) => {
  const mapTransactions = props.transactions.transactions.map((trans) => {
    return {
      name: trans.trans.name,
      amt: trans.trans.buy
        ? Number(trans.trans.amt)
        : -Math.abs(trans.trans.amt),
      total: trans.trans.buy
        ? Number(trans.trans.amt * trans.trans.price)
        : -Math.abs(trans.trans.amt * trans.trans.price),
    };
  });

  const mapNameTrans = mapTransactions.map((coin) => {
    return coin.name;
  });

  const addAmts = Array.from(
    mapTransactions.reduce(
      (m, { name, amt }) => m.set(name, (m.get(name) || 0) + amt),
      new Map()
    ),
    ([name, amt]) => ({ name, amt })
  );

  const addTotals = Array.from(
    mapTransactions.reduce(
      (m, { name, total }) => m.set(name, (m.get(name) || 0) + total),
      new Map()
    ),
    ([name, total]) => ({ name, total })
  );

  console.log("addTotals", addTotals);

  const filterMarket = props.market.filter((coin) => {
    if (mapNameTrans.includes(coin.name)) {
      return coin;
    }
  });

  const mergeByName = (arr1, arr2, arr3) =>
    arr1.map((itm) => ({
      ...arr2.find((item) => item.name === itm.name && item),
      ...arr3.find((item) => item.name === itm.name && item),
      ...itm,
    }));

  const portfolio = mergeByName(addAmts, filterMarket, addTotals);

  if (portfolio.length >0) {
    
    const filterPortfolio = portfolio.map((coin) => {
      return coin.amt * coin.current_price;
    });
    const filterTotal = addTotals.map((coin) => {
      return coin.total;
    });
    const origTotal = filterTotal.reduce((a, b) => {
      return a + b;
    });

    const portfolioTotal = filterPortfolio.reduce((a, b) => {
      return a + b;
    }, 0);
    props.setPortTotal(portfolioTotal);
    props.setPortGain(portfolioTotal - origTotal);
  }


  const renderCard = () => {
    if (portfolio.length > 0) {
      return portfolio.map((coin) => {
        const dollarGain = coin.amt * coin.current_price - coin.total;
        return (
          <>
            <Grid.Column stackable>
              <Card>
                <Card.Content>
                  <Image floated="right" size="avatar" src={coin.image} />
                  <Card.Header>{coin.name}</Card.Header>
                  <Card.Meta>{coin.symbol}</Card.Meta>
                  <Card.Description>
                    <div>{coin.amt}</div>
                    <div>{`$${roundComma(coin.amt * coin.current_price)}`}</div>
                    <span
                      style={{
                        color:
                          dollarGain === 0
                            ? "grey"
                            : dollarGain > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {renderArrow(dollarGain)}${`${roundComma(dollarGain)}`}
                    </span>
                  </Card.Description>
                </Card.Content>
              </Card>
              <Divider hidden />
            </Grid.Column>
          </>
        );
      });
    } else {
      return (
        <Segment basic>
          <Segment>
            <span style={{ color: "grey" }}>
              {" "}
              {`Username currently has ${portfolio.length} coins, go to `}{" "}
              <a href="/market">Market</a> to add some transactions{" "}
              <Icon name="cart" />
            </span>
          </Segment>
        </Segment>
      );
    }
  };
  return (
    <>
      <Segment >
        <Header as="h2">Portfolio List</Header>
        <Grid>
          <Grid.Row columns={4}>{renderCard()}</Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default PortfolioList;
