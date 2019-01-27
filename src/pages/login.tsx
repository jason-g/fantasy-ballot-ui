import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import './login.css';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { render } from 'react-dom';
import Alert from 'reactstrap/lib/Alert';
import { UserState } from '../store/user/types';


interface PropsFromDispatch {
  [key: string]: any,
};
interface myState {
    username: string,
    password: string,
    realm?: string,
    redirect?: string,
    user: UserState,
}
interface PropsFromState {
  user: UserState,
};
interface OwnProps {
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Login extends React.Component<AllProps, myState> {
    constructor(props: any){
        super(props);
        this.state = { 
            username: '',
            password: '',
            realm: 'ritas house',
            redirect: '',
            user: this.props.user,
        };
    }

    handleSubmit(event: any) : void {
        event.preventDefault();
        console.log('submit');
        console.dir(this.state);
        let username = this.state.username;
        let password = this.state.password;
        this.props.dispatch(
            {
                type: "@@user/LOGIN",
                username: username,
                password: password
            }
        )
        /*this.setState({
            redirect: '/ballot'
        })
        */

    }

    handleChange(event: any): void {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        switch (name) {
            case 'username': {
                this.setState({username: value})
                break;
            }
            case 'password': {
                this.setState({password: value})
                break;
            }
            default: {
                break;
            }
        }
    }

    showMessage() {
        console.log('Show Message');
        if (!this.props.user) {
            return;
        }
        console.dir(this.props.user.message);
        if (this.props.user.message && this.props.user.message.error ) {
            return (
                <Alert color="danger">
                    Authentication eror!  Looks like that is either the wrong username or password.
                </Alert>
            )
        }
    }

    render() {
        return (
            <Container className="Login">
                <h2>Sign In</h2>
                {this.showMessage()}
                <Form>
                    <Col>
                        <FormGroup>
                            <Label for="loginText">Username</Label>
                            <Input name="username" id="username" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="loginPassword">Password</Label>
                            <Input type="password" name="password"
                                id="loginPassword" placeholder="password" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                    </Col>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Sign in</Button>
                </Form>
                Don't have an account yet?  <Link to="/signup">Sign up for an account</Link>
            </Container>
        );
    }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
  user: state.user,
})

export default connect(mapStateToProps)(Login);