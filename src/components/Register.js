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
import CosmoPic from './img/regPic.png';
import { copyRight } from "../number/NumberChanger";
import { Field, reduxForm } from "redux-form";
let Signup = () => {
  return (
    <>
      <Container>
        <Grid columns={2} stackable>
          <Grid.Column computer={10} tablet={16}>
            <Segment padded="very">
              <Segment basic textAlign="center">
                <Header as="h1">Join Now -- It's Free & Easy!</Header>
              </Segment>
              <Form textAlign="left">
                <Label>Username</Label>
                <Field name="username" component="input" type="text" />
                <Divider hidden />
                <Label>Email</Label>
                <Field name="email" component="input" type="text" />
                <Divider hidden />
                <Label>Password</Label>
                <Field name="password" component="input" type="text" />
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
                  Have an Account? <a href="/login">Log In! Let's Go!</a>
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
                <Card.Meta>
                  THIS COULD BE YOU
                </Card.Meta>
                <Card.Description>
                  <Header>$235,678</Header>
                </Card.Description>
                <Card.Content>
                  <Card.Meta className="right floated">To the Moon!  <Icon name="rocket"/></Card.Meta>
                </Card.Content>
                </Card.Content>
              </Card>
              <Card link href="/market" centered fluid>
                <Card.Content><Header as="h3">Market</Header></Card.Content>
                <Image src={CosmoPic}/>
              </Card>
            </Segment>
          </Grid.Column>
        </Grid>
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

export default Signup;
