import React from "react";
import { roundComma } from "../number/NumberChanger";
import { Header, Segment, Divider, Statistic } from "semantic-ui-react";

const UserStats = (props) => {
  return (
    <>
      <Segment basic>
        <Header as="h2">{props.header}</Header>
        <Divider />
        <Segment
          basic
          textAlign="center"
          style={{ overflow: "auto", maxHeight: 300, minHeight: 300 }}
        >
          <Statistic size="small">
            <Statistic.Value>{`$${roundComma(
              props.portTotal
            )}`}</Statistic.Value>
            <Statistic.Label>Estimated Total</Statistic.Label>
          </Statistic>
          <Statistic size="small">
            <Statistic.Value
              style={{ color: props.portGain > 0 ? "green" : "red" }}
            >{`$${roundComma(props.portGain)}`}</Statistic.Value>
            <Statistic.Label>Estimated Gain</Statistic.Label>
          </Statistic>
        </Segment>
      </Segment>
    </>
  );
};

export default UserStats;
