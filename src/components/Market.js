import React, { useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { getMarket } from "../actions";
import { roundComma, convertMc } from "../number/NumberChanger";

const Market = (props) => {
  useEffect(() => {
    props.getMarket();
  }, []);

  const renderMarket = () => {
    return props.market.map((coin) => {
      return (
        <tr key={coin.id}>
          <td>
            <h4>{coin.market_cap_rank}</h4>
          </td>
          <td>
            <img className="ui image avatar" src={coin.image} />
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
            <h4>{roundComma(coin.price_change_percentage_24h)}%</h4>
          </td>
          <td>
            <h4>${convertMc(coin.market_cap)}</h4>
          </td>
        </tr>
      );
    });
  };
  // tablet={3} computer={3} mobile={0}
  //mobile={16} tablet={13} computer={13}

  return (
    <div className="ui massive container">
      <div style={{ backgroundColor: "#fff", color: "#000" }} className="ui large segment">
        <h1>Market</h1>
        <table className="ui padded unstackable table">
          <thead>
            <tr>
              <th className="">Rank</th>
              <th className=""></th>
              <th className="four wide">Name</th>
              <th className="four wide">Price</th>
              <th className="four wide">24hr</th>
              <th className="three wide">MarketCap</th>
            </tr>
          </thead>
          <tbody>{renderMarket()}</tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { market: state.market };
};
export default connect(mapStateToProps, { getMarket })(Market);
