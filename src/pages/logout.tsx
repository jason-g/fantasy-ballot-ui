import React from 'react';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import { withRouter, Redirect } from 'react-router-dom'
import { logout } from '../store/user/actions';


interface PropsFromDispatch {
  [key: string]: any,
};

interface myState {
    username: string,
    password: string,
    email: string,
    realm?: string,
    redirect?: string,
}
class Logout extends React.Component<PropsFromDispatch, myState> {
    constructor(props: any){
        super(props);
        this.state = { 
            redirect: '',
            username: '',
            password: '',
            email: '',
        };
    }

    doLogout() {
        debugger;
        this.props.dispatch(
            {
                type: "@@user/LOGOUT",
            }
        )
        this.setState({
            redirect: '/login'
        })

    }

    render() {
        if (this.state.redirect && this.state.redirect != '' ) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Container className="Logout">
                <h2>Logging out - Have a nice day!</h2>
            </Container>
        );
    }

    componentDidMount() {
        this.doLogout();
    }
}

export default connect()(Logout);