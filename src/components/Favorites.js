import React from "react";
import { roundComma } from "../number/NumberChanger";
import { Segment, Header } from "semantic-ui-react";

const Favorites = (props) => {
  console.log(props.favorites.favorites);
  const renderTableRow = () => {
    if (props.favorites.favorites[1]) {
      return props.favorites.favorites.map((fav) => {
        return (
          <tr>
            <td>
              <img
                className="ui image avatar"
                src={fav.coin.image}
                alt={fav.coin.image}
              />
            </td>
            <td>{fav.coin.name}</td>
            <td>{`$${roundComma(fav.coin.price)}`}</td>
            <td>{`${roundComma(fav.coin.pricePercent)}%`}</td>
          </tr>
        );
      });
    } else {
      return <div>Nada</div>;
    }
  };

  return (
    <>
      <Segment size="large">
        <Header as="h2">{props.header}</Header>
        <Segment basic style={{ overflow: "auto", maxHeight: 500 }}>
          <table className="ui table">
            <tbody>{renderTableRow()}</tbody>
          </table>
        </Segment>
      </Segment>
    </>
  );
};

export default Favorites;
