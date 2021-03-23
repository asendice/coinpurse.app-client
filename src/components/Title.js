import React from "react";
import SearchBar from "./SearchBar";
import { Header, Segment, Grid, Divider } from "semantic-ui-react";

const Title = (props) => {
  return (
    <Segment basic  >
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">{props.label}</Header>
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
      <Divider />

    </Segment>
  );
};

export default Title;
