import React, { useState } from "react";
import {
  Container,
  Segment,
  Grid,
  Header,
  Divider,
  Card,
  Statistic,
  Icon,
  Image,
  Modal,
  Button,
} from "semantic-ui-react";
import RegisterForm from "./RegisterForm";
import CosmoPic from "../img/regPic.png";
import { copyRight } from "../number/NumberChanger";
import { connect } from "react-redux";
import { register } from "../actions";

const Register = (props) => {
  const [open, setOpen] = useState(false);

  const onFormSubmit = (values) => {
    props.register(values);
    setOpen(true);
  };

  const renderModalInfo = () => {
    if (props.registerInfo.status === 200) {
      return (
        <>
          <Modal.Header>
            Success, "{props.registerInfo.data.result.name}" has successfully
            registered to Coinpurse!
          </Modal.Header>
          <Modal.Content>
            <Button href="/login" color="green" style={{ float: "right" }}>
              Login
            </Button>
          </Modal.Content>
        </>
      );
    } else if (props.registerInfo.status === 422) {
      const mapRegInfo = props.registerInfo.data.errors.map((errors) => {
        return errors.user || errors.password || errors.email;
      });
      return (
        <>
          <Modal.Header>
            Failed to register your account because {mapRegInfo}
          </Modal.Header>
          <Modal.Content>
            <Button href="/register" color="orange" style={{ float: "right" }}>
              Try Again
            </Button>
          </Modal.Content>
        </>
      );
    } else {
      return (
        <>
          <Modal.Header>Failed to register.</Modal.Header>
          <Modal.Content>
            <Button href="/register" color="orange" style={{ float: "right" }}>
              Try Again
            </Button>
          </Modal.Content>
        </>
      );
    }
  };

  return (
    <>
      <Container style={{ minHeight: 890 }}>
        <Grid columns={2} stackable>
          <Grid.Column computer={10} tablet={16}>
            <Segment padded="very">
              <Segment basic textAlign="center">
                <Header as="h1">Join Now -- It's Free & Easy!</Header>
              </Segment>
              <RegisterForm onFormSubmit={onFormSubmit} />
              <Segment basic textAlign="center">
                <Header as="h4">
                  Already Have An Account?{" "}
                  <a href="/login">Log In! Let's Go!</a>
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
        <Divider hidden />
        <Divider hidden />
      </Container>
      <Divider />
      <Segment basic textAlign="center">
        {copyRight()}
      </Segment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        centered
      >
        {renderModalInfo()}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registerInfo: state.registerInfo,
  };
};

const mapDispatchToProps = {
  register: (formValues) => register(formValues),
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
