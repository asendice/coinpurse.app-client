import React from "react";
import { Segment, Header, Card } from "semantic-ui-react";

const PortfolioList = (props) => {

  const renderCard = () => {
    
  }

  return (
    <>
      <Segment>
        <Header as="h2">Portfolio List</Header>
      </Segment>
      <Segment basic>
        {renderCard}
      </Segment>
    </>
  );
};

export default PortfolioList;
