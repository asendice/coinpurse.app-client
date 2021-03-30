import React, { useState, useEffect } from "react";
import { Segment, Label, Popup, Icon, Header } from "semantic-ui-react";
import Title from "../components/Title";
import SearchNotFound from "../components/SearchNotFound";
import { roundComma } from "../number/NumberChanger";
import { getTransactions } from "../actions";
import { connect } from "react-redux";

const RecentTransactions = (props) => {
  const [term, setTerm] = useState("");

  const GetTransData = () => {
    const { getTransactions } = props;
    useEffect(() => {
      getTransactions();
    }, [getTransactions]);
  };
  GetTransData();

  const onTermSubmit = (term) => {
    setTerm(term);
  };

  const sortTrans = props.transactions.transactions.sort(
    (a, b) =>
      b.trans.date.localeCompare(a.trans.date) ||
      b.trans.time.localeCompare(a.trans.time)
  );

  const filterTransactionsByTerm = sortTrans.filter((trans) => {
    if (
      trans.trans.name.toLowerCase().includes(term) ||
      trans.trans.symbol.toLowerCase().includes(term) ||
      trans.trans.date.includes(term)
    ) {
      return trans;
    } else {
      return null;
    }
  });

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
                <div>{trans.trans.date}</div>
                <div>{trans.trans.time}</div>
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
                <Header as ="h4"  style={{color:"green"}}>{(trans.trans.amt)}</Header>
              ) : (
                <Header as ="h4"  style={{color:"red"}}>{(trans.trans.amt)}</Header>
              )}
            </td>
            <td>{`$${roundComma(trans.trans.price)}`}</td>
            <td className="td-dis">{`$${roundComma(
              Number(trans.trans.amt * trans.trans.price)
            )}`}</td>
            <td>
              {trans.trans.note ? (
                <Popup
                  content={trans.trans.note}
                  position="top center"
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
              <th className="td-dis two-wide">Name</th>
              <th className="two-wide">Qty</th>
              <th className="two-wide">Price</th>
              <th className="td-dis two-wide">Total</th>
              <th className="one-wide">Notes</th>
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

const mapDispatchToProps = {
  getTransactions: () => getTransactions(),
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTransactions);
