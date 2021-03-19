import React from "react";
import { date, time } from "../number/NumberChanger";
import { Divider, Segment, Form, TextArea, Label } from "semantic-ui-react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

const renderTextArea = ({ input }) => {
  return (
    <TextArea
      {...input}
      style={{ maxHeight: 60, minHeight: 60 }}
      placeholder="I bought 50,000 Dogecoin because I read on reddit.com that Dogecoin is going to the moon! HEY, does this app have GME?"
    />
  );
};


const renderAmt = ({ input }) => {
  return <input {...(input)} />;
};

const required = (v) => {
  if (!v || v === "") {
    return <Label>"This field is required"</Label>;
  }
  return undefined;
};

let TransactionForm = (props) => {
  return (
    <Form className="ui form" onSubmit={props.handleSubmit(props.onFormSubmit)}>
      <Label>Date of trade: {date} </Label>
      <Divider hidden />
      <Label>Time of trade: {time}</Label>
      <Divider hidden />
      <Label>Amount of {props.coin.name}</Label>
      <Field
        name="amt"
        component={renderAmt}
        placeholder="qty"
        validate={required}
      />
      <Divider hidden />
      <Label>Notes about trade</Label>
      <Field name="note" component={renderTextArea} type="text" />
      <Divider hidden />
      <Segment basic textAlign="center">
        <button
          onClick={props.onBuyClick}
          disabled={!props.valid}
          type="submit"
          className="ui inverted button green"
        >
          Buy
        </button>
        <button
          onClick={props.onSellClick}
          disabled={!props.valid}
          type="submit"
          className="ui inverted button red"
        >
          Sell
        </button>
      </Segment>
    </Form>
  );
};

TransactionForm = reduxForm({
  form: "transaction",
})(TransactionForm);

const selector = formValueSelector("transaction");
TransactionForm = connect((state) => {
  const values = selector(state, "amt", "note", "time", "date");
  return {
    values,
  };
})(TransactionForm);

export default TransactionForm;
