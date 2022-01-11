import React, { useState } from "react";
import { Header, Divider, Menu, Dropdown, Image } from "semantic-ui-react";
// import Router from "next/router";

const Menubar = (props) => {
  const [activeItem, setActiveItem] = useState("");
  const setActive = (role) => {
    setActiveItem(role);
    props.getRole(role);
  };
  return (
    <div>
      <Header as="h2" textAlign="center">
        <Image src="/tuna.png" circular />
        <Header.Content>Tuna Fish Supply Chain</Header.Content>

        <Divider />
        <p style={{ fontSize: "12px" }}>
          Track the journey of Tuna Fish using Ethereum blockchain
        </p>
      </Header>

      <Menu fluid widths={4}>
        <Menu.Item
          name="Add Fisherman"
          active={activeItem === "Fisherman"}
          onClick={() => setActive("Fisherman")}
          color="teal"
        />
        <Menu.Item
          name="Add Regulator"
          active={activeItem === "Regulator"}
          onClick={() => setActive("Regulator")}
          color="olive"
        />
        <Menu.Item
          name="Add Restaurant"
          active={activeItem === "Restaurant"}
          onClick={() => setActive("Restaurant")}
          color="blue"
        />
        <Dropdown item text="Actions">
          <Dropdown.Menu>
            <Dropdown.Item
              active={activeItem === "Catch"}
              onClick={() => setActive("Catch")}
            >
              Catch Tuna
            </Dropdown.Item>
            <Dropdown.Item
              active={activeItem === "Record"}
              onClick={() => setActive("Record")}
            >
              Record Tuna
            </Dropdown.Item>
            <Dropdown.Item
              active={activeItem === "Audit"}
              onClick={() => setActive("Audit")}
            >
              Audit Tuna
            </Dropdown.Item>
            <Dropdown.Item
              active={activeItem === "Buy"}
              onClick={() => setActive("Buy")}
            >
              Buy Tuna
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
};

export default Menubar;
