import React from "react";
import { roundComma } from "../number/NumberChanger";
import { Segment, Header, Icon } from "semantic-ui-react";

const Favorites = (props) => {
  console.log('props.favorites', props.favorites);
  const renderTableRow = () => {
    const mapFavorites = props.favorites.favorites.map((fav) => {
      return fav.coin;
    });

    const filterMarket = props.market.filter((coin) => {
      if (mapFavorites.includes(coin.symbol)) {
        return coin;
      }
    });

    if (props.favorites.favorites) {
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
            <td>{`${roundComma(fav.price_change_percentage_24h)}%`}</td>
            <td><Icon style={{color: "grey"}} name="x" onClick={() => props.deleteFavorite(fav.symbol)}/></td>
          </tr>
        );
      });
    } else {
      return <td>Nada</td>;
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
