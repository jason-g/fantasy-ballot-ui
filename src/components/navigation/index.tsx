import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

interface PropsFromDispatch {
  [key: string]: any,
};
interface myState {
    dropdownOpen: boolean,
    loggedIn: boolean,
}

export default class Navigation extends React.Component<PropsFromDispatch, myState> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      loggedIn: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink href="/ballot" active>Ballot</NavLink>
          </NavItem>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              UserNameHere
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Account</DropdownItem>
              <DropdownItem>
                  <NavLink href="/login">Login</NavLink>
              </DropdownItem>
              <DropdownItem>
                  <NavLink href="/logout">Logout</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </div>
    );
  }
}
