import React from "react";
import { Modal, Image, Grid, Statistic, Icon } from "semantic-ui-react";
import { roundComma, convertMc } from "../number/NumberChanger";
import { connect } from "react-redux";

const CoinModal = (props) => {
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
        <span style={{color: "grey"}}> {props.selectedCoin.symbol}</span>
        <span style={{float: "right"}}><Icon name="heart outline" color="red"/></span>
      </Modal.Header>
      <Modal.Content>
        <Grid columns={4} divided stackable>
          <Grid.Row>
            <Grid.Column>
              <Statistic size="tiny">
                <Statistic.Value>
                  ${roundComma(props.selectedCoin.current_price)}
                </Statistic.Value>
                <Statistic.Label>Price</Statistic.Label>
              </Statistic>
              <Statistic size="tiny">
                <Statistic.Value>
                  {roundComma(props.selectedCoin.price_change_percentage_24h)}%
                </Statistic.Value>
                <Statistic.Label>24hr Price Percent Change</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size="tiny" floated="left">
                <Statistic.Value>
                  ${convertMc(props.selectedCoin.market_cap)}
                </Statistic.Value>
                <Statistic.Label>
                  ${roundComma(props.selectedCoin.market_cap)}
                </Statistic.Label>
                <Statistic.Label>Market Cap</Statistic.Label>
              </Statistic>
              <Statistic size="tiny" floated="left">
                <Statistic.Value>
                  {roundComma(props.selectedCoin.market_cap_change_percentage_24h)}%
                </Statistic.Value>
                <Statistic.Label>24hr Market Cap Percent Change</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size="tiny">
                <Statistic.Value>
                  ${roundComma(props.selectedCoin.ath)}
                </Statistic.Value>
                <Statistic.Label>all time high</Statistic.Label>
              </Statistic>
              <Statistic size="tiny">
                <Statistic.Value>
                  {props.selectedCoin.ath_date}
                </Statistic.Value>
                <Statistic.Label>all time high date</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size="tiny">
                <Statistic.Value>
                  {roundComma(props.selectedCoin.circulating_supply)}
                </Statistic.Value>
                <Statistic.Label>Circulating Supply</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedCoin: state.selectedCoin,
  };
};
export default connect(mapStateToProps)(CoinModal);
