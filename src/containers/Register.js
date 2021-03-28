import React from "react";
import {
  Form,
  Container,
  Segment,
  Grid,
  Header,
  Divider,
  Card,
  Statistic,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import CosmoPic from "../img/regPic.png";
import { copyRight } from "../number/NumberChanger";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";

const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const required = (x) => {
  if (!x || x === "") {
    return (
      <span style={{ color: "red" }}>
        *This field is required to create your account.
      </span>
    );
  }
  return undefined;
};

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? (
    <span style={{ color: "red" }}>*Invalid Email address.</span>
  ) : undefined;

const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

const length = (value) =>
  value && value.length < 4 ? (
    <span style={{ color: "red" }}>
      {`*This field must contain more than 4 characters.`}
    </span>
  ) : undefined;
const maxLength = (value) =>
  value && value.length > 11 ? (
    <span style={{ color: "red" }}>
      {`*This field must contain no more than 12 characters.`}
    </span>
  ) : undefined;

const userNameVal = (value) =>
  value && value.includes(" ") ? (
    <span style={{ color: "red" }}>*This field cannot include spaces.</span>
  ) : undefined;

let Signup = () => {
  return (
    <>
      <Container fluid style={{ minHeight: "100vh" }}>
        <Grid columns={2} stackable>
          <Grid.Column computer={10} tablet={16}>
            <Segment padded="very">
              <Segment basic textAlign="center">
                <Header as="h1">Join Now -- It's Free & Easy!</Header>
              </Segment>
              <Form textAlign="left">
                <Label>Username</Label>
                <Field
                  type="text"
                  name="username"
                  component={renderInput}
                  placeholder="username"
                  validate={[length, userNameVal, maxLength, required, alphaNumeric]}
                />
                <Divider hidden />
                <Label>Email</Label>
                <Field
                  name="email"
                  component={renderInput}
                  type="email"
                  validate={[email, required]}
                />
                <Divider hidden />
                <Label>Password</Label>
                <Field
                  name="password"
                  component={renderInput}
                  type="password"
                  validate={[length, required]}
                />
                <Divider hidden />
                <Label>Crypto Knowledge </Label>
                <Field name="skill" component="select">
                  <option></option>
                  <option>new</option>
                  <option>novice</option>
                  <option>intermediate</option>
                  <option>advanced</option>
                </Field>
                <Divider hidden />
                <button className="ui button massive fluid ">
                  Create Your Free Account!
                </button>
              </Form>
              <Segment basic textAlign="center">
                <Header as="h4">
                  Already Have An Account? <a href="/login">Log In! Let's Go!</a>
                </Header>
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={6} tablet={16}>
            <Segment basic>
              <Card centered fluid>
                <Card.Content>
                  <Header textAlign="center" as="h2">
                    Active Users:
                  </Header>
                </Card.Content>
                <Card.Content textAlign="center">
                  <Segment>
                    <Statistic size="small">
                      <Statistic.Value>
                        <Icon name="user outline" /> 0
                      </Statistic.Value>
                    </Statistic>
                  </Segment>
                </Card.Content>
              </Card>
              <Card centered fluid>
                <Card.Content>
                  <div>
                    <Icon name="exchange" className="right floated large" />
                    <Header as="h2">Your Portfolio</Header>
                  </div>
                  <Card.Meta>THIS COULD BE YOU</Card.Meta>
                  <Card.Description>
                    <Header>$235,678</Header>
                  </Card.Description>
                  <Card.Content>
                    <Card.Meta className="right floated">
                      To the Moon! <Icon name="rocket" />
                    </Card.Meta>
                  </Card.Content>
                </Card.Content>
              </Card>
              <Card link href="/market" centered fluid>
                <Card.Content>
                  <Header as="h3">Market</Header>
                </Card.Content>
                <Image src={CosmoPic} />
              </Card>
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider hidden/>
        <Divider hidden/>
        <Divider />
        <Segment basic textAlign="center">
          {copyRight()}
        </Segment>
      </Container>
    </>
  );
};

Signup = reduxForm({
  form: "signup",
})(Signup);

const selector = formValueSelector("signup");
Signup = connect((state) => {
  const values = selector(state, "username", "email", "password", "skill");
  return {
    values,
  };
})(Signup);

export default Signup;
