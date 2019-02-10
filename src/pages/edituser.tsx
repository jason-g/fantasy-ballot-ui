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
    userId: number | null;
    username: string,
    password: string | undefined,
    email?: string | null,
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

class EditUser extends React.Component<AllProps, myState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: this.props.user.userId,
            username: this.props.user.username,
            password: this.props.user.password,
            email: this.props.user.email,
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
        let userId = this.state.userId;
        this.props.dispatch(
            {
                type: "@@user/EDIT",
                id: userId,
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
                    EditUser error: <br />
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
            <Container className="EditUser">
                <h2>Sign up</h2>
                {this.showMessage()}
                <Form>
                    <FormGroup>
                        <Label for="edituserText">Username</Label>
                        <Input name="username" id="username" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="edituserEmail">Email</Label>
                        <Input type="email" name="email"
                            id="edituserEmail" placeholder="email address"
                            valid={this.state.validate.emailState === 'has-success'}
                            invalid={this.state.validate.emailState === 'has-danger'}
                            onChange={
                                this.handleChange
                            } />
                    </FormGroup>
                    <FormGroup>
                        <Label for="edituserPassword">Password</Label>
                        <Input type="password" name="password"
                            id="edituserPassword" placeholder="password" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit changes</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
    user: state.user,
})

export default connect(mapStateToProps)(EditUser);