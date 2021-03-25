import React from "react";
import { roundComma, ifNegative } from "../number/NumberChanger";
import {
  Header,
  Segment,
  Divider,
  Statistic,
  Grid,
  Icon,
  Image,
} from "semantic-ui-react";

const UserStats = (props) => {
  const renderTopGain = () => {
    if (props.portList.list.length > 0) {
      const portListMap = props.portList.list.map((coin) => {
        console.log("coin1", coin);
        return {
          name: coin.name,
          image: coin.image,
          symbol: coin.symbol,
          gain: coin.amt * coin.current_price - coin.total,
        };
      });
      const top = portListMap.reduce((prev, current) => {
        return prev.gain > current.gain ? prev : current;
      });
      return (
        <>
          <Statistic size="mini">
            <Statistic.Label>
              <Image avatar src={top.image} />
              {top.symbol}
            </Statistic.Label>
            <Statistic.Value style={{ color: top.gain > 0 ? "green" : "red" }}>
              {ifNegative(roundComma(top.gain))}
            </Statistic.Value>
            <Statistic.Label style={{ color: "grey" }}>
              <Icon name="arrow up" />
              Top Perfomer
            </Statistic.Label>
          </Statistic>
        </>
      );
    }
  };
  const renderWorstGain = () => {
    if (props.portList.list.length > 0) {
      const portListMap = props.portList.list.map((coin) => {
        console.log("coin1", coin);
        return {
          name: coin.name,
          image: coin.image,
          symbol: coin.symbol,
          gain: coin.amt * coin.current_price - coin.total,
        };
      });
      const bot = portListMap.reduce((prev, current) => {
        return prev.gain < current.gain ? prev : current;
      });
      console.log("top", bot);
      return (
        <>
          <Statistic size="mini">
            <Statistic.Label>
              <Image avatar src={bot.image} />
              {bot.symbol}
            </Statistic.Label>
            <Statistic.Value style={{ color: bot.gain > 0 ? "green" : "red" }}>
              {" "}
              {ifNegative(roundComma(bot.gain))}
            </Statistic.Value>
            <Statistic.Label style={{ color: "grey" }}>
              <Icon name="arrow down" />
              Worst Performer
            </Statistic.Label>
          </Statistic>
        </>
      );
    }
  };

  return (
    <>
      <Header as="h2">{props.header}</Header>
      <Divider />
      <Segment basic textAlign="center">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Statistic size="small">
                <Statistic.Value>{`$${roundComma(
                  props.portTotal
                )}`}</Statistic.Value>
                <Statistic.Label style={{ color: "grey" }}>
                  Estimated Total
                </Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Statistic size="tiny">
                <Statistic.Value
                  style={{ color: props.portGain > 0 ? "green" : "red" }}
                >
                  {ifNegative(roundComma(props.portGain))}
                </Statistic.Value>
                <Statistic.Label style={{ color: "grey" }}>
                  Estimated Gain
                </Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>{renderTopGain()}</Grid.Column>
            <Grid.Column>{renderWorstGain()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default UserStats;
