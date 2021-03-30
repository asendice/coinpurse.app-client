import React, { useState } from "react";
import {
  Card,
  Divider,
  Header,
  Icon,
  Segment,
  Container,
  Modal,
} from "semantic-ui-react";
import { copyRight } from "../number/NumberChanger";
import { Redirect } from "react-router";
import { login } from "../actions";
import LoginForm from "../containers/LoginForm";
import { connect } from "react-redux";
const Login = (props) => {
  const [open, setOpen] = useState(false);
  const onFormSubmit = (formValues) => {
    props.login(formValues);
    setOpen(true);
  };

  console.log(props.userInfo, "data.errors");

  const renderModal = () => {
    if (props.userInfo.status && props.userInfo.status !== 200) {
      const mapUserInfoError = props.userInfo.data.errors.map((errors) => {
        return errors.user || errors.password;
      });
      console.log(mapUserInfoError, "mapped");
      console.log(mapUserInfoError, "mapped");
      return (
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          textAlign="center"
        >
          <Modal.Header>
            Login failed: {mapUserInfoError}
            <Icon name="x" style={{ float: "right" }} />
          </Modal.Header>
        </Modal>
      );
    } else if(props.userInfo.status === 200) {
      return <Redirect to="/market" />;
    }
  };

  return (
    <>
      <Container style={{ minHeight: 850 }}>
        <Segment basic textAlign="center">
          <Header as="h1">
            <Icon name="exchange" />
            coinpurse.app
          </Header>
        </Segment>
        <Card centered>
          <Card.Content>
            <LoginForm onFormSubmit={onFormSubmit} />
            <Divider />
            <Segment basic textAlign="center">
              <Header as="h4">
                New? <a href="/register">Register it's FREE!</a>
              </Header>
            </Segment>
          </Card.Content>
        </Card>
        <Divider hidden />
        <Divider hidden />
      </Container>
      <Segment basic textAlign="center">
        <Divider />
        {copyRight()}
      </Segment>
      {renderModal()}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = {
  login: (formValues) => login(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
