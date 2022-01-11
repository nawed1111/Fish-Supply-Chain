import React, { Component } from "react";
import Layout from "../components/Layout";
import { Card, Form, Input, Message } from "semantic-ui-react";

import gateway from "../bridge/gateway";
import web3 from "../bridge/web3";
import AddRole from "../components/AddRole";
import ActionForm from "../components/Action";

const tunaLiteraState = {
  0: "Caught",
  1: "Recorded",
  2: "Audited",
  3: "Bought",
};

class TunaFishDashboard extends Component {
  state = {
    upc: "",
    errMsg: "",
    loading: false,
    trackingDetails: {},
    role: "",
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errMsg: "", role: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const tunaDetails = await gateway.methods
        .queryTuna(this.state.upc)
        .call({ from: accounts[0] });

      this.setState({ trackingDetails: tunaDetails });
      console.log(tunaDetails);
    } catch (err) {
      this.setState({ errMsg: err.message });
    }
    this.setState({ loading: false });
  };

  renderTrackingDetails() {
    const {
      ownerID,
      originCoastLocation,
      auditStatus,
      regulatorID,
      tunaNotes,
      tunaPrice,
      tunaState,
    } = this.state.trackingDetails;
    const price = web3.utils.fromWei(tunaPrice, "ether");
    return (
      <Card fluid>
        <Card.Content
          header={`Tuna Fish UPC ${this.state.upc}`}
          textAlign="center"
        />
        <Card.Content description={`Owner ID: ${ownerID}`} />
        <Card.Content
          description={`Origin Coast Location: ${
            originCoastLocation ? originCoastLocation : "Not Recorded yet"
          }`}
        />
        <Card.Content
          description={`Current State: ${tunaLiteraState[tunaState]}`}
        />
        <Card.Content
          description={`Notes: ${tunaNotes ? tunaNotes : "Not Recorded yet"}`}
        />
        <Card.Content
          description={`Price (ETH): ${price > 0 ? price : "Not Recorded yet"}`}
        />
        <Card.Content
          description={`Audit Status: ${
            auditStatus ? auditStatus : "Not Audited yet"
          }`}
        />
        <Card.Content description={`Regulator: ${regulatorID}`} />
      </Card>
    );
  }

  render() {
    return (
      <Layout
        getRole={(role) =>
          this.setState({ role, trackingDetails: {}, upc: "" })
        }
      >
        <h3>Fetch Tuna Details</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
          <Form.Field>
            <label>UPC</label>
            <Input
              focus
              icon="search"
              iconPosition="left"
              placeholder="Search..."
              action="Fetch"
              value={this.state.upc}
              onChange={(event) => this.setState({ upc: event.target.value })}
              loading={this.state.loading}
            />
          </Form.Field>
          <Message
            error
            header="There are error/s with your submission"
            content={this.state.errMsg}
          />
        </Form>
        {Object.keys(this.state.trackingDetails).length
          ? this.renderTrackingDetails()
          : undefined}

        {this.state.role === "Fisherman" ||
        this.state.role === "Regulator" ||
        this.state.role === "Restaurant" ? (
          <AddRole role={this.state.role} />
        ) : (
          this.state.role && <ActionForm selected={this.state.role} />
        )}
      </Layout>
    );
  }
}

export default TunaFishDashboard;
