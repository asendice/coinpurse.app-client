import React from "react";
import { roundComma, renderArrow } from "../number/NumberChanger";
import { Segment, Header, Icon } from "semantic-ui-react";

const Favorites = (props) => {
  const handleDeleteClick = (symbol) => {
    const filterFav = props.favorites.favorites.filter(
      (coin) => coin.coin === symbol
    );
    props.deleteFavorite(filterFav[0].id);
  };

  const renderTableRow = () => {
    const mapFavorites = props.favorites.favorites.map((fav) => {
      return fav.coin;
    });

    const filterMarket = props.market.filter((coin) => {
      if (mapFavorites.includes(coin.symbol)) {
        return coin;
      }
    });
    if (props.favorites.favorites.length > 0) {
      return filterMarket.map((fav) => {
        return (
          <tr key={fav.id}>
            <td>
              <img
                className="ui image avatar"
                src={fav.image}
                alt={fav.image}
              />
            </td>
            <td>{fav.name}</td>
            <td>{`$${roundComma(fav.current_price)}`}</td>
            <td
              style={{
                color: fav.price_change_percentage_24h >= 0 ? "green" : "red",
              }}
            >
              {renderArrow(fav.price_change_percentage_24h)}
              {`${roundComma(fav.price_change_percentage_24h)}%`}
            </td>
            <td>
              <Icon
                className="tb"
                style={{ color: "grey" }}
                name="x"
                onClick={() => handleDeleteClick(fav.symbol)}
              />
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td style={{ color: "grey" }}>
            Go to <a href="/market">Market</a> to favorite coins{" "}
            <Icon name="heart" />
          </td>
        </tr>
      );
    }
  };

  return (
    <>
      <Segment size="large">
        <Header as="h2">{props.header}</Header>
        <Segment basic style={{ overflow: "auto", maxHeight: 500 }}>
          <table className="ui table unstackabale">
            <tbody>{renderTableRow()}</tbody>
          </table>
        </Segment>
      </Segment>
    </>
  );
};

export default Favorites;
