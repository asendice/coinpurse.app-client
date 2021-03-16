import React, { useState } from "react";
import _ from "lodash";
import {
  Modal,
  Segment,
  Accordion,
  Header,
  Image,
  Grid,
  Label,
  Icon,
  Popup,
  Divider,
} from "semantic-ui-react";
import TransactionForm from './TransactionForm';
import { roundComma } from "../number/NumberChanger";

const CoinModal = (props) => {
  const[activeIndex, setActiveIndex] = useState(1);
  const[index] = useState(0);

  const values = [
    `$${roundComma(props.selectedCoin.current_price)}`,
    `${roundComma(props.selectedCoin.price_change_percentage_24h)}%`,
    `$${roundComma(props.selectedCoin.market_cap)}`,
    `${roundComma(props.selectedCoin.market_cap_change_percentage_24h)}%`,
    `$${roundComma(props.selectedCoin.ath)}`,
    `$${props.selectedCoin.atl}`,
    `${roundComma(props.selectedCoin.circulating_supply)}`,
    props.selectedCoin.total_supply > 0
      ? `${roundComma(props.selectedCoin.total_supply)}`
      : "Not Available",
  ];

  const handleClick= (e) => {
    console.log('Add Transactions')
    const newIndex = activeIndex === index ? -1 : index;
    console.log('newIdex ', newIndex)
    setActiveIndex(newIndex);
  }

  const renderLabel = () => {
    const join = _.zip(values, props.info);
    if (join[1][1]) {
      return join.map((stat) => {
        return (
          <Grid.Column key={stat[1].id}>
            <Popup
              content={stat[1].labelDescription}
              position="right center"
              trigger={
                <Label style={{ cursor: "default" }} color="grey">
                  {stat[1].label}
                </Label>
              }
            />
            <Segment>
              <Header as="h5">{stat[0]}</Header>
            </Segment>
            <Divider hidden/>
          </Grid.Column>
        );
      });
    } else {
      return <div>nothing populated</div>;
    }
  };

  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      size="large"
      centered
    >
      <Modal.Header>
        <Image avatar src={props.selectedCoin.image} />
        {props.selectedCoin.name}
        <span style={{ color: "grey" }}> {props.selectedCoin.symbol}</span>
        <span style={{ float: "right" }}>
          <Popup
            content="Add to Favorites?"
            trigger={<Icon name="heart outline" color="red" />}
          />
        </span>
      </Modal.Header>
      <Modal.Content>
        <Grid container columns={4} stackable>
          <Grid.Row>{renderLabel()}</Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Content>
        <Accordion>
          <Accordion.Title
          onClick={() => handleClick()}
          index={index}
          active={activeIndex === 0}
          icon={<Icon name={activeIndex === 0 ? "minus" : "plus"}/>}
          content={<Label size="large" color="grey">{activeIndex === 0 ? `Enter Transaction Information for ${props.selectedCoin.name}` : "Add Transactions?"}</Label>}
          />
        <Accordion.Content active={activeIndex === 0} content={<TransactionForm coin={props.selectedCoin} />} />
        </Accordion>
      </Modal.Content>
    </Modal>
  );
};

export default CoinModal;
