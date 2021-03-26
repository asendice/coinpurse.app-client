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

  // <---- Possibly put in a CSS file ---->
  const mobileMenuStyle = {
    display: menuStyle.display,
    margin: 0,
  };

  return (
    <>
      {/* menu display for mobile vp only  */}
      <Grid className="mobile only" style={{ marginTop: "1px" }}>
        <Menu borderless fluid activeIndex>
          <NavLink exact to="/">
            <Menu.Item link>
              <Header as="h2">
                <Icon name="exchange" size="mini" />
                <Header.Content>{props.menuProps.name}</Header.Content>
              </Header>
            </Menu.Item>
          </NavLink>
          <Menu.Menu position="right">
            <Menu.Item>
              <Divider />
              <Button basic icon toggle onClick={handleToggle}>
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Menu borderless vertical fluid style={mobileMenuStyle} activeIndex>
          <NavLink exact to={`/${props.menuProps.itemOne}`}>
            <Menu.Item link>
              <Header as="h3" onClick={handleToggle}>
                <Icon name="chart line" />
                <Header.Content>{props.menuProps.itemOne}</Header.Content>
              </Header>
            </Menu.Item>
          </NavLink>
          <NavLink exact to={`${props.menuProps.itemTwo}`}>
            <Menu.Item link>
              <Header as="h3" onClick={handleToggle}>
                <Icon name="folder" />
                <Header.Content>{props.menuProps.itemTwo}</Header.Content>
              </Header>
            </Menu.Item>
          </NavLink>
          <NavLink to="/register">
            <Menu.Item>
              <Button onClick={handleToggle}>
                <Icon name="signup" size="large" color="grey" />
                Sign Up
              </Button>
            </Menu.Item>
          </NavLink>
          <NavLink to="/login">
            <Menu.Item>
              <Button onClick={handleToggle}>
                <Icon name="sign in" size="large" color="grey" />
                Log In
              </Button>
            </Menu.Item>
          </NavLink>
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
            <NavLink exact to="/">
              <Menu.Item>
                <Header as="h3">
                  <Icon name="exchange" size="large" />
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to="/market">
              <Menu.Item>
                <Header>
                  <Icon name="chart line" size="large" />
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to="/portfolio">
              <Menu.Item>
                <Header>
                  <Icon name="folder" size="large" />
                </Header>
              </Menu.Item>
            </NavLink>

            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <NavLink exact to="/register">
              <Menu.Item>
                <Header>
                  <Icon name="signup" size="large" color="grey" />
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to="/login">
              <Menu.Item>
                <Header>
                  <Icon name="sign in" size="large" color="grey" />
                </Header>
              </Menu.Item>
            </NavLink>
          </Menu>
        </Grid.Column>
      </Grid>
      {/* menu display for tablet vp only */}

      {/* view for computer vertical menu  */}
      <Grid className="computer only">
        <Grid.Column>
          <Menu
            activeIndex
            size="small"
            attached
            vertical
            borderless
            fixed="top"
            style={{ height: "100vh", background: "#fff" }}
          >
            <NavLink exact to="/">
              <Menu.Item link>
                <Header as="h3">
                  <Header.Content>{props.menuProps.name}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to={`/${props.menuProps.itemOne}`}>
              <Menu.Item link>
                <Header as="h3">
                  <Icon name="chart line" />
                  <Header.Content>{props.menuProps.itemOne}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>
            <NavLink exact to={`/${props.menuProps.itemTwo}`}>
              <Menu.Item link>
                <Header as="h3">
                  <Icon name="folder" />
                  <Header.Content>{props.menuProps.itemTwo}</Header.Content>
                </Header>
              </Menu.Item>
            </NavLink>

            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <NavLink to="/register">
              <Menu.Item floated="right">
                <Button fluid>
                  <Icon name="signup" size="large" color="grey" />
                  Sign Up
                </Button>
              </Menu.Item>
            </NavLink>
            <NavLink to="/login">
              <Menu.Item>
                <Button fluid>
                  <Icon name="sign in" size="large" color="grey" />
                  Log In
                </Button>
              </Menu.Item>
            </NavLink>
          </Menu>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default VerticalHeader;
