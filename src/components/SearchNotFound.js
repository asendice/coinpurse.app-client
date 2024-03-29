import React from "react";
import { Header, Segment } from "semantic-ui-react";

const SearchNotFound = (props) => {
  return (
    <Segment placeholder>
      <Header icon>
        <h2>{`${props.term === "" ? "" : props.term} `}</h2>
        <h3>{props.nf}</h3>
      </Header>
    </Segment>
  );
};

export default SearchNotFound;
