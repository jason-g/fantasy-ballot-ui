import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import { Link, NavLink } from 'react-router-dom';
import { UserState } from '../store/user/types';
import Alert from 'reactstrap/lib/Alert';
import { userInfo } from 'os';


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
        if (this.props.user.message) {
            switch (this.props.user.message.code) {
                case 'CHANGE_FAILED': {
                    return (
                        <Alert color="danger">
                            Something went wrong - Contact the administrator for further help.
                        </Alert>
                    );
                    break;
                }
                default: {
                    return (
                        <div className="alert alert-success" role="alert">
                            Succesfully applied your changes, you may <NavLink to="/ballot" className="alert-link">go back to your ballot</NavLink>.
                        </div>  
                    );
                    break;
                }
            }
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
                <h2>Edit your user settings</h2>
                {this.showMessage()}
                <Form>
                    <span className="font-weight-light font-italic">Leave fields empty to leave them unchanged.</span>
                    <br />
                    <FormGroup>
                        <Label for="edituserText">Username ({this.props.user.username})</Label>
                        <Input name="username" id="username" onChange={this.handleChange.bind(this)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="edituserEmail">Email ({this.props.user.email})</Label>
                        <Input type="email" name="email"
                            id="edituserEmail" placeholder={(this.props.user.email)? this.props.user.email : ''}
                            valid={this.state.validate.emailState === 'has-success'}
                            invalid={this.state.validate.emailState === 'has-danger'}
                            onChange={ this.handleChange } 
                            />
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

    componentDidMount() {
        if (this.state.userId) {
            this.props.dispatch({
                type: "@@user/GET",
                id: this.state.userId,
            })
        }
    }
}

const mapStateToProps = (state: PropsFromState): OwnProps => ({
    user: state.user,
})

export default connect(mapStateToProps)(EditUser);