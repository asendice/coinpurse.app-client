import React, { useState } from "react";
import _ from "lodash";
import {
  Modal,
  Segment,
  Accordion,
  Header,
  Image,
  Grid,
  Label,
  Icon,
  Popup,
  Divider,
} from "semantic-ui-react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import { deleteFavorite, postTransaction, postFavorite } from "../actions";
import { roundComma, renderArrow } from "../number/NumberChanger";

const CoinModal = (props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [index] = useState(0);
  const [buy, setBuy] = useState(false);

  const values = [
    `$${roundComma(props.selectedCoin.current_price)}`,
    `${roundComma(props.selectedCoin.price_change_percentage_24h)}%`,
    `$${roundComma(props.selectedCoin.market_cap)}`,
    `${roundComma(props.selectedCoin.market_cap_change_percentage_24h)}%`,
    `$${roundComma(props.selectedCoin.ath)}`,
    `$${props.selectedCoin.atl}`,
    `${roundComma(props.selectedCoin.circulating_supply)}`,
    props.selectedCoin.total_supply > 0
      ? `${roundComma(props.selectedCoin.total_supply)}`
      : "Not Available",
  ];

  const accordionClick = () => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const heart = props.favorites.favorites.map((fav) => {
    return fav.coin.includes(props.selectedCoin.symbol);
  });

  const favoriteClick = (coin) => {
    const filterFav = props.favorites.favorites.filter(
      (fav) => fav.coin === coin.symbol
    );

    const mapFav = props.favorites.favorites.map((fav) => {
      if (fav.coin === coin.symbol) {
        return false;
      } else {
        return true;
      }
    });
    if (!mapFav.includes(false)) {
      props.postFavorite(coin.symbol);
    } else {
      props.deleteFavorite(filterFav[0].id);
    }
  };

  const filterPortList = props.portList.list.filter((coin) => {
    if (coin.name === props.selectedCoin.name) {
      return coin;
    } else {
      return null;
    }
  });

  const onFormSubmit = (values) => {
    const coinAmt = filterPortList.map((coin) => {
      return coin.amt;
    });
    console.log("values.amt", values.amt);
    if (coinAmt[0] < values.amt && buy === false) {
      return alert(
        `Transaction Canceled: You cannot sell more ${props.selectedCoin.name} then you own.`
      );
    } else {
      alert(
        `${buy ? "Buy" : "Sell"} Transaction Submitted For ${
          props.selectedCoin.name
        }`
      );
      const today = new Date();
      const date =
        today.getMonth() +
        1 +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      values.name = props.selectedCoin.name;
      values.buy = buy;
      values.image = props.selectedCoin.image;
      values.price = Number(props.selectedCoin.current_price);
      values.date = { date };
      values.time = { time };
      props.postTransaction(values);
      props.setOpen(false);
    }
  };

  const onBuyClick = () => {
    setBuy(true);
  };
  const onSellClick = () => {
    setBuy(false);
  };

  const renderLabel = () => {
    const join = _.zip(values, props.info);
    if (join[1][1]) {
      return join.map((stat) => {
        return (
          <Grid.Column key={stat[1].id}>
            <Popup
              content={stat[1].labelDescription}
              position="right center"
              trigger={
                <Label style={{ cursor: "default" }} color="grey">
                  {stat[1].label}
                </Label>
              }
            />
            <Segment>
              <Header as="h5">{stat[0]}</Header>
            </Segment>
            <Divider hidden />
          </Grid.Column>
        );
      });
    } else {
      return <div>nothing populated</div>;
    }
  };

  const renderPortData = () => {
    if (props.portList.list.length > 0) {
      return filterPortList.map((coin) => {
        const dollarGain = coin.amt * coin.current_price - coin.total;
        if (coin.amt > 0) {
          return (
            <>
              <Grid.Column>
                <Popup
                  content={`Your remaing amount of ${coin.name} after all transactions, buys and sells, have been calculated.`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Amount of {coin.name} owned
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">{coin.amt}</Header>
                </Segment>
              </Grid.Column>
              <Grid.Column key={coin.name}>
                <Popup
                  content={`Estimated overall value of your ${coin.name}. Amount of ${coin.name} x Current Price.`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Estimated Value
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">
                    ${roundComma(coin.amt * coin.current_price)}
                  </Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  content={`USD increase/decrease of the total cost of your investment to what your investment is currently worth.`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Gain
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">{`$${roundComma(dollarGain)}`}</Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  content={`Total USD invested after all buys and sells have been calculated for ${coin.name}`}
                  position="right center"
                  trigger={
                    <Label style={{ cursor: "default" }} color="grey">
                      Total Investment
                    </Label>
                  }
                />
                <Segment>
                  <Header as="h5">${roundComma(coin.total)}</Header>
                </Segment>
              </Grid.Column>
            </>
          );
        } else {
          return null;
        }
      });
    }
  };

  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      size="large"
      centered
    >
      <Modal.Header>
        <Image avatar src={props.selectedCoin.image} />
        {props.selectedCoin.name}
        <span style={{ color: "grey" }}> {props.selectedCoin.symbol}</span>
        <span style={{ float: "right" }}>
          <Popup
            content={heart.includes(true) ? "Favorited" : "Add to Favorites?"}
            trigger={
              <Icon
                link
                name={heart.includes(true) ? "heart" : "heart outline"}
                color="red"
                onClick={() => favoriteClick(props.selectedCoin)}
              />
            }
          />
        </span>
      </Modal.Header>
      <Modal.Content>
        <Grid container columns={4} stackable>
          <Grid.Row>{renderLabel()}</Grid.Row>
          <Divider />
          <Grid.Row>{renderPortData()}</Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Content>
        <Accordion>
          <Accordion.Title
            onClick={() => accordionClick()}
            index={index}
            active={activeIndex === 0}
            icon={<Icon name={activeIndex === 0 ? "minus" : "plus"} />}
            content={
              <Label size="large" color="grey">
                {activeIndex === 0
                  ? `Enter Transaction Information for ${props.selectedCoin.name}`
                  : "Add Transactions?"}
              </Label>
            }
          />
          <Accordion.Content
            active={activeIndex === 0}
            content={
              <TransactionForm
                coin={props.selectedCoin}
                onFormSubmit={onFormSubmit}
                onBuyClick={onBuyClick}
                onSellClick={onSellClick}
                portList={props.portList}
              />
            }
          />
        </Accordion>
      </Modal.Content>
    </Modal>
  );
};

const mapDispatchToProps = {
  deleteFavorite: (coinId) => deleteFavorite(coinId),
  postTransaction: (values) => postTransaction(values),
  postFavorite: (coin) => postFavorite(coin),
};

export default connect(null, mapDispatchToProps)(CoinModal);
