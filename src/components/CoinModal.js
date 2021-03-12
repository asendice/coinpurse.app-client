import React, { useEffect } from "react";
import {
  Modal,
  Header,
  Image,
  Grid,
  Label,
  Icon,
  Popup,
  Segment,
} from "semantic-ui-react";
import { roundComma } from "../number/NumberChanger";
import { modalInfo } from "../actions/index";
import { connect } from "react-redux";

const CoinModal = (props) => {
  useEffect(() => {
    props.modalInfo();
  }, []);

  //     value: `$${roundComma(props.selectedCoin.current_price)}`,
  //     valueB: `${roundComma(props.selectedCoin.price_change_percentage_24h)}%`,
  //     value: `$${roundComma(props.selectedCoin.market_cap)}`,
  //     valueB: `${roundComma(props.selectedCoin.market_cap_change_percentage_24h)}%`,
  //     value: `$${roundComma(props.selectedCoin.ath)}`,
  //     valueB: `$${props.selectedCoin.atl}`,
  //     value: `${roundComma(props.selectedCoin.circulating_supply)}`,
  //     valueB: `${
  //       props.selectedCoin.total_supply > 0
  //         ? `$${roundComma(props.selectedCoin.total_supply)}`
  //         : "Not Available"
  //     }`,

  const renderGridColumn = () => {
    return props.info.map((stat) => {
      return (
        <Grid.Column>
          <Popup
            content={stat.labelDescription}
            position="right center"
            trigger={
              <Label style={{ cursor: "default" }} color="grey">
                {stat.label}
              </Label>
            }
          />
          <Segment>
            <h4>{stat.value}</h4>
          </Segment>
          <Popup
            content={stat.labelDescriptionB}
            position="right center"
            trigger={
              <Label style={{ cursor: "default" }} color="grey">
                {stat.labelB}
              </Label>
            }
          />
          <Segment>
            <h4>{stat.valueB}</h4>
          </Segment>
        </Grid.Column>
      );
    });
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
        <Grid container columns={4} stackable divided>
          <Grid.Row>{renderGridColumn()}</Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Content>
        <Header>Enter Trade</Header>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCoin: state.selectedCoin,
    info: state.info,
  };
};
export default connect(mapStateToProps, { modalInfo })(CoinModal);
