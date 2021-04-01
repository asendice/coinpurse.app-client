import React from "react";
import SearchBar from "./SearchBar";
import { rounder } from '../number/NumberChanger'
import { Header, Grid, Divider, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";

const Title = (props) => {
  return (
    <>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header as="h1">{props.label}</Header>
          </Grid.Column>
          <Grid.Column>
            <Label style={{ float: "right" }}>
              <Header as="h3" style={{ display: props.userNameDisplay }}>
                <Icon name="user outline" size="small" />
                {props.userInfo.data.message.name}
                {rounder(props.portPercentGain)}
              </Header>
            </Label>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            textAlign="right"
            style={{ display: props.searchBarDisplay }}
          >
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
      <Divider hidden />
      <Divider hidden />
      <Divider hidden />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo.user,
    isLoggedIn: state.userInfo.loggedIn,
  };
};

export default connect(mapStateToProps, null)(Title);
