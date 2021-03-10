import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const SearchNotFound = (props) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="frown"/>
        <h2>{`"${props.term} "`}</h2>
        <h3>{props.nf}</h3>
      </Header>
    </Segment>
  );
};

export default SearchNotFound;
