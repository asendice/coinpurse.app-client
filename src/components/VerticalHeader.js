import React, { useState } from "react";
import { Menu, Icon, Header, Button, Divider, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const VerticalHeader = (props) => {
  const [menuStyle, setMenuStyle] = useState({
    display: "none",
  });

  const handleToggle = () => {
    let newState = Object.assign({}, menuStyle);
    if (newState.display === "none") {
      newState.display = { display: "flex" };
    }
    if (newState.display === "flex") {
      newState.display = { display: "none" };
    }
    setMenuStyle(newState.display);
  };

  const mobileMenuStyle = {
    display: menuStyle.display,
    margin: 0,
  };

  // Possibly put in a CSS file
  const headerStyle = {
    color: "#000"
  }



  return (
    <>
      {/* menu display for mobile vp only  */}
      <Grid padded className="mobile only">
        <Menu borderless fluid style={{ margin: 0 }}>
          <Menu.Item link>
            <NavLink exact to="/">
              <Header as="h1">
                <Icon name="exchange" size="mini" />
                <Header.Content>{props.name}</Header.Content>
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Divider />
              <Button basic icon toggle onClick={handleToggle}>
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu borderless vertical fluid style={mobileMenuStyle}>
          <Menu.Item link>
            <NavLink exact to={`/${props.itemOne}`}>
              <Header as="h3">
                <Icon name="chart line" />
                <Header.Content>{props.itemOne}</Header.Content>
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item link>
            <NavLink exact to={`${props.itemTwo}`}>
              <Header as="h3">
                <Icon name="folder" />
                <Header.Content>{props.itemTwo}</Header.Content>
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <Button fluid>Sign Up</Button>
          </Menu.Item>
          <Menu.Item>
            <Button fluid>Log In</Button>
          </Menu.Item>
        </Menu>
      </Grid>
      {/* ^^ menu display for movile vp only  */}

      {/* view for tablet and computer vertical menu  */}
      <Grid className="tablet computer only" >
        <Grid.Column tablet={3} computer={3}>
          <Menu
            vertical
            borderless
            fixed="top"
            style={{ height: "100vh" , backgroundColor: "#fff"}}
            size="huge"
          >
            <Menu.Item  link>
              <NavLink exact to="/">
                <Header style={headerStyle} as="h1">
                  <Icon name="exchange" size="mini" />
                  <Header.Content>{props.name}</Header.Content>
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item link>
              <NavLink exact to={`/${props.itemOne}`}>
                <Header style={headerStyle} as="h3">
                  <Icon name="chart line" />
                  <Header.Content>{props.itemOne}</Header.Content>
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item link>
              <NavLink exact to={`${props.itemTwo}`}>
                <Header style={headerStyle} as="h3">
                  <Icon name="folder" />
                  <Header.Content>{props.itemTwo}</Header.Content>
                </Header>
              </NavLink>
            </Menu.Item>
            <Divider hidden />
            <Divider hidden />
            <Menu.Item floated="right">
              <Button fluid>Sign Up</Button>
            </Menu.Item>
            <Menu.Item>
              <Button fluid>Log In</Button>
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default VerticalHeader;
