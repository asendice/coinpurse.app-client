import React from "react";
import SearchBar from "./SearchBar";
import { Header, Segment, Grid, Divider, Label } from "semantic-ui-react";

const Title = (props) => {
  return (
    <Segment basic  >
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Label size="large"><Header as="h2">{props.label}</Header></Label>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <SearchBar
              label={` Search ${props.label}...`}
              term={props.term}
              onTermSubmit={props.onTermSubmit}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider hidden />
      <Divider hidden />

    </Segment>
  );
};

export default Title;
