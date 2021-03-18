import React, { useState, useEffect } from "react";
import { Icon, Segment } from "semantic-ui-react";
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
    return filterMarket.map((coin) => {
      return (
        <tr
          key={coin.id}
          onClick={() => onTableRowClick(coin)}
          className="td-click"
        >
          <td className="td-dis">
            <h4>{coin.market_cap_rank}</h4>
          </td>
          <td>
            <img
              className="ui image avatar"
              src={coin.image}
              alt={coin.image}
            />
          </td>
          <td>
            <h4>{coin.name}</h4>
          </td>
          <td>
            <h4>${roundComma(coin.current_price)}</h4>
          </td>
          <td
            style={{
              color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
            }}
          >
            <h4>
              {renderArrow(coin.price_change_percentage_24h)}
              {roundComma(coin.price_change_percentage_24h)}%
            </h4>
          </td>
          <td className="td-dis">
            <h4>${convertMc(coin.market_cap)}</h4>
          </td>
        </tr>
      );
    });
  };

  return (
    <Segment padded raised>
      <Title term={term} onTermSubmit={onTermSubmit} label="market" />
      <table className="ui unstackable table">
        <thead>
          <tr>
            <th className="td-dis">Rank</th>
            <th className=""></th>
            <th className="three wide">Name</th>
            <th className="four wide">Price</th>
            <th className="four wide">24hr</th>
            <th className="three wide td-dis">MarketCap</th>
          </tr>
        </thead>
        <tbody className="tb">{renderMarket()}</tbody>
      </table>
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
    favorites: state.favorites
  };
};

export default connect(mapStateToProps, { getMarket, coinSelect, modalInfo, getFavorites })(
  Market
);
