import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";

import web3 from "../bridge/web3";
import gateway from "../bridge/gateway";

class ActionForm extends Component {
  state = {
    upc: "",
    originFishermanID: "",
    originCoastLocation: "",
    tunaNotes: "",
    tunaPrice: "",
    auditStatus: "",
    errMsg: "",
    loading: false,
  };
  submitCatch = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const { upc, originFishermanID, originCoastLocation } = this.state;
      const accounts = await web3.eth.getAccounts();
      await gateway.methods
        .catchTuna(upc, originFishermanID, originCoastLocation)
        .send({ from: accounts[0] });
    } catch (error) {
      this.setState({ errMsg: error.message });
    }

    this.setState({ loading: false });
  };

  submitRecord = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const { upc, tunaNotes, tunaPrice } = this.state;
      const price = web3.utils.toWei(tunaPrice, "ether");

      const accounts = await web3.eth.getAccounts();
      await gateway.methods
        .recordTuna(upc, price, tunaNotes)
        .send({ from: accounts[0] });
    } catch (error) {
      this.setState({ errMsg: error.message });
    }

    this.setState({ loading: false });
  };

  submitAudit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const { upc, auditStatus } = this.state;
      const accounts = await web3.eth.getAccounts();
      await gateway.methods
        .auditTuna(upc, auditStatus)
        .send({ from: accounts[0] });
    } catch (error) {
      this.setState({ errMsg: error.message });
    }

    this.setState({ loading: false });
  };
  submitBuy = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "" });
    try {
      const { upc, tunaPrice } = this.state;
      const price = web3.utils.toWei(tunaPrice, "ether");

      const accounts = await web3.eth.getAccounts();
      await gateway.methods
        .buyTuna(upc, price)
        .send({ from: accounts[0], value: price });
    } catch (error) {
      this.setState({ errMsg: error.message });
    }

    this.setState({ loading: false });
  };
  renderCatch() {
    return (
      <Form onSubmit={this.submitCatch} error={!!this.state.errMsg}>
        <Form.Field>
          <label>UPC</label>
          <Input
            value={this.state.upc}
            onChange={(event) => this.setState({ upc: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Origin Fisherman ID</label>
          <Input
            value={this.state.originFishermanID}
            onChange={(event) =>
              this.setState({ originFishermanID: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Origin Coast Location</label>
          <Input
            value={this.state.originCoastLocation}
            onChange={(event) =>
              this.setState({ originCoastLocation: event.target.value })
            }
          />
        </Form.Field>
        <Message
          error
          header="There are error/s with your submission"
          content={this.state.errMsg}
        />
        <Button color="teal" loading={this.state.loading}>
          Catch
        </Button>
      </Form>
    );
  }
  renderRecord() {
    return (
      <Form onSubmit={this.submitRecord} error={!!this.state.errMsg}>
        <Form.Field>
          <label>UPC</label>
          <Input
            value={this.state.upc}
            onChange={(event) => this.setState({ upc: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Tuna Notes</label>
          <Input
            value={this.state.tunaNotes}
            onChange={(event) =>
              this.setState({ tunaNotes: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Tuna Price</label>
          <Input
            label="ETH"
            labelPosition="right"
            value={this.state.tunaPrice}
            onChange={(event) =>
              this.setState({ tunaPrice: event.target.value })
            }
          />
        </Form.Field>
        <Message
          error
          header="There are error/s with your submission"
          content={this.state.errMsg}
        />
        <Button color="teal" loading={this.state.loading}>
          Record
        </Button>
      </Form>
    );
  }
  renderAudit() {
    return (
      <Form onSubmit={this.submitAudit} error={!!this.state.errMsg}>
        <Form.Field>
          <label>UPC</label>
          <Input
            value={this.state.upc}
            onChange={(event) => this.setState({ upc: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Audit Status</label>
          <Input
            value={this.state.auditStatus}
            onChange={(event) =>
              this.setState({ auditStatus: event.target.value })
            }
          />
        </Form.Field>
        <Message
          error
          header="There are error/s with your submission"
          content={this.state.errMsg}
        />
        <Button color="teal" loading={this.state.loading}>
          Audit
        </Button>
      </Form>
    );
  }
  renderBuy() {
    return (
      <Form onSubmit={this.submitBuy} error={!!this.state.errMsg}>
        <Form.Field>
          <label>UPC</label>
          <Input
            value={this.state.upc}
            onChange={(event) => this.setState({ upc: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <Input
            label="ETH"
            labelPosition="right"
            value={this.state.tunaPrice}
            onChange={(event) =>
              this.setState({ tunaPrice: event.target.value })
            }
          />
        </Form.Field>
        <Message
          error
          header="There are error/s with your submission"
          content={this.state.errMsg}
        />
        <Button color="teal" loading={this.state.loading}>
          Buy
        </Button>
      </Form>
    );
  }

  renderSwitch(role) {
    switch (role) {
      case "Catch":
        return this.renderCatch();
      case "Record":
        return this.renderRecord();
      case "Audit":
        return this.renderAudit();
      case "Buy":
        return this.renderBuy();
    }
  }

  render() {
    const role = this.props.selected;
    return (
      <div>
        <h3>{this.props.selected}</h3>
        {this.renderSwitch(role)}
      </div>
    );
  }
}

export default ActionForm;
