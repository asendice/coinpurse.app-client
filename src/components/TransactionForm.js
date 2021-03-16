import React from "react";
import { date, time } from "../number/NumberChanger";
import { Form, Divider, Segment, Header, TextArea } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

let TransactionForm = (props) => {
  const renderTextArea = () => {
    return (
      <TextArea style={{ maxHeight: 60, minHeight: 60}} placeholder="I bought 50,000 Doge Coins because 'reddit' says it's going to the moon! " />
    )
  }
  return (
    <Form className="ui form">
      <Segment>
        <Form.Field>Date of trade: {date}</Form.Field>
        <Form.Field>Time of trade: {time}</Form.Field>
      </Segment>
      <label><Header as="h4">amount of {props.coin.name}</Header></label>
      <Field name="enter amount" component="input" type="text" placeholder="qty"/>
      <Divider hidden/>
      <label><Header as="h4">enter notes about trade</Header></label>
      <Field name="enter amount" component={renderTextArea} type="text" />
      <Divider hidden/>
      <Segment basic textAlign="center">
        <button className="ui inverted button green">Buy</button>
        <button className="ui inverted button red">Sell</button>
      </Segment>
    </Form>
  );
};

TransactionForm = reduxForm({
  form: "transaction",
})(TransactionForm);

export default TransactionForm;
