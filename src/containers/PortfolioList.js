import React, { useEffect } from "react";
import {
  roundComma,
  renderArrow,
  rounder,
  ifNegative,
} from "../number/NumberChanger";
import { Segment, Header, Card, Image, Icon, Divider } from "semantic-ui-react";
import { getMarket, coinSelect, getTransactions, addPortList } from "../actions";
import { connect } from "react-redux";

const PortfolioList = (props) => {
  const onCoinClick = (coin) => {
    props.setOpen(true);
    props.coinSelect(coin);
  };
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

  const filterMarket = props.market.filter((coin) => {
    if (mapNameTrans.includes(coin.name)) {
      return coin;
    } else {
      return null;
    }
  });

  const mergeByName = (arr1, arr2, arr3) =>
    arr1.map((itm) => ({
      ...arr2.find((item) => item.name === itm.name && item),
      ...arr3.find((item) => item.name === itm.name && item),
      ...itm,
    }));

  const portfolio = mergeByName(addAmts, filterMarket, addTotals);

  const portSorted = portfolio.sort((a, b) => {
    return b.total - a.total;
  });

  if (portfolio.length > 0) {
    const mapPortfolioTotal = portfolio.map((coin) => {
      return coin.amt * coin.current_price;
    });
    const mapTotal = addTotals.map((coin) => {
      return coin.total;
    });
    const origTotal = mapTotal.reduce((a, b) => {
      return a + b;
    });

    const portfolioTotal = mapPortfolioTotal.reduce((a, b) => {
      return a + b;
    }, 0);
    props.setPortTotal(portfolioTotal);
    props.setPortGain(portfolioTotal - origTotal);
  }

  useEffect(() => {
    props.getMarket();
    props.getTransactions();
    if (portfolio.length > 0) {
      props.addPortList(portfolio);
      console.log(portfolio);
    }
  }, [props.open]);

  const renderCard = () => {
    if (portfolio.length > 0) {
      return portSorted.map((coin) => {
        const dollarGain = coin.amt * coin.current_price - coin.total;
        if (coin.amt === 0) {
          return null;
        } else {
          return (
            <Card
              onClick={() => onCoinClick(coin)}
              key={coin.id}
              raised
              centered
              style={{ margin: "10px" }}
            >
              <Card.Content key={coin.id}>
                <Image floated="right" avatar src={coin.image} />
                <Card.Header>{coin.name}</Card.Header>
                <Card.Meta>{coin.symbol}</Card.Meta>
                <Card.Description>
                  <div>{rounder(coin.amt)}</div>
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
                    {renderArrow(dollarGain)}
                    {`${ifNegative(roundComma(dollarGain))}`}
                  </span>
                </Card.Description>
              </Card.Content>
            </Card>
          );
        }
      });
    } else {
      return (
        <Segment basic>
          <span style={{ color: "grey" }}>
            {" "}
            {`Username currently has ${portfolio.length} coins. Go to `}{" "}
            <a href="/market">Market</a> to add some transactions!{" "}
            <Icon name="cart" />
          </span>
        </Segment>
      );
    }
  };
  return (
    <Segment basic>
      <Header as="h2">{props.header}</Header>
      <Divider />
      <Card.Group centered>{renderCard()}</Card.Group>
    </Segment>
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
  coinSelect: (coin) => coinSelect(coin),
  getMarket: () => getMarket(),
  addPortList: (list) => addPortList(list),
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);
