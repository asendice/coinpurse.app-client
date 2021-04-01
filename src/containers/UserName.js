import React from "react";
import { connect } from "react-redux";
import { Segment, Header, Icon } from "semantic-ui-react";

const UserName = (props) => {
  if (props.isLoggedIn) {
    return (
      <>
        <Segment style={{ float: "right" }} basic>
          <Header>
            {" "}
            <Icon size="tini" name="user" />
            {props.userInfo.data.message.name}
          </Header>
        </Segment>
      </>
    );
  } else {
    return <Segment style={{ float: "right" }} basic></Segment>;
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLoggedIn: state.userInfo.status === 200,
  };
};

export default connect(mapStateToProps, null)(UserName);
