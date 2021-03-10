import React, { useState, useEffect } from "react";
import { Grid, Icon , Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { getMarket } from "../actions";
import { roundComma, convertMc } from "../number/NumberChanger";
import SearchBar from "./SearchBar";
import SearchNotFound from "./SearchNotFound";

const Market = (props) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    props.getMarket();
  }, []);

  const onTermSubmit = (term) => {
    setTerm(term);
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
    console.log(filterMarket.length); //returns the length of the market after search term 
    if (filterMarket.length === 0) {
      return <div>
        <SearchNotFound term={term} nf="Zero Results Found..." />
      </div>;
    } else {
      return;
    }
  };

  const renderArrow = (num) => {
    return(
      <Icon className={num >= 0 ? "arrow up" : "arrow down"}/>
    )
  }

  const renderMarket = () => {
    return filterMarket.map((coin) => {
      return (
        <tr key={coin.id}>
          <td className="td-dis">
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
            <h4>{renderArrow(coin.price_change_percentage_24h)}{roundComma(coin.price_change_percentage_24h)}%</h4>
          </td>
          <td className="td-dis">
            <h4>${convertMc(coin.market_cap)}</h4>
          </td>
        </tr>
      );
    });
  };
  return (
    <Grid>
      <Grid.Column computer={1} tablet={1}></Grid.Column>
      <Grid.Column mobile={16} tablet={15} computer={15}>
        <Segment padded raised>
          <h1>Market</h1>
          <SearchBar
            label="search market"
            term={term}
            onTermSubmit={onTermSubmit}
          />
          <table className="ui unstackable table attached">
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
            <tbody>{renderMarket()}</tbody>
          </table>
          {renderNotFound()}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { market: state.market };
};
export default connect(mapStateToProps, { getMarket })(Market);
