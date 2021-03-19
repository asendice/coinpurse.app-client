import React from "react";
import { Segment, Header, Label } from "semantic-ui-react";
import { roundComma } from "../number/NumberChanger";

const RecentTransactions = (props) => {
  const renderTransactions = () => {
    return props.transactions.transactions.map((trans) => {
      return (
        <tr key={trans.trans.id}>
          <td>
            <Label>
              <div>{trans.trans.date.date}</div>
              <div>{trans.trans.time.time}</div>
            </Label>
          </td>
          <td>
            <img className="ui image avatar" src={trans.trans.image} />
          </td>
          <td>{trans.trans.name}</td>
          <td>
            {trans.trans.buy ? (
              <Label color="green">Buy</Label>
            ) : (
              <Label color="red">Sell</Label>
            )}
          </td>
          <td>{trans.trans.amt}</td>
          <td>{`$${roundComma(trans.trans.price)}`}</td>
          <td>{`$${roundComma(
            Number(trans.trans.amt * trans.trans.price)
          )}`}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <Segment>
        <Header as="h2">Recent Transactions</Header>
        <table className="ui table basic">
          <thead>
            <tr>
              <th className="two wide">Date / Time</th>
              <th className="one wide"></th>
              <th className="td-dis">Name</th>
              <th className=""></th>
              <th className=" ">Qty</th>
              <th className="">Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
      </Segment>
    </>
  );
};

export default RecentTransactions;
