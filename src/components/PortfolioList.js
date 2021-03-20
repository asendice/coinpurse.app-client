import React from "react";
import _ from "lodash";
import { Segment, Header, Card } from "semantic-ui-react";

const PortfolioList = (props) => {
  const mapTransactions = props.transactions.transactions.map((trans) => {
    return {
      // id: trans.id,
      name: trans.trans.name,
      amt: trans.trans.buy
        ? Number(trans.trans.amt)
        : -Math.abs(trans.trans.amt),
      buy: trans.trans.buy,
      total: trans.trans.buy
        ? trans.trans.amt * trans.trans.price
        : -Math.abs(trans.trans.amt * trans.trans.price),
    };
  });

  const mapNameTrans = mapTransactions.map((coin) => {
    return coin.name;
  });
  // const mapNameTrans = mapTransactions.map((coin) => {
  //   if(coin.name === coin.name){
  //     return coin
  //   }
  // });
  // console.log(mapNameTrans);
  // console.log(mapNameTrans);

  // Contains updated portfolio list (market filtered by transaction names)
  const filterMarket = props.market.filter((coin) => {
    if (mapNameTrans.includes(coin.name)) {
      return coin;
    }
  });
  const join = mapTransactions.concat(filterMarket);
  console.log("join", join);

  const counts = _.countBy(mapTransactions, "name");
  console.log(_.filter(mapTransactions, (x) => counts[x.name] > 1));


const result = join.reduce((prev, item) => {
    const newItem = prev.find((i) => {
        return i.name === item.name; 
    });
    console.log('newItem', newItem);
    if (newItem) {
        Object.assign(newItem, item);
    } else {
        prev.push(item);
    }
    return prev;
}, []);

console.log('result',result);

  // const hmm = Object.assign(mapTransactions, filterMarket);
  // console.log('hmm', hmm)
  // const merge = { ...filterMarket, ...mapTransactions };
  // console.log("merge", merge);

  // console.log("original", props.transactions.transactions);
  // console.log("mapped", mapTransactions);
  // console.log("filterMarket", filterMarket);

  const renderCard = () => {};
  return (
    <>
      <Segment>
        <Header as="h2">Portfolio List</Header>
      </Segment>
      <Segment basic>{renderCard()}</Segment>
    </>
  );
};

export default PortfolioList;
