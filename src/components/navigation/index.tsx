import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import './navigation.css';
import { Link, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavigationState } from '../../store/navigation/types';
import { Button } from 'reactstrap';
import { UserState } from '../../store/user/types';

interface PropsFromDispatch {
  [key: string]: any,
};
interface PropsFromState {
  navigation: NavigationState,
  user: UserState,
};
interface myState {
    dropdownOpen: boolean,
    user: UserState,
    redirect?: string,
}
interface OwnProps {
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Navigation extends React.Component<AllProps, myState> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      user: this.props.user,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  doLogout = () => {
    this.props.dispatch({
      type: "@@user/LOGOUT",
    })
  }

  render() {
    const isAdmin = this.props.user.roles && this.props.user.roles.includes('admin');
    let loginMenu;

    if (isAdmin) {
      loginMenu = <NavItem>
          <NavLink href="/administration" active={this.props.state}>Administration</NavLink>
        </NavItem>;
    }
    if (this.state.redirect && this.state.redirect != '') {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <Nav tabs className="fixed-top nav-bar">
          <NavItem>
            <NavLink href="/ballot" active={this.props.state}>Ballot</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/results" active={this.props.state}>Results</NavLink>
          </NavItem>
          {loginMenu}
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              <span className="userIcon fas fa-user-circle"></span>
              {this.props.user? this.props.user.username : 'Please Login'} 
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Account</DropdownItem>
              <DropdownItem href="/editUser" disabled={!this.props.user.authenticated}>
                 Edit accout
              </DropdownItem>
              <DropdownItem onClick={this.doLogout} disabled={!this.props.user.authenticated}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {this.props.children}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
  navigation: state.navigation,
  user: state.user,
})

export default connect(mapStateToProps)(Navigation);
