import React, { useState } from "react";
import { Segment, Label, Popup, Icon } from "semantic-ui-react";
import Title from "../components/Title";
import SearchNotFound from "../components/SearchNotFound";
import { roundComma } from "../number/NumberChanger";
import { connect } from "react-redux";

const RecentTransactions = (props) => {
  const [term, setTerm] = useState("");

  const onTermSubmit = (term) => {
    setTerm(term);
  };

  const sortByDate = props.transactions.transactions.sort((a, b) => {
    return b.date - a.date;
  });
  const filterTransactionsByTerm = sortByDate.filter(
    (trans) => {
      if (
        trans.trans.name.toLowerCase().includes(term) ||
        trans.trans.symbol.toLowerCase().includes(term) ||
        trans.trans.date.date.includes(term)
      ) {
        return trans;
      } else {
        return null;
      }
    }
  );

  const renderNotFound = () => {
    if (filterTransactionsByTerm.length === 0) {
      return (
        <div>
          <SearchNotFound term={term} nf="Zero Transactions Found..." />
        </div>
      );
    } else {
      return null;
    }
  };

  const renderTransactions = () => {
    if (props.transactions.transactions.length > 0) {
      return filterTransactionsByTerm.map((trans) => {
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
    } else {
      return null;
    }
  };

  return (
    <>
      {/* style={{ overflow: "auto", maxHeight: 600 }} <--- Might add this type of styling  */}
      <Segment basic style={{ minHeight: 900 }}>
        <Title
          term={term}
          onTermSubmit={onTermSubmit}
          label="Transaction History"
        />
        <table className="ui unstackable table">
          <thead>
            <tr>
              <th className="two wide">Date / Time</th>
              <th className="one wide"></th>
              <th className="td-dis one-wide">Name</th>
              <th className=""></th>
              <th className="">Qty</th>
              <th className="">Price</th>
              <th className="td-dis">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
        {renderNotFound()}
      </Segment>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};

export default connect(mapStateToProps)(RecentTransactions);
