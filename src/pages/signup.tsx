import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import { Link } from 'react-router-dom';
import { UserState } from '../store/user/types';
import Alert from 'reactstrap/lib/Alert';


interface PropsFromDispatch {
    [key: string]: any,
};
interface myState {
    username: string,
    password: string,
    email?: string,
    realm?: string,
    user: UserState,
    validate: any,
}
interface PropsFromState {
    user: UserState,
};
interface OwnProps {
}
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class Signup extends React.Component<AllProps, myState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            realm: 'ritas house',
            user: this.props.user,
            validate: {
                emailState: '',
                usernameState: '',
                passwordState: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }


    handleSubmit(event: any): void {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        let realm = this.state.realm;
        this.props.dispatch(
            {
                type: "@@user/SIGNUP",
                username: username,
                email: email,
                realm: realm,
                password: password
            }
        )
    }
    handleChange(event: any): void {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        switch (name) {
            case 'username': {
                this.setState({ username: value });
                break;
            }
            case 'password': {
                this.setState({ password: value });
                break;
            }
            case 'email': {
                this.setState({ email: value });
                this.validateEmail(event);
                break;
            }
            case 'realm': {
                this.setState({ realm: value });
                break;
            }
            default: {
                break;
            }
        }
    }


    showMessage() {
        if (!this.props.user) {
            return;
        }
        if (this.props.user.message && this.props.user.message.error) {
            return (
                <Alert color="danger">
                    Signup error: <br />
                    {this.props.user.message.error.message}
                </Alert>
            )
        }
    }

    validateEmail(event: any) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(event.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    render() {
        return (
            <Container className="Signup">
                <h2>Sign up</h2>
                {this.showMessage()}
                <Form>
                    <FormGroup>
                        <Label for="signupText">Username</Label>
                        <Input name="username" id="username" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupEmail">Email (used to reset password)</Label>
                        <Input type="email" name="email"
                            id="signupEmail" placeholder="email address"
                            valid={this.state.validate.emailState === 'has-success'}
                            invalid={this.state.validate.emailState === 'has-danger'}
                            onChange={ this.handleChange } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="signupPassword">Password</Label>
                        <Input type="password" name="password"
                            id="signupPassword" placeholder="password" onChange={this.handleChange} />
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <Button type="submit" onClick={this.handleSubmit.bind(this)}>Sign up</Button>
                    </div>
                </Form>
                <div className="d-flex justify-content-center">
                    <span className="text-center">
                        Already have an account?  <Link to="/login">Login</Link>
                    </span>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
    user: state.user,
})

export default connect(mapStateToProps)(Signup);