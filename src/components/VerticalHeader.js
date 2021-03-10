import React, { useState } from "react";
import { Menu, Icon, Header, Button, Divider, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const VerticalHeader = (props) => {
  const [menuStyle, setMenuStyle] = useState({
    display: "none",
  });

  console.log(props);

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

  // <---- Possibly put in a CSS file ---->
  const mobileMenuStyle = {
    display: menuStyle.display,
    margin: 0,
  };

  const headerStyle = {
    color: "#000",
  };
  // <---- Possibly put in a CSS file ---->

  return (
    <>
      {/* menu display for mobile vp only  */}
      <Grid padded className="mobile only">
        <Menu borderless fluid style={{ margin: 0 }}>
          <Menu.Item link>
            <NavLink exact to="/">
              <Header as="h1">
                <Icon name="exchange" size="mini" />
                <Header.Content>{props.menuProps.name}</Header.Content>
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
            <NavLink exact to={`/${props.menuProps.itemOne}`}>
              <Header as="h3">
                <Icon name="chart line" />
                <Header.Content>{props.menuProps.itemOne}</Header.Content>
              </Header>
            </NavLink>
          </Menu.Item>
          <Menu.Item link>
            <NavLink exact to={`${props.menuProps.itemTwo}`}>
              <Header as="h3">
                <Icon name="folder" />
                <Header.Content>{props.menuProps.itemTwo}</Header.Content>
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

      {/* menu display for tablet vp only */}
      <Grid className="tablet only">
        <Grid.Column>
          <Menu
            vertical
            borderless
            fixed="top"
            style={{ height: "100vh", backgroundColor: "#fff" }}
            compact
          >
            <Menu.Item>
              <NavLink exact to="/">
                <Header as="h3" r>
                  <Icon name="exchange" size="large" />
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink exact to="/">
                <Header>
                  <Icon name="chart line" size="large" />
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink exact to="/portfolio">
                <Header>
                  <Icon name="folder" size="large" />
                </Header>
              </NavLink>
            </Menu.Item>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Menu.Item>
              <NavLink exact to="/">
                <Header>
                  <Icon name="signup" size="large" color="grey" />
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink exact to="/">
                <Header>
                  <Icon name="sign in" size="large" color="grey"  />
                </Header>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid>
      {/* menu display for tablet vp only */}

      {/* view for computer vertical menu  */}
      <Grid className="computer only">
        <Grid.Column>
          <Menu
            size="tiny"
            attached
            vertical
            borderless
            fixed="left"
            style={{ height: "100vh", backgroundColor: "#fff" }}
          >
            <Menu.Item link>
              <NavLink exact to="/">
                <Header centered style={headerStyle} as="h3">
                  <Header.Content>{props.menuProps.name}</Header.Content>
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item link>
              <NavLink exact to={`/${props.itemOne}`}>
                <Header style={headerStyle} as="h3">
                  <Icon name="chart line" />
                  <Header.Content>{props.menuProps.itemOne}</Header.Content>
                </Header>
              </NavLink>
            </Menu.Item>
            <Menu.Item link>
              <NavLink exact to={`${props.menuProps.itemTwo}`}>
                <Header style={headerStyle} as="h3">
                  <Icon name="folder" />
                  <Header.Content>{props.menuProps.itemTwo}</Header.Content>
                </Header>
              </NavLink>
            </Menu.Item>
            <Divider hidden />
            <Divider hidden />
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
