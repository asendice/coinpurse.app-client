import React from "react";
// import { Form } from "semantic-ui-react";
import {
  Card,
  Divider,
  Header,
  Icon,
  Label,
  Segment,
  Container,
} from "semantic-ui-react";
import { copyRight } from "../number/NumberChanger";
import { Field, reduxForm } from "redux-form";

let Login = () => {
  return (
    <Container>
      <Segment basic textAlign="center">
        <Header as="h1">
          <Icon name="exchange"/>
          coinpurse.app
        </Header>
      </Segment>
      <Card centered>
        <Card.Content>
          <form className="ui form">
            <Label>Username</Label>
            <Field name="username" component="input" type="text" />
            <Divider hidden />
            <Label>Password</Label>
            <Field name="password" component="input" type="text" />
            <Divider hidden />
            <button className="ui button massive fluid ">Log In</button>
          </form>
          <Divider />
          <Segment basic textAlign="center">
            <Header as="h4">
              New? <a href="/register">Register it's FREE!</a>
            </Header>
          </Segment>
        </Card.Content>
      </Card>
      <Divider hidden />
      <Divider hidden/>
      <Divider />
      <Segment basic textAlign="center">{copyRight()}</Segment>
    </Container>
  );
};

Login = reduxForm({
  form: "login",
})(Login);

export default Login;
