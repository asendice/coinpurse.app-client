import React from "react";
import {
  Segment,
  Header,
  Label,
  Popup,
  Icon,
  Divider,
} from "semantic-ui-react";
import SearchBar from "./SearchBar";
import Title from "./Title";
import { roundComma } from "../number/NumberChanger";

const RecentTransactions = (props) => {
  const renderTransactions = () => {
    return props.transactions.transactions.map((trans) => {
      return (
        <tr key={trans.id}>
          <td>
            <Label>
              <div>{trans.trans.date.date}</div>
              <div>{trans.trans.time.time}</div>
            </Label>
          </td>
          <td>
            <img
              className="ui image avatar"
              src={trans.trans.image}
              alt={trans.trans.id}
            />
          </td>
          <td className="td-dis">{trans.trans.name}</td>
          <td>
            {trans.trans.buy ? (
              <Label color="green">Buy</Label>
            ) : (
              <Label color="red">Sell</Label>
            )}
          </td>
          <td>{trans.trans.amt}</td>
          <td>{`$${roundComma(trans.trans.price)}`}</td>
          <td className="td-dis">{`$${roundComma(
            Number(trans.trans.amt * trans.trans.price)
          )}`}</td>
          <td>
            {trans.trans.note ? (
              <Popup
                content={trans.trans.note}
                position="top right"
                trigger={<Icon name="clipboard" style={{ color: "grey" }} />}
              />
            ) : (
              <Icon />
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* style={{ overflow: "auto", maxHeight: 600 }} <--- Might add this type of styling  */}
      <Segment basic>
        <Title label="Transaction History"/>
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="two wide">Date / Time</th>
              <th className="one wide"></th>
              <th className="td-dis">Name</th>
              <th className=""></th>
              <th className="">Qty</th>
              <th className="">Price</th>
              <th className="td-dis">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
      </Segment>
    </>
  );
};

export default RecentTransactions;
