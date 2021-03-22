import React, { useState, useEffect } from "react";
import { Segment, Table, Icon } from "semantic-ui-react";
import { roundComma, convertMc, renderArrow } from "../number/NumberChanger";
import { connect } from "react-redux";
import { getMarket, coinSelect, modalInfo, getFavorites } from "../actions";
import Title from "./Title";
import SearchNotFound from "./SearchNotFound";
import CoinModal from "./CoinModal";

const Market = (props) => {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getMarket();
    props.modalInfo();
    props.getFavorites();
  }, []);

  const onTermSubmit = (term) => {
    setTerm(term);
  };

  const onTableRowClick = (coin) => {
    setOpen(true);
    props.coinSelect(coin);
  };

  const filterMarket = props.market.filter((coin) => {
    if (
      coin.name.toLowerCase().includes(term.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(term.toLowerCase())
    ) {
      return coin;
    }
  });

  const renderNotFound = () => {
    if (filterMarket.length === 0) {
      return (
        <div>
          <SearchNotFound term={term} nf="Zero Results Found..." />
        </div>
      );
    } else {
      return;
    }
  };

  const renderMarket = () => {
    const mapFavs = props.favorites.favorites.map((fav) => {
      return fav.coin;
    });
    console.log(mapFavs);
    return filterMarket.map((coin) => {
      return (
        <Table.Row
          key={coin.id}
          onClick={() => onTableRowClick(coin)}
          className="td-click"
        >
          <Table.Cell className="td-dis">
            <h4>{coin.market_cap_rank}</h4>
          </Table.Cell>
          <Table.Cell>
            <img
              className="ui image avatar"
              src={coin.image}
              alt={coin.image}
            />
          </Table.Cell>
          <Table.Cell>
            <h4>{coin.name}</h4>
          </Table.Cell>
          <Table.Cell>
            <h4>${roundComma(coin.current_price)}</h4>
          </Table.Cell>
          <Table.Cell
            style={{
              color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
            }}
          >
            <h4>
              {renderArrow(coin.price_change_percentage_24h)}
              {roundComma(coin.price_change_percentage_24h)}%
            </h4>
          </Table.Cell>
          <Table.Cell className="td-dis">
            <h4>${convertMc(coin.market_cap)}</h4>
          </Table.Cell>
          <Table.Cell>
            {mapFavs.includes(coin.symbol) ? (
              <Icon link name="heart" color="grey" />
            ) : (
              ""
            )}
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <Segment raised padded>
      <Title term={term} onTermSubmit={onTermSubmit} label="market" />
      <Table className="ui unstackable table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="td-dis">Rank</Table.HeaderCell>
            <Table.HeaderCell className=""></Table.HeaderCell>
            <Table.HeaderCell className="three wide">Name</Table.HeaderCell>
            <Table.HeaderCell className="four wide">Price</Table.HeaderCell>
            <Table.HeaderCell className="four wide">24hr</Table.HeaderCell>
            <Table.HeaderCell className="three wide td-dis">
              MarketCap
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="tb">{renderMarket()}</Table.Body>
      </Table>
      {renderNotFound()}
      <CoinModal
        open={open}
        setOpen={setOpen}
        info={props.info}
        selectedCoin={props.selectedCoin}
        postFavorite={props.postFavorite}
        favorites={props.favorites}
      />
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    market: state.market,
    selectedCoin: state.selectedCoin,
    info: state.info,
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, {
  getMarket,
  coinSelect,
  modalInfo,
  getFavorites,
})(Market);
