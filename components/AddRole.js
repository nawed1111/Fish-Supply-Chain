import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import web3 from "../bridge/web3";
import gateway from "../bridge/gateway";

class AddRole extends Component {
  state = {
    address: "",
    errMsg: "",
    loading: false,
  };
  async onSubmit(event, role) {
    event.preventDefault();
    let roleEvent;
    switch (role) {
      case "Fisherman":
        roleEvent = "addFisherman";
        break;
      case "Regulator":
        roleEvent = "addRegulator";
        break;
      case "Restaurant":
        roleEvent = "addRestaurant";
        break;
    }
    this.setState({ errMsg: "", loading: true });
    try {
      const accounts = await web3.eth.getAccounts();

      await gateway.methods[roleEvent](this.state.address).send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ errMsg: err.message });
    }
    this.setState({ loading: false, address: "" });
  }
  render() {
    return (
      <div>
        <h3>Add {this.props.role}</h3>
        <Form
          onSubmit={(event) => this.onSubmit(event, this.props.role)}
          error={!!this.state.errMsg}
        >
          <Form.Field>
            <label>Address</label>
            <Input
              focus
              icon="address card"
              iconPosition="left"
              placeholder="Address..."
              value={this.state.address}
              onChange={(event) =>
                this.setState({ address: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header="There are error/s with your submission"
            content={this.state.errMsg}
          />
          <Button type="submit" loading={this.state.loading} color="blue">
            Add
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddRole;
